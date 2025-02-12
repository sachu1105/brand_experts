import { useState } from "react";
import { UploadCloud } from "lucide-react";
import toast from "react-hot-toast";
import register from "../../assets/images/Illustration-min.png";
import API from "../loginSignin/Api";
import { useNavigate } from "react-router-dom"; // Add this import
import WarrantyClaimModal from "../../components/WarrantyClaimModal";

// Extracted WarrantyForm component outside of Warranty
const WarrantyForm = ({
  activeTab,
  formData,
  selectedValue,
  customValue,
  handleInputChange,
  handleValueChange,
  handleFileChange,
  handleSubmit,
  loading,
  claimData,
  handleClaimChange,
  handleClaimSubmit,
}) => {
  // Predefined invoice value ranges
  const invoiceRanges = [
    { label: "1,000 AED", value: "0-1000" },
    { label: "5,000 AED", value: "1001-5000" },
    { label: "10,000 AED", value: "5001-10000" },
    { label: "50,000 AED", value: "10001-50000" },
    { label: "50,001+ AED", value: "custom" },
  ];

  if (activeTab === "register") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-8 ">
        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-xl font-semibold">Register Your Warranty</h2>
          <p className="text-gray-600 text-sm">
            Protect your purchase with our comprehensive warranty plans
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  placeholder="Enter your Full Name"
                  className="w-full py-1.5 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@gmail.com"
                  className="w-full py-1.5 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter Phone number"
                  className="w-full py-1.5 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  className="w-full py-1.5 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">
                  Invoice date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="invoice_date"
                  value={formData.invoice_date}
                  onChange={handleInputChange}
                  placeholder="Select date"
                  className="w-full py-1.5 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-red-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm mb-1">
                  Invoice Value (AED) <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedValue}
                  onChange={handleValueChange}
                  className="w-full py-1.5 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-red-500"
                  required
                >
                  <option value="">Select Invoice Value</option>
                  {invoiceRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
                {selectedValue === "custom" && (
                  <input
                    type="number"
                    name="invoice_value"
                    value={customValue}
                    onChange={handleInputChange}
                    placeholder="Enter custom value"
                    className="w-full mt-2 py-1.5 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-red-500"
                    required
                    min="0"
                    step="any"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">
                Upload Invoice <span className="text-red-500">*</span>
              </label>
              <div className="border border-gray-200 rounded-md py-1.5 px-3 flex flex-wrap items-center gap-2">
                <input
                  type="file"
                  id="invoiceUpload"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("invoiceUpload").click()
                  }
                  className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                >
                  <UploadCloud className="w-4 h-4 mr-2" />
                  Choose file
                </button>
                <span id="fileName" className="text-sm text-gray-500 break-all">
                  No file chosen
                </span>
                <input
                  type="hidden"
                  name="invoice_file"
                  value={formData.invoice_file || ""}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm">Select warranty plan</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="warranty_plan"
                    value="799_1yr"
                    checked={formData.warranty_plan === "799_1yr"}
                    onChange={handleInputChange}
                    className="text-red-500"
                  />
                  <span className="text-sm">799 AED - 1 year</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="warranty_plan"
                    value="999_2yr"
                    checked={formData.warranty_plan === "999_2yr"}
                    onChange={handleInputChange}
                    className="text-red-500"
                  />
                  <span className="text-sm">999 AED - 2 years</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="warranty_plan"
                    value="1799_5yr"
                    checked={formData.warranty_plan === "1799_5yr"}
                    onChange={handleInputChange}
                    className="text-red-500"
                  />
                  <span className="text-sm">1799 AED - 5 years</span>
                </label>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-58 bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] hover:shadow-xl text-white font-bold py-2.5 px-4 rounded-md transition-all duration-300 cursor-pointer hover:scale-[0.98] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Proceed to payment"}
              </button>
            </div>
          </form>
        </div>

        <div className="hidden lg:flex lg:col-span-2 items-center justify-center">
          <img
            src={register}
            alt="Warranty Registration"
            className="w-full max-w-md h-auto"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-8">
        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-xl font-semibold">Claim Your Warranty</h2>
          <p className="text-gray-600 text-sm">
            Submit a warranty claim for your registered product
          </p>

          <form onSubmit={handleClaimSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">
                Warranty Registration Number{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="warranty_number"
                value={claimData.warranty_number}
                onChange={handleClaimChange}
                placeholder="Enter your warranty registration number"
                className="w-full py-1.5 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">
                Claim message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={claimData.description}
                onChange={handleClaimChange}
                placeholder="Please describe the issue you are experiencing"
                className="w-full py-1.5 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-red-500"
                rows="6"
                required
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-48 bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] hover:shadow-xl text-white font-bold py-2.5 px-4 rounded-md transition-all duration-300 cursor-pointer hover:scale-[0.98] active:scale-95 disabled:opacity-70"
              >
                {loading ? "Processing..." : "Submit claim"}
              </button>
            </div>
          </form>
        </div>

        <div className="hidden lg:flex lg:col-span-2 items-center justify-center">
          <img
            src={register}
            alt="Warranty Claim"
            className="w-full max-w-md h-auto"
          />
        </div>
      </div>
    );
  }
};

