import 'dotenv/config';
import mongoose from 'mongoose';
import Product from './models/Product.js';
import User from './models/User.js';

// Danh sách tên người dùng Việt Nam
const vietnameseNames = [
  'Nguyễn Văn An', 'Trần Thị Bình', 'Lê Văn Cường', 'Phạm Thị Dung', 'Hoàng Văn Em',
  'Vũ Thị Hoa', 'Đặng Văn Khoa', 'Bùi Thị Lan', 'Đỗ Văn Minh', 'Ngô Thị Nga',
  'Dương Văn Phúc', 'Lý Thị Quỳnh', 'Phan Văn Sơn', 'Đinh Thị Trang', 'Mai Văn Tú',
  'Cao Thị Uyên', 'Tô Văn Vinh', 'Võ Thị Xuân', 'Hồ Văn Yên', 'Chu Thị Ánh',
  'Trịnh Văn Bảo', 'Lưu Thị Chi', 'Đoàn Văn Đức', 'Thái Thị Hằng', 'La Văn Hùng',
  'Đàm Thị Kim', 'Trương Văn Long', 'Lâm Thị Mai', 'Hà Văn Nam', 'Tạ Thị Oanh',
  'Huỳnh Văn Phong', 'Đinh Thị Quyên', 'Vương Văn Rồng', 'Phan Thị Sương', 'Nghiêm Văn Tài',
  'Lý Thị Thảo', 'Đỗ Văn Thắng', 'Dương Thị Thu', 'Nguyễn Văn Tiến', 'Trần Thị Vân'
];

// Danh sách bình luận tích cực
const positiveComments = [
  'Sản phẩm rất tốt, đáng tiền!',
  'Máy đẹp, chạy mượt mà, rất hài lòng!',
  'Giao hàng nhanh, đóng gói cẩn thận',
  'Chất lượng tuyệt vời, giá cả hợp lý',
  'Máy đúng như mô tả, pin trâu',
  'Camera chụp ảnh rất đẹp, rất ưng ý',
  'Shop uy tín, sẽ tiếp tục ủng hộ',
  'Máy ngon, giá tốt, ship nhanh',
  'Dùng rất tốt, màn hình đẹp',
  'Sản phẩm chất lượng, đóng gói kỹ càng',
  'Máy chính hãng, bảo hành tốt',
  'Hiệu năng mạnh mẽ, chơi game mượt',
  'Pin khỏe, sạc nhanh, rất tiện lợi',
  'Thiết kế đẹp, cầm tay sang trọng',
  'Âm thanh tốt, màn hình sắc nét',
  'Máy mới 100%, không có gì để chê',
  'Giá rẻ hơn nhiều nơi, rất đáng mua',
  'Shop tư vấn nhiệt tình, chuyên nghiệp',
  'Sản phẩm y hình, không có lỗi',
  'Rất hài lòng với lần mua này',
  'Dùng rất mượt, không lag giật',
  'Camera selfie đẹp xuất sắc',
  'Máy đẹp long lanh, rất thích',
  'Chất lượng vượt mong đợi',
  'Sẽ giới thiệu shop cho bạn bè',
  'Giao đúng hẹn, máy nguyên seal',
  'Giá cả phải chăng, chất lượng cao',
  'Máy ngon bổ rẻ, đáng đồng tiền',
  'Camera siêu nét, màu sắc đẹp',
  'Pin trâu, dùng cả ngày không lo',
  'Máy mượt, cấu hình khỏe',
  'Shop uy tín, sẽ quay lại mua tiếp',
  'Sản phẩm tốt, bảo hành chu đáo',
  'Máy đẹp, vừa tay, rất thích',
  'Chơi game cực mượt, không nóng máy',
  'Âm thanh trong trẻo, bass mạnh',
  'Màn hình sáng đẹp, góc nhìn rộng',
  'Rất đáng tiền, ai cần mua ngay!',
  'Cảm ơn shop, sẽ ủng hộ dài dài',
  'Máy xịn, giá tốt, ship siêu nhanh!'
];

// Hàm random số trong khoảng
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Hàm random phần tử từ mảng
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Hàm tạo review ngẫu nhiên
function generateRandomReviews(count, users) {
  const reviews = [];
  const usedNames = new Set();
  
  for (let i = 0; i < count; i++) {
    let name;
    do {
      name = randomItem(vietnameseNames);
    } while (usedNames.has(name) && usedNames.size < vietnameseNames.length);
    usedNames.add(name);
    
    // Random rating từ 3-5 sao (thiên về rating cao)
    const ratingWeights = [3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5];
    const rating = randomItem(ratingWeights);
    
    // Random một user từ danh sách
    const user = randomItem(users);
    
    reviews.push({
      user: user._id,
      username: name,
      rating,
      comment: randomItem(positiveComments)
    });
  }
  
  return reviews;
}

const addReviews = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    // Lấy tất cả users
    const users = await User.find({});
    if (users.length === 0) {
      console.log('⚠️  Không có user nào trong database. Vui lòng tạo ít nhất 1 user trước.');
      process.exit(1);
    }
    console.log(`👥 Tìm thấy ${users.length} users`);

    const products = await Product.find({});
    console.log(`📦 Tìm thấy ${products.length} sản phẩm`);

    let totalReviewsAdded = 0;

    for (const product of products) {
      // Random số lượng review từ 5-15 cho mỗi sản phẩm
      const reviewCount = randomInt(5, 15);
      
      // Tạo reviews ngẫu nhiên
      const newReviews = generateRandomReviews(reviewCount, users);
      
      // Cập nhật reviews cho sản phẩm
      product.reviews = newReviews;
      
      // Tính toán rating trung bình
      const totalRating = newReviews.reduce((sum, r) => sum + r.rating, 0);
      product.rating = totalRating / newReviews.length;
      product.numReviews = newReviews.length;
      
      await product.save();
      
      totalReviewsAdded += reviewCount;
      console.log(`✅ ${product.name}: ${reviewCount} reviews (rating: ${product.rating.toFixed(1)}⭐)`);
    }

    console.log(`\n🎉 Hoàn tất! Đã thêm tổng cộng ${totalReviewsAdded} reviews cho ${products.length} sản phẩm.`);
    process.exit();
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    process.exit(1);
  }
};

addReviews();
