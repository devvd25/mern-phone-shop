import React, { useEffect, useState } from 'react';
import api from '../../api/axios.js';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/orders');
      setOrders(data);
    } catch (e) {
      console.error(e);
      alert('Lỗi khi tải đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status });
      await load();
    } catch (e) {
      console.error(e);
      alert('Cập nhật trạng thái thất bại');
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: 'warning',
      paid: 'info',
      shipped: 'primary',
      delivered: 'success',
      cancelled: 'danger',
    };
    return statusMap[status] || 'secondary';
  };

  const handleDeleteOrder = async (orderId) => {
    if (!deleteConfirm || deleteConfirm.id !== orderId) {
      setDeleteConfirm({ id: orderId, type: 'order' });
      return;
    }

    try {
      await api.delete(`/orders/${orderId}`);
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
      setDeleteConfirm(null);
      alert('✓ Xoá đơn hàng thành công!');
    } catch (err) {
      console.error(err);
      alert('❌ Xoá đơn hàng thất bại');
    }
  };

  return (
    <div className="container my-5">
      <h1 className="h3 fw-bold mb-4" style={{ color: 'var(--primary)' }}>
        📋 Quản lý đơn hàng
      </h1>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Đang tải dữ liệu...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="alert alert-info text-center py-5" role="alert">
          <h5 className="mb-0">Chưa có đơn hàng nào</h5>
        </div>
      ) : (
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-light border-bottom py-3">
            <h5 className="card-title mb-0 fw-bold">
              Tổng cộng: {orders.length} đơn hàng
            </h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: '80px' }}>Mã</th>
                    <th>Khách hàng</th>
                    <th style={{ width: '150px' }}>Ngày đặt</th>
                    <th className="text-end" style={{ width: '120px' }}>
                      Tổng tiền
                    </th>
                    <th style={{ width: '180px' }}>Trạng thái</th>
                    <th className="text-center" style={{ width: '60px' }}>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o._id} className="border-bottom">
                      <td>
                        <span className="badge bg-secondary">
                          {o._id.slice(-6).toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <div>
                          <strong>{o.user?.username || 'N/A'}</strong>
                          <br />
                          <small className="text-muted">{o.user?.email || ''}</small>
                        </div>
                      </td>
                      <td className="small text-muted">
                        {new Date(o.createdAt).toLocaleString('vi-VN')}
                      </td>
                      <td className="text-end">
                        <strong className="text-primary">
                          {o.totalPrice?.toLocaleString('vi-VN')} ₫
                        </strong>
                      </td>
                      <td>
                        <select
                          value={o.status}
                          onChange={(e) => updateStatus(o._id, e.target.value)}
                          className="form-select form-select-sm"
                          style={{
                            borderColor: `var(--bs-${getStatusBadge(o.status)})`,
                          }}
                        >
                          <option value="pending">⏳ Chờ xác nhận</option>
                          <option value="paid">✓ Đã thanh toán</option>
                          <option value="shipped">📦 Đang giao</option>
                          <option value="delivered">🎉 Đã giao</option>
                          <option value="cancelled">✕ Hủy đơn</option>
                        </select>
                      </td>
                      <td className="text-center">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteOrder(o._id)}
                          title="Xoá đơn hàng"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirm && deleteConfirm.type === 'order' && (
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
                <h5 className="modal-title fw-bold text-danger">⚠️ Xoá đơn hàng</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setDeleteConfirm(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="mb-0">
                  Bạn chắc chắn muốn xoá đơn hàng này? <br />
                  <strong className="text-danger">
                    Mã đơn: {orders.find((o) => o._id === deleteConfirm.id)?._id.slice(-6).toUpperCase()}
                  </strong>
                </p>
              </div>
              <div className="modal-footer border-top">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setDeleteConfirm(null)}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteOrder(deleteConfirm.id)}
                >
                  ✓ Xoá
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
