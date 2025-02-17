import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51QVV1sHGxf2bD0m27Cm8kqVEEB6T6nUBdrwm5XoTmi4cNI56T1Nda0eFuOIH4Dk3hBEQxAOSyLDygHAZhreqzFMm00HmrNYzxN"
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
