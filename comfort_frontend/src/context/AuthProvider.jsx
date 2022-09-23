import React, { createContext, useContext, useEffect, useState } from "react";

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
    console.log({ user });

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

  const value = { userAuth, setUserAuth, updateCart };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export function useAuthContext() {
  return useContext(authContext);
}
