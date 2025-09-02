
// import React, { useState } from "react";
// import * as CustomerService from "../../../services/customers.service";
// import "./Customers.css";

// export default function Customers() {
//   const [customers, setCustomers] = useState([]);
//   const [singleCustomer, setSingleCustomer] = useState(null);
//   const [error, setError] = useState("");
//   const [showList, setShowList] = useState(false);
//   const [customerId, setCustomerId] = useState("");

//   const [newCustomer, setNewCustomer] = useState({
//     UserId: "",
//     FullName: "",
//     GenderId: "",
//     dob: "",
//     phoneNumber: "",
//     aadharNumber: "",
//     panNumber: "",
//     address: "",
//     city: "",
//     state: "",
//   });

//   const [updateData, setUpdateData] = useState({
//     phoneNumber: "",
//     city: "",
//     state: "",
//   });

//   const normalizeCustomer = (c) => ({
//     customerId: c.CustomerId,
//     userId: c.UserId,
//     fullName: c.FullName,
//     genderId: c.GenderId,
//     dob: c.Dob,
//     phoneNumber: c.PhoneNumber,
//     aadharNumber: c.AadharNumber,
//     panNumber: c.PanNumber,
//     address: c.Address,
//     city: c.City,
//     state: c.State,
//     age: c.Age,
//   });

//   const extractData = (data) => {
//     if (!data) return [];
//     if (data.$values) return data.$values.map(normalizeCustomer);
//     if (Array.isArray(data)) return data.map(normalizeCustomer);
//     return [normalizeCustomer(data)];
//   };

//   const fetchAll = async () => {
//     try {
//       const res = await CustomerService.getAllCustomers();
//       const normalized = extractData(res.data);
//       setCustomers(normalized);
//       setShowList(true);
//       setError("");
//     } catch (err) {
//       console.error("❌ Error fetching customers:", err);
//       setError("Failed to fetch customers");
//       setCustomers([]);
//       setShowList(false);
//     }
//   };

//   const fetchById = async () => {
//     if (!customerId) return alert("Enter Customer ID");
//     try {
//       const res = await CustomerService.getCustomerById(customerId);
//       const normalized = extractData(res.data);
//       setSingleCustomer(normalized[0] || null);
//       setError("");
//     } catch (err) {
//       console.error("❌ Error fetching customer:", err);
//       setError("Customer not found");
//       setSingleCustomer(null);
//     }
//   };

//   const addCustomer = async () => {
//     try {
//       await CustomerService.addCustomer(newCustomer);
//       alert("✅ Customer added successfully!");
//       fetchAll();
//       setNewCustomer({
//         userId: "",
//         fullName: "",
//         genderId: "",
//         dob: "",
//         phoneNumber: "",
//         aadharNumber: "",
//         panNumber: "",
//         address: "",
//         city: "",
//         state: "",
//       });
//     } catch (err) {
//       console.error("❌ Error adding customer:", err);
//       setError("Failed to add customer");
//     }
//   };

//   const updateCustomer = async () => {
//     if (!customerId) return alert("Enter Customer ID to update");
//     try {
//       await CustomerService.updateCustomer(customerId, updateData);
//       alert("✅ Customer updated successfully!");
//       fetchAll();
//     } catch (err) {
//       console.error("❌ Error updating customer:", err);
//       setError("Failed to update customer");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this customer?")) return;
//     try {
//       await CustomerService.deleteCustomer(id);
//       alert("✅ Customer deleted!");
//       fetchAll();
//       if (singleCustomer && singleCustomer.customerId === id) setSingleCustomer(null);
//     } catch (err) {
//       console.error("❌ Failed to delete customer:", err);
//       setError("Failed to delete customer");
//     }
//   };

//   return (
//     <div className="main-content">
//       <h2>Customer Management</h2>

//       <button onClick={fetchAll}>Show All Customers</button>
//       {error && <p className="error">{error}</p>}

