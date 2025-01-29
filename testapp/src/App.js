import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import Section4 from "./components/Section4";
import Section5 from "./components/Section5";
import Section6 from "./components/Section6";
import Section7 from "./components/Section7";
import Section8 from "./components/Section8";
import Section9 from "./components/Section9";
import Section10 from "./components/Section10";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-report" element={<Layout currentStep={1} component={<Section1 />} />} />
          <Route path="/section2" element={<Layout currentStep={2} component={<Section2 />} />} />
          <Route path="/section3" element={<Layout currentStep={3} component={<Section3 />} />} />
          <Route path="/section4" element={<Layout currentStep={4} component={<Section4 />} />} />
          <Route path="/section5" element={<Layout currentStep={5} component={<Section5 />} />} />
          <Route path="/section6" element={<Layout currentStep={6} component={<Section6 />} />} />
          <Route path="/section7" element={<Layout currentStep={7} component={<Section7 />} />} />
          <Route path="/section8" element={<Layout currentStep={8} component={<Section8 />} />} />
          <Route path="/section9" element={<Layout currentStep={9} component={<Section9 />} />} />
          <Route path="/section10" element={<Layout currentStep={10} component={<Section10 />} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

const Layout = ({ currentStep, component }) => {
  const steps = [
    { title: "Project Location", path: "/create-report" },
    { title: "Fish Passage Design", path: "/section2" },
    { title: "DFO Approval", path: "/section3" },
    { title: "AHPP", path: "/section4" },
    { title: "Endangered Species", path: "/section5" },
    { title: "Sediment Control", path: "/section6" },
    { title: "Cofferdams", path: "/section7" },
    { title: "Forest Permit", path: "/section8" },
    { title: "Impacted Sites", path: "/section9" },
    { title: "Additional Permits", path: "/section10" },
  ];


  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar steps={steps} currentStep={currentStep} />
      <div style={{ flex: 1, padding: "20px" }}>{component}</div>
    </div>
  );
};

export default App;