const Warranty = () => {
  const navigate = useNavigate(); // Add this line
  const [activeTab, setActiveTab] = useState("register");
  const [selectedValue, setSelectedValue] = useState("");
  const [customValue, setCustomValue] = useState("");
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    product_name: "",
    invoice_date: "",
    invoice_value: "",
    invoice_file: null,
    warranty_plan: "799_1yr",
  });
  const [loading, setLoading] = useState(false);
  const [claimData, setClaimData] = useState({
    warranty_number: "",
    description: "",
  });
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimDetails, setClaimDetails] = useState(null);

  const handleValueChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    if (value !== "custom") {
      setCustomValue("");
      const numericValue = value.split("-")[1] || value.split("-")[0];
      setFormData((prev) => ({
        ...prev,
        invoice_value: numericValue,
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      return;
    }

    if (name === "invoice_value") {
      setCustomValue(value);
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const mockFileUrl = `https://storage.brandexperts.ae/invoices/${file.name}`;
      document.getElementById("fileName").textContent = file.name;
      setFormData((prev) => ({
        ...prev,
        invoice_file: mockFileUrl,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        invoice_value:
          selectedValue === "custom" ? customValue : formData.invoice_value,
      };

      const response = await API.post("register-warranty/", submitData);

      toast.success(
        `${response.data.message}\nWarranty Number: ${response.data.warranty_number}`
      );
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        product_name: "",
        invoice_date: "",
        invoice_value: "",
        invoice_file: null,
        warranty_plan: "799_1yr",
      });
      setSelectedValue("");
      setCustomValue("");
      document.getElementById("fileName").textContent = "No file chosen";
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to register warranty"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClaimChange = (e) => {
    const { name, value } = e.target;
    setClaimData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClaimSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post("create_claim_warranty/", claimData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        // Store claim details and show modal
        setClaimDetails(response.data);
        setShowClaimModal(true);

        // Show success message
        toast.success("Warranty claim submitted successfully");

        // Reset form
        setClaimData({ warranty_number: "", description: "" });
      }
    } catch (error) {
      console.error("Claim submission error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to submit warranty claim. Please try again.";
      toast.error(errorMessage, {
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-8 px-4 mb-48 ">
      <div className="flex w-full sm:w-fit mx-auto border border-red-100 rounded-full p-1 mb-8">
        <button
          className={`flex-1 sm:flex-none px-4 py-1.5 rounded-full text-sm ${
            activeTab === "register"
              ? "bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white"
              : "text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("register")}
        >
          Register Warranty
        </button>
        <button
          className={`flex-1 sm:flex-none px-4 py-1.5 rounded-full text-sm ${
            activeTab === "claim"
              ? "bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white"
              : "text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("claim")}
        >
          Claim Warranty
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 sm:p-6">
        <WarrantyForm
          activeTab={activeTab}
          formData={formData}
          selectedValue={selectedValue}
          customValue={customValue}
          handleInputChange={handleInputChange}
          handleValueChange={handleValueChange}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
          loading={loading}
          claimData={claimData}
          handleClaimChange={handleClaimChange}
          handleClaimSubmit={handleClaimSubmit}
        />
      </div>

      {showClaimModal && claimDetails && (
        <WarrantyClaimModal
          claimDetails={claimDetails}
          onClose={() => setShowClaimModal(false)}
        />
      )}
    </div>
  );
};

export default Warranty;
