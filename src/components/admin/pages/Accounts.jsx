import React, { useState } from "react";
import {
  createAccount,
  getAccountById,
  getAccountsByCustomerId,
  closeAccount,
} from "../../../services/accountService";
import "./Accounts.css";

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [singleAccount, setSingleAccount] = useState(null);
  const [error, setError] = useState("");
  const [showList, setShowList] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [customerId, setCustomerId] = useState("");

  const [newAccount, setNewAccount] = useState({
    customerId: "",
    accountTypeId: "",
    branchId: "",
    initialDeposit: "",
  });

  // ✅ Normalize API response
  const normalizeAccount = (a) => ({
    accountId: a.AccountId,
    accountNumber: a.AccountNumber,
    balance: a.Balance,
    accountTypeName: a.AccountTypeName,
    branchName: a.BranchName,
    status: a.Status,
  });

  const extractData = (data) => {
    if (!data) return [];
    if (data.$values) return data.$values.map(normalizeAccount);
    if (Array.isArray(data)) return data.map(normalizeAccount);
    return [normalizeAccount(data)];
  };

  // ✅ Fetch by accountId
  const fetchById = async () => {
    if (!accountId) return alert("Enter Account ID");
    try {
      const res = await getAccountById(accountId);
      const normalized = extractData(res.data);
      setSingleAccount(normalized[0] || null);
      setError("");
    } catch (err) {
      console.error("❌ Error fetching account:", err);
      setError("Account not found");
      setSingleAccount(null);
    }
  };

  // ✅ Fetch by customerId
  const fetchByCustomer = async () => {
    if (!customerId) return alert("Enter Customer ID");
    try {
      const res = await getAccountsByCustomerId(customerId);
      const normalized = extractData(res.data);
      setAccounts(normalized);
      setShowList(true);
      setError("");
    } catch (err) {
      console.error("❌ Error fetching accounts:", err);
      setError("No accounts found");
      setAccounts([]);
      setShowList(false);
    }
  };

  // ✅ Create new account
  const addAccount = async () => {
    try {
      await createAccount(newAccount);
      alert("✅ Account created!");
      fetchByCustomer(); // refresh
      setNewAccount({
        customerId: "",
        accountTypeId: "",
        branchId: "",
        initialDeposit: "",
      });
    } catch (err) {
      console.error("❌ Error creating account:", err);
      setError("Failed to create account");
    }
  };

  // ✅ Close account
  const handleClose = async (id) => {
    if (!window.confirm("Are you sure you want to close this account?")) return;
    try {
      await closeAccount(id);
      alert("✅ Account closed!");
      fetchByCustomer();
      if (singleAccount && singleAccount.accountId === id) setSingleAccount(null);
    } catch (err) {
      console.error("❌ Error closing account:", err);
      setError("Failed to close account");
    }
  };

  return (
    <div className="main-content">
      <h2>Account Management</h2>
      {error && <p className="error">{error}</p>}

      {/* Show Accounts by Customer */}
      <div className="form-section">
        <h3>Find Accounts by Customer</h3>
        <input
          type="text"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <button onClick={fetchByCustomer}>Fetch Accounts</button>

        {showList && (
          <>
            {accounts.length === 0 ? (
              <p>No accounts found.</p>
            ) : (
              <table className="account-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Number</th>
                    <th>Balance</th>
                    <th>Type</th>
                    <th>Branch</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((a) => (
                    <tr key={a.accountId}>
                      <td>{a.accountId}</td>
                      <td>{a.accountNumber}</td>
                      <td>{a.balance}</td>
                      <td>{a.accountTypeName}</td>
                      <td>{a.branchName}</td>
                      <td>{a.status}</td>
                      <td>
                        {a.status !== "Closed" && (
                          <button
                            className="delete-btn"
                            onClick={() => handleClose(a.accountId)}
                          >
                            Close
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>

      {/* Show Account by ID */}
      <div className="form-section">
        <h3>Find Account by ID</h3>
        <input
          type="text"
          placeholder="Account ID"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
        />
        <button onClick={fetchById}>Fetch</button>

        {singleAccount && (
          <table className="account-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Number</th>
                <th>Balance</th>
                <th>Type</th>
                <th>Branch</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr key={singleAccount.accountId}>
                <td>{singleAccount.accountId}</td>
                <td>{singleAccount.accountNumber}</td>
                <td>{singleAccount.balance}</td>
                <td>{singleAccount.accountTypeName}</td>
                <td>{singleAccount.branchName}</td>
                <td>{singleAccount.status}</td>
                <td>
                  {singleAccount.status !== "Closed" && (
                    <button
                      className="delete-btn"
                      onClick={() => handleClose(singleAccount.accountId)}
                    >
                      Close
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      {/* Create Account */}
      <div className="form-section">
        <h3>Create Account</h3>
        {Object.keys(newAccount).map((key) => (
          <input
            key={key}
            type="text"
            placeholder={key}
            value={newAccount[key]}
            onChange={(e) =>
              setNewAccount({ ...newAccount, [key]: e.target.value })
            }
          />
        ))}
        <button onClick={addAccount}>Create</button>
      </div>
    </div>
  );
}
