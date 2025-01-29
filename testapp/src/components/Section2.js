// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Section2() {
//   const navigate = useNavigate();
//   const apiUrl = 'https://obscure-space-cod-q54w6v574v5f9q4q-8080.app.github.dev/api/section2';

//   const [formData, setFormData] = useState({
//     proximityToWaterbody: '',
//     largeBodyFishName: '',
//     smallBodyFishName: '',
//     fishPassageDesignRequired: '',
//     fishSpawningWindows: '',
//     commentsBodiesOfWater: '',
//     additionalComments: '',
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
//       <h2 className="text-center mb-4">Section 2 - Fish Passage Design Requirements</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label">Proximity to Fish-Bearing Waterbody:</label>
//             <input
//               type="text"
//               name="proximityToWaterbody"
//               value={formData.proximityToWaterbody}
//               onChange={handleChange}
//               className="form-control"
//               placeholder="Enter proximity details..."
//             />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Large Body Fish Name:</label>
//             <input
//               type="text"
//               name="largeBodyFishName"
//               value={formData.largeBodyFishName}
//               onChange={handleChange}
//               className="form-control"
//               placeholder="Enter large body fish name..."
//             />
//           </div>
//         </div>
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label">Small Body Fish Name:</label>
//             <input
//               type="text"
//               name="smallBodyFishName"
//               value={formData.smallBodyFishName}
//               onChange={handleChange}
//               className="form-control"
//               placeholder="Enter small body fish name..."
//             />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Fish Passage Design Required?</label>
//             <select
//               name="fishPassageDesignRequired"
//               value={formData.fishPassageDesignRequired}
//               onChange={handleChange}
//               className="form-control"
//             >
//               <option value="">Select</option>
//               <option value="Yes">Yes</option>
//               <option value="No">No</option>
//             </select>
//           </div>
//         </div>
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label">Fish Spawning Windows:</label>
//             <input
//               type="text"
//               name="fishSpawningWindows"
//               value={formData.fishSpawningWindows}
//               onChange={handleChange}
//               className="form-control"
//               placeholder="Enter fish spawning windows..."
//             />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Comments on Bodies of Water:</label>
//             <input
//               type="text"
//               name="commentsBodiesOfWater"
//               value={formData.commentsBodiesOfWater}
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
//               name="additionalComments"
//               value={formData.additionalComments}
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

// export default Section2;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Section2() {
  const navigate = useNavigate();
  const apiUrl = 'https://obscure-space-cod-q54w6v574v5f9q4q-8080.app.github.dev/api/section2';

  const [formData, setFormData] = useState({
    proximityToWaterbody: '',
    largeBodyFishName: '',
    smallBodyFishName: '',
    fishPassageDesignRequired: '',
    fishSpawningWindows: '',
    commentsBodiesOfWater: '',
    additionalComments: '',
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
    <div style={styles.sectionContainer}>
      {/* Back Button */}
      <button
        className="btn btn-secondary"
        style={styles.backButton}
        onClick={() => navigate('/')}
      >
        Back to Dashboard
      </button>

      <h2 style={styles.title}>Section 2 - Fish Passage Design Requirements</h2>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Row 1: Proximity & Large Fish Name */}
        <div style={styles.row}>
          <div style={styles.field}>
            <label>Proximity to Fish-Bearing Waterbody:</label>
            <input
              type="text"
              name="proximityToWaterbody"
              value={formData.proximityToWaterbody}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter proximity details..."
            />
          </div>
          <div style={styles.field}>
            <label>Large Body Fish Name:</label>
            <input
              type="text"
              name="largeBodyFishName"
              value={formData.largeBodyFishName}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter large body fish name..."
            />
          </div>
        </div>

        {/* Row 2: Small Fish Name & Fish Passage Required */}
        <div style={styles.row}>
          <div style={styles.field}>
            <label>Small Body Fish Name:</label>
            <input
              type="text"
              name="smallBodyFishName"
              value={formData.smallBodyFishName}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter small body fish name..."
            />
          </div>
          <div style={styles.field}>
            <label>Fish Passage Design Required?</label>
            <select
              name="fishPassageDesignRequired"
              value={formData.fishPassageDesignRequired}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        {/* Row 3: Fish Spawning Windows & Comments */}
        <div style={styles.row}>
          <div style={styles.field}>
            <label>Fish Spawning Windows:</label>
            <input
              type="text"
              name="fishSpawningWindows"
              value={formData.fishSpawningWindows}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter fish spawning windows..."
            />
          </div>
          <div style={styles.field}>
            <label>Comments on Bodies of Water:</label>
            <input
              type="text"
              name="commentsBodiesOfWater"
              value={formData.commentsBodiesOfWater}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter comments..."
            />
          </div>
        </div>

        {/* Row 4: Additional Comments (Full Width) */}
        <div style={styles.fullWidthField}>
          <label>Additional Comments:</label>
          <textarea
            name="additionalComments"
            value={formData.additionalComments}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter additional comments..."
            rows="3"
          />
        </div>

        {/* Button Container */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "1rem" }}>
          <button
            type="button"
            className="btn btn-info"
            onClick={() => navigate('/create-report')}
          >
            Back
          </button>

          <button
            type="button"
            className="btn btn-info"
            onClick={() => navigate('/section3')}
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

const styles = {
  sectionContainer: {
    padding: '1rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  backButton: {
    marginBottom: '1rem',
  },
  title: {
    marginBottom: '1rem',
    textAlign: 'center',
  },
  row: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    flexWrap: 'wrap',
  },
  field: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '280px',
  },
  fullWidthField: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  submitButton: {
    marginTop: '1rem',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

export default Section2;
