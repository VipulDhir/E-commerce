import React, { useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const GST = subtotal > 0 ? subtotal * 0.18 : 0;
  const deliveryCharge = subtotal > 1000 ? 0 : subtotal > 0 ? 50 : 0;
  const totalAmount = subtotal + GST + deliveryCharge;

  const handleCheckout = () => {
    const user = sessionStorage.getItem("user"); 
    if (!user) {
      navigate("/signin");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      <p><strong>Total Items:</strong> {cart.length}</p>
      <p><strong>Total Amount:</strong> Rs {totalAmount.toFixed(2)}</p>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - Rs {item.price}
              <button onClick={() => removeFromCart(index)} style={{ marginLeft: "10px", color: "red" }}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <>
          <button onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? "Hide Payment Details" : "Show Payment Details"}
          </button>
          <button onClick={handleCheckout} style={{ marginLeft: "10px", backgroundColor: "green", color: "white" }}>
            Checkout
          </button>
        </>
      )}

      {showDetails && (
        <div style={{ marginTop: "10px", border: "1px solid #ccc", padding: "10px" }}>
          <h3>Payment Breakdown</h3>
          <p><strong>Subtotal:</strong> Rs {subtotal.toFixed(2)}</p>
          <p><strong>GST (18%):</strong> Rs {GST.toFixed(2)}</p>
          <p><strong>Delivery Charges:</strong> Rs {deliveryCharge.toFixed(2)}</p>
          <hr />
          <p><strong>Total Payable:</strong> Rs {totalAmount.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default Cart;