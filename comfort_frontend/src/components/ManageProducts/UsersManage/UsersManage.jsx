import React, { useEffect } from "react";
import { useUsers } from "../../../context/UsersProvider";
import "./UsersManage.css";

import UserProps from "../../../MuiBlocks/UserProps";

export default function UsersManage() {
  const { users, getUsers } = useUsers();

  const regularUsers = users.filter(
    (user) => user.role === "user" || user.role === "premium-user"
  );

  useEffect(() => {
    getUsers();
  }, [users]);

  return (
    <div className="users-manage">
      <div className="users-manage-container">
        <div className="users-manage-title">
          {" "}
          <h2>Users manage</h2>
        </div>
        <div className="users-list">
          {regularUsers.map((user) => (
            <div className="each-user" key={user._id}>
              <img src={user.avatar.url} alt="avatar" />
              <p>{user.username}</p>

              <UserProps user={user} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
