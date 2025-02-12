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
  const [measurementUnit, setMeasurementUnit] = useState("inches");
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

  const convertToInches = (value, unit) => {
    switch (unit) {
      case "cm":
        return value / 2.54;
      case "feet":
        return value * 12;
      default:
        return value;
    }
  };

  const calculatePrice = () => {
    const widthInInches = convertToInches(customSize.width, measurementUnit);
    const heightInInches = convertToInches(customSize.height, measurementUnit);
    const area = widthInInches * heightInInches;
    const basePrice = parseFloat(product.price);
    const pricePerSqInch = basePrice / 144;
    return (pricePerSqInch * area * quantity).toFixed(2);
  };

  const getUnitLabel = () => {
    return measurementUnit === "feet" ? "feet" : "inches";
  };

  const handleQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleStandardSizeChange = (e) => {
    const selectedSize = e.target.value;
    setStandardSize(selectedSize);

    // Find the matching standard size object
    const sizeObject = product.standard_sizes.find(
      (size) => size.standard_sizes === selectedSize
    );

    // Update custom size if a standard size is selected
    if (sizeObject) {
      setCustomSize({
        width: parseFloat(sizeObject.width),
        height: parseFloat(sizeObject.height),
      });
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
        <p>- Standard Size: {product.standard_sizes}</p>
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

        <div className="space-y-6 border-1 border-gray-100 p-6 rounded-lg bg-gray-50 ">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-2xl font-bold">{product.name}</h1>
            </div>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-end mb-4">
                <div className="flex gap-4 items-center">
                  <span className="text-sm font-medium">Size:</span>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="inches"
                      checked={measurementUnit === "inches"}
                      onChange={(e) => setMeasurementUnit(e.target.value)}
                      className="mr-2"
                    />
                    Inches
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="feet"
                      checked={measurementUnit === "feet"}
                      onChange={(e) => setMeasurementUnit(e.target.value)}
                      className="mr-2"
                    />
                    Feet
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Standard Size:
                </label>
                {product.standard_sizes && product.standard_sizes.length > 0 ? (
                  <select
                    value={standardSize}
                    onChange={handleStandardSizeChange}
                    className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                  >
                    <option value="">Select a size</option>
                    {product.standard_sizes.map((size, index) => (
                      <option key={index} value={size.standard_sizes}>
                        {size.standard_sizes} inches
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-gray-500 italic">
                    No standard sizes available
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Custom Size:
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600">
                      Width ({getUnitLabel()})
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
                      Height ({getUnitLabel()})
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
