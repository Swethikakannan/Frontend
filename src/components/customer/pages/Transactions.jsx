import React, { useState } from "react";
import { deposit, withdraw, transfer } from "../services/transactionService";
import "./Transactions.css";

export default function CustomerTransactions() {
  const [depositForm, setDepositForm] = useState({});
  const [withdrawForm, setWithdrawForm] = useState({});
  const [transferForm, setTransferForm] = useState({});
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState("");

  const resetAllForms = () => {
    setDepositForm({});
    setWithdrawForm({});
    setTransferForm({});
    setError("");
  };

  // Generic handle change
  const handleChange = (e, formSetter) => {
    formSetter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Deposit
  const handleDeposit = async () => {
    if (!depositForm.AccountId || !depositForm.Amount) {
      setError("Account ID and Amount are required");
      return;
    }
    try {
      const res = await deposit({
        AccountId: parseInt(depositForm.AccountId),
        Amount: parseFloat(depositForm.Amount),
        Remarks: depositForm.Remarks || "",
      });
      setSuccess(res.data);
      resetAllForms();
    } catch (err) {
      console.error(err);
      setError("Deposit failed. Please try again.");
    }
  };

  // Withdraw
  const handleWithdraw = async () => {
    if (!withdrawForm.AccountId || !withdrawForm.Amount) {
      setError("Account ID and Amount are required");
      return;
    }
    try {
      const res = await withdraw({
        AccountId: parseInt(withdrawForm.AccountId),
        TransactionType: "2",
        Amount: parseFloat(withdrawForm.Amount),
        TargetAccountNumber: withdrawForm.TargetAccountNumber
          ? parseInt(withdrawForm.TargetAccountNumber)
          : null,
        Remarks: withdrawForm.Remarks || "",
      });
      setSuccess(res.data);
      resetAllForms();
    } catch (err) {
      console.error(err);
      setError("Withdrawal failed. Please try again.");
    }
  };

  // Transfer
  const handleTransfer = async () => {
    if (!transferForm.FromAccountId || !transferForm.ToAccountId || !transferForm.Amount) {
      setError("From Account, To Account and Amount are required");
      return;
    }
    try {
      const res = await transfer({
        FromAccountId: parseInt(transferForm.FromAccountId),
        ToAccountId: parseInt(transferForm.ToAccountId),
        Amount: parseFloat(transferForm.Amount),
        Remarks: transferForm.Remarks || "",
      });
      setSuccess(res.data);
      resetAllForms();
    } catch (err) {
      console.error(err);
      setError("Transfer failed. Please try again.");
    }
  };

  return (
    <div className="customer-transactions">
      <h2>💳 Banking Transactions</h2>

      {error && <p className="error">❌ {error}</p>}

      {success && (
        <div className="success-card">
          <h3>✅ Transaction Successful</h3>
          <p><b>Transaction ID:</b> {success.TransactionId}</p>
          <p><b>From Account:</b> {success.FromAccountNumber || "N/A"}</p>
          <p><b>To Account:</b> {success.ToAccountNumber || "N/A"}</p>
          <p><b>Transaction Type:</b> {success.TransactionType}</p>
          <p><b>Amount:</b> ₹{success.Amount}</p>
          <p><b>Remarks:</b> {success.Remarks || "No remarks"}</p>
          <p><b>Date & Time:</b> {new Date(success.TransactionDate).toLocaleString()}</p>
          <p><b>Balance After:</b> ₹{success.BalanceAfterTransaction}</p>
          <button onClick={() => setSuccess(null)}>Continue Banking</button>
        </div>
      )}

      {!success && (
        <div className="transaction-forms-container">

          {/* Deposit Form */}
          <div className="transaction-form">
            <h3>💰 Deposit Money</h3>
            <input
              type="number"
              name="AccountId"
              placeholder="Account ID"
              value={depositForm.AccountId || ""}
              onChange={(e) => handleChange(e, setDepositForm)}
            />
            <input
              type="number"
              name="Amount"
              placeholder="Amount (₹)"
              value={depositForm.Amount || ""}
              onChange={(e) => handleChange(e, setDepositForm)}
              min="1"
              step="0.01"
            />
            <input
              type="text"
              name="Remarks"
              placeholder="Remarks (Optional)"
              value={depositForm.Remarks || ""}
              onChange={(e) => handleChange(e, setDepositForm)}
            />
            <button onClick={handleDeposit}>💰 Deposit Now</button>
          </div>

          {/* Withdraw Form */}
          <div className="transaction-form">
            <h3>💸 Withdraw Money</h3>
            <input
              type="number"
              name="AccountId"
              placeholder="Account ID"
              value={withdrawForm.AccountId || ""}
              onChange={(e) => handleChange(e, setWithdrawForm)}
            />
            <input
              type="number"
              name="Amount"
              placeholder="Amount (₹)"
              value={withdrawForm.Amount || ""}
              onChange={(e) => handleChange(e, setWithdrawForm)}
              min="1"
              step="0.01"
            />
            <input
              type="number"
              name="TargetAccountNumber"
              placeholder="Target Account (Optional)"
              value={withdrawForm.TargetAccountNumber || ""}
              onChange={(e) => handleChange(e, setWithdrawForm)}
            />
            <input
              type="text"
              name="Remarks"
              placeholder="Remarks (Optional)"
              value={withdrawForm.Remarks || ""}
              onChange={(e) => handleChange(e, setWithdrawForm)}
            />
            <button onClick={handleWithdraw}>💸 Withdraw Now</button>
          </div>

          {/* Transfer Form */}
          <div className="transaction-form">
            <h3>🔄 Transfer Money</h3>
            <input
              type="number"
              name="FromAccountId"
              placeholder="From Account ID"
              value={transferForm.FromAccountId || ""}
              onChange={(e) => handleChange(e, setTransferForm)}
            />
            <input
              type="number"
              name="ToAccountId"
              placeholder="To Account ID"
              value={transferForm.ToAccountId || ""}
              onChange={(e) => handleChange(e, setTransferForm)}
            />
            <input
              type="number"
              name="Amount"
              placeholder="Amount (₹)"
              value={transferForm.Amount || ""}
              onChange={(e) => handleChange(e, setTransferForm)}
              min="1"
              step="0.01"
            />
            <input
              type="text"
              name="Remarks"
              placeholder="Remarks (Optional)"
              value={transferForm.Remarks || ""}
              onChange={(e) => handleChange(e, setTransferForm)}
            />
            <button onClick={handleTransfer}>🔄 Transfer Now</button>
          </div>

        </div>
      )}
    </div>
  );
}
