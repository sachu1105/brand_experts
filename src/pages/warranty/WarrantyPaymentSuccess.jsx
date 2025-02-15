import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmPaymentWithServer } from "../../services/stripeService";
import toast from "react-hot-toast";

const WarrantyPaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const paymentIntentId = searchParams.get("payment_intent");
        if (!paymentIntentId) {
          throw new Error("No payment intent ID found");
        }

        const result = await confirmPaymentWithServer(paymentIntentId);
        if (result.success) {
          toast.success("Payment confirmed successfully!");
          // Clear session storage
          sessionStorage.removeItem("warrantyRegistrationData");
          // Redirect back to warranty page
          navigate("/warranty");
        } else {
          throw new Error("Payment confirmation failed");
        }
      } catch (error) {
        console.error("Payment confirmation error:", error);
        toast.error("Failed to confirm payment");
        navigate("/warranty");
      }
    };

    confirmPayment();
  }, [navigate, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Processing Payment...</h2>
        <p>Please wait while we confirm your payment.</p>
      </div>
    </div>
  );
};

export default WarrantyPaymentSuccess;
