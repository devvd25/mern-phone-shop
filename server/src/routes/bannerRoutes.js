import express from 'express';
import { protect, isAdmin } from '../middleware/auth.js';
import { 
  getBanners, 
  createBanner, 
  updateBanner, 
  deleteBanner,
  getAllBannersAdmin 
} from '../controllers/bannerController.js';

const router = express.Router();

// Public routes
router.get('/', getBanners);

// Admin routes
router.get('/admin', protect, isAdmin, getAllBannersAdmin);
router.post('/admin', protect, isAdmin, createBanner);
router.put('/admin/:id', protect, isAdmin, updateBanner);
router.delete('/admin/:id', protect, isAdmin, deleteBanner);

export default router;
