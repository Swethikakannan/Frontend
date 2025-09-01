import axios from "axios";

const API_BASE = "https://localhost:7157/api/Account";

// Utility to get token
const getAuthHeaders = () => {
  const token = sessionStorage.getItem("token"); // or localStorage
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const createAccount = async (accountData) => {
  return await axios.post(`${API_BASE}/Create`, accountData, getAuthHeaders());
};

export const getAccountById = async (id) => {
  return await axios.get(`${API_BASE}/${id}`, getAuthHeaders());
};

export const getAccountsByCustomerId = async (customerId) => {
  return await axios.get(`${API_BASE}/customer/${customerId}`, getAuthHeaders());
};

export const closeAccount = async (id) => {
  return await axios.put(`${API_BASE}/close/${id}`, {}, getAuthHeaders());
};
