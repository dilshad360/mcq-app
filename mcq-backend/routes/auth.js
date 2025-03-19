import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// ✅ Register Route
router.post('/register', async (req, res) => {
    const { fullName, email, mobile, status, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ mobile });
        if (existingUser) return res.status(400).send('User already exists');

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            fullName,
            email,
            mobile,
            status,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).send('User registered successfully');

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

// ✅ Login Route
router.post('/login', async (req, res) => {
    const { mobile, password } = req.body;

    try {
        const user = await User.findOne({ mobile });
        if (!user) return res.status(400).send('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                mobile: user.mobile,
            }
        });


    } catch (error) {
        res.status(500).send('Server error');
    }
});

export default router;
