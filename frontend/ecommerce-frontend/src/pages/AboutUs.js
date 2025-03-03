import React from "react";
import Navbar from "../components/Navbar";

const AboutUs = ({ user }) => {
  return (
    <div>
      <Navbar user={user} />
      <h2>About Us</h2>
      <p>Welcome to our E-Commerce platform. We offer high-quality products at the best prices.</p>
    </div>
  );
};

export default AboutUs;
