const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        // Find user by email
        const user = await User.findOne({ email: req.body.email });

        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Check if user is verified
        if (!user.isVerified) {
            return res.status(401).json({ message: 'User not verified' });
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.email }, 'secret', { expiresIn: '1h' });

        // Send success response with token
        res.status(200).json({ message: 'Authentication successful', token: token });
    } catch (err) {
        // Send error response
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;