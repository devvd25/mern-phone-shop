import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  image: String,
  price: Number,
  qty: Number
}, { _id: false });

const shippingSchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  street: String,
  ward: String,
  district: String,
  city: String,
  postalCode: String,
  country: String
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  shippingAddress: shippingSchema,
  paymentMethod: { type: String, enum: ['COD','Stripe'], default: 'COD' },
  paymentResult: { id: String, status: String, update_time: String, email_address: String },
  itemsPrice: Number,
  shippingPrice: Number,
  taxPrice: Number,
  totalPrice: Number,
  status: { type: String, enum: ['pending','paid','shipped','delivered','cancelled'], default: 'pending' },
  isPaid: { type: Boolean, default: false },
  paidAt: Date,
  deliveredAt: Date
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
