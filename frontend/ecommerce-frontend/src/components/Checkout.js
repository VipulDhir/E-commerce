import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import Order from "./Order"; 

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState(sessionStorage.getItem("address") || "");

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (!user) {
      navigate("/signin");
    }
  }, [navigate]);

  const handleOrder = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      navigate("/signin");
      return;
    }

    if (!address.trim()) {
      alert("Please enter an address before placing the order.");
      return;
    }

    const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
    const GST = subtotal * 0.18;
    const deliveryCharge = subtotal > 1000 ? 0 : 50;
    const totalAmount = subtotal + GST + deliveryCharge;

    const order = {
      user: { id: user.id }, 
      address: { address }, 
      items: cart.map(item => ({
        product: { id: item.id },
        name: item.name,
        price: item.price
      })),
      totalAmount
    };


    try {
      const response = await fetch("http://localhost:8899/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        const errorData = await response.text();
        alert(`Failed to place order: ${errorData}`);
        return;
      }

      alert("Order placed successfully!");
      // clearCart();
      navigate("/");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order. Please try again.");
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <p><strong>Order Items:</strong></p>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - Rs {item.price}
          </li>
        ))}
      </ul>

      <label>
        <strong>Enter Address:</strong>
        <input
          type="text"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            sessionStorage.setItem("address", e.target.value);
          }}
          required
        />
      </label>

      <button
        onClick={handleOrder}
        style={{ marginTop: "10px", backgroundColor: "blue", color: "white" }}
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;