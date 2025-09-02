
// // src/components/Admin/Employees/Employees.jsx
// import React, { useState } from "react";
// import {
//   addEmployee,
//   getAllEmployees,
//   getEmployeeById,
//   getPendingLoans,
//   updateLoanApproval,
//   deleteEmployee,
// } from "../../../services/employeeService";
// import "./Employees.css";

// export default function Employees() {
//   const [employees, setEmployees] = useState([]);
//   const [employeeId, setEmployeeId] = useState("");
//   const [employee, setEmployee] = useState(null);
//   const [employeeIdForLoans, setEmployeeIdForLoans] = useState("");
//   const [pendingLoans, setPendingLoans] = useState([]);
//   const [selectedLoan, setSelectedLoan] = useState({ loanAppId: "", accountId: "" });
//   const [isApproved, setIsApproved] = useState(true);
//   const [newEmployee, setNewEmployee] = useState({
//     userId: "",
//     fullName: "",
//     branchId: "",
//     email: "",
//     phoneNumber: "",
//   });
//   const [error, setError] = useState("");

//   // ------------------ Normalizers ------------------
//   const normalizeEmployee = (e) => ({
//     employeeId: e.EmployeeId || e.employeeId,
//     userId: e.UserId || e.userId,
//     fullName: e.FullName || e.fullName,
//     branchId: e.BranchId || e.branchId,
//     email: e.Email || e.email,
//     phoneNumber: e.PhoneNumber || e.phoneNumber,
//   });

//   const normalizeLoan = (l) => ({
//     loanAppId: l.LoanAppId || l.loanAppId,
//     accountId: l.AccountId || l.accountId,
//     customerName: l.CustomerName || l.customerName,
//     loanType: l.LoanTypeName || l.loanType,
//     appliedAmount: l.AppliedAmount || l.appliedAmount,
//     tenure: l.TenureMonths || l.tenure,
//     purpose: l.Purpose || l.purpose,
//     status: l.Status || l.status,
//     appliedDate: l.AppliedDate
//       ? new Date(l.AppliedDate).toLocaleDateString()
//       : "N/A",
//   });

//   // ------------------ Fetch all employees ------------------
//   const fetchAll = async () => {
//     try {
//       const res = await getAllEmployees();
//       let data = res.data;
//       if (data && data.$values) data = data.$values;
//       setEmployees(data.map(normalizeEmployee));
//       setError("");
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch employees");
//     }
//   };

//   // ------------------ Add employee ------------------
//   const handleAdd = async () => {
//     try {
//       await addEmployee(newEmployee);
//       alert("✅ Employee added!");
//       setNewEmployee({
//         userId: "",
//         fullName: "",
//         branchId: "",
//         email: "",
//         phoneNumber: "",
//       });
//       fetchAll();
//     } catch (err) {
//       console.error(err);
//       setError("Failed to add employee");
//     }
//   };

//   // ------------------ Get employee by ID ------------------
//   const handleGetById = async () => {
//     try {
//       const res = await getEmployeeById(employeeId);
//       let data = res.data;
//       if (data && data.$values) data = data.$values[0];
//       setEmployee(normalizeEmployee(data));
//       setError("");
//     } catch (err) {
//       console.error(err);
//       setError("Employee not found");
//       setEmployee(null);
//     }
//   };

//   // ------------------ Delete employee ------------------
//   const handleDelete = async (id) => {
//     try {
//       await deleteEmployee(id);
//       alert("✅ Employee deleted!");
//       fetchAll();
//     } catch (err) {
//       console.error(err);
//       setError("Failed to delete employee");
//     }
//   };

//   // ------------------ Fetch Pending Loans ------------------
//   const handlePendingLoans = async () => {
//     if (!employeeIdForLoans) {
//       setError("⚠️ Please enter an Employee ID to fetch pending loans.");
//       return;
//     }
//     try {
//       const res = await getPendingLoans(employeeIdForLoans);
//       let data = res.data;
//       if (data && data.$values) data = data.$values;
//       setPendingLoans(data.map(normalizeLoan));
//       setError("");
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch pending loans");
//     }
//   };

