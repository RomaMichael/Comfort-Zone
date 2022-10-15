import "./App.css";
import Footer from "./components/Footer/Footer";
import Nav from "./components/Nav/Nav";
import Layout from "./components/Layout/Layout";
import { useReport } from "./context/ReportProvider";
import { useEffect } from "react";
import { useAuthContext } from "./context/AuthProvider";
function App() {
  const { getReports, reports, setNewReports, setUnresponsed } = useReport();
  const { userAuth } = useAuthContext();

  useEffect(() => {
    getReports();
    setNewReports(reports.filter((report) => report.seen === false));
    setUnresponsed(reports.filter((report) => report.responsed === false));
    setUnresponsed((prev) =>
      prev.filter((report) => report.sender === userAuth._id)
    );
  }, [userAuth]);

  return (
    <div className="App">
      <Nav />
      <Layout />
      <Footer />
    </div>
  );
}

export default App;
