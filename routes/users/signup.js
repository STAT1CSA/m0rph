const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('./models/user');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create user
        const user = new User({
            email: req.body.email,
            password: hashedPassword,
            verificationToken: jwt.sign({ email: req.body.email }, 'secret')
        });

        // Save user to database
        await user.save();

        // Send verification email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your_email@gmail.com',
                pass: 'your_password'
            }
        });

        const mailOptions = {
            from: 'your_email@gmail.com',
            to: req.body.email,
            subject: 'Verify your email',
            text: `Please click on the following link to verify your email: http://localhost:3000/verify/${user.verificationToken}`
        };

        await transporter.sendMail(mailOptions);

        // Send success response
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        // Send error response
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;