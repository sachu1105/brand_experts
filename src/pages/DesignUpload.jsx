import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Upload, X } from "lucide-react";
import { uploadDesign } from "../services/bunnyStorageService";

const DesignUpload = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { productDetails } = location.state || {};

  if (!productDetails) {
    navigate("/products");
    return null;
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      const designUrl = await uploadDesign(file);

      // Get existing cart from session
      const sessionCart = JSON.parse(
        sessionStorage.getItem("cart") || '{"customer_id": 2, "cart_items": []}'
      );

      // Create new cart item
      const newItem = {
        product_id: productDetails.id,
        custom_width: productDetails.customSize.width,
        custom_height: productDetails.customSize.height,
        size_unit: productDetails.measurementUnit,
        design_image: designUrl,
        quantity: productDetails.quantity,
        price: productDetails.price,
        total_price: productDetails.total,
        status: "pending",
      };

      // Add item to cart
      sessionCart.cart_items.push(newItem);
      sessionStorage.setItem("cart", JSON.stringify(sessionCart));

      navigate("/cart");
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-6">Upload Your Design</h2>

        <div className="mb-8">
          <h3 className="text-lg font-medium mb-2">Product Details</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Product</p>
                <p className="font-medium">{productDetails.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Size</p>
                <p className="font-medium">
                  {productDetails.customSize.width} x{" "}
                  {productDetails.customSize.height}{" "}
                  {productDetails.measurementUnit}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Quantity</p>
                <p className="font-medium">{productDetails.quantity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="font-medium">${productDetails.total}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-red-500 transition-colors"
          >
            {file ? (
              <div className="flex items-center justify-center space-x-4">
                <div className="flex-1 truncate">{file.name}</div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div>
                  <p className="text-lg font-medium">
                    Drop your file here or click to upload
                  </p>
                  <p className="text-sm text-gray-500">
                    Supported formats: AI, PSD, PDF, JPG, PNG
                  </p>
                </div>
              </div>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".ai,.psd,.pdf,.jpg,.jpeg,.png"
          />

          <button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? "Uploading..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesignUpload;
