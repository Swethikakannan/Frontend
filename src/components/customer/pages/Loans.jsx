import React, { useState } from "react";
import { applyLoan } from "../../../services/loanService";
import "./Loans.css";

export default function Loans() {
  const [formData, setFormData] = useState({
    CustomerId: "",
    LoanTypeId: "",
    AppliedAmount: "",
    TenureMonths: "",
    Purpose: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loanTypes = [
    { id: 1, name: "🏠 Home Loan" },
    { id: 2, name: "🚗 Car Loan" },
    { id: 3, name: "🎓 Education Loan" },
    { id: 4, name: "💳 Personal Loan" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.CustomerId) tempErrors.CustomerId = "Customer ID is required";
    if (!formData.LoanTypeId) tempErrors.LoanTypeId = "Please select loan type";
    if (!formData.AppliedAmount) tempErrors.AppliedAmount = "Amount is required";
    else if (parseFloat(formData.AppliedAmount) < 10000) tempErrors.AppliedAmount = "Minimum loan amount ₹10,000";
    if (!formData.TenureMonths) tempErrors.TenureMonths = "Tenure is required";
    if (!formData.Purpose) tempErrors.Purpose = "Purpose is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);

    try {
      const res = await applyLoan({
        CustomerId: parseInt(formData.CustomerId),
        LoanTypeId: parseInt(formData.LoanTypeId),
        AppliedAmount: parseFloat(formData.AppliedAmount),
        TenureMonths: parseInt(formData.TenureMonths),
        Purpose: formData.Purpose,
      });

      setSuccess(res.data);
      setFormData({ CustomerId: "", LoanTypeId: "", AppliedAmount: "", TenureMonths: "", Purpose: "" });
      setErrors({});
    } catch (err) {
      console.error(err);
      setErrors({ general: "Failed to apply loan. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ CustomerId: "", LoanTypeId: "", AppliedAmount: "", TenureMonths: "", Purpose: "" });
    setErrors({});
    setSuccess(null);
  };

  return (
    <div className="customer-loans">
      <h2>💸 Apply for a Loan</h2>

      {errors.general && <div className="error">❌ {errors.general}</div>}

      {/* Success Card */}
      {success && (
        <div className="success-card">
          <h3>✅ Loan Application Submitted</h3>
          <p><b>Loan ID:</b> {success.LoanAppId || "Pending"}</p>
          <p><b>Amount:</b> ₹{success.AppliedAmount}</p>
          <p><b>Loan Type:</b> {loanTypes.find(t => t.id === success.LoanTypeId)?.name}</p>
          <p><b>Tenure:</b> {success.TenureMonths} months</p>
          <p><b>Status:</b> {success.Status || "Pending Approval"}</p>
          <button onClick={() => setSuccess(null)}>Apply Another Loan</button>
        </div>
      )}

      {/* Loan Form */}
      {!success && (
        <form className="loan-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="number"
              name="CustomerId"
              placeholder="👤 Customer ID"
              value={formData.CustomerId}
              onChange={handleChange}
            />
            {errors.CustomerId && <p className="error">{errors.CustomerId}</p>}
          </div>

          <div className="form-group">
            <select name="LoanTypeId" value={formData.LoanTypeId} onChange={handleChange}>
              <option value="">💳 Select Loan Type</option>
              {loanTypes.map((type) => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
            {errors.LoanTypeId && <p className="error">{errors.LoanTypeId}</p>}
          </div>

          <div className="form-group">
            <input
              type="number"
              name="AppliedAmount"
              placeholder="💰 Loan Amount"
              value={formData.AppliedAmount}
              onChange={handleChange}
            />
            {errors.AppliedAmount && <p className="error">{errors.AppliedAmount}</p>}
          </div>

          <div className="form-group">
            <input
              type="number"
              name="TenureMonths"
              placeholder="📅 Tenure (months)"
              value={formData.TenureMonths}
              onChange={handleChange}
            />
            {errors.TenureMonths && <p className="error">{errors.TenureMonths}</p>}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="Purpose"
              placeholder="🎯 Purpose"
              value={formData.Purpose}
              onChange={handleChange}
            />
            {errors.Purpose && <p className="error">{errors.Purpose}</p>}
          </div>

          <div className="buttons">
            <button type="button" className="btn cancel" onClick={resetForm}>✖️ Cancel</button>
            <button type="submit" className="btn create" disabled={isLoading}>
              {isLoading ? "⏳ Applying..." : "🚀 Apply Loan"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
