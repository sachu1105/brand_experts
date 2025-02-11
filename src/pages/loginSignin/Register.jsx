// Import necessary dependencies from React and other libraries
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Api from "./Api";
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
    .min(3, "Password must be at least 3 characters")
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
  const registerUser = async (formData) => {
    try {
      const response = await Api.post("register/", formData); // Added trailing slash
      return response.data;
    } catch (error) {
      // Enhanced error logging
      console.group("Registration Error Details");
      console.error("Error:", {
        name: error.name,
        message: error.message,
        code: error.code,
        stack: error.stack,
      });
      console.error("Response Details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
      });
      console.error("Request Details:", {
        method: error.config?.method,
        url: error.config?.url,
        data: error.config?.data,
        headers: error.config?.headers,
      });
      console.groupEnd();
      throw error;
    }
  };
  // console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);

  // Update the mutation configuration with mutationFn
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (response) => {
      console.log("Registration Success:", response);
      if (response.success) {
        toast.success(response.message || "Registration Successful!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    },
    onError: (error) => {
      console.group("Registration Error");
      console.error("Error Response:", error.response?.data);
      console.groupEnd();

      let errorMessage;
      let validationErrors;

      // Handle network errors or when response is not available
      if (!error.response) {
        errorMessage = "Network error. Please check your internet connection.";
      } else {
        const errorData = error.response?.data;

        switch (error.response?.status) {
          case 409:
            errorMessage =
              errorData?.message ||
              "A user with this email or mobile already exists.";
            break;
          case 400:
            validationErrors = errorData?.errors;
            errorMessage = validationErrors
              ? Object.values(validationErrors).flat().join(", ")
              : errorData?.message || "Please check your input.";
            break;
          case 500:
            errorMessage = "Server error. Please try again later.";
            break;
          default:
            errorMessage = "Registration failed. Please try again.";
        }
      }

      // Ensure toast is called with proper configuration
      try {
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 5000, // Increased duration
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored", // Explicitly set theme
          style: {
            backgroundColor: "#ef4444",
            color: "white",
          },
        });
      } catch (toastError) {
        console.error("Toast error:", toastError);
        alert(errorMessage); // Fallback to alert if toast fails
      }
    },
  });

  // Update the onSubmit function to use mutate directly
  const onSubmit = (data) => {
    const payload = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      mobile: data.mobile,
      gender: data.gender,
      password: data.password,
    };

    mutation.mutate(payload);
  };

  // Render the registration form
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-8 sm:px-6 lg:px-8">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={3} // Limit number of toasts shown at once
      />

      {/* Compact header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl mb-6">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Create an account
        </h2>
        <p className="mt-1 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-red-600 hover:text-red-500"
          >
            Log in
          </Link>
        </p>
      </div>

      {/* Wider form container */}
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-6 px-6 shadow rounded-lg sm:px-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Grid layout for form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name and Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  {...register("firstName")}
                  className="mt-1 p-2 w-full border border-red-300 focus:outline-1 focus:outline-offset-1 focus:outline-red-500 rounded-md"
                />
                <p className="text-red-500 text-xs mt-1">
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
                  className="mt-1 p-2 w-full border border-red-300 focus:outline-1 focus:outline-offset-1 focus:outline-red-500 rounded-md"
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName?.message}
                </p>
              </div>

              {/* Email and Mobile */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="mt-1 p-2 w-full border border-red-300 focus:outline-1 focus:outline-offset-1 focus:outline-red-500 rounded-md"
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.email?.message}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mobile
                </label>
                <input
                  type="text"
                  {...register("mobile")}
                  className="mt-1 p-2 w-full border border-red-300 focus:outline-1 focus:outline-offset-1 focus:outline-red-500 rounded-md"
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.mobile?.message}
                </p>
              </div>

              {/* Gender and Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  {...register("gender")}
                  className="mt-1 p-2 w-full border border-red-300 focus:outline-1 focus:outline-offset-1 focus:outline-red-500 rounded-md"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <p className="text-red-500 text-xs mt-1">
                  {errors.gender?.message}
                </p>
              </div>

              {/* Password and Confirm Password in the same row */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password")}
                  className="mt-1 p-2 w-full border border-red-300 focus:outline-1 focus:outline-offset-1 focus:outline-red-500 rounded-md"
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.password?.message}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  {...register("confirmPassword")}
                  className="mt-1 p-2 w-full border border-red-300 focus:outline-1 focus:outline-offset-1 focus:outline-red-500 rounded-md"
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword?.message}
                </p>
              </div>
            </div>

            {/* Submit button */}
            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                disabled={mutation.isLoading}
                className={`w-48 bg-gradient-to-b from-[#BF1A1C] to-[#590C0D] hover:shadow-xl text-white font-bold py-2.5 px-4 rounded-md transition-all duration-300 cursor-pointer hover:scale-[0.98] active:scale-95 ${
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