//   // ------------------ Approve/Reject Loan ------------------
//   const handleLoanAction = async (loan, isApproved) => {
//     try {
//       await updateLoanApproval(employeeIdForLoans, {
//         LoanAppId: loan.loanAppId,
//         ApprovedByEmployeeId: employeeIdForLoans,
//         IsApproved: isApproved,
//         AccountId: loan.accountId,
//       });
//       alert(`✅ Loan ${isApproved ? "approved" : "rejected"} successfully!`);
//       handlePendingLoans();
//     } catch (err) {
//       console.error(err);
//       setError("Failed to update loan");
//     }
//   };

//   // ------------------ Manual Approve/Reject ------------------
//   const handleManualApproval = async () => {
//     try {
//       await updateLoanApproval(employeeIdForLoans, {
//         LoanAppId: parseInt(selectedLoan.loanAppId),
//         ApprovedByEmployeeId: employeeIdForLoans,
//         IsApproved: isApproved,
//         AccountId: parseInt(selectedLoan.accountId),
//       });
//       alert(`✅ Loan ${isApproved ? "approved" : "rejected"} successfully!`);
//       handlePendingLoans();
//       setSelectedLoan({ loanAppId: "", accountId: "" });
//     } catch (err) {
//       console.error(err);
//       setError("Failed to update loan manually");
//     }
//   };

//   // ------------------ JSX ------------------
//   return (
//     <div className="main-content">
//       <h2>Employee Management</h2>

//       {/* Add Employee Form */}
//       <div className="form-section">
//         <h3>Add Employee</h3>
//         {Object.keys(newEmployee).map((key) => (
//           <input
//             key={key}
//             type={key.includes("Id") || key.includes("Phone") ? "number" : "text"}
//             placeholder={key}
//             value={newEmployee[key] || ""}
//             onChange={(e) =>
//               setNewEmployee({ ...newEmployee, [key]: e.target.value })
//             }
//           />
//         ))}
//         <button onClick={handleAdd}>Add Employee</button>
//       </div>

//       {/* Employee Actions */}
//       <div className="form-section">
//         <h3>Employee Actions</h3>
//         <button onClick={fetchAll}>Load Employees</button>
//         <input
//           type="number"
//           placeholder="Employee ID"
//           value={employeeId || ""}
//           onChange={(e) => setEmployeeId(e.target.value)}
//         />
//         <button onClick={handleGetById}>Get Employee By ID</button>
//       </div>

//       {error && <p className="error">{error}</p>}

//       {/* Employee Table */}
//       {employees.length > 0 && (
//         <div className="table-section">
//           <table className="employee-table">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>User ID</th>
//                 <th>Full Name</th>
//                 <th>Branch ID</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {employees.map((emp) => (
//                 <tr key={emp.employeeId}>
//                   <td>{emp.employeeId}</td>
//                   <td>{emp.userId}</td>
//                   <td>{emp.fullName}</td>
//                   <td>{emp.branchId}</td>
//                   <td>{emp.email}</td>
//                   <td>{emp.phoneNumber}</td>
//                   <td>
//                     <button
//                       className="delete-btn"
//                       onClick={() => handleDelete(emp.employeeId)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Single Employee */}
//       {employee && (
//         <div className="table-section">
//           <h3>Employee Details</h3>
//           <table className="employee-table">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>User ID</th>
//                 <th>Full Name</th>
//                 <th>Branch ID</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>{employee.employeeId}</td>
//                 <td>{employee.userId}</td>
//                 <td>{employee.fullName}</td>
//                 <td>{employee.branchId}</td>
//                 <td>{employee.email}</td>
//                 <td>{employee.phoneNumber}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Pending Loans Section */}
//       <div className="form-section">
//         <h3>Loan Management</h3>
//         <input
//           type="number"
//           placeholder="Enter Employee ID"
//           value={employeeIdForLoans || ""}
//           onChange={(e) => setEmployeeIdForLoans(e.target.value)}
//         />
//         <button onClick={handlePendingLoans}>Get Pending Loans</button>
//       </div>

