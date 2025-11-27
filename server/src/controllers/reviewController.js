import Product from '../models/Product.js';

// Thêm review cho sản phẩm
export async function createReview(req, res) {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    // Kiểm tra user đã review chưa
    const alreadyReviewed = product.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Bạn đã đánh giá sản phẩm này rồi' });
    }

    const review = {
      user: req.user._id,
      username: req.user.username,
      rating: Number(rating),
      comment
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Đánh giá đã được thêm', review: product.reviews[product.reviews.length - 1] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Sửa review
export async function updateReview(req, res) {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    const review = product.reviews.id(req.params.reviewId);
    
    if (!review) {
      return res.status(404).json({ message: 'Không tìm thấy đánh giá' });
    }

    // Kiểm tra quyền (chỉ user tạo hoặc admin mới được sửa)
    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Không có quyền sửa đánh giá này' });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    // Tính lại rating trung bình
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();
    res.json({ message: 'Đánh giá đã được cập nhật', review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Xóa review
export async function deleteReview(req, res) {
  try {
    const product = await Product.findById(req.params.productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    const review = product.reviews.id(req.params.reviewId);
    
    if (!review) {
      return res.status(404).json({ message: 'Không tìm thấy đánh giá' });
    }

    // Kiểm tra quyền (chỉ user tạo hoặc admin mới được xóa)
    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Không có quyền xóa đánh giá này' });
    }

    product.reviews.pull(req.params.reviewId);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.length > 0 
      ? product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length 
      : 0;

    await product.save();
    res.json({ message: 'Đánh giá đã được xóa' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Lấy tất cả reviews mới nhất (cho admin)
export async function getAllReviews(req, res) {
  try {
    const products = await Product.find({})
      .select('name reviews')
      .populate('reviews.user', 'username email');
    
    // Gộp tất cả reviews và sắp xếp theo thời gian mới nhất
    const allReviews = [];
    products.forEach(product => {
      product.reviews.forEach(review => {
        allReviews.push({
          _id: review._id,
          productId: product._id,
          productName: product.name,
          user: review.user,
          username: review.username,
          rating: review.rating,
          comment: review.comment,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt
        });
      });
    });

    // Sắp xếp theo thời gian mới nhất
    allReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      total: allReviews.length,
      reviews: allReviews.slice(0, 50) // Lấy 50 reviews mới nhất
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
