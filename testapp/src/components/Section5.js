import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; // Import global styles

function Section5() {
  const navigate = useNavigate();
  const apiUrl = 'https://obscure-space-cod-q54w6v574v5f9q4q-8080.app.github.dev/api/section5';

  const [formData, setFormData] = useState({
    rareEndangeredSpecies: '',
    speciesComments: '',
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

      <h2 className="section-title">Section 5 - Rare, Endangered, & Identified Species</h2>

      <form onSubmit={handleSubmit}>
        {/* Row 1: Rare or Endangered Species */}
        <div className="row">
          <div className="field">
            <label>Are rare or endangered species present?</label>
            <select
              name="rareEndangeredSpecies"
              value={formData.rareEndangeredSpecies}
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
            <label>Comments (species and mitigation measures):</label>
            <textarea
              name="speciesComments"
              value={formData.speciesComments}
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
            onClick={() => navigate('/section4')}
          >
            Back
          </button>

          <button
            type="button"
            className="btn btn-info"
            onClick={() => navigate('/section6')}
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

export default Section5;
