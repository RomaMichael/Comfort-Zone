import React, { createContext, useContext, useEffect, useState } from "react";

const ReportContext = createContext();

export function ReportProvider({ children }) {
  const [reports, setReports] = useState([]);

  const getMessages = async () => {
    const response = await fetch("http://localhost:8005/reports");
    const resReport = await response.json();

    setReports(resReport);
  };

  const value = { reports, getMessages };
  return (
    <ReportContext.Provider value={value}>{children}</ReportContext.Provider>
  );
}

export function useReport() {
  return useContext(ReportContext);
}
