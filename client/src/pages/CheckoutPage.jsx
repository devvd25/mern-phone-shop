import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios.js';
import VoucherInput from '../components/VoucherInput.jsx';

export default function CheckoutPage() {
  const { user } = useSelector((s) => s.auth);
  const { items } = useSelector((s) => s.cart);
  const navigate = useNavigate();
  const [appliedVoucher, setAppliedVoucher] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: user?.address?.fullName || user?.username || '',
      phone: user?.address?.phone || '',
      street: user?.address?.street || '',
      ward: user?.address?.ward || '',
      district: user?.address?.district || '',
      city: user?.address?.city || '',
      postalCode: user?.address?.postalCode || '',
      paymentMethod: 'COD',
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.address?.fullName || user.username || '',
        phone: user.address?.phone || '',
        street: user.address?.street || '',
        ward: user.address?.ward || '',
        district: user.address?.district || '',
        city: user.address?.city || '',
        postalCode: user.address?.postalCode || '',
        paymentMethod: 'COD',
      });
    }
  }, [user, reset]);

  const subtotal = items?.reduce((sum, i) => sum + i.price * i.qty, 0) || 0;
  const shippingFee = subtotal > 0 ? 30000 : 0;
  const tax = subtotal * 0.1;
  const totalBeforeVoucher = subtotal + shippingFee + tax;
  const voucherDiscount = appliedVoucher?.discount || 0;
  const total = totalBeforeVoucher - voucherDiscount;

  const onSubmit = async (values) => {
    try {
      if (!items || items.length === 0) {
        alert('Giỏ hàng đang trống!');
        return;
      }

      const payload = {
        items: items.map((i) => ({
          product: i.product,
          qty: i.qty,
        })),
        shippingAddress: {
          fullName: values.fullName,
          phone: values.phone,
          street: values.street,
          ward: values.ward,
          district: values.district,
          city: values.city,
          postalCode: values.postalCode,
        },
        paymentMethod: values.paymentMethod,
        voucherCode: appliedVoucher?.code || null,
      };

      const { data } = await api.post('/orders', payload);
      alert('✓ Đặt hàng thành công!');
      navigate('/profile');
    } catch (err) {
      console.error(err);
      alert('❌ Đặt hàng thất bại. Vui lòng thử lại!');
    }
  };

  if (!user) {
    return (
      <div className="container my-5">
        <div className="alert alert-warning" role="alert">
          <strong>⚠️ Cần đăng nhập:</strong> Bạn cần{' '}
          <Link to="/login" className="alert-link">
            đăng nhập
          </Link>{' '}
          trước khi thanh toán.
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="container my-5">
        <h1 className="h3 mb-4">🛒 Thanh toán</h1>
        <div className="alert alert-info text-center py-5" role="alert">
          <h5 className="mb-2">Giỏ hàng đang trống</h5>
          <Link to="/" className="btn btn-primary btn-sm">
            ← Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="h3 fw-bold mb-4" style={{ color: 'var(--primary)' }}>
        🛒 Thanh toán
      </h1>

      <div className="row g-4">
        {/* FORM */}
        <div className="col-12 col-lg-7">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-light border-bottom py-3">
              <h5 className="card-title mb-0 fw-bold">Địa chỉ giao hàng</h5>
            </div>
            <div className="card-body">
              <form className="vstack gap-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-bold small">Họ tên *</label>
                    <input
                      className="form-control"
                      {...register('fullName', { required: true })}
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-bold small">Số điện thoại *</label>
                    <input
                      className="form-control"
                      {...register('phone', { required: true })}
                      placeholder="0123456789"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold small">Địa chỉ chi tiết *</label>
                    <input
                      className="form-control"
                      {...register('street', { required: true })}
                      placeholder="Số nhà, tên đường..."
                    />
                  </div>
                  <div className="col-6 col-md-4">
                    <label className="form-label fw-bold small">Phường/Xã</label>
                    <input
                      className="form-control"
                      {...register('ward')}
                      placeholder="Phường..."
                    />
                  </div>
                  <div className="col-6 col-md-4">
                    <label className="form-label fw-bold small">Quận/Huyện</label>
                    <input
                      className="form-control"
                      {...register('district')}
                      placeholder="Quận..."
                    />
                  </div>
                  <div className="col-6 col-md-4">
                    <label className="form-label fw-bold small">Tỉnh/Thành phố</label>
                    <input
                      className="form-control"
                      {...register('city')}
                      placeholder="TP.HCM..."
                    />
                  </div>
                  <div className="col-6 col-md-4">
                    <label className="form-label fw-bold small">Mã bưu chính</label>
                    <input
                      className="form-control"
                      {...register('postalCode')}
                      placeholder="700000"
                    />
                  </div>
                </div>

                <hr />

                <div>
                  <h6 className="fw-bold mb-3">💳 Phương thức thanh toán</h6>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="COD"
                      id="payCOD"
                      {...register('paymentMethod')}
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="payCOD">
                      <strong>Thanh toán khi nhận hàng (COD)</strong>
                      <br />
                      <small className="text-muted">
                        Thanh toán trực tiếp cho người giao hàng
                      </small>
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="Stripe"
                      id="payStripe"
                      {...register('paymentMethod')}
                    />
                    <label className="form-check-label" htmlFor="payStripe">
                      <strong>Thanh toán trực tuyến (Stripe)</strong>
                      <br />
                      <small className="text-muted">
                        Thanh toán bằng thẻ tín dụng hoặc ví điện tử
                      </small>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-success btn-lg w-100 fw-bold mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '⏳ Đang xử lý...' : '✓ Đặt hàng'}
                </button>

                <p className="text-center text-muted small mt-3 mb-0">
                  Bằng việc nhấn "Đặt hàng", bạn đồng ý với chính sách mua hàng
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="col-12 col-lg-5">
          {/* Voucher Input */}
          <VoucherInput
            orderTotal={totalBeforeVoucher}
            onVoucherApplied={setAppliedVoucher}
          />

          <div className="card border-0 shadow-sm">
            <div className="card-header bg-light border-bottom py-3">
              <h5 className="card-title mb-0 fw-bold">📋 Tóm tắt đơn hàng</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm mb-3">
                  <tbody>
                    {items.map((i) => (
                      <tr key={i.product} className="border-bottom">
                        <td className="py-2">
                          <small className="fw-semibold d-block">{i.name}</small>
                          <small className="text-muted">x{i.qty}</small>
                        </td>
                        <td className="text-end py-2">
                          <small className="fw-bold text-primary">
                            {(i.price * i.qty).toLocaleString('vi-VN')} ₫
                          </small>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border-top pt-3">
                <div className="d-flex justify-content-between mb-2 small">
                  <span className="text-muted">Tạm tính:</span>
                  <span className="fw-bold">{subtotal.toLocaleString('vi-VN')} ₫</span>
                </div>
                <div className="d-flex justify-content-between mb-2 small">
                  <span className="text-muted">Phí vận chuyển:</span>
                  <span className="fw-bold">{shippingFee.toLocaleString('vi-VN')} ₫</span>
                </div>
                <div className="d-flex justify-content-between mb-2 small border-bottom pb-2">
                  <span className="text-muted">Thuế (10%):</span>
                  <span className="fw-bold">{tax.toLocaleString('vi-VN')} ₫</span>
                </div>

                {voucherDiscount > 0 && (
                  <div className="d-flex justify-content-between mb-2 small border-bottom pb-2">
                    <span className="text-success">🎟️ Giảm giá voucher:</span>
                    <span className="fw-bold text-success">
                      -{voucherDiscount.toLocaleString('vi-VN')} ₫
                    </span>
                  </div>
                )}

                <div className="d-flex justify-content-between mb-4 mt-3">
                  <span className="h6 fw-bold mb-0">Tổng cộng:</span>
                  <span className="h6 fw-bold text-primary mb-0">
                    {total.toLocaleString('vi-VN')} ₫
                  </span>
                </div>
              </div>

              <Link to="/cart" className="btn btn-link btn-sm p-0 text-decoration-none">
                ← Quay lại giỏ hàng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
