import axios from "axios";

const API_URL = "https://localhost:7157/api/Loan";

const axiosInstance = axios.create({ baseURL: API_URL });
axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

// Loan API calls
export const applyLoan = (loanData) => axiosInstance.post("/apply", loanData);
export const getAllLoans = () => axiosInstance.get("/applications");
export const getLoanById = (id) => axiosInstance.get(`/application/${id}`);
export const getDisbursedLoans = () => axiosInstance.get("/disbursed");
export const getPendingLoans = () => axiosInstance.get("/pending");

// Default export
const LoanService = { applyLoan, getAllLoans, getLoanById, getDisbursedLoans, getPendingLoans };
export default LoanService;
