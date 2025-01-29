import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; // Import global styles

function Section7() {
  const navigate = useNavigate();
  const apiUrl = 'https://obscure-space-cod-q54w6v574v5f9q4q-8080.app.github.dev/api/section7';

  const [formData, setFormData] = useState({
    cofferdamsComments: '',
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

      <h2 className="section-title">Section 7 - Cofferdams</h2>

      <form onSubmit={handleSubmit}>
        {/* Row 1: Comments */}
        <div className="row">
          <div className="field">
            <label>Cofferdams Comments:</label>
            <textarea
              name="cofferdamsComments"
              value={formData.cofferdamsComments}
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
            onClick={() => navigate('/section6')}
          >
            Back
          </button>

          <button
            type="button"
            className="btn btn-info"
            onClick={() => navigate('/section8')}
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

export default Section7;
