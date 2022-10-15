import React, { useState } from "react";
import { useReport } from "../../../context/ReportProvider";
import { useAuthContext } from "../../../context/AuthProvider";

export default function UserInbox() {
  const { reports } = useReport();
  const { userAuth } = useAuthContext();

  const [showReports, setShowReports] = useState(true);
  const [showArchive, setShowArchive] = useState(false);

  const myReports = reports.filter((report) => report.sender === userAuth._id);

  const reportsList = () => {
    setShowReports(true);
    setShowArchive(false);
  };
  const archiveList = () => {
    setShowReports(false);
    setShowArchive(true);
  };

  return (
    <div className="user-inbox" style={{ height: "100vh" }}>
      <div
        className="buttons-report"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "35px",
        }}
      >
        {showReports ? (
          <div>{null}</div>
        ) : (
          <button
            onClick={reportsList}
            style={{
              border: "none",
              borderRadius: "15px",
              color: "white",
              backgroundColor: "blue",
              height: "40px",
            }}
          >
            Show reports
          </button>
        )}
        {showArchive ? (
          <div>{null}</div>
        ) : (
          <button
            onClick={archiveList}
            style={{
              border: "none",
              borderRadius: "15px",
              color: "black",
              backgroundColor: "yellowgreen",
              height: "40px",
            }}
          >
            Show archive
          </button>
        )}
      </div>
      {showReports ? (
        <div
          className="reports-list"
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="unresponsed">
            <h3>My reports</h3>
            {myReports.map((report, i) => (
              <div
                key={report._id}
                style={{
                  border: "1px solid grey",
                  width: "300px",
                  height: "100px",
                  cursor: "pointer",
                }}
              >
                <p style={{ fontSize: "14px" }}>Report {i + 1}:</p>
                <p
                  style={{ fontSize: "14px", fontWeight: "700", color: "blue" }}
                >
                  {report.report}
                </p>
                <p style={{ fontSize: "14px" }}>from: {report.date}</p>
              </div>
            ))}
          </div>
          <div className="responsed"></div>
        </div>
      ) : null}
    </div>
  );
}
