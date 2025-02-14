import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";
import { confirmPayment } from "../services/PaymentService";

export default function StripePaymentForm({ onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        const confirmationResponse = await confirmPayment(paymentIntent.id);
        if (confirmationResponse.success) {
          toast.success(confirmationResponse.message);
          onSuccess();
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <PaymentElement className="mb-6" />
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white px-6 py-4 rounded-lg disabled:opacity-50"
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}
