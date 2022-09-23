import React from "react";

import { useAuthContext } from "../../context/AuthProvider";
import { useMessages } from "../../context/MessageProvider";

import { useUsers } from "../../context/UsersProvider";
import "./Inbox.css";

export default function Inbox() {
  const { users } = useUsers();
  const { messages } = useMessages();
  const { userAuth } = useAuthContext();

  console.log(messages);
  return (
    <div className="inbox-page">
      {/* <div className="search-users">
        {users.map((user) => (
          <p>{user.username}</p>
        ))}
      </div> */}

      <div className="inbox-container">
        <div className="chats-list">
          {userAuth.isLoggedIn ? (
            <div>
              {" "}
              {messages ? (
                <div>
                  {" "}
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      style={{
                        display: "flex",
                        gap: "25px",
                        border: "1px solid grey",
                      }}
                    >
                      <img
                        src={message.sender.avatar.url}
                        alt="avatar"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "100px",
                        }}
                      />
                      <p style={{ fontWeight: "700" }}>
                        {message.sender.username}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <p>Loading</p>
          )}
        </div>
        <div className="current-chat">
          <div className="conversation-window"></div>
          <div className="input-and-send">
            <button>Send</button>
            <input type="text" />
          </div>
        </div>
      </div>
    </div>
  );
}
