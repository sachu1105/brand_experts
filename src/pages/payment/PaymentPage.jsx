import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import StripePaymentForm from "../../components/StripePaymentForm";
import { createPaymentIntent } from "../../services/PaymentService";

// Initialize Stripe
const stripePromise = loadStripe(
  "pk_test_51QVV1sHGxf2bD0m27Cm8kqVEEB6T6nUBdrwm5XoTmi4cNI56T1Nda0eFuOIH4Dk3hBEQxAOSyLDygHAZhreqzFMm00HmrNYzxN"
);

export default function PaymentPage() {
  const navigate = useNavigate();
  const [paymentInfo, setPaymentInfo] = useState({
    clientSecret: "",
    amount: {
      subtotal: "0.00",
      tax: "0.00",
      total: "0.00",
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializePayment = async () => {
      try {
        // Check for required session data
        const cartId = sessionStorage.getItem("cart_id");
        const billingDetails = sessionStorage.getItem("billing_details");

        if (!cartId) {
          toast.error("No cart found");
          navigate("/cart");
          return;
        }

        if (!billingDetails) {
          toast.error("Please complete shipping details first");
          navigate("/checkout");
          return;
        }

        // Initialize payment intent
        const response = await createPaymentIntent();
        setPaymentInfo({
          clientSecret: response.clientSecret,
          amount: {
            subtotal: response.amount?.base?.toFixed(2) || "0.00",
            tax: response.amount?.vat?.toFixed(2) || "0.00",
            total: response.amount?.total?.toFixed(2) || "0.00",
          },
        });
      } catch (error) {
        console.error("Payment initialization error:", error);
        setError(error.message || "Failed to initialize payment");
        toast.error("Failed to initialize payment");
      } finally {
        setIsLoading(false);
      }
    };

    initializePayment();
  }, [navigate]);

  const handlePaymentSuccess = () => {
    toast.success("Payment successful!");
    navigate("/order-confirmation");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/checkout")}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Return to Checkout
          </button>
        </div>
      </div>
    );
  }

  if (!paymentInfo.clientSecret) {
    return null;
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret: paymentInfo.clientSecret,
          appearance: {
            theme: "stripe",
            variables: {
              colorPrimary: "#BF1A1C",
              colorBackground: "#ffffff",
              colorText: "#1f2937",
            },
          },
        }}
      >
        <StripePaymentForm
          onSuccess={handlePaymentSuccess}
          orderTotal={paymentInfo.amount.total}
          subtotal={paymentInfo.amount.subtotal}
          tax={paymentInfo.amount.tax}
        />
      </Elements>
    </div>
  );
}
