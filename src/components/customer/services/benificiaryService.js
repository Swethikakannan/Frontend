import axios from "axios";

const API_URL = "https://localhost:7157/api/Beneficiary";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

// Only Add Beneficiary
export const addBeneficiary = (data) => axiosInstance.post("/", data);

const BeneficiaryService = { addBeneficiary };
export default BeneficiaryService;
