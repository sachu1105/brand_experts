import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { uploadDesign } from "../services/bunnyStorageService";
import { toast } from "react-toastify";

export default function DesignUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadedDesign, setUploadedDesign] = useState(null);
  const [readyToAddCart, setReadyToAddCart] = useState(false);
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
      setReadyToAddCart(true);
      toast.success("Design uploaded successfully! Review and add to cart.");
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
      design_image: uploadedDesign,
      timestamp: Date.now(),
    };

    const existingCart = JSON.parse(
      sessionStorage.getItem("cart") || '{"customer_id": 2, "cart_items": []}'
    );
    existingCart.cart_items.push(cartItem);
    sessionStorage.setItem("cart", JSON.stringify(existingCart));

    // Dispatch custom event after adding to cart
    window.dispatchEvent(new Event("cartUpdated"));

    toast.success("Added to cart successfully!");
    navigate("/cart");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100" >
        {readyToAddCart ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Review Your Design</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <img
                  src={uploadedDesign}
                  alt="Uploaded design"
                  className="w-full rounded-lg shadow"
                />
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg ">
                  <h3 className="font-semibold mb-4">{productDetails.name}</h3>
                  <p>
                    Size:{" "}
                    {productDetails.standardSize ||
                      `${productDetails.customSize.width}x${productDetails.customSize.height} ${productDetails.measurementUnit}`}
                  </p>
                  <p>Quantity: {productDetails.quantity}</p>
                  <p className="text-xl font-bold mt-4">
                    Total: {productDetails.total} AED
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setReadyToAddCart(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    Upload Different Design
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white py-2 rounded-lg hover:shadow-lg cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-6">Upload Your Design</h1>

            <div className="mb-6">
              <h2 className="font-semibold mb-2">Product Details:</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="mb-2">Product: {productDetails.name}</p>
                <p className="mb-2">
                  Size: {productDetails.size || "Custom Size"}
                </p>
                <p className="mb-2">Quantity: {productDetails.quantity}</p>
                <p>Total: {productDetails.total} AED</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                <input
                  type="file"
                  accept="image/*,.ai,.psd,.eps"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="design-upload"
                />
                <label
                  htmlFor="design-upload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-h-48 object-contain mb-4"
                    />
                  ) : (
                    <>
                      <svg
                        className="w-16 h-16 text-gray-400 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <span className="text-gray-600 text-lg mb-2">
                        Click to upload or drag and drop
                      </span>
                      <span className="text-sm text-gray-500">
                        Supported formats: AI, PSD, EPS, or Image files
                      </span>
                    </>
                  )}
                </label>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!selectedFile || isUploading}
                  className="px-6 py-2 bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white rounded-lg hover:shadow-lg transition-colors disabled:opacity-50"
                >
                  {isUploading ? (
                    <div className="flex items-center">
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                      Uploading...
                    </div>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
