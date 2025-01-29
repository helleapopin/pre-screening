// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Section3() {
//   const navigate = useNavigate();
//   const apiUrl = 'https://obscure-space-cod-q54w6v574v5f9q4q-8080.app.github.dev/api/section3';

//   const [formData, setFormData] = useState({
//     dfoReviewRequired: '',
//     dfoComments: '',
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
//       <h2 className="text-center mb-4">Section 3 - DFO Approval/Request for Review</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label">DFO Review Required?</label>
//             <select
//               name="dfoReviewRequired"
//               value={formData.dfoReviewRequired}
//               onChange={handleChange}
//               className="form-control"
//             >
//               <option value="">Select</option>
//               <option value="Yes">Yes</option>
//               <option value="No">No</option>
//             </select>
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Comments on DFO:</label>
//             <textarea
//               name="dfoComments"
//               value={formData.dfoComments}
//               onChange={handleChange}
//               className="form-control"
//               placeholder="Enter comments..."
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

// export default Section3;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; // Import global styles

function Section3() {
    const navigate = useNavigate();
    const apiUrl = 'https://obscure-space-cod-q54w6v574v5f9q4q-8080.app.github.dev/api/section3';

    const [formData, setFormData] = useState({
        dfoReviewRequired: '',
        dfoComments: '',
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

            <h2 className="section-title">Section 3 - DFO Approval / Request for Review</h2>

            <form onSubmit={handleSubmit}>
                {/* Row 1: DFO Review Required */}
                <div className="row">
                    <div className="field">
                        <label>DFO Review Required?</label>
                        <select
                            name="dfoReviewRequired"
                            value={formData.dfoReviewRequired}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>

                {/* Row 2: Comments */}
                <div className="row">
                    <div className="field">
                        <label>Comments on DFO:</label>
                        <textarea
                            name="dfoComments"
                            value={formData.dfoComments}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter comments..."
                        />
                    </div>
                </div>

                {/* Button Container */}
                <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "1rem" }}>
                    <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => navigate('/section2')}
                    >
                        Back
                    </button>

                    <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => navigate('/section4')}
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

export default Section3;
