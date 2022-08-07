import { Link, Routes, Route, useParams } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import Cart from "../Cart/Cart";
import About from "../About/About";
import Home from "../Home/Home";
import Products from "../Products/Products";
import { ProductPage } from "../../pages/ProductPage/ProductPage";
import "../Nav/Nav.css";
import ResponsiveNav from "../../MuiBlocks/ResponsiveNav";
import { useEffect, useState } from "react";

export default function Nav() {
  const params = useParams();

  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("Cart Array")) || []
  );

  useEffect(() => {
    localStorage.setItem("Cart Array", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    let totalItems = 0;
    cart.map((elem) => {
      totalItems += elem.counter;
    });
    setCartCount(totalItems);
  }, [cart]);

  return (
    <div className="nav">
      <div className="nav-container">
        <div className="logo">
          <Link to="/Home">
            <img
              src="https://react-course-comfy-sloth-store.netlify.app/static/media/logo.221f6b13.svg"
              alt="logo"
            />
          </Link>
        </div>
        <div className="links">
          <ul>
            <Link to="/Home">
              <li>Home</li>
            </Link>
            <Link to="/About">
              <li>About</li>
            </Link>
            <Link to="/Products">
              <li>Products</li>
            </Link>
          </ul>
        </div>
        <div className="icons">
          <div className="cart">
            <Link to="Cart">
              <h3>
                Cart <BsFillCartFill />
              </h3>
            </Link>
            <div className="sum-orders">
              <p>{cartCount}</p>
            </div>
          </div>
          <div className="login">
            <h3>
              Login <FaUserPlus />
            </h3>
          </div>
        </div>
        <div className="menu-bars">
          <ResponsiveNav cartCount={cartCount} />
        </div>
      </div>

      <Routes>
        <Route path="Home" element={<Home />} />
        <Route path="About" element={<About />} />
        <Route path="Products" element={<Products setCart={setCart} />} />
        <Route
          path="Cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
              setCartCount={setCartCount}
              cartCount={cartCount}
            />
          }
        />
        <Route
          path="Products/:id"
          element={<ProductPage ordersArray={cart} setCart={setCart} />}
        />
      </Routes>
    </div>
  );
}
