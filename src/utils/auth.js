import Api from "../pages/loginSignin/Api";

export const isAuthenticated = () => {
  const token = localStorage.getItem("access_token");
  return !!token;
};

export const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem("refresh_token");
    if (!refresh) {
      throw new Error("No refresh token available");
    }

    const response = await Api.post("token/refresh/", {
      refresh: refresh,
    });

    if (response.data.access) {
      localStorage.setItem("access_token", response.data.access);
      return response.data.access;
    }

    return null;
  } catch (error) {
    console.error("Token refresh failed:", error);
    // Clear tokens if refresh fails
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return null;
  }
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
};
