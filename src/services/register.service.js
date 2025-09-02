

// import axios from "axios";

// export async function registerService(model) {
//   try {
//     // Convert camelCase → PascalCase for backend
//     const payload = {
//       Username: model.username,
//       Email: model.email,
//       Password: model.password,
//       RoleId: model.roleId,
//     };

//     const response = await axios.post(
//       "https://localhost:7157/api/Auth/register",
//       payload,
//       { headers: { "Content-Type": "application/json" } }
//     );

//     console.log("✅ Register API response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Register API error:", error.response || error.message);

//     if (error.response?.status === 409) {
//       throw new Error("⚠️ User already exists.");
//     }
//     throw new Error(
//       error.response?.data?.message || "❌ Registration failed. Try again."
//     );
//   }
// }

import axios from "axios";

export async function registerService(model) {
  try {
    const payload = {
      Username: model.username,
      Email: model.email,
      Password: model.password,
      RoleId: model.roleId,
    };

    const response = await axios.post(
      "https://localhost:7157/api/Auth/register",
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data || { message: "success" }; // fallback
  } catch (error) {
    if (error.response?.status === 409) {
      throw new Error("User already exists");
    }
    throw new Error(
      error.response?.data?.message || "Registration failed. Try again."
    );
  }
}
