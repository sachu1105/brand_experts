import Api from "../pages/loginSignin/Api";

export const submitCartToBackend = async () => {
  try {
    const customerId = sessionStorage.getItem("customer_id");
    const rawCartData = sessionStorage.getItem("cart");

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

    const response = await Api.post("cart/", cartPayload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Cart submission error details:", {
      error,
      payload: error.config?.data ? JSON.parse(error.config.data) : null,
      message: error.response?.data?.error || error.message,
    });
    throw new Error(
      error.response?.data?.error || error.message || "Failed to submit cart"
    );
  }
};
