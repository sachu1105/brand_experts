import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useModal } from "../context/ModalContext";
import Api from "../pages/loginSignin/Api";
import toast from "react-hot-toast";

const schema = z
  .object({
    firstName: z.string().min(1, "Required"),
    lastName: z.string().min(1, "Required"),
    email: z.string().email("Invalid email"),
    mobile: z.string().regex(/^\d{10}$/, "Must be 10 digits"),
    password: z.string().min(3, "Min 3 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function ModalRegister() {
  const { closeModal, openModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const registerMutation = useMutation({
    mutationFn: async (formData) => {
      setIsLoading(true);
      try {
        // Match the API's expected payload structure
        const payload = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          mobile: formData.mobile, // Changed back to mobile
          password: formData.password,
          username: formData.email, // Add username field if required by API
        };

        // Use the correct endpoint and ensure trailing slash
        const response = await Api.post("/register/", payload, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        return response.data;
      } catch (error) {
        console.error("Registration Error:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        throw new Error(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Registration failed"
        );
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      toast.success("Registration successful!");
      reset();
      closeModal();

      // Add a small delay before opening login modal
      setTimeout(() => {
        openModal("login");
      }, 1500);
    },
    onError: (error) => {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed. Please try again.");
    },
  });

  const onSubmit = (data) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
        <p className="text-sm text-gray-500">Sign up to get started</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              {...register("firstName")}
              placeholder="First Name"
              className="w-full rounded border border-gray-300 p-2.5 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
            {errors.firstName && (
              <span className="text-xs text-red-500 mt-1">
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div>
            <input
              {...register("lastName")}
              placeholder="Last Name"
              className="w-full rounded border border-gray-300 p-2.5 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
            {errors.lastName && (
              <span className="text-xs text-red-500 mt-1">
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="w-full rounded border border-gray-300 p-2.5 focus:border-red-500 focus:ring-1 focus:ring-red-500"
          />
          {errors.email && (
            <span className="text-xs text-red-500 mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <input
            {...register("mobile")}
            placeholder="Mobile (10 digits)"
            className="w-full rounded border border-gray-300 p-2.5 focus:border-red-500 focus:ring-1 focus:ring-red-500"
          />
          {errors.mobile && (
            <span className="text-xs text-red-500 mt-1">
              {errors.mobile.message}
            </span>
          )}
        </div>

        <div>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full rounded border border-gray-300 p-2.5 focus:border-red-500 focus:ring-1 focus:ring-red-500"
          />
          {errors.password && (
            <span className="text-xs text-red-500 mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        <div>
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
            className="w-full rounded border border-gray-300 p-2.5 focus:border-red-500 focus:ring-1 focus:ring-red-500"
          />
          {errors.confirmPassword && (
            <span className="text-xs text-red-500 mt-1">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded bg-red-600 py-2.5 text-white hover:bg-red-700 disabled:bg-red-300 transition-colors"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2" />
              <span>Creating Account...</span>
            </div>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        Already have an account?{" "}
        <button
          onClick={() => openModal("login")}
          className="text-red-600 hover:text-red-700 font-medium"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}
