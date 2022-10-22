import "./App.css";
import Footer from "./components/Footer/Footer";
import Nav from "./components/Nav/Nav";
import Layout from "./components/Layout/Layout";
import { useEffect } from "react";

function App() {
  return (
    <div className="App">
      <Nav />
      <Layout />
      <Footer />
    </div>
  );
}

export default App;
