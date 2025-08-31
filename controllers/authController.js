const User = require("../models/userModel");

const signup = async (req, res) => {
    try {
        const { email, password, type } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Ensure type is valid (either Applicant or Recruiter), else fallback to Applicant
        const userType = ["Applicant", "Recruiter"].includes(type) ? type : "Applicant";

        // Create user with type
        const user = new User({ email, password, type: userType });
        await user.save();

        res.status(201).json({
            message: "Signup successful",
            user: { email: user.email, type: user.type }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Send back user info (no password)
        res.status(200).json({
            message: "Signin successful",
            user: { email: user.email, type: user.type }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { signup, signin };
