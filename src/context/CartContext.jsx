import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCart = () => {
      try {
        const cartData = JSON.parse(sessionStorage.getItem("cart")) || [];
        setCart(cartData);
        const cartTotal = cartData.reduce(
          (sum, item) => sum + (parseFloat(item.total) || 0),
          0
        );
        setTotal(cartTotal);
      } catch (error) {
        console.error("Error loading cart data:", error);
        setCart([]);
        setTotal(0);
      }
    };

    fetchCart();
  }, []);

  const addToCart = (item) => {
    try {
      setCart((prevCart) => {
        const updatedCart = [...prevCart, item];
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });
      setTotal((prevTotal) => prevTotal + (parseFloat(item.total) || 0));
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const removeFromCart = (itemId) => {
    try {
      setCart((prevCart) => {
        const itemToRemove = prevCart.find((item) => item.id === itemId);
        if (!itemToRemove) return prevCart;

        const updatedCart = prevCart.filter((item) => item.id !== itemId);
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
        setTotal(
          (prevTotal) => prevTotal - (parseFloat(itemToRemove.total) || 0)
        );
        return updatedCart;
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const value = {
    cart,
    total,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
