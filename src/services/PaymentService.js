import Api from "../pages/loginSignin/Api";

export const createPaymentIntent = async () => {
  try {
    const cartId = sessionStorage.getItem("cart_id");
    if (!cartId) {
      throw new Error("Cart ID not found");
    }

    const response = await Api.post(
      "https://dash.brandexperts.ae/create-payment-intent/",
      {
        cart_id: parseInt(cartId),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data?.clientSecret) {
      throw new Error("Invalid response from payment service");
    }

    return response.data.clientSecret;
  } catch (error) {
    console.error("Payment intent creation error:", error);
    throw new Error(
      error.response?.data?.message || "Failed to create payment intent"
    );
  }
};

export const confirmPayment = async (paymentIntentId) => {
  try {
    const cartId = sessionStorage.getItem("cart_id");
    if (!cartId) {
      throw new Error("Cart ID not found");
    }

    const response = await Api.post(
      "https://dash.brandexperts.ae/confirm-payment/",
      {
        payment_intent_id: paymentIntentId,
        cart_id: parseInt(cartId),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Payment confirmation failed");
    }

    return response.data;
  } catch (error) {
    console.error("Payment confirmation error:", error);
    throw new Error(
      error.response?.data?.message || "Failed to confirm payment"
    );
  }
};
