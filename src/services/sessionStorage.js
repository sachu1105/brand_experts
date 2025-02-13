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
      Array.isArray(parsedData.cartitems)
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
      customerid: null,
      cartitems: [],
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
      productid: item.id,
      customwidth: parseFloat(item.customSize?.width) || 0,
      customheight: parseFloat(item.customSize?.height) || 0,
      sizeunit: item.measurementUnit || "inches",
      designimage: item.designUrl || "",
      quantity: parseInt(item.quantity) || 1,
      price: parseFloat(item.price) || 0,
      totalprice: parseFloat(item.total) || 0,
      status: "pending",
    };

    cart.cartitems.push(formattedItem);
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
    cart.customerid = customerId;
    saveToSession(cart);
  }
};

export const validateCart = () => {
  const cart = getFromSession();
  if (!cart || !Array.isArray(cart.cartitems)) {
    clearSession();
    return initializeCart();
  }
  return cart;
};
