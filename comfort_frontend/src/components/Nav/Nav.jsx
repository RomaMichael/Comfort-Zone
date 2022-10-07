import { Link, useNavigate } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import "../Nav/Nav.css";
import ResponsiveNav from "../../MuiBlocks/ResponsiveNav";
import { useEffect, useState } from "react";

import { defaultAuth, useAuthContext } from "../../context/AuthProvider";
import AdminAccess from "../UserAccess/UserAccess";

import { useAdminContext } from "../../context/AdminProvider";

export default function Nav() {
  const { userAuth, setUserAuth } = useAuthContext();

  const [adminAccess, setAdminAccess] = useState(true);

  const { setAdminAuth } = useAdminContext();
  const [adminState, setAdminState] = useState(false);
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (!userAuth.isLoggedIn) {
      navigate("/home", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (userAuth.isLoggedIn) {
      let cartCounter = userAuth.cartState.reduce(function (prev, elem) {
        return prev + elem.counter;
      }, 0);

      setCartCount(cartCounter);
    }
  }, [userAuth.isLoggedIn, userAuth.cartState]);

  const logout = async () => {
    setAdminAuth(false);
    try {
      const response = await fetch("http://localhost:8005/users/logout", {
        method: "POST",
        credentials: "include",
      });

      setUserAuth(defaultAuth);

      navigate("/home", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="nav">
      <div className="nav-container">
        <div className="logo">
          <Link
            to="/Home"
            onClick={() => {
              setAdminAccess(false);
            }}
          >
            <img
              src="https://react-course-comfy-sloth-store.netlify.app/static/media/logo.221f6b13.svg"
              alt="logo"
            />
          </Link>
        </div>
        <div className="links">
          <ul>
            <Link
              to="/Home"
              onClick={() => {
                setAdminAccess(!adminState);
              }}
            >
              <li>Home</li>
            </Link>
            <Link
              to="/About"
              onClick={() => {
                setAdminAccess(!adminState);
              }}
            >
              <li>About</li>
            </Link>
            <Link
              to="/Products"
              onClick={() => {
                setAdminAccess(!adminState);
              }}
            >
              <li>Products</li>
            </Link>
          </ul>
        </div>
        <div className="icons">
          {userAuth.isLoggedIn ? (
            <div className="cart-and-inbox">
              <div className="cart">
                <Link to="Cart">
                  <h3>
                    <BsFillCartFill />
                  </h3>
                </Link>
                <div className="sum-orders">
                  <p> {cartCount}</p>
                </div>
              </div>
              <div className="inbox">
                <Link to="Inbox">
                  <AiOutlineMail style={{ color: "black" }} />
                </Link>
              </div>
            </div>
          ) : null}

          <div className="login">
            {userAuth.isLoggedIn ? (
              <div
                className="logout"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "15px",
                }}
              >
                <h3
                  style={{ cursor: "pointer", fontSize: "20px" }}
                  onClick={logout}
                >
                  LogOut
                </h3>
                <div className="user-avatar">
                  <img
                    src={userAuth.isLoggedIn ? userAuth.avatar.url : null}
                    alt="avatar"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "20px",
                    }}
                  />
                </div>
              </div>
            ) : (
              <Link
                to="Login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <h3>
                  Login <FaUserPlus />
                </h3>
              </Link>
            )}
          </div>
        </div>
        <div className="menu-bars">
          <ResponsiveNav
            cartCount={cartCount}
            userAuth={userAuth}
            logout={logout}
          />
        </div>
      </div>
      {userAuth.isLoggedIn ? (
        <div>
          <AdminAccess
            adminAccess={adminAccess}
            setAdminAccess={setAdminAccess}
          />
        </div>
      ) : null}
    </div>
  );
}
