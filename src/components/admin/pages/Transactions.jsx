import React, { useState } from "react";
import {
  deposit,
  withdraw,
  transfer,
  getAllTransactions,
  getTransactionById,
  getTransactionsByAccountId,
  getPagedTransactions,
} from "../../../services/transaction.Service";

import "./Transaction.css";

export default function Transactions() {
  // Deposit, Withdraw, Transfer state
  const [depositData, setDepositData] = useState({ AccountId: "", Amount: "", Remarks: "" });
  const [withdrawData, setWithdrawData] = useState({
    AccountId: "",
    TransactionType: "2",
    Amount: "",
    TargetAccountNumber: "",
    Remarks: "",
  });
  const [transferData, setTransferData] = useState({ FromAccountId: "", ToAccountId: "", Amount: "", Remarks: "" });

  // Transaction fetch states
  const [allTransactions, setAllTransactions] = useState([]);
  const [transaction, setTransaction] = useState(null);
  const [accountTransactions, setAccountTransactions] = useState([]);
  const [inputId, setInputId] = useState("");
  const [accountId, setAccountId] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Deposit
  const handleDeposit = async () => {
    try {
      const res = await deposit(depositData);
      alert("Deposit Successful!");
      console.log(res.data);
    } catch (err) {
      alert("Deposit Failed!");
      console.error(err);
    }
  };

  // Withdraw
  const handleWithdraw = async () => {
    try {
      const res = await withdraw(withdrawData);
      alert("Withdraw Successful!");
      console.log(res.data);
    } catch (err) {
      alert("Withdraw Failed!");
      console.error(err);
    }
  };

  // Transfer
  const handleTransfer = async () => {
    try {
      const res = await transfer(transferData);
      alert("Transfer Successful!");
      console.log(res.data);
    } catch (err) {
      alert("Transfer Failed!");
      console.error(err);
    }
  };

  // Get All Transactions
  const handleGetAll = async () => {
    try {
      const res = await getAllTransactions();
      setAllTransactions(res.data.$values || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch all transactions!");
    }
  };

  // Get Transaction by ID
  const handleGetById = async () => {
    if (!inputId) return alert("Enter Transaction ID");
    try {
      const res = await getTransactionById(inputId);
      setTransaction(res.data);
    } catch (err) {
      console.error(err);
      alert("Transaction not found!");
    }
  };

  // Get Transactions by Account ID
  const handleGetByAccount = async () => {
    if (!accountId) return alert("Enter Account ID");
    try {
      const res = await getTransactionsByAccountId(accountId);
      setAccountTransactions(res.data.$values || []);
    } catch (err) {
      console.error(err);
      alert("No transactions found for this account!");
    }
  };

  // Get Paged Transactions
  const handleGetPaged = async () => {
    try {
      const res = await getPagedTransactions(pageNumber, pageSize);
      setAllTransactions(res.data.$values || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch paged transactions!");
    }
  };

  // Reusable Table Component
  const TransactionTable = ({ data, title }) => (
    <div className="table-section">
      <h4>{title}</h4>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>From Account</th>
            <th>To Account</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Remarks</th>
            <th>Date</th>
            <th>Balance After</th>
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
              <td>{t.BalanceAfterTransaction}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="main-content">
      <h2>Transactions</h2>

      {/* Deposit Section */}
      <div className="form-section">
        <h3>Deposit</h3>
        <input type="number" placeholder="AccountId"
          value={depositData.AccountId}
          onChange={(e) => setDepositData({ ...depositData, AccountId: e.target.value })}
        />
        <input type="number" placeholder="Amount"
          value={depositData.Amount}
          onChange={(e) => setDepositData({ ...depositData, Amount: e.target.value })}
        />
        <input type="text" placeholder="Remarks"
          value={depositData.Remarks}
          onChange={(e) => setDepositData({ ...depositData, Remarks: e.target.value })}
        />
        <button onClick={handleDeposit}>Deposit</button>
      </div>

      <hr />

      {/* Withdraw Section */}
      <div className="form-section">
        <h3>Withdraw</h3>
        <input type="number" placeholder="AccountId"
          value={withdrawData.AccountId}
          onChange={(e) => setWithdrawData({ ...withdrawData, AccountId: e.target.value })}
        />
        <input type="number" placeholder="Amount"
          value={withdrawData.Amount}
          onChange={(e) => setWithdrawData({ ...withdrawData, Amount: e.target.value })}
        />
        <input type="number" placeholder="Target Account Number"
          value={withdrawData.TargetAccountNumber}
          onChange={(e) => setWithdrawData({ ...withdrawData, TargetAccountNumber: e.target.value })}
        />
        <input type="text" placeholder="Remarks"
          value={withdrawData.Remarks}
          onChange={(e) => setWithdrawData({ ...withdrawData, Remarks: e.target.value })}
        />
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>

      <hr />

      {/* Transfer Section */}
      <div className="form-section">
        <h3>Transfer</h3>
        <input type="number" placeholder="From AccountId"
          value={transferData.FromAccountId}
          onChange={(e) => setTransferData({ ...transferData, FromAccountId: e.target.value })}
        />
        <input type="number" placeholder="To AccountId"
          value={transferData.ToAccountId}
          onChange={(e) => setTransferData({ ...transferData, ToAccountId: e.target.value })}
        />
        <input type="number" placeholder="Amount"
          value={transferData.Amount}
          onChange={(e) => setTransferData({ ...transferData, Amount: e.target.value })}
        />
        <input type="text" placeholder="Remarks"
          value={transferData.Remarks}
          onChange={(e) => setTransferData({ ...transferData, Remarks: e.target.value })}
        />
        <button onClick={handleTransfer}>Transfer</button>
      </div>

      <hr />

      {/* Fetch Section */}
      <div className="form-section">
        <h3>Fetch Transactions</h3>

        {/* Get All */}
        <div className="fetch-section">
          <button onClick={handleGetAll}>Get All</button>
          {allTransactions.length > 0 && <TransactionTable data={allTransactions} title="Transactions List" />}
        </div>

        {/* Get by Transaction ID */}
        <div className="fetch-section">
          <input type="number" placeholder="Transaction ID" value={inputId} onChange={(e) => setInputId(e.target.value)} />
          <button onClick={handleGetById}>Get By Transaction ID</button>
          {transaction && <TransactionTable data={[transaction]} title="Transaction Detail" />}
        </div>

        {/* Get by Account ID */}
        <div className="fetch-section">
          <input type="number" placeholder="Account ID" value={accountId} onChange={(e) => setAccountId(e.target.value)} />
          <button onClick={handleGetByAccount}>Get By Account ID</button>
          {accountTransactions.length > 0 && <TransactionTable data={accountTransactions} title="Transactions List" />}
        </div>

        {/* Get Paged */}
        {/* <div className="fetch-section">
          <input type="number" placeholder="Page Number" value={pageNumber} onChange={(e) => setPageNumber(e.target.value)} />
          <input type="number" placeholder="Page Size" value={pageSize} onChange={(e) => setPageSize(e.target.value)} />
          <button onClick={handleGetPaged}>Get Paged</button>
          {allTransactions.length > 0 && <TransactionTable data={allTransactions} title="Paged Transactions" />}
        </div> */}
      </div>
    </div>
  );
}
