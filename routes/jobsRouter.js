const express = require('express');
const router = express.Router();
const Job = require('../models/jobModel');
const { getAllJobs, getJobDetails, showApplicationForm, submitAppliation, showJobForm, createJob } = require('../controllers/jobsController');

router.get('/', getAllJobs);

router.get('/:id', getJobDetails);

router.get('/:id/apply', showApplicationForm);

router.post('/:id/apply', submitAppliation);

router.get('/post/new', showJobForm);

router.post('/post', createJob);

router.get("/dashboard/:email", async (req, res) => {
    const email = req.params.email;

    try {
        const applications = await Application.find({ applicantEmail: email }).populate("jobId");
        res.render("pages/applicant-dashboard", { email, applications });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;