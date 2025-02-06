import React, { useState, useEffect } from "react";
import GradientButton from "../../components/GradientButton";
import { MoveRight, X } from "lucide-react";
import { motion } from "framer-motion";
import craftWebp from "../../assets/images/craft-min.webp";
import craftPng from "../../assets/images/craft-min.png";

const Hsection2 = () => {
  const [isTemplateModalOpen, setTemplateModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState("inches");
  const [customWidth, setCustomWidth] = useState("12");
  const [customHeight, setCustomHeight] = useState("12");
  const [price, setPrice] = useState(0);

  const templates = [
    {
      id: 1,
      title: "Acrylic Photo Prints",
      image:
        "https://kotart.in/cdn/shop/products/Kotart-Modern-Abstract-Art-Paintings-for-Living-Room-Bedroom-Wall-Decor-Paintings-for-Home-Decor-2.jpg?v=1697554365&width=1946",
      basePrice: 99.99,
      sizes: [
        { width: 12, height: 12 },
        { width: 18, height: 18 },
        { width: 24, height: 24 },
      ],
      baseSizeIndex: 0,
    },
    {
      id: 2,
      title: "Canvas Prints",
      image: "https://m.media-amazon.com/images/I/81LFRsQs-wL.jpg",
      basePrice: 99.99,
      sizes: [
        { width: 12, height: 12 },
        { width: 18, height: 18 },
        { width: 24, height: 24 },
      ],
      baseSizeIndex: 0,
    },
    // ... other templates remain the same
  ];

  // Price calculation remains the same
  useEffect(() => {
    if (selectedTemplate) {
      const baseSize = selectedTemplate.sizes[selectedTemplate.baseSizeIndex];
      const selectedSize = selectedTemplate.sizes[selectedSizeIndex];
      const baseArea = baseSize.width * baseSize.height;
      const selectedArea = selectedSize.width * selectedSize.height;
      const sizeMultiplier = selectedArea / baseArea;
      setPrice(selectedTemplate.basePrice * quantity * sizeMultiplier);
    }
  }, [selectedTemplate, quantity, selectedSizeIndex]);

  useEffect(() => {
    if (!selectedTemplate) {
      setSelectedTemplate(templates[0]);
    }
  }, [selectedTemplate]);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setSelectedSizeIndex(0);
    setTemplateModalOpen(false);
  };

  const Modal = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        />
        <div className="relative bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto m-4">
          {children}
        </div>
      </div>
    );
  };

  if (!selectedTemplate) return null;

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
            <h2 className="text-2xl font-bold">{selectedTemplate.title}</h2>
            <button
              onClick={() => setTemplateModalOpen(true)}
              className="text-red-500 hover:text-red-600 font-medium"
            >
              Change &gt;
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left side - Image */}
            <div>
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <img
                  src={selectedTemplate.image}
                  alt={selectedTemplate.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Price moved here */}
              <div className="mt-4">
                <label className="text-gray-600">Price total:</label>
                <div className="text-2xl font-bold">${price.toFixed(2)}</div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="space-y-4">
              {/* Standard Size */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-semibold">Standard Size:</label>
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
                  onChange={(e) =>
                    setSelectedSizeIndex(parseInt(e.target.value))
                  }
                >
                  {selectedTemplate.sizes.map((size, index) => (
                    <option key={index} value={index}>
                      {size.width}×{size.height} {selectedUnit}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Size */}
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

              {/* Quantity */}
              <div>
                <label className="font-medium block mb-2">Quantity</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-1/2 p-3 border border-red-400 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price section removed from here */}
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">
            Craft Your Style, Ship Your Smile!
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Create stunning custom signage in your preferred measurements.
            Perfect for both personal and professional applications.
          </p>
          <div className="w-full flex justify-center lg:justify-start">
            <GradientButton text="Start Designing" Icon={MoveRight} />
          </div>
          <div className="flex justify-center lg:justify-end">
               <picture>
                    <source srcSet={craftWebp} type="image/webp" />
                    <img
                      src={craftPng}
                      alt="craft-Img"
                      className="hidden sm:block   w-78 pointer-events-none"
                      loading="lazy"
                    />
                  </picture>
          </div>
        </div>

        {/* Template Selection Modal */}
        <Modal
          isOpen={isTemplateModalOpen}
          onClose={() => setTemplateModalOpen(false)}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Choose Product Type</h2>
              <button
                onClick={() => setTemplateModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="relative group cursor-pointer rounded-lg overflow-hidden"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <img
                    src={template.image}
                    alt={template.title}
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-medium text-center p-2">
                      {template.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      </section>
    </motion.div>
  );
};

export default Hsection2;
