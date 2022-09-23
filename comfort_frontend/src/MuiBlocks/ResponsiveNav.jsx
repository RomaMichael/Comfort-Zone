import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { FaUserPlus } from "react-icons/fa";
import { GoThreeBars } from "react-icons/go";
import { BsFillCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
export default function TemporaryDrawer({ length, userAuth, logout }) {
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="menu-responsive">
          <h3>
            <Link to="Home" style={{ textDecoration: "none", color: "black" }}>
              HOME
            </Link>
          </h3>
          <h3>
            {" "}
            <Link to="About" style={{ textDecoration: "none", color: "black" }}>
              ABOUT
            </Link>
          </h3>
          <h3>
            {" "}
            <Link
              to="Products"
              style={{ textDecoration: "none", color: "black" }}
            >
              PRODUCTS
            </Link>
          </h3>
          <Divider />
          {userAuth.isLoggedIn ? (
            <div
              className="cart-responsive"
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <h3>
                <Link
                  to="Cart"
                  style={{ textDecoration: "none", color: "black" }}
                ></Link>
              </h3>
              <Link to="/Cart">
                <BsFillCartFill style={{ fontSize: "22px", color: "black" }} />
              </Link>
              <div
                className="amount"
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "100px",
                  backgroundColor: "#ab7a5f",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  right: "13px",
                  bottom: "4px",
                }}
              >
                {length}
              </div>
            </div>
          ) : null}
          <div className="inbox">
            <Link to="/Inbox">
              <AiOutlineMail style={{ fontSize: "30px", color: "black" }} />
            </Link>
          </div>
          <div
            className="login-responsive"
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            {userAuth.isLoggedIn ? (
              <div
                className="logout"
                style={{ display: "flex", alignItems: "center" }}
              >
                <h3 style={{ cursor: "pointer" }} onClick={logout}>
                  LogOut
                </h3>
                <div className="user-avatar">
                  <img
                    src={userAuth.avatar.url}
                    alt="avatar"
                    style={{
                      width: "30px",
                      height: "30px",
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
      </List>
    </Box>
  );

  return (
    <div>
      {["top"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <GoThreeBars style={{ fontSize: "30px" }} />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}