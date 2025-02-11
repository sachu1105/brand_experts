import { useState } from "react";
import { UploadCloud } from "lucide-react";
import register from "../../assets/images/Illustration-min.png";

const Warranty = () => {
  const [activeTab, setActiveTab] = useState("register");

  const WarrantyForm = () => {
    if (activeTab === "register") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-3 space-y-4">
            <h2 className="text-xl font-semibold">Register Your Warranty</h2>
            <p className="text-gray-600 text-sm">
              Protect your purchase with our comprehensive warranty plans
            </p>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your Full Name"
                    className="w-full py-1.5 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@gmail.com"
                    className="w-full py-1.5 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter Phone number"
                    className="w-full py-1.5 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    className="w-full py-1.5 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">
                    Invoice date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    placeholder="Select date"
                    className="w-full py-1.5 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">
                    Invoice Value (AED) <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full py-1.5 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-red-500">
                    <option value="0">0</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Upload Invoice <span className="text-red-500">*</span>
                </label>
                <div className="border border-gray-200 rounded-md py-1.5 px-3">
                  <button
                    type="button"
                    className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                  >
                    <UploadCloud className="w-4 h-4 mr-2" />
                    Choose file
                  </button>
                  <span className="text-sm text-gray-500 ml-4">
                    No file chosen
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm">Select warranty plan</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="plan"
                      className="text-red-500"
                      defaultChecked
                    />
                    <span className="text-sm">799 AED - 1 year</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="plan" className="text-red-500" />
                    <span className="text-sm">999 AED - 2 years</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="plan" className="text-red-500" />
                    <span className="text-sm">1799 AED - 5 years</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-58 bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] hover:shadow-xl text-white font-bold py-2.5 px-4 rounded-md transition-all duration-300 cursor-pointer hover:scale-[0.98] active:scale-95"
                >
                  Proceed to payment
                </button>
              </div>
            </form>
          </div>

          <div className="md:col-span-2 flex items-center justify-center ">
            <img
              src={register}
              alt="Warranty Registration"
              className="w-58 h-auto"
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-3 space-y-4">
            <h2 className="text-xl font-semibold">Claim Your Warranty</h2>
            <p className="text-gray-600 text-sm">Submit a warranty claim for your registered product</p>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm mb-1">
                  Warranty Registration Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your warranty registration number"
                  className="w-full py-1.5 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1">
                  Claim message <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Please describe the issue you are experiencing"
                  className="w-full py-1.5 px-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-red-500"
                  rows="6"
                ></textarea>
              </div>
              <div className="flex justify-center">
              <button
                type="submit"
                className="w-48 bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] hover:shadow-xl text-white font-bold py-2.5 px-4 rounded-md transition-all duration-300 cursor-pointer hover:scale-[0.98] active:scale-95"
              >
                Submit claim
              </button>
              </div>
            </form>
          </div>
          
          <div className="md:col-span-2 flex items-center justify-center">
            <img 
              src={register}
              alt="Warranty Claim" 
              className="w-58 h-auto"
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex w-fit mx-auto border border-red-100 rounded-full p-1 mb-8">
        <button
          className={`px-4 py-1.5 rounded-full text-sm ${
            activeTab === "register"
              ? "bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white"
              : "text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("register")}
        >
          Register Warranty
        </button>
        <button
          className={`px-4 py-1.5 rounded-full text-sm ${
            activeTab === "claim"
              ? "bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white"
              : "text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("claim")}
        >
          Claim Warranty
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-6">
        <WarrantyForm />
      </div>
    </div>
  );
};

export default Warranty;
