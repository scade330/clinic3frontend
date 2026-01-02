import axios from "axios";

// Remove trailing slash if present
const BASE_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");
const API = `${BASE_URL}/api/user`;

// Axios instance configured for credentials
const apiClient = axios.create({
  baseURL: API,
  withCredentials: true, // allow cookies to be sent/received
  headers: {
    "Content-Type": "application/json",
  },
});

// Login user
export const loginUser = async (data) => {
  try {
    const res = await apiClient.post("/login-user", data);
    return res.data.user || res.data;
  } catch (error) {
    console.error("Login error:", error.response || error);
    throw error;
  }
};
