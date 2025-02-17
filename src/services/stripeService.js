import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_live_51K9t4GClllkfU7woX1ffJ66Gs1F1FRZqdrgUKPgZ6zzsjroIezfXgQUQDB385ZEmAQcTz283mC8GiTo1LwTGORYQ0042haEpax"
);

export const handleStripePayment = async ({ clientSecret }) => {
  // This function is now handled by StripePaymentForm component
  console.warn(
    "handleStripePayment is deprecated. Use StripePaymentForm instead."
  );
};

export const confirmPaymentWithServer = async (paymentIntentId) => {
  try {
    const response = await fetch(
      "https://dash.brandexperts.ae/confirm-payment_api/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_intent_id: paymentIntentId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Payment confirmation failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Payment confirmation error:", error);
    throw error;
  }
};
