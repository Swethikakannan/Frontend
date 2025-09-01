

// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

// // Admin imports
// import Sidebar from "./components/admin/component/sidebar";
// import { SidebarProvider } from "./components/admin/component/SidebarContext";
// import AdminDashboard from "./components/admin/pages/AdminDashboard";
// import Accounts from "./components/admin/pages/Accounts";
// import Customers from "./components/admin/pages/Customers";
// import Employees from "./components/admin/pages/Employees";
// import Loan from "./components/admin/pages/Loan";
// import Transactions from "./components/admin/pages/Transactions";
// import Beneficiary from "./components/admin/pages/Beneficiary";
// import AuditLog from "./components/admin/pages/AuditLog";

// // Customer imports
// import CustomerDashboard from "./components/customer/pages/CustomerDashboard";
// import CustomerAccounts from "./components/customer/pages/Accounts";
// import CustomerTransactions from "./components/customer/pages/Transactions";
// import Beneficiaries from "./components/customer/pages/Beneficiaries";
// import Profile from "./components/customer/pages/Profile";
// import Loans from "./components/customer/pages/Loans"

// // Shared imports
// import ProtectedRoute from "./components/admin/component/ProtectedRoute";
// import Login from "./components/login/login";
// import Register from "./components/register/register";
// import Navbar from "./components/customer/component/Navbar";

// // =====================
// // Admin Layout with Sidebar
// // =====================
// function AdminLayout() {
//   return (
//     <SidebarProvider>
//       <div className="app-shell" style={{ display: "flex", minHeight: "100vh" }}>
//         <Sidebar />
//         <main style={{ flex: 1, padding: "16px" }}>
//           <Outlet />
//         </main>
//       </div>
//     </SidebarProvider>
//   );
// }

// // =====================
// // Customer Layout with Top Navbar
// // =====================
// function CustomerLayout() {
//   return (
//     <div className="customer-dashboard">
//       <Navbar />
//       <main style={{ padding: "20px 40px" }}>
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// // =====================
// // App Component
// // =====================
// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Default redirect to login */}
//         <Route path="/" element={<Navigate to="/login" replace />} />

//         {/* Public routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Protected Admin routes */}
//         <Route
//           element={
//             <ProtectedRoute roles={["Admin", "Employee"]}>
//               <AdminLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="/admin/dashboard" element={<AdminDashboard />} />
//           <Route path="/admin/accounts" element={<Accounts />} />
//           <Route path="/admin/customers" element={<Customers />} />
//           <Route path="/admin/employees" element={<Employees />} />
//           <Route path="/admin/loan" element={<Loan />} />
//           <Route path="/admin/transactions" element={<Transactions />} />
//           <Route path="/admin/beneficiary" element={<Beneficiary />} />
//           <Route path="/admin/auditlog" element={<AuditLog />} />
//         </Route>

//         {/* Protected Customer routes */}
//         <Route
//           element={
//             <ProtectedRoute roles={["Customer"]}>
//               <CustomerLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="/customer/dashboard" element={<CustomerDashboard />} />
//           <Route path="/customer/accounts" element={<CustomerAccounts />} />
//           <Route path="/customer/transactions" element={<CustomerTransactions />} />
//           <Route path="/customer/beneficiaries" element={<Beneficiaries />} />
//           <Route path="/customer/profile" element={<Profile />} />
//           <Route path="/customer/loan" element={<Loan />} />
//         </Route>

//         {/* Catch-all: redirect unknown routes to login */}
//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

// Admin imports
import Sidebar from "./components/admin/component/sidebar";
import { SidebarProvider } from "./components/admin/component/SidebarContext";
import AdminDashboard from "./components/admin/pages/AdminDashboard";
import Accounts from "./components/admin/pages/Accounts";
import Customers from "./components/admin/pages/Customers";
import Employees from "./components/admin/pages/Employees";
import Loan from "./components/admin/pages/Loan";
import Transactions from "./components/admin/pages/Transactions";
import Beneficiary from "./components/admin/pages/Beneficiary";
import AuditLog from "./components/admin/pages/AuditLog";

// Customer imports
import CustomerDashboard from "./components/customer/pages/CustomerDashboard";
import CustomerAccounts from "./components/customer/pages/Accounts";
import CustomerTransactions from "./components/customer/pages/Transactions";
import Beneficiaries from "./components/customer/pages/Beneficiaries";
import Profile from "./components/customer/pages/Profile";
import Loans from "./components/customer/pages/Loans";

// Shared imports
import ProtectedRoute from "./components/admin/component/ProtectedRoute";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Navbar from "./components/customer/component/Navbar";

// =====================
// Admin Layout with Sidebar
// =====================
function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="app-shell" style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "16px" }}>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}

// =====================
// Customer Layout with Top Navbar
// =====================
function CustomerLayout() {
  return (
    <div className="customer-dashboard">
      <Navbar />
      <main style={{ padding: "20px 40px" }}>
        <Outlet />
      </main>
    </div>
  );
}

// =====================
// App Component
// =====================
function App() {
  return (
    <Router>
      <Routes>
        {/* Default redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Admin routes */}
        <Route
          element={
            <ProtectedRoute roles={["Admin", "Employee"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/accounts" element={<Accounts />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/employees" element={<Employees />} />
          <Route path="/admin/loan" element={<Loan />} />
          <Route path="/admin/transactions" element={<Transactions />} />
          <Route path="/admin/beneficiary" element={<Beneficiary />} />
          <Route path="/admin/auditlog" element={<AuditLog />} />
        </Route>

        {/* Protected Customer routes */}
        <Route
          element={
            <ProtectedRoute roles={["Customer"]}>
              <CustomerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/accounts" element={<CustomerAccounts />} />
          <Route path="/customer/transactions" element={<CustomerTransactions />} />
          <Route path="/customer/beneficiaries" element={<Beneficiaries />} />
          <Route path="/customer/profile" element={<Profile />} />
          <Route path="/customer/loans" element={<Loans />} />
        </Route>

        {/* Catch-all: redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
