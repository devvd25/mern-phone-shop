export function notFound(req, res, next) {
  const error = new Error(`Không tìm thấy - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

export function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message || 'Lỗi máy chủ',
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
}
