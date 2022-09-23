import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useAuthContext } from "../context/AuthProvider";
import { useUsers } from "../context/UsersProvider";

export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { userAuth } = useAuthContext();
  const { users, isLoadingUsers } = useUsers();

  const admins = users.filter((user) => user.role === "admin");
  console.log(admins);

  const [message, setMessage] = useState({
    sender: { userAuth },
    reciver: { admins },
    message: "",
  });

  const sendReport = async () => {
    const formDataMessage = new FormData();
    formDataMessage.append("sender", JSON.stringify(userAuth));
    formDataMessage.append("reciver", JSON.stringify(message.reciver));
    formDataMessage.append("message", message.message);
    console.log(message);
    const response = await fetch("http://localhost:8005/messages/send", {
      method: "POST",
      body: formDataMessage,
    });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <button className="report-button" onClick={handleClick}>
        Report
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography
          style={{
            width: "500px",
            height: "500px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className="write-a-message"
            style={{
              position: "relative",
              top: "70px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3>Write a message to admin</h3>
            <input
              type="text"
              style={{ width: "400px", height: "40px", borderRadius: "7px" }}
              placeholder="Write a message..."
              onChange={(e) =>
                setMessage((prev) => ({ ...prev, message: e.target.value }))
              }
            />
            <button
              style={{
                width: "70px",
                height: "30px",
                marginTop: "30px",
                backgroundColor: "blue",
                color: "white",
                border: "none",
                borderRadius: "7px",
              }}
              onClick={sendReport}
            >
              Send
            </button>
          </div>
        </Typography>
      </Popover>
    </div>
  );
}