//       {pendingLoans.length > 0 && (
//         <div className="table-section">
//           <h3>Pending Loans</h3>
//           <table className="employee-table">
//             <thead>
//               <tr>
//                 <th>Loan ID</th>
//                 <th>Customer</th>
//                 <th>Type</th>
//                 <th>Amount</th>
//                 <th>Tenure</th>
//                 <th>Purpose</th>
//                 <th>Status</th>
//                 <th>Applied Date</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pendingLoans.map((loan) => (
//                 <tr
//                   key={loan.loanAppId}
//                   onClick={() =>
//                     setSelectedLoan({
//                       loanAppId: loan.loanAppId,
//                       accountId: loan.accountId,
//                     })
//                   }
//                   style={{ cursor: "pointer" }}
//                 >
//                   <td>{loan.loanAppId}</td>
//                   <td>{loan.customerName}</td>
//                   <td>{loan.loanType}</td>
//                   <td>₹{loan.appliedAmount}</td>
//                   <td>{loan.tenure} months</td>
//                   <td>{loan.purpose}</td>
//                   <td>{loan.status}</td>
//                   <td>{loan.appliedDate}</td>
//                   <td>
//                     <button
//                       className="approve-btn"
//                       onClick={() => handleLoanAction(loan, true)}
//                     >
//                       Approve
//                     </button>
//                     <button
//                       className="reject-btn"
//                       onClick={() => handleLoanAction(loan, false)}
//                     >
//                       Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Manual Loan Approval Form */}
//       <div className="form-section">
//         <h3>Manual Approve / Reject Loan</h3>
//         <input
//           type="number"
//           placeholder="LoanAppId"
//           value={selectedLoan.loanAppId || ""}
//           onChange={(e) =>
//             setSelectedLoan({ ...selectedLoan, loanAppId: e.target.value })
//           }
//         />
//         <input
//           type="number"
//           placeholder="AccountId"
//           value={selectedLoan.accountId || ""}
//           onChange={(e) =>
//             setSelectedLoan({ ...selectedLoan, accountId: e.target.value })
//           }
//         />
//         <select
//           className={`manual-approval-select ${isApproved ? "" : "reject"}`}
//           value={isApproved ? "true" : "false"}
//           onChange={(e) => setIsApproved(e.target.value === "true")}
//         >
//           <option value="true">Approve</option>
//           <option value="false">Reject</option>
//         </select>

