require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");

const PORT = 8080;
const HOST = "0.0.0.0";
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 🔹 Database Connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "prescreeningApp", // Add this line
});



connection.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err.stack);
        process.exit(1); // Exit the process if the connection fails
    }
    console.log("✅ Connected to MySQL database!");
});

// 🔹 Create Database
connection.query(`CREATE DATABASE IF NOT EXISTS prescreeningApp`, (error, result) => {
    if (error) {
        console.error("❌ Error creating database:", error);
    } else {
        console.log("✅ Database created or already exists!");
    }
});

connection.query(`USE prescreeningApp`, (error) => {
    if (error) console.error("❌ Error selecting database:", error);
});

// 🔹 Create Users Table (For Authentication)
connection.query(
    `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    )`,
    (error) => {
        if (error) console.error("❌ Error creating users table:", error);
    }
);

// 🔹 Create Section1 Table
// 🔹 Create ProjectSubmissions Table (NEW)
connection.query(
    `CREATE TABLE IF NOT EXISTS ProjectSubmissions (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,

        -- Section 1 Fields
        priority VARCHAR(50) NOT NULL,
        dueDate DATE NOT NULL,
        roadName VARCHAR(255) NOT NULL,
        atKm DECIMAL(5,2),
        latitude DECIMAL(11,6),
        longitude DECIMAL(11,6),
        nearestTown VARCHAR(255),
        pids VARCHAR(255),

        -- Section 2 Fields
        proximityToWaterbody VARCHAR(255),
        largeBodyFishName VARCHAR(255),
        smallBodyFishName VARCHAR(255),
        fishPassageDesignRequired VARCHAR(50),
        fishSpawningWindows VARCHAR(255),
        commentsBodiesOfWater TEXT,
        additionalComments TEXT,

        -- Section 3 Fields
        dfoReviewRequired VARCHAR(50),
        dfoComments TEXT,

        -- Section 4 Fields
        ahppRequired VARCHAR(50),
        ahppComments TEXT,
        ahppAdditionalComments TEXT,

        -- Section 5 Fields
        rareEndangeredSpecies VARCHAR(50),
        speciesComments TEXT,

        -- Section 6 Fields
        erosionSedimentControlComments TEXT,

        -- Section 7 Fields
        cofferdamsComments TEXT,

        -- Section 8 Fields
        inProvincialForest VARCHAR(50),
        forestProductPermitRequired VARCHAR(50),
        merchantableTimberPermitRequired VARCHAR(50),
        forestPermitComments TEXT,

        -- Section 9 Fields
        impactedSitesComments TEXT,

        -- Section 10 Fields
        additionalPermitsComments TEXT,

        isDraft BOOLEAN DEFAULT TRUE,  
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    )`,
    (error) => {
        if (error) console.error("❌ Error creating ProjectSubmissions table:", error);
        else console.log("✅ ProjectSubmissions table is set up!");
    }
);


console.log("✅ Database and tables are set up!");

app.get("/api/submissions", (req, res) => {
    connection.query(
        "SELECT id, priority, roadName, atKm, dueDate, pids, createdAt FROM ProjectSubmissions WHERE isDraft = FALSE ORDER BY createdAt DESC",
        (err, results) => {
            if (err) {
                console.error("❌ Database error:", err);
                return res.status(500).json({ error: "❌ Database error." });
            }
            res.json(results);
        }
    );
});


// 🔹 User Registration
app.post("/api/register", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "❌ Email and password are required." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        connection.query(
            "INSERT INTO users (email, password) VALUES (?, ?)",
            [email, hashedPassword],
            (err, result) => {
                if (err) {
                    console.error("❌ Database error:", err);
                    return res.status(500).json({ error: "❌ Database error." });
                }
                res.status(201).json({ message: "✅ User registered successfully!" });
            }
        );
    } catch (error) {
        console.error("❌ Error hashing password:", error);
        res.status(500).json({ error: "❌ Internal server error." });
    }
});

// 🔹 User Login
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    connection.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, results) => {
            if (err) {
                console.error("❌ Database error:", err);
                return res.status(500).json({ error: "❌ Database error." });
            }
            if (results.length === 0) {
                return res.status(401).json({ error: "❌ User not found" });
            }

            const user = results[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ error: "❌ Invalid credentials" });
            }

            // Generate JWT
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET, // Use environment variable
                { expiresIn: "1h" }
            );

            res.json({ token, message: "✅ Login successful!" });
        }
    );
});

// 🔹 Middleware to Protect Routes
const authenticateToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(401).json({ error: "❌ Access denied" });

    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
    if (!token) return res.status(401).json({ error: "❌ Access denied" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "❌ Invalid token" });
        req.user = user;
        next();
    });
};

// 🔹 Submit Section1 Data (Final Submission)
// app.post("/api/section1/submit", (req, res) => {
//     const { priority, dueDate, roadName, atKm, latitude, longitude, nearestTown, pids } = req.body;

//     if (!roadName || !priority || !dueDate) {
//         return res.status(400).json({ error: "❌ Road Name, Priority, and Due Date are required." });
//     }

