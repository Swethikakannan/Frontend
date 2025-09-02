

// // src/pages/CustomerDashboard.jsx
// import React, { useState, useEffect } from "react";
// import CustomerDashboardService from "../services/CustomerDashboardService";

// export default function CustomerDashboard() {
//   const [active, setActive] = useState(""); // active card
//   const [data, setData] = useState(null);   // data for the active card
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch data when card changes
//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       setError("");
//       try {
//         let res;
//         switch (active) {
//           case "accounts":
//             res = await CustomerDashboardService.getAccounts();
//             setData(res.data?.$values || []);
//             break;
//           case "transactions":
//             res = await CustomerDashboardService.getTransactions();
//             setData(res.data?.$values || []); // ✅ use $values from response
//             break;
//           case "beneficiaries":
//             res = await CustomerDashboardService.getBeneficiaries();
//             setData(res.data?.$values || []);
//             break;
//           case "profile":
//             res = await CustomerDashboardService.getProfile();
//             setData(res.data || {});
//             break;
//           case "loans":
//             setData([]);
//             break;
//           default:
//             setData(null);
//         }
//       } catch (err) {
//         console.error(err);
//         setError("❌ Failed to fetch data");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (active) fetchData();
//   }, [active]);

//   // Helper to render vertical key-value table
//   const renderTable = (item) => (
//     <table className="profile-table">
//       <tbody>
//         {Object.entries(item).map(([key, value]) => (
//           <tr key={key}>
//             <td><b>{key.replace(/([A-Z])/g, " $1").trim()}:</b></td>
//             <td>{value !== null && value !== undefined ? value.toString() : "N/A"}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );

//   return (
//     <div className="dashboard">
//       <h1 className="dashboard-title">
//         Welcome, {sessionStorage.getItem("username")}!
//       </h1>

//       {/* Stat cards */}
//       <div className="stats-grid">
//         <div className="stat-card" onClick={() => setActive("accounts")}>
//           Accounts Overview
//         </div>
//         <div className="stat-card" onClick={() => setActive("transactions")}>
//           Recent Transactions
//         </div>
//         <div className="stat-card" onClick={() => setActive("beneficiaries")}>
//           Beneficiaries
//         </div>
//         <div className="stat-card" onClick={() => setActive("loans")}>
//           Loan Details
//         </div>
//         <div className="stat-card" onClick={() => setActive("profile")}>
//           Profile Settings
//         </div>
//       </div>

//       {/* Dashboard content */}
//       <div className="dashboard-content">
//         {isLoading && <p>⏳ Loading...</p>}
//         {error && <p className="error">{error}</p>}
//         {!active && <p style={{ textAlign: "center", marginTop: "2rem" }}>Click any card above to view details.</p>}

//         {/* Accounts */}
//         {active === "accounts" && Array.isArray(data) && data.length > 0 &&
//           data.map((acc) => (
//             <div key={acc.AccountId} className="profile-details">
//               {renderTable({
//                 "Account Number": acc.AccountNumber,
//                 "Type": acc.AccountTypeName,
//                 "Balance": `₹${acc.Balance}`,
//                 "Branch": acc.BranchName,
//                 "Status": acc.Status,
//                 "Created At": new Date(acc.CreatedAt).toLocaleString()
//               })}
//             </div>
//           ))
//         }

//         {/* Transactions */}
//         {active === "transactions" && Array.isArray(data) && data.length > 0 &&
//           data.map((tx) => (
//             <div key={tx.TransactionId} className="profile-details">
//               {renderTable({
//                 "From Account": tx.FromAccountNumber,
//                 "To Account": tx.ToAccountNumber || "N/A",
//                 "Type": tx.TransactionType,
//                 "Amount": `₹${tx.Amount}`,
//                 "Balance After": `₹${tx.BalanceAfterTransaction}`,
//                 "Remarks": tx.Remarks,
//                 "Date": new Date(tx.TransactionDate).toLocaleString()
//               })}
//             </div>
//           ))
//         }

//         {/* Beneficiaries */}
//         {active === "beneficiaries" && Array.isArray(data) && data.length > 0 &&
//           data.map((b) => (
//             <div key={b.BeneficiaryId} className="profile-details">
//               {renderTable({
//                 "Name": b.BeneficiaryName,
//                 "Account Number": b.BeneficiaryAccountNumber,
//                 "Bank": b.BankName,
//                 "IFSC": b.IfscCode,
//                 "Branch": b.BranchName,
//                 "Added Date": new Date(b.AddedDate).toLocaleString()
//               })}
//             </div>
//           ))
//         }

//         {/* Profile */}
//         {active === "profile" && data && typeof data === "object" &&
//           <div className="profile-details">
//             {renderTable({
//               "Full Name": data.FullName,
//               "Phone": data.PhoneNumber,
//               "DOB": data.Dob ? new Date(data.Dob).toLocaleDateString() : "N/A",
//               "Aadhar": data.AadharNumber,
//               "PAN": data.PanNumber,
//               "Address": data.Address ? `${data.Address}, ${data.City}, ${data.State}` : "N/A",
//               "Gender": data.Gender?.Gender || "Not Specified"
//             })}
//           </div>
//         }

//         {/* Loans */}
//         {active === "loans" && <p>Loan Details will be added here.</p>}

