import React from "react";
import { Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg bg-white">
      <div className="w-24 h-24 overflow-hidden rounded-md">
        <img
          src={item.design_image || "/placeholder.png"}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-grow">
        <h3 className="font-medium text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-500">
          Size: {item.custom_width}x{item.custom_height} {item.size_unit}
        </p>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex items-center">
            <label className="mr-2 text-sm">Qty:</label>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.timestamp, e.target.value)}
              className="w-16 p-1 border rounded"
            />
          </div>
          <span className="text-gray-600">
            ${(item.total_price / item.quantity).toFixed(2)} each
          </span>
        </div>
      </div>

      <div className="text-right">
        <p className="font-medium text-gray-900">
          ${item.total_price.toFixed(2)}
        </p>
        <button
          onClick={() => removeFromCart(item.timestamp)}
          className="mt-2 text-red-500 hover:text-red-600"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
