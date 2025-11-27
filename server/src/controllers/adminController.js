import User from '../models/User.js';
import Order from '../models/Order.js';

// GET /api/admin/users
export async function listUsers(req, res) {
  const users = await User.find({}).select('-password').sort({ createdAt: -1 });
  res.json(users);
}

// GET /api/admin/users/:id/orders
export async function listUserOrders(req, res) {
  const userId = req.params.id;
  const orders = await Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate('user', 'username email');
  res.json(orders);
}

// DELETE /api/admin/users/:id
export async function deleteUser(req, res) {
  const userId = req.params.id;
  const user = await User.findById(userId);
  
  if (!user) {
    return res.status(404).json({ message: 'Không tìm thấy người dùng' });
  }
  
  // Prevent deleting admin users
  if (user.role === 'admin') {
    return res.status(403).json({ message: 'Không thể xóa tài khoản admin' });
  }
  
  await User.findByIdAndDelete(userId);
  res.json({ message: 'Đã xóa người dùng' });
}
