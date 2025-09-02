import React, { useState } from "react";
import {
  deposit,
  withdraw,
  transfer,
  getAllTransactions,
  getTransactionById,
  getTransactionsByAccountId,
} from "../../../services/transaction.Service";
import "./Transaction.css";

export default function Transactions() {
  const [depositData, setDepositData] = useState({ AccountId: "", Amount: "", Remarks: "" });
  const [withdrawData, setWithdrawData] = useState({ AccountId: "", Amount: "", TargetAccountNumber: "", Remarks: "" });
  const [transferData, setTransferData] = useState({ FromAccountId: "", ToAccountId: "", Amount: "", Remarks: "" });

  const [allTransactions, setAllTransactions] = useState([]);
  const [transaction, setTransaction] = useState(null);
  const [accountTransactions, setAccountTransactions] = useState([]);
  const [inputId, setInputId] = useState("");
  const [accountId, setAccountId] = useState("");
  const [error, setError] = useState("");

  // Normalize API response
  const normalizeData = (data) => {
    if (!data) return [];
    if (data.$values) return data.$values;
    if (Array.isArray(data)) return data;
    return [data];
  };

  const handleDeposit = async () => {
    try {
      await deposit({
        AccountId: parseInt(depositData.AccountId),
        Amount: parseFloat(depositData.Amount),
        Remarks: depositData.Remarks || "",
      });
      alert("✅ Deposit Successful");
      setDepositData({ AccountId: "", Amount: "", Remarks: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Deposit Failed");
    }
  };

  const handleWithdraw = async () => {
    try {
      await withdraw({
        AccountId: parseInt(withdrawData.AccountId),
        Amount: parseFloat(withdrawData.Amount),
        TargetAccountNumber: withdrawData.TargetAccountNumber
          ? parseInt(withdrawData.TargetAccountNumber)
          : null,
        Remarks: withdrawData.Remarks || "",
      });
      alert("✅ Withdrawal Successful");
      setWithdrawData({ AccountId: "", Amount: "", TargetAccountNumber: "", Remarks: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Withdrawal Failed");
    }
  };

  const handleTransfer = async () => {
    try {
      await transfer({
        FromAccountId: parseInt(transferData.FromAccountId),
        ToAccountId: parseInt(transferData.ToAccountId),
        Amount: parseFloat(transferData.Amount),
        Remarks: transferData.Remarks || "",
      });
      alert("✅ Transfer Successful");
      setTransferData({ FromAccountId: "", ToAccountId: "", Amount: "", Remarks: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Transfer Failed");
    }
  };

  const fetchAll = async () => {
    try {
      const res = await getAllTransactions();
      setAllTransactions(normalizeData(res.data));
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch transactions");
    }
  };

  const fetchById = async () => {
    if (!inputId) return alert("Enter Transaction ID");
    try {
      const res = await getTransactionById(inputId);
      setTransaction(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setTransaction(null);
      setError("Transaction not found");
    }
  };

  const fetchByAccount = async () => {
    if (!accountId) return alert("Enter Account ID");
    try {
      const res = await getTransactionsByAccountId(accountId);
      setAccountTransactions(normalizeData(res.data));
      setError("");
    } catch (err) {
      console.error(err);
      setAccountTransactions([]);
      setError("No transactions for this account");
    }
  };

  const TransactionTable = ({ data, title }) => (
    <div className="table-section">
      <h4>{title}</h4>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>From</th>
            <th>To</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Remarks</th>
            <th>Date</th>
            {/* <th>Balance After</th> */}
          </tr>
        </thead>
        <tbody>
          {data.map((t) => (
            <tr key={t.TransactionId}>
              <td>{t.TransactionId}</td>
              <td>{t.FromAccountNumber}</td>
              <td>{t.ToAccountNumber || "-"}</td>
              <td>{t.TransactionType}</td>
              <td>{t.Amount}</td>
              <td>{t.Remarks}</td>
              <td>{new Date(t.TransactionDate).toLocaleString()}</td>
              {/* <td>{t.BalanceAfterTransaction}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="main-content">
      <h2>🔄️Transactions</h2>
      {error && <p className="error">{error}</p>}

      {/* Deposit */}
      <div className="form-section">
        <h3>🪙Deposit</h3>
        <input placeholder="AccountId" value={depositData.AccountId} onChange={(e) => setDepositData({ ...depositData, AccountId: e.target.value })} />
        <input placeholder="Amount" value={depositData.Amount} onChange={(e) => setDepositData({ ...depositData, Amount: e.target.value })} />
        <input placeholder="Remarks" value={depositData.Remarks} onChange={(e) => setDepositData({ ...depositData, Remarks: e.target.value })} />
        <button onClick={handleDeposit}>Deposit</button>
      </div>

      {/* Withdraw */}
      <div className="form-section">
        <h3>🪙Withdraw</h3>
        <input placeholder="AccountId" value={withdrawData.AccountId} onChange={(e) => setWithdrawData({ ...withdrawData, AccountId: e.target.value })} />
        <input placeholder="Amount" value={withdrawData.Amount} onChange={(e) => setWithdrawData({ ...withdrawData, Amount: e.target.value })} />
        <input placeholder="Target Account" value={withdrawData.TargetAccountNumber} onChange={(e) => setWithdrawData({ ...withdrawData, TargetAccountNumber: e.target.value })} />
        <input placeholder="Remarks" value={withdrawData.Remarks} onChange={(e) => setWithdrawData({ ...withdrawData, Remarks: e.target.value })} />
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>

      {/* Transfer */}
      <div className="form-section">
        <h3>🪙Transfer</h3>
        <input placeholder="From Account" value={transferData.FromAccountId} onChange={(e) => setTransferData({ ...transferData, FromAccountId: e.target.value })} />
        <input placeholder="To Account" value={transferData.ToAccountId} onChange={(e) => setTransferData({ ...transferData, ToAccountId: e.target.value })} />
        <input placeholder="Amount" value={transferData.Amount} onChange={(e) => setTransferData({ ...transferData, Amount: e.target.value })} />
        <input placeholder="Remarks" value={transferData.Remarks} onChange={(e) => setTransferData({ ...transferData, Remarks: e.target.value })} />
        <button onClick={handleTransfer}>Transfer</button>
      </div>

      {/* Fetch */}
      <div className="form-section">
        <h3>🪙Fetch Transactions</h3>

        <div>
          <button onClick={fetchAll}>Get All</button>
          {allTransactions.length > 0 && <TransactionTable data={allTransactions} title="All Transactions" />}
        </div>

        <div>
          <input placeholder="Transaction ID" value={inputId} onChange={(e) => setInputId(e.target.value)} />
          <button onClick={fetchById}>Get By Transaction ID</button>
          {transaction && <TransactionTable data={[transaction]} title="Transaction Detail" />}
        </div>

        <div>
          <input placeholder="Account ID" value={accountId} onChange={(e) => setAccountId(e.target.value)} />
          <button onClick={fetchByAccount}>Get By Account ID</button>
          {accountTransactions.length > 0 && <TransactionTable data={accountTransactions} title="Transactions By Account" />}
        </div>
      </div>
    </div>
  );
}
