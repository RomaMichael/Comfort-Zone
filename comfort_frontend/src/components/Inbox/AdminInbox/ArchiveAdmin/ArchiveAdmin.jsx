import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useAuthContext } from "../../../../context/AuthProvider";

export default function Archive({
  archive,
  watchArchive,
  archiveItem,
  closeArchive,
}) {
  const { userAuth } = useAuthContext();
  return (
    <div
      className="archive"
      style={{
        display: "flex",
      }}
    >
      {/* <div className="title-archive">
        <h2>Archive</h2>
      </div> */}
      <div
        className="archive-container"
        style={{
          width: "50vw",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
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
              backgroundColor: "grey",
            }}
            onClick={() => watchArchive(report._id)}
          >
            <div className="date-and-name-archive">
              <p>
                Report from:{" "}
                <span style={{ fontWeight: "700" }}>{report.username}</span>
              </p>

              <p style={{ fontSize: "14px" }}>{report.date}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="archive-window">
        {archiveItem.current ? (
          <div
            style={{
              width: "500px",
              height: "150px",
              border: "1px solid grey",
            }}
          >
            <div
              className="archive-title"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                height: "10%",
              }}
            >
              <AiFillCloseCircle
                style={{ fontSize: "30PX" }}
                onClick={closeArchive}
              />
            </div>
            <div className="archive-body">
              <p>
                <span style={{ fontWeight: "700" }}>
                  {archiveItem.username}
                </span>
                : {archiveItem.report}
              </p>
              <p>
                <span style={{ fontWeight: "700" }}>{userAuth.username}</span>:{" "}
                {archiveItem.answer}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