//         {/* No data */}
//         {active && !isLoading && Array.isArray(data) && data.length === 0 && <p>No data available.</p>}
//       </div>
//     </div>
//   );
// }

// src/pages/CustomerDashboard.jsx
import React, { useState, useEffect } from "react";
import CustomerDashboardService from "../services/CustomerDashboardService";

export default function CustomerDashboard() {
  const [active, setActive] = useState(""); 
  const [data, setData] = useState(null);   
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError("");
      try {
        let res;
        switch (active) {
          case "accounts":
            res = await CustomerDashboardService.getAccounts();
            setData(res.data?.$values || []);
            break;
          case "transactions":
            res = await CustomerDashboardService.getTransactions();
            setData(res.data?.$values || []);
            break;
          case "beneficiaries":
            res = await CustomerDashboardService.getBeneficiaries();
            setData(res.data?.$values || []);
            break;
          case "profile":
            res = await CustomerDashboardService.getProfile();
            setData(res.data || {});
            break;
          case "loans":
            res = await CustomerDashboardService.getLoans(); // ✅ fetch loans
            setData(res.data?.$values || []);
            break;
          default:
            setData(null);
        }
      } catch (err) {
        console.error(err);
        setError("❌ Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    if (active) fetchData();
  }, [active]);

  const renderTable = (item) => (
    <table className="profile-table">
      <tbody>
        {Object.entries(item).map(([key, value]) => (
          <tr key={key}>
            <td><b>{key.replace(/([A-Z])/g, " $1").trim()}:</b></td>
            <td>{value !== null && value !== undefined ? value.toString() : "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">
        Welcome, {sessionStorage.getItem("username")}!
      </h1>

      <div className="stats-grid">
        <div className="stat-card" onClick={() => setActive("accounts")}>Accounts Overview</div>
        <div className="stat-card" onClick={() => setActive("transactions")}>Recent Transactions</div>
        <div className="stat-card" onClick={() => setActive("beneficiaries")}>Beneficiaries</div>
        <div className="stat-card" onClick={() => setActive("loans")}>Loan Details</div>
        <div className="stat-card" onClick={() => setActive("profile")}>Profile Settings</div>
      </div>

      <div className="dashboard-content">
        {isLoading && <p>⏳ Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!active && <p style={{ textAlign: "center", marginTop: "2rem" }}>Click any card above to view details.</p>}

        {/* Accounts */}
        {active === "accounts" && Array.isArray(data) && data.length > 0 &&
          data.map((acc) => (
            <div key={acc.AccountId} className="profile-details">
              {renderTable({
                "Account Number": acc.AccountNumber,
                "Type": acc.AccountTypeName,
                "Balance": `₹${acc.Balance}`,
                "Branch": acc.BranchName,
                "Status": acc.Status,
                "Created At": new Date(acc.CreatedAt).toLocaleString()
              })}
            </div>
          ))
        }

        {/* Transactions */}
        {active === "transactions" && Array.isArray(data) && data.length > 0 &&
          data.map((tx) => (
            <div key={tx.TransactionId} className="profile-details">
              {renderTable({
                "From Account": tx.FromAccountNumber,
                "To Account": tx.ToAccountNumber || "N/A",
                "Type": tx.TransactionType,
                "Amount": `₹${tx.Amount}`,
                "Balance After": `₹${tx.BalanceAfterTransaction}`,
                "Remarks": tx.Remarks,
                "Date": new Date(tx.TransactionDate).toLocaleString()
              })}
            </div>
          ))
        }

        {/* Beneficiaries */}
        {active === "beneficiaries" && Array.isArray(data) && data.length > 0 &&
          data.map((b) => (
            <div key={b.BeneficiaryId} className="profile-details">
              {renderTable({
                "Name": b.BeneficiaryName,
                "Account Number": b.BeneficiaryAccountNumber,
                "Bank": b.BankName,
                "IFSC": b.IfscCode,
                "Branch": b.BranchName,
                "Added Date": new Date(b.AddedDate).toLocaleString()
              })}
            </div>
          ))
        }

        {/* Loans */}
        {active === "loans" && Array.isArray(data) && data.length > 0 &&
          data.map((loan) => (
            <div key={loan.LoanAppId} className="profile-details">
              {renderTable({
                "Customer Name": loan.CustomerName,
                "Loan Type": loan.LoanTypeName,
                "Applied Amount": `₹${loan.AppliedAmount}`,
                "Tenure (Months)": loan.TenureMonths,
                "Purpose": loan.Purpose,
                "Status": loan.Status,
                "Applied Date": new Date(loan.AppliedDate).toLocaleString()
              })}
            </div>
          ))
        }

        {/* Profile */}
        {active === "profile" && data && typeof data === "object" &&
          <div className="profile-details">
            {renderTable({
              "Full Name": data.FullName,
              "Phone": data.PhoneNumber,
              "DOB": data.Dob ? new Date(data.Dob).toLocaleDateString() : "N/A",
              "Aadhar": data.AadharNumber,
              "PAN": data.PanNumber,
              "Address": data.Address ? `${data.Address}, ${data.City}, ${data.State}` : "N/A",
              "Gender": data.Gender?.Gender || "Not Specified"
            })}
          </div>
        }

        {!isLoading && active && Array.isArray(data) && data.length === 0 && <p>No data available.</p>}
      </div>
    </div>
  );
}
