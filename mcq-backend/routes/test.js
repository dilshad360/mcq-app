import express from 'express';
import TestResult from '../models/TestResult.js';
import Question from '../models/Question.js';
import auth from '../middleware/auth.js';

const router = express.Router();


router.post('/submit', auth, async (req, res) => {
    const { userId, selectedAnswers } = req.body;

    try {
        let score = 0;
        const answersArray = [];


        for (const questionId in selectedAnswers) {
            const question = await Question.findById(questionId);
            const selectedAnswer = selectedAnswers[questionId];

            if (question) {
                const isCorrect = question.correctAnswer === selectedAnswer;
                if (isCorrect) {
                    score += 5;
                }

                answersArray.push({
                    questionId: question._id,
                    selectedAnswer,
                });
            }
        }

        const testResult = new TestResult({
            userId,
            answers: answersArray,
            score,
        });

        await testResult.save();

        res.status(201).json({
            message: '✅ Test submitted successfully',
            score,
        });
    } catch (error) {
        console.error('❌ Error submitting test:', error);
        res.status(500).send('Server error');
    }
});

router.get('/results/:userId', auth, async (req, res) => {
    const { userId } = req.params;

    try {
        const results = await TestResult.find({ userId })
            .populate('userId', 'fullName email')  // Populate user details
            .populate('answers.questionId', 'question options')  // Populate questions
            .sort({ submittedAt: -1 });  // Sort by submission date (most recent first)

        if (!results || results.length === 0) {
            return res.status(404).json({ message: 'No test results found for this user.' });
        }

        res.status(200).json(results);
    } catch (error) {
        console.error('❌ Error fetching test results:', error);
        res.status(500).send('Server error');
    }
});

export default router;