//       {showList && (
//         <div className="form-section">
//           <h3>All Customers</h3>
//           {customers.length === 0 ? (
//             <p>No customers found.</p>
//           ) : (
//             <table className="customer-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Phone</th>
//                   <th>City</th>
//                   <th>State</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {customers.map((c) => (
//                   <tr key={c.customerId}>
//                     <td>{c.customerId}</td>
//                     <td>{c.fullName}</td>
//                     <td>{c.phoneNumber}</td>
//                     <td>{c.city}</td>
//                     <td>{c.state}</td>
//                     <td>
//                       <button className="delete-btn" onClick={() => handleDelete(c.customerId)}>
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}

//       {/* Add Customer Form */}
//       <div className="form-section">
//         <h3>Add Customer</h3>
//         {Object.keys(newCustomer).map((key) => (
//           <input
//             key={key}
//             type="text"
//             placeholder={key}
//             value={newCustomer[key]}
//             onChange={(e) => setNewCustomer({ ...newCustomer, [key]: e.target.value })}
//           />
//         ))}
//         <button onClick={addCustomer}>Add</button>
//       </div>

//       {/* Update Customer Form */}
//       <div className="form-section">
//         <h3>Update Customer</h3>
//         <input
//           type="text"
//           placeholder="Customer ID"
//           value={customerId}
//           onChange={(e) => setCustomerId(e.target.value)}
//         />
//         {Object.keys(updateData).map((key) => (
//           <input
//             key={key}
//             type="text"
//             placeholder={key}
//             value={updateData[key]}
//             onChange={(e) => setUpdateData({ ...updateData, [key]: e.target.value })}
//           />
//         ))}
//         <button onClick={updateCustomer}>Update</button>
//       </div>

//       {/* Fetch Single Customer */}
//       <div className="form-section">
//         <h3>Get Customer By ID</h3>
//         <input
//           type="text"
//           placeholder="Customer ID"
//           value={customerId}
//           onChange={(e) => setCustomerId(e.target.value)}
//         />
//         <button onClick={fetchById}>Fetch</button>

