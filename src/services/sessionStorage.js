const CART_KEY = "temp_cart";

export const saveToSession = (cartData) => {
  sessionStorage.setItem(CART_KEY, JSON.stringify(cartData));
};

export const getFromSession = () => {
  try {
    const data = sessionStorage.getItem(CART_KEY);
    const parsedData = data ? JSON.parse(data) : null;

    // Validate cart structure
    if (
      parsedData &&
      typeof parsedData === "object" &&
      Array.isArray(parsedData.cart_items)
    ) {
      return parsedData;
    }
    return null;
  } catch (error) {
    console.error("Error reading cart from session:", error);
    return null;
  }
};

export const clearSession = () => {
  sessionStorage.removeItem(CART_KEY);
};

export const initializeCart = () => {
  const existingCart = getFromSession();
  if (!existingCart) {
    const newCart = {
      customer_id: null, // Will be updated upon login
      cart_items: [],
    };
    saveToSession(newCart);
    return newCart;
  }
  return existingCart;
};

export const addItemToSessionCart = (item) => {
  try {
    const cart = getFromSession() || initializeCart();

    // Format item to match exact required structure
    const formattedItem = {
      product_id: item.id,
      custom_width: parseFloat(item.customSize?.width) || 0,
      custom_height: parseFloat(item.customSize?.height) || 0,
      size_unit: item.measurementUnit || "inches",
      design_image: item.designUrl || "",
      quantity: parseInt(item.quantity) || 1,
      price: parseFloat(item.price) || 0,
      total_price: parseFloat(item.total) || 0,
      status: "pending",
    };

    cart.cart_items.push(formattedItem);
    saveToSession(cart);
    return cart;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return null;
  }
};

export const updateCartCustomerId = (customerId) => {
  const cart = getFromSession();
  if (cart) {
    cart.customer_id = customerId;
    saveToSession(cart);
  }
};

export const validateCart = () => {
  const cart = getFromSession();
  if (!cart || !Array.isArray(cart.cart_items)) {
    clearSession();
    return initializeCart();
  }
  return cart;
};
