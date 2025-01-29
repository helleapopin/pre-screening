import React from "react";
import logo from "/workspaces/test-app/testapp/src/assets/images/logo.png"; // Ensure the logo path is correct

function Navbar() {
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
    </div>
  );
}

export default Navbar;
