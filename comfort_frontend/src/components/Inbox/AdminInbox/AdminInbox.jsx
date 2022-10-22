import React, { useState, useEffect, useMemo } from "react";
import { useReport } from "../../../context/ReportProvider";
import "./AdminInbox.css";
import { AiFillCloseCircle } from "react-icons/ai";
import ArchiveAdmin from "./ArchiveAdmin/ArchiveAdmin";
import ReportListAdmin from "./ReportListAdmin/ReportListAdmin";

export default function AdminInbox() {
  const { reports, updateReport, setReports } = useReport();

  const [conversation, setConversation] = useState({});
  const [archiveItem, setArchiveItem] = useState({});
  const [showReports, setShowReports] = useState(true);
  const [showArchive, setShowArchive] = useState(false);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    updateReport(conversation);
  }, [conversation.responsed]);

  const unrespondedReports = useMemo(() => {
    return reports.filter((report) => report.responsed === false);
  }, [reports]);

  const archivedReports = useMemo(() => {
    return reports.filter((report) => report.responsed === true);
  }, [reports]);

  const openChat = (reportId) => {
    const currentChatIndex = reports.findIndex(
      (report) => report._id === reportId
    );
    const currentConversation = {
      ...reports[currentChatIndex],
      current: true,
      seen: true,
    };
    setConversation(currentConversation);

    setReports((prevReports) => {
      const updatedReports = [...prevReports];
      updatedReports[currentChatIndex] = currentConversation;
      return updatedReports;
    });
  };

  const reportsList = () => {
    setShowReports(true);
    setShowArchive(false);
  };
  const archiveList = () => {
    setShowReports(false);
    setShowArchive(true);
  };

  const closeChats = () => {
    setConversation((prev) => ({ ...prev, current: false }));
  };

  const adminResponse = () => {
    setConversation((prev) => ({
      ...prev,
      responsed: true,
      answer: answer,
      current: false,
    }));
    const currentChatIndex = reports.findIndex(
      (report) => report._id === conversation._id
    );
    setReports((prevReports) => {
      const updatedReports = [...prevReports];
      updatedReports[currentChatIndex] = {
        ...updatedReports[currentChatIndex],
        responsed: true,
        answer: answer,
        current: false,
      };
      return updatedReports;
    });
  };

  const watchArchive = (archiveId) => {
    const archiveIndex = archivedReports.findIndex(
      (archive) => archive._id === archiveId
    );
    const currentArchive = { ...archivedReports[archiveIndex], current: true };
    setArchiveItem(currentArchive);
  };

  return (
    <div className="admin-inbox">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          className="buttons-report"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
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
            <div>{}</div>
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
        <div
          className="inbox-container"
          style={{ display: "flex", gap: "50px" }}
        >
          <div
            className="reports-list"
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {showReports ? (
              <ReportListAdmin
                reports={reports}
                unresponsed={unrespondedReports}
                openChat={openChat}
              />
            ) : (
              <ArchiveAdmin
                archive={archivedReports}
                archiveItem={archiveItem}
                watchArchive={watchArchive}
              />
            )}
          </div>

          {conversation.current ? (
            <div
              className="conversation-window"
              style={{
                border: "1px solid grey",
                width: "400px",
              }}
            >
              <div
                className="conversation-title"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  height: "10%",
                }}
              >
                <AiFillCloseCircle
                  onClick={closeChats}
                  style={{ fontSize: "30PX" }}
                />
              </div>
              <div
                className="conversation-body"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",

                  height: "90%",
                }}
              >
                <div className="message">
                  <p>
                    <span style={{ fontWeight: "700" }}>
                      {conversation.username}
                    </span>
                    : {conversation.report}
                  </p>
                  .
                </div>
                <div
                  className="input-and-button-conversation"
                  style={{ display: "flex" }}
                >
                  <input
                    type="text"
                    style={{ width: "70%", height: "30px" }}
                    placeholder="Write a message"
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                  <button
                    style={{
                      width: "30%",
                      height: "35px",
                      border: "none",
                      backgroundColor: "yellowgreen",
                    }}
                    onClick={adminResponse}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
