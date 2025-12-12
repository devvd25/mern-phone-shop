import Product from '../models/Product.js';
import { body, validationResult } from 'express-validator';

export const validateProduct = [
  body('name').notEmpty(),
  body('description').notEmpty(),
  body('price').isFloat({ min: 0 }),
  body('category').notEmpty(),
  body('brand').notEmpty()
];

export async function listProducts(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  const keyword = (req.query.keyword || '').trim();
  const category = req.query.category;
  const brand = req.query.brand;
  const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
  const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;
  const minRating = req.query.rating ? Number(req.query.rating) : undefined;
  const sort = req.query.sort || '-createdAt'; // price, -price, rating, -rating

  const filter = {};
  if (keyword) {
    const esc = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const prefix = new RegExp(`\\b${esc}`, 'i');   // match beginning of a word
    const contains = new RegExp(esc, 'i');
    filter.$or = [
      { name: prefix },
      { brand: prefix },
      { description: contains }
    ];
  }
  if (category) filter.category = category; // exact match
  if (brand) filter.brand = brand;
  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};
    if (minPrice !== undefined) filter.price.$gte = minPrice;
    if (maxPrice !== undefined) filter.price.$lte = maxPrice;
  }
  if (minRating !== undefined) filter.rating = { $gte: minRating };

  const [total, products] = await Promise.all([
    Product.countDocuments(filter),
    Product.find(filter).sort(sort).skip(skip).limit(limit)
  ]);
  // Return paginated results
  res.json({
    page, pages: Math.ceil(total / limit), total, products
  });
}

export async function getProduct(req, res) {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
  res.json(p);
}

export async function createProduct(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const prod = await Product.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    images: req.body.images || [],
    category: req.body.category,
    brand: req.body.brand,
    quantity: req.body.quantity || 0,
    specs: req.body.specs || {}
  });
  res.status(201).json(prod);
}

export async function updateProduct(req, res) {
  const prod = await Product.findById(req.params.id);
  if (!prod) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });

  const fields = ['name','description','price','images','category','brand','quantity','specs'];
  for (const f of fields) if (req.body[f] !== undefined) prod[f] = req.body[f];
  await prod.save();
  res.json(prod);
}

export async function deleteProduct(req, res) {
  const prod = await Product.findById(req.params.id);
  if (!prod) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
  await prod.deleteOne();
  res.json({ message: 'Đã xoá sản phẩm' });
}

export async function createReview(req, res) {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });

  const already = (product.reviews || []).find(r => r.user?.toString() === req.user._id.toString());
  if (already) return res.status(400).json({ message: 'Bạn đã đánh giá sản phẩm này' });

  const review = {
    user: req.user._id,
    username: req.user.username,
    rating: Number(rating),
    comment
  };
  if (!product.reviews) product.reviews = [];
  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating = product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;
  await product.save();
  res.status(201).json({ message: 'Đã thêm đánh giá' });
}
