import React, { useState } from "react";
import { useReport } from "../../../context/ReportProvider";
import { useAuthContext } from "../../../context/AuthProvider";
import { AiFillCloseCircle } from "react-icons/ai";
import { useEffect } from "react";

export default function UserInbox() {
  const { reports, updateReport, setReports } = useReport();
  const { userAuth } = useAuthContext();

  const [responsedReport, setResponsedReport] = useState({});

  useEffect(() => {
    updateReport(responsedReport);
  }, [responsedReport]);

  const myReports = reports.filter((report) => report.sender === userAuth._id);

  const openConversation = (reportId) => {
    const currentChatIndex = reports.findIndex(
      (report) => report._id === reportId
    );
    const currentConversation = {
      ...reports[currentChatIndex],
      userCurrent: true,
      userSeen: true,
    };
    setResponsedReport(currentConversation);

    setReports((prevReports) => {
      const updatedReports = [...prevReports];
      updatedReports[currentChatIndex] = currentConversation;
      return updatedReports;
    });
  };

  const closeConversation = () => {
    setResponsedReport((prev) => ({ ...prev, userCurrent: false }));
  };

  const reportToArchive = (reportId) => {
    console.log(reportId);
  };

  return (
    <div className="user-inbox" style={{ height: "100vh" }}>
      <div
        className="user-inbox-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          className="reports-list"
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            className="unresponsed"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <h3>My reports</h3>
            {myReports.map((report, i) => (
              <div
                key={report._id}
                style={{
                  border: "1px solid grey",
                  backgroundColor:
                    !report.userSeen && report.responsed
                      ? "rgb(6, 255, 6)"
                      : null,
                  width: "300px",
                  height: "100px",
                  cursor: "pointer",
                  borderRadius: "8px",
                }}
                onClick={() => openConversation(report._id)}
              >
                {report.responsed ? (
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      color: "blue",
                      float: "right",
                      backgroundColor: "yellow",
                      width: "65px",
                      height: "30px",
                      borderRadius: "100px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Answered
                  </p>
                ) : null}
                <p style={{ fontSize: "14px", fontWeight: "700" }}>
                  Report {i + 1}:
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "blue",
                  }}
                >
                  {report.report}
                </p>
                <p style={{ fontSize: "14px" }}>from: {report.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="conversation">
          {responsedReport.userCurrent ? (
            <div
              style={{
                border: "1px solid black",
                width: "400px",
                height: "200px",
                position: "relative",
                top: "130px",
              }}
            >
              <div
                className="conversation-user-title"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <AiFillCloseCircle
                  style={{ fontSize: "25px" }}
                  onClick={closeConversation}
                />
              </div>
              <div className="conversation-user-body">
                <p>
                  <span style={{ fontWeight: "700" }}>Me:</span>{" "}
                  {responsedReport.report}
                </p>

                {responsedReport.answer ? (
                  <div className="responded-report">
                    <p>
                      <span style={{ fontWeight: "700" }}>Admin:</span>
                      {responsedReport.answer}{" "}
                    </p>
                    <div
                      className="report-to-archive"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "80px",
                      }}
                    >
                      <button
                        style={{
                          backgroundColor: "#ADFF2F",
                          border: "none",
                          width: "100px",
                          height: "30px",
                          borderRadius: "8px",
                        }}
                        onClick={() => reportToArchive(responsedReport._id)}
                      >
                        To archive
                      </button>
                    </div>
                  </div>
                ) : (
                  <p style={{ color: "red" }}>Not answered yet</p>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
