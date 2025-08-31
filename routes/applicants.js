const express = require("express");
const router = express.Router();
const Job = require("../models/jobModel");
const Application = require("../models/applicationModel");
const User = require("../models/userModel");

// ✅ Applicant Dashboard
router.get("/dashboard/:email", async (req, res) => {
    const email = req.params.email;

    try {
        // Check if user exists and is an Applicant
        const user = await User.findOne({ email });
        if (!user || user.type !== "Applicant") {
            return res.status(403).send("Access denied: Only applicants can view this dashboard.");
        }

        // Fetch applications for this applicant and populate job info
        const applications = await Application.find({ applicantEmail: email })
            .populate("jobId");

        res.render("pages/applicant-dashboard", { email, applications });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
