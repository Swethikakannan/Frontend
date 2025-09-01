import axios from "axios";

const API_BASE = "https://localhost:7157/api/Loan";

// Utility to get auth token from session storage
const getAuthHeaders = () => {
  const token = sessionStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Apply for a new loan
export const applyLoan = async (loanData) => {
  return await axios.post(`${API_BASE}/apply`, loanData, getAuthHeaders());
};

// Default export
export default { applyLoan };
