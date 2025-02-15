import axios from "axios";

const Api = axios.create({
  baseURL: "https://dash.brandexperts.ae", // Remove trailing slash
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000, // Increased timeout
});

// Add request interceptor
Api.interceptors.request.use(
  (config) => {
    // Log request details
    console.log("API Request:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
    });

    // Ensure trailing slash for endpoints
    if (!config.url.endsWith("/")) {
      config.url += "/";
    }

    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// Update response interceptor
Api.interceptors.response.use(
  (response) => {
    console.log("API Response:", {
      status: response.status,
      data: response.data,
      url: response.config.url,
    });
    return response;
  },
  (error) => {
    console.error("API Error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url,
    });

    // Format error message
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "An error occurred";

    return Promise.reject({
      ...error,
      message: errorMessage,
    });
  }
);

export default Api;
