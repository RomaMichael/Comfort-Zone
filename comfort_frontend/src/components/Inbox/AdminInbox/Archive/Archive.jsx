import React from "react";

export default function Archive({ archive, watchArchive }) {
  return (
    <div>
      <div className="title-archive">
        <h2>Archive</h2>
      </div>

      {archive.map((report) => (
        <div
          key={report._id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid grey",
            borderRadius: "15px",
            width: "300px",
            height: "100px",
            cursor: "pointer",
          }}
          onClick={() => watchArchive(report._id)}
        >
          <div className="date-and-name-archivw">
            {!report.seen ? (
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "blue",
                  float: "right",
                }}
              >
                New
              </p>
            ) : null}
            <p>
              Report from:{" "}
              <span style={{ fontWeight: "700" }}>{report.username}</span>
            </p>

            <p style={{ fontSize: "14px" }}>{report.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
