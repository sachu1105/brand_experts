import React, { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import errorImg from "../assets/images/error.svg";

export default function ProductSelectionModal({ isOpen, onClose, onSelect }) {
  const { data: productsData, isLoading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const filteredProducts = productsData?.products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Select a Product</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[200px] p-4">
            <img
              src={errorImg}
              alt="Error"
              className="w-20 h-20 mb-3 opacity-75"
            />
            <p className="text-gray-600 mb-3">Failed to load products</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelect(product);
                  onClose();
                }}
                className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square mb-2 overflow-hidden rounded-lg">
                  <img
                    src={product.image1 || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-sm">{product.name}</h3>
                <p className="text-sm text-gray-500">${product.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
