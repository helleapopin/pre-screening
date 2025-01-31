import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const apiUrl = 'https://fictional-orbit-695pwwpvgqj7c5qrr-8080.app.github.dev/api/register';
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error message when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      await axios.post(apiUrl, formData); // No 'res' variable
      setSuccess("✅ User registered successfully! Redirecting to login...");
      setError("");

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Register</h2>
      {error && <p className="alert alert-danger">{error}</p>}
      {success && <p className="alert alert-success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
      <p className="mt-3 text-center">
        Already have an account? <a href="/login">Login here</a>.
      </p>
    </div>
  );
}

export default Register;