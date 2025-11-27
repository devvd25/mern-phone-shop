import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import { addToCart } from '../slices/cartSlice.js';
import ProductReviews from '../components/ProductReviews.jsx';
import RelatedProducts from '../components/RelatedProducts.jsx';

export default function ProductPage() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);

  const loadProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      setP(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    // Check if user is logged in
    if (!user) {
      alert('⚠️ Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
      navigate('/login');
      return;
    }

    const action = await dispatch(addToCart({ productId: p._id, qty }));
    if (addToCart.fulfilled.match(action)) {
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="container my-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!p) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger" role="alert">
          Sản phẩm không tìm thấy
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="row g-3">
        {/* LEFT: IMAGE */}
        <div className="col-12 col-lg-5">
          {p.images?.[0] && (
            <img
              src={p.images[0]}
              alt={p.name}
              className="img-fluid rounded border"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)', maxHeight: '400px', width: '100%', objectFit: 'contain' }}
            />
          )}
        </div>

        {/* RIGHT: DETAILS */}
        <div className="col-12 col-lg-7">
          <div>
            <h1 className="h3 fw-bold mb-2" style={{ color: 'var(--primary)' }}>
              {p.name}
            </h1>

            <div className="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom">
              <span className="badge bg-primary">★ {p.rating?.toFixed(1) || 0}</span>
              <span className="text-muted small">({p.numReviews || 0} đánh giá)</span>
              <span className="text-muted small">|</span>
              <span className="fw-bold">{p.brand}</span>
              <span className="text-muted small">|</span>
              <span className="badge bg-secondary">{p.category}</span>
            </div>

            {/* PRICE */}
            <div className="mb-3 p-3 bg-light rounded">
              <div className="h4 fw-bold text-primary mb-0">
                {p.price.toLocaleString('vi-VN')} ₫
              </div>
            </div>

            {/* DESCRIPTION */}
            {p.description && (
              <div className="mb-3">
                <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>{p.description}</p>
              </div>
            )}

            {/* SPECS */}
            {p.specs && Object.keys(p.specs).length > 0 && (
              <div className="mb-3">
                <h6 className="fw-bold mb-2">Thông số kỹ thuật</h6>
                <div className="row g-2">
                  {Object.entries(p.specs).map(([k, v]) => (
                    <div key={k} className="col-6 col-md-4">
                      <div className="p-2 bg-light rounded">
                        <small className="text-muted d-block" style={{ fontSize: '0.8rem' }}>{k}</small>
                        <strong style={{ fontSize: '0.9rem' }}>{v}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY & ACTIONS */}
            <div className="d-flex align-items-center gap-3 mb-3 pb-3 border-top pt-3">
              <div>
                <label className="form-label fw-bold mb-1 small">Số lượng</label>
                <input
                  type="number"
                  min="1"
                  max={p.quantity || 100}
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="form-control form-control-sm"
                  style={{ width: '80px' }}
                />
              </div>
              <div className="text-muted small">
                <span className="fw-bold">{p.quantity || 0}</span> có sẵn
              </div>
            </div>

            {/* BUTTONS */}
            <div className="d-flex gap-2 mb-3">
              <button
                onClick={handleAddToCart}
                className="btn btn-primary flex-grow-1 fw-bold"
                disabled={!p.quantity}
              >
                {p.quantity ? '🛒 Thêm vào giỏ' : 'Hết hàng'}
              </button>
              <button
                onClick={() => navigate('/')}
                className="btn btn-outline-secondary"
              >
                ← Quay lại
              </button>
            </div>

            {/* ADDITIONAL INFO */}
            <div className="d-flex gap-4 text-center pt-3 border-top">
              <div>
                <div className="mb-1">✓</div>
                <small className="text-muted">Chính hãng</small>
              </div>
              <div>
                <div className="mb-1">🚚</div>
                <small className="text-muted">Giao nhanh</small>
              </div>
              <div>
                <div className="mb-1">🔒</div>
                <small className="text-muted">Bảo mật</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <ProductReviews 
        productId={p._id} 
        reviews={p.reviews || []} 
        onReviewAdded={loadProduct}
      />

      {/* RELATED PRODUCTS */}
      <RelatedProducts 
        currentProductId={p._id} 
        category={p.category} 
        brand={p.brand} 
      />
    </div>
  );
}
