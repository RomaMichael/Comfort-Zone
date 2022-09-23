import React from "react";
import { useAuthContext } from "../../context/AuthProvider";
import "./UserProfile.css";
import { BsPencil } from "react-icons/bs";

export default function UserProfile() {
  const { userAuth } = useAuthContext();
 
  return (
    <div className="user-profile">
      <div className="user-props">
        <div className="user-pic">
          <img src={userAuth.avatar.url} alt="avatar" />
        </div>
        <div className="other-props">
          <div className="name">
            <p>
              Name:{" "}
              <span style={{ color: "blue", fontWeight: "700" }}>
                {userAuth.username}
              </span>
            </p>
            <BsPencil />
          </div>

          <p>
            Email:{" "}
            <span style={{ color: "blue", fontWeight: "700" }}>
              {userAuth.email}
            </span>
          </p>
          <p>
            Status:{" "}
            <span style={{ color: "blue", fontWeight: "700" }}>
              {userAuth.role}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
