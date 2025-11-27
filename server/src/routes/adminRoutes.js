import express from 'express';
import { protect, isAdmin } from '../middleware/auth.js';
import { listUsers, listUserOrders, deleteUser } from '../controllers/adminController.js';

const router = express.Router();

// tất cả route /api/admin/* đều cần admin
router.use(protect, isAdmin);

// quản lý user
router.get('/users', listUsers);
router.get('/users/:id/orders', listUserOrders);
router.delete('/users/:id', deleteUser);

export default router;
