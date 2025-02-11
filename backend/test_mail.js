const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "mail.mhisafety.ca",
    port: 465,
    secure: true,
    auth: {
        user: "no-reply@mhisafety.ca",
        pass: "_nst6!QNgGiT49!"
    },
    tls: {
        rejectUnauthorized: false
    }
});

const mailOptions = {
    from: "no-reply@mhisafety.ca",
    to: "abdinoor.ahmed@gov.sk.ca",
    subject: "Test Email: Checking Email Delivery",
    text: "Hello! This is a test email to verify if delivery works.",
    html: "<p>Hello! This is a <strong>test email</strong> to verify if delivery works.</p>"
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error("❌ Test email failed:", error);
    } else {
        console.log("✅ Test email sent successfully!");
        console.log("📩 Email Details:", info);
    }
});
