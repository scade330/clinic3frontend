import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL + "/api/sales";
const PHARMACY_API_URL = import.meta.env.VITE_BASE_URL + "/api/pharmacy";

// Record a new sale
export const recordNewSale = async (saleData) => {
  const res = await axios.post(`${API_URL}/record`, saleData, { withCredentials: true });
  return res.data;
};

// Fetch all drugs for selection
export const fetchAllDrugs = async () => {
  const res = await axios.get(PHARMACY_API_URL, { withCredentials: true });
  return res.data;
};

// Fetch a single drug by ID
export const fetchDrugById = async (id) => {
  const res = await axios.get(`${PHARMACY_API_URL}/${id}`, { withCredentials: true });
  return res.data;
};

// Dashboard endpoints
export const fetchTotalProfit = async () => {
  const res = await axios.get(`${API_URL}/total-profit`, { withCredentials: true });
  return res.data;
};

export const fetchTopSelling = async () => {
  const res = await axios.get(`${API_URL}/top-selling`, { withCredentials: true });
  return res.data;
};

export const fetchLowStock = async () => {
  const res = await axios.get(`${API_URL}/low-stock`, { withCredentials: true });
  return res.data;
};

export const fetchMonthlyProfit = async () => {
  const res = await axios.get(`${API_URL}/monthly-profit`, { withCredentials: true });
  return res.data;
};

// Sales reports
export const fetchSalesLastDays = async (days) => {
  const res = await axios.get(`${API_URL}/last-days/${days}`, { withCredentials: true });
  return res.data;
};

export const fetchSalesLast7Days = async () => {
  const res = await axios.get(`${API_URL}/last-7-days`, { withCredentials: true });
  return res.data;
};

export const fetchSalesLast30Days = async () => {
  const res = await axios.get(`${API_URL}/last-30-days`, { withCredentials: true });
  return res.data;
};

// Profit endpoints
export const fetchProfitToday = async () => {
  const res = await axios.get(`${API_URL}/profit/today`, { withCredentials: true });
  return res.data.totalProfit || 0;
};

export const fetchProfitLast7Days = async () => {
  const res = await axios.get(`${API_URL}/profit/7days`, { withCredentials: true });
  return res.data.totalProfit || 0;
};

export const fetchProfitLast30Days = async () => {
  const res = await axios.get(`${API_URL}/profit/30days`, { withCredentials: true });
  return res.data.totalProfit || 0;
};
