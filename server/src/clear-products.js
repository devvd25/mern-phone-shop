import 'dotenv/config';
import mongoose from 'mongoose';
import Product from './models/Product.js';

const clearProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    console.log('🗑️  Đang xóa toàn bộ sản phẩm...');
    const result = await Product.deleteMany({});
    console.log(`✅ Đã xóa ${result.deletedCount} sản phẩm!`);

    console.log('🎉 Hoàn tất! Database đã sạch.');
    process.exit();
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    process.exit(1);
  }
};

clearProducts();
