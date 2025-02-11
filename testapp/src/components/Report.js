import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
require('jspdf-autotable');

function Report() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [reportData, setReportData] = useState(null);

    useEffect(() => {
        axios.get(`https://fictional-orbit-695pwwpvgqj7c5qrr-8080.app.github.dev/api/submissions/${id}`)
            .then(response => setReportData(response.data))
            .catch(error => {
                console.error("Error fetching submission:", error);
                setReportData(null);
            });
    }, [id]);

    const handleDownloadPDF = () => {
        if (!reportData) return;

        const doc = new jsPDF();
        doc.setFont("helvetica", "bold");
        doc.text(`Prescreening Report (ID: ${reportData.id})`, 20, 20);

        // Define sections as an array for better organization
        const sections = [
            {
                title: "Section 1: General Information", data: [
                    ["Priority", reportData.priority],
                    ["Due Date", new Date(reportData.dueDate).toLocaleDateString()],
                    ["Road Name", reportData.roadName],
                    ["At Km", reportData.atKm],
                    ["Latitude", reportData.latitude],
                    ["Longitude", reportData.longitude],
                    ["Nearest Town", reportData.nearestTown],
                    ["PIDs", reportData.pids]
                ]
            },

            {
                title: "Section 2: Waterbody Information", data: [
                    ["Proximity to Waterbody", reportData.proximityToWaterbody],
                    ["Fish Passage Required", reportData.fishPassageDesignRequired],
                    ["Fish Spawning Windows", reportData.fishSpawningWindows]
                ]
            },

            {
                title: "Section 3: DFO Review", data: [
                    ["DFO Review Required", reportData.dfoReviewRequired],
                    ["DFO Comments", reportData.dfoComments]
                ]
            },

            {
                title: "Section 4: AHPP", data: [
                    ["AHPP Required", reportData.ahppRequired],
                    ["AHPP Comments", reportData.ahppComments],
                    ["AHPP Additional Comments", reportData.ahppAdditionalComments]
                ]
            },

            {
                title: "Section 5: Endangered Species", data: [
                    ["Rare Endangered Species", reportData.rareEndangeredSpecies],
                    ["Species Comments", reportData.speciesComments]
                ]
            },

            {
                title: "Section 6: Erosion Sediment Control", data: [
                    ["Erosion Sediment Control Comments", reportData.erosionSedimentControlComments]
                ]
            },

            {
                title: "Section 7: Cofferdams", data: [
                    ["Cofferdams Comments", reportData.cofferdamsComments]
                ]
            },

            {
                title: "Section 8: Forest Permit", data: [
                    ["In Provincial Forest", reportData.inProvincialForest],
                    ["Forest Product Permit Required", reportData.forestProductPermitRequired],
                    ["Merchantable Timber Permit Required", reportData.merchantableTimberPermitRequired],
                    ["Forest Permit Comments", reportData.forestPermitComments]
                ]
            },

            {
                title: "Section 9: Impacted Sites", data: [
                    ["Impacted Sites Comments", reportData.impactedSitesComments]
                ]
            },

            {
                title: "Section 10: Additional Permits", data: [
                    ["Additional Permits Comments", reportData.additionalPermitsComments]
                ]
            }
        ];

        let y = 30; // Start position

        sections.forEach(section => {
            doc.setFont("helvetica", "bold");
            doc.text(section.title, 20, y);
            y += 5; // Space below title

            doc.autoTable({
                startY: y,
                head: [["Field", "Value"]],
                body: section.data,
                theme: "grid",
                margin: { left: 20 },
                styles: { fontSize: 10 },
                columnStyles: { 0: { fontStyle: "bold" } },
            });

            y = doc.autoTable.previous.finalY + 10; // Move Y down for next section
            if (y > 270) {
                doc.addPage();
                y = 30; // Reset position on new page
            }
        });

        doc.save(`Report_${reportData.id}.pdf`);
    };

    if (!reportData) return <p>Loading report...</p>;

    return (

        <div>
            <div className="report-container">
                <button className="btn btn-secondary back-button" onClick={() => navigate('/')} >
                    ← Back to Dashboard
                </button>

                <button onClick={handleDownloadPDF} className="btn btn-secondary back-button" style={{
                    float: "right", padding: "6px 12px",  // Reduces padding (smaller height & width)
                    fontSize: "14px",     // Smaller text size
                    minWidth: "120px",
                    marginTop: "10px",
                }}>
                    Download PDF
                </button>
                <h2 style={{ textAlign: "center", marginTop: "10px", marginBottom: "20px" }} >Prescreening Report (ID: {reportData.id})</h2>



                {/* Section 1 */}
                <div className="report-section">
                    <h3>Section 1: General Information</h3>
                    <p><strong>Priority:</strong> {reportData.priority}</p>
                    <p><strong>Due Date:</strong> {new Date(reportData.dueDate).toLocaleDateString()}</p>
                    <p><strong>Road Name:</strong> {reportData.roadName}</p>
                    <p><strong>At Km:</strong> {reportData.atKm}</p>
                    <p><strong>Latitude:</strong> {reportData.latitude}</p>
                    <p><strong>Longitude:</strong> {reportData.longitude}</p>
                    <p><strong>Nearest Town:</strong> {reportData.nearestTown}</p>
                    <p><strong>PIDs:</strong> {reportData.pids}</p>
                </div>

                {/* Section 2 */}
                <div className="report-section">
                    <h3>Section 2: Waterbody Information</h3>
                    <p><strong>Proximity to Waterbody:</strong> {reportData.proximityToWaterbody}</p>
                    <p><strong>Fish Passage Required:</strong> {reportData.fishPassageDesignRequired}</p>
                    <p><strong>Fish Spawning Windows:</strong> {reportData.fishSpawningWindows}</p>
                </div>

                {/* Section 3 */}
                <div className="report-section">
                    <h3>Section 3: DFO Review</h3>
                    <p><strong>DFO Review Required:</strong> {reportData.dfoReviewRequired}</p>
                    <p><strong>DFO Comments:</strong> {reportData.dfoComments}</p>
                </div>

                {/* Section 4 */}
                <div className="report-section">
                    <h3>Section 4: AHPP</h3>
                    <p><strong>AHPP Required:</strong> {reportData.ahppRequired}</p>
                    <p><strong>AHPP Comments:</strong> {reportData.ahppComments}</p>
                    <p><strong>AHPP Additional Comments:</strong> {reportData.ahppAdditionalComments}</p>
                </div>

                {/* Section 5 */}
                <div className="report-section">
                    <h3>Section 5: Endangered Species</h3>
                    <p><strong>Rare Endangered Species:</strong> {reportData.rareEndangeredSpecies}</p>
                    <p><strong>Species Comments:</strong> {reportData.speciesComments}</p>
                </div>

                {/* Section 6 */}
                <div className="report-section">
                    <h3>Section 6: Erosion Sediment Control</h3>
                    <p><strong>Erosion Sediment Control Comments:</strong> {reportData.erosionSedimentControlComments}</p>
                </div>

                {/* Section 7 */}
                <div className="report-section">
                    <h3>Section 7: Cofferdams</h3>
                    <p><strong>Cofferdams Comments:</strong> {reportData.cofferdamsComments}</p>
                </div>

                {/* Section 8 */}
                <div className="report-section">
                    <h3>Section 8: Forest Permit</h3>
                    <p><strong>In Provincial Forest:</strong> {reportData.inProvincialForest}</p>
                    <p><strong>Forest Product Permit Required:</strong> {reportData.forestProductPermitRequired}</p>
                    <p><strong>Merchantable Timber Permit Required:</strong> {reportData.merchantableTimberPermitRequired}</p>
                    <p><strong>Forest Permit Comments:</strong> {reportData.forestPermitComments}</p>
                </div>

                {/* Section 9 */}
                <div className="report-section">
                    <h3>Section 9: Impacted Sites</h3>
                    <p><strong>Impacted Sites Comments:</strong> {reportData.impactedSitesComments}</p>
                </div>

                {/* Section 10 */}
                <div className="report-section">
                    <h3>Section 10: Additional Permits</h3>
                    <p><strong>Additional Permits Comments:</strong> {reportData.additionalPermitsComments}</p>
                </div>

                {/* Download PDF Button */}
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <button onClick={handleDownloadPDF} className="btn btn-secondary back-button">
                        Download PDF
                    </button>
                </div>
            </div>
        </div >

    );
}

export default Report;
