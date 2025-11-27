import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ p }) {
  const imgSrc =
    (Array.isArray(p.images) && p.images[0]) ||
    p.image ||
    '';

  return (
    <div>
      <Link
        to={`/product/${p._id}`}
        className="text-decoration-none text-dark"
      >
        <div className="card h-100 shadow-sm border-0 transition" style={{ overflow: 'hidden' }}>
          {imgSrc && (
            <div
              style={{
                height: '200px',
                background: 'var(--light-bg)',
                overflow: 'hidden',
              }}
            >
              <img
                src={imgSrc}
                className="w-100 h-100"
                alt={p.name}
                style={{
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
              />
            </div>
          )}

          <div className="card-body d-flex flex-column">
            <h5
              className="card-title text-truncate"
              title={p.name}
              style={{
                fontSize: '0.95rem',
                fontWeight: '600',
                color: 'var(--primary)',
              }}
            >
              {p.name}
            </h5>

            <div className="d-flex justify-content-between align-items-center mb-2 small">
              <span className="text-muted" style={{ fontSize: '0.85rem' }}>
                {p.brand}
              </span>
              <span
                className="badge bg-light text-dark"
                style={{
                  fontSize: '0.8rem',
                  fontWeight: '600',
                }}
              >
                ★ {p.rating?.toFixed(1) || 0}
              </span>
            </div>

            <p className="fw-bold text-primary mb-2 mt-auto" style={{ fontSize: '1.15rem' }}>
              {p.price.toLocaleString('vi-VN')} ₫
            </p>

            <button
              type="button"
              className="btn btn-outline-primary btn-sm fw-bold"
              style={{
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--accent)';
                e.target.style.color = '#fff';
                e.target.style.borderColor = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = 'var(--accent)';
                e.target.style.borderColor = 'var(--accent)';
              }}
            >
              👁️ Xem chi tiết
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
