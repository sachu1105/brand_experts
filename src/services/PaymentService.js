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
      console.error("Cart ID not found in session storage");
      throw new Error("Cart ID not found");
    }

    console.log("Starting payment confirmation with:", {
      paymentIntentId,
      cartId,
    });

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

    // Log the raw response
    console.log("Raw API response:", response);
    console.log("Response data:", response.data);

    // If the response includes data with a success property that's true
    // OR if the response includes a success message
    if (
      (response.data && response.data.success === true) ||
      (response.data &&
        response.data.message &&
        response.data.message.toLowerCase().includes("successful"))
    ) {
      console.log("Payment confirmed successfully");
      return {
        success: true,
        message: response.data.message || "Payment successful!",
      };
    }

    console.log("Payment confirmation failed");
    return {
      success: false,
      message: response.data?.message || "Payment confirmation failed",
    };
  } catch (error) {
    console.error("Payment confirmation error:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to confirm payment"
    );
  }
};
