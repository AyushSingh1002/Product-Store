import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./pages/ProductPage";
import CartPage from "./pages/cartPage";
import  Navbar  from "./components/ui/Navbar";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div data-theme="light">
      <Navbar />
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
