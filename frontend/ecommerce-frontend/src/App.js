import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import AboutUs from "./pages/AboutUs";
import Orders from "./pages/Orders";
import Category from "./components/Category";
import Cart from "./components/Cart";
import Account from "./components/Account";
import { CartProvider } from "./components/CartContext";
import Checkout from "./components/Checkout";

function App() {
  const [user, setUser] = useState(null);

  return (
    <CartProvider> {/* Wrap with CartProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin setUser={setUser} />} />
          <Route path="/about" element={<AboutUs user={user} />} />
          <Route path="/orders" element={<Orders user={user} />} />
          <Route path="/category/:category" element={<Category user={user} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
