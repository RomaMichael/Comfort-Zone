import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

export default function ReportAns({ reporty, openChat }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    openChat();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "20px",
          border: "1px solid grey",
          borderRadius: "15px",
          width: "300px",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <img
          src={report.avatar}
          alt="avatar"
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "15px",
          }}
        />
        <div className="date-and-name">
          <p style={{ fontWeight: "700" }}>{report.username}</p>
          <p style={{ fontSize: "14px" }}>{report.date}</p>
        </div>
      </div>
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
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </div>
  );
}
