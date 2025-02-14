import Api from "../pages/loginSignin/Api";
import { refreshToken } from "../utils/auth"; // Create this utility

export const submitCartToBackend = async () => {
  try {
    const customerId = sessionStorage.getItem("customer_id");
    const rawCartData = sessionStorage.getItem("cart");
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No authentication token found");
    }

    console.log("Raw cart data from session:", rawCartData);

    if (!rawCartData) {
      throw new Error("Cart data not found in session storage");
    }

    const parsedData = JSON.parse(rawCartData);
    console.log("Parsed cart data:", parsedData);

    const cartItems = parsedData.cart_items;

    if (!customerId || !Array.isArray(cartItems) || cartItems.length === 0) {
      throw new Error("Invalid cart data or missing customer ID");
    }

    // Format cart data to exactly match backend expectations
    const cartPayload = {
      customer_id: parseInt(customerId),
      cart_items: cartItems.map((item) => ({
        productid: item.id, // Changed to match exact backend field name
        name: item.name,
        quantity: parseInt(item.quantity),
        price: parseFloat(item.total) / parseInt(item.quantity),
        total: parseFloat(item.total),
        size: {
          // Changed to match exact backend structure
          width: parseFloat(item.customSize.width),
          height: parseFloat(item.customSize.height),
        },
        design_image: item.design_image,
        unit: "inches",
      })),
    };

    console.log(
      "Cart payload being sent:",
      JSON.stringify(cartPayload, null, 2)
    );

    try {
      const response = await Api.post("cart/", cartPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Store cart_id in session storage if present in response
      if (response.data?.cart?.cart_id) {
        sessionStorage.setItem(
          "cart_id",
          response.data.cart.cart_id.toString()
        );
      }

      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        // Token expired, try to refresh
        const newToken = await refreshToken();
        if (newToken) {
          // Retry with new token
          const retryResponse = await Api.post("cart/", cartPayload, {
            headers: {
              Authorization: `Bearer ${newToken}`,
              "Content-Type": "application/json",
            },
          });

          // Store cart_id in session storage if present in retry response
          if (retryResponse.data?.cart?.cart_id) {
            sessionStorage.setItem(
              "cart_id",
              retryResponse.data.cart.cart_id.toString()
            );
          }

          return retryResponse.data;
        }
      }
      throw error;
    }
  } catch (error) {
    console.error("Cart submission error:", error);
    throw new Error(
      error.response?.data?.detail || error.message || "Failed to submit cart"
    );
  }
};
