import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  locationType: z.enum(["commercial", "residential"]),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  companyName: z.string().min(1, "Company name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  extension: z.string().optional(),
  addressLine1: z.string().min(1, "Address is required"),
  addressLine2: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "Valid ZIP code is required"),
  saveAddress: z.boolean().optional(),
});

export default function ShippingForm({ onNext, initialData, onSave }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      country: "United States",
      locationType: "commercial",
      ...initialData,
    },
  });

  const onSubmit = (data) => {
    onSave(data);
    onNext();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow"
    >
      <h2 className="text-2xl font-semibold mb-6">Shipping</h2>

      {/* Location Type */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Location type
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="commercial"
              {...register("locationType")}
              className="text-red-600 focus:ring-red-500 h-4 w-4"
            />
            <span className="ml-2">Commercial</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="residential"
              {...register("locationType")}
              className="text-red-600 focus:ring-red-500 h-4 w-4"
            />
            <span className="ml-2">Residential</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        {/* First Name & Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name *
          </label>
          <input
            type="text"
            {...register("firstName")}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name *
          </label>
          <input
            type="text"
            {...register("lastName")}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Email & Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email *
          </label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company name *
          </label>
          <input
            type="text"
            {...register("companyName")}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          />
          {errors.companyName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.companyName.message}
            </p>
          )}
        </div>

        {/* Phone & Extension */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone number *
          </label>
          <input
            type="tel"
            placeholder="+1 (___) ___-____"
            {...register("phone")}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ext.
          </label>
          <input
            type="text"
            {...register("extension")}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Address */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Address Line 1: *
          </label>
          <input
            type="text"
            placeholder="Enter a location"
            {...register("addressLine1")}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          />
          {errors.addressLine1 && (
            <p className="mt-1 text-sm text-red-600">
              {errors.addressLine1.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Address Line 2:
          </label>
          <input
            type="text"
            {...register("addressLine2")}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Country, City, State, ZIP */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Country: *
          </label>
          <select
            {...register("country")}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          >
            <option value="United States">United States</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            City: *
          </label>
          <input
            type="text"
            {...register("city")}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            State: *
          </label>
          <select
            {...register("state")}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          >
            <option value="">Select...</option>
            <option value="1">United States</option>

            {/* Add US states here */}
          </select>
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Zip Code: *
          </label>
          <input
            type="text"
            {...register("zipCode")}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          />
          {errors.zipCode && (
            <p className="mt-1 text-sm text-red-600">
              {errors.zipCode.message}
            </p>
          )}
        </div>

        {/* Save Address Checkbox */}
        <div className="sm:col-span-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register("saveAddress")}
              className="text-red-600 focus:ring-red-500 h-4 w-4 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Save Address</span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="sm:col-span-2 mt-6">
          <button
            type="submit"
            className="w-full bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </form>
  );
}
