import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; 

const Navbar = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("cart");
    alert("Logged out successfully");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="logo">VWITS E-Commerce</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li className="dropdown">
          <span>Shop by Category ▼</span>
          <ul className="dropdown-menu">
            <li><Link to="/category/books">Books</Link></li>
            <li><Link to="/category/electronics">Electronics</Link></li>
            <li><Link to="/category/clothing">Clothing</Link></li>
          </ul>
        </li>
        <li><Link to="/orders">Your Orders</Link></li>
        <li><Link to="/account">Your Account</Link></li>
      </ul>
      <div className="auth-section">
        {user ? (
          <>
            <span className="username">Welcome, {user.name}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
      <div className="cart-section">
        <Link to="/cart" className="cart-button">Show Cart</Link>
      </div>
    </nav>
  );
};

export default Navbar;