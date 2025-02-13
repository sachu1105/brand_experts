const CART_KEY = "be_cart_data";

export const getCart = () => {
  const cartData = sessionStorage.getItem(CART_KEY);
  return cartData
    ? JSON.parse(cartData)
    : {
        customer_id: 2, // Default customer ID
        cart_items: [],
      };
};

export const addToCart = (item) => {
  const cart = getCart();
  // Add timestamp to make item unique
  item.timestamp = Date.now();
  cart.cart_items.push(item);
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
  return cart;
};

export const removeFromCart = (timestamp) => {
  const cart = getCart();
  cart.cart_items = cart.cart_items.filter(
    (item) => item.timestamp !== timestamp
  );
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
  return cart;
};

export const updateCartItem = (timestamp, updates) => {
  const cart = getCart();
  cart.cart_items = cart.cart_items.map((item) =>
    item.timestamp === timestamp ? { ...item, ...updates } : item
  );
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
  return cart;
};

export const clearCart = () => {
  sessionStorage.removeItem(CART_KEY);
};

export const initializeCart = () => {
  const existingCart = sessionStorage.getItem("cart");
  if (existingCart) {
    return JSON.parse(existingCart);
  }
  return {
    customer_id: 2, // Hardcoded for now, should come from auth
    cart_items: [],
  };
};

export const saveToSession = (cart) => {
  sessionStorage.setItem("cart", JSON.stringify(cart));
};
