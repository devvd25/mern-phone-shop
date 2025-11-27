import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import api from '../api/axios.js';
import { updateProfile, clearProfileStatus } from '../slices/authSlice.js';

export default function ProfilePage() {
  const { user, profileError, profileSuccess } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      password: '',
      fullName: user?.address?.fullName || '',
      phone: user?.address?.phone || '',
      street: user?.address?.street || '',
      ward: user?.address?.ward || '',
      district: user?.address?.district || '',
      city: user?.address?.city || '',
      postalCode: user?.address?.postalCode || '',
    },
  });

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (user) {
      reset({
        username: user.username || '',
        email: user.email || '',
        password: '',
        fullName: user.address?.fullName || '',
        phone: user.address?.phone || '',
        street: user.address?.street || '',
        ward: user.address?.ward || '',
        district: user.address?.district || '',
        city: user.address?.city || '',
        postalCode: user.address?.postalCode || '',
      });
    }
  }, [user, reset]);

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoadingOrders(true);
        const { data } = await api.get('/orders/mine');
        setOrders(data);
      } finally {
        setLoadingOrders(false);
      }
    }
    loadOrders();
  }, []);

  useEffect(() => {
    if (profileSuccess || profileError) {
      const t = setTimeout(() => dispatch(clearProfileStatus()), 3000);
      return () => clearTimeout(t);
    }
  }, [profileSuccess, profileError, dispatch]);

  if (!user) return null;

  const onSubmit = (values) => {
    const payload = {
      username: values.username,
      email: values.email,
      address: {
        fullName: values.fullName,
        phone: values.phone,
        street: values.street,
        ward: values.ward,
        district: values.district,
        city: values.city,
        postalCode: values.postalCode,
      },
    };
    if (values.password) payload.password = values.password;
    dispatch(updateProfile(payload));
  };

  return (
    <div className="container my-5">
      <div className="mb-5">
        <h1 className="h3 fw-bold mb-2" style={{ color: 'var(--primary)' }}>
          👤 Xin chào, {user.username}!
        </h1>
        <p className="text-muted">Quản lý tài khoản và lịch sử đơn hàng</p>
      </div>

      <div className="row g-4">
        {/* PROFILE FORM */}
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-light border-bottom py-3">
              <h5 className="card-title mb-0 fw-bold">⚙️ Cập nhật thông tin</h5>
            </div>
            <div className="card-body">
              {profileError && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  ❌ {profileError}
                  <button type="button" className="btn-close btn-sm" data-bs-dismiss="alert"></button>
                </div>
              )}
              {profileSuccess && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  ✓ Đã cập nhật hồ sơ thành công!
                  <button type="button" className="btn-close btn-sm" data-bs-dismiss="alert"></button>
                </div>
              )}

              <form className="vstack gap-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="border-bottom pb-3 mb-2">
                  <h6 className="fw-bold mb-3">Thông tin tài khoản</h6>
                  <div className="row g-2">
                    <div className="col-12 col-sm-6">
                      <label className="form-label fw-bold small">Tên hiển thị</label>
                      <input
                        className="form-control form-control-sm"
                        {...register('username', { required: true })}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="form-label fw-bold small">Email</label>
                      <input
                        type="email"
                        className="form-control form-control-sm"
                        {...register('email', { required: true })}
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="form-label fw-bold small">Mật khẩu mới</label>
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      {...register('password')}
                      placeholder="Để trống nếu không đổi"
                    />
                    <small className="text-muted d-block mt-1">
                      Chỉ nhập nếu bạn muốn đổi mật khẩu
                    </small>
                  </div>
                </div>

                <div>
                  <h6 className="fw-bold mb-3">📍 Địa chỉ giao hàng</h6>
                  <div className="row g-2">
                    <div className="col-12">
                      <label className="form-label fw-bold small">Họ tên</label>
                      <input
                        className="form-control form-control-sm"
                        {...register('fullName')}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-bold small">Số điện thoại</label>
                      <input
                        className="form-control form-control-sm"
                        {...register('phone')}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-bold small">Mã bưu chính</label>
                      <input
                        className="form-control form-control-sm"
                        {...register('postalCode')}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold small">Địa chỉ chi tiết</label>
                      <input
                        className="form-control form-control-sm"
                        {...register('street')}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-bold small">Phường/Xã</label>
                      <input className="form-control form-control-sm" {...register('ward')} />
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-bold small">Quận/Huyện</label>
                      <input
                        className="form-control form-control-sm"
                        {...register('district')}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold small">Tỉnh/Thành phố</label>
                      <input className="form-control form-control-sm" {...register('city')} />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-bold mt-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '⏳ Đang lưu...' : '✓ Lưu thay đổi'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ORDERS HISTORY */}
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-light border-bottom py-3">
              <h5 className="card-title mb-0 fw-bold">📦 Lịch sử đơn hàng</h5>
            </div>
            <div className="card-body p-0">
              {loadingOrders ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted mb-0">Chưa có đơn hàng nào</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-sm align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Mã đơn</th>
                        <th>Ngày đặt</th>
                        <th className="text-end" style={{ width: '100px' }}>
                          Tổng
                        </th>
                        <th style={{ width: '80px' }}>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => (
                        <tr 
                          key={o._id} 
                          className="border-bottom"
                          style={{ cursor: 'pointer' }}
                          onClick={() => window.location.href = `/orders/${o._id}`}
                        >
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
                              {o.status === 'delivered'
                                ? '✓ Đã giao'
                                : o.status === 'shipped'
                                ? '📦 Đang giao'
                                : o.status === 'cancelled'
                                ? '✕ Hủy'
                                : '⏳ Chờ'}
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
    </div>
  );
}
