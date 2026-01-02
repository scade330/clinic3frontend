import axios from "axios";

// Remove trailing slash if present
const BASE_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");
const API = `${BASE_URL}/api/user`;

export const loginUser = async (data) => {
  try {
    const res = await axios.post(`${API}/login-user`, data, {
      withCredentials: true, // only if your backend sets cookies
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.user || res.data;
  } catch (error) {
    console.error("Login error:", error.response || error);
    throw error;
  }
};
