import axios from "axios";

const API_BASE = "https://localhost:7157/api";

// ✅ Axios instance with token
const axiosInstance = axios.create({
  baseURL: API_BASE,
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// ✅ Get logged-in user basic info
export const getLoggedInUser = async () => {
  return await axiosInstance.get("/User/me");
};

// ✅ Get full profile of logged-in user
export const getMyProfile = async () => {
  return await axiosInstance.get("/CustomerProfile/me"); // 👈 changed
};

const ProfileService = {
  getLoggedInUser,
  getMyProfile,
};

export default ProfileService;