//         {singleCustomer && (
//           <table className="customer-table">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Phone</th>
//                 <th>City</th>
//                 <th>State</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr key={singleCustomer.customerId}>
//                 <td>{singleCustomer.customerId}</td>
//                 <td>{singleCustomer.fullName}</td>
//                 <td>{singleCustomer.phoneNumber}</td>
//                 <td>{singleCustomer.city}</td>
//                 <td>{singleCustomer.state}</td>
//                 <td>
//                   <button className="delete-btn" onClick={() => handleDelete(singleCustomer.customerId)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import * as CustomerService from "../../../services/customers.service";
import "./Customers.css";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [singleCustomer, setSingleCustomer] = useState(null);
  const [error, setError] = useState("");
  const [showList, setShowList] = useState(false);
  const [customerId, setCustomerId] = useState("");

  const [newCustomer, setNewCustomer] = useState({
    UserId: "",
    FullName: "",
    GenderId: "",
    dob: "",
    phoneNumber: "",
    aadharNumber: "",
    panNumber: "",
    address: "",
    city: "",
    state: "",
  });

  const [updateData, setUpdateData] = useState({
    phoneNumber: "",
    city: "",
    state: "",
  });

  const normalizeCustomer = (c) => ({
    customerId: c.CustomerId,
    userId: c.UserId,
    fullName: c.FullName,
    genderId: c.GenderId,
    dob: c.Dob,
    phoneNumber: c.PhoneNumber,
    aadharNumber: c.AadharNumber,
    panNumber: c.PanNumber,
    address: c.Address,
    city: c.City,
    state: c.State,
    age: c.Age,
  });

  const extractData = (data) => {
    if (!data) return [];
    if (data.$values) return data.$values.map(normalizeCustomer);
    if (Array.isArray(data)) return data.map(normalizeCustomer);
    return [normalizeCustomer(data)];
  };

  const fetchAll = async () => {
    try {
      const res = await CustomerService.getAllCustomers();
      const normalized = extractData(res.data);
      setCustomers(normalized);
      setShowList(true);
      setError("");
    } catch (err) {
      console.error("❌ Error fetching customers:", err);
      setError("Failed to fetch customers");
      setCustomers([]);
      setShowList(false);
    }
  };

  const fetchById = async () => {
    if (!customerId) return alert("Enter Customer ID");
    try {
      const res = await CustomerService.getCustomerById(customerId);
      const normalized = extractData(res.data);
      setSingleCustomer(normalized[0] || null);
      setError("");
    } catch (err) {
      console.error("❌ Error fetching customer:", err);
      setError("Customer not found");
      setSingleCustomer(null);
    }
  };

  // ------------------ Add Customer ------------------
  const addCustomer = async () => {
    try {
      const res = await CustomerService.addCustomer(newCustomer);

      if (res.data === "Customer already exists.") {
        setError("⚠️ Customer already exists!");
        return;
      }

      alert("✅ Customer added successfully!");
      fetchAll();
      setNewCustomer({
        UserId: "",
        FullName: "",
        GenderId: "",
        dob: "",
        phoneNumber: "",
        aadharNumber: "",
        panNumber: "",
        address: "",
        city: "",
        state: "",
      });
      setError("");
    } catch (err) {
      console.error("❌ Error adding customer:", err);
      setError("❌ Failed to add customer");
    }
  };

  // ------------------ Update Customer ------------------
  const updateCustomer = async () => {
    if (!customerId) return alert("Enter Customer ID to update");
    try {
      const res = await CustomerService.updateCustomer(customerId, updateData);

      if (res.data === "Phone number or email already exists.") {
        setError("⚠️ Phone number or email already exists!");
        return;
      }

      alert("✅ Customer updated successfully!");
      fetchAll();
      setError("");
    } catch (err) {
      console.error("❌ Error updating customer:", err);
      setError("❌ Failed to update customer");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      await CustomerService.deleteCustomer(id);
      alert("✅ Customer deleted!");
      fetchAll();
      if (singleCustomer && singleCustomer.customerId === id) setSingleCustomer(null);
    } catch (err) {
      console.error("❌ Failed to delete customer:", err);
      setError("Failed to delete customer");
    }
  };

  return (
    <div className="main-content">
      <h2>🫅🏻Customer Management</h2>

      <button onClick={fetchAll}>🪙Show All Customers</button>
      {error && <p className="error">{error}</p>}

      {showList && (
        <div className="form-section">
          <h3>All Customers</h3>
          {customers.length === 0 ? (
            <p>No customers found.</p>
          ) : (
            <table className="customer-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.customerId}>
                    <td>{c.customerId}</td>
                    <td>{c.fullName}</td>
                    <td>{c.phoneNumber}</td>
                    <td>{c.city}</td>
                    <td>{c.state}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(c.customerId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Add Customer Form */}
      <div className="form-section">
        <h3>🪙Add Customer</h3>
        {Object.keys(newCustomer).map((key) => (
          <input
            key={key}
            type={key === "dob" ? "date" : "text"} // calendar for DOB
            placeholder={key}
            value={newCustomer[key]}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, [key]: e.target.value })
            }
          />
        ))}
        <button onClick={addCustomer}>Add</button>
      </div>

      {/* Update Customer Form */}
      <div className="form-section">
        <h3>🪙Update Customer</h3>
        <input
          type="text"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        {Object.keys(updateData).map((key) => (
          <input
            key={key}
            type="text"
            placeholder={key}
            value={updateData[key]}
            onChange={(e) =>
              setUpdateData({ ...updateData, [key]: e.target.value })
            }
          />
        ))}
        <button onClick={updateCustomer}>Update</button>
      </div>

      {/* Fetch Single Customer */}
      <div className="form-section">
        <h3>🪙Get Customer By ID</h3>
        <input
          type="text"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <button onClick={fetchById}>Fetch</button>

        {singleCustomer && (
          <table className="customer-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>City</th>
                <th>State</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr key={singleCustomer.customerId}>
                <td>{singleCustomer.customerId}</td>
                <td>{singleCustomer.fullName}</td>
                <td>{singleCustomer.phoneNumber}</td>
                <td>{singleCustomer.city}</td>
                <td>{singleCustomer.state}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(singleCustomer.customerId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
