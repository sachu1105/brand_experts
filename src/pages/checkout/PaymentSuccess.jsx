import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { confirmPayment } from "../../services/PaymentService";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const paymentIntent = searchParams.get("payment_intent");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!paymentIntent) {
        console.error("No payment intent found in URL");
        setIsSuccess(false);
        setIsLoading(false);
        return;
      }

      try {
        console.log("Starting payment verification for:", paymentIntent);
        const response = await confirmPayment(paymentIntent);

        // Log the entire response for debugging
        console.log("Full payment verification response:", response);

        // Explicitly check the response structure
        if (response && response.success === true) {
          console.log("Setting payment success state to TRUE");
          setIsSuccess(true);
          sessionStorage.removeItem("cart_id");
          toast.success(response.message || "Payment completed successfully!");
        } else {
          console.log("Setting payment success state to FALSE");
          setIsSuccess(false);
          toast.error(response.message || "Payment verification failed");
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        setIsSuccess(false);
        toast.error(error.message || "Failed to verify payment");
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [paymentIntent]);

  // Add a debug log for render
  console.log("Current state - isSuccess:", isSuccess, "isLoading:", isLoading);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Verifying payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div className="text-center">
          {isSuccess ? (
            <>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Payment Successful!
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Your order has been confirmed. You will receive an email
                confirmation shortly.
              </p>
            </>
          ) : (
            <>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Payment Failed
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                There was an issue processing your payment. Please try again.
              </p>
            </>
          )}
        </div>

        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={() => navigate("/orders")}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#BF1A1C] hover:bg-[#590C0D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            View Orders
          </button>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
