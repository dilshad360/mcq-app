import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import seedRoutes from './routes/seed.js';
import questionRoutes from './routes/questions.js';
import testRoutes from './routes/test.js';
import feedbackRoutes from './routes/feedback.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', seedRoutes); 
app.use('/api/questions', questionRoutes);
app.use('/api/test', testRoutes);
app.use('/api/feedback', feedbackRoutes); 

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
