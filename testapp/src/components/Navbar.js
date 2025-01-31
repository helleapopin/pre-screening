// import React from "react";
// import logo from "/workspaces/test-app/testapp/src/assets/images/logo.png"; // Ensure the logo path is correct

// function Navbar() {
//   return (
//     <div
//       style={{
//         backgroundColor: "#0b6623",
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
//           fontSize: "1.8rem",
//           fontFamily: "serif",
//           flexGrow: 1, // Ensures the text is centered
//           textAlign: "center",
//         }}
//       >
//         Pre-Screening App in Development :)
//       </h1>
//     </div>
//   );
// }

// export default Navbar;
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/workspaces/test-app/testapp/src/assets/images/logo.png"; // Ensure the logo path is correct

function Navbar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Call the logout handler from App.js
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div
      style={{
        backgroundColor: "#0b6623",
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
          color: "white",
          margin: 0,
          fontSize: "1.8rem",
          fontFamily: "serif",
          flexGrow: 1, // Ensures the text is centered
          textAlign: "center",
        }}
      >
        Pre-Screening App in Development :)
      </h1>

      {/* Login/Logout Button */}
      <div style={{ marginLeft: "auto" }}>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#ff4d4d",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "8px 16px",
              borderRadius: "4px",
              textDecoration: "none",
              fontSize: "1rem",
            }}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;