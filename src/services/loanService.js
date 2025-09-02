import axios from "axios";

const API_URL = "https://localhost:7157/api/Loan"; // Change if your backend URL is different

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Authorization token if exists
axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

// --- API Methods ---

// Apply Loan
export const applyLoan = (loanData) =>
  axiosInstance.post("/apply", {
    customerId: parseInt(loanData.customerId),
    loanTypeId: parseInt(loanData.loanTypeId),
    appliedAmount: parseFloat(loanData.appliedAmount),
    tenureMonths: parseInt(loanData.tenureMonths),
    purpose: loanData.purpose,
  });

// Get all loan applications
export const getAllLoans = () => axiosInstance.get("/applications");

// Get loan by ID
export const getLoanById = (id) => axiosInstance.get(`/application/${id}`);

// Get all disbursed loans
export const getDisbursedLoans = () => axiosInstance.get("/disbursed");

// Get all pending loans
export const getPendingLoans = () => axiosInstance.get("/pending");

// Export as default object for easier import
export default {
  applyLoan,
  getAllLoans,
  getLoanById,
  getDisbursedLoans,
  getPendingLoans,
};
