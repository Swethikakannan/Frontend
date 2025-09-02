import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* First Row - Bank Name and User */}
      <div className="navbar-top-row">
        <div className="navbar-logo">Maverick Bank</div>
        <div className="navbar-user">
          <span>{sessionStorage.getItem("username")}</span>
          <button
            onClick={() => {
              sessionStorage.clear();
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Second Row - Navigation Links */}
      <div className="navbar-bottom-row">
        <ul className="navbar-links">
          <li><NavLink to="customer/dashboard">Dashboard</NavLink></li>
          <li><NavLink to="customer/accounts">Accounts</NavLink></li>
          <li><NavLink to="customer/transactions">Transactions</NavLink></li>
          <li><NavLink to="customer/beneficiaries">Beneficiaries</NavLink></li>
          <li><NavLink to="customer/loans">Loans</NavLink></li>
          <li><NavLink to="customer/profile">Profile</NavLink></li>
          
        </ul>
      </div>
    </nav>
  );
}
