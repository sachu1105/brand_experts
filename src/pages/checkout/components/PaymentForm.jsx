import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";
import StripePaymentForm from "../../../components/StripePaymentForm";
import { createPaymentIntent } from "../../../services/PaymentService";

const stripePromise = loadStripe(
  "pk_live_51K9t4GClllkfU7woX1ffJ66Gs1F1FRZqdrgUKPgZ6zzsjroIezfXgQUQDB385ZEmAQcTz283mC8GiTo1LwTGORYQ0042haEpax"
);

export default function PaymentForm({ onNext, onBack }) {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const initializePayment = async () => {
    setIsLoading(true);
    try {
      const secret = await createPaymentIntent();
      setClientSecret(secret);
      setShowPaymentForm(true);
    } catch (error) {
      toast.error(error.message);
      onBack();
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadPaymentForm = () => {
    initializePayment();
  };

  if (!showPaymentForm) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow text-center">
        <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Please click below to load the secure payment form
          </p>
          <button
            onClick={handleLoadPaymentForm}
            disabled={isLoading}
            className="w-full max-w-md bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white px-6 py-4 text-lg rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading Payment Form...
              </span>
            ) : (
              "Load Payment Form"
            )}
          </button>
        </div>
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 underline"
        >
          Back to Shipping
        </button>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <StripePaymentForm onSuccess={onNext} />
      </Elements>
      <div className="mt-4 text-center">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 underline"
        >
          Back to Shipping
        </button>
      </div>
    </div>
  );
}
