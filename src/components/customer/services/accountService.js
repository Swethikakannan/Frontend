import axios from "axios";

const API_BASE = "https://localhost:7157/api/Account";

// Utility to get auth token from session storage
const getAuthHeaders = () => {
  const token = sessionStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Create a new account
export const createAccount = async (accountData) => {
  return await axios.post(`${API_BASE}/Create`, accountData, getAuthHeaders());
};

// Get all accounts for a specific customer
export const getAccountsByCustomerId = async (customerId) => {
  return await axios.get(`${API_BASE}/customer/${customerId}`, getAuthHeaders());
};
