import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  link: { type: String }, // Optional link when click banner
  order: { type: Number, default: 0 }, // For sorting
  isActive: { type: Boolean, default: true },
  duration: { type: Number, default: 5000 } // Auto-slide duration in milliseconds
}, { timestamps: true });

const Banner = mongoose.model('Banner', bannerSchema);
export default Banner;
