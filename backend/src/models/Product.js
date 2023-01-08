import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  factoryProductId: {
    type: String,
  },
  eanCode: {
    type: String,
  },
  brand: {
    type: String,
  },
  nameEn: {
    type: String,
  },
  namePl: {
    type: String,
  },
  descEn: {
    type: String,
  },
  descPl: {
    type: String,
  },
  weightKgBr: {
    type: Number,
  },
  weightKgNet: {
    type: Number,
  },
  unit: {
    type: String,
  },
  qtyAllStock: {
    type: Number,
  },
  qtyReserved: {
    type: Number,
  },
  qtyAvailable: {
    type: Number,
  },
  priceExpEur: {
    type: Number,
  },
  photoUrl: {
    type: String,
  },
  lastUpdated: {
    type: Date,
  },
});

export default mongoose.model('product', productSchema);
