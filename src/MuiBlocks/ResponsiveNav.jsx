import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { FaUserPlus } from "react-icons/fa";
import { GoThreeBars } from "react-icons/go";
import { BsFillCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function TemporaryDrawer({ cartCount }) {
  const [state, setState] = React.useState({
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
          <div
            className="cart-responsive"
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <h3>
              <Link
                to="Cart"
                style={{ textDecoration: "none", color: "black" }}
              >
                CART
              </Link>
            </h3>
            <BsFillCartFill style={{ fontSize: "22px" }} />
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
              {cartCount}
            </div>
          </div>
          <div
            className="login-responsive"
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <h3>LOGIN</h3>
            <FaUserPlus style={{ fontSize: "22px" }} />
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
