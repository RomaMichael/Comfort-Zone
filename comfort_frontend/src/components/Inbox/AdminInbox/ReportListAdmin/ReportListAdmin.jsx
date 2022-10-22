import React from "react";

export default function ReportList({ reports, unresponsed, openChat }) {
  return (
    <div>
      <div>
        <h2>Unresponsed reports</h2>
        {reports.length ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {unresponsed.map((report) => (
              <div
                key={report._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: !report.seen ? "rgb(6, 255, 6)" : null,
                  border: "1px solid grey",
                  borderRadius: "15px",
                  width: "300px",
                  height: "100px",
                  cursor: "pointer",
                }}
                onClick={() => openChat(report._id)}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <img
                    src={report.avatar}
                    alt="avatar"
                    style={{
                      width: "90px",
                      height: "100px",
                      borderRadius: "15px",
                    }}
                  />
                </div>

                <div className="date-and-name">
                  {!report.seen ? (
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: "700",
                        color: "blue",
                        float: "right",
                        backgroundColor: "yellow",
                        width: "35px",
                        height: "35px",
                        borderRadius: "100px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      New
                    </p>
                  ) : null}
                  <p style={{ fontWeight: "700" }}>{report.username}</p>

                  <p style={{ fontSize: "14px" }}>{report.date}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h1 style={{ textAlign: "center" }}>No new reports</h1>
          </div>
        )}
      </div>
    </div>
  );
}
