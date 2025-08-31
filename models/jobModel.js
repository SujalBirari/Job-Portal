const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    postedDate: {
        type: Date,
        default: Date.now
    },
    applicationDeadline: {
        type: Date,
        required: true
    },
    requirements: {
        type: [String],
        required: true
    },
    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    },
    postedBy: {
        type: String, // recruiter email
        required: true
    }
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;