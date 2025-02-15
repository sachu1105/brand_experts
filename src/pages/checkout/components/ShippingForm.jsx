import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Api from "../../../pages/loginSignin/Api";
import { useState, useEffect } from "react";
import { submitCartToBackend } from "../../../services/cartApi";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  ext: z.string().optional().nullable(),
  address_line1: z.string().min(1, "Address is required"),
  address_line2: z.string().optional().nullable(),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(3, "City must be at least 3 characters"),
  state: z.string().min(2, "State/Emirate must be at least 2 characters"),
  zip_code: z
    .string()
    .min(1, "ZIP code is required")
    .regex(/^[0-9]{5,6}$/, "ZIP code must be 5-6 digits"),
});

export default function ShippingForm({ onNext, initialData, onSave }) {
  const navigate = useNavigate();

  useEffect(() => {
    const customer_id = sessionStorage.getItem("customer_id");
    const access_token = localStorage.getItem("access_token");

    if (!customer_id || !access_token) {
      toast.error("Please login to continue");
      navigate("/login", { state: { from: "/checkout" } });
    }
  }, [navigate]);

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
      const customer_id = sessionStorage.getItem("customer_id");
      const access_token = localStorage.getItem("access_token");

      if (!customer_id || !access_token) {
        toast.error("Please login to continue");
        navigate("/login", { state: { from: "/checkout" } });
        throw new Error("Authentication required");
      }

      try {
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

        const response = await Api.post("create-customer-address/", payload, {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        });

        return response.data;
      } catch (error) {
        console.error("Address creation error:", error);
        if (error.response?.status === 401) {
          toast.error("Session expired. Please login again");
          navigate("/login", { state: { from: "/checkout" } });
        }
        throw new Error(
          error.response?.data?.error || "Failed to save address"
        );
      }
    },
  });

  const handleFormSubmit = async (data) => {
    try {
      const customerId = sessionStorage.getItem("customer_id");
      const accessToken = localStorage.getItem("access_token");

      if (!customerId || !accessToken) {
        toast.error("Please login to continue");
        navigate("/login", { state: { from: "/checkout" } });
        return;
      }

      // Form validation
      try {
        schema.parse(data);
      } catch (validationError) {
        console.error("Validation error:", validationError);
        toast.error("Please check all required fields");
        return;
      }

      // Step 1: Save the address
      const toastId = toast.loading("Saving address...");

      try {
        const addressResult = await createAddressMutation.mutateAsync(data);

        if (!addressResult?.address_details) {
          throw new Error("Invalid address response");
        }

        // Step 2: Process the cart
        toast.loading("Processing cart...", { id: toastId });
        const cartResponse = await submitCartToBackend();

        if (!cartResponse?.success && !cartResponse?.message) {
          throw new Error("Cart processing failed");
        }

        toast.success("Address saved and cart processed successfully", {
          id: toastId,
        });
        onSave(addressResult.address_details);
        navigate("/payment");
      } catch (error) {
        toast.error(error.message || "Operation failed", { id: toastId });
        console.error("Operation error:", error);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="mt-8 mb-48">
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
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
            disabled={
              isSubmitting ||
              createAddressMutation.isLoading ||
              Object.keys(errors).length > 0
            }
            className={`w-full px-6 py-4 text-lg rounded-lg transition-all duration-300 
              ${
                Object.keys(errors).length > 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white hover:shadow-lg"
              }`}
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
                Processing...
              </span>
            ) : Object.keys(errors).length > 0 ? (
              "Please fill all required fields"
            ) : (
              "Save & Continue to Payment"
            )}
          </button>

          {/* Enhanced Error Display */}
          {Object.keys(errors).length > 0 && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-100">
              <p className="text-red-600 font-medium mb-2">
                Please correct the following errors:
              </p>
              <ul className="list-disc list-inside text-sm text-red-500">
                {Object.entries(errors).map(([field, error]) => (
                  <li key={field}>{error.message}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </form>
  </div>
  );
}
