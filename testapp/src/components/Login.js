// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login({ onLogin }) {
//     const apiUrl = 'https://fictional-orbit-695pwwpvgqj7c5qrr-8080.app.github.dev/api/login';
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         apiUrl,
//         formData
//       );
//       console.log("Login response:", res.data); // Debugging log
//       localStorage.setItem("token", res.data.token); // Store token
//       onLogin(res.data.token); // Notify App.js of login
//       console.log("Redirecting to dashboard..."); // Debugging log
//       navigate("/"); // Redirect to dashboard
//     } catch (err) {
//       console.error("Login error:", err.response?.data || err.message); // Debugging log
//       setError(err.response?.data?.error || "Login failed");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center">Login</h2>
//       {error && <p className="alert alert-danger">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             className="form-control"
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label>Password:</label>
//           <input
//             type="password"
//             name="password"
//             className="form-control"
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary w-100">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const apiUrl = 'https://fictional-orbit-695pwwpvgqj7c5qrr-8080.app.github.dev/api/login';
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(apiUrl, formData);
      localStorage.setItem("token", res.data.token);
      onLogin(res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Login</h2>
        {error && <p className="alert alert-danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-icon">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="email"
                className="input-field"
                placeholder="Email"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="input-group">
            <div className="input-icon">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                className="input-field"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
        <p className="bottom-text">
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;