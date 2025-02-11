import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Review() {
    const navigate = useNavigate();
    const [reviewData, setReviewData] = useState(() => {
        const savedData = localStorage.getItem('reviewData');
        return savedData ? JSON.parse(savedData) : null;
    });

    const apiUrl = 'https://fictional-orbit-695pwwpvgqj7c5qrr-8080.app.github.dev/api/submit';

    const handleSubmit = async () => {
        try {
            const response = await axios.post(apiUrl, reviewData, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 200 && response.data.id) {
                alert('Report submitted and emailed successfully!');
                localStorage.removeItem('reviewData');
                navigate(`/report/${response.data.id}`); // Redirect to report with actual ID
            } else {
                alert('Failed to submit report.');
            }
        } catch (error) {
            console.error('Error submitting report:', error);
            alert('An error occurred while submitting.');
        }
    };

    if (!reviewData) return <p>Loading review...</p>;

    return (
        <div className="report-container">
            <h2 style={{ textAlign: "center", marginTop: "10px", marginBottom: "35px" }} >Review Your Report Before Submission</h2>

            {/* Section 1 */}
            <div className="report-section">
                <h3>Section 1: General Information</h3>
                <p><strong>Priority:</strong> {reviewData.priority}</p>
                <p><strong>Due Date:</strong> {new Date(reviewData.dueDate).toLocaleDateString()}</p>
                <p><strong>Road Name:</strong> {reviewData.roadName}</p>
                <p><strong>At Km:</strong> {reviewData.atKm}</p>
                <p><strong>Latitude:</strong> {reviewData.latitude}</p>
                <p><strong>Longitude:</strong> {reviewData.longitude}</p>
                <p><strong>Nearest Town:</strong> {reviewData.nearestTown}</p>
                <p><strong>PIDs:</strong> {reviewData.pids}</p>
            </div>

            {/* Section 2 */}
            <div className="report-section">
                <h3>Section 2: Waterbody Information</h3>
                <p><strong>Proximity to Waterbody:</strong> {reviewData.proximityToWaterbody}</p>
                <p><strong>Fish Passage Required:</strong> {reviewData.fishPassageDesignRequired}</p>
                <p><strong>Fish Spawning Windows:</strong> {reviewData.fishSpawningWindows}</p>
            </div>

            {/* Section 3 */}
            <div className="report-section">
                <h3>Section 3: DFO Review</h3>
                <p><strong>DFO Review Required:</strong> {reviewData.dfoReviewRequired}</p>
                <p><strong>DFO Comments:</strong> {reviewData.dfoComments}</p>
            </div>

            {/* Section 4 */}
            <div className="report-section">
                <h3>Section 4: AHPP</h3>
                <p><strong>AHPP Required:</strong> {reviewData.ahppRequired}</p>
                <p><strong>AHPP Comments:</strong> {reviewData.ahppComments}</p>
                <p><strong>AHPP Additional Comments:</strong> {reviewData.ahppAdditionalComments}</p>
            </div>

            {/* Section 5 */}
            <div className="report-section">
                <h3>Section 5: Endangered Species</h3>
                <p><strong>Rare Endangered Species:</strong> {reviewData.rareEndangeredSpecies}</p>
                <p><strong>Species Comments:</strong> {reviewData.speciesComments}</p>
            </div>

            {/* Section 6 */}
            <div className="report-section">
                <h3>Section 6: Erosion Sediment Control</h3>
                <p><strong>Erosion Sediment Control Comments:</strong> {reviewData.erosionSedimentControlComments}</p>
            </div>

            {/* Section 7 */}
            <div className="report-section">
                <h3>Section 7: Cofferdams</h3>
                <p><strong>Cofferdams Comments:</strong> {reviewData.cofferdamsComments}</p>
            </div>

            {/* Section 8 */}
            <div className="report-section">
                <h3>Section 8: Forest Permit</h3>
                <p><strong>In Provincial Forest:</strong> {reviewData.inProvincialForest}</p>
                <p><strong>Forest Product Permit Required:</strong> {reviewData.forestProductPermitRequired}</p>
                <p><strong>Merchantable Timber Permit Required:</strong> {reviewData.merchantableTimberPermitRequired}</p>
                <p><strong>Forest Permit Comments:</strong> {reviewData.forestPermitComments}</p>
            </div>

            {/* Section 9 */}
            <div className="report-section">
                <h3>Section 9: Impacted Sites</h3>
                <p><strong>Impacted Sites Comments:</strong> {reviewData.impactedSitesComments}</p>
            </div>

            {/* Section 10 */}
            <div className="report-section">
                <h3>Section 10: Additional Permits</h3>
                <p><strong>Additional Permits Comments:</strong> {reviewData.additionalPermitsComments}</p>
            </div>
            {/* Display Uploaded Images */}
            {reviewData.images && reviewData.images.length > 0 && (
                <div className="report-section">
                    <h3>Uploaded Images</h3>
                    <div className="image-preview-container">
                        {reviewData.images.map((image, index) => (
                            <img key={index} src={image} alt={`Uploaded ${index}`} className="image-preview" />
                        ))}
                    </div>
                </div>
            )}


            {/* Action Buttons */}
            <div className="button-container">
                <button className="btn btn-success" onClick={handleSubmit}>Submit & Email</button>
                <button className="btn btn-warning" onClick={() => navigate(-1)}>Edit Report</button>
            </div>
        </div>
    );
}

export default Review;
