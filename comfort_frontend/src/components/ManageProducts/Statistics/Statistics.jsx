import React from "react";
import { useUsers } from "../../../context/UsersProvider";
import "./Statistics.css";

export default function Statistics() {
  const { users } = useUsers();

  const userTotalBuys = users.map((user) => ({ ...user, totalBuys: 0 }));

  console.log(userTotalBuys);

  const incomes = users.reduce((accumulator, user) => {
    return accumulator + user.totalSpend;
  }, 0);

  const arrayMostOrders = users.sort(function (a, b) {
    return a.orders.length - b.orders.length;
  });
  console.log(arrayMostOrders);

  const arrayMostSpend = users.sort(function (a, b) {
    return a.totalSpend - b.orders.totalSpend;
  });

  return (
    <div className="statistics">
      <div className="statistics-container">
        <div className="statistics-title">
          <h2>Statistics of Sells</h2>
        </div>

        <div className="Information">
          <h3>Information</h3>
          <p>
            The shop earns{" "}
            <span style={{ color: "blue", fontWeight: "700" }}>{incomes}$</span>
          </p>
          <p> Top buyer(by orders): {arrayMostOrders.at(-1).username}</p>
          <p> Top buyer(by spends): {arrayMostSpend[0].username}</p>
        </div>
      </div>
    </div>
  );
}
