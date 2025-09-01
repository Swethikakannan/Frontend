// src/components/customer/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import ProfileService from "../services/profileService";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Load logged-in user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await ProfileService.getLoggedInUser();
        setUser(res.data);
      } catch (err) {
        console.error("❌ Failed to load user:", err);
        setError("❌ Failed to load user info");
      }
    };
    fetchUser();
  }, []);

  // ✅ Fetch profile from /CustomerProfile/me
  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const res = await ProfileService.getMyProfile(); // 👈 /CustomerProfile/me
      setProfile(res.data);
      setError("");
    } catch (err) {
      console.error("❌ Failed to load profile:", err);
      setError("❌ Could not fetch profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h2>👤 My Profile</h2>

      {error && <p className="error">{error}</p>}

      {/* ✅ Basic User Info */}
      {user && (
        <div className="profile-card">
          <h3>📝 Basic Info</h3>
          <p><b>👤 Username:</b> {user.username}</p>
          <p><b>📧 Email:</b> {user.email}</p>
          <p><b>🎭 Role:</b> {user.role}</p>
        </div>
      )}

      {/* ✅ Fetch More Details */}
      <div className="more-details-section">
        <h3>🔎 Fetch More Details</h3>
        <button onClick={fetchProfile} disabled={isLoading}>
          {isLoading ? "⏳ Loading..." : "📂 Fetch Details"}
        </button>
      </div>

      {/* ✅ Full Profile */}
      {profile && (
        <div className="profile-details">
          <h3>📜 Full Profile</h3>
          <p><b>🆔 Customer ID:</b> {profile.CustomerId}</p>
          <p><b>👤 Full Name:</b> {profile.FullName}</p>
          <p><b>📞 Phone:</b> {profile.PhoneNumber}</p>
          <p><b>🎂 DOB:</b> {new Date(profile.Dob).toLocaleDateString()}</p>
          <p><b>🎉 Age:</b> {profile.Age}</p>
          <p><b>🆔 Aadhar:</b> {profile.AadharNumber}</p>
          <p><b>🪪 PAN:</b> {profile.PanNumber}</p>
          <p><b>🏠 Address:</b> {profile.Address}, {profile.City}, {profile.State}</p>
          <p><b>🚻 Gender:</b> {profile.GenderId === 1 ? "Male" : "Female"}</p>

          <h4>👤 Linked User</h4>
          {profile.User && (
            <div className="user-details">
              <p><b>🆔 User ID:</b> {profile.User.UserId}</p>
              <p><b>👤 Username:</b> {profile.User.Username}</p>
              <p><b>📧 Email:</b> {profile.User.Email}</p>
              <p><b>⚡ Active:</b> {profile.User.IsActive ? "Yes ✅" : "No ❌"}</p>
            </div>
          )}

          <h4>🏦 Accounts</h4>
          {profile.Accounts?.$values?.length > 0 ? (
            <table className="accounts-table">
              <thead>
                <tr>
                  <th>🏷️ Account Number</th>
                  <th>💳 Type</th>
                  <th>💰 Balance</th>
                  <th>📌 Status</th>
                </tr>
              </thead>
              <tbody>
                {profile.Accounts.$values.map((acc) => (
                  <tr key={acc.AccountId}>
                    <td>{acc.AccountNumber}</td>
                    <td>{acc.AccountTypeId}</td>
                    <td>₹{acc.Balance}</td>
                    <td>{acc.StatusId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>❌ No accounts found.</p>
          )}
        </div>
      )}
    </div>
  );
}

