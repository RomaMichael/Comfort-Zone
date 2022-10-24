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
import { useReport } from "../../context/ReportProvider";

export default function Nav() {
  const { userAuth, setUserAuth } = useAuthContext();

  const [adminAccess, setAdminAccess] = useState(true);

  const { setAdminAuth } = useAdminContext();
  const [adminState] = useState(false);
  const navigate = useNavigate();
  const { adminAuth } = useAdminContext();
  const [cartCount, setCartCount] = useState(0);

  const { newReports, unresponsed, getReports, reports, setUnresponsed } =
    useReport();

  const myReports = reports.filter(
    (report) =>
      report.sender === userAuth._id &&
      report.userSeen === false &&
      report.responsed === true
  );

  useEffect(() => {
    if (!userAuth.isLoggedIn) {
      navigate("/home", { replace: true });
    }
  }, []);

  useEffect(() => {
    getReports();
    setUnresponsed(
      reports.filter(
        (report) => report.responsed === false && report.sender === userAuth._id
      )
    );
  }, [userAuth]);

  useEffect(() => {}, []);

  useEffect(() => {
    if (!userAuth) {
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
                {cartCount ? (
                  <div className="sum-orders">
                    <p> {cartCount}</p>
                  </div>
                ) : null}
              </div>
              <div className="inbox" style={{ display: "flex" }}>
                <Link to="Inbox">
                  <AiOutlineMail style={{ color: "black" }} />
                </Link>
                <div
                  style={{
                    width: "25px",
                    height: "25px",
                    backgroundColor: "#AB7A5F",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "100px",
                    position: "relative",
                    right: "10px",
                    bottom: "5px",
                  }}
                >
                  <p style={{ fontSize: "14px", color: "white" }}>
                    {userAuth.role === "user"
                      ? myReports.length
                      : newReports.length}
                  </p>
                </div>
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
                onClick={logout}
              >
                <h3 style={{ cursor: "pointer", fontSize: "20px" }}>LogOut</h3>
                <div className="user-avatar">
                  <img
                    src={userAuth.isLoggedIn ? userAuth.avatar.url : null}
                    alt="avatar"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "20px",
                      cursor: "pointer",
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
            newReports={newReports}
            myReports={myReports}
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
