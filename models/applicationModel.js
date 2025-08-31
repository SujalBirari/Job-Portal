const { application } = require('express');
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    applicantName: {
        type: String,
        required: true
    },
    applicantEmail: {
        type: String,
        required: true
    },
    resumeLink: {
        type: String,
        required: false
    },
    applicationDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Applied', 'Under Review', 'Interview Scheduled', 'Offered', 'Rejected'],
        default: 'Applied'
    }
});

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;