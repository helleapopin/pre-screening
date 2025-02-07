/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

admin.initializeApp();
const db = admin.firestore();

const JWT_SECRET = "your_jwt_secret"; // Replace this with a secure secret

// 🔹 User Registration
exports.register = functions.https.onRequest(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "❌ Email and password are required." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.collection("users").doc(email).set({ email, password: hashedPassword });
        res.status(201).json({ message: "✅ User registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: "❌ Internal server error." });
    }
});

// 🔹 User Login
exports.login = functions.https.onRequest(async (req, res) => {
    const { email, password } = req.body;

    try {
        const userDoc = await db.collection("users").doc(email).get();
        if (!userDoc.exists) {
            return res.status(401).json({ error: "❌ User not found" });
        }

        const user = userDoc.data();
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "❌ Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, message: "✅ Login successful!" });
    } catch (error) {
        res.status(500).json({ error: "❌ Internal server error." });
    }
});

// 🔹 Middleware to Protect Routes
const authenticateToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ error: "❌ Access denied" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ error: "❌ Invalid token" });
    }
};

// 🔹 Submit Section1 Data (Final Submission)
exports.submitSection1 = functions.https.onRequest(async (req, res) => {
    const { priority, dueDate, roadName, atKm, latitude, longitude, nearestTown, pids } = req.body;

    if (!roadName || !priority || !dueDate) {
        return res.status(400).json({ error: "❌ Road Name, Priority, and Due Date are required." });
    }

    try {
        const docRef = await db.collection("Section1").add({
            priority, dueDate, roadName, atKm, latitude, longitude, nearestTown, pids,
            isDraft: false,
            createdAt: admin.firestore.Timestamp.now(),
        });
        res.status(200).json({ message: "✅ Data submitted successfully!", id: docRef.id });
    } catch (error) {
        res.status(500).json({ error: "❌ Database error." });
    }
});

// 🔹 Save Draft
exports.saveDraft = functions.https.onRequest(async (req, res) => {
    const { priority, dueDate, roadName, atKm, latitude, longitude, nearestTown, pids } = req.body;

    try {
        const docRef = await db.collection("Section1").add({
            priority, dueDate, roadName, atKm, latitude, longitude, nearestTown, pids,
            isDraft: true,
            createdAt: admin.firestore.Timestamp.now(),
        });
        res.status(200).json({ message: "✅ Draft saved successfully!", id: docRef.id });
    } catch (error) {
        res.status(500).json({ error: "❌ Database error." });
    }
});

// 🔹 Fetch Draft Data
exports.getDraft = functions.https.onRequest(async (req, res) => {
    try {
        const snapshot = await db.collection("Section1").where("isDraft", "==", true).orderBy("createdAt", "desc").limit(1).get();

        if (snapshot.empty) {
            return res.json({ message: "❌ No draft found" });
        }

        const draftData = snapshot.docs[0].data();
        res.json(draftData);
    } catch (error) {
        res.status(500).json({ error: "❌ Database error." });
    }
});

// 🔹 Fetch All Submitted Data
exports.getSection1Data = functions.https.onRequest(async (req, res) => {
    try {
        const snapshot = await db.collection("Section1").where("isDraft", "==", false).get();
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "❌ Database error." });
    }
});

// 🔹 Example Protected Route (Requires login)
exports.dashboard = functions.https.onRequest(async (req, res) => {
    authenticateToken(req, res, () => {
        res.json({ message: `✅ Welcome ${req.user.email} to the Dashboard!` });
    });
});


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
