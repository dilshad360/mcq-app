import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comments: { type: String, required: true, maxlength: 500 },
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Feedback', feedbackSchema);
