import Api from "../pages/loginSignin/Api";

export const createPaymentIntent = async (cartData) => {
  try {
    const response = await Api.post(
      "create-payment-intent/",
      { cart_id: cartData.cart_id },
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
      error.response?.data?.message || "Failed to create payment intent"
    );
  }
};

export const confirmPayment = async (paymentIntentId, cartId) => {
  try {
    const response = await Api.post(
      "confirm-payment/",
      {
        payment_intent_id: paymentIntentId,
        cart_id: cartId,
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
