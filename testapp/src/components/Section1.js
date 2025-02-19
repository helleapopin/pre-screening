import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Section1() {
  const navigate = useNavigate();
  const apiUrl = 'https://fictional-orbit-695pwwpvgqj7c5qrr-8080.app.github.dev/api/section1';

  // Load saved draft when the page loads
  const [formData, setFormData] = useState(() => {
    const savedDraft = localStorage.getItem('section1Draft');
    return savedDraft ? JSON.parse(savedDraft) : {
      priority: 'Low', // Default value for priority
      dueDate: '',
      roadName: '',
      atKm: '',
      latitude: '',
      longitude: '',
      nearestTown: '',
      pids: '',
    };
  });

  // Save draft whenever user types
  useEffect(() => {
    localStorage.setItem('section1Draft', JSON.stringify(formData));
  }, [formData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await axios.post(apiUrl, formData);
      if (response.status === 200) {
        alert('Data submitted successfully!');
        localStorage.removeItem('section1Draft'); // Clear draft after submission
        navigate('/'); // Redirect to dashboard after submission
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
      {/* Back to Dashboard Button */}
      <button className="btn btn-secondary" style={styles.backButton} onClick={() => navigate('/')}>
        Back to Dashboard
      </button>

      <h2 style={styles.title}>Section 1 - Project Location</h2>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Row 1: Priority & Due Date */}
        <div style={styles.row}>
          <div style={styles.field}>
            <label>Priority:</label>
            <select name="priority" value={formData.priority} onChange={handleChange} className="form-control">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div style={styles.field}>
            <label>Due Date:</label>
            <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className="form-control" />
          </div>
        </div>

        {/* Row 2: Road Name & At Km */}
        <div style={styles.row}>
          <div style={styles.field}>
            <label>Road Name:</label>
            <input type="text" name="roadName" value={formData.roadName} onChange={handleChange} className="form-control" placeholder="Enter road name..." />
          </div>
          <div style={styles.field}>
            <label>At Km:</label>
            <input type="text" name="atKm" value={formData.atKm} onChange={handleChange} className="form-control" placeholder="e.g. 4.87" />
          </div>
        </div>

        {/* Row 3: Latitude & Longitude */}
        <div style={styles.row}>
          <div style={styles.field}>
            <label>Latitude:</label>
            <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} className="form-control" placeholder="e.g. 51.7609" />
          </div>
          <div style={styles.field}>
            <label>Longitude:</label>
            <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} className="form-control" placeholder="e.g. -103.9029" />
          </div>
        </div>

        {/* Row 4: Nearest Town & PIDs */}
        <div style={styles.row}>
          <div style={styles.field}>
            <label>Nearest Town:</label>
            <input type="text" name="nearestTown" value={formData.nearestTown} onChange={handleChange} className="form-control" placeholder="Enter town name..." />
          </div>
          <div style={styles.field}>
            <label>PIDs:</label>
            <input type="text" name="pids" value={formData.pids} onChange={handleChange} className="form-control" placeholder="e.g. CUL238114" />
          </div>
        </div>

        {/* Button Container */}
        <div style={styles.buttonContainer}>
          <button type="button" className="btn btn-primary" onClick={() => navigate('/section2')}>
            Next
          </button>
          <button type="submit" className="btn btn-success">Submit</button>
        </div>
      </form>
    </div>
  );
}

// Styles
const styles = {
  sectionContainer: {
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.1)', // Transparent glass effect
    backdropFilter: 'blur(15px)', // Frosted-glass blur
    WebkitBackdropFilter: 'blur(15px)', // Safari support
    borderRadius: '20px',
    border: '2px solid rgba(255, 255, 255, 0.2)', // Subtle border
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)', // Soft shadow
    color: 'white', // Ensure text is readable on the glass background
    maxWidth: '95%',
    margin: '40px auto 0',
    overflow: 'hidden',
  },
  backButton: {
    marginBottom: '1rem',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1rem',
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
    minWidth: '220px',
  },
  buttonContainer: {
    display: "",
    justifyContent: 'center',  // Centers buttons
    gap: '10px', // Adds spacing between buttons
    marginTop: '1rem',
  },
};

export default Section1;
