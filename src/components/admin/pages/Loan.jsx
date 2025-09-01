import React, { useState } from "react";
import * as LoanService from "../../../services/loanService";
import "./Loan.css";

export default function Loan() {
  const [allLoans, setAllLoans] = useState([]);
  const [disbursedLoans, setDisbursedLoans] = useState([]);
  const [pendingLoans, setPendingLoans] = useState([]);
  const [singleLoan, setSingleLoan] = useState(null);
  const [loanId, setLoanId] = useState("");
  const [newLoan, setNewLoan] = useState({
    CustomerId: "",
    LoanTypeId: "",
    AppliedAmount: "",
    TenureMonths: "",
    Purpose: "",
  });
  const [error, setError] = useState("");

  const normalizeAppLoan = (l) => ({
    loanAppId: l.LoanAppId,
    customerId: l.CustomerId,
    loanTypeId: l.LoanTypeId,
    customerName: l.CustomerName,
    loanTypeName: l.LoanTypeName,
    appliedAmount: l.AppliedAmount,
    tenureMonths: l.TenureMonths,
    purpose: l.Purpose,
    status: l.Status,
    appliedDate: l.AppliedDate ? new Date(l.AppliedDate).toLocaleDateString() : "",
  });

  const normalizeDisbursedLoan = (l) => ({
    loanId: l.LoanId,
    accountId: l.AccountId,
    disbursedAmount: l.DisbursedAmount,
    disbursedDate: l.DisbursedDate ? new Date(l.DisbursedDate).toLocaleDateString() : "",
    status: l.Status,
  });

  const extractData = (data, type = "app") => {
    if (!data) return [];
    let arr = data.$values || (Array.isArray(data) ? data : [data]);
    return arr.map(type === "app" ? normalizeAppLoan : normalizeDisbursedLoan);
  };

  const fetchAllLoans = async () => {
    try {
      const res = await LoanService.getAllLoans();
      setAllLoans(extractData(res.data, "app"));
      setError("");
      setDisbursedLoans([]);
      setPendingLoans([]);
      setSingleLoan(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch all loans");
      setAllLoans([]);
    }
  };

  const fetchLoanById = async () => {
    if (!loanId) return alert("Enter Loan ID");
    try {
      const res = await LoanService.getLoanById(loanId);
      const normalized = extractData(res.data, "app");
      setSingleLoan(normalized[0] || null);
      setError("");
      setAllLoans([]);
      setDisbursedLoans([]);
      setPendingLoans([]);
    } catch (err) {
      console.error(err);
      setError("Loan not found");
      setSingleLoan(null);
    }
  };

  const fetchDisbursedLoans = async () => {
    try {
      const res = await LoanService.getDisbursedLoans();
      setDisbursedLoans(extractData(res.data, "disbursed"));
      setError("");
      setAllLoans([]);
      setPendingLoans([]);
      setSingleLoan(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch disbursed loans");
      setDisbursedLoans([]);
    }
  };

  const fetchPendingLoans = async () => {
    try {
      const res = await LoanService.getPendingLoans();
      setPendingLoans(extractData(res.data, "app"));
      setError("");
      setAllLoans([]);
      setDisbursedLoans([]);
      setSingleLoan(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch pending loans");
      setPendingLoans([]);
    }
  };

  const handleApplyLoan = async () => {
    try {
      await LoanService.applyLoan(newLoan);
      alert("✅ Loan applied successfully!");
      setNewLoan({ CustomerId: "", LoanTypeId: "", AppliedAmount: "", TenureMonths: "", Purpose: "" });
      fetchAllLoans();
    } catch (err) {
      console.error(err);
      setError("Failed to apply for loan");
    }
  };

  const LoanTable = ({ data, type }) => (
    <div className="table-section">
      <table className="loan-table">
        <thead>
          <tr>
            {type === "disbursed" ? (
              <>
                <th>Loan ID</th>
                <th>Account ID</th>
                <th>Disbursed Amount</th>
                <th>Disbursed Date</th>
                <th>Status</th>
              </>
            ) : (
              <>
                <th>LoanApp ID</th>
                <th>Customer Name</th>
                <th>Loan Type</th>
                <th>Amount</th>
                <th>Tenure</th>
                <th>Purpose</th>
                <th>Status</th>
                <th>Applied Date</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((loan) =>
            type === "disbursed" ? (
              <tr key={loan.loanId}>
                <td>{loan.loanId}</td>
                <td>{loan.accountId}</td>
                <td>{loan.disbursedAmount}</td>
                <td>{loan.disbursedDate}</td>
                <td>{loan.status}</td>
              </tr>
            ) : (
              <tr key={loan.loanAppId}>
                <td>{loan.loanAppId}</td>
                <td>{loan.customerName}</td>
                <td>{loan.loanTypeName}</td>
                <td>{loan.appliedAmount}</td>
                <td>{loan.tenureMonths}</td>
                <td>{loan.purpose}</td>
                <td>{loan.status}</td>
                <td>{loan.appliedDate}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="main-content">
      <h2>Loan Management</h2>

      {/* Apply Loan */}
      <div className="form-section">
        <h3>Apply Loan</h3>
        {Object.keys(newLoan).map((key) => (
          <input
            key={key}
            type={key.includes("Id") || key.includes("Amount") || key.includes("Tenure") ? "number" : "text"}
            placeholder={key}
            value={newLoan[key]}
            onChange={(e) => setNewLoan({ ...newLoan, [key]: e.target.value })}
          />
        ))}
        <button onClick={handleApplyLoan}>Apply Loan</button>
      </div>

      {/* Loan Actions */}
      <div className="form-section">
        <h3>Loan Actions</h3>
        <button onClick={fetchAllLoans}>All Loans</button>
        <button onClick={fetchDisbursedLoans}>Disbursed Loans</button>
        <button onClick={fetchPendingLoans}>Pending Loans</button>
        <input
          type="number"
          placeholder="Loan ID"
          value={loanId}
          onChange={(e) => setLoanId(e.target.value)}
        />
        <button onClick={fetchLoanById}>Get Loan By ID</button>
      </div>

      {error && <p className="error">{error}</p>}

      {allLoans.length > 0 && <LoanTable data={allLoans} type="app" />}
      {disbursedLoans.length > 0 && <LoanTable data={disbursedLoans} type="disbursed" />}
      {pendingLoans.length > 0 && <LoanTable data={pendingLoans} type="app" />}
      {singleLoan && <LoanTable data={[singleLoan]} type="app" />}
    </div>
  );
}
