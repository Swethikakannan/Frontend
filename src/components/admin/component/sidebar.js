

// import React from "react";
// import { NavLink } from "react-router-dom";
// import "./sidebar.css";

// export default function Sidebar({ sidebarOpen }) {
//   return (
//     <div className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
//       <h2>ADMIN DASHBOARD</h2>
//       <ul>
//         <li>
//           <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
//             Dashboard
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/admin/accounts" className={({ isActive }) => (isActive ? "active" : "")}>
//             Accounts
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/admin/customers" className={({ isActive }) => (isActive ? "active" : "")}>
//             Customers
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/admin/employees" className={({ isActive }) => (isActive ? "active" : "")}>
//             Employees
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/admin/transactions" className={({ isActive }) => (isActive ? "active" : "")}>
//             Transactions
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/admin/loan" className={({ isActive }) => (isActive ? "active" : "")}>
//             Loans
//           </NavLink>
//         </li>
//         <li>
//  <NavLink to="/admin/beneficiary" className={({ isActive }) => (isActive ? "active" : "")}>
//   Beneficiary
// </NavLink>
//         </li>
//       </ul>
//     </div>
//   );
// }

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Toggle Button (visible on small screens) */}
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
        <h2>ADMIN DASHBOARD</h2>
        <ul>
          <li>
            <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/accounts" className={({ isActive }) => (isActive ? "active" : "")}>
              Accounts
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/customers" className={({ isActive }) => (isActive ? "active" : "")}>
              Customers
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/employees" className={({ isActive }) => (isActive ? "active" : "")}>
              Employees
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/transactions" className={({ isActive }) => (isActive ? "active" : "")}>
              Transactions
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/loan" className={({ isActive }) => (isActive ? "active" : "")}>
              Loans
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/beneficiary" className={({ isActive }) => (isActive ? "active" : "")}>
              Beneficiary
            </NavLink>
          </li>
           <li>
            <NavLink to="/admin/auditlog" className={({ isActive }) => (isActive ? "active" : "")}>
              AuditLog
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
