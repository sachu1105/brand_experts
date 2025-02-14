import Api from "../pages/loginSignin/Api";

export const createPaymentIntent = async () => {
  try {
    const cartId = sessionStorage.getItem("cart_id");
    if (!cartId) {
      throw new Error("Cart ID not found");
    }

    const response = await Api.post(
      "create-payment-intent/",
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

    return response.data.clientSecret;
  } catch (error) {
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
      "confirm-payment/",
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

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to confirm payment"
    );
  }
};
