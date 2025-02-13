import React from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { uploadDesign } from "../services/bunnyStorageService";

const DesignModal = ({ isOpen, onClose, productDetails }) => {
  const navigate = useNavigate();

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  const handleUploadDesign = () => {
    onClose(); // Close the modal
    navigate("/design-upload", {
      state: {
        productDetails,
      },
    });
  };

  const options = [
    {
      title: "Hire a designer",
      description: "Save time and choose one of our free templates.",
      icon: (
        <div className="relative">
          <div className="w-16 h-12 border-2 border-gray-600 flex items-center justify-center">
            <div className="w-8 h-6 bg-gray-400" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-white border-2 border-gray-600 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-gray-600 rounded-full" />
          </div>
        </div>
      ),
      onClick: () => {},
      disabled: true,
    },
    {
      title: "Design your own",
      description: "Coming Soon - Create your custom artwork from scratch.",
      icon: (
        <div className="relative">
          <div className="w-12 h-12">
            <div className="w-1 h-12 bg-gray-600 transform rotate-45 translate-x-6" />
            <div className="absolute top-0 left-0 w-4 h-4 bg-gray-600" />
            <div className="absolute bottom-0 right-0 w-6 h-3 border-2 border-gray-600 border-t-0" />
          </div>
        </div>
      ),
      onClick: () => {},
      disabled: true,
    },
    {
      title: "Upload your design",
      description:
        "Have a ready design? Upload it and get it printed on your material of choice.",
      icon: (
        <div className="relative">
          <div className="w-12 h-8 border-2 border-gray-600 flex items-center justify-center">
            <div className="w-6 h-4 bg-gray-400" />
          </div>
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <div className="w-4 h-4 border-t-2 border-l-2 border-r-2 border-gray-600 rounded-t-full" />
          </div>
        </div>
      ),
      onClick: handleUploadDesign,
      disabled: false,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-light text-gray-700 mb-8">
          Create And Customize Your Design
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={option.disabled ? undefined : option.onClick}
              className={`p-6 border border-gray-200 rounded-lg transition-all duration-200 
                ${
                  option.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:border-red-500 hover:shadow-lg cursor-pointer group"
                }`}
            >
              <div className="flex justify-center mb-6">{option.icon}</div>
              <h3
                className={`text-xl font-medium text-gray-800 mb-3 
                ${
                  !option.disabled && "group-hover:text-red-500"
                } transition-colors`}
              >
                {option.title}
              </h3>
              <p className="text-gray-600 text-center">{option.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignModal;
