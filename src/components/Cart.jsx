import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import EmptyCartIcon from "./EmptyCartIcon";
import { useModal } from "../context/ModalContext";
import { isAuthenticated } from "../utils/auth";

export default function Cart() {
  const { openModal } = useModal();
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

  const handleCheckout = () => {
    if (!isAuthenticated()) {
      openModal("login");
      return;
    }

    // Proceed to checkout/address page
    navigate("/checkout");
  };

  if (cart.cart_items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-160px)] bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="flex justify-center mb-6">
              <EmptyCartIcon className="w-32 h-32 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Your Shopping Cart is Empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start designing your perfect custom products or explore our
              ready-made collections.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate("/products")}
                className="bg-gradient-to-r from-[#BF1A1C] to-[#590C0D] text-white px-8 py-4 rounded-xl
                hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1"
              >
                Browse Products
              </button>
              <button
                onClick={() => navigate("/design")}
                className="bg-white border-2 border-red-600 text-red-600 px-8 py-4 rounded-xl
                hover:bg-red-50 transition-all duration-300"
              >
                Start Designing
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-160px)] bg-gray-50">
      {/* Progress Stepper */}
   
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="lg:w-2/3 ">
            <div className="space-y-4 ">
              {cart.cart_items.map((item) => (
                <div
                  key={item.timestamp}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative group">
                      <img
                        src={item.design_image}
                        alt="Design preview"
                        className="w-40 h-40 object-cover rounded-lg"
                      />
                      <div className="hidden group-hover:block absolute left-full ml-4 top-0 z-10">
                        <img
                          src={item.design_image}
                          alt="Design preview large"
                          className="w-80 h-80 object-cover rounded-lg shadow-xl"
                        />
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col md:flex-row justify-between">
                      <div>
                        <h3 className="font-semibold text-xl mb-2">
                          {item.name}
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p className="flex items-center gap-2">
                            <span className="inline-block w-20">Size:</span>
                            <span className="font-medium">
                              {item.standardSize ||
                                `${item.customSize.width}x${item.customSize.height} ${item.measurementUnit}`}
                            </span>
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="inline-block w-20">
                              Design ID:
                            </span>
                            <span className="font-medium">
                              {item.timestamp.toString().slice(-8)}
                            </span>
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="inline-block w-20">
                              Unit Price:
                            </span>
                            <span className="font-medium">
                              {(parseFloat(item.total) / item.quantity).toFixed(
                                2
                              )}{" "}
                              AED
                            </span>
                          </p>
                        </div>
                        
                      </div>

                      <div className="mt-4 md:mt-0 flex flex-row md:flex-col justify-between items-end gap-4">
                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.timestamp, item.quantity - 1)
                            }
                            className="p-1 hover:bg-white rounded-md transition-colors"
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
                            className="w-16 text-center bg-transparent border-none focus:ring-0"
                          />
                          <button
                            onClick={() =>
                              updateQuantity(item.timestamp, item.quantity + 1)
                            }
                            className="p-1 hover:bg-white rounded-md transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-gray-500">Total</div>
                          <div className="text-xl font-bold text-gray-900">
                            {item.total} AED
                          </div>
                        </div>

                        <button
                          onClick={() => removeItem(item.timestamp)}
                          className="text-red-500 hover:text-red-600 p-2 "
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

           
          </div>

          {/* Order Summary Section - Now floating */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.cart_items.length} items)</span>
                  <span className="font-medium">
                    {cart.cart_items
                      .reduce((sum, item) => sum + parseFloat(item.total), 0)
                      .toFixed(2)}{" "}
                    AED
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>
                      {cart.cart_items
                        .reduce((sum, item) => sum + parseFloat(item.total), 0)
                        .toFixed(2)}{" "}
                      AED
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-gradient-to-r from-[#BF1A1C] to-[#590C0D] text-white px-8 py-4 rounded-xl
                hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag size={20} />
                Proceed to Checkout
              </button>
            </div>
            <button
              onClick={() => navigate("/products")}
              className="mt-8 flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors text-lg cursor-pointer"
            >
              <ArrowLeft size={32} />
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
