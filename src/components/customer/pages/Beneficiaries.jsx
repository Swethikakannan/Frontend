// src/components/customer/Beneficiary.jsx
import React, { useState } from "react";
import { addBeneficiary } from "../../../services/beneficiaryService";
import "./Accounts.css"; // ✅ reuse same style as Accounts

export default function Beneficiary() {
  const [formData, setFormData] = useState({
    CustomerId: "",
    BeneficiaryName: "",
    BeneficiaryAccountNumber: "",
    BankName: "",
    BranchId: "",
    IfscCode: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Validate form
  const validate = () => {
    let tempErrors = {};
    if (!formData.CustomerId) tempErrors.CustomerId = "Customer ID is required";
    if (!formData.BeneficiaryName) tempErrors.BeneficiaryName = "Beneficiary name is required";
    if (!formData.BeneficiaryAccountNumber) tempErrors.BeneficiaryAccountNumber = "Account number is required";
    if (!formData.BankName) tempErrors.BankName = "Bank name is required";
    if (!formData.BranchId) tempErrors.BranchId = "Branch ID is required";
    if (!formData.IfscCode) tempErrors.IfscCode = "IFSC code is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);

    try {
      const res = await addBeneficiary({
        ...formData,
        CustomerId: parseInt(formData.CustomerId),
        BranchId: parseInt(formData.BranchId),
      });

      setSuccess(res.data);
      setFormData({
        CustomerId: "",
        BeneficiaryName: "",
        BeneficiaryAccountNumber: "",
        BankName: "",
        BranchId: "",
        IfscCode: "",
      });
      setErrors({});
    } catch (err) {
      console.error(err);
      setErrors({ general: "Failed to add beneficiary. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      CustomerId: "",
      BeneficiaryName: "",
      BeneficiaryAccountNumber: "",
      BankName: "",
      BranchId: "",
      IfscCode: "",
    });
    setErrors({});
    setSuccess(null);
  };

  return (
    <div className="customer-accounts">
      <h2>👥 Add New Beneficiary</h2>

      {errors.general && <div className="error">❌ {errors.general}</div>}

      {/* ✅ Success Card */}
      {success && (
        <div className="success-card">
          <h3>✅ Beneficiary Added Successfully</h3>
          <p><b>Beneficiary Name:</b> {success.BeneficiaryName}</p>
          <p><b>Account Number:</b> {success.BeneficiaryAccountNumber}</p>
          <p><b>Bank:</b> {success.BankName}</p>
          <p><b>IFSC:</b> {success.IfscCode}</p>
          <p><b>Branch:</b> {success.BranchName}</p>
          <button onClick={() => setSuccess(null)}>Add Another</button>
        </div>
      )}

      {/* ✅ Beneficiary Form */}
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
            <input
              type="text"
              name="BeneficiaryName"
              placeholder="👥 Beneficiary Name  "
              value={formData.BeneficiaryName}
              onChange={handleChange}
            />
            {errors.BeneficiaryName && <p className="error">{errors.BeneficiaryName}</p>}
          </div>

          <div className="form-group">
            <input
              type="number"
              name="BeneficiaryAccountNumber"
              placeholder="🏦 Account Number"
              value={formData.BeneficiaryAccountNumber}
              onChange={handleChange}
            />
            {errors.BeneficiaryAccountNumber && <p className="error">{errors.BeneficiaryAccountNumber}</p>}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="BankName"
              placeholder="🏛️ Bank Name"
              value={formData.BankName}
              onChange={handleChange}
            />
            {errors.BankName && <p className="error">{errors.BankName}</p>}
          </div>

          <div className="form-group">
            <input
              type="number"
              name="BranchId"
              placeholder="🏢 Branch ID"
              value={formData.BranchId}
              onChange={handleChange}
            />
            {errors.BranchId && <p className="error">{errors.BranchId}</p>}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="IfscCode"
              placeholder="🔑 IFSC Code"
              value={formData.IfscCode}
              onChange={handleChange}
            />
            {errors.IfscCode && <p className="error">{errors.IfscCode}</p>}
          </div>

          <div className="buttons">
            <button type="button" className="btn cancel" onClick={resetForm}>
              ✖️ Cancel
            </button>
            <button type="submit" className="btn create" disabled={isLoading}>
              {isLoading ? "⏳ Adding..." : "🚀 Add Beneficiary"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
