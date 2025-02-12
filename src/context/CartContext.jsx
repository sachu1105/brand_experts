import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return { items: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { items: [] };
  }
};

const saveCartState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
    // Handle write errors
    console.error("Error saving cart state:", err);
  }
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.timestamp !== action.payload),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.timestamp === action.payload.timestamp
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "CLEAR_ON_LOGOUT":
      localStorage.removeItem("cart"); // Clear cart from localStorage
      return { items: [] };
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, loadCartState());

  useEffect(() => {
    saveCartState(state);
  }, [state]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "access_token" && !e.newValue) {
        // Token was removed (logout)
        dispatch({ type: "CLEAR_ON_LOGOUT" });
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
