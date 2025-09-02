

// // src/services/CustomerDashboardService.js
// import axios from "axios";

// const API_BASE = "https://localhost:7157/api";

// const axiosInstance = axios.create({
//   baseURL: API_BASE,
// });

// // Attach token if exists
// axiosInstance.interceptors.request.use((config) => {
//   const token = sessionStorage.getItem("token");
//   if (token) config.headers["Authorization"] = `Bearer ${token}`;
//   return config;
// });

// export const getAccounts = async () => {
//   return await axiosInstance.get("/Account/me");
// };

// export const getTransactions = async () => {
//   return await axiosInstance.get("/Transaction/me"); // ✅ updated URL
// };

// export const getBeneficiaries = async () => {
//   return await axiosInstance.get("/Beneficiary/me");
// };

// export const getProfile = async () => {
//   return await axiosInstance.get("/CustomerProfile/me");
// };

// const CustomerDashboardService = {
//   getAccounts,
//   getTransactions,
//   getBeneficiaries,
//   getProfile,
// };

// export default CustomerDashboardService;

// src/services/CustomerDashboardService.js
import axios from "axios";

const API_BASE = "https://localhost:7157/api";

const axiosInstance = axios.create({
  baseURL: API_BASE,
});

// Attach token if exists
axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export const getAccounts = async () => axiosInstance.get("/Account/me");

export const getTransactions = async () => axiosInstance.get("/Transaction/me");

export const getBeneficiaries = async () => axiosInstance.get("/Beneficiary/me");

export const getProfile = async () => axiosInstance.get("/CustomerProfile/me");

export const getLoans = async () => axiosInstance.get("/Loan/me"); // ✅ new

const CustomerDashboardService = {
  getAccounts,
  getTransactions,
  getBeneficiaries,
  getProfile,
  getLoans, // ✅ new
};

export default CustomerDashboardService;
