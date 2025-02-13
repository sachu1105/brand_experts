import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const navigate = useNavigate();
  const cartData = JSON.parse(sessionStorage.getItem('cart')) || { cart_items: [] };

  if (cartData.cart_items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate('/products')}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
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
        {cartData.cart_items.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
              <div className="aspect-square w-full max-w-[200px] mx-auto md:mx-0">
                <img
                  src={item.design_image}
                  alt="Design preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <div className="space-y-1 text-gray-600">
                  <p>Size: {item.standardSize || `${item.customSize.width}x${item.customSize.height} ${item.measurementUnit}`}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold">${item.total}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={() => navigate('/products')}
          className="text-red-500 hover:text-red-600"
        >
          Add More Products
        </button>
        
        <div className="text-right">
          <p className="text-lg text-gray-600 mb-2">
            Total: $
            {cartData.cart_items
              .reduce((sum, item) => sum + parseFloat(item.total), 0)
              .toFixed(2)}
          </p>
          <button
            className="bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white px-8 py-3 rounded-lg hover:shadow-lg"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
