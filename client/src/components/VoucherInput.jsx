import { useState, useEffect } from 'react';
import axios from '../api/axios.js';

export default function VoucherInput({ orderTotal, onVoucherApplied }) {
  const [voucherCode, setVoucherCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [availableVouchers, setAvailableVouchers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchAvailableVouchers();
  }, []);

  const fetchAvailableVouchers = async () => {
    try {
      const { data } = await axios.get('/vouchers/my-vouchers');
      const validVouchers = data.vouchers.filter(v => {
        const now = new Date();
        return v.isActive && 
               new Date(v.validFrom) <= now && 
               new Date(v.validUntil) >= now &&
               (!v.usageLimit || v.usageCount < v.usageLimit) &&
               orderTotal >= v.minOrderAmount;
      });
      setAvailableVouchers(validVouchers);

      // Auto apply best voucher
      if (validVouchers.length > 0) {
        const bestVoucher = findBestVoucher(validVouchers);
        if (bestVoucher) {
          await applyVoucherCode(bestVoucher.code);
        }
      }
    } catch (err) {
      console.error('Error fetching vouchers:', err);
    }
  };

  const findBestVoucher = (vouchers) => {
    let bestDiscount = 0;
    let best = null;

    vouchers.forEach(v => {
      let discount = 0;
      if (v.discountType === 'percentage') {
        discount = (orderTotal * v.discountValue) / 100;
        if (v.maxDiscountAmount && discount > v.maxDiscountAmount) {
          discount = v.maxDiscountAmount;
        }
      } else {
        discount = v.discountValue;
      }
      
      if (discount > orderTotal) discount = orderTotal;
      
      if (discount > bestDiscount) {
        bestDiscount = discount;
        best = v;
      }
    });

    return best;
  };

  const applyVoucherCode = async (code) => {
    setLoading(true);
    setError('');

    try {
      const { data } = await axios.post('/vouchers/validate', {
        code: code.toUpperCase(),
        orderAmount: orderTotal,
      });

      setAppliedVoucher(data);
      setVoucherCode(code.toUpperCase());
      onVoucherApplied({
        code: code.toUpperCase(),
        discount: data.discountAmount,
      });
      setError('');
      setShowDropdown(false);
    } catch (err) {
      console.error('Voucher error:', err);
      setError(err.response?.data?.message || 'Mã voucher không hợp lệ');
      setAppliedVoucher(null);
      onVoucherApplied(null);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) {
      setError('Vui lòng nhập mã voucher');
      return;
    }
    await applyVoucherCode(voucherCode);
  };

  const handleRemoveVoucher = () => {
    setVoucherCode('');
    setAppliedVoucher(null);
    setError('');
    onVoucherApplied(null);
  };

  const handleSelectVoucher = (voucher) => {
    applyVoucherCode(voucher.code);
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h6 className="card-title">🎟️ Mã giảm giá</h6>

        {!appliedVoucher ? (
          <>
            <div className="input-group position-relative">
              <input
                type="text"
                className="form-control"
                placeholder="Nhập mã voucher"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                onFocus={() => setShowDropdown(true)}
                disabled={loading}
              />
              <button
                className="btn btn-primary"
                onClick={handleApplyVoucher}
                disabled={loading || !voucherCode.trim()}
              >
                {loading ? 'Đang kiểm tra...' : 'Áp dụng'}
              </button>

              {/* Dropdown vouchers */}
              {showDropdown && availableVouchers.length > 0 && (
                <div
                  className="position-absolute w-100 bg-white border rounded shadow-lg"
                  style={{
                    top: '100%',
                    left: 0,
                    zIndex: 1000,
                    maxHeight: '300px',
                    overflowY: 'auto',
                    marginTop: '4px'
                  }}
                >
                  <div className="p-2">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <small className="text-muted fw-bold">Voucher khả dụng:</small>
                      <button
                        className="btn-close btn-sm"
                        onClick={() => setShowDropdown(false)}
                        style={{ fontSize: '0.7rem' }}
                      ></button>
                    </div>
                    {availableVouchers.map((voucher) => {
                      let discount = 0;
                      if (voucher.discountType === 'percentage') {
                        discount = (orderTotal * voucher.discountValue) / 100;
                        if (voucher.maxDiscountAmount && discount > voucher.maxDiscountAmount) {
                          discount = voucher.maxDiscountAmount;
                        }
                      } else {
                        discount = voucher.discountValue;
                      }
                      if (discount > orderTotal) discount = orderTotal;

                      return (
                        <div
                          key={voucher._id}
                          className="border rounded p-2 mb-2 cursor-pointer hover-bg-light"
                          style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                          onClick={() => handleSelectVoucher(voucher)}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                        >
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <div className="fw-bold text-primary">{voucher.code}</div>
                              <small className="text-muted d-block">{voucher.description}</small>
                              <small className="text-success fw-bold">
                                Giảm: {discount.toLocaleString('vi-VN')}₫
                              </small>
                            </div>
                            <div className="text-end">
                              <span className="badge bg-primary">
                                {voucher.discountType === 'percentage' 
                                  ? `${voucher.discountValue}%` 
                                  : `${voucher.discountValue.toLocaleString('vi-VN')}₫`}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {availableVouchers.length > 0 && (
              <small className="text-muted mt-2 d-block">
                📌 Bạn có {availableVouchers.length} voucher khả dụng
              </small>
            )}
          </>
        ) : (
          <div className="alert alert-success mb-0 d-flex justify-content-between align-items-center">
            <div>
              <strong>{appliedVoucher.voucher.code}</strong>
              <br />
              <small>{appliedVoucher.voucher.description}</small>
              <br />
              <span className="text-success">
                Giảm: {appliedVoucher.discountAmount.toLocaleString('vi-VN')}₫
              </span>
            </div>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={handleRemoveVoucher}
            >
              Xóa
            </button>
          </div>
        )}

        {error && (
          <div className="alert alert-danger mt-2 mb-0">
            {error}
          </div>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ zIndex: 999 }}
          onClick={() => setShowDropdown(false)}
        ></div>
      )}
    </div>
  );
}
