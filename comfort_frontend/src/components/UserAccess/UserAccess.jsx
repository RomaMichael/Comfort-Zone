import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAdminContext } from "../../context/AdminProvider";
import { useAuthContext } from "../../context/AuthProvider";
import Report from "../../MuiBlocks/Report";
import "./UserAccess.css";

export default function AdminAccess({ adminAccess, setAdminAccess }) {
  const { userAuth } = useAuthContext();
  const { adminAuth } = useAdminContext();
  const location = useLocation();
  const manageButton = () => {
    setAdminAccess(!adminAccess);
  };
  console.log(adminAuth);
  return (
    <div className="userAccess">
      <div className="user-container">
        <div className="user-message">
          <p>
            Hey{" "}
            <span>
              <Link
                to="/userProfile"
                style={{
                  textDecoration: "none",
                  color: "blue",
                  fontWeight: "700",
                }}
              >
                {userAuth.username}
              </Link>
            </span>
            ! Welcome to ComfySloth
          </p>
          {userAuth.role === "user" ? <Report /> : null}
        </div>

        {adminAuth ? (
          <Link
            onClick={() => {
              setAdminAccess(!adminAccess);
            }}
            to={
              location.pathname === "/manageproducts"
                ? "Products"
                : "manageproducts"
            }
            style={{ textDecoration: "none" }}
          >
            <button
              onClick={manageButton}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "30px",
              }}
            >
              <p style={{ textTransform: "uppercase" }}>
                {location.pathname === "/manageproducts"
                  ? "To the shop"
                  : "Manage products"}
              </p>
            </button>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
