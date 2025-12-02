import axios from "axios";

// Use Vite environment variable if needed, or just "/api/pharmacy"
const API_URL = import.meta.env.VITE_BASE_URL
  ? import.meta.env.VITE_BASE_URL + "/api/pharmacy"
  : "/api/pharmacy";

// Create a new pharmacy item
export const createPharmacy = async (data) => {
  const res = await axios.post(API_URL, data, { withCredentials: true });
  return res.data;
};

// Get all pharmacy items
export const getAllPharmacies = async () => {
  const res = await axios.get(API_URL, { withCredentials: true });
  return res.data;
};

// Get a single pharmacy item by ID
export const getPharmacy = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`, { withCredentials: true });
  return res.data;
};

// Update a pharmacy item
export const updatePharmacy = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data, { withCredentials: true });
  return res.data;
};

// Delete a pharmacy item
export const deletePharmacy = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
  return res.data;
};

// Get low stock pharmacy items
export const getLowStockPharmacies = async () => {
  const res = await axios.get(`${API_URL}/low-stock`, { withCredentials: true });
  return res.data;
};
