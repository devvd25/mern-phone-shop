import express from 'express';
import {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createReview,
  validateProduct,
} from '../controllers/productController.js';
import { protect, isAdmin } from '../middleware/auth.js';
// tạo router
const router = express.Router();

// /api/products
router
  .route('/')
  .get(listProducts)                                   // GET /api/products
  .post(protect, isAdmin, validateProduct, createProduct); // POST /api/products

// /api/products/:id
router
  .route('/:id')
  .get(getProduct)                                    // GET /api/products/:id
  .put(protect, isAdmin, validateProduct, updateProduct)
  .delete(protect, isAdmin, deleteProduct);

// đánh giá sản phẩm
router.post('/:id/reviews', protect, createReview);

export default router;
