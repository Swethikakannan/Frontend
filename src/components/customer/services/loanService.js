import axios from "axios";

const API_BASE = "https://localhost:7157/api/Loan";

const getAuthHeaders = () => {
  const token = sessionStorage.getItem("token");
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

// Apply for a new loan
export const applyLoan = async (loanData) => {
  return await axios.post(`${API_BASE}/apply`, loanData, getAuthHeaders());
};

// ✅ Get all loans for a specific customer
export const getLoansByCustomerId = async (customerId) => {
  return await axios.get(`${API_BASE}/customer/${customerId}`, getAuthHeaders());
};

export default { applyLoan, getLoansByCustomerId };
