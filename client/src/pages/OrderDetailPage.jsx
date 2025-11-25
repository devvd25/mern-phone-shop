import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios.js';

export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
      } catch (err) {
        console.error(err);
        alert('❌ Không tìm thấy đơn hàng');
        navigate('/profile');
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="container my-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Đang tải đơn hàng...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger">
          ❌ Không tìm thấy đơn hàng
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const badges = {
      pending: { bg: 'warning', text: '⏳ Chờ xác nhận', icon: '⏳' },
      paid: { bg: 'info', text: '💳 Đã thanh toán', icon: '💳' },
      shipped: { bg: 'primary', text: '🚚 Đang giao', icon: '🚚' },
      delivered: { bg: 'success', text: '✓ Đã giao', icon: '✓' },
      cancelled: { bg: 'danger', text: '✕ Đã hủy', icon: '✕' }
    };
    return badges[status] || badges.pending;
  };

  const statusInfo = getStatusBadge(order.status);

  return (
    <div className="container my-5">
      {/* HEADER */}
      <div className="mb-4">
        <Link to="/profile" className="btn btn-link btn-sm p-0 mb-3">
          ← Quay lại tài khoản
        </Link>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h1 className="h3 fw-bold mb-2" style={{ color: 'var(--primary)' }}>
              📦 Chi tiết đơn hàng
            </h1>
            <p className="text-muted mb-0">
              Mã đơn: <strong className="text-primary">#{order._id.slice(-8).toUpperCase()}</strong>
            </p>
            <p className="text-muted small">
              Đặt lúc: {new Date(order.createdAt).toLocaleString('vi-VN')}
            </p>
          </div>
          <span className={`badge bg-${statusInfo.bg} fs-6 px-3 py-2`}>
            {statusInfo.icon} {statusInfo.text}
          </span>
        </div>
      </div>

      <div className="row g-4">
        {/* LEFT: ORDER INFO */}
        <div className="col-12 col-lg-8">
          {/* PRODUCTS */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-light border-bottom py-3">
              <h5 className="card-title mb-0 fw-bold">🛍️ Sản phẩm đã đặt</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Sản phẩm</th>
                      <th className="text-center" style={{ width: '80px' }}>Số lượng</th>
                      <th className="text-end" style={{ width: '120px' }}>Đơn giá</th>
                      <th className="text-end" style={{ width: '130px' }}>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items?.map((item, idx) => (
                      <tr key={idx} className="border-bottom">
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{
                                  width: '60px',
                                  height: '60px',
                                  objectFit: 'cover',
                                  borderRadius: '0.5rem',
                                }}
                              />
                            )}
                            <div>
                              <div className="fw-semibold">{item.name}</div>
                              <small className="text-muted">
                                {item.product ? (
                                  <Link to={`/product/${item.product}`} className="text-decoration-none">
                                    Xem sản phẩm →
                                  </Link>
                                ) : null}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td className="text-center fw-bold">{item.qty}</td>
                        <td className="text-end text-primary fw-bold">
                          {item.price?.toLocaleString('vi-VN')} ₫
                        </td>
                        <td className="text-end">
                          <strong className="text-primary">
                            {((item.price || 0) * (item.qty || 0)).toLocaleString('vi-VN')} ₫
                          </strong>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* SHIPPING ADDRESS */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-light border-bottom py-3">
              <h5 className="card-title mb-0 fw-bold">📍 Địa chỉ giao hàng</h5>
            </div>
            <div className="card-body">
              {order.shippingAddress ? (
                <div>
                  <p className="mb-2">
                    <strong>{order.shippingAddress.fullName}</strong>
                  </p>
                  <p className="mb-2">
                    📞 {order.shippingAddress.phone}
                  </p>
                  <p className="mb-0 text-muted">
                    {[
                      order.shippingAddress.street,
                      order.shippingAddress.ward,
                      order.shippingAddress.district,
                      order.shippingAddress.city,
                      order.shippingAddress.postalCode,
                    ]
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                </div>
              ) : (
                <p className="text-muted mb-0">Chưa có thông tin địa chỉ</p>
              )}
            </div>
          </div>

          {/* PAYMENT METHOD */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-light border-bottom py-3">
              <h5 className="card-title mb-0 fw-bold">💳 Phương thức thanh toán</h5>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-secondary px-3 py-2">
                  {order.paymentMethod === 'COD' ? '💵 Thanh toán khi nhận hàng (COD)' : '💳 ' + order.paymentMethod}
                </span>
                {order.isPaid && (
                  <span className="badge bg-success px-2 py-1">✓ Đã thanh toán</span>
                )}
              </div>
              {order.isPaid && order.paidAt && (
                <p className="text-muted small mb-0 mt-2">
                  Thanh toán lúc: {new Date(order.paidAt).toLocaleString('vi-VN')}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
            <div className="card-header bg-light border-bottom py-3">
              <h5 className="card-title mb-0 fw-bold">💰 Tổng đơn hàng</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Tạm tính:</span>
                <strong>{(order.itemsPrice || 0).toLocaleString('vi-VN')} ₫</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Phí vận chuyển:</span>
                <strong>{(order.shippingPrice || 0).toLocaleString('vi-VN')} ₫</strong>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
                <span className="text-muted">Thuế (10%):</span>
                <strong>{(order.taxPrice || 0).toLocaleString('vi-VN')} ₫</strong>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span className="h6 fw-bold mb-0">Tổng cộng:</span>
                <span className="h5 fw-bold text-primary mb-0">
                  {(order.totalPrice || 0).toLocaleString('vi-VN')} ₫
                </span>
              </div>

              {/* ORDER TIMELINE */}
              <div className="border-top pt-3">
                <h6 className="fw-bold mb-3">📅 Lịch sử đơn hàng</h6>
                <div className="timeline">
                  <div className="timeline-item">
                    <span className="badge bg-success mb-1">✓</span>
                    <small className="d-block text-muted">Đã đặt hàng</small>
                    <small className="text-muted">
                      {new Date(order.createdAt).toLocaleString('vi-VN', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </small>
                  </div>

                  {order.isPaid && order.paidAt && (
                    <div className="timeline-item mt-2">
                      <span className="badge bg-success mb-1">✓</span>
                      <small className="d-block text-muted">Đã thanh toán</small>
                      <small className="text-muted">
                        {new Date(order.paidAt).toLocaleString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </small>
                    </div>
                  )}

                  {order.status === 'shipped' && (
                    <div className="timeline-item mt-2">
                      <span className="badge bg-primary mb-1">🚚</span>
                      <small className="d-block text-muted">Đang giao hàng</small>
                    </div>
                  )}

                  {order.status === 'delivered' && order.deliveredAt && (
                    <div className="timeline-item mt-2">
                      <span className="badge bg-success mb-1">✓</span>
                      <small className="d-block text-muted">Đã giao hàng</small>
                      <small className="text-muted">
                        {new Date(order.deliveredAt).toLocaleString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </small>
                    </div>
                  )}

                  {order.status === 'cancelled' && (
                    <div className="timeline-item mt-2">
                      <span className="badge bg-danger mb-1">✕</span>
                      <small className="d-block text-muted">Đã hủy</small>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
