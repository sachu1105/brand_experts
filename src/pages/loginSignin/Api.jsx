import axios from "axios";

const API = axios.create({
  baseURL: "https://dash.brandexperts.ae/", // Already has trailing slash
});

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await axios.post("https://dash.brandexperts.ae/refresh", {
      refresh_token: refreshToken,
    });

    const newAccessToken = response.data.access_token;
    localStorage.setItem("access_token", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login"; // Redirect to login page
    return null;
  }
};

// Add Axios Interceptor to handle expired tokens
API.interceptors.request.use(async (config) => {
  let token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Add response interceptor to check for 401 (Unauthorized)
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return axios(error.config);
      }
    }
    return Promise.reject(error);
  }
);

export default API;
