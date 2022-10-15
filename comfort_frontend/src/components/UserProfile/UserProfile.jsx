import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthProvider";
import "./UserProfile.css";
import History from "../../MuiBlocks/History";
import { AiOutlineOrderedList } from "react-icons/ai";

export default function UserProfile() {
  const { userAuth } = useAuthContext();

  const orders = userAuth.orders;

  const getTotalSpent = () => {
    const totalSpent = orders.reduce(
      (accumalator, order) =>
        accumalator +
        order.reduce((prev, order) => {
          return prev + order.price * order.counter;
        }, 0),
      0
    );
    return totalSpent.toFixed(2);
  };

  return (
    <div className="user-profile">
      {userAuth.isLoggedIn ? (
        <div className="user-props">
          <div className="header">
            <img src={userAuth.avatar.url} alt="avatar" />
            <History historyAmount={orders} getTotalSpent={getTotalSpent} />
          </div>
          <div className="other-props">
            <p>
              Name:{" "}
              <span style={{ color: "blue", fontWeight: "700" }}>
                {userAuth.username}
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
              You have{" "}
              <span style={{ color: "blue", fontWeight: "700" }}>
                {orders.length}
              </span>{" "}
              <p>
                {" "}
                your spent:{" "}
                <span style={{ color: "blue", fontWeight: "700" }}>
                  {getTotalSpent()} $
                </span>
              </p>
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
