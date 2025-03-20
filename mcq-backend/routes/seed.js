import express from 'express';
import Question from '../models/Question.js';

const router = express.Router();

router.get('/seed', async (req, res) => {
    try {
        await Question.deleteMany();  // Clear existing questions

        const questions = [
            {
                question: 'What is the capital of France?',
                options: ['Paris', 'London', 'Berlin', 'Madrid', 'Rome'],
                correctAnswer: 'Paris',
            },
            {
                question: 'Which language is used for web development?',
                options: ['Python', 'Java', 'JavaScript', 'C++', 'Ruby'],
                correctAnswer: 'JavaScript',
            },
            {
                question: 'What does HTML stand for?',
                options: [
                    'HyperText Markup Language',
                    'Hyper Transfer Markup Language',
                    'High-Level Text Markup Language',
                    'Hyper Tool Markup Language',
                    'None of the above',
                ],
                correctAnswer: 'HyperText Markup Language',
            },
            {
                question: 'What is 2 + 2?',
                options: ['3', '4', '5', '6', '2'],
                correctAnswer: '4',
            },
            {
                question: 'Which planet is known as the Red Planet?',
                options: ['Earth', 'Mars', 'Jupiter', 'Venus', 'Saturn'],
                correctAnswer: 'Mars',
            },
            {
                question: 'Who wrote "Romeo and Juliet"?',
                options: ['William Shakespeare', 'Charles Dickens', 'Mark Twain', 'Jane Austen', 'Homer'],
                correctAnswer: 'William Shakespeare',
            },
            {
                question: 'What is the boiling point of water in Celsius?',
                options: ['50°C', '100°C', '150°C', '200°C', '90°C'],
                correctAnswer: '100°C',
            },
            {
                question: 'Which is the largest ocean on Earth?',
                options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean', 'Southern Ocean'],
                correctAnswer: 'Pacific Ocean',
            },
            {
                question: 'Which year did World War II end?',
                options: ['1945', '1939', '1918', '1925', '1950'],
                correctAnswer: '1945',
            },
            {
                question: 'What is the chemical symbol for water?',
                options: ['H2O', 'O2', 'CO2', 'H2', 'HO'],
                correctAnswer: 'H2O',
            },
        ];
        

        await Question.insertMany(questions);
        res.send('✅ MCQ questions seeded successfully!');
    } catch (error) {
        res.status(500).send('❌ Error seeding questions: ' + error.message);
    }
});

export default router;
