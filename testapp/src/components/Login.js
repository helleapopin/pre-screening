// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login({ onLogin }) {
//   const apiUrl = 'https://fictional-orbit-695pwwpvgqj7c5qrr-8080.app.github.dev/api/login';
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ identifier: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.identifier || !formData.password) {
//       setError("Username/Email and password are required.");
//       return;
//     }

//     try {
//       const response = await axios.post(apiUrl, formData);
//       localStorage.setItem("token", response.data.token);
//       navigate("/"); // Redirect on successful login
//     } catch (err) {
//       setError("❌ Invalid credentials. Please try again.");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="card">
//         <h2 className="title">Login</h2>
//         {error && <p className="alert alert-danger">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <div className="input-icon">
//               <i className="fas fa-envelope"></i>
//               <input
//                 type="text"
//                 name="identifier"
//                 className="input-field"
//                 placeholder="Enter your email or username"
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>
//           <div className="input-group">
//             <div className="input-icon">
//               <i className="fas fa-lock"></i>
//               <input
//                 type="password"
//                 name="password"
//                 className="input-field"
//                 placeholder="Enter your password"
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>
//           <button type="submit" className="btn">
//             Login
//           </button>
//         </form>
//         <p className="bottom-text">
//           Don't have an account? <a href="/register">Sign up</a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


function Login({ onLogin }) {
  const apiUrl = 'https://fictional-orbit-695pwwpvgqj7c5qrr-8080.app.github.dev/api/login';
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Add Loading State

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // ✅ Auto-navigate when token exists
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(apiUrl, formData);
      console.log("Login API Response:", response.data); // ✅ Debugging

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);

        // ✅ Decode the token to extract user info
        const decodedUser = jwtDecode(response.data.token);
        console.log("Decoded User:", decodedUser); // ✅ Debugging

        const user = {
          username: decodedUser.username,
          email: decodedUser.email,
        };

        // ✅ Store user info
        localStorage.setItem("user", JSON.stringify(user));

        setTimeout(() => {
          setLoading(false);
          onLogin(response.data.token, user);
          navigate("/");
        }, 500);
      } else {
        setError("❌ Invalid response from server.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("❌ Invalid credentials. Please try again.");
      setLoading(false);
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
                type="text"
                name="identifier"
                className="input-field"
                placeholder="Enter your email or username"
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
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
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
