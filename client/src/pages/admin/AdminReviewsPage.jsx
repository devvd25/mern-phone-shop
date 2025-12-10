import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios.js';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, avgRating: 0 });
//
  const loadReviews = async () => {
    try {
      const { data } = await api.get('/admin/reviews');
      setReviews(data.reviews || []);
      
      // Tính stats
      const total = data.reviews.length;
      const avgRating = total > 0 
        ? (data.reviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1)
        : 0;
      setStats({ total, avgRating });
    } catch (error) {
      console.error(error);
      alert('Lỗi tải dữ liệu!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleDelete = async (productId, reviewId) => {
    if (!confirm('Bạn có chắc muốn xóa đánh giá này?')) return;
    
    try {
      await api.delete(`/products/${productId}/reviews/${reviewId}`);
      alert('✓ Đã xóa đánh giá!');
      loadReviews();
    } catch (error) {
      alert(error.response?.data?.message || '❌ Xóa thất bại!');
    }
  };

  if (loading) {
    return (
      <div className="container my-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold" style={{ color: 'var(--primary)' }}>
          💬 Quản lý đánh giá
        </h2>
        <Link to="/admin" className="btn btn-outline-secondary">
          ← Quay lại Dashboard
        </Link>
      </div>

      {/* STATS CARDS */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <h3 className="display-6 fw-bold text-primary mb-0">{stats.total}</h3>
              <p className="text-muted mb-0">Tổng đánh giá</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <h3 className="display-6 fw-bold text-warning mb-0">{stats.avgRating} ⭐</h3>
              <p className="text-muted mb-0">Điểm trung bình</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <h3 className="display-6 fw-bold text-success mb-0">
                {reviews.filter(r => new Date(r.createdAt) > new Date(Date.now() - 7*24*60*60*1000)).length}
              </h3>
              <p className="text-muted mb-0">Mới trong 7 ngày</p>
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS TABLE */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-light border-bottom py-3">
          <h5 className="card-title mb-0 fw-bold">Danh sách đánh giá mới nhất</h5>
        </div>
        <div className="card-body p-0">
          {reviews.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: '15%' }}>Sản phẩm</th>
                    <th style={{ width: '12%' }}>Người dùng</th>
                    <th style={{ width: '8%' }}>Đánh giá</th>
                    <th style={{ width: '40%' }}>Nội dung</th>
                    <th style={{ width: '15%' }}>Thời gian</th>
                    <th style={{ width: '10%' }} className="text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr key={review._id}>
                      <td>
                        <Link 
                          to={`/product/${review.productId}`}
                          className="text-decoration-none text-primary fw-semibold"
                          style={{ fontSize: '0.9rem' }}
                        >
                          {review.productName}
                        </Link>
                      </td>
                      <td>
                        <div>
                          <strong style={{ fontSize: '0.9rem' }}>{review.username}</strong>
                        </div>
                      </td>
                      <td>
                        <div style={{ color: '#ffc107', fontSize: '1.1rem' }}>
                          {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                        </div>
                        <small className="text-muted">({review.rating}/5)</small>
                      </td>
                      <td>
                        <p className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>
                          {review.comment?.length > 100 
                            ? review.comment.substring(0, 100) + '...' 
                            : review.comment}
                        </p>
                      </td>
                      <td>
                        <small className="text-muted">
                          {new Date(review.createdAt).toLocaleString('vi-VN')}
                        </small>
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => handleDelete(review.productId, review._id)}
                          className="btn btn-danger btn-sm"
                          title="Xóa đánh giá"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-5 text-muted">
              <p>Chưa có đánh giá nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
