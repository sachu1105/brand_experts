import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { uploadDesign } from "../services/bunnyStorageService";
import { toast } from "react-toastify";
import { Upload, Edit2, ShoppingCart, CheckCircle, AlertCircle } from "lucide-react";

export default function DesignUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadedDesign, setUploadedDesign] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // Track user progress: 1=select, 2=confirm, 3=ready
  const navigate = useNavigate();
  const location = useLocation();
  const productDetails = location.state?.productDetails;

  if (!productDetails) {
    navigate("/products");
    return null;
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setCurrentStep(2); // Move to confirm step
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      const uploadResult = await uploadDesign(selectedFile);
      setUploadedDesign(uploadResult.cdnUrl);
      setCurrentStep(3); // Move to ready-for-cart step
      toast.success("Design uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload design");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddToCart = () => {
    // Only allow adding to cart if design is uploaded
    if (currentStep < 3) {
      toast.warning("Please upload and confirm your design first!");
      return;
    }

    const cartItem = {
      id: productDetails.id,
      name: productDetails.name,
      customSize: productDetails.customSize,
      measurementUnit: productDetails.measurementUnit,
      quantity: productDetails.quantity,
      total: productDetails.total,
      standardSize: productDetails.standardSize,
      design_image: uploadedDesign || previewUrl,
      timestamp: Date.now(),
    };

    const existingCart = JSON.parse(
      sessionStorage.getItem("cart") || '{"customer_id": 2, "cart_items": []}'
    );
    existingCart.cart_items.push(cartItem);
    sessionStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success("Added to cart successfully!");
    navigate("/cart");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pt-26 pb-28">
      <div className="bg-white border border-red-100 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Upload Your Design</h1>
        
        {/* Step indicator */}
        <div className="flex items-center mb-8 border-b pb-4">
          <div className={`flex items-center ${currentStep >= 1 ? 'text-red-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 flex items-center justify-center rounded-full mr-2 ${
              currentStep >= 1 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400'
            }`}>1</div>
            <span>Select Design</span>
          </div>
          <div className="w-12 h-1 mx-2 bg-gray-200">
            <div className={`h-full ${currentStep >= 2 ? 'bg-red-600' : 'bg-gray-200'}`} style={{width: currentStep >= 2 ? '100%' : '0%'}}></div>
          </div>
          <div className={`flex items-center ${currentStep >= 2 ? 'text-red-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 flex items-center justify-center rounded-full mr-2 ${
              currentStep >= 2 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400'
            }`}>2</div>
            <span>Confirm Upload</span>
          </div>
          <div className="w-12 h-1 mx-2 bg-gray-200">
            <div className={`h-full ${currentStep >= 3 ? 'bg-red-600' : 'bg-gray-200'}`} style={{width: currentStep >= 3 ? '100%' : '0%'}}></div>
          </div>
          <div className={`flex items-center ${currentStep >= 3 ? 'text-red-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 flex items-center justify-center rounded-full mr-2 ${
              currentStep >= 3 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400'
            }`}>3</div>
            <span>Ready for Cart</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left side - Upload and Preview */}
          <div className="space-y-6">
            <div
              className={`border-2 border-dashed ${currentStep === 3 ? 'border-green-300' : 'border-gray-300'} rounded-lg p-8 relative ${
                previewUrl ? "hover:opacity-90 group" : ""
              }`}
            >
              <input
                type="file"
                accept="image/*,.ai,.psd,.eps"
                onChange={handleFileSelect}
                className="hidden"
                id="design-upload"
              />
              {previewUrl ? (
                <>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-64 object-contain"
                  />
                  {currentStep === 3 && (
                    <div className="absolute top-4 right-4 bg-green-100 text-green-600 rounded-full p-1">
                      <CheckCircle size={24} />
                    </div>
                  )}
                  <label
                    htmlFor="design-upload"
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-white">
                      <Edit2 size={24} />
                      <span>Change Design</span>
                    </div>
                  </label>
                </>
              ) : (
                <label
                  htmlFor="design-upload"
                  className="flex flex-col items-center justify-center cursor-pointer h-64"
                >
                  <Upload size={48} className="text-gray-400 mb-4" />
                  <span className="text-gray-600 text-lg mb-2">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-sm text-gray-500">
                    Supported formats: AI, PSD, EPS, or Image files
                  </span>
                </label>
              )}
            </div>

            {currentStep === 2 && (
              <button
                onClick={handleSubmit}
                disabled={isUploading}
                className="w-full px-6 py-3 border border-red-600 text-red-600 rounded-lg hover:bg-red-500 hover:text-white disabled:opacity-50 transition transform hover:scale-102 delay-100 cursor-pointer"
              >
                {isUploading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                    Uploading...
                  </div>
                ) : (
                  "Confirm Design"
                )}
              </button>
            )}

            {currentStep === 3 && (
              <div className="bg-green-50 p-4 rounded-lg flex items-start">
                <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                <p className="text-green-800">
                  Your design has been successfully uploaded and is ready to be added to the cart!
                </p>
              </div>
            )}

            {currentStep === 1 && previewUrl && (
              <div className="bg-yellow-50 p-4 rounded-lg flex items-start">
                <AlertCircle className="text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                <p className="text-yellow-800">
                  Please click "Confirm Design" to upload your design before adding to cart.
                </p>
              </div>
            )}
          </div>

          {/* Right side - Product Details and Actions */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-xl mb-4">
                {productDetails.name}
              </h3>
              <div className="space-y-3 text-gray-600">
                <p>
                  Size:{" "}
                  {productDetails.standardSize ||
                    `${productDetails.customSize.width}x${productDetails.customSize.height} ${productDetails.measurementUnit}`}
                </p>
                <p>Quantity: {productDetails.quantity}</p>
                <p className="text-xl font-bold text-gray-900 mt-4">
                  Total: {productDetails.total} AED
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex-1 cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handleAddToCart}
                className={`w-48 px-8 py-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                  currentStep === 3 
                    ? "bg-gradient-to-r from-[#BF1A1C] to-[#590C0D] text-white hover:shadow-lg" 
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
            
            {currentStep < 3 && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2">Complete These Steps First:</h4>
                <ol className="list-decimal pl-5 space-y-2">
                  <li className={currentStep >= 1 ? "text-green-600" : ""}>
                    Select your design file
                    {currentStep >= 1 && <CheckCircle className="inline ml-2" size={16} />}
                  </li>
                  <li className={currentStep >= 2 ? "text-green-600" : ""}>
                    Confirm your design upload
                    {currentStep >= 2 && <CheckCircle className="inline ml-2" size={16} />}
                  </li>
                  <li className={currentStep >= 3 ? "text-green-600" : ""}>
                    After confirmation, you can add to cart
                    {currentStep >= 3 && <CheckCircle className="inline ml-2" size={16} />}
                  </li>
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}