
// import React from "react";
// import { Navigate, useNavigate } from "react-router-dom";
// import "./Dashboard.css";

// export default function AdminDashboard() {
//   const navigate = useNavigate();

//   const username = sessionStorage.getItem("username");
//   const role = sessionStorage.getItem("role");

//   if (!username || (role !== "Admin" && role !== "Employee")) {
//     return <Navigate to="/login" replace />;
//   }

//   const handleLogout = () => {
//     sessionStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div className="admin-dashboard">
//       <div className="main-content">
// <header className="dashboard-header">
//   <div>
//     <h1>Welcome, {username}</h1>
//     <p className="role">Role: {role}</p>
//   </div>
//   <button className="logout-btn" onClick={handleLogout}>
//     Logout
//   </button>
// </header>
//         {/* Stats Overview */}
//         <h2 className="dashboard-title">Overview</h2>
//         <div className="stats-grid">
//           <div className="stat-card">
//             <div className="stat-icon">💳</div>
//             <div className="stat-label">Total Accounts</div>
//             <div className="stat-value">1,245</div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-icon">👥</div>
//             <div className="stat-label">Total Customers</div>
//             <div className="stat-value">980</div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-icon">👔</div>
//             <div className="stat-label">Total Employees</div>
//             <div className="stat-value">45</div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-icon">🏦</div>
//             <div className="stat-label">Loans</div>
//             <div className="stat-value">320</div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-icon">💸</div>
//             <div className="stat-label">Transactions</div>
//             <div className="stat-value">15,430</div>
//           </div>
//         </div>

//         {/* Charts Section */}
//         {/* <div className="charts-section">
//           <div className="chart-container">
//             <h3 className="chart-title">Accounts Growth</h3>
//             <div className="chart-placeholder">📊 Chart Placeholder</div>
//           </div>
//           <div className="chart-container">
//             <h3 className="chart-title">Recent Activity</h3>
//             <div className="chart-placeholder">📋 Activity Placeholder</div>
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// }
//--------------------------------------------------------------------------------------------------------------------------------------------


import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = sessionStorage.getItem("username");
  const role = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await fetch("https://localhost:7157/api/Dashboard/overview", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // include token if required
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to fetch overview`);
        }

        const data = await response.json();

        // Normalize API response to camelCase
        const normalized = {
          totalAccounts: data.TotalAccounts,
          totalCustomers: data.TotalCustomers,
          totalEmployees: data.TotalEmployees,
          totalLoans: data.TotalLoans,
          totalTransactions: data.TotalTransactions,
          activeAccounts: data.ActiveAccounts,
          closedAccounts: data.ClosedAccounts,
          retrievedAt: data.RetrievedAt,
        };

        setOverview(normalized);
      } catch (err) {
        console.error("Error fetching overview:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, [token]);

  // Redirect unauthorized users
  if (!username || (role !== "Admin" && role !== "Employee")) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      <div className="main-content">
        <header className="dashboard-header">
          <div>
            <h1>Welcome, {username}</h1>
            <p className="role">Role: {role}</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </header>

        {/* Stats Overview */}
        <h2 className="dashboard-title">Overview</h2>

        {loading ? (
          <p>Loading overview...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">💳</div>
              <div className="stat-label">Total Accounts</div>
              <div className="stat-value">{overview?.totalAccounts ?? 0}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-label">Total Customers</div>
              <div className="stat-value">{overview?.totalCustomers ?? 0}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👔</div>
              <div className="stat-label">Total Employees</div>
              <div className="stat-value">{overview?.totalEmployees ?? 0}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏦</div>
              <div className="stat-label">Loans</div>
              <div className="stat-value">{overview?.totalLoans ?? 0}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💸</div>
              <div className="stat-label">Transactions</div>
              <div className="stat-value">{overview?.totalTransactions ?? 0}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}




