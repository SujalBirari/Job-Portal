const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();

const Jobs = require('./models/jobModel');
const { getAllJobs } = require('./controllers/jobsController');

const authRouter = require('./routes/authRouter');
const jobsRouter = require('./routes/jobsRouter');



mongoose.connect(process.env.MONGODB_URL).then(() => {
    // console.log(`Connected to database: ${process.env.MONGODB_URL}`);
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'replace-with-a-strong-secret',
    resave: false,
    saveUninitialized: false,
    credentials: 'same-origin',
    cookie: { maxAge: 1000 * 60 * 60 } // 1h
}));


app.get('/', (req, res) => {
    res.render('pages/home', { title: "Home - Job Portal" });
});

app.use('/jobs', jobsRouter);
app.use('/auth', authRouter);
app.use('/applicants', require('./routes/applicants'));
app.use('/recruiters', require('./routes/recruiters'));

// app.get('/jobs', getAllJobs);

// console.log("View directory", app.get('views'));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});