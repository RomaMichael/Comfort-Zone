import React, { createContext, useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

const statisticContext = createContext();

export function StatisticProvider({ children }) {
  const [statistic, setStatistic] = useState([]);

  const getStats = async () => {
    const response = await fetch("http://localhost:8005/statistic");
    const stats = await response.json();
    setStatistic(stats);
  };

  useEffect(() => {
    getStats();
  }, []);

  const value = { statistic, getStats };
  return (
    <statisticContext.Provider value={value}>
      {children}
    </statisticContext.Provider>
  );
}

export function useStatistic() {
  return useContext(statisticContext);
}
