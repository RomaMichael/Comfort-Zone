import React, { useState, useEffect } from "react";
import { useReport } from "../../../context/ReportProvider";
import { useAuthContext } from "../../../context/AuthProvider";
import { AiFillCloseCircle } from "react-icons/ai";

import "./UserInbox.css";

export default function UserInbox() {
  const { reports, updateReport, setReports } = useReport();
  const { userAuth } = useAuthContext();

  const [responsedReport, setResponsedReport] = useState({});
  const myReports = reports.filter((report) => report.sender === userAuth._id);

  const responsedReports = myReports.filter(
    (report) => report.responsed === true && report.userSeen === false
  );
  console.log(responsedReports);
  const [reportList, setReportList] = useState(responsedReports);
  const [reportsSection, setReportSection] = useState("New");

  const showAll = () => {
    setReportList(myReports);
    console.log(reportList);
    setReportSection("All reports");
  };

  const showNew = () => {
    const responsed = myReports.filter(
      (report) => report.responsed === true && report.userSeen === false
    );
    setReportList(responsed);
    setReportSection("New");
  };
  const showArchive = () => {
    const unResponsed = myReports.filter(
      (report) => report.responsed === true && report.userSeen === true
    );
    setReportList(unResponsed);
    setReportSection("Archive");
  };

  useEffect(() => {
    updateReport(responsedReport);
  }, [responsedReport]);

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

  return (
    <div className="user-inbox">
      <div className="user-inbox-container">
        <div className="reports-list">
          <div className="my-reports">
            <h3>My reports</h3>
            <div className="reports-filters">
              <button
                style={{
                  border: "none",
                  borderRadius: "8px",
                  height: "30px",
                  width: "100px",
                  backgroundColor: "#ADFF2F",
                  fontWeight: "700",
                }}
                onClick={showAll}
              >
                All
              </button>
              <button
                style={{
                  border: "none",
                  borderRadius: "8px",
                  height: "30px",
                  width: "120px",
                  backgroundColor: "yellow",
                  fontWeight: "700",
                }}
                onClick={showNew}
              >
                New answers
              </button>
              <button
                style={{
                  border: "none",
                  borderRadius: "8px",
                  height: "30px",
                  width: "140px",
                  backgroundColor: "#5549FF",
                  fontWeight: "700",
                }}
                onClick={showArchive}
              >
                Archive
              </button>
            </div>
            <h3>{reportsSection}</h3>
            {reportList.map((report, i) => (
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
                borderRadius: "15px",
                width: "300px",
                height: "200px",
                position: "relative",
                top: "130px",
                backgroundColor: "#A9FFFC",
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
              <div
                className="conversation-user-body"
                style={{ paddingLeft: "5px" }}
              >
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
                    ></div>
                  </div>
                ) : (
                  <p
                    style={{
                      color: "red",
                      textAlign: "center",
                      fontWeight: "700",
                    }}
                  >
                    Not answered yet
                  </p>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
