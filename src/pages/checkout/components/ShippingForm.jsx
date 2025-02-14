import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Api from "../../../pages/loginSignin/Api";
import { useState } from "react";
import { submitCartToBackend } from "../../../services/cartApi";

const schema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  ext: z.string().optional().nullable(),
  address_line1: z.string().min(1, "Address is required"),
  address_line2: z.string().optional().nullable(),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip_code: z.string().min(1, "ZIP code is required"),
});

export default function ShippingForm({ onNext, initialData, onSave }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      country: "UAE",
      ...initialData,
    },
  });

  const createAddressMutation = useMutation({
    mutationFn: async (formData) => {
      try {
        const customer_id = sessionStorage.getItem("customer_id");
        const user_id = sessionStorage.getItem("user_id");

        console.log("Session IDs:", { customer_id, user_id });

        if (!customer_id) {
          throw new Error("Customer ID not found. Please login again.");
        }

        const payload = {
          customer_id: parseInt(customer_id),
          company_name: formData.company_name,
          ext: formData.ext || "",
          address_line1: formData.address_line1,
          address_line2: formData.address_line2 || "",
          country: formData.country,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zip_code,
        };

        console.log("Sending payload:", payload);

        const response = await Api.post("create-customer-address/", payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        });

        console.log("API Response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Address creation error:", {
          customer_id: sessionStorage.getItem("customer_id"),
          user_id: sessionStorage.getItem("user_id"),
          error: error.response?.data || error.message,
        });
        throw new Error(
          error.response?.data?.error || "Failed to save address"
        );
      }
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Form submitted with data:", data);
      const result = await createAddressMutation.mutateAsync(data);
      console.log("Mutation result:", result);

      if (result.message && result.address_details) {
        toast.success(result.message);
        onSave(result.address_details);
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(error.message || "Failed to save address");
    }
  };

  const handleContinueToPayment = async () => {
    try {
      const customerId = sessionStorage.getItem("customer_id");
      if (!customerId) {
        toast.error("Please login to continue");
        return;
      }

      toast.loading("Processing cart...");
      const cartResponse = await submitCartToBackend();
      toast.dismiss();

      if (cartResponse.success || cartResponse.message) {
        toast.success("Cart processed successfully");
        onNext(); // Proceed to payment step
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      toast.dismiss();
      console.error("Failed to create cart:", error);
      toast.error(error.message || "Failed to process cart. Please try again.");
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow text-center">
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-gray-900">
            Address Added Successfully!
          </h2>
          <p className="mt-2 text-gray-600">
            Your shipping address has been saved.
          </p>
        </div>
        <div className="flex justify-center">
        <button
          onClick={handleContinueToPayment}
          className="w-78 bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white px-6 py-4 text-lg rounded-lg hover:shadow-lg transition-all duration-300"
        >
          Save & Continue to Payment
        </button>
      </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow"
    >
      <h2 className="text-2xl font-semibold mb-6">Shipping Address</h2>

      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        {/* Company Name */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Company Name *
          </label>
          <input
            type="text"
            {...register("company_name")}
            className="mt-1 block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            placeholder="Enter company name"
          />
          {errors.company_name && (
            <p className="mt-1 text-sm text-red-600">
              {errors.company_name.message}
            </p>
          )}
        </div>

        {/* Address Lines */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Address Line 1 *
          </label>
          <input
            type="text"
            {...register("address_line1")}
            className="mt-1 block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            placeholder="Street address"
          />
          {errors.address_line1 && (
            <p className="mt-1 text-sm text-red-600">
              {errors.address_line1.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Address Line 2
          </label>
          <input
            type="text"
            {...register("address_line2")}
            className="mt-1 block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            placeholder="Apartment, suite, unit, building, floor, etc."
          />
        </div>

        {/* Extension */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Extension/Suite
          </label>
          <input
            type="text"
            {...register("ext")}
            className="mt-1 block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            placeholder="Suite number"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Country *
          </label>
          <select
            {...register("country")}
            className="mt-1 block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          >
            <option value="UAE">United Arab Emirates</option>
            <option value="Oman">Oman</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Qatar">Qatar</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
          </select>
        </div>

        {/* State/Emirate - Changed from select to input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            State/Emirate *
          </label>
          <input
            type="text"
            {...register("state")}
            className="mt-1 block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            placeholder="Enter state or emirate"
          />
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
          )}
        </div>

        {/* City - Changed from select to input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            City *
          </label>
          <input
            type="text"
            {...register("city")}
            className="mt-1 block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            placeholder="Enter city name"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>

        {/* ZIP Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            ZIP Code *
          </label>
          <input
            type="text"
            {...register("zip_code")}
            className="mt-1 block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            placeholder="Enter ZIP code"
          />
          {errors.zip_code && (
            <p className="mt-1 text-sm text-red-600">
              {errors.zip_code.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="sm:col-span-2 mt-6">
          <button
            type="submit"
            disabled={isSubmitting || createAddressMutation.isLoading}
            className="w-full bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white px-6 py-4 text-lg rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting || createAddressMutation.isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Saving Address...
              </span>
            ) : (
              "Continue to Payment"
            )}
          </button>

          {/* Debug information */}
          {Object.keys(errors).length > 0 && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg">
              <p className="text-red-600 font-medium">Form Errors:</p>
              <pre className="text-sm text-red-500">
                {JSON.stringify(errors, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
