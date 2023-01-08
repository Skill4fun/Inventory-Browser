import mongoose from 'mongoose';

const quoteRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  status: {
    type: String,
  },
  saveDate: {
    type: Date,
  },
  expirationDate: {
    type: Date,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'product',
  },
});

export default mongoose.model('quoteRequest', quoteRequestSchema);
