import React, { useState } from "react";
import * as BeneficiaryService from "../../../services/beneficiaryService";
import "./Loan.css"; // Reuse Loan.css for uniform design

export default function Beneficiary() {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [newBeneficiary, setNewBeneficiary] = useState({
    CustomerId: "",
    BeneficiaryName: "",
    BeneficiaryAccountNumber: "",
    BankName: "",
    BranchId: "",
    IfscCode: "",
  });
  const [error, setError] = useState("");

  // Normalize backend response
  const normalizeBeneficiary = (b) => ({
    BeneficiaryId: b.BeneficiaryId,
    CustomerId: b.CustomerId,
    BeneficiaryName: b.BeneficiaryName,
    BeneficiaryAccountNumber: b.BeneficiaryAccountNumber,
    BankName: b.BankName,
    BranchName: b.BranchName,
    BranchId: b.BranchId,
    IfscCode: b.IfscCode,
    AddedDate: b.AddedDate ? new Date(b.AddedDate).toLocaleDateString() : "",
  });

  const extractData = (data) => {
    if (!data) return [];
    const arr = data.$values || (Array.isArray(data) ? data : [data]);
    return arr.map(normalizeBeneficiary);
  };

  // Fetch beneficiaries by Customer ID
  const fetchBeneficiaries = async () => {
    if (!customerId) return alert("Enter Customer ID");
    try {
      const res = await BeneficiaryService.getBeneficiariesByCustomerId(customerId);
      setBeneficiaries(extractData(res.data));
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch beneficiaries");
      setBeneficiaries([]);
    }
  };

  // Add new beneficiary
  const handleAddBeneficiary = async () => {
    try {
      await BeneficiaryService.addBeneficiary(newBeneficiary);
      alert("✅ Beneficiary added successfully!");
      setNewBeneficiary({
        CustomerId: "",
        BeneficiaryName: "",
        BeneficiaryAccountNumber: "",
        BankName: "",
        BranchId: "",
        IfscCode: "",
      });
      fetchBeneficiaries();
    } catch (err) {
      console.error(err);
      setError("Failed to add beneficiary");
    }
  };

  // Delete beneficiary
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this beneficiary?")) return;
    try {
      await BeneficiaryService.deleteBeneficiary(id);
      alert("✅ Beneficiary deleted!");
      fetchBeneficiaries();
    } catch (err) {
      console.error(err);
      setError("Failed to delete beneficiary");
    }
  };

  return (
    <div className="main-content">
      <h2>🎯Beneficiary Management</h2>

      {/* Add Beneficiary */}
      <div className="form-section">
        <h3>🪙Add Beneficiary</h3>
        {Object.keys(newBeneficiary).map((key) => (
          <input
            key={key}
            type={key.includes("Id") || key.includes("Number") ? "number" : "text"}
            placeholder={key}
            value={newBeneficiary[key]}
            onChange={(e) => setNewBeneficiary({ ...newBeneficiary, [key]: e.target.value })}
          />
        ))}
        <button onClick={handleAddBeneficiary}>Add Beneficiary</button>
      </div>

      {/* Fetch Beneficiaries */}
      <div className="form-section">
        <h3>🪙Fetch Beneficiaries</h3>
        <input
          type="number"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <button onClick={fetchBeneficiaries}>Fetch</button>
      </div>

      {/* Error */}
      {error && <p className="error">{error}</p>}

      {/* Beneficiaries Table */}
      {beneficiaries.length > 0 && (
        <div className="table-section">
          <table className="loan-table">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Beneficiary Name</th>
                <th>Account Number</th>
                <th>Bank Name</th>
                <th>IFSC</th>
                <th>Branch</th>
                <th>Added Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {beneficiaries.map((b) => (
                <tr key={b.BeneficiaryId}>
                  <td>{b.CustomerId}</td>
                  <td>{b.BeneficiaryName}</td>
                  <td>{b.BeneficiaryAccountNumber}</td>
                  <td>{b.BankName}</td>
                  <td>{b.IfscCode}</td>
                  <td>{b.BranchName}</td>
                  <td>{b.AddedDate}</td>
                 <td>
  <button className="delete-btn" onClick={() => handleDelete(b.BeneficiaryId)}>Delete</button>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

