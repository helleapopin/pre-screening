// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Section4() {
//   const navigate = useNavigate();
//   const apiUrl = 'https://obscure-space-cod-q54w6v574v5f9q4q-8080.app.github.dev/api/section4';

//   const [formData, setFormData] = useState({
//     ahppRequired: '',
//     ahppComments: '',
//     ahppAdditionalComments: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(apiUrl, formData);
//       if (response.status === 200) {
//         alert('Data submitted successfully!');
//         navigate('/');
//       } else {
//         alert('Failed to submit data');
//       }
//     } catch (error) {
//       console.error('Error submitting data:', error);
//       alert('An error occurred while submitting the form');
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <button className="btn btn-secondary mb-3" onClick={() => navigate('/')}>
//         Back to Dashboard
//       </button>
//       <h2 className="text-center mb-4">Section 4 - Aquatic Habitat Protection Permit (AHPP)</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label">AHPP Required?</label>
//             <select
//               name="ahppRequired"
//               value={formData.ahppRequired}
//               onChange={handleChange}
//               className="form-control"
//             >
//               <option value="">Select</option>
//               <option value="Yes">Yes</option>
//               <option value="No">No</option>
//             </select>
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Comments on AHPP:</label>
//             <textarea
//               name="ahppComments"
//               value={formData.ahppComments}
//               onChange={handleChange}
//               className="form-control"
//               placeholder="Enter comments..."
//             />
//           </div>
//         </div>
//         <div className="row mb-3">
//           <div className="col-md-12">
//             <label className="form-label">Additional Comments:</label>
//             <textarea
//               name="ahppAdditionalComments"
//               value={formData.ahppAdditionalComments}
//               onChange={handleChange}
//               className="form-control"
//               placeholder="Enter additional comments..."
//             />
//           </div>
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Section4;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; // Import global styles

function Section4() {
    const navigate = useNavigate();
    const apiUrl = 'https://obscure-space-cod-q54w6v574v5f9q4q-8080.app.github.dev/api/section4';

    const [formData, setFormData] = useState({
        ahppRequired: '',
        ahppComments: '',
        ahppAdditionalComments: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(apiUrl, formData);
            if (response.status === 200) {
                alert('Data submitted successfully!');
                navigate('/');
            } else {
                alert('Failed to submit data');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            alert('An error occurred while submitting the form');
        }
    };

    return (
        <div className="section-container">
            {/* Back to Dashboard Button */}
            <button className="btn btn-secondary back-button" onClick={() => navigate('/')}>
                Back to Dashboard
            </button>

            <h2 className="section-title">Section 4 - Aquatic Habitat Protection Permit (AHPP)</h2>

            <form onSubmit={handleSubmit}>
                {/* Row 1: AHPP Required */}
                <div className="row">
                    <div className="field">
                        <label>AHPP Required?</label>
                        <select
                            name="ahppRequired"
                            value={formData.ahppRequired}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>

                {/* Row 2: Comments on AHPP */}
                <div className="row">
                    <div className="field">
                        <label>Comments on AHPP:</label>
                        <textarea
                            name="ahppComments"
                            value={formData.ahppComments}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter comments..."
                        />
                    </div>
                </div>

                {/* Row 3: Additional Comments */}
                <div className="row">
                    <div className="field">
                        <label>Additional Comments:</label>
                        <textarea
                            name="ahppAdditionalComments"
                            value={formData.ahppAdditionalComments}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter additional comments..."
                        />
                    </div>
                </div>
                {/* Button Container */}
                <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "1rem" }}>
                    <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => navigate('/section3')}
                    >
                        Back
                    </button>

                    <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => navigate('/section5')}
                    >
                        Next
                    </button>

                    <button type="submit" className="btn btn-success">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Section4;
