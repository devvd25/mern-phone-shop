import { verifyToken } from '../utils/token.js';
import User from '../models/User.js';

export async function protect(req, res, next) {
  try {
    const cookieName = process.env.COOKIE_NAME || 'jwt';
    const token = req.cookies[cookieName];
    if (!token) return res.status(401).json({ message: 'Chưa đăng nhập' });
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'Không tìm thấy người dùng' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token không hợp lệ' });
  }
}

export function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ message: 'Chỉ quản trị viên mới có quyền' });
}
