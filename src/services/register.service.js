import axios from "axios";

export async function registerService(model) {
  try {
    const response = await axios.post(
      "http://localhost:7157/api/Auth/register",
      model
    );
    console.log("API response data:", response.data);
    console.log("API response status:", response.status);
    return response.data; // Could be string or object
  } catch (error) {
    console.error("API error response:", error.response || error.message);
    // Throw string message if available, fallback to generic
    throw new Error(
      error.response?.data?.message || "Registration failed. Try again."
    );
  }
}