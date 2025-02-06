import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStartNewProcess = () => {
    navigate("/create-report");
  };

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <div className="dashboard-header">
        <h2 className="dashboard-title">Project Processes</h2>
        <button className="new-process-button" onClick={handleStartNewProcess}>
          Start New Process
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <input
          id="searchbox"
          type="text"
          placeholder="Search by subject..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button className="search-button">Search</button>
      </div>

      {/* Table Section */}
      <div className="table-container">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Instance</th>
              <th>State</th>
              <th>Subject</th>
              <th>Step</th>
              <th>In Step Since</th>
              <th>Status</th>
              <th>Responsible Actors</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>LDS - 1</td>
              <td>Open Priority</td>
              <td>Environmental Specialist</td>
              <td>Dec 7, 2023</td>
              <td>Submitted</td>
              <td>Farzad, Shiv, Trevor</td>
            </tr>
            <tr>
              <td>LDS - 2</td>
              <td>Open High Priority</td>
              <td>Environmental Manager Review</td>
              <td>Dec 7, 2023</td>
              <td>Submitted</td>
              <td>Trevor, Elaine</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
