import React from "react";
import { useAuthContext } from "../../../context/AuthProvider";
import { useUsers } from "../../../context/UsersProvider";
import "./Statistics.css";

export default function Statistics() {
  const { userAuth } = useAuthContext();
  const { users } = useUsers();

  //context

  const userTotalBuys = users.map((user) => ({ ...user, totalBuys: 0 }));
  console.log(userTotalBuys);

  // const totalOrders = userTotalBuys.reduce((prev, userOrder) => {
  //   userOrder.totalBuys = prev + userOrder.length;
  // }, 0);

  // const stepTwo = userTotalBuys.orders.map((order) => order);

  // console.log(stepTwo);

  // const orderProducts = userAuth.orders.map((order) =>
  //   order.map((order) => order.name)
  // );

  return (
    <div className="statistics">
      <div className="statistics-container">
        <div className="statistics-title">
          <h2>Statistics of Sells</h2>
        </div>

        <div className="Information">
          <h3>Information</h3>
          <p>You have </p>
        </div>
      </div>
    </div>
  );
}
