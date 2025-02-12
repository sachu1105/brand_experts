import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Upload, X, Check, AlertCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

export default function DesignUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const productDetails = location.state?.productDetails;
  const { dispatch } = useCart();

  if (!productDetails) {
    return navigate("/products");
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check file type
      if (!selectedFile.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }
      // Check file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size should be less than 10MB");
        return;
      }

      setFile(selectedFile);
      setError("");
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleAddToCart = () => {
    if (!file) {
      setError("Please upload a design file first");
      return;
    }

    const cartItem = {
      ...productDetails,
      designFile: file,
      preview: preview,
      timestamp: new Date().getTime(),
    };

    dispatch({
      type: "ADD_ITEM",
      payload: cartItem,
    });

    // Show success notification
    toast.success("Added to cart successfully!");
    navigate("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Summary */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Product:</span>
              <span>{productDetails.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Size:</span>
              <span>{productDetails.size}</span>
            </div>
            <div className="flex justify-between">
              <span>Quantity:</span>
              <span>{productDetails.quantity}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${productDetails.total}</span>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Upload Your Design</h2>

          {!preview ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className="flex flex-col items-center">
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <label className="cursor-pointer bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
                  Select File
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="mt-2 text-sm text-gray-500">
                  Supported formats: PNG, JPG, PDF (max 10MB)
                </p>
              </div>
            </div>
          ) : (
            <div className="relative">
              <img
                src={preview}
                alt="Design preview"
                className="w-full rounded-lg"
              />
              <button
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                }}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            className={`w-full py-4 rounded-lg font-medium ${
              file
                ? "bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white cursor-pointer"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!file}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
