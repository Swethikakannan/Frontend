
// import axios from "axios";

// const API_URL = "https://localhost:7157/api/CustomerProfile";

// // ✅ Create an Axios instance with auth header
// const axiosInstance = axios.create({
//   baseURL: API_URL,
// });

// // Add Authorization header automatically
// axiosInstance.interceptors.request.use((config) => {
//   const token = sessionStorage.getItem("token"); // get token from sessionStorage
//   if (token) {
//     config.headers["Authorization"] = `Bearer ${token}`;
//   }
//   return config;
// });

// // Fetch all customers
// export const getAllCustomers = async () => {
//   return await axiosInstance.get("/all");
// };

// // Fetch customer by ID
// export const getCustomerById = async (customerId) => {
//   return await axiosInstance.get(`/${customerId}`);
// };

// // Add a customer
// export const addCustomer = async (customerData) => {
//   return await axiosInstance.post("/add", customerData);
// };

// // Update a customer
// export const updateCustomer = async (customerId, customerData) => {
//   return await axiosInstance.put(`/update/${customerId}`, customerData);
// };

// // Delete a customer
// export const deleteCustomer = async (customerId) => {
//   return await axiosInstance.delete(`/${customerId}`);
// };

// const CustomerService = {
//   getAllCustomers,
//   getCustomerById,
//   addCustomer,
//   updateCustomer,
//   deleteCustomer,
// };

// export default CustomerService;
import axios from "axios";

const API_URL = "https://localhost:7157/api/CustomerProfile";

// Axios instance with Authorization header
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

// Fetch all customers
export const getAllCustomers = async () => axiosInstance.get("/all");

// Fetch customer by ID
export const getCustomerById = async (customerId) => axiosInstance.get(`/${customerId}`);

// Add customer
export const addCustomer = async (customerData) => axiosInstance.post("/add", customerData);

// Update customer ✅ fixed URL
export const updateCustomer = async (customerId, customerData) =>
  axiosInstance.put(`/${customerId}`, customerData);

// Delete customer
export const deleteCustomer = async (customerId) =>
  axiosInstance.delete(`/${customerId}`);

// Default export
const CustomerService = {
  getAllCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};

export default CustomerService;
