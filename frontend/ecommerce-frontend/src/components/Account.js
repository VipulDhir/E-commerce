import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      alert("Please log in first.");
      navigate("/signin"); 
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("user"); 
    alert("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="account-container">
      <h2>Your Account</h2>
      {user ? (
        <div className="account-details">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default Account;
