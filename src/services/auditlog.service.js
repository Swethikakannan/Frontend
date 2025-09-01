import axios from "axios";

const API_URL = "https://localhost:7157/api/AuditLog";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Get all logs
export const getAllLogs = async () => {
  return await axiosInstance.get("");
};

// Get logs by user ID
export const getLogsByUserId = async (userId) => {
  return await axiosInstance.get(`/user/${userId}`);
};

const AuditLogService = {
  getAllLogs,
  getLogsByUserId,
};

export default AuditLogService;
