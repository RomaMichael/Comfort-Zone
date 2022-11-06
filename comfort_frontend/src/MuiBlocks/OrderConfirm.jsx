import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

export default function OrderConfirm({ confirmation, clearCart }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const confirm = () => {
    confirmation();
    clearCart();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <button
        className="order-button"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        Order
      </button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Typography>
          <div
            className="order-confirmation"
            style={{
              width: "350px",
              height: "150px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h3>Confirm the order</h3>
            <div
              className="buttons-confirmation"
              style={{
                width: "200px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button
                style={{
                  width: "80px",
                  height: "40px",
                  color: "white",
                  backgroundColor: "blue",
                  border: "none",
                  borderRadius: "8px",
                }}
                onClick={confirm}
              >
                Confirm
              </button>
              <button
                onClick={handleClose}
                style={{
                  width: "80px",
                  height: "40px",
                  color: "black",
                  backgroundColor: "grey",
                  border: "none",
                  borderRadius: "8px",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </Typography>
      </Popover>
    </div>
  );
}
