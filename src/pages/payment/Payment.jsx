import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";
import stripePromise from "../../utils/stripe";
import StripePaymentForm from "../../components/StripePaymentForm";
import { createPaymentIntent } from "../../services/PaymentService";
import { Steps } from "../checkout/components/Steps";

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
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700" />
        <p className="text-gray-600">Preparing your payment details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-20 pb-60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <Steps currentStep="payment" />
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-6">
            <h1 className="text-2xl font-semibold text-white">
              Secure Checkout
            </h1>
            <p className="mt-2 text-red-100">Complete your purchase securely</p>
          </div>

          {/* Payment Form */}
          <div className="p-8">
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <StripePaymentForm
                onSuccess={handlePaymentSuccess}
                orderTotal={sessionStorage.getItem("order_total") || "0.00"}
              />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
}
