import axios from "axios";

const API_URL = "https://localhost:7157/api/Beneficiary";

const axiosInstance = axios.create({ baseURL: API_URL });
axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

// API calls
export const addBeneficiary = (data) => axiosInstance.post("/", data);
export const getBeneficiariesByCustomerId = (customerId) => axiosInstance.get(`/customer/${customerId}`);
export const deleteBeneficiary = (id) => axiosInstance.delete(`/${id}`);

const BeneficiaryService = { addBeneficiary, getBeneficiariesByCustomerId, deleteBeneficiary };
export default BeneficiaryService;
