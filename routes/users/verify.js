const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

const router = express.Router();

router.get('/:token', async (req, res) => {
    try {
        // Find user by verification token
        const user = await User.findOne({ verificationToken: req.params.token });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user to be verified
        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        // Send success response
        res.status(200).json({ message: 'Email verified' });
    } catch (err) {
        // Send error response
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;