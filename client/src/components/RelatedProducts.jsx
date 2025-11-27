import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios.js';

export default function RelatedProducts({ currentProductId, category, brand }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRelated() {
      try {
        // Fetch products from same category or brand, exclude current product
        const { data } = await api.get('/products', {
          params: {
            category: category || '',
            brand: brand || '',
            limit: 4,
          },
        });

        // Filter out current product and limit to 4
        const filtered = data.products
          ?.filter((p) => p._id !== currentProductId)
          .slice(0, 4);

        setProducts(filtered || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (currentProductId) {
      loadRelated();
    }
  }, [currentProductId, category, brand]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border spinner-border-sm text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="mt-5 pt-4 border-top">
      <h4 className="fw-bold mb-4" style={{ color: 'var(--primary)' }}>
        🔍 Sản phẩm tương tự
      </h4>
      <div className="row g-3">
        {products.map((p) => (
          <div key={p._id} className="col-6 col-md-3">
            <Link
              to={`/product/${p._id}`}
              className="card border-0 shadow-sm h-100 text-decoration-none"
              style={{ transition: 'transform 0.2s' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {p.images?.[0] && (
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="card-img-top"
                  style={{
                    height: '150px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '0.375rem',
                    borderTopRightRadius: '0.375rem',
                  }}
                />
              )}
              <div className="card-body p-3">
                <h6
                  className="card-title mb-2"
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    color: 'var(--text-primary)',
                  }}
                >
                  {p.name}
                </h6>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="text-primary fw-bold" style={{ fontSize: '0.95rem' }}>
                    {p.price?.toLocaleString('vi-VN')} ₫
                  </div>
                  <small className="text-muted">
                    ⭐ {p.rating?.toFixed(1) || 0}
                  </small>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
