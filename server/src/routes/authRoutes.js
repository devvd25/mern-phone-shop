import express from 'express';
import rateLimit from 'express-rate-limit';
import { protect } from '../middleware/auth.js';
import { 
  register, 
  login, 
  logout, 
  me, 
  updateProfile, 
  forgotPassword, 
  resetPassword, 
  validateRegister, 
  validateLogin 
} from '../controllers/authController.js';

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false
});

router.use(authLimiter);

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/me', protect, me);
router.put('/me', protect, updateProfile);

export default router;
