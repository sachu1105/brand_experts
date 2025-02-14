import { useState } from "react";
import axios from "axios";

const API_TIMEOUT = 10000; // 10 seconds

export const useAddress = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const createAddress = async (addressData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/addresses", addressData, {
        timeout: API_TIMEOUT,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      const errorMessage =
        err.code === "ECONNABORTED"
          ? "Request timed out. Please try again."
          : err.response?.data?.error || "Failed to save address";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const retryOperation = () => {
    setError(null);
  };

  return {
    createAddress,
    error,
    loading,
    retryOperation,
  };
};
