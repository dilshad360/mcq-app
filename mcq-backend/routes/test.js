import express from 'express';
import TestResult from '../models/TestResult.js';
import Question from '../models/Question.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// ✅ Route to Submit Test Results
router.post('/submit', auth, async (req, res) => {
    const { userId, selectedAnswers } = req.body;

    try {
        let score = 0;
        const answersArray = [];

        // ✅ Check answers and calculate score
        for (const questionId in selectedAnswers) {
            const question = await Question.findById(questionId);
            const selectedAnswer = selectedAnswers[questionId];

            if (question) {
                const isCorrect = question.correctAnswer === selectedAnswer;
                if (isCorrect) {
                    score += 5;  // Increase score by 1 for each correct answer
                }

                answersArray.push({
                    questionId: question._id,
                    selectedAnswer,
                });
            }
        }

        // ✅ Store the result in the database
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

export default router;
