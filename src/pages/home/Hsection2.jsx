"use client";

import { useState, useEffect } from "react";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import ProductSelectionModal from "../../components/ProductSelectionModal";
import DesignModal from "../../components/DesignModal";
import craftWebp from "../../assets/images/craft-min.webp";
import craftPng from "../../assets/images/craft-min.png";
import API from "../loginSignin/Api";

const Hsection2 = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState("inches");
  const [customWidth, setCustomWidth] = useState("12");
  const [customHeight, setCustomHeight] = useState("12");
  const [price, setPrice] = useState(0);
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [isDesignModalOpen, setDesignModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFirstProduct = async () => {
      setIsLoading(true);
      try {
        // Fetch products from the API
        const response = await API.get("/dash/products"); // Ensure this endpoint is correct
        const products = response.data.products; // Access the products array within data
  
        if (products.length > 0) {
          const firstProduct = products[0];
          setSelectedProduct({
            id: firstProduct.id,
            name: firstProduct.name,
            image: firstProduct.image1, // Use image1 as the primary image
            basePrice: parseFloat(firstProduct.price), // Parse price to number
            sizes: [
              { width: 12, height: 12 },
              { width: 18, height: 18 },
              { width: 24, height: 24 },
              { width: 0, height: 0, custom: true }, // Custom size option
            ],
          });
        } else {
          console.warn("No products found in the API response.");
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchFirstProduct();
  }, []);



  // Calculate price whenever dependencies change
  useEffect(() => {
    if (selectedProduct) {
      calculatePrice();
    }
  }, [selectedProduct, quantity, selectedSizeIndex, customWidth, customHeight]);

  // Price calculation logic
  const calculatePrice = () => {
    if (!selectedProduct) return;

    const baseSize = selectedProduct.sizes[0];
    const selectedSize = selectedProduct.sizes[selectedSizeIndex];
    const baseArea = baseSize.width * baseSize.height;
    const selectedArea = selectedSize.custom
      ? Number.parseFloat(customWidth) * Number.parseFloat(customHeight)
      : selectedSize.width * selectedSize.height;
    const sizeMultiplier = selectedArea / baseArea;

    const calculatedPrice = selectedProduct.basePrice * quantity * sizeMultiplier;
    setPrice(calculatedPrice);
  };

  // Handle product selection from modal
  const handleProductChange = async (newProduct) => {
    setIsLoading(true);
    try {
      setSelectedProduct({
        id: newProduct.id,
        name: newProduct.name,
        image: newProduct.image1,
        basePrice: newProduct.price,
        sizes: [
          { width: 12, height: 12 },
          { width: 18, height: 18 },
          { width: 24, height: 24 },
          { width: 0, height: 0, custom: true }, // Custom size option
        ],
      });
      setSelectedSizeIndex(0); // Reset size selection
    } finally {
      setIsLoading(false);
    }
  };

  // Handle "Proceed" button click
  const handleStartDesigning = () => {
    if (selectedProduct) {
      setDesignModalOpen(true);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <section className="min-h-[50vh] flex flex-col lg:flex-row items-center justify-between px-8 py-8 lg:py-12 max-w-7xl mx-auto gap-8 overflow-hidden">
        {/* Product Card */}
        <div className="w-full lg:w-1/2 bg-white rounded-lg p-6 shadow-2xl border-1 border-gray-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {selectedProduct ? selectedProduct.name : "Select a Product"}
            </h2>
            <button
              onClick={() => setProductModalOpen(true)}
              className="text-red-500 hover:text-red-600 font-medium"
            >
              {selectedProduct ? "Change" : "Select"} &gt;
            </button>
          </div>

          {selectedProduct && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left side - Image */}
              <div>
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <img
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4">
                  <label className="text-gray-600">Price total:</label>
                  <div className="text-2xl font-bold">{price.toFixed(2)} AED</div>
                </div>
              </div>

              {/* Right side - Form */}
              <div className="space-y-4">
                {/* Standard Size */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-semibold">Size:</label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={selectedUnit === "inches"}
                          onChange={() => setSelectedUnit("inches")}
                          className="mr-2"
                        />
                        Inch
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={selectedUnit === "feet"}
                          onChange={() => setSelectedUnit("feet")}
                          className="mr-2"
                        />
                        Feet
                      </label>
                    </div>
                  </div>
                  <select
                    className="w-full p-3 border border-red-400 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                    value={selectedSizeIndex}
                    onChange={(e) => setSelectedSizeIndex(Number.parseInt(e.target.value))}
                  >
                    {selectedProduct.sizes.map((size, index) => (
                      <option key={index} value={index}>
                        {size.custom ? "Custom Size" : `${size.width}×${size.height} ${selectedUnit}`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Custom Size */}
                {selectedProduct.sizes[selectedSizeIndex].custom && (
                  <div>
                    <label className="font-semibold block mb-2">Custom size</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-600">Width</label>
                        <input
                          type="number"
                          value={customWidth}
                          onChange={(e) => setCustomWidth(e.target.value)}
                          className="w-full p-3 border border-red-400 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Height</label>
                        <input
                          type="number"
                          value={customHeight}
                          onChange={(e) => setCustomHeight(e.target.value)}
                          className="w-full p-3 border border-red-400 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <label className="font-medium block mb-2">Quantity</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                    className="w-1/2 p-3 border border-red-400 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Proceed button */}
                <div className="w-full mt-4">
                  <button
                    onClick={handleStartDesigning}
                    className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg hover:from-red-700 hover:to-red-900 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <span>Proceed</span>
                    <MoveRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">Craft Your Style, Ship Your Smile!</h1>
          <p className="text-lg text-gray-600 mb-4">
            Create stunning custom signage in your preferred measurements. Perfect for both personal and professional
            applications.
          </p>
          <div className="flex justify-center lg:justify-end">
            <picture>
              <source srcSet={craftWebp} type="image/webp" />
              <img
                src={craftPng || "/placeholder.svg"}
                alt="craft-Img"
                className="hidden sm:block w-78 pointer-events-none"
                loading="lazy"
              />
            </picture>
          </div>
        </div>

        {/* Product Selection Modal */}
        <ProductSelectionModal
          isOpen={isProductModalOpen}
          onClose={() => setProductModalOpen(false)}
          onSelect={handleProductChange}
        />

        {/* Design Modal */}
        <DesignModal
          isOpen={isDesignModalOpen}
          onClose={() => setDesignModalOpen(false)}
          productDetails={
            selectedProduct
              ? {
                  id: selectedProduct.id,
                  name: selectedProduct.name,
                  size: selectedProduct.sizes[selectedSizeIndex],
                  customSize: { width: customWidth, height: customHeight },
                  quantity,
                  total: price,
                }
              : null
          }
        />
      </section>
    </motion.div>
  );
};

export default Hsection2;