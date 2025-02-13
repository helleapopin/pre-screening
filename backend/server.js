require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const upload = multer({ dest: 'uploads/' }); // Ensure this is set up

const PORT = 8080;
const HOST = "0.0.0.0";
const app = express();

app.use(morgan("dev"));
app.use(cors({
    origin: '*',  // Allow all origins (for development)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Uploads go to `uploads/`
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Unique filename
    }
});

// File filter to allow images only
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("❌ Only images are allowed!"), false);
    }
};


const fs = require("fs");
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

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
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending' -- Add status column
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
        username VARCHAR(50) NOT NULL,

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


// GET a single submission by ID
app.get("/api/submissions/:id", (req, res) => {
    const { id } = req.params;

    connection.query("SELECT * FROM ProjectSubmissions WHERE id = ?", [id], (err, results) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ error: "Database error." });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Submission not found." });
        }
        res.json(results[0]);
    });
});



const nodemailer = require("nodemailer");

const sendAdminApprovalEmail = (username, email, userId) => {
    const transporter = nodemailer.createTransport({
        host: 'mail.mhisafety.ca',
        port: 465,
        secure: true, // Use SSL
        auth: {
            user: 'no-reply@mhisafety.ca',
            pass: '111'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // Admin email where approvals should be sent
    const adminEmail = "austin.long@gov.sk.ca";

    // Approval & Rejection Links
    const approvalLink = `https://fictional-orbit-695pwwpvgqj7c5qrr-8080.app.github.dev/api/admin/approve/${userId}`;
    const rejectionLink = `https://fictional-orbit-695pwwpvgqj7c5qrr-8080.app.github.dev/api/admin/reject/${userId}`;


    const mailOptions = {
        from: 'no-reply@mhisafety.ca',
        to: adminEmail,
        subject: 'New User Signup - Approval Needed',
        html: `
            <h3>New User Signup Request</h3>
            <p><strong>Username:</strong> ${username}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p>Click below to approve or reject:</p>
            <a href="${approvalLink}" style="color:green; font-weight:bold;">✅ Approve</a> |
            <a href="${rejectionLink}" style="color:red; font-weight:bold;">❌ Reject</a>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("❌ Error sending admin approval email:", error);
        } else {
            console.log("✅ Admin approval email sent successfully!");
            console.log("📩 Email Details:", info);
        }
    });

};


app.post("/api/register", async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: "❌ Username, email, and password are required." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user with status "pending"
        connection.query(
            "INSERT INTO users (username, email, password, status) VALUES (?, ?, ?, 'pending')",
            [username, email, hashedPassword],
            async (err, result) => {
                if (err) {
                    console.error("❌ Database error:", err);
                    return res.status(500).json({ error: "❌ Database error." });
                }

                const userId = result.insertId;

                // ✅ Send email to admin for approval
                sendAdminApprovalEmail(username, email, userId);

                res.status(201).json({ message: "✅ Registration successful! Your account is pending admin approval." });
            }
        );
    } catch (error) {
        console.error("❌ Error hashing password:", error);
        res.status(500).json({ error: "❌ Internal server error." });
    }
});


app.get("/api/admin/approve/:userId", (req, res) => {
    const { userId } = req.params;

    connection.query(
        "UPDATE users SET status = 'approved' WHERE id = ?",
        [userId],
        (err, result) => {
            if (err) {
                console.error("❌ Error approving user:", err);
                return res.status(500).send("Error approving user.");
            }
            res.send("✅ User has been approved! They can now log in.");
        }
    );
});

app.get("/api/admin/reject/:userId", (req, res) => {
    const { userId } = req.params;

    connection.query(
        "UPDATE users SET status = 'rejected' WHERE id = ?",
        [userId],
        (err, result) => {
            if (err) {
                console.error("❌ Error rejecting user:", err);
                return res.status(500).send("Error rejecting user.");
            }
            res.send("❌ User has been rejected.");
        }
    );
});




app.post("/api/login", (req, res) => {
    const { identifier, password } = req.body; // ✅ Identifier (can be email or username)

    connection.query(
        "SELECT * FROM users WHERE email = ? OR username = ?", // ✅ Check for both email & username
        [identifier, identifier], // ✅ Pass 'identifier' for both
        async (err, results) => {
            if (err) {
                console.error("❌ Database error:", err);
                return res.status(500).json({ error: "❌ Database error." });
            }
            if (results.length === 0) {
                return res.status(401).json({ error: "❌ User not found" });
            }

            const user = results[0];

            // ✅ Prevent login for pending users
            if (user.status === "pending") {
                return res.status(403).json({ error: "🚫 Your account is pending admin approval." });
            }
            // ✅ Prevent login for rejected users
            if (user.status === "rejected") {
                return res.status(403).json({ error: "🚫 Your account has been rejected by the admin." });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: "❌ Invalid credentials" });
            }

            // ✅ Generate JWT (for authentication)
            const token = jwt.sign(
                { userId: user.id, email: user.email, username: user.username }, // ✅ Include username
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.json({ token, message: "✅ Login successful!" });
        }
    );
});



const authenticateToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(401).json({ error: "Access denied" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Access denied" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = user;
        next();
    });
};



app.post("/api/submit", authenticateToken, upload.array("images", 10), (req, res) => {
    const uploadedImages = req.files ? req.files.map(file => file.path).join(",") : "";
    const username = req.user?.username;  // ✅ Extract username from authenticated user

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
        (username, priority, dueDate, roadName, atKm, latitude, longitude, nearestTown, pids,
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
         images,
         isDraft) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?,
                ?, ?,
                ?,
                ?,
                ?, ?, ?, ?,
                ?,
                ?,?,?, FALSE)`, // FALSE means final submission
        [
            // Section 1
            username, priority, dueDate, roadName, atKm, latitude, longitude, nearestTown, pids,

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
            additionalPermitsComments,
            uploadedImages
        ],
        (err, result) => {
            if (err) {
                console.error("❌ Database error:", err);
                return res.status(500).json({ error: "❌ Database error." });
            }
            res.status(200).json({ message: "✅ Data submitted successfully!", id: result.insertId });
        }
    );
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get("/api/my-submissions", authenticateToken, (req, res) => {
    const username = req.user?.username; // ✅ Get username from JWT

    if (!username) {
        console.error("❌ Unauthorized request: No username in token");
        return res.status(401).json({ error: "Unauthorized" });
    }

    console.log(`🔍 Fetching submissions for username: ${username}`);

    connection.query(
        "SELECT * FROM ProjectSubmissions WHERE username = ? ORDER BY createdAt DESC",
        [username], // ✅ Get submissions by username
        (err, results) => {
            if (err) {
                console.error("❌ Database error:", err);
                return res.status(500).json({ error: "❌ Database error." });
            }
            if (results.length === 0) {
                console.warn(`⚠️ No submissions found for username: ${username}`);
                return res.status(404).json({ error: "No submissions found." });
            }

            console.log(`✅ Found ${results.length} submissions for ${username}`);
            res.json(results);
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