//     connection.query(
//         "INSERT INTO Section1 (priority, dueDate, roadName, atKm, latitude, longitude, nearestTown, pids, isDraft) VALUES (?, ?, ?, ?, ?, ?, ?, ?, FALSE)",
//         [priority, dueDate, roadName, atKm, latitude, longitude, nearestTown, pids],
//         (err, result) => {
//             if (err) return res.status(500).json({ error: "❌ Database error." });
//             res.status(200).json({ message: "✅ Data submitted successfully!" });
//         }
//     );
// });

app.post("/api/submit", (req, res) => {
    const {
        // Section 1 Fields
        priority, dueDate, roadName, atKm, latitude, longitude, nearestTown, pids,

        // Section 2 Fields
        proximityToWaterbody, largeBodyFishName, smallBodyFishName, fishPassageDesignRequired,
        fishSpawningWindows, commentsBodiesOfWater, additionalComments,

        // Section 3 Fields
        dfoReviewRequired, dfoComments,

        // Section 4 Fields
        ahppRequired, ahppComments, ahppAdditionalComments,

        // Section 5 Fields
        rareEndangeredSpecies, speciesComments,

        // Section 6 Fields
        erosionSedimentControlComments,

        // Section 7 Fields
        cofferdamsComments,

        // Section 8 Fields
        inProvincialForest, forestProductPermitRequired, merchantableTimberPermitRequired, forestPermitComments,

        // Section 9 Fields
        impactedSitesComments,

        // Section 10 Fields
        additionalPermitsComments
    } = req.body;

    if (!roadName || !priority || !dueDate) {
        return res.status(400).json({ error: "❌ Road Name, Priority, and Due Date are required." });
    }

    connection.query(
        `INSERT INTO ProjectSubmissions 
        (priority, dueDate, roadName, atKm, latitude, longitude, nearestTown, pids,
         proximityToWaterbody, largeBodyFishName, smallBodyFishName, fishPassageDesignRequired, 
         fishSpawningWindows, commentsBodiesOfWater, additionalComments,
         dfoReviewRequired, dfoComments,
         ahppRequired, ahppComments, ahppAdditionalComments,
         rareEndangeredSpecies, speciesComments,
         erosionSedimentControlComments,
         cofferdamsComments,
         inProvincialForest, forestProductPermitRequired, merchantableTimberPermitRequired, forestPermitComments,
         impactedSitesComments,
         additionalPermitsComments,
         isDraft) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?,
                ?, ?,
                ?,
                ?,
                ?, ?, ?, ?,
                ?,
                ?, FALSE)`, // FALSE means final submission
        [
            // Section 1
            priority, dueDate, roadName, atKm, latitude, longitude, nearestTown, pids,

            // Section 2
            proximityToWaterbody, largeBodyFishName, smallBodyFishName, fishPassageDesignRequired,
            fishSpawningWindows, commentsBodiesOfWater, additionalComments,

            // Section 3
            dfoReviewRequired, dfoComments,

            // Section 4
            ahppRequired, ahppComments, ahppAdditionalComments,

            // Section 5
            rareEndangeredSpecies, speciesComments,

            // Section 6
            erosionSedimentControlComments,

            // Section 7
            cofferdamsComments,

            // Section 8
            inProvincialForest, forestProductPermitRequired, merchantableTimberPermitRequired, forestPermitComments,

            // Section 9
            impactedSitesComments,

            // Section 10
            additionalPermitsComments
        ],
        (err, result) => {
            if (err) {
                console.error("❌ Database error:", err);
                return res.status(500).json({ error: "❌ Database error." });
            }
            res.status(200).json({ message: "✅ Data submitted successfully!" });
        }
    );
});



// 🔹 Save Draft (Allows users to save their progress without submitting)
app.post("/api/section1/draft", (req, res) => {
    const { priority, dueDate, roadName, atKm, latitude, longitude, nearestTown, pids } = req.body;

    connection.query(
        "INSERT INTO Section1 (priority, dueDate, roadName, atKm, latitude, longitude, nearestTown, pids, isDraft) VALUES (?, ?, ?, ?, ?, ?, ?, ?, TRUE)",
        [priority, dueDate, roadName, atKm, latitude, longitude, nearestTown, pids],
        (err, result) => {
            if (err) return res.status(500).json({ error: "❌ Database error." });
            res.status(200).json({ message: "✅ Draft saved successfully!" });
        }
    );
});

// 🔹 Fetch Draft Data (For Auto-Fill)
app.get("/api/section1/draft", (req, res) => {
    connection.query("SELECT * FROM Section1 WHERE isDraft = TRUE ORDER BY createdAt DESC LIMIT 1", (err, results) => {
        if (err) return res.status(500).json({ error: "❌ Database error." });
        if (results.length === 0) return res.json({ message: "❌ No draft found" });
        res.json(results[0]);
    });
});

// 🔹 Fetch All Submitted Data
app.get("/api/section1", (req, res) => {
    connection.query("SELECT * FROM Section1 WHERE isDraft = FALSE", (err, results) => {
        if (err) return res.status(500).json({ error: "❌ Database error." });
        res.json(results);
    });
});

// 🔹 Example protected route (Requires login)
app.get("/api/dashboard", authenticateToken, (req, res) => {
    res.json({ message: `✅ Welcome ${req.user.email} to the Dashboard!` });
});

// 🔹 Start Server
app.listen(PORT, HOST, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
