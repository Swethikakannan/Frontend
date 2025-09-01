import React, { useState } from "react";
import { createAccount } from "../../../services/accountService";
import "./Accounts.css";

export default function Accounts() {
  const [formData, setFormData] = useState({
    CustomerId: "",
    AccountTypeId: "",
    BranchId: "",
    InitialDeposit: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const accountTypes = [
    { id: 1, name: "💰 Savings Account" },
    { id: 2, name: "🏢 Current Account" },
    { id: 3, name: "💼 Salary Account" },
    { id: 4, name: "🔒 Fixed Deposit" },
  ];

  const branches = [
    { id: 1, name: "🏛️ Main Branch - Coimbatore" },
    { id: 2, name: "🌆 West Branch - Chennai" },
    { id: 3, name: "🗽 TimesSquare - New York" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.CustomerId) tempErrors.CustomerId = "Customer ID is required";
    if (!formData.AccountTypeId) tempErrors.AccountTypeId = "Please select an account type";
    if (!formData.BranchId) tempErrors.BranchId = "Please select a branch";
    if (!formData.InitialDeposit) {
      tempErrors.InitialDeposit = "Initial deposit is required";
    } else if (parseFloat(formData.InitialDeposit) < 1000) {
      tempErrors.InitialDeposit = "Minimum deposit is ₹1,000";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);

    try {
      const res = await createAccount({
        CustomerId: parseInt(formData.CustomerId),
        AccountTypeId: parseInt(formData.AccountTypeId),
        BranchId: parseInt(formData.BranchId),
        InitialDeposit: parseFloat(formData.InitialDeposit),
      });

      setSuccess(res.data);
      setFormData({ CustomerId: "", AccountTypeId: "", BranchId: "", InitialDeposit: "" });
      setErrors({});
    } catch (err) {
      console.error(err);
      setErrors({ general: "Failed to create account. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ CustomerId: "", AccountTypeId: "", BranchId: "", InitialDeposit: "" });
    setErrors({});
    setSuccess(null);
  };

  return (
    <div className="customer-accounts">
      <h2>🏦 Open New Account</h2>

      {errors.general && <div className="error">❌ {errors.general}</div>}

      {/* Success Card */}
      {success && (
        <div className="success-card">
          <h3>✅ Account Created Successfully</h3>
          <p><b>Account Number:</b> {success.AccountNumber}</p>
          <p><b>Balance:</b> ₹{success.Balance}</p>
          <p><b>Account Type:</b> {success.AccountTypeName}</p>
          <p><b>Branch:</b> {success.BranchName}</p>
          <button onClick={() => setSuccess(null)}>Create Another</button>
        </div>
      )}

      {/* Account Creation Form */}
      {!success && (
        <form className="account-form" onSubmit={handleSubmit}>
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
            <select
              name="AccountTypeId"
              value={formData.AccountTypeId}
              onChange={handleChange}
            >
              <option value="">💳 Select Account Type</option>
              {accountTypes.map((type) => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
            {errors.AccountTypeId && <p className="error">{errors.AccountTypeId}</p>}
          </div>

          <div className="form-group">
            <select
              name="BranchId"
              value={formData.BranchId}
              onChange={handleChange}
            >
              <option value="">🏢 Select Branch</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>{branch.name}</option>
              ))}
            </select>
            {errors.BranchId && <p className="error">{errors.BranchId}</p>}
          </div>

          <div className="form-group">
            <input
              type="number"
              name="InitialDeposit"
              placeholder="💰 Initial Deposit (min ₹1,000)"
              value={formData.InitialDeposit}
              onChange={handleChange}
            />
            {errors.InitialDeposit && <p className="error">{errors.InitialDeposit}</p>}
          </div>

          <div className="buttons">
            <button type="button" className="btn cancel" onClick={resetForm}>
              ✖️ Cancel
            </button>
            <button type="submit" className="btn create" disabled={isLoading}>
              {isLoading ? "⏳ Creating..." : "🚀 Create Account"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
