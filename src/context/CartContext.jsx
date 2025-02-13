import React, { createContext, useContext, useReducer, useEffect } from "react";
import { getCart } from "../services/cartService";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return action.payload;
    case "UPDATE_ITEM":
      return {
        ...state,
        cart_items: state.cart_items.map((item) =>
          item.timestamp === action.payload.timestamp
            ? { ...item, ...action.payload.updates }
            : item
        ),
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        cart_items: state.cart_items.filter(
          (item) => item.timestamp !== action.payload
        ),
      };
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    customer_id: 2,
    cart_items: [] // Ensure this default value is always present
  });

  const value = {
    state,
    dispatch,
    removeFromCart: (timestamp) => {
      dispatch({ type: 'REMOVE_ITEM', payload: timestamp });
    },
    updateQuantity: (timestamp, quantity) => {
      dispatch({
        type: 'UPDATE_ITEM',
        payload: { timestamp, updates: { quantity: Number(quantity) } }
      });
    }
  };

  useEffect(() => {
    const savedCart = getCart();
    dispatch({ type: 'SET_CART', payload: savedCart });
  }, []);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
