import { useState, useEffect } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import stripePromise from "../../../utils/stripe";
import Api from "../../../pages/loginSignin/Api";

const CheckoutForm = ({ onSuccess, amount, customerData, shippingAddress }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const createPaymentIntent = useMutation({
    mutationFn: async (data) => {
      try {
        console.log("Creating payment intent with data:", data);
        const response = await Api.post(
          "api/payment/create-payment-intent/",
          {
            amount: Math.round(data.amount * 100),
            customer_id: data.customer_id,
            cart_items: data.cart_items,
            shipping_address: data.shipping_address,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Payment intent response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Payment intent error:", error);
        throw error;
      }
    },
  });

  useEffect(() => {
    if (amount > 0 && customerData?.customer_id) {
      createPaymentIntent.mutate({
        amount,
        customer_id: customerData.customer_id,
        cart_items: customerData.cart_items,
        shipping_address: shippingAddress,
      });
    }
  }, [amount, customerData, shippingAddress]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: shippingAddress.company_name,
              address: {
                line1: shippingAddress.address_line1,
                line2: shippingAddress.address_line2,
                city: shippingAddress.city,
                state: shippingAddress.state,
                postal_code: shippingAddress.zip_code,
                country: shippingAddress.country,
              },
            },
          },
          return_url: `${window.location.origin}/payment-success`,
        },
      });

      if (error) {
        toast.error(error.message);
      } else if (paymentIntent.status === "succeeded") {
        onSuccess(paymentIntent);
      }
    } catch (err) {
      toast.error("Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  if (createPaymentIntent.isLoading) {
    return <div className="text-center py-4">Initializing payment...</div>;
  }

  if (createPaymentIntent.isError) {
    return (
      <div className="text-center py-4 text-red-600">
        Failed to initialize payment. Please try again.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow"
    >
      <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>
      <PaymentElement />
      <button
        type="submit"
        disabled={isProcessing || !stripe}
        className="w-full bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white px-6 py-4 mt-6 rounded-lg disabled:opacity-50"
      >
        {isProcessing ? "Processing..." : `Pay ${amount} AED`}
      </button>
    </form>
  );
};

const PaymentForm = ({ customerData, onSuccess }) => {
  const [options, setOptions] = useState(null);

  useEffect(() => {
    if (customerData?.client_secret) {
      setOptions({
        clientSecret: customerData.client_secret,
        appearance: { theme: "stripe" },
      });
    }
  }, [customerData]);

  if (!options) {
    return <div>Loading payment form...</div>;
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        amount={customerData.total_amount}
        customerData={customerData}
        shippingAddress={customerData.shipping_address}
        onSuccess={onSuccess}
      />
    </Elements>
  );
};

export default PaymentForm;
