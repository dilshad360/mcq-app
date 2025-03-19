import express from 'express';
import Question from '../models/Question.js';

const router = express.Router();

// ✅ Seed Route: Add MCQ Questions
router.get('/seed', async (req, res) => {
    try {
        await Question.deleteMany();  // Clear existing questions

        const questions = [
            {
                question: 'What is the capital of France?',
                options: ['Paris', 'London', 'Berlin', 'Madrid'],
                correctAnswer: 'Paris',
            },
            {
                question: 'Which language is used for web development?',
                options: ['Python', 'Java', 'JavaScript', 'C++'],
                correctAnswer: 'JavaScript',
            },
            {
                question: 'What does HTML stand for?',
                options: [
                    'HyperText Markup Language',
                    'Hyper Transfer Markup Language',
                    'High-Level Text Markup Language',
                    'None of the above',
                ],
                correctAnswer: 'HyperText Markup Language',
            }
        ];

        await Question.insertMany(questions);
        res.send('✅ MCQ questions seeded successfully!');
    } catch (error) {
        res.status(500).send('❌ Error seeding questions: ' + error.message);
    }
});

export default router;
