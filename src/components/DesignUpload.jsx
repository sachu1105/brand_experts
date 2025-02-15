import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { uploadDesign } from "../services/bunnyStorageService";
import { toast } from "react-toastify";
import { Upload, Edit2, ShoppingCart } from "lucide-react"; // Add these imports

export default function DesignUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadedDesign, setUploadedDesign] = useState(null);
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
      toast.success("Design uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload design");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddToCart = () => {
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Upload Your Design</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left side - Upload and Preview */}
          <div className="space-y-6">
            <div
              className={`border-2 border-dashed border-gray-300 rounded-lg p-8 relative ${
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

            {selectedFile && !uploadedDesign && (
              <button
                onClick={handleSubmit}
                disabled={isUploading}
                className="w-full px-6 py-3 border border-red-600  text-red-600 rounded-lg hover:bg-red-500 hover:text-white disabled:opacity-50 transition transform hover:scale-102 delay-100 cursor-pointer"
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
                disabled={!previewUrl}
                className="w-48  bg-gradient-to-r from-[#BF1A1C] to-[#590C0D] text-white px-8 py-4 rounded-xl
                hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
