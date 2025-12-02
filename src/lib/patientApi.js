import axios from "axios";

// Ensure trailing slash is correct
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API = `${BASE_URL}/api/patients`;

// CREATE
export const createPatient = async (data) => {
  const res = await axios.post(`${API}/create`, data, {
    withCredentials: true,
  });
  return res.data;
};

// READ ALL
export const getAllPatients = async () => {
  const res = await axios.get(`${API}/all`, {
    withCredentials: true,
  });

  // Backend returns { patients: [...] }
  return res.data.patients; // ✅ return clean array
};

// READ ONE
export const getPatientById = async (id) => {
  const res = await axios.get(`${API}/id/${id}`, {
    withCredentials: true,
  });
  return res.data;
};

// UPDATE
export const updatePatient = async (id, data) => {
  const res = await axios.put(`${API}/id/${id}`, data, {
    withCredentials: true,
  });
  return res.data;
};

// DELETE
export const deletePatient = async (id) => {
  const res = await axios.delete(`${API}/id/${id}`, {
    withCredentials: true,
  });
  return res.data;
};
