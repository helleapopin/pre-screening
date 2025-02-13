import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MySubmissions() {
    const [submissions, setSubmissions] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://fictional-orbit-695pwwpvgqj7c5qrr-8080.app.github.dev/api/my-submissions", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } // ✅ Attach JWT Token
        })
            .then(response => {
                setSubmissions(response.data);
                setError(""); // ✅ Clear error if successful
            })
            .catch(error => {
                console.error("Error fetching submissions:", error);
                setError("❌ Failed to load submissions. Please try again.");
            });
    }, []);

    const handleRowClick = (submissionId) => {
        navigate(`/report/${submissionId}`); // ✅ Navigate to submission details (if implemented)
    };

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">
                My Submissions
            </h2>

            {/* Error Message */}
            {error && <p className="alert alert-danger">{error}</p>}

            {/* Table Section */}
            <div className="table-container">
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Priority</th>
                            <th>Road Name</th>
                            <th>At Km</th>
                            <th>Due Date</th>
                            <th>PIDs</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.length > 0 ? (
                            submissions.map((submission) => (
                                <tr
                                    key={submission.id}
                                    onClick={() => handleRowClick(submission.id)}
                                    style={{ cursor: "pointer", transition: "background 0.2s ease-in-out" }}
                                >
                                    <td>{submission.id}</td>
                                    <td>{submission.priority}</td>
                                    <td>{submission.roadName}</td>
                                    <td>{submission.atKm}</td>
                                    <td>{new Date(submission.dueDate).toLocaleDateString()}</td>
                                    <td>{submission.pids}</td>
                                    <td>{new Date(submission.createdAt).toLocaleString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ textAlign: "center", padding: "20px", fontSize: "1rem", color: "rgba(255,255,255,0.7)" }}>
                                    No submissions found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MySubmissions;
