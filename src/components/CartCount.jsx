import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartCount() {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    // Initial count
    updateCount();

    // Listen for storage changes
    window.addEventListener("storage", updateCount);

    // Custom event listener for cart updates
    window.addEventListener("cartUpdated", updateCount);

    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("cartUpdated", updateCount);
    };
  }, []);

  const updateCount = () => {
    const cartData = JSON.parse(sessionStorage.getItem("cart")) || {
      cart_items: [],
    };
    setItemCount(cartData.cart_items.length);
  };

  return (
    <Link to="/cart" className="relative">
      <ShoppingCart className="w-6 h-6 text-gray-700" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
