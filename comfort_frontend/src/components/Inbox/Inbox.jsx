import React, { useEffect, useState } from "react";
import { useAdminContext } from "../../context/AdminProvider";
import { useAuthContext } from "../../context/AuthProvider";
import { useReport } from "../../context/ReportProvider";
import { useUsers } from "../../context/UsersProvider";

import "./Inbox.css";

export default function Inbox() {
  const { reports, getMessages } = useReport();
  const { adminAuth } = useAdminContext();
  const { users } = useUsers();
  const { userAuth } = useAuthContext();
  const [usersListState, setUsersListState] = useState(false);
  useEffect(() => {
    getMessages();
  }, []);

  const usersChat = users.filter((user) => user._id !== userAuth._id);

  const showUsers = () => {
    setUsersListState(!usersListState);
  };

  return (
    <div className="inbox-page">
      <div>
        <div className="button-users-container">
          <button className="show-users-button" onClick={showUsers}>
            Users List
          </button>
        </div>
      </div>
      {usersListState ? (
        <div className="search-users" style={{ display: "flex", gap: "20px" }}>
          {usersChat.map((user) => (
            <div>
              <img
                src={user.avatar.url}
                alt="avatar"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "100px",
                }}
              />
              <p>{user.username}</p>
            </div>
          ))}
        </div>
      ) : null}

      <div className="inbox-container">
        <div className="chats-list">
          {adminAuth ? (
            <div>
              {" "}
              {reports ? (
                <div>
                  {" "}
                  {reports.map((report, i) => (
                    <div
                      key={report._id}
                      style={{
                        display: "flex",
                        gap: "25px",
                        border: "1px solid grey",
                      }}
                    >
                      <img
                        src={report.avatar}
                        alt="avatar"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "100px",
                        }}
                      />
                      <p style={{ fontWeight: "700" }}>{report.username}</p>
                      <p>{report.report}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
        <div className="current-chat">
          {/* <div className="conversation-window">   <div className="input-and-send">
           <button>Send</button>
           <input type="text" />
         </div></div> */}
        </div>
      </div>
    </div>
  );
}
