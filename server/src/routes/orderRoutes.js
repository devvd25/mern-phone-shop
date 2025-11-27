import express from 'express';
import { protect, isAdmin } from '../middleware/auth.js';
import { createOrder, getMyOrders, getOrderById, markPaid, listAllOrders, updateOrderStatus, deleteOrder } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/mine', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, markPaid);

// Admin
router.get('/', protect, isAdmin, listAllOrders);
router.put('/:id/status', protect, isAdmin, updateOrderStatus);
router.delete('/:id', protect, isAdmin, deleteOrder);

export default router;
