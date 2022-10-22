import React, { useState } from "react";
import Popover from "@mui/material/Popover";

import Button from "@mui/material/Button";

export default function DelPopover({ name, deleteProduct }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Delete
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        // onClose={handleClose}

        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="popover-content">
          <p style={{ fontWeight: "700" }}>
            Are you sure you want to delete {name}?
          </p>
          <div
            className="buttons-popover-delete"
            style={{
              height: "100px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <button
              style={{
                height: "30px",
                width: "80px",
                border: "none",
                borderRadius: "10px",
                color: "white",
                background: "blue",
              }}
              onClick={deleteProduct}
            >
              Yes
            </button>
            <button
              style={{
                height: "30px",
                width: "80px",
                border: "none",
                borderRadius: "10px",
                backgroundColor: "grey",
              }}
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </Popover>
    </div>
  );
}
