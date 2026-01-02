import axios from "axios";

// Make sure BASE_URL has no trailing slash
const BASE_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");
const API = `${BASE_URL}/api/patientsClinic2`;

const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // send cookies
});

// Helper to normalize endpoints
const endpoint = (path = "") => path.startsWith("/") ? path : `/${path}`;

// ---------------- CREATE ----------------
export const createPatient = async (data) => {
  try {
    const res = await api.post(endpoint("/"), data);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// ---------------- READ ALL ----------------
export const getAllPatients = async () => {
  try {
    const res = await api.get(endpoint("/"));
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// ---------------- READ ONE ----------------
export const getPatientById = async (id) => {
  try {
    const res = await api.get(endpoint(`/${id}`));
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// ---------------- READ BY PHONE ----------------
export const getPatientByPhone = async (phone) => {
  try {
    const res = await api.get(endpoint(`/search/by-phone?phone=${encodeURIComponent(phone)}`));
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// ---------------- UPDATE ----------------
export const updatePatient = async (id, data) => {
  try {
    const res = await api.put(endpoint(`/${id}`), data);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// ---------------- DELETE ----------------
export const deletePatient = async (id) => {
  try {
    const res = await api.delete(endpoint(`/${id}`));
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// ---------------- TREATMENTS ----------------
export const addTreatment = async (patientId, treatment) => {
  try {
    const res = await api.post(endpoint(`/${patientId}/treatment`), treatment);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteTreatment = async (patientId, index) => {
  try {
    const res = await api.delete(endpoint(`/${patientId}/treatment/${index}`));
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// ---------------- VACCINATIONS ----------------
export const addVaccination = async (patientId, vaccination) => {
  try {
    const res = await api.post(endpoint(`/${patientId}/vaccination`), vaccination);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteVaccination = async (patientId, index) => {
  try {
    const res = await api.delete(endpoint(`/${patientId}/vaccination/${index}`));
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// ---------------- FILTER ----------------
export const getPatientsByProviderType = async (type) => {
  try {
    const res = await api.get(endpoint(`/filter?type=${encodeURIComponent(type)}`));
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
