// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Register() {
//     const apiUrl = 'https://fictional-orbit-695pwwpvgqj7c5qrr-8080.app.github.dev/api/register';
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({ username: "", email: "", password: "" });
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//         setError(""); // Clear error message when user starts typing
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!formData.username || !formData.email || !formData.password) {
//             setError("Username, email, and password are required.");
//             return;
//         }

//         try {
//             await axios.post(apiUrl, formData);
//             setSuccess("✅ User registered successfully! Redirecting to login...");
//             setError("");
//             setTimeout(() => {
//                 navigate("/login");
//             }, 2000);
//         } catch (err) {
//             setError(err.response?.data?.error || "Registration failed. Please try again.");
//             setSuccess("");
//         }
//     };

//     return (
//         <div className="container">
//             <div className="card">
//                 <h2 className="title">Create your account</h2>
//                 {error && <p className="alert alert-danger">{error}</p>}
//                 {success && <p className="alert alert-success">{success}</p>}
//                 <form onSubmit={handleSubmit}>

//                     {/* Username Input */}
//                     <div className="input-group">
//                         <div className="input-icon">
//                             <i className="fas fa-user"></i> {/* Username icon */}
//                             <input
//                                 type="text"
//                                 name="username"
//                                 className="input-field"
//                                 placeholder="Choose a username"
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                     </div>

//                     {/* Email Input */}
//                     <div className="input-group">
//                         <div className="input-icon">
//                             <i className="fas fa-envelope"></i> {/* Email icon */}
//                             <input
//                                 type="email"
//                                 name="email"
//                                 className="input-field"
//                                 placeholder="Enter your email"
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                     </div>

//                     {/* Password Input */}
//                     <div className="input-group">
//                         <div className="input-icon">
//                             <i className="fas fa-lock"></i> {/* Password icon */}
//                             <input
//                                 type="password"
//                                 name="password"
//                                 className="input-field"
//                                 placeholder="Create password"
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                     </div>

//                     <button type="submit" className="btn">Register</button>
//                 </form>
//                 <p className="bottom-text">
//                     Already have an account? <a href="/login">Login here</a>.
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default Register;



import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const apiUrl = 'https://fictional-orbit-695pwwpvgqj7c5qrr-8080.app.github.dev/api/register';
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(""); // Clear error message when user starts typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password) {
            setError("Username, email, and password are required.");
            return;
        }

        try {
            await axios.post(apiUrl, formData);
            setSuccess("✅ Registration successful! Your account is pending admin approval. You will receive an email once approved.");
            setError("");

            // Prevent redirecting to login since the user is pending approval
            setTimeout(() => {
                navigate("/"); // Redirect to homepage or a "Waiting for Approval" page
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.error || "Registration failed. Please try again.");
            setSuccess("");
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2 style={{
                    fontFamily: '"system-ui", sans-serif',
                    fontSize: "1.8rem",
                    fontWeight: "bold",
                    marginBottom: "30px",
                    color: "white"
                }}>
                    Create your account
                </h2>
                {error && <p className="alert alert-danger">{error}</p>}
                {success && <p className="alert alert-success">{success}</p>}
                <form onSubmit={handleSubmit}>

                    {/* Username Input */}
                    <div className="input-group">
                        <div className="input-icon">
                            <i className="fas fa-user"></i> {/* Username icon */}
                            <input
                                type="text"
                                name="username"
                                className="input-field"
                                placeholder="Choose a username"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="input-group">
                        <div className="input-icon">
                            <i className="fas fa-envelope"></i> {/* Email icon */}
                            <input
                                type="email"
                                name="email"
                                className="input-field"
                                placeholder="Enter your email"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="input-group">
                        <div className="input-icon">
                            <i className="fas fa-lock"></i> {/* Password icon */}
                            <input
                                type="password"
                                name="password"
                                className="input-field"
                                placeholder="Create password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn">Register</button>
                </form>
                <p className="bottom-text">
                    Already have an account? <a href="/login">Login here</a>.
                </p>
            </div>
        </div>
    );
}

export default Register;
