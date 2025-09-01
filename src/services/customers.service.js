// import axios from "axios";

// const API_BASE = "https://localhost:7157/api/CustomerProfile";

// class CustomerService {
//   // Add new customer
//   addCustomer(customerData) {
//     return axios.post(`${API_BASE}/add`, customerData);
//   }

//   // Get all customers
//   getAllCustomers() {
//     return axios.get(`${API_BASE}/all`);
//   }

//   // Get customer by ID
//   getCustomerById(customerId) {
//     return axios.get(`${API_BASE}/${customerId}`);
//   }

//   // Update customer by ID
//   updateCustomer(customerId, updatedData) {
//     return axios.put(`${API_BASE}/${customerId}`, updatedData);
//   }
// }

// export default new CustomerService();

import axios from "axios";

const API_URL = "https://localhost:7157/api/CustomerProfile";

// ✅ Create an Axios instance with auth header
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add Authorization header automatically
axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token"); // get token from sessionStorage
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Fetch all customers
export const getAllCustomers = async () => {
  return await axiosInstance.get("/all");
};

// Fetch customer by ID
export const getCustomerById = async (customerId) => {
  return await axiosInstance.get(`/${customerId}`);
};

// Add a customer
export const addCustomer = async (customerData) => {
  return await axiosInstance.post("/add", customerData);
};

// Update a customer
export const updateCustomer = async (customerId, customerData) => {
  return await axiosInstance.put(`/update/${customerId}`, customerData);
};

// Delete a customer
export const deleteCustomer = async (customerId) => {
  return await axiosInstance.delete(`/delete/${customerId}`);
};

// ✅ Default export (so Customers.jsx can use CustomerService.something())
const CustomerService = {
  getAllCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};

export default CustomerService;
