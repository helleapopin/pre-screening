const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 8080;
const HOST = "0.0.0.0";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection
const connection = mysql.createConnection({
    host: "localhost", // Change if using a different host
    user: "root",      // MySQL username
    password: "admin", // Replace with your actual password
});

connection.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.stack);
        return;
    }
    console.log("Connected to MySQL database!");
});

// Create database
connection.query(`CREATE DATABASE IF NOT EXISTS prescreeningApp`, (error, result) => {
    if (error) {
        console.error("Error creating database:", error);
    } else {
        console.log("Database created or already exists!");
    }
});

// Use the database
connection.query(`USE prescreeningApp`, (error) => {
    if (error) console.error("Error selecting database:", error);
});

// Create "project_location" table
connection.query(
    `CREATE TABLE IF NOT EXISTS Section1 (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        roadName VARCHAR(255) NOT NULL, -- Field for "Road Name"
        startKm DECIMAL(5,2),           -- Field for "Start at km"
        startLatitude DECIMAL(9,6),     -- Field for "Starting Point Latitude"
        startLongitude DECIMAL(9,6),    -- Field for "Starting Point Longitude"
        endKm DECIMAL(5,2),             -- Field for "End Point km"
        endLatitude DECIMAL(9,6),       -- Field for "Ending Point Latitude"
        endLongitude DECIMAL(9,6),      -- Field for "Ending Point Longitude"
        nearestTown VARCHAR(255),       -- Field for "Nearest Town"
        pids VARCHAR(255),              -- Field for "PIDs"
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    )`,
    (error) => {
        if (error) console.error("Error creating projectLocation table:", error);
    }
);




console.log("Database and projectLocation table are set up!");



app.post("/api/section1", (req, res) => {
    console.log("Request received:", req.body); // Debugging log
    const { roadName, startKm, startLatitude, startLongitude, endKm, endLatitude, endLongitude, nearestTown, pids } = req.body;

    // Check for missing fields
    if (!roadName) {
        console.error("Missing roadName in request body.");
        return res.status(400).json({ error: "Road Name is required." });
    }

    // Insert into database
    connection.query(
        "INSERT INTO Section1 (roadName, startKm, startLatitude, startLongitude, endKm, endLatitude, endLongitude, nearestTown, pids) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [roadName, startKm, startLatitude, startLongitude, endKm, endLatitude, endLongitude, nearestTown, pids],
        (err, result) => {
            if (err) {
                console.error("Error inserting into database:", err);
                return res.status(500).json({ error: "Database error." });
            }
            console.log("Data successfully inserted:", result);
            res.status(200).json({ message: "Data submitted successfully!" });
        }
    );
});


// Example endpoint to test connection
app.get("/", (req, res) => {
    res.send("Pre-Screening App Backend is Running!");
});

// Start server
app.listen(PORT, HOST, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
