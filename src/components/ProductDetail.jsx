"use client";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../hooks/useProducts";

export default function ProductDetail() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useProduct(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [standardSize, setStandardSize] = useState("");
  const [customSize, setCustomSize] = useState({ width: 12, height: 12 });
  const [activeTab, setActiveTab] = useState("Overview");
  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error loading products
      </div>
    );

  const images = [
    product.image1,
    product.image2,
    product.image3,
    product.image4,
  ].filter(Boolean);

  const calculatePrice = () => {
    return (parseFloat(product.price) * quantity).toFixed(2);
  };

  const handleQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productDetails = {
      id: product.id,
      name: product.name,
      size: standardSize,
      customSize,
      quantity,
      total: calculatePrice(),
    };
    navigate("/design-upload", { state: { productDetails } });
  };

  const tabContent = {
    Overview: (
      <div className="space-y-4">
        <p>{product.description}</p>
      </div>
    ),
    Specification: (
      <div className="space-y-4">
        <h4 className="font-semibold">Dimensions</h4>
        <p>- Standard Size: {product.standard_size}</p>
        <p>- Width: {product.width} inches</p>
        <p>- Height: {product.height} inches</p>
        {product.specifications?.map((spec, index) => (
          <p key={index}>{spec}</p>
        ))}
      </div>
    ),
    Installation: (
      <div className="space-y-4">
        {product.installation_steps?.length > 0 ? (
          product.installation_steps.map((step, index) => (
            <p key={index}>{step}</p>
          ))
        ) : (
          <p>Installation instructions will be provided with the product.</p>
        )}
      </div>
    ),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8">
        <a href="/" className="text-gray-600 hover:text-gray-900">
          Home
        </a>
        <span className="text-gray-400">&gt;</span>
        <a href="/products" className="text-gray-600 hover:text-gray-900">
          Products
        </a>
        <span className="text-gray-400">&gt;</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left side - Images */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100">
            <img
              src={images[selectedImage] || "/placeholder.svg"}
              alt="Product preview"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square overflow-hidden rounded-md ${
                  selectedImage === index
                    ? "ring-2 ring-red-500"
                    : "ring-1 ring-gray-200"
                }`}
              >
                <img
                  src={img || "/placeholder.svg"}
                  alt={`Product thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right side - Product Details */}
        <div className="space-y-6 border-1 border-gray-100 p-6 rounded-lg bg-gray-50 ">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-2xl font-bold">{product.name}</h1>
              {/* <span className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full">
                Best Seller
              </span> */}
            </div>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Standard Size:
                </label>
                <select
                  value={standardSize}
                  onChange={(e) => setStandardSize(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                >
                  <option>{product.standard_size}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Custom Size:
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600">
                      Width (inches)
                    </label>
                    <input
                      type="number"
                      value={customSize.width}
                      onChange={(e) =>
                        setCustomSize({
                          ...customSize,
                          width: Number.parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">
                      Height (inches)
                    </label>
                    <input
                      type="number"
                      value={customSize.height}
                      onChange={(e) =>
                        setCustomSize({
                          ...customSize,
                          height: Number.parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                      min="1"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Quantity:
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-24 p-2 border rounded-lg bg-white border-gray-300"
                  min="1"
                />
              </div>
            </div>

            <div className="space-y-4 ">
              <div className="flex items-end flex-col gap-2">
                <span className="text-lg font-medium text-gray-500 ">
                  Price Total:
                </span>
                <span className="text-2xl font-bold">${calculatePrice()}</span>
              </div>

              <button
                type="submit"
                className="w-full  bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white py-4 rounded-lg hover:shadow-lg transition-colors font-medium cursor-pointer"
              >
                GET STARTED →
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="flex gap-8">
            {Object.keys(tabContent).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-4 font-medium ${
                  activeTab === tab
                    ? "border-b-2 border-red-500 text-red-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        <div className="py-8">{tabContent[activeTab]}</div>
      </div>
    </div>
  );
}
