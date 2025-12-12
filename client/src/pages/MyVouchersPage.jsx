import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios.js';

export default function MyVouchersPage() {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      const { data } = await axios.get('/vouchers/my-vouchers');
      setVouchers(data.vouchers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching vouchers:', error);
      setLoading(false);
    }
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Đã copy mã: ${code}`);
  };

  const isExpired = (date) => new Date(date) < new Date();
  const isNotYetValid = (date) => new Date(date) > new Date();

  if (loading) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🎟️ Voucher của tôi</h2>

      {vouchers.length === 0 ? (
        <div className="alert alert-info">
          Bạn chưa có voucher nào. Hãy tiếp tục mua sắm để nhận voucher!
          <br />
          <Link to="/products" className="btn btn-primary mt-3">
            Mua sắm ngay
          </Link>
        </div>
      ) : (
        <div className="row">
          {vouchers.map((voucher) => {
            const expired = isExpired(voucher.validUntil);
            const notYetValid = isNotYetValid(voucher.validFrom);
            const usageFull =
              voucher.usageLimit && voucher.usageCount >= voucher.usageLimit;

            const canUse = !expired && !notYetValid && !usageFull && voucher.isActive;

            return (
              <div key={voucher._id} className="col-md-6 col-lg-4 mb-4">
                <div
                  className={`card h-100 ${!canUse ? 'opacity-50' : ''}`}
                  style={{
                    border: canUse ? '2px solid #28a745' : '1px solid #ddd',
                  }}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title mb-0">{voucher.code}</h5>
                      {canUse ? (
                        <span className="badge bg-success">Có thể dùng</span>
                      ) : (
                        <span className="badge bg-secondary">
                          {expired
                            ? 'Hết hạn'
                            : notYetValid
                            ? 'Chưa có hiệu lực'
                            : usageFull
                            ? 'Hết lượt'
                            : 'Không hoạt động'}
                        </span>
                      )}
                    </div>

                    <p className="card-text text-muted">{voucher.description}</p>

                    <div className="mb-2">
                      <strong className="text-primary" style={{ fontSize: '1.5rem' }}>
                        {voucher.discountType === 'percentage'
                          ? `${voucher.discountValue}%`
                          : `${voucher.discountValue.toLocaleString('vi-VN')}₫`}
                      </strong>
                    </div>

                    <div className="small text-muted">
                      {voucher.minOrderAmount > 0 && (
                        <div>
                          📦 Đơn tối thiểu:{' '}
                          {voucher.minOrderAmount.toLocaleString('vi-VN')}₫
                        </div>
                      )}
                      {voucher.maxDiscountAmount && (
                        <div>
                          💰 Giảm tối đa:{' '}
                          {voucher.maxDiscountAmount.toLocaleString('vi-VN')}₫
                        </div>
                      )}
                      <div>
                        📅 HSD: {new Date(voucher.validUntil).toLocaleDateString('vi-VN')}
                      </div>
                      {voucher.usageLimit && (
                        <div>
                          🔢 Còn: {voucher.usageLimit - voucher.usageCount} lượt
                        </div>
                      )}
                    </div>

                    {canUse && (
                      <div className="d-grid gap-2 mt-3">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => copyToClipboard(voucher.code)}
                        >
                          📋 Copy mã
                        </button>
                        <Link to="/checkout" className="btn btn-sm btn-success">
                          Dùng ngay
                        </Link>
                      </div>
                    )}
                  </div>

                  {voucher.voucherType === 'welcome' && (
                    <div
                      className="card-footer bg-warning text-dark text-center"
                      style={{ fontSize: '0.85rem' }}
                    >
                      🎉 Voucher chào mừng
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
