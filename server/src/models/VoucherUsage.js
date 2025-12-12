import mongoose from 'mongoose';

const voucherUsageSchema = new mongoose.Schema(
  {
    voucher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Voucher',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    discountAmount: {
      type: Number,
      required: true,
    },
    usedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Index
voucherUsageSchema.index({ voucher: 1, user: 1 });
voucherUsageSchema.index({ user: 1 });

const VoucherUsage = mongoose.model('VoucherUsage', voucherUsageSchema);
export default VoucherUsage;
