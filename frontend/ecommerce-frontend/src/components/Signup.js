import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");
  
    const userData = { username, name, phone, email, password };
  
    axios.post("http://localhost:8899/api/users/signup", userData)
      .then((response) => {
        const { id, username, name, phone, email } = response.data;
        const userSessionData = { id, username, name, phone, email };
  
        sessionStorage.setItem("user", JSON.stringify(userSessionData));
        alert("User registered successfully");
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 409) {
            setError(error.response.data);
          } else {
            setError("Something went wrong. Please try again.");
          }
        } else {
          setError("Network error. Please check your connection.");
        }
        console.error("Signup error:", error);
      });
  };
  

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>} {}
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/signin">Sign in here</Link></p>
    </div>
  );
};

export default Signup;