

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

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      // Auto-close sidebar on desktop, auto-open on larger screens
      if (window.innerWidth > 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close sidebar when clicking on a link (mobile only)
  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // Close sidebar when clicking outside (mobile only)
  const handleOverlayClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button */}
      <button 
        className="toggle-btn" 
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="sidebar-overlay show" 
          onClick={handleOverlayClick}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
        <h2>ADMIN DASHBOARD</h2>
        <nav>
          <ul>
            <li>
              <NavLink 
                to="/admin/dashboard" 
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={handleLinkClick}
              >
                📊 Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/customers" 
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={handleLinkClick}
              >
                👥 Customers
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/accounts" 
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={handleLinkClick}
              >
                🏦 Accounts
              </NavLink>
            </li>
  
            <li>
              <NavLink 
                to="/admin/transactions" 
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={handleLinkClick}
              >
                💳 Transactions
              </NavLink>
            </li>
             
            <li>
              <NavLink 
                to="/admin/loan" 
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={handleLinkClick}
              >
                💰 Loans
              </NavLink>
            </li>
                     <li>
              <NavLink 
                to="/admin/employees" 
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={handleLinkClick}
              >
                👨‍💼 Employees
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/beneficiary" 
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={handleLinkClick}
              >
                🎯 Beneficiary
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/auditlog" 
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={handleLinkClick}
              >
                📋 Audit Log
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}