import mongoose from 'mongoose';

const testResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to User model
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
      selectedAnswer: { type: String, required: true },
    }
  ],
  score: { type: Number, required: true },  // Total score
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model('TestResult', testResultSchema);
