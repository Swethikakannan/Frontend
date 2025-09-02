import React, { useState, useEffect } from "react";
import * as AuditService from "../../../services/auditlog.service";
import "./AuditLog.css";

export default function AuditLog() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");
  const [showList, setShowList] = useState(false);

  const extractData = (data) => {
    if (!data) return [];
    if (data.$values) return data.$values;
    if (Array.isArray(data)) return data;
    return [data];
  };

  const fetchAll = async () => {
    const userRole = sessionStorage.getItem("role");

    if (userRole !== "Admin") {
      alert("❌ Only Admin can access Audit Logs!");
      return;
    }

    try {
      const res = await AuditService.getAllLogs();
      const normalized = extractData(res.data);
      setLogs(normalized);
      setShowList(true);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch audit logs");
      setLogs([]);
      setShowList(false);
    }
  };

  useEffect(() => {
    // Optionally, auto-fetch only if Admin
    const userRole = sessionStorage.getItem("role");
    if (userRole === "Admin") fetchAll();
  }, []);

  return (
    <div className="main-content">
      <h2>📝Audit Logs</h2>
      <button onClick={fetchAll}>🗒️Show All Logs</button>
      {error && <p className="error">{error}</p>}

      {showList && logs.length > 0 && (
        <table className="customer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Username</th>
              <th>Action</th>
              <th>Details</th>
              {/* <th>Timestamp</th> */}
            </tr>
          </thead>
          <tbody>
            {logs.map((l) => (
              <tr key={l.AuditId}>
                <td>{l.AuditId}</td>
                <td>{l.UserId}</td>
                <td>{l.Username}</td>
                <td>{l.Action}</td>
                <td>{l.Details}</td>
                {/* <td>{l.LogTimestamp || "-"}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showList && logs.length === 0 && <p>No audit logs found.</p>}
    </div>
  );
}
