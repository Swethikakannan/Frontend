// // src/components/ProtectedRoute.js
// import React from "react";
// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children }) {
//   const username = sessionStorage.getItem("username");
//   const role = sessionStorage.getItem("role");

//   if (!username || !role) {
//     // If not logged in, redirect to login
//     return <Navigate to="/" replace />;
//   }

//   return children; // Otherwise render the page
// }


import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roles }) {
  const username = sessionStorage.getItem("username");
  const userRole = sessionStorage.getItem("role");

  // If not logged in, redirect to login
  if (!username || !userRole) {
    return <Navigate to="/login" replace />;
  }

  // If roles are provided and user's role is NOT in the array, redirect
  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the children (protected page)
  return children;
}
