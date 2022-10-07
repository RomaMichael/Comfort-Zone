import React, { createContext, useContext, useEffect, useState } from "react";

const UsersContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  const getUsers = async () => {
    const response = await fetch("http://localhost:8005/users");
    const resUsers = await response.json();
    setUsers(resUsers);
    setIsLoadingUsers(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const value = { users, isLoadingUsers };
  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
}

export function useUsers() {
  return useContext(UsersContext);
}
