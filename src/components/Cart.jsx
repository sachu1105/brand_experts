import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";
import { toast } from "react-toastify";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(
    () => JSON.parse(sessionStorage.getItem("cart")) || { cart_items: [] }
  );

  const updateCart = (newCart) => {
    setCart(newCart);
    sessionStorage.setItem("cart", JSON.stringify(newCart));
    // Dispatch custom event to notify CartCount component
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (timestamp) => {
    const newCart = {
      ...cart,
      cart_items: cart.cart_items.filter(
        (item) => item.timestamp !== timestamp
      ),
    };
    updateCart(newCart);
    toast.success("Item removed from cart");
  };

  const updateQuantity = (timestamp, newQuantity) => {
    if (newQuantity < 1) return;
    const newCart = {
      ...cart,
      cart_items: cart.cart_items.map((item) => {
        if (item.timestamp === timestamp) {
          const newTotal =
            (parseFloat(item.total) / item.quantity) * newQuantity;
          return { ...item, quantity: newQuantity, total: newTotal.toFixed(2) };
        }
        return item;
      }),
    };
    updateCart(newCart);
  };

  if (cart.cart_items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate("/products")}
          className="bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white px-6 py-2 rounded-lg hover:shadow-lg"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

      <div className="space-y-6">
        {cart.cart_items.map((item) => (
          <div
            key={item.timestamp}
            className="bg-white rounded-lg shadow-lg p-6 border border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Product Info Column */}
              <div className="md:col-span-2">
                <div className="flex gap-4">
                  <div className="relative group">
                    <img
                      src={item.design_image}
                      alt="Design preview"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    {/* Hover zoom */}
                    <div className="hidden group-hover:block absolute -right-[300px] top-0 z-10">
                      <img
                        src={item.design_image}
                        alt="Design preview large"
                        className="w-72 h-72 object-cover rounded-lg shadow-xl"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>
                        Size:{" "}
                        {item.standardSize ||
                          `${item.customSize.width}x${item.customSize.height} ${item.measurementUnit}`}
                      </p>
                      <p>Design ID: {item.timestamp.toString().slice(-8)}</p>
                      <p>
                        Unit Price: $
                        {(parseFloat(item.total) / item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex flex-col items-center justify-center">
                <label className="text-sm text-gray-600 mb-2">Quantity</label>
                <div className="flex items-center gap-2 border rounded-lg p-1">
                  <button
                    onClick={() =>
                      updateQuantity(item.timestamp, item.quantity - 1)
                    }
                    className="p-1 hover:bg-gray-100 rounded w-8 h-8 flex items-center justify-center"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        item.timestamp,
                        parseInt(e.target.value) || 1
                      )
                    }
                    className="w-16 text-center border-none focus:ring-0"
                  />
                  <button
                    onClick={() =>
                      updateQuantity(item.timestamp, item.quantity + 1)
                    }
                    className="p-1 hover:bg-gray-100 rounded w-8 h-8 flex items-center justify-center"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="flex flex-col items-center justify-center">
                <span className="text-sm text-gray-600 mb-1">Total</span>
                <span className="text-xl font-bold">${item.total}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4">
                <button
                  onClick={() => removeItem(item.timestamp)}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 p-2"
                >
                  <Trash2 size={20} />
                  <span className="text-sm">Remove</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <div className="flex justify-start">
          <button
            onClick={() => navigate("/products")}
            className="text-red-500 hover:text-red-600 flex items-center gap-2 cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Continue Shopping
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2 text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal ({cart.cart_items.length} items)</span>
              <span>
                $
                {cart.cart_items
                  .reduce((sum, item) => sum + parseFloat(item.total), 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-gray-500">Calculated at checkout</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span>
                  $
                  {cart.cart_items
                    .reduce((sum, item) => sum + parseFloat(item.total), 0)
                    .toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <button className="w-full mt-6 bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all cursor-pointer">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
