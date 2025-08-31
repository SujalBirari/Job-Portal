const Job = require('../models/jobModel');
const Application = require('../models/applicationModel');
const e = require('express');

const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        const posted = req.query.posted;
        res.render('pages/jobs', { title: "Job Listings", jobs, posted });
    } catch (err) {
        console.error('Error fetching jobs:', err);
        res.status(500).send('Internal Server Error');
    }
}

const getJobDetails = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).send("Job not found");
        }

        const applied = req.query.applied === "true";

        res.render('pages/job-details', { title: `${job.title} - Job Details`, job, applied });
    } catch (err) {
        console.error("Error fetching job details:", err);
        res.status(500).send("Internal Server Error");
    }
};

const showApplicationForm = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).send("Job not found");
        }
        res.render('pages/apply', { title: "Apply for Job", job });
    } catch (err) {
        console.error("Error displaying application form:", err);
        res.status(500).send("Internal Server Error");
    }
}

const submitAppliation = async (req, res) => {
    try {
        const { applicantName, applicantEmail, resumeLink } = req.body;
        const application = new Application({
            jobId: req.params.id,
            applicantName: applicantName,
            applicantEmail: applicantEmail,
            resumeLink: resumeLink
        });
        await application.save();
        res.redirect(`/jobs/${req.params.id}?applied=true`);
    } catch (err) {
        console.error("Error submitting application:", err);
        res.status(500).send("Internal Server Error");
    }
}

const showJobForm = (req, res) => {

    res.render('pages/post-job', { title: "Post a New Job" });
}

const createJob = async (req, res) => {
    try {
        const { title, description, company, location, salary, applicationDeadline, requirements, email } = req.body;

        const postedBy = email || null;
        if (!postedBy) {
            return res.status(403).send("Unauthorized: Please log in as a recruiter to post jobs.");
        }

        const job = new Job({
            title,
            description,
            company,
            location,
            salary: Number(salary),
            applicationDeadline: new Date(applicationDeadline),
            requirements: requirements ? requirements.split(',').map(req => req.trim()) : [],
            postedBy
        });
        await job.save();
        res.redirect('/jobs?posted=true');
    } catch (err) {
        console.error("Error creating job:", err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getAllJobs,
    getJobDetails,
    showApplicationForm,
    submitAppliation,
    showJobForm,
    createJob
};