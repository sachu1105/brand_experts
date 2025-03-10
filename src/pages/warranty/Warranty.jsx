import { useState, useEffect } from "react";
import { UploadCloud } from "lucide-react";
import toast from "react-hot-toast";
import register from "../../assets/images/Illustration-min.png";
import API from "../loginSignin/Api";
import { useNavigate } from "react-router-dom";
import WarrantyClaimModal from "../../components/WarrantyClaimModal";
import { uploadInvoice } from "../../services/warrantyStorageService"; // Add this import

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
  verificationStatus, // Add this prop
  verifiedWarranty, // Add this prop
  priceRanges, // Add this prop
  selectedPriceRange, // Add this prop
  handlePriceRangeChange, // Add this prop
  warrantyPlans, // Add this prop
}) => {
  // Predefined invoice value ranges

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
                  Invoice Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleInputChange}
                  placeholder="Enter Invoice Number"
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
                  value={selectedPriceRange}
                  onChange={handlePriceRangeChange}
                  className="w-full py-1.5 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-red-500"
                  required
                >
                  <option value="">Select Price Range</option>
                  {priceRanges.map((range) => (
                    <option key={range.price_range} value={range.price_range}>
                      {range.price_range}
                    </option>
                  ))}
                </select>
              </div>
              {selectedPriceRange && warrantyPlans && (
                <div className="space-y-2">
                  <label className="block text-sm">Select warranty plan</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="warranty_plan_amount"
                        value={warrantyPlans.year1}
                        onChange={handleInputChange}
                        className="text-red-500"
                      />
                      <span className="text-sm">
                        {warrantyPlans.year1} AED - 1 year
                      </span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="warranty_plan_amount"
                        value={warrantyPlans.year2}
                        onChange={handleInputChange}
                        className="text-red-500"
                      />
                      <span className="text-sm">
                        {warrantyPlans.year2} AED - 2 years
                      </span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="warranty_plan_amount"
                        value={warrantyPlans.year5}
                        onChange={handleInputChange}
                        className="text-red-500"
                      />
                      <span className="text-sm">
                        {warrantyPlans.year5} AED - 5 years
                      </span>
                    </label>
                  </div>
                </div>
              )}
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
    invoice_file: "",
    warranty_plan: "",
  });
  const [loading, setLoading] = useState(false);
  const [claimData, setClaimData] = useState({
    warranty_number: "",
    description: "",
  });
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimDetails, setClaimDetails] = useState(null);
  const [priceRanges, setPriceRanges] = useState([]);
  const [warrantyPlans, setWarrantyPlans] = useState({});
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  // Fetch price ranges on component mount
  useEffect(() => {
    fetchPriceRanges();
  }, []);

  // Fetch price ranges from API
  const fetchPriceRanges = async () => {
    try {
      const response = await API.get(
        "https://dash.brandexperts.ae/dash/price-ranges/"
      );
      setPriceRanges(response.data.price_ranges);
    } catch (error) {
      console.error("Error fetching price ranges:", error);
      toast.error("Failed to fetch price ranges");
    }
  };

  // Fetch warranty plans when price range changes
  const fetchWarrantyPlans = async (priceRange) => {
    try {
      const response = await API.get(
        `https://dash.brandexperts.ae/dash/get-warranty-by-price-range/${priceRange}/`
      );
      setWarrantyPlans(response.data);
    } catch (error) {
      console.error("Error fetching warranty plans:", error);
      toast.error("Failed to fetch warranty plans");
    }
  };

  const handlePriceRangeChange = async (e) => {
    const selectedRange = e.target.value;
    setSelectedPriceRange(selectedRange);
    if (selectedRange) {
      await fetchWarrantyPlans(selectedRange);
    }
    setFormData((prev) => ({
      ...prev,
      price_range: selectedRange,
      warranty_plan_amount: "", // Reset warranty plan when price range changes
    }));
  };

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
      try {
        setLoading(true);
        document.getElementById("fileName").textContent = file.name;

        // Upload to Bunny.net storage
        const uploadResult = await uploadInvoice(file);

        // Update form data with the CDN URL
        setFormData((prev) => ({
          ...prev,
          invoice_file: uploadResult.cdnUrl,
        }));

        toast.success("Invoice uploaded successfully");
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Failed to upload invoice");
        document.getElementById("fileName").textContent = "No file chosen";
      } finally {
        setLoading(false);
      }
    }
  };



const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  // Validate required fields
  if (
    !formData.full_name ||
    !formData.email ||
    !formData.phone ||
    !formData.product_name ||
    !formData.invoice_date ||
    !selectedPriceRange ||
    !formData.invoice_file ||
    !formData.warranty_plan_amount
  ) {
    toast.error("Please fill out all required fields.");
    setLoading(false);
    return;
  }

  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    toast.error("Please enter a valid email address.");
    setLoading(false);
    return;
  }

  // Validate phone number
  if (!/^\d+$/.test(formData.phone)) {
    toast.error("Please enter a valid phone number (only digits allowed).");
    setLoading(false);
    return;
  }

  // Validate warranty plan amount (ensure it's a valid number)
  const warrantyPlanAmount = formData.warranty_plan_amount;
  if (isNaN(Number(warrantyPlanAmount))) {
    toast.error("Invalid warranty plan amount.");
    setLoading(false);
    return;
  }

  try {
    const submitData = {
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone,
      invoice_number: formData.product_name, // Assuming product_name is invoice_number
      invoice_date: formData.invoice_date,
      price_range: selectedPriceRange,
      invoice_file: formData.invoice_file,
      warranty_plan_amount: String(warrantyPlanAmount), // Keep as string
    };

    console.log("Submitting data:", submitData);

    const response = await API.post(
      "https://dash.brandexperts.ae/register-warranty/",
      submitData
    );

    if (response.data.message === "Proceed to payment") {
      toast.success("Proceeding to payment...");
      navigate("/warranty-payment", {
        state: {
          client_secret: response.data.client_secret,
          customer_id: response.data.customer_id,
          warranty_id: response.data.warranty_id,
          metadata: {
            name: formData.full_name,
            email: formData.email,
            warranty_plan_amount: response.data.metadata.warranty_plan_amount, // ✅ Access from metadata
          },
        },
      });
    } else {
      toast.error("Unexpected response from server");
    }
  } catch (error) {
    if (error.response) {
      console.error("API Error Response:", error.response.data);
      alert(JSON.stringify(error.response.data, null, 2)); // Show full error
      toast.error("Server error. Please try again.");
    } else if (error.request) {
      console.error("API No Response:", error.request);
      alert("No response from server.");
      toast.error("No response from server.");
    } else {
      console.error("API Request Error:", error.message);
      alert("Request error: " + error.message);
      toast.error("An unexpected error occurred.");
    }
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
          priceRanges={priceRanges}
          selectedPriceRange={selectedPriceRange}
          handlePriceRangeChange={handlePriceRangeChange}
          warrantyPlans={warrantyPlans}
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
