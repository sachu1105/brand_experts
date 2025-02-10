// Import necessary dependencies from React and other libraries
import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define form validation rules using Yup
// This ensures all user inputs meet our requirements before submission
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  // Ensure email format is valid
  email: yup.string().email("Invalid email").required("Email is required"),
  // Ensure mobile number is exactly 10 digits
  mobile: yup
    .string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  gender: yup.string().required("Please select gender"),
  // Password must be at least 6 characters
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  // Confirm password must match the password field
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

// Main Register Component
function Register() {
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Initialize form handling with React Hook Form
  // This provides form validation and handling capabilities
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // Connect Yup validation with the form
  });

  // Setup API mutation using React Query
  // This handles the API call to register a new user
  const mutation = useMutation(async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/register/`,
      formData
    );
    return response.data;
  });

  // Handle form submission
  const onSubmit = (data) => {
    // Transform form data to match API requirements
    const payload = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      mobile: data.mobile,
      gender: data.gender,
      password: data.password,
    };

    // Submit data to the API
    mutation.mutate(payload, {
      // Handle successful registration
      onSuccess: (response) => {
        // Show success message
        toast.success("🎉 Registration Successful! Redirecting to login...", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Redirect to login page after successful registration
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      },
      // Handle registration errors
      onError: (error) => {
        const errorMessage =
          error.response?.data?.message ||
          "Something went wrong during registration";
        toast.error(`${errorMessage}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },
    });
  };

  // Render the registration form
  return (
    // Main container with full height and centered content
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Toast notification container for showing messages */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Header section with title and login link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create an account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-red-600 hover:text-red-500"
          >
            Log in
          </Link>
        </p>
      </div>

      {/* Registration form container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          {/* Form with validation and submission handling */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Form fields - each field includes label, input, and error message */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                {...register("firstName")}
                className="mt-1 p-2 w-full border border-red-300 focus:outline-1 focus:outline-offset-1 focus:outline-red-500   rounded-md"
              />
              <p className="text-red-500 text-sm">
                {errors.firstName?.message}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                {...register("lastName")}
                className="mt-1 p-2 w-full border border-red-300 focus:outline-1 focus:outline-offset-1 focus:outline-red-500  rounded-md"
              />
              <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className="mt-1 p-2 w-full border border-red-300 focus:outline-1 focus:outline-offset-1 focus:outline-red-500   rounded-md"
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile
              </label>
              <input
                type="text"
                {...register("mobile")}
                className="mt-1 p-2 w-full border border-red-300 focus:outline-1 focus:outline-offset-1 focus:outline-red-500  rounded-md"
              />
              <p className="text-red-500 text-sm">{errors.mobile?.message}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                {...register("gender")}
                className="mt-1 p-2 w-full border border-red-300 focus:outline-1 focus:outline-offset-1 focus:outline-red-500  rounded-md"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <p className="text-red-500 text-sm">{errors.gender?.message}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                className="mt-1 p-2 w-full border border-red-300 focus:outline-1 focus:outline-offset-1 focus:outline-red-500  rounded-md"
              />
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                {...register("confirmPassword")}
                className="mt-1 p-2 w-full border border-red-300 focus:outline-1 focus:outline-offset-1 focus:outline-red-500  rounded-md"
              />
              <p className="text-red-500 text-sm">
                {errors.confirmPassword?.message}
              </p>
            </div>

            {/* Submit button with loading state */}
            <div>
              <button
                type="submit"
                disabled={mutation.isLoading}
                className={`w-full bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] hover:from-[#590C0D] hover:to-[#BF1A1C] text-white font-bold py-2 px-4 rounded-md transition-all duration-300 ${
                  mutation.isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {mutation.isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                    Registering...
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
