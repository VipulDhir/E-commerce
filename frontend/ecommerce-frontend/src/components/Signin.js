import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const navigate = useNavigate();

  const handleSignin = (e) => {
    e.preventDefault();
    setError("");

    axios
      .post("http://localhost:8899/api/users/signin", { username, password })
      .then((response) => {
        if (response.status === 200) {
          sessionStorage.setItem("user", JSON.stringify(response.data));
          alert("Login successful");
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            setError("User does not exist. Please sign up.");
          } else if (error.response.status === 401) {
            setError("Username or Password is Incorrect. Please try again.");
          } else {
            setError("Something went wrong. Please try again.");
          }
        } else {
          setError("Network error. Please check your connection.");
        }
        console.error("Login error:", error);
      });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setResetMessage("");

    axios
      .post("http://localhost:8899/api/users/reset-password", {
        username,
        password: newPassword,
      })
      .then((response) => {
        if (response.status === 200) {
          setResetMessage("Password reset successfully! You can now sign in.");
          setShowReset(false);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setResetMessage("User not found. Please enter a valid username.");
        } else {
          setResetMessage("Error resetting password. Please try again.");
        }
        console.error("Reset error:", error);
      });
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>

      {error && <p className="error-message">{error}</p>}

      {!showReset ? (
        <form onSubmit={handleSignin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
        </form>
      ) : (

        <form onSubmit={handleResetPassword}>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      )}

      {resetMessage && <p className="reset-message">{resetMessage}</p>}

      <p onClick={() => setShowReset(!showReset)} style={{ cursor: "pointer", color: "blue" }}>
        {showReset ? "Back to Sign In" : "Forgot Password?"}
      </p>

      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
};

export default Signin;