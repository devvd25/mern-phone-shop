import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: String,
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  category: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  brand: { type: String, required: true },
  specs: { type: Map, of: String },
  reviews: [reviewSchema]
}, { timestamps: true });

// Text + compound indexes
productSchema.index({ name: 'text', brand: 'text', description: 'text' });
productSchema.index({ category: 1, brand: 1 });

const Product = mongoose.model('Product', productSchema);
export default Product;
