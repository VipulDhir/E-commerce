import React, { useEffect, useState } from "react";

const UserOrders = () => {
  const userData = JSON.parse(sessionStorage.getItem("user"));
  const userId = userData ? userData.id : null;

  const [orders, setOrders] = useState([]); // Ensure orders is an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    const API_URL = `http://localhost:8899/api/orders/user/${userId}`;

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          throw new Error("Invalid response format");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order.orderId} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <h3>Order ID: {order.orderId}</h3>
            <p><strong>Total:</strong> Rs {order.totalAmount.toFixed(2)}</p>
            <p><strong>Address:</strong> {order.address.address}</p>
            
            <h4>Items:</h4>
            <ul>
              {order.items.map((item) => (
                <li key={item.id} style={{ marginBottom: "5px" }}>
                  <p><strong>Name:</strong> {item.product.name}</p>
                  <p><strong>Description:</strong> {item.product.description}</p>
                  <p><strong>Category:</strong> {item.product.category}</p>
                  <p><strong>Price:</strong> Rs {item.price.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default UserOrders;
