import mongoose from 'mongoose';

const voucherSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    discountType: {
      type: String,
      enum: ['percentage', 'fixed'],
      default: 'percentage',
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },
    minOrderAmount: {
      type: Number,
      default: 0,
    },
    maxDiscountAmount: {
      type: Number, // Giảm tối đa (dành cho % discount)
      default: null,
    },
    usageLimit: {
      type: Number, // Số lần dùng tối đa (null = unlimited)
      default: null,
    },
    usageCount: {
      type: Number,
      default: 0,
    },
    validFrom: {
      type: Date,
      default: Date.now,
    },
    validUntil: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    assignedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    isForAllUsers: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    voucherType: {
      type: String,
      enum: ['welcome', 'custom', 'promotional'],
      default: 'custom',
    },
  },
  { timestamps: true }
);

// Index để tìm kiếm nhanh
voucherSchema.index({ code: 1 });
voucherSchema.index({ isActive: 1, validFrom: 1, validUntil: 1 });
voucherSchema.index({ assignedUsers: 1 });

const Voucher = mongoose.model('Voucher', voucherSchema);
export default Voucher;
