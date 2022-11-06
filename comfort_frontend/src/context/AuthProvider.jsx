import React, { createContext, useContext, useEffect, useState } from "react";
import moment from "moment";
import { calcTotalSpent } from "./helpers/calc-total-spent";

const authContext = createContext();

export const defaultAuth = {
  isLoggedIn: false,
  cartState: [],
};

export function AuthProvider({ children }) {
  const [userAuth, setUserAuth] = useState(defaultAuth);

  const checkAuth = async () => {
    const response = await fetch("http://localhost:8005/users/check-auth", {
      credentials: "include",
    });

    const user = await response.json();

    if (user.username) {
      setUserAuth({ ...user, isLoggedIn: true });
    } else {
      setUserAuth({ ...user, isLoggedIn: false });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const saveCartToDb = async (cartUpdate) => {
    await fetch(`http://localhost:8005/users/${userAuth._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...userAuth, cartState: cartUpdate }),
    });
  };
  const updateTotalSpend = async (totalSpend) => {
    await fetch(`http://localhost:8005/users/${userAuth._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...userAuth, totalSpend: totalSpend }),
    });
  };

  const updateUserRole = async (updatedUser) => {
    await fetch(`http://localhost:8005/users/updateRole/${updatedUser._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...updatedUser, role: updatedUser.role }),
    });
  };

  const confirmAndAddOrder = async (newOrder) => {
    const newOrderWithDates = newOrder.map((product) => ({
      ...product,
      date: moment().format("MMMM Do YYYY, h:mm:ss a"),
    }));
    const updatedOrders = [...userAuth.orders, newOrderWithDates];
    try {
      const response = await fetch(
        `http://localhost:8005/users/${userAuth._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...userAuth,
            totalSpend: updatedOrders.reduce(calcTotalSpent, 0),
            orders: updatedOrders,
            cartState: [],
          }),
        }
      );
      const updatedUser = await response.json();
      setUserAuth({ ...updatedUser, isLoggedIn: true });
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    userAuth,
    setUserAuth,
    saveCartToDb: saveCartToDb,
    confirmAndAddOrder,
    updateTotalSpend,
    updateUserRole,
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export function useAuthContext() {
  return useContext(authContext);
}
