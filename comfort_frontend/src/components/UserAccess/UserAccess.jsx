import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAdminContext } from "../../context/AdminProvider";
import { useAuthContext } from "../../context/AuthProvider";
import Report from "../../MuiBlocks/Report";
import "./UserAccess.css";

export default function AdminAccess({ adminAccess, setAdminAccess }) {
  const { userAuth } = useAuthContext();
  const { adminAuth } = useAdminContext();
  const manageButton = () => {
    setAdminAccess(!adminAccess);
  };

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
            to={adminAccess ? "manageproducts" : "Products"}
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
                {adminAccess ? "Manage products" : "To the shop"}
              </p>
            </button>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
