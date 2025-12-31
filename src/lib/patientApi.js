import axios from "axios";

const api = axios.create({
  baseURL: `${__API_URL__}/api/patientsClinic2`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true
});

// ---------------- CREATE ----------------
export const createPatient = async (data) => {
  try { return (await api.post("/", data)).data }
  catch (error) { throw new Error(error.response?.data?.message || error.message) }
};

// ---------------- READ ALL ----------------
export const getAllPatients = async () => {
  try { return (await api.get("/")).data }
  catch (error) { throw new Error(error.response?.data?.message || error.message) }
};

// ---------------- READ ONE ----------------
export const getPatientById = async (id) => {
  try { return (await api.get(`/${id}`)).data }
  catch (error) { throw new Error(error.response?.data?.message || error.message) }
};

// ---------------- READ BY PHONE ----------------
export const getPatientByPhone = async (phone) => {
  try { return (await api.get(`/search/by-phone?phone=${encodeURIComponent(phone)}`)).data }
  catch (error) { throw new Error(error.response?.data?.message || error.message) }
};

// ---------------- UPDATE ----------------
export const updatePatient = async (id, data) => {
  try { return (await api.put(`/${id}`, data)).data }
  catch (error) { throw new Error(error.response?.data?.message || error.message) }
};

// ---------------- DELETE ----------------
export const deletePatient = async (id) => {
  try { return (await api.delete(`/${id}`)).data }
  catch (error) { throw new Error(error.response?.data?.message || error.message) }
};

// ---------------- TREATMENTS ----------------
export const addTreatment = async (patientId, treatment) => {
  try { return (await api.post(`/${patientId}/treatment`, treatment)).data }
  catch (error) { throw new Error(error.response?.data?.message || error.message) }
};

export const deleteTreatment = async (patientId, index) => {
  try { return (await api.delete(`/${patientId}/treatment/${index}`)).data }
  catch (error) { throw new Error(error.response?.data?.message || error.message) }
};

// ---------------- VACCINATIONS ----------------
export const addVaccination = async (patientId, vaccination) => {
  try { return (await api.post(`/${patientId}/vaccination`, vaccination)).data }
  catch (error) { throw new Error(error.response?.data?.message || error.message) }
};

export const deleteVaccination = async (patientId, index) => {
  try { return (await api.delete(`/${patientId}/vaccination/${index}`)).data }
  catch (error) { throw new Error(error.response?.data?.message || error.message) }
};

// ---------------- FILTER ----------------
export const getPatientsByProviderType = async (type) => {
  try { return (await api.get(`/filter?type=${encodeURIComponent(type)}`)).data }
  catch (error) { throw new Error(error.response?.data?.message || error.message) }
};
