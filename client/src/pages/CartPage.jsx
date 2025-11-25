import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateCartItem, removeCartItem } from '../slices/cartSlice.js';

export default function CartPage() {
  const { items } = useSelector((s) => s.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = items?.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  const handleUpdateQty = async (productId, newQty) => {
    if (newQty < 1) return;
    await dispatch(updateCartItem({ productId, qty: newQty }));
  };

  const handleRemove = async (productId) => {
    if (window.confirm('🗑️ Xóa sản phẩm này khỏi giỏ hàng?')) {
      await dispatch(removeCartItem({ productId }));
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('🗑️ Xóa toàn bộ giỏ hàng?')) {
      for (const item of items) {
        await dispatch(removeCartItem({ productId: item.product }));
      }
    }
  };

  const goCheckout = () => {
    navigate('/checkout');
  };

  if (!items || items.length === 0) {
    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <div className="text-center py-5">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
              <h2 className="h4 fw-bold mb-2">Giỏ hàng trống</h2>
              <p className="text-muted mb-4">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
              <Link to="/" className="btn btn-primary btn-lg">
                ← Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="h3 fw-bold mb-4" style={{ color: 'var(--primary)' }}>
        🛒 Giỏ hàng ({items.length} sản phẩm)
      </h1>

      <div className="mb-3 d-flex justify-content-between align-items-center">
        <Link to="/" className="btn btn-outline-secondary btn-sm">
          ← Tiếp tục mua sắm
        </Link>
        <button 
          onClick={handleClearCart}
          className="btn btn-outline-danger btn-sm"
        >
          🗑️ Xóa toàn bộ giỏ hàng
        </button>
      </div>

      <div className="row g-4">
        {/* ITEMS LIST */}
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Sản phẩm</th>
                      <th className="text-center" style={{ width: '150px' }}>
                        Số lượng
                      </th>
                      <th className="text-end" style={{ width: '120px' }}>
                        Đơn giá
                      </th>
                      <th className="text-end" style={{ width: '130px' }}>
                        Thành tiền
                      </th>
                      <th className="text-center" style={{ width: '80px' }}>
                        Xóa
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((i) => (
                      <tr key={i.product} className="border-bottom">
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            {i.image && (
                              <img
                                src={i.image}
                                alt={i.name}
                                style={{
                                  width: '60px',
                                  height: '60px',
                                  objectFit: 'cover',
                                  borderRadius: '0.5rem',
                                }}
                              />
                            )}
                            <div>
                              <div className="fw-semibold text-dark">
                                {i.name}
                              </div>
                              <small className="text-muted d-block">
                                {i.brand}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="d-flex align-items-center justify-content-center gap-2">
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => handleUpdateQty(i.product, i.qty - 1)}
                              disabled={i.qty <= 1}
                              style={{ width: '30px', height: '30px', padding: 0 }}
                            >
                              −
                            </button>
                            <input
                              type="number"
                              className="form-control form-control-sm text-center"
                              style={{ width: '60px' }}
                              value={i.qty}
                              onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (val > 0) handleUpdateQty(i.product, val);
                              }}
                              min="1"
                            />
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => handleUpdateQty(i.product, i.qty + 1)}
                              style={{ width: '30px', height: '30px', padding: 0 }}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="text-end text-primary fw-bold">
                          {i.price.toLocaleString('vi-VN')} ₫
                        </td>
                        <td className="text-end">
                          <strong className="text-primary">
                            {(i.price * i.qty).toLocaleString('vi-VN')} ₫
                          </strong>
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRemove(i.product)}
                            title="Xóa sản phẩm"
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
        </div>

        {/* SUMMARY */}
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title fw-bold mb-3" style={{ color: 'var(--primary)' }}>
                Tổng cộng
              </h5>

              <div className="border-top border-bottom py-3 my-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Tạm tính:</span>
                  <strong className="text-dark">
                    {subtotal.toLocaleString('vi-VN')} ₫
                  </strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Giao hàng:</span>
                  <strong className="text-dark">Miễn phí</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Thuế (10%):</span>
                  <strong className="text-dark">
                    {(subtotal * 0.1).toLocaleString('vi-VN')} ₫
                  </strong>
                </div>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="h6 mb-0 fw-bold">Tổng cộng:</span>
                <span className="h6 mb-0 fw-bold text-primary">
                  {(subtotal * 1.1).toLocaleString('vi-VN')} ₫
                </span>
              </div>

              <button
                className="btn btn-success w-100 btn-lg fw-bold mb-2"
                onClick={goCheckout}
              >
                → Tiến hành thanh toán
              </button>

              <p className="small text-muted mb-0">
                Bạn sẽ nhập địa chỉ giao hàng và chọn phương thức thanh toán ở bước tiếp theo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
