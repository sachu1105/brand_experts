import React, { useState, useEffect } from 'react';
import GradientButton from "../../components/GradientButton";
import { MoveRight, X } from "lucide-react";
import { motion } from "framer-motion";

const Hsection2 = () => {
  const [isTemplateModalOpen, setTemplateModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState('inches');
  const [price, setPrice] = useState(0);

  const templates = [
    {
      id: 1,
      title: 'Acrylic Photo Prints',
      image: 'https://kotart.in/cdn/shop/products/Kotart-Modern-Abstract-Art-Paintings-for-Living-Room-Bedroom-Wall-Decor-Paintings-for-Home-Decor-2.jpg?v=1697554365&width=1946',
      basePrice: 99.99,
      sizes: [
        { width: 12, height: 12 },  // All sizes stored in inches
        { width: 18, height: 18 },
        { width: 24, height: 24 }
      ],
      baseSizeIndex: 0
    },
    {
      id: 2,
      title: 'Acrylic signs',
      image: 'https://s1-ecp.signs.com/sms/Acrylic-Room-Name-16070.jpg',
      basePrice: 69.99,
      sizes: [
        { width: 12, height: 12 },  // All sizes stored in inches
        { width: 18, height: 18 },
        { width: 24, height: 24 }
      ],
      baseSizeIndex: 0
    },
    {
      id: 3,
      title: 'Aluminum signs',
      image: 'https://5.imimg.com/data5/SELLER/Default/2022/9/AR/TW/MD/69601734/aluminium-signs.PNG',
      basePrice: 83.99,
      sizes: [
        { width: 12, height: 12 },  // All sizes stored in inches
        { width: 18, height: 18 },
        { width: 24, height: 24 }
      ],
      baseSizeIndex: 0
    },
    
    // ... other templates with sizes in inches
  ];

  // Unit conversion functions
  const getSizeLabel = (widthInches, heightInches, unit) => {
    switch(unit) {
      case 'cm':
        return `${Math.round(widthInches * 2.54)}cm × ${Math.round(heightInches * 2.54)}cm`;
      case 'feet':
        return `${(widthInches/12).toFixed(1)}ft × ${(heightInches/12).toFixed(1)}ft`;
      default: // inches
        return `${widthInches}" × ${heightInches}"`;
    }
  };

  const convertToInches = (value, unit) => {
    switch(unit) {
      case 'cm': return value / 2.54;
      case 'feet': return value * 12;
      default: return value;
    }
  };

  // Price calculation
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

  // Set initial template
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
        <div className="max-w-xl bg-white rounded-lg shadow-lg border-2 border-gray-200">
          <div className="flex flex-col sm:flex-row">
            {/* Image Section */}
            <div className="sm:w-1/3 p-4">
              <div className="aspect-square relative overflow-hidden rounded-lg">
                <img
                  src={selectedTemplate.image}
                  alt={selectedTemplate.title}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => setTemplateModalOpen(true)}
                  className="absolute top-2 right-2 bg-white text-red-500 px-3 py-1 rounded-md text-sm font-medium hover:bg-red-50"
                >
                  Change
                </button>
              </div>
            </div>

            {/* Controls Section */}
            <div className="sm:w-2/3 p-4">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{selectedTemplate.title}</h2>
                <span className="text-lg font-bold text-red-600">${price.toFixed(2)}</span>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Custom {selectedTemplate.title.toLowerCase()} for indoor/outdoor use
              </p>

              <div className="space-y-4">
                {/* Unit Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Measurement Unit
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={selectedUnit}
                    onChange={(e) => setSelectedUnit(e.target.value)}
                  >
                    <option value="inches">Inches</option>
                    <option value="cm">Centimeters</option>
                    <option value="feet">Feet</option>
                  </select>
                </div>

                {/* Size Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Size
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={selectedSizeIndex}
                    onChange={(e) => setSelectedSizeIndex(parseInt(e.target.value))}
                  >
                    {selectedTemplate.sizes.map((size, index) => (
                      <option key={index} value={index}>
                        {getSizeLabel(size.width, size.height, selectedUnit)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">
            Craft Your Vision with Precision
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Create stunning custom signage in your preferred measurements. 
            Perfect for both personal and professional applications.
          </p>
          <div className="w-full flex justify-center lg:justify-start">
            <GradientButton text="Start Designing" Icon={MoveRight} />
          </div>
        </div>

        {/* Template Selection Modal */}
        <Modal isOpen={isTemplateModalOpen} onClose={() => setTemplateModalOpen(false)}>
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