import React from "react";
import "./CustomerDashboards.css";

export default function CustomerDashboard() {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">
        Welcome, {sessionStorage.getItem("username")}!
      </h1>
      <div className="stats-grid">
        <div className="stat-card">Accounts Overview</div>
        <div className="stat-card">Recent Transactions</div>
        <div className="stat-card">Beneficiaries</div>
        <div className="stat-card">Loan Details</div>
        <div className="stat-card">Profile Settings</div>
      </div>
    </div>
  );
}
