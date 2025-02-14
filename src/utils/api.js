import axios from "axios";

const api = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      return Promise.reject({
        message: "Request timed out. Please try again.",
        code: "TIMEOUT_ERROR",
      });
    }

    return Promise.reject({
      message: error.response?.data?.error || "An error occurred",
      code: error.response?.status || "UNKNOWN_ERROR",
    });
  }
);

export default api;
