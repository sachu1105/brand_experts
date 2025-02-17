import Api from "../pages/loginSignin/Api";

export const createPaymentIntent = async () => {
  try {
    const cartId = sessionStorage.getItem("cart_id");
    if (!cartId) {
      throw new Error("Cart ID not found");
    }

    const response = await Api.post(
      "/create-payment-intent/",
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

    // Store billing details in session storage for use during payment
    if (response.data?.billing_details) {
      sessionStorage.setItem(
        "billing_details",
        JSON.stringify(response.data.billing_details)
      );
    }

    return {
      clientSecret: response.data.clientSecret,
      billingDetails: response.data.billing_details,
      data: response.data, // Return full response data to access amount and other details
      amount: {
        base: response.data.base_product_amount,
        vat: response.data.vat_amount,
        total: response.data.total_with_vat,
        vatPercentage: response.data.vat_percentage,
      },
    };
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

    console.log("Confirming payment with:", { paymentIntentId, cartId });

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

    console.log("Confirmation API response:", response.data);

    // Explicit success check
    if (response.data && response.data.success === true) {
      return {
        success: true,
        message: response.data.message || "Payment successful!",
      };
    }

    // If we get here, something went wrong
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
