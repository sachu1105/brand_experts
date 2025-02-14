import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";
import stripePromise from "../../utils/stripe";
import StripePaymentForm from "../../components/StripePaymentForm";
import { createPaymentIntent } from "../../services/PaymentService";

export default function Payment() {
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializePayment = async () => {
      try {
        const cartId = sessionStorage.getItem("cart_id");
        if (!cartId) {
          toast.error("No active cart found");
          navigate("/checkout");
          return;
        }

        const secret = await createPaymentIntent();
        setClientSecret(secret);
      } catch (error) {
        toast.error(error.message);
        navigate("/checkout");
      } finally {
        setIsLoading(false);
      }
    };

    initializePayment();
  }, [navigate]);

  const handlePaymentSuccess = () => {
    // Clear cart related data from session
    sessionStorage.removeItem("cart_id");
    sessionStorage.removeItem("cart");

    // Navigate to success page
    navigate("/payment-success");
  };

  if (isLoading || !clientSecret) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-2xl font-semibold mb-6">Complete Your Payment</h1>
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <StripePaymentForm onSuccess={handlePaymentSuccess} />
          </Elements>
          <button
            onClick={() => navigate("/checkout")}
            className="mt-4 text-gray-600 hover:text-gray-800 underline"
          >
            Back to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
