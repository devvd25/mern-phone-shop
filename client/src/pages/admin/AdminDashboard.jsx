import React, { useEffect, useState } from 'react';
import api from '../../api/axios.js';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    productCount: 0,
    orderCount: 0,
    userCount: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [prodRes, orderRes, userRes] = await Promise.all([
          api.get('/products', { params: { limit: 1 } }),
          api.get('/orders'),
          api.get('/admin/users'),
        ]);

        const productsData = prodRes.data;
        const orders = orderRes.data;
        const users = userRes.data;

        const revenue = orders.reduce(
          (sum, o) => sum + (o.totalPrice || 0),
          0
        );

        setStats({
          productCount: productsData.total || productsData.products?.length || 0,
          orderCount: orders.length || 0,
          userCount: users.length || 0,
          revenue,
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleResetRevenue = async () => {
    if (!showResetConfirm) {
      setShowResetConfirm(true);
      return;
    }

    try {
      // Reset all orders' totalPrice to 0 or delete orders
      // For simplicity, we'll just recalculate or show a message
      alert('⚠️ Tính năng reset doanh thu yêu cầu xoá lịch sử đơn hàng. Vui lòng xoá từng đơn hàng trong phần Quản lý đơn hàng.');
      setShowResetConfirm(false);
    } catch (e) {
      console.error(e);
      alert('❌ Lỗi khi reset doanh thu');
      setShowResetConfirm(false);
    }
  };

  return (
    <div className="container my-5">
      {/* HEADER */}
      <div className="mb-5">
        <h1 className="display-5 fw-bold mb-2" style={{ color: 'var(--primary)' }}>
          📊 Dashboard Admin
        </h1>
        <p className="lead text-muted">
          Quản lý toàn bộ cửa hàng từ đây
        </p>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Đang tải dữ liệu...</p>
        </div>
      ) : (
        <>
          {/* STATS CARDS */}
          <div className="row g-4 mb-5">
            {/* PRODUCTS */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100 transition" style={{ cursor: 'pointer' }}>
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div>
                      <p className="text-muted small mb-0">📦 Sản phẩm</p>
                      <h2 className="h3 fw-bold mb-0 text-primary">{stats.productCount}</h2>
                    </div>
                    <div style={{ fontSize: '2rem', opacity: 0.2 }}>📦</div>
                  </div>
                  <p className="small text-muted mb-0">Tổng số sản phẩm</p>
                </div>
                <Link
                  to="/admin/products"
                  className="card-footer text-decoration-none bg-light text-primary fw-bold py-2 text-center"
                  style={{ borderTop: '1px solid var(--border-color)' }}
                >
                  Quản lý sản phẩm →
                </Link>
              </div>
            </div>

            {/* ORDERS */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div>
                      <p className="text-muted small mb-0">📋 Đơn hàng</p>
                      <h2 className="h3 fw-bold mb-0 text-success">{stats.orderCount}</h2>
                    </div>
                    <div style={{ fontSize: '2rem', opacity: 0.2 }}>📋</div>
                  </div>
                  <p className="small text-muted mb-0">Đơn hàng tổng cộng</p>
                </div>
                <Link
                  to="/admin/orders"
                  className="card-footer text-decoration-none bg-light text-success fw-bold py-2 text-center"
                  style={{ borderTop: '1px solid var(--border-color)' }}
                >
                  Quản lý đơn hàng →
                </Link>
              </div>
            </div>

            {/* USERS */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div>
                      <p className="text-muted small mb-0">👥 Người dùng</p>
                      <h2 className="h3 fw-bold mb-0 text-info">{stats.userCount}</h2>
                    </div>
                    <div style={{ fontSize: '2rem', opacity: 0.2 }}>👥</div>
                  </div>
                  <p className="small text-muted mb-0">Tài khoản đã tạo</p>
                </div>
                <Link
                  to="/admin/users"
                  className="card-footer text-decoration-none bg-light text-info fw-bold py-2 text-center"
                  style={{ borderTop: '1px solid var(--border-color)' }}
                >
                  Quản lý người dùng →
                </Link>
              </div>
            </div>

            {/* REVENUE */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div>
                      <p className="text-muted small mb-0">💰 Doanh thu</p>
                      <h3 className="fw-bold mb-0 text-warning" style={{ fontSize: '1.1rem' }}>
                        {(stats.revenue / 1000000).toFixed(1)}M ₫
                      </h3>
                    </div>
                    <div style={{ fontSize: '2rem', opacity: 0.2 }}>💰</div>
                  </div>
                  <p className="small text-muted mb-0">
                    {stats.revenue.toLocaleString('vi-VN')} ₫
                  </p>
                </div>
                <button
                  className="btn btn-sm btn-outline-warning w-100"
                  style={{ borderTop: '1px solid var(--border-color)' }}
                  onClick={handleResetRevenue}
                >
                  🔄 Reset doanh thu
                </button>
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-bold mb-3" style={{ color: 'var(--primary)' }}>
                🚀 Hành động nhanh
              </h5>
              <div className="row g-2">
                <div className="col-12 col-sm-6 col-md-4">
                  <Link
                    to="/admin/products"
                    className="btn btn-outline-primary w-100"
                  >
                    Quản lý sản phẩm
                  </Link>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <Link
                    to="/admin/orders"
                    className="btn btn-outline-success w-100"
                  >
                    Xem đơn hàng
                  </Link>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <Link
                    to="/admin/users"
                    className="btn btn-outline-info w-100"
                  >
                    Quản lý người dùng
                  </Link>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <Link
                    to="/admin/settings"
                    className="btn btn-outline-warning w-100"
                  >
                    Cài đặt giao diện
                  </Link>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <Link
                    to="/admin/reviews"
                    className="btn btn-outline-secondary w-100"
                  >
                    💬 Quản lý đánh giá
                  </Link>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <Link
                    to="/admin/banners"
                    className="btn btn-outline-danger w-100"
                  >
                    🎨 Quản lý Banners
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* RESET REVENUE CONFIRMATION MODAL */}
      {showResetConfirm && (
        <div
          className="modal fade show"
          style={{
            display: 'block',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            overflowY: 'auto',
          }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-light border-bottom">
                <h5 className="modal-title fw-bold text-warning">⚠️ Reset doanh thu</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowResetConfirm(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="mb-0">
                  Để reset doanh thu, bạn cần xoá lịch sử đơn hàng. <br />
                  <strong className="text-warning">
                    Bạn có muốn chuyển sang trang quản lý đơn hàng để xoá?
                  </strong>
                </p>
              </div>
              <div className="modal-footer border-top">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setShowResetConfirm(false)}
                >
                  Hủy
                </button>
                <Link
                  to="/admin/orders"
                  className="btn btn-warning btn-sm text-dark fw-bold"
                >
                  ✓ Đi đến quản lý đơn hàng
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
