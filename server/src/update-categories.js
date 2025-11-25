import 'dotenv/config';
import mongoose from 'mongoose';
import Product from './models/Product.js';

const updateCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    // Cập nhật tất cả sản phẩm Apple thành category 'ios'
    const appleResult = await Product.updateMany(
      { brand: 'Apple' },
      { $set: { category: 'ios' } }
    );
    console.log(`✅ Đã cập nhật ${appleResult.modifiedCount} sản phẩm Apple sang category 'ios'`);

    // Cập nhật tất cả sản phẩm không phải Apple thành category 'android'
    const androidResult = await Product.updateMany(
      { brand: { $ne: 'Apple' } },
      { $set: { category: 'android' } }
    );
    console.log(`✅ Đã cập nhật ${androidResult.modifiedCount} sản phẩm Android sang category 'android'`);

    console.log('🎉 Hoàn tất! Đã phân loại sản phẩm thành IOS và ANDROID.');
    process.exit();
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    process.exit(1);
  }
};

updateCategories();
