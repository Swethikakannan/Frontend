// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Sidebar from "../component/sidebar";
// import Accounts from "./Accounts";
// import Transactions from "./Transactions";
// import Customers from "./Customers";
// import Employees from "./Employees";
// import Loan from "./Loan";
// import "./Dashboard.css";

// export default function Dashboard() {
//   return (
//     <div className="dashboard-container">
//       {/* Sidebar always visible */}
//       <Sidebar />
// <div className="dashboard">
//       <h1>Welcome to Admin Dashboard</h1>
//       <p>This is where you can manage users, accounts, and transactions.</p>
//     </div>
//       {/* Content changes based on route */}
//       <div className="dashboard-content">
//         <Routes>
//           <Route path="accounts" element={<Accounts />} />
//           <Route path="transactions" element={<Transactions />} />
//           <Route path="customers" element={<Customers />} />
//           <Route path="employees" element={<Employees />} />
//           <Route path="loan" element={<Loan />} />
//           <Route path="/" element={<h2>Welcome to Admin Dashboard</h2>} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import Sidebar from "../component/sidebar";
// import Accounts from "./Accounts";
// import Transactions from "./Transactions";
// import Customers from "./Customers";
// import Employees from "./Employees";
// import Loan from "./Loan";
// import "./Dashboard.css";

// export default function Dashboard() {
//   const username = sessionStorage.getItem("username") || "Admin";
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   return (
//     <div className={`dashboard-container ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
//       {/* Sidebar */}
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//       {/* Main Section */}
//       <div className="dashboard-main">
//         {/* Top Navbar */}
//         <div className="dashboard-navbar">
//           <button
//             className="menu-btn"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           >
//             ☰
//           </button>
//           <h2>Welcome, {username}</h2>
//           <button className="logout-btn">Logout</button>
//         </div>

//         {/* Page Content */}
//         <div className="dashboard-content">
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <div className="dashboard-home">
//                   <h2>Admin Overview</h2>
//                   <div className="dashboard-cards">
//                     <div className="card">
//                       <h3>Accounts</h3>
//                       <p>1,245</p>
//                     </div>
//                     <div className="card">
//                       <h3>Customers</h3>
//                       <p>3,564</p>
//                     </div>
//                     <div className="card">
//                       <h3>Loans</h3>
//                       <p>257</p>
//                     </div>
//                     <div className="card">
//                       <h3>Transactions</h3>
//                       <p>12,480</p>
//                     </div>
//                   </div>

//                   <div className="dashboard-charts">
//                     <div className="chart-box">📊 Transactions Overview</div>
//                     <div className="chart-box">📈 Loans Growth</div>
//                   </div>
//                 </div>
//               }
//             />
//             <Route path="accounts" element={<Accounts />} />
//             <Route path="transactions" element={<Transactions />} />
//             <Route path="customers" element={<Customers />} />
//             <Route path="employees" element={<Employees />} />
//             <Route path="loan" element={<Loan />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// }
