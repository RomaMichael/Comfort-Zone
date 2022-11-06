import React, { useEffect } from "react";
import Popover from "@mui/material/Popover";

import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useAuthContext } from "../context/AuthProvider";
import { useUsers } from "../context/UsersProvider";
import { useState } from "react";
export default function UserProps({ user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { updateUserRole } = useAuthContext();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const upgradePremium = (updatedRole) => {
    user = { ...user, role: updatedRole };
    updateUserRole(user);
  };

  return (
    <div>
      <BsFillArrowRightCircleFill
        style={{ fontSize: "20px" }}
        onClick={handleClick}
      />
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
        <div
          className="user-props"
          style={{
            width: "350px",
            height: "350px",
            padding: "0px 5px 0px 5px",
          }}
        >
          <h3 style={{ textAlign: "center" }}>Props of {user.username}</h3>
          <div className="props-container">
            <p>
              <span style={{ fontWeight: "700" }}>Registration date:</span>{" "}
              {user.creationDate}{" "}
            </p>
            <p>
              <span style={{ fontWeight: "700" }}>Role:</span> {user.role}
            </p>
            <p>
              <span style={{ fontWeight: "700" }}>Orders:</span>{" "}
              {user.orders.length}
            </p>{" "}
            <span style={{ fontWeight: "700" }}>Spend:</span>{" "}
            {user.orders ? user.totalSpend.toFixed(2) : 0} $
          </div>
          <hr />
          <div
            className="userProps-buttons"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {user.role === "user" ? (
              <button
                style={{
                  fontWeight: "700",
                  backgroundColor: "gold",
                  border: "none",
                  width: "120px",
                  height: "40px",
                  borderRadius: "7px",
                }}
                onClick={() => upgradePremium("premium-user")}
              >
                Upgrade to premium
              </button>
            ) : (
              <button
                style={{
                  fontWeight: "700",
                  backgroundColor: "red",
                  border: "none",
                  width: "120px",
                  height: "40px",
                  borderRadius: "7px",
                }}
                onClick={() => upgradePremium("user")}
              >
                Return to user
              </button>
            )}
          </div>
        </div>
      </Popover>
    </div>
  );
}
