

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import { loginAPICall } from "../../services/login.service";
import { LoginModel } from "../../models/login.model";
import { LoginErrorModel } from "../../models/loginerror.model";

const Login = () => {
  const [user, setUser] = useState(new LoginModel());
  const [errors, setErrors] = useState(new LoginErrorModel());
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle input changes and validation
  const changeUser = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        setErrors((err) => ({ ...err, email: value ? "" : "Email cannot be empty" }));
        setUser((u) => ({ ...u, Email: value }));
        break;
      case "password":
        setErrors((err) => ({ ...err, password: value ? "" : "Password cannot be empty" }));
        setUser((u) => ({ ...u, Password: value }));
        break;
      default:
        break;
    }
  };

  // Login function
  const login = async () => {
    sessionStorage.clear(); // Clear previous session

    // Check validation
    if (!user.Email || !user.Password || errors.email || errors.password) {
      setMessage("❌ Please fill in all fields correctly.");
      return;
    }

    try {
      const result = await loginAPICall(user);
      console.log("Login API response:", result.data);

      // Store session info
      sessionStorage.setItem("token", result.data.Token);
      sessionStorage.setItem("email", result.data.Email);
      sessionStorage.setItem("role", result.data.Role);
      sessionStorage.setItem("username", result.data.Username);

      // Role-based navigation
      const role = result.data.Role;
      if (role === "Admin" || role === "Employee") {
        navigate("/admin/dashboard");
      } else if (role === "Customer") {
        navigate("/customer/dashboard"); // Navigate Customer to their dashboard
      } else {
        setMessage("❌ Your role is not authorized to access any dashboard.");
        sessionStorage.clear();
      }
    } catch (err) {
      console.error("Login error:", err.response || err.message);
      if (err.response?.status === 401) {
        setMessage("❌ Invalid email or password.");
      } else {
        setMessage("❌ Login failed. Please try again.");
      }
    }
  };

  // Reset form
  const cancel = () => {
    setUser(new LoginModel());
    setErrors(new LoginErrorModel());
    setMessage("");
    sessionStorage.clear();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">MAVERICK BANK</h1>
        <p className="login-subtitle">"Your Bank, Your Security – Login Now"</p>

        {message && (
          <p className={`login-message ${message.startsWith("✅") ? "success" : "error"}`}>
            {message}
          </p>
        )}

        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={user.Email || ""}
            onChange={changeUser}
            className="loginInput"
            placeholder="Enter your email"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.Password || ""}
            onChange={changeUser}
            className="loginInput"
            placeholder="Enter your password"
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <div className="button-group">
          <button className="loginButton" onClick={login}>
            Login
          </button>
          <button className="cancelButton" onClick={cancel}>
            Cancel
          </button>
        </div>

        <p style={{ marginTop: "15px" }}>
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
