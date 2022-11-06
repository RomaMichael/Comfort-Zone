import * as React from "react";
import Popover from "@mui/material/Popover";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";

export default function History({ getTotalSpent, historyAmount }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { userAuth } = useAuthContext();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const orders = userAuth.orders;

  return (
    <div>
      <button className="view-history" onClick={handleClick}>
        Purchase history
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {orders.length ? (
          <div className="all-orders">
            {" "}
            <h2 style={{ textAlign: "center", color: "green" }}>
              Purchase history
            </h2>
            <p style={{ color: "blue", fontWeight: "700" }}>
              You have {historyAmount.length} orders
            </p>
            <div
              className="history-of-orders"
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {orders.map((order, i) => (
                <div
                  key={i}
                  className="each-order"
                  style={{
                    minHeight: "50px",
                    width: "500px",
                    border: "1px solid black",
                    background: "rgb(0, 255, 0)",
                  }}
                >
                  {order.map((elem, i) => (
                    <div key={i}>
                      {" "}
                      <div
                        className="properties"
                        style={{
                          display: "flex",
                          gap: "15px",
                          height: "100px",
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={elem.img}
                          alt="product"
                          style={{ height: "50px", width: "50px" }}
                        />
                        <div
                          className="name-price"
                          style={{
                            position: "relative",
                            bottom: "20px",
                            right: "7px",
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                          }}
                        >
                          <p style={{ fontWeight: "700" }}>{elem.name}</p>

                          <p>
                            Amount:
                            <span style={{ fontWeight: "700" }}>
                              {elem.counter}
                            </span>
                          </p>
                          <p>
                            Subtotal:
                            <span
                              style={{ fontWeight: "700", color: "orangered" }}
                            >
                              {(elem.total = elem.price * elem.counter).toFixed(
                                2
                              )}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <hr style={{ width: "80%", textAlign: "center" }} />
                  <div
                    className="total-and-date"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",

                      fontSize: "15px",
                    }}
                  >
                    <p>
                      Date: <span>{order[0].date}</span>
                    </p>
                    <p>
                      Total:
                      <span style={{ fontWeight: "700", color: "red" }}>
                        {order.reduce((prev, order) => {
                          return prev + order.price * order.counter;
                        }, 0)}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="empty-history"
            style={{
              width: "500px",
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>You have no history</h1>
            <Link to="/Products">
              <button
                className="shop-button"
                style={{
                  border: "none",
                  borderRadius: "8px",
                  height: "30px",
                  width: "100px",
                  fontWeight: "700",
                  backgroundColor: "blue",
                  color: "white",
                }}
              >
                To the shop
              </button>
            </Link>
          </div>
        )}
      </Popover>
    </div>
  );
}
