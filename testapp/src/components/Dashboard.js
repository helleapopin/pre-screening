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
    <div style={styles.dashboardContainer}>
      {/* Header Section with Title & Button */}
      <div style={styles.header}>
        <h2 style={styles.title}>Project Processes</h2>
        <button style={styles.newProcessButton} onClick={handleStartNewProcess}>
          Start New Process
        </button>
      </div>

      {/* Search Bar */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by subject..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={styles.searchInput}
        />
        <button style={styles.searchButton}>Search</button>
      </div>

      {/* Table Section */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
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

const styles = {
  dashboardContainer: {
    backgroundColor: "#f0f0f0", // Light gray background
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "95%",
    margin: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between", // Aligns title on left, button on right
    alignItems: "center",
    marginBottom: "15px",
  },
  title: {
    margin: 0,
  },
  searchContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },
  searchInput: {
    padding: "8px",
    flexGrow: 1,
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  searchButton: {
    padding: "8px 12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  tableContainer: {
    overflowX: "auto",
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "8px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  newProcessButton: {
    padding: "10px 15px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Dashboard;
