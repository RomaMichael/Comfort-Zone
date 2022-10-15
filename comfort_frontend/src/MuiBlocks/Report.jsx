import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useAuthContext } from "../context/AuthProvider";
import { useUsers } from "../context/UsersProvider";
import moment from "moment";
import { useReport } from "../context/ReportProvider";

export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { userAuth } = useAuthContext();
  const { getReports, updateReport } = useReport();

  const [reportToAdmin, setReportToAdmin] = useState({
    sender: userAuth._id,
    current: false,
    report: "",
    seen: false,
    responsed: false,
    date: moment().format("MMMM Do YYYY, h:mm:ss"),
  });

  const sendReport = async (event) => {
    event.preventDefault();
    const formDataMessage = new FormData();
    formDataMessage.append("sender", reportToAdmin.sender);
    formDataMessage.append("current", reportToAdmin.current);
    formDataMessage.append("report", reportToAdmin.report);
    formDataMessage.append("seen", reportToAdmin.seen);
    formDataMessage.append("date", reportToAdmin.date);
    formDataMessage.append("responsed", reportToAdmin.responsed);

    const response = await fetch("http://localhost:8005/reports/send", {
      method: "POST",
      body: formDataMessage,
    });
    const responseMessage = await response.json();
    getReports();
    // updateReports(formDataMessage);
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
            <form onSubmit={sendReport}>
              <h3>Write a message to admin</h3>
              <input
                type="text"
                style={{ width: "400px", height: "40px", borderRadius: "7px" }}
                placeholder="Write a message..."
                onChange={(e) =>
                  setReportToAdmin({
                    ...reportToAdmin,
                    report: e.target.value,
                  })
                }
              />
              <button
                type="submit"
                style={{
                  width: "70px",
                  height: "30px",
                  marginTop: "30px",
                  backgroundColor: "blue",
                  color: "white",
                  border: "none",
                  borderRadius: "7px",
                }}
              >
                Send
              </button>
            </form>
          </div>
        </Typography>
      </Popover>
    </div>
  );
}
