import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load cart items on mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem("cart");
        const sessionCart = sessionStorage.getItem("cart");

        let items = [];
        if (savedCart) {
          items = JSON.parse(savedCart);
        } else if (sessionCart) {
          // Migrate from session storage if exists
          const sessionItems = JSON.parse(sessionCart);
          items = sessionItems.cart_items || [];
          sessionStorage.removeItem("cart"); // Clear session storage after migration
        }

        setCartItems(items);
      } catch (error) {
        console.error("Error loading cart:", error);
        setError(error.message);
        setCartItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  // Save cart items whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading]);

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const value = {
    cartItems,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    getCartCount: () => cartItems.length,
    getTotal: () =>
      cartItems.reduce(
        (total, item) => total + (Number(item.total_price) || 0),
        0
      ),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