//         <button onClick={handleManualApproval}>Submit Decision</button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import {
  addEmployee,
  getAllEmployees,
  getEmployeeById,
  getPendingLoans,
  updateLoanApproval,
  deleteEmployee,
} from "../../../services/employeeService";
import "./Employees.css";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [employee, setEmployee] = useState(null);
  const [employeeIdForLoans, setEmployeeIdForLoans] = useState("");
  const [pendingLoans, setPendingLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState({ loanAppId: "", accountId: "" });
  const [isApproved, setIsApproved] = useState(true);
  const [newEmployee, setNewEmployee] = useState({
    userId: "",
    fullName: "",
    branchId: "",
    email: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");

  // ------------------ Normalizers ------------------
  const normalizeEmployee = (e) => ({
    employeeId: e.EmployeeId || e.employeeId,
    userId: e.UserId || e.userId,
    fullName: e.FullName || e.fullName,
    branchId: e.BranchId || e.branchId,
    email: e.Email || e.email,
    phoneNumber: e.PhoneNumber || e.phoneNumber,
  });

  const normalizeLoan = (l) => ({
    loanAppId: l.LoanAppId || l.loanAppId,
    accountId: l.AccountId || l.accountId,
    customerName: l.CustomerName || l.customerName,
    loanType: l.LoanTypeName || l.loanType,
    appliedAmount: l.AppliedAmount || l.appliedAmount,
    tenure: l.TenureMonths || l.tenure,
    purpose: l.Purpose || l.purpose,
    status: l.Status || l.status,
    appliedDate: l.AppliedDate
      ? new Date(l.AppliedDate).toLocaleDateString()
      : "N/A",
  });

  // ------------------ Fetch all employees ------------------
  const fetchAll = async () => {
    try {
      const res = await getAllEmployees();
      let data = res.data;
      if (data && data.$values) data = data.$values;
      setEmployees(data.map(normalizeEmployee));
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch employees");
    }
  };

  // ------------------ Add employee ------------------
  const handleAdd = async () => {
    try {
      await addEmployee(newEmployee);
      alert("✅ Employee added!");
      setNewEmployee({
        userId: "",
        fullName: "",
        branchId: "",
        email: "",
        phoneNumber: "",
      });
      fetchAll();
    } catch (err) {
      console.error(err);
      setError("Failed to add employee");
    }
  };

  // ------------------ Get employee by ID ------------------
  const handleGetById = async () => {
    if (!employeeId) return alert("Enter Employee ID");
    try {
      const res = await getEmployeeById(employeeId);
      let data = res.data;
      if (data && data.$values) data = data.$values[0];
      setEmployee(normalizeEmployee(data));
      setError("");
    } catch (err) {
      console.error(err);
      setError("Employee not found");
      setEmployee(null);
    }
  };

  // ------------------ Delete employee ------------------
  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      alert("✅ Employee deleted!");
      fetchAll();
    } catch (err) {
      console.error(err);
      setError("Failed to delete employee");
    }
  };

  // ------------------ Fetch Pending Loans ------------------
  const handlePendingLoans = async () => {
    if (!employeeIdForLoans) {
      setError("⚠️ Please enter an Employee ID to fetch pending loans.");
      return;
    }
    try {
      const res = await getPendingLoans(employeeIdForLoans);
      let data = res.data;
      if (data && data.$values) data = data.$values;
      setPendingLoans(data.map(normalizeLoan));
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch pending loans");
    }
  };

  // ------------------ Approve/Reject Loan ------------------
  const handleLoanAction = async (loan, isApproved) => {
    try {
      await updateLoanApproval(employeeIdForLoans, {
        LoanAppId: loan.loanAppId,
        ApprovedByEmployeeId: employeeIdForLoans,
        IsApproved: isApproved,
        AccountId: loan.accountId,
      });
      alert(`✅ Loan ${isApproved ? "approved" : "rejected"} successfully!`);
      handlePendingLoans();
    } catch (err) {
      console.error(err);
      setError("Failed to update loan");
    }
  };

  // ------------------ Manual Approve/Reject ------------------
  const handleManualApproval = async () => {
    try {
      await updateLoanApproval(employeeIdForLoans, {
        LoanAppId: parseInt(selectedLoan.loanAppId),
        ApprovedByEmployeeId: employeeIdForLoans,
        IsApproved: isApproved,
        AccountId: parseInt(selectedLoan.accountId),
      });
      alert(`✅ Loan ${isApproved ? "approved" : "rejected"} successfully!`);
      handlePendingLoans();
      setSelectedLoan({ loanAppId: "", accountId: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to update loan manually");
    }
  };

  // Employee Table Component
  const EmployeeTable = ({ data, title, showActions = false }) => (
    <div className="table-section">
      <h4>{title}</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>User ID</th>
            <th>Full Name</th>
            <th>Branch ID</th>
            <th>Email</th>
            <th>Phone Number</th>
            {showActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((emp) => (
            <tr key={emp.employeeId}>
              <td>{emp.employeeId}</td>
              <td>{emp.userId}</td>
              <td>{emp.fullName}</td>
              <td>{emp.branchId}</td>
              <td>{emp.email}</td>
              <td>{emp.phoneNumber}</td>
              {showActions && (
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(emp.employeeId)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Loan Table Component
  const LoanTable = ({ data, title }) => (
    <div className="table-section">
      <h4>{title}</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Customer</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Tenure</th>
            <th>Purpose</th>
            <th>Status</th>
            <th>Applied Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((loan) => (
            <tr
              key={loan.loanAppId}
              onClick={() =>
                setSelectedLoan({
                  loanAppId: loan.loanAppId,
                  accountId: loan.accountId,
                })
              }
              style={{ cursor: "pointer" }}
            >
              <td>{loan.loanAppId}</td>
              <td>{loan.customerName}</td>
              <td>{loan.loanType}</td>
              <td>₹{loan.appliedAmount}</td>
              <td>{loan.tenure} months</td>
              <td>{loan.purpose}</td>
              <td>{loan.status}</td>
              <td>{loan.appliedDate}</td>
              <td>
                <button
                  className="approve-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLoanAction(loan, true);
                  }}
                >
                  Approve
                </button>
                <button
                  className="reject-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLoanAction(loan, false);
                  }}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // ------------------ JSX ------------------
  return (
    <div className="main-content">
      <h2>🧑🏻‍🏭Employee Management</h2>
      {error && <p className="error">{error}</p>}

      {/* Add Employee Form */}
      <div className="form-section">
        <h3>🪙Add Employee</h3>
        <input
          placeholder="User ID"
          value={newEmployee.userId}
          onChange={(e) => setNewEmployee({ ...newEmployee, userId: e.target.value })}
        />
        <input
          placeholder="Full Name"
          value={newEmployee.fullName}
          onChange={(e) => setNewEmployee({ ...newEmployee, fullName: e.target.value })}
        />
        <input
          placeholder="Branch ID"
          value={newEmployee.branchId}
          onChange={(e) => setNewEmployee({ ...newEmployee, branchId: e.target.value })}
        />
        <input
          placeholder="Email"
          value={newEmployee.email}
          onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
        />
        <input
          placeholder="Phone Number"
          value={newEmployee.phoneNumber}
          onChange={(e) => setNewEmployee({ ...newEmployee, phoneNumber: e.target.value })}
        />
        <button onClick={handleAdd}>Add Employee</button>
      </div>

      {/* Fetch Employees */}
      <div className="form-section">
        <h3>🪙Fetch Employees</h3>
        
        <div>
          <button onClick={fetchAll}>Get All Employees</button>
          {employees.length > 0 && (
            <EmployeeTable data={employees} title="All Employees" showActions={true} />
          )}
        </div>

        <div>
          <input
            placeholder="Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
          <button onClick={handleGetById}>Get Employee By ID</button>
          {employee && (
            <EmployeeTable data={[employee]} title="Employee Details" />
          )}
        </div>
      </div>

      {/* Loan Management */}
      <div className="form-section">
        <h3>🪙Loan Management</h3>
        
        <div>
          <input
            placeholder="Employee ID for Loans"
            value={employeeIdForLoans}
            onChange={(e) => setEmployeeIdForLoans(e.target.value)}
          />
          <button onClick={handlePendingLoans}>Get Pending Loans</button>
          {pendingLoans.length > 0 && (
            <LoanTable data={pendingLoans} title="Pending Loans" />
          )}
        </div>

        {/* Manual Loan Approval */}
        <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid #e0e0e0" }}>
          <h4>Manual Approve / Reject Loan</h4>
          <input
            placeholder="Loan App ID"
            value={selectedLoan.loanAppId}
            onChange={(e) =>
              setSelectedLoan({ ...selectedLoan, loanAppId: e.target.value })
            }
          />
          <input
            placeholder="Account ID"
            value={selectedLoan.accountId}
            onChange={(e) =>
              setSelectedLoan({ ...selectedLoan, accountId: e.target.value })
            }
          />
          <select
            className={`manual-approval-select ${isApproved ? "" : "reject"}`}
            value={isApproved ? "true" : "false"}
            onChange={(e) => setIsApproved(e.target.value === "true")}
          >
            <option value="true">Approve</option>
            <option value="false">Reject</option>
          </select>
          <button onClick={handleManualApproval}>Submit Decision</button>
        </div>
      </div>
    </div>
  );
}