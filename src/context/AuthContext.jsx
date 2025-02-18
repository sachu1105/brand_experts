import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Check for auth token on mount
    const token = localStorage.getItem("access_token");
    
    // Try to get user data from both possible storage keys
    const userData = localStorage.getItem("user_data") || localStorage.getItem("user_details");
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setIsAuthenticated(true);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        // Handle corrupted data by logging out
        logout();
      }
    }
  }, []);
  
  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem("user_data", JSON.stringify(userData));
  };
  
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_data");
    localStorage.removeItem("user_details"); // Remove both potential keys
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("customer_id");
    setUser(null);
    setIsAuthenticated(false);
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};