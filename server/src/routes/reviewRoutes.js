import express from 'express';
import { protect, isAdmin } from '../middleware/auth.js';
import { 
  createReview, 
  updateReview, 
  deleteReview, 
  getAllReviews 
} from '../controllers/reviewController.js';

const router = express.Router();

// User routes
router.post('/products/:id/reviews', protect, createReview);
router.put('/products/:productId/reviews/:reviewId', protect, updateReview);
router.delete('/products/:productId/reviews/:reviewId', protect, deleteReview);

// Admin routes
router.get('/admin/reviews', protect, isAdmin, getAllReviews);

export default router;
