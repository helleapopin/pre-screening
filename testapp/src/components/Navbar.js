import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/workspaces/test-app/testapp/src/assets/images/logo.png"; // Ensure correct path

function Navbar({ isAuthenticated, username, email, onLogout }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference for dropdown

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate("/login");
    setDropdownOpen(false);
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
          fontFamily: '"Space Mono", monospace',
          flexGrow: 1,
          textAlign: "center",
        }}
      >
        Pre-Screening App
      </h1>

      {/* Login/Logout and Sign Up Buttons */}
      <div style={{ marginLeft: "auto", display: "flex", gap: "10px", position: "relative" }}>
        {isAuthenticated ? (
          <div className="user-menu" ref={dropdownRef} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Username & Email */}
            <div style={{ textAlign: "right", color: "white", fontSize: "0.9rem", fontFamily: '"Space Mono", monospace' }}>
              <p style={{ margin: "0", fontWeight: "bold" }}>{username}</p>
              <p style={{ margin: "0", opacity: "0.7", fontSize: "0.8rem" }}>{email}</p>
            </div>

            {/* User Icon & Dropdown */}
            <button
              className="btn user-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <span className="user-icon">👤</span> {/* Circle icon */}
            </button>

            {dropdownOpen && (
              <div className="dropdown">
                <p className="dropdown-username">{username}</p>
                <p className="dropdown-email">{email}</p>
                <hr className="dropdown-divider" />
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="btn">
              Login
            </Link>

            <Link to="/register" className="btn-permanent">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
