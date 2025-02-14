const CART_KEY = "temp_cart";

export const saveToSession = (cartData) => {
  sessionStorage.setItem(CART_KEY, JSON.stringify(cartData));
};

export const getFromSession = () => {
  try {
    const data = sessionStorage.getItem(CART_KEY);
    if (!data) return null;

    const parsedData = JSON.parse(data);

    // Handle both array and object structures
    if (Array.isArray(parsedData.cart_items) || Array.isArray(parsedData)) {
      return {
        customer_id:
          parsedData.customer_id || sessionStorage.getItem("customer_id"),
        cart_items: Array.isArray(parsedData.cart_items)
          ? parsedData.cart_items
          : parsedData,
      };
    }

    console.error("Invalid cart data structure in session");
    return null;
  } catch (error) {
    console.error("Error reading cart from session:", error);
    return null;
  }
};

export const initializeCart = () => {
  const existingCart = getFromSession();
  if (!existingCart) {
    const newCart = {
      customer_id: null,
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

    const quantity = parseInt(item.quantity) || 1;
    const unitPrice = parseFloat(item.price) || 0;
    const totalPrice = unitPrice * quantity;

    // Format item to match your current structure
    const formattedItem = {
      id: item.id,
      name: item.name,
      customSize: {
        width: parseFloat(item.customSize?.width) || 0,
        height: parseFloat(item.customSize?.height) || 0,
      },
      design_image: item.design_image || "",
      quantity: quantity,
      price: unitPrice, // Individual item price
      total: totalPrice, // Total price for this item
      timestamp: Date.now(),
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

export const clearSession = () => {
  sessionStorage.removeItem(CART_KEY);
};

export const validateCartData = () => {
  try {
    const data = sessionStorage.getItem(CART_KEY);
    if (!data) return false;

    const parsedData = JSON.parse(data);
    const customerId =
      parsedData.customer_id || sessionStorage.getItem("customer_id");

    // Check if we have either cart_items array or direct array
    const cartItems = Array.isArray(parsedData.cart_items)
      ? parsedData.cart_items
      : Array.isArray(parsedData)
      ? parsedData
      : null;

    if (!cartItems) {
      console.error("No valid cart items found");
      return false;
    }

    if (!customerId) {
      console.error("No customer ID found");
      return false;
    }

    if (cartItems.length === 0) {
      console.error("Cart is empty");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error validating cart data:", error);
    return false;
  }
};
