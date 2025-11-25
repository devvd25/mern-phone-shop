import express from 'express';
import multer from 'multer';
import path from 'path';
import { protect, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// nơi lưu file: thư mục /server/uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ cho phép upload file ảnh'), false);
  }
}

const upload = multer({ storage, fileFilter });

// POST /api/upload
router.post(
  '/',
  protect,
  isAdmin,
  upload.single('image'),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'Không có file nào được upload' });
    }

    // URL tuyệt đối để React dùng luôn
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(201).json({ url: fileUrl });
  }
);

export default router;
