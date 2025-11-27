import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = process.env.UPLOAD_DIR || 'uploads';

export async function uploadImage(req, res) {
  if (!req.file) return res.status(400).json({ message: 'Không có file' });
  // Return public path
  const url = `/uploads/${req.file.filename}`;
  res.status(201).json({ url });
}
