import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthProvider";

const ReportContext = createContext();

export function ReportProvider({ children }) {
  const [reports, setReports] = useState([]);
  const [unresponsed, setUnresponsed] = useState([]);
  const { userAuth } = useAuthContext();

  const getReports = async () => {
    const response = await fetch("http://localhost:8005/reports");
    const resReport = await response.json();

    setReports(resReport);
    setUnresponsed(
      reports.filter(
        (report) => report.responsed === false && report.sender === userAuth._id
      )
    );
  };

  const updateReport = async (report) => {
    await fetch(`http://localhost:8005/reports/update/${report._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(report),
    });
  };

  const answerToResponse = async (report) => {
    await fetch(`http://localhost:8005/reports/answer/${report._id}`);
  };

  const value = {
    reports,
    getReports,
    newReports: reports.filter((report) => report.seen === false),
    setUnresponsed,
    unresponsed,
    updateReport,
    setReports,
    answerToResponse,
  };
  return (
    <ReportContext.Provider value={value}>{children}</ReportContext.Provider>
  );
}

export function useReport() {
  return useContext(ReportContext);
}
