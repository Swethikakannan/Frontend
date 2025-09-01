

// // src/services/employeeService.js
// import axios from "axios";

// const API_BASE = "https://localhost:7157/api/Employee";

// // ✅ Get token headers
// const getAuthHeaders = () => {
//   const token = sessionStorage.getItem("token"); // or localStorage
//   if (!token) console.warn("⚠️ Token missing! API may fail");
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };

// // ✅ Add new employee
// export const addEmployee = async (employeeData) => {
//   const res = await axios.post(API_BASE, employeeData, getAuthHeaders());
//   return normalizeResponse(res);
// };

// // ✅ Get all employees
// export const getAllEmployees = async () => {
//   const res = await axios.get(API_BASE, getAuthHeaders());
//   return normalizeResponse(res);
// };

// // ✅ Get employee by ID
// export const getEmployeeById = async (id) => {
//   const res = await axios.get(`${API_BASE}/${id}`, getAuthHeaders());
//   return normalizeResponse(res);
// };

// // ✅ Get pending loans by employee ID
// export const getPendingLoans = async (employeeId) => {
//   const res = await axios.get(
//     `${API_BASE}/${employeeId}/pending-loans`,
//     getAuthHeaders()
//   );
//   return normalizeResponse(res);
// };

// // ✅ Approve/Reject Loan
// export const updateLoanApproval = async (employeeId, loanData) => {
//   const res = await axios.put(
//     `${API_BASE}/${employeeId}/approve-loan`,
//     loanData,
//     getAuthHeaders()
//   );
//   return normalizeResponse(res);
// };

// // ✅ Delete employee
// export const deleteEmployee = async (id) => {
//   const res = await axios.delete(`${API_BASE}/${id}`, getAuthHeaders());
//   return normalizeResponse(res);
// };

// // ✅ Normalize .NET responses (handles $values)
// const normalizeResponse = (res) => {
//   let data = res.data;
//   if (data && data.$values) data = data.$values;
//   return { data };
// };

// src/services/employeeService.js
import axios from "axios";

const API_BASE = "https://localhost:7157/api/Employee";

// ✅ Get token headers
const getAuthHeaders = () => {
  const token = sessionStorage.getItem("token"); // or localStorage
  if (!token) console.warn("⚠️ Token missing! API may fail");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ✅ Normalize .NET responses (handles $values)
const normalizeResponse = (res) => {
  let data = res.data;
  if (data && data.$values) data = data.$values;
  return { data };
};

// ✅ Generic error handler
const handleRequest = async (requestFunc) => {
  try {
    const res = await requestFunc();
    return normalizeResponse(res);
  } catch (err) {
    console.error("❌ API request failed:", err);
    throw err; // Let frontend handle the alert/message
  }
};

// ✅ Add new employee
export const addEmployee = async (employeeData) => {
  return handleRequest(() => axios.post(API_BASE, employeeData, getAuthHeaders()));
};

// ✅ Get all employees
export const getAllEmployees = async () => {
  return handleRequest(() => axios.get(API_BASE, getAuthHeaders()));
};

// ✅ Get employee by ID
export const getEmployeeById = async (id) => {
  return handleRequest(() => axios.get(`${API_BASE}/${id}`, getAuthHeaders()));
};

// ✅ Get pending loans by employee ID
export const getPendingLoans = async (employeeId) => {
  return handleRequest(() =>
    axios.get(`${API_BASE}/${employeeId}/pending-loans`, getAuthHeaders())
  );
};

// ✅ Approve/Reject Loan
export const updateLoanApproval = async (employeeId, loanData) => {
  return handleRequest(() =>
    axios.put(`${API_BASE}/${employeeId}/approve-loan`, loanData, getAuthHeaders())
  );
};

// ✅ Delete employee
export const deleteEmployee = async (id) => {
  return handleRequest(() => axios.delete(`${API_BASE}/${id}`, getAuthHeaders()));
};
