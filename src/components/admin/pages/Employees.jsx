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
  const [pendingLoans, setPendingLoans] = useState([]);
  const [loanUpdate, setLoanUpdate] = useState({
    loanAppId: "",
    approvedByEmployeeId: "",
    isApproved: false,
    accountId: "",
  });
  const [newEmployee, setNewEmployee] = useState({
    userId: "",
    fullName: "",
    branchId: "",
    email: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");

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
    amount: l.Amount || l.amount,
    isApproved: l.IsApproved || l.isApproved,
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
      setNewEmployee({ userId: "", fullName: "", branchId: "", email: "", phoneNumber: "" });
      fetchAll();
    } catch (err) {
      console.error(err);
      setError("Failed to add employee");
    }
  };

  // ------------------ Get employee by ID ------------------
  const handleGetById = async () => {
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

  // ------------------ JSX ------------------
  return (
    <div className="main-content">
      <h2>Employee Management</h2>

      {/* Add Employee Form */}
      <div className="form-section">
        <h3>Add Employee</h3>
        {Object.keys(newEmployee).map((key) => (
          <input
            key={key}
            type={key.includes("Id") || key.includes("Phone") ? "number" : "text"}
            placeholder={key}
            value={newEmployee[key]}
            onChange={(e) => setNewEmployee({ ...newEmployee, [key]: e.target.value })}
          />
        ))}
        <button onClick={handleAdd}>Add Employee</button>
      </div>

      {/* Employee Actions */}
      <div className="form-section">
        <h3>Employee Actions</h3>
        <button onClick={fetchAll}>Load Employees</button>
        <input
          type="number"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
        <button onClick={handleGetById}>Get Employee By ID</button>
      </div>

      {error && <p className="error">{error}</p>}

      {/* Employee Table */}
      {employees.length > 0 && (
        <div className="table-section">
          <table className="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Full Name</th>
                <th>Branch ID</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.employeeId}>
                  <td>{emp.employeeId}</td>
                  <td>{emp.userId}</td>
                  <td>{emp.fullName}</td>
                  <td>{emp.branchId}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phoneNumber}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(emp.employeeId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Single Employee */}
      {employee && (
        <div className="table-section">
          <h3>Employee Details</h3>
          <table className="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Full Name</th>
                <th>Branch ID</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{employee.employeeId}</td>
                <td>{employee.userId}</td>
                <td>{employee.fullName}</td>
                <td>{employee.branchId}</td>
                <td>{employee.email}</td>
                <td>{employee.phoneNumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


