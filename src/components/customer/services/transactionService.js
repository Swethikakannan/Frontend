import axios from "axios";

const API_URL = "https://localhost:7157/api/Transaction";

const axiosInstance = axios.create({ baseURL: API_URL });

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

// Deposit
export const deposit = async (data) => {
  return await axiosInstance.post("/deposit", data);
};

// Withdraw
export const withdraw = async (data) => {
  return await axiosInstance.post("/withdraw", data);
};

// Transfer
export const transfer = async (data) => {
  return await axiosInstance.post("/transfer", data);
};
