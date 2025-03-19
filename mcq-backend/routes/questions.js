import express from 'express';
import Question from '../models/Question.js';

const router = express.Router();

// ✅ Route to Fetch Questions Without Correct Answers
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find({}, { correctAnswer: 0 });  // Exclude correctAnswer
    res.json(questions);
  } catch (error) {
    res.status(500).send('❌ Failed to fetch questions: ' + error.message);
  }
});

export default router;
