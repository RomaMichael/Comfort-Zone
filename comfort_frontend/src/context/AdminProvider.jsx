import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthProvider";

const adminContext = createContext();

export function AdminProvider({ children }) {
  const [adminAuth, setAdminAuth] = useState(false);
  const { userAuth } = useAuthContext();

  const checkAdmin = async () => {
   
    const response = await fetch("http://localhost:8005/users/check-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userAuth),
      credentials: "include",
    });
    const user = await response.json();

    if (user._doc.role === "admin") {
    
      setAdminAuth(true);
    } else {
     
      setAdminAuth(false);
    }
    return user;
  };

  useEffect(() => {
    checkAdmin();
  }, [userAuth]);

  const value = { adminAuth, setAdminAuth };
  return (
    <adminContext.Provider value={value}>{children}</adminContext.Provider>
  );
}

export function useAdminContext() {
  return useContext(adminContext);
}
