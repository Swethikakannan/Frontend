// // src/services/transactionService.js
// import axios from "axios";

// const API_URL = "https://localhost:7157/api/Transaction";

// export const deposit = async (data) => {
//   return await axios.post(`${API_URL}/deposit`, data);
// };

// export const withdraw = async (data) => {
//   return await axios.post(`${API_URL}/withdraw`, data);
// };

// export const transfer = async (data) => {
//   return await axios.post(`${API_URL}/transfer`, data);
// };

// export const getAllTransactions = async () => {
//   return await axios.get(API_URL);
// };

// export const getTransactionById = async (id) => {
//   return await axios.get(`${API_URL}/${id}`);
// };

// export const getTransactionsByAccountId = async (accountId) => {
//   return await axios.get(`${API_URL}/account/${accountId}`);
// };
import axios from "axios";

const API_BASE = "https://localhost:7157/api/Transaction";

// Utility to get token headers
const getAuthHeaders = () => {
  const token = sessionStorage.getItem("token"); // or localStorage
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

// Deposit
export const deposit = async (data) => {
  return await axios.post(`${API_BASE}/deposit`, data, getAuthHeaders());
};

// Withdraw
export const withdraw = async (data) => {
  return await axios.post(`${API_BASE}/withdraw`, data, getAuthHeaders());
};

// Transfer
export const transfer = async (data) => {
  return await axios.post(`${API_BASE}/transfer`, data, getAuthHeaders());
};

// Get all transactions
export const getAllTransactions = async () => {
  return await axios.get(API_BASE, getAuthHeaders());
};

// Get transaction by ID
export const getTransactionById = async (id) => {
  return await axios.get(`${API_BASE}/${id}`, getAuthHeaders());
};

// Get transactions by account ID
export const getTransactionsByAccountId = async (accountId) => {
  return await axios.get(`${API_BASE}/account/${accountId}`, getAuthHeaders());
};
