import React, { useEffect, useState } from 'react';
import api from '../../api/axios.js';
///
export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoadingUsers(true);
        const { data } = await api.get('/admin/users');
        setUsers(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingUsers(false);
      }
    }
    loadUsers();
  }, []);

  const handleViewOrders = async (user) => {
    setSelectedUser(user);
    setOrders([]);
    try {
      setLoadingOrders(true);
      const { data } = await api.get(`/admin/users/${user._id}/orders`);
      setOrders(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!deleteConfirm || deleteConfirm.id !== userId) {
      setDeleteConfirm({ id: userId, type: 'user' });
      return;
    }

    try {
      await api.delete(`/admin/users/${userId}`);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      if (selectedUser?._id === userId) {
        setSelectedUser(null);
        setOrders([]);
      }
      setDeleteConfirm(null);
      alert('✓ Xoá người dùng thành công!');
    } catch (err) {
      console.error(err);
      alert('❌ Xoá người dùng thất bại');
    }
  };

  return (
    <div className="container my-5">
      <h1 className="h3 fw-bold mb-4" style={{ color: 'var(--primary)' }}>
        👥 Quản lý người dùng
      </h1>

      <div className="row g-4">
        {/* USER LIST */}
        <div className="col-12 col-lg-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-light border-bottom py-3">
              <h5 className="card-title mb-0 fw-bold">
                Danh sách người dùng ({users.length})
              </h5>
            </div>
            <div className="card-body p-0" style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {loadingUsers ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted mb-0">Chưa có người dùng nào.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Email</th>
                        <th>Tên</th>
                        <th>Role</th>
                        <th className="text-end" style={{ width: '120px' }}>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr
                          key={u._id}
                          className={selectedUser?._id === u._id ? 'table-active' : ''}
                        >
                          <td>
                            <small className="text-muted">{u.email}</small>
                          </td>
                          <td>
                            <strong>{u.username}</strong>
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                u.role === 'admin' ? 'bg-danger' : 'bg-secondary'
                              }`}
                            >
                              {u.role === 'admin' ? '👑 Admin' : '👤 User'}
                            </span>
                          </td>
                          <td className="text-end">
                            <button
                              className="btn btn-outline-primary btn-sm me-2"
                              onClick={() => handleViewOrders(u)}
                            >
                              Xem
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDeleteUser(u._id)}
                              title="Xoá người dùng"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* USER ORDERS */}
        <div className="col-12 col-lg-5">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-light border-bottom py-3">
              <h5 className="card-title mb-0 fw-bold">
                📦 Đơn hàng của:{' '}
                {selectedUser ? (
                  <span className="text-primary">{selectedUser.email}</span>
                ) : (
                  <span className="text-muted">—</span>
                )}
              </h5>
            </div>
            <div className="card-body">
              {!selectedUser ? (
                <div className="text-center py-5">
                  <p className="text-muted mb-0">
                    👈 Chọn một người dùng ở bảng bên trái để xem đơn hàng.
                  </p>
                </div>
              ) : loadingOrders ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted mb-0">Người dùng này chưa có đơn hàng nào.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-sm align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '70px' }}>Mã</th>
                        <th>Ngày đặt</th>
                        <th className="text-end" style={{ width: '100px' }}>
                          Tổng
                        </th>
                        <th>Trạng thái</th>
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
                          <td className="small text-muted">
                            {new Date(o.createdAt).toLocaleString('vi-VN')}
                          </td>
                          <td className="text-end">
                            <strong className="text-primary">
                              {o.totalPrice?.toLocaleString('vi-VN')} ₫
                            </strong>
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                o.status === 'delivered'
                                  ? 'bg-success'
                                  : o.status === 'cancelled'
                                  ? 'bg-danger'
                                  : o.status === 'shipped'
                                  ? 'bg-info'
                                  : 'bg-warning'
                              }`}
                            >
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirm && deleteConfirm.type === 'user' && (
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
                <h5 className="modal-title fw-bold text-danger">⚠️ Xoá người dùng</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setDeleteConfirm(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="mb-0">
                  Bạn chắc chắn muốn xoá người dùng này? <br />
                  <strong className="text-danger">
                    {users.find((u) => u._id === deleteConfirm.id)?.email}
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
                  onClick={() => handleDeleteUser(deleteConfirm.id)}
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
