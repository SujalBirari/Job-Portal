const express = require("express");
const router = express.Router();
const Job = require("../models/jobModel");
const Application = require("../models/applicationModel");
const User = require("../models/userModel");

// ✅ Recruiter Dashboard
router.get("/dashboard/:email", async (req, res) => {
    const email = req.params.email;

    try {
        // Check if user exists and is a Recruiter
        const user = await User.findOne({ email });
        if (!user || user.type !== "Recruiter") {
            return res.status(403).send("Access denied: Only recruiters can view this dashboard.");
        }

        // Fetch jobs posted by this recruiter
        const jobs = await Job.find({ postedBy: email });

        // For each job, fetch applications
        const jobsWithApplications = await Promise.all(
            jobs.map(async (job) => {
                const applications = await Application.find({ jobId: job._id });
                return { job, applications };
            })
        );

        // Render recruiter dashboard page
        res.render("pages/recruiter-dashboard", { email, jobsWithApplications });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
