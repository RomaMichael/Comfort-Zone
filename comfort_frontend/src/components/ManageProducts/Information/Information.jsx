import React, { useEffect } from "react";
import { useState } from "react";
import { useUsers } from "../../../context/UsersProvider";
import "./Information.css";

export default function Information() {
  const { users, getUsers } = useUsers();

  useEffect(() => {
    getUsers();
  }, []);
  const incomes = users.reduce((accumulator, user) => {
    return accumulator + user.totalSpend;
  }, 0);

  const arrayMostOrders = users.sort((a, b) => {
    return b.orders.length - a.orders.length;
  });

  const usersBySpend = [...users];

  const arrayMostSpend = usersBySpend.sort((a, b) => {
    return a.totalSpend - b.totalSpend;
  });

  return (
    <div className="statistics">
      <div className="statistics-container">
        <div className="statistics-title">
          <h2>Information</h2>
        </div>

        <div className="information">
          <div className="info-container">
            <p>
              <span style={{ fontWeight: "700" }}> The shop earns: </span>

              <span style={{ color: "blue", fontWeight: "700" }}>
                {incomes.toFixed(2)}$
              </span>
            </p>
            <p style={{ fontWeight: "700" }}>
              {" "}
              The shop has <span style={{ color: "blue" }}>
                {users.length}
              </span>{" "}
              users
            </p>
            <p style={{ fontWeight: "700" }}>
              Avarage spends per user:{" "}
              <span style={{ color: "blue" }}>
                {(incomes / users.length).toFixed(2)}$
              </span>
            </p>
            <p>
              {" "}
              <span style={{ fontWeight: "700" }}> Top buyer(by orders): </span>
              <span style={{ fontWeight: "700", color: "blue" }}>
                {" "}
                {arrayMostOrders[0].username}
              </span>
            </p>
            <p>
              {" "}
              <span style={{ fontWeight: "700" }}>
                Top buyer(by spends):{" "}
              </span>{" "}
              <span style={{ fontWeight: "700", color: "blue" }}>
                {" "}
                {arrayMostSpend.at(-1).username}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
