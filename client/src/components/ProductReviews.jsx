import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../api/axios.js';

export default function ProductReviews({ productId, reviews, onReviewAdded }) {
  const { user } = useSelector(s => s.auth);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  const hasReviewed = reviews?.some(r => r.user === user?._id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Vui lòng đăng nhập để đánh giá!');
      return;
    }

    setSubmitting(true);
    try {
      const { data } = await api.post(`/products/${productId}/reviews`, { rating, comment });
      alert('✓ Đánh giá thành công!');
      setComment('');
      setRating(5);
      onReviewAdded();
    } catch (error) {
      alert(error.response?.data?.message || '❌ Đánh giá thất bại!');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (reviewId) => {
    setSubmitting(true);
    try {
      await api.put(`/products/${productId}/reviews/${reviewId}`, { 
        rating: editingReview.rating, 
        comment: editingReview.comment 
      });
      alert('✓ Cập nhật đánh giá thành công!');
      setEditingReview(null);
      onReviewAdded();
    } catch (error) {
      alert(error.response?.data?.message || '❌ Cập nhật thất bại!');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!confirm('Bạn có chắc muốn xóa đánh giá này?')) return;
    
    try {
      await api.delete(`/products/${productId}/reviews/${reviewId}`);
      alert('✓ Đã xóa đánh giá!');
      onReviewAdded();
    } catch (error) {
      alert(error.response?.data?.message || '❌ Xóa thất bại!');
    }
  };

  return (
    <div className="container my-4">
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-light border-bottom py-3">
          <h5 className="card-title mb-0 fw-bold">
            💬 Đánh giá sản phẩm ({reviews?.length || 0})
          </h5>
        </div>
        <div className="card-body">
          {/* FORM THÊM ĐÁNH GIÁ */}
          {user && !hasReviewed && (
            <form onSubmit={handleSubmit} className="mb-4 p-3 bg-light rounded">
              <h6 className="fw-bold mb-3">✍️ Viết đánh giá của bạn</h6>
              
              <div className="mb-3">
                <label className="form-label fw-bold">Đánh giá:</label>
                <div className="d-flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="btn btn-sm"
                      style={{
                        fontSize: '1.5rem',
                        color: star <= rating ? '#ffc107' : '#dee2e6',
                        border: 'none',
                        padding: '0',
                        background: 'none'
                      }}
                    >
                      ★
                    </button>
                  ))}
                  <span className="ms-2 align-self-center text-muted">({rating} sao)</span>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Nhận xét:</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary fw-bold"
                disabled={submitting}
              >
                {submitting ? 'Đang gửi...' : '✓ Gửi đánh giá'}
              </button>
            </form>
          )}

          {!user && (
            <div className="alert alert-info mb-4">
              <strong>ℹ️ </strong>Vui lòng đăng nhập để viết đánh giá!
            </div>
          )}

          {hasReviewed && (
            <div className="alert alert-success mb-4">
              <strong>✓ </strong>Bạn đã đánh giá sản phẩm này rồi!
            </div>
          )}

          {/* DANH SÁCH ĐÁNH GIÁ */}
          <div className="reviews-list">
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} className="mb-3 p-3 border rounded">
                  {editingReview?._id === review._id ? (
                    // FORM SỬA
                    <div>
                      <div className="mb-2">
                        <label className="form-label fw-bold small">Đánh giá:</label>
                        <div className="d-flex gap-1">
                          {[1, 2, 3, 4, 5].map(star => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setEditingReview({...editingReview, rating: star})}
                              className="btn btn-sm"
                              style={{
                                fontSize: '1.2rem',
                                color: star <= editingReview.rating ? '#ffc107' : '#dee2e6',
                                border: 'none',
                                padding: '0',
                                background: 'none'
                              }}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="mb-2">
                        <textarea
                          className="form-control form-control-sm"
                          rows="2"
                          value={editingReview.comment}
                          onChange={(e) => setEditingReview({...editingReview, comment: e.target.value})}
                        />
                      </div>
                      <div className="d-flex gap-2">
                        <button 
                          onClick={() => handleEdit(review._id)}
                          className="btn btn-success btn-sm"
                          disabled={submitting}
                        >
                          ✓ Lưu
                        </button>
                        <button 
                          onClick={() => setEditingReview(null)}
                          className="btn btn-secondary btn-sm"
                        >
                          ✕ Hủy
                        </button>
                      </div>
                    </div>
                  ) : (
                    // HIỂN THỊ BÌNH THƯỜNG
                    <>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <strong className="text-primary">{review.username}</strong>
                          <div className="text-muted small">
                            {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                          </div>
                        </div>
                        <div className="d-flex gap-2">
                          <div style={{ color: '#ffc107' }}>
                            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                          </div>
                          {(user?._id === review.user || user?.role === 'admin') && (
                            <div className="dropdown">
                              <button 
                                className="btn btn-sm btn-outline-secondary dropdown-toggle" 
                                data-bs-toggle="dropdown"
                              >
                                ⋮
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                  <button 
                                    className="dropdown-item" 
                                    onClick={() => setEditingReview(review)}
                                  >
                                    ✏️ Sửa
                                  </button>
                                </li>
                                <li>
                                  <button 
                                    className="dropdown-item text-danger" 
                                    onClick={() => handleDelete(review._id)}
                                  >
                                    🗑️ Xóa
                                  </button>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="mb-0 text-muted">{review.comment}</p>
                    </>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-muted">
                <p>Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm này!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
