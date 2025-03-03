import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useCart } from "./CartContext"; 

const Category = ({ user }) => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); 


  useEffect(() => {
    axios.get(`http://localhost:8899/api/products/category/${category}`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching category:", error));
  }, [category]);


  return (
    <div>
      <Navbar user={user} />
      <h2>Category: {category}</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
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

export default Category;