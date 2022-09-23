import React, { useState } from "react";
import Popover from "@mui/material/Popover";

import { RiArrowDownCircleFill } from "react-icons/ri";
import { GiCancel } from "react-icons/gi";
import UpdateProps from "./UpdateProps";
export default function UpdatePopover({ product }) {
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
      <RiArrowDownCircleFill
        style={{ fontSize: "30px" }}
        onClick={handleClick}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="popover-content" style={{ width: "500px" }}>
          <div
            className="popover-top"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3>Update Properties</h3>
            <GiCancel onClick={handleClose} style={{ fontSize: "30px" }} />
          </div>
        </div>

        <UpdateProps product={product} style={{ marginBottom: "50px" }} />
      </Popover>
    </div>
  );
}
