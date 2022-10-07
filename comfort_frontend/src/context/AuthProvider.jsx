import React, { createContext, useContext, useEffect, useState } from "react";
import moment from "moment";

const authContext = createContext();

export const defaultAuth = {
  isLoggedIn: false,
  cartState: [],
};

export function AuthProvider({ children }) {
  const [userAuth, setUserAuth] = useState(defaultAuth);
  console.log(userAuth);

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

  const updateCart = async (cartUpdate) => {
    await fetch(`http://localhost:8005/users/${userAuth._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...userAuth, cartState: cartUpdate }),
    });
  };

  const confirm = async (user) => {
    try {
      const response = await fetch(
        `http://localhost:8005/users/${userAuth._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...user,
            totalSpend: 0,
            orders: [
              ...user.orders,
              userAuth.cartState.map((product) => ({
                ...product,

                date: moment().format("MMMM Do YYYY, h:mm:ss a"),
              })),
            ],
            cartState: [],
          }),
        }
      );
      const updatedOrder = await response.json();

      setUserAuth(updatedOrder);
      checkAuth();
    } catch (error) {
      console.log(error);
    }
  };

  const value = { userAuth, setUserAuth, updateCart, confirm };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export function useAuthContext() {
  return useContext(authContext);
}
