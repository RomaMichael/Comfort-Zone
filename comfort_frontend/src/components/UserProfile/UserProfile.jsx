import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthProvider";
import "./UserProfile.css";
import History from "../../MuiBlocks/History";
import { AiOutlineOrderedList } from "react-icons/ai";

export default function UserProfile() {
  const { userAuth } = useAuthContext();

  const orders = userAuth.orders;

  // const totals = userAuth.orders.map((elem) => elem.total);
  // console.log(totals);
  return (
    <div className="user-profile">
      {userAuth.isLoggedIn ? (
        <div className="user-props">
          <div className="header">
            <img src={userAuth.avatar.url} alt="avatar" />
            <History historyAmount={orders} />
          </div>
          <div className="other-props">
            <div className="name">
              <p>
                Name:{" "}
                <span style={{ color: "blue", fontWeight: "700" }}>
                  {userAuth.username}
                </span>
              </p>
            </div>

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
          </div>
        </div>
      ) : null}
    </div>
  );
}
