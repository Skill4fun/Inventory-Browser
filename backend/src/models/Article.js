import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  isActive: {
    type: Boolean,
  },
  publish_date: {
    type: Date,
  },
  special_price: {
    type: Number,
  },
  expirationDate: {
    type: Date,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'product',
  },
});

export default mongoose.model('article', articleSchema);
