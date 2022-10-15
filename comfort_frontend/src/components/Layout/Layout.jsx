import React from "react";
import Cart from "../Cart/Cart";
import About from "../About/About";
import Home from "../Home/Home";
import Products from "../Products/Products";
import { ProductPage } from "../../pages/ProductPage/ProductPage";
import LoginPage from "../LoginPage/LoginPage";
import ManageProducts from "../ManageProducts/ManageProducts";
import SignUp from "../SignUp/SignUp";
import { Routes, Route } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";

import UserProfile from "../UserProfile/UserProfile";
import Inbox from "../Inbox/Inbox";

export default function Layout() {
  const { setCart } = useAuthContext();

  return (
    <div>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products setCart={setCart} />} />
        <Route path="Cart" element={<Cart />} />
        <Route path="products/:id" element={<ProductPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="manageproducts" element={<ManageProducts />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="userProfile" element={<UserProfile />} />
        <Route path="Inbox" element={<Inbox />} />
      </Routes>
    </div>
  );
}
