import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Api from "../../../pages/loginSignin/Api";

// Initialize Stripe
const stripePromise = loadStripe(
  "pk_live_51K9t4GClllkfU7woX1ffJ66Gs1F1FRZqdrgUKPgZ6zzsjroIezfXgQUQDB385ZEmAQcTz283mC8GiTo1LwTGORYQ0042haEpax"
);

const CheckoutForm = ({ onSuccess, amount, customerData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);

  const createPaymentIntent = useMutation({
    mutationFn: async (data) => {
      const payload = {
        amount: Math.round(data.amount * 100),
        customer_id: data.customer_id,
        cart_items: data.cart_items.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          total: item.total,
          custom_size: item.customSize,
          design_image: item.design_image,
        })),
      };

      console.log("Creating payment intent with payload:", payload);

      const response = await Api.post("create-payment-intent/", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Payment intent response:", response.data);
      return response.data;
    },
  });

  useEffect(() => {
    console.log("CheckoutForm mounted with:", { amount, customerData });

    if (amount > 0 && customerData?.customer_id) {
      createPaymentIntent.mutate(
        {
          amount,
          customer_id: customerData.customer_id,
          cart_items: customerData.cart_items,
        },
        {
          onSuccess: (data) => {
            console.log("Payment Intent created:", data);
            setClientSecret(data.clientSecret);
          },
          onError: (error) => {
            console.error("Failed to create payment intent:", error);
            toast.error("Failed to initialize payment");
          },
        }
      );
    }
  }, [amount, customerData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + "/payment-success",
        },
        redirect: "if_required",
      });

      if (error) {
        toast.error(error.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");
        onSuccess(paymentIntent);
      }
    } catch (err) {
      toast.error(err.message || "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow"
    >
      <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>
      <div className="mb-6">
        <PaymentElement />
      </div>
      <button
        type="submit"
        disabled={isProcessing || !stripe}
        className="w-full bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white px-6 py-4 text-lg rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
      >
        {isProcessing ? "Processing..." : `Pay ${amount} AED`}
      </button>
    </form>
  );
};

export default function PaymentForm({ customerData, onNext, onBack }) {
  const [validAmount, setValidAmount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("PaymentForm received customerData:", customerData);
  }, [customerData]);

  useEffect(() => {
    console.log("Payment form mounted with customer data:", customerData);

    if (!customerData?.customer_id) {
      setError("Customer information not found");
      return;
    }

    const parsedAmount = parseFloat(customerData.total_amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      console.error("Invalid amount:", {
        raw: customerData.total_amount,
        parsed: parsedAmount,
      });
      setError("Invalid amount specified");
      return;
    }

    setValidAmount(parsedAmount);
    setError(null);
  }, [customerData]);

  // Show loading state
  if (!customerData) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        <div className="text-gray-600">Loading payment details...</div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        <div className="text-red-600">{error}</div>
        <button
          onClick={onBack}
          className="mt-4 text-red-600 hover:text-red-800"
        >
          Return to Cart
        </button>
      </div>
    );
  }

  if (!customerData?.customer_id || !customerData?.cart_items?.length) {
    console.error("Missing required data:", customerData);
    return (
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        <div className="text-red-600">Missing required payment information</div>
        <button
          onClick={onBack}
          className="mt-4 text-red-600 hover:text-red-800"
        >
          Return to Cart
        </button>
      </div>
    );
  }

  const options = {
    mode: "payment",
    amount: Math.round(customerData.total_amount * 100),
    currency: "aed",
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: "#BF1A1C",
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        amount={customerData.total}
        customerData={customerData}
        onSuccess={(paymentIntent) => {
          toast.success("Payment successful!");
          onNext();
        }}
      />
    </Elements>
  );
}
