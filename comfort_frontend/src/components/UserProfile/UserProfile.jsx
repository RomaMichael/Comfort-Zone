import React, { useEffect } from "react";
import { useAuthContext } from "../../context/AuthProvider";
import "./UserProfile.css";
import History from "../../MuiBlocks/History";

export default function UserProfile() {
  const { userAuth } = useAuthContext();

  const orders = userAuth.orders;

  return (
    <div className="user-profile">
      {userAuth.isLoggedIn ? (
        <div className="user-props">
          <div className="header">
            <img src={userAuth.avatar.url} alt="avatar" />
            <History historyAmount={orders} />
          </div>
          <div className="other-props">
            <p>
              Name:{" "}
              <span style={{ color: "blue", fontWeight: "700" }}>
                {userAuth.username}
              </span>
            </p>
            <p>
              Created:{" "}
              <span style={{ color: "blue", fontWeight: "700" }}>
                {userAuth.creationDate}
              </span>
            </p>

            <p>
              Email:{" "}
              <span style={{ color: "blue", fontWeight: "700" }}>
                {userAuth.email}
              </span>
            </p>
            <p>
              Status:{" "}
              <span style={{ color: "blue", fontWeight: "700" }}>
                {userAuth.role}
              </span>
            </p>
            <p>
              Orders:{" "}
              <span style={{ color: "blue", fontWeight: "700" }}>
                {orders.length ? orders.length : 0}
              </span>{" "}
              <p>
                {" "}
                your spent:{" "}
                <span style={{ color: "blue", fontWeight: "700" }}>
                  {userAuth.totalSpend.toFixed(2)} $
                </span>
              </p>
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
