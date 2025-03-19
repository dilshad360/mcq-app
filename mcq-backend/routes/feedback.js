import express from 'express';
import Feedback from '../models/Feedback.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// ✅ Store Feedback
router.post('/', auth, async (req, res) => {
    const { userId, rating, comments } = req.body;

    try {
        const newFeedback = new Feedback({
            userId,
            rating,
            comments
        });

        await newFeedback.save();
        res.status(201).json({ message: '✅ Feedback submitted successfully!' });
    } catch (error) {
        console.error('❌ Error submitting feedback:', error);
        res.status(500).send('Server error');
    }
});

// ✅ Fetch Feedback by UserId
router.get('/:userId', auth, async (req, res) => {
    const { userId } = req.params;

    try {
        const feedback = await Feedback.find({ userId }).sort({ submittedAt: -1 });

        if (!feedback || feedback.length === 0) {
            return res.status(404).json({ message: 'No feedback found for this user.' });
        }

        res.status(200).json(feedback);
    } catch (error) {
        console.error('❌ Error fetching feedback:', error);
        res.status(500).send('Server error');
    }
});

export default router;
