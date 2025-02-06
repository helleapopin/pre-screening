// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "/workspaces/test-app/testapp/src/assets/images/logo.png"; // Ensure correct path

// function Navbar({ isAuthenticated, onLogout }) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     onLogout(); // Call logout handler from App.js
//     navigate("/login"); // Redirect to login
//   };

//   return (
//     <div
//       style={{
//         width: "100%",
//         padding: "10px 20px",
//         display: "flex",
//         alignItems: "center",
//       }}
//     >
//       <img
//         src={logo}
//         alt="Logo"
//         style={{ width: "170px", height: "auto", marginRight: "15px" }}
//       />
//       <h1
//         style={{
//           color: "white",
//           margin: 0,
//           fontSize: "1.6rem",
//           font: ' "Fira Sans", sans-serif',
//           flexGrow: 1, // Ensures the text is centered
//           textAlign: "center",
//         }}
//       >
//         Pre-Screening App
//       </h1>

//       {/* Login/Logout Button */}
//       <div style={{ marginLeft: "auto" }}>
//         {isAuthenticated ? (
//           <button
//             onClick={handleLogout}
//             style={{
//               backgroundColor: "#ff4d4d",
//               color: "white",
//               border: "none",
//               padding: "8px 16px",
//               borderRadius: "4px",
//               cursor: "pointer",
//               fontSize: "1rem",
//             }}
//           >
//             Logout
//           </button>
//         ) : (
//           <Link
//             to="/login"
//             style={{
//               backgroundColor: "#4CAF50",
//               color: "white",
//               padding: "8px 16px",
//               borderRadius: "4px",
//               textDecoration: "none",
//               fontSize: "1rem",
//             }}
//           >
//             Login
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Navbar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/workspaces/test-app/testapp/src/assets/images/logo.png"; // Ensure correct path

function Navbar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Call logout handler from App.js
    navigate("/login"); // Redirect to login
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{ width: "170px", height: "auto", marginRight: "15px" }}
      />
      <h1
        style={{
          color: "#c8d8c5",
          margin: 0,
          fontSize: "1.6rem",
          fontWeight: "bold",
          font: '"Fira Sans", sans-serif',
          flexGrow: 1, // Ensures the text is centered
          textAlign: "center",
        }}
      >
        Pre-Screening App
      </h1>

      {/* Login/Logout and Sign Up Buttons */}
      <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
        {isAuthenticated ? (
          <button className="btn btn-secondary"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                background: "rgba(255, 255, 255, 0.1)", // Glass effect
                backdropFilter: "blur(10px)", // Frosted-glass blur
                WebkitBackdropFilter: "blur(10px)", // Safari support
                color: "white", // White text for better readability
                padding: "10px 20px", // Comfortable padding
                borderRadius: "20px", // Curved edges
                textDecoration: "none",
                fontSize: "1rem",
                fontFamily: '"Fira Sans", sans-serif',
                fontWeight: "600",
                border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border
                transition: "background 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
                e.target.style.boxShadow = "0 4px 10px rgba(255, 255, 255, 0.3)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.1)";
                e.target.style.boxShadow = "none";
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                background: "rgba(255, 255, 255, 0.1)", // Glass effect
                backdropFilter: "blur(10px)", // Frosted-glass blur
                WebkitBackdropFilter: "blur(10px)", // Safari support
                color: "white", // White text for better readability
                padding: "10px 20px", // Comfortable padding
                borderRadius: "20px", // Curved edges
                textDecoration: "none",
                fontSize: "1rem",
                fontFamily: '"Fira Sans", sans-serif',
                fontWeight: "600",
                border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border
                transition: "background 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
                e.target.style.boxShadow = "0 4px 10px rgba(255, 255, 255, 0.3)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.1)";
                e.target.style.boxShadow = "none";
              }}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;