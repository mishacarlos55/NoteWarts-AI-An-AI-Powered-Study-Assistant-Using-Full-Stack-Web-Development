import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

/*
----------------------------------------
Create axios instance
----------------------------------------
*/
const authAPI = axios.create({
  baseURL: API_URL,
});

/*
----------------------------------------
Attach token automatically
----------------------------------------
*/
authAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/*
----------------------------------------
LOGIN USER
----------------------------------------
*/
export const loginUser = async (userData) => {
  try {
    const res = await authAPI.post("/login", userData);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/*
----------------------------------------
REGISTER USER
----------------------------------------
*/
export const registerUser = async (userData) => {
  try {
    const res = await authAPI.post("/register", userData);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/*
----------------------------------------
GET CURRENT USER
----------------------------------------
*/
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

/*
----------------------------------------
CHECK IF USER IS LOGGED IN
----------------------------------------
*/
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

/*
----------------------------------------
LOGOUT USER
----------------------------------------
*/
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};