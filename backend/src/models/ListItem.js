import mongoose from 'mongoose';

const listItemSchema = new mongoose.Schema({
  status: {
    type: String,
  },
  listItemDate: {
    type: Date,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
  },
});

export default mongoose.model('listItem', listItemSchema);
