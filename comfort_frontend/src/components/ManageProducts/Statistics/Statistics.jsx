import React from "react";
import { useAuthContext } from "../../../context/AuthProvider";
import { useUsers } from "../../../context/UsersProvider";
import "./Statistics.css";

export default function Statistics() {
  const { users } = useUsers();

  const userTotalBuys = users.map((user) => ({ ...user, totalBuys: 0 }));
  console.log("ae");
  console.log(userTotalBuys);

  const getTotalUsersSpending = () => {
    const getUserTotal = (orders) =>
      orders.reduce(
        (accumalator, order) =>
          accumalator +
          order.reduce((prev, order) => {
            return prev + order.price * order.counter;
          }, 0),
        0
      );

    const usersTotal = users.reduce(
      (accumalator, user) => accumalator + getUserTotal(user.orders),
      0
    );

    return usersTotal.toFixed(2);
  };

  return (
    <div className="statistics">
      <div className="statistics-container">
        <div className="statistics-title">
          <h2>Statistics of Sells</h2>
        </div>

        <div className="Information">
          <h3>Information</h3>
          <p>You have {getTotalUsersSpending()}</p>
        </div>
      </div>
    </div>
  );
}
