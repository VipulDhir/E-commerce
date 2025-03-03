import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useCart } from "../components/CartContext";  // Import Cart Context

const Home = ({ user }) => {
  const [products, setProducts] = useState([]);
  const {addToCart } = useCart(); 

  useEffect(() => {
    axios.get("http://localhost:8899/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div>
      <Navbar user={user} />
      <h2>Available Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Price: Rs {product.price}</p>
            <button onClick={() => { 
            addToCart(product);
            alert(`${product.name} added to cart!`);
          }}>
            Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;