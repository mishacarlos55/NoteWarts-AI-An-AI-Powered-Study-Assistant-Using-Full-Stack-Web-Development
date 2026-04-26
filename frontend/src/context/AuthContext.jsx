import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const API_BASE_URL = "http://localhost:5000/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("mentorai-token") || null);
  const [loading, setLoading] = useState(true);

  const authAxios = axios.create({
    baseURL: API_BASE_URL,
  });

  authAxios.interceptors.request.use((config) => {
    const savedToken = localStorage.getItem("mentorai-token");
    if (savedToken) {
      config.headers.Authorization = `Bearer ${savedToken}`;
    }
    return config;
  });

  const register = async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, formData);
      const { token, user } = response.data;

      localStorage.setItem("mentorai-token", token);
      setToken(token);
      setUser(user);

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const login = async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, formData);
      const { token, user } = response.data;

      localStorage.setItem("mentorai-token", token);
      setToken(token);
      setUser(user);

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("mentorai-token");
    setToken(null);
    setUser(null);
  };

  const fetchProfile = async () => {
    try {
      const response = await authAxios.get("/auth/profile");
      setUser(response.data.user);
    } catch (error) {
      console.error("Profile fetch failed:", error.response?.data || error.message);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        register,
        login,
        logout,
        fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}