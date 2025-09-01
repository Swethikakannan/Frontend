import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { RegisterModel } from "../../models/register.model";
import { registerService } from "../../services/register.service";
import "./register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    roleId: 3, // default employee
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const model = new RegisterModel(
    formData.username,
    formData.email,
    formData.password,
    Number(formData.roleId)
  );

  try {
    const result = await registerService(model);

    // result could be string or object
    const messageText =
      typeof result === "string" ? result : result.message || "";

    if (messageText.toLowerCase().includes("success")) {
      setMessage("✅ Registration successful! Please login.");
      setIsSuccess(true);
      setTimeout(() => navigate("/"), 1500);
    } else if (messageText.toLowerCase().includes("exists")) {
      setMessage("⚠️ User already exists! Try another username.");
      setIsSuccess(false);
    } else {
      setMessage(messageText || "❌ Registration failed.");
      setIsSuccess(false);
    }
  } catch (err) {
    const errorMessage = err.message || "❌ Registration failed.";
    if (errorMessage.toLowerCase().includes("exists")) {
      setMessage("⚠️ User already exists! Try another username.");
    } else {
      setMessage(errorMessage);
    }
    setIsSuccess(false);
  }
};


  return (
    <div className="register-container">
      <form className="register-box" onSubmit={handleSubmit}>
        <h2>Register Yourself !</h2>

        {message && (
          <p className={`register-message ${isSuccess ? "success" : "error"}`}>
            {message}
          </p>
        )}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <select
          name="roleId"
          value={formData.roleId}
          onChange={handleChange}
        >
          <option value="2">Customer</option>
          <option value="3">Employee</option>
          <option value="1">Admin</option>
        </select>

        <button type="submit">Register</button>

        {/* Manual navigation if user clicks */}
        <button
          type="button"
          className="login-btn"
          onClick={() => navigate("/")}
        >
          Go to Login
        </button>
      </form>
    </div>
  );
}
