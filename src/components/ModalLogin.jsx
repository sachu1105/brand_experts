import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../context/ModalContext";
import { useAuth } from "../context/AuthContext";
import Api from "../pages/loginSignin/Api";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

export default function ModalLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const { closeModal, openModal } = useModal();
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const response = await Api.post(`/login/`, {
        username: data.email,
        password: data.password,
      });
      return response.data;
    },
    onSuccess: (data) => {
      // Handle successful login
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("user_details", JSON.stringify(data.user_details));

      login({
        id: data.user_id,
        customer_id: data.customer_id,
        name: data.user_details.first_name,
        email: data.user_details.email,
      });

      toast.success("Successfully logged in!");
      closeModal();
      navigate("/checkout");
    },
    onError: (error) => {
      toast.error(error.message || "Login failed");
    },
  });

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Welcome Back</h2>
        <p className="text-sm text-gray-500">Please sign in to continue</p>
      </div>

      <form
        className="space-y-4"
        onSubmit={handleSubmit((data) => loginMutation.mutate(data))}
      >
        <div>
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="w-full rounded border border-gray-300 p-2 focus:border-red-500 focus:outline-none"
          />
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full rounded border border-gray-300 p-2 focus:border-red-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2.5 text-gray-400"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && (
            <span className="text-xs text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={loginMutation.isLoading}
          className="w-full rounded bg-red-600 py-2 text-white hover:bg-red-700 disabled:bg-red-300"
        >
          {loginMutation.isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <button
          onClick={() => {
            closeModal();
            setTimeout(() => {
              openModal("register");
            }, 100);
          }}
          className="text-red-600 hover:underline"
        >
          Sign up
        </button>
      </p>
    </div>
  );
}
