import React, { useEffect, useState } from 'react';
import api from '../api/axios.js';
import ProductCard from '../components/ProductCard.jsx';
import BannerSlider from '../components/BannerSlider.jsx';

export default function HomePage() {
  const [data, setData] = useState({ products: [], page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const page = Number(params.get('page') || 1);
  const keyword = params.get('keyword') || '';
  const category = params.get('category') || '';
  const brand = params.get('brand') || '';
  const minPrice = params.get('minPrice') || '';
  const maxPrice = params.get('maxPrice') || '';
  const rating = params.get('rating') || '';
  const sort = params.get('sort') || '';

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data } = await api.get('/products', {
        params: { page, keyword, category, brand, minPrice, maxPrice, rating, sort },
      });
      setData(data);
      setLoading(false);
    }
    load();
  }, [page, keyword, category, brand, minPrice, maxPrice, rating, sort]);

  return (
    <div className="container my-5">
      {/* BANNER SLIDER */}
      <BannerSlider />

      {/* FILTERS SECTION */}
      <div className="card mb-4 shadow-sm border-0">
        <div className="card-body">
          <h5 className="card-title mb-3">🔍 Lọc sản phẩm</h5>
          <form
            className="row g-2 align-items-end"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const p = new URLSearchParams();
              for (let [k, v] of formData.entries()) if (v) p.set(k, v);
              p.set('page', '1');
              window.location.href = `/?${p.toString()}`;
            }}
          >
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <label className="form-label small fw-bold">Từ khoá</label>
              <input
                name="keyword"
                className="form-control form-control-sm"
                placeholder="iPhone, Samsung..."
                defaultValue={keyword}
              />
            </div>
            <div className="col-6 col-sm-6 col-md-4 col-lg-2">
              <label className="form-label small fw-bold">Thương hiệu</label>
              <select
                name="brand"
                value={brand}
                onChange={(e) => {
                  const p = new URLSearchParams(window.location.search);
                  if (e.target.value) {
                    p.set('brand', e.target.value);
                  } else {
                    p.delete('brand');
                  }
                  p.set('page', '1');
                  window.location.href = `/?${p.toString()}`;
                }}
                className="form-select form-select-sm"
              >
                <option value="">Tất cả</option>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Xiaomi">Xiaomi</option>
                <option value="OPPO">OPPO</option>
                <option value="Vivo">Vivo</option>
                <option value="Realme">Realme</option>
                <option value="Honor">Honor</option>
                <option value="Asus">Asus</option>
                <option value="Google">Google</option>
                <option value="OnePlus">OnePlus</option>
                <option value="Motorola">Motorola</option>
                <option value="Tecno">Tecno</option>
                <option value="Nothing">Nothing</option>
                <option value="Nokia">Nokia</option>
                <option value="Sony">Sony</option>
                <option value="Infinix">Infinix</option>
                <option value="Itel">Itel</option>
                <option value="Masstel">Masstel</option>
              </select>
            </div>
            <div className="col-6 col-sm-6 col-md-4 col-lg-2">
              <label className="form-label small fw-bold">Danh mục</label>
              <select
                name="category"
                value={category}
                onChange={(e) => {
                  const p = new URLSearchParams(window.location.search);
                  if (e.target.value) {
                    p.set('category', e.target.value);
                  } else {
                    p.delete('category');
                  }
                  p.set('page', '1');
                  window.location.href = `/?${p.toString()}`;
                }}
                className="form-select form-select-sm"
              >
                <option value="">Tất cả</option>
                <option value="ios">IOS</option>
                <option value="android">ANDROID</option>
              </select>
            </div>
            <div className="col-6 col-sm-6 col-md-3 col-lg-2">
              <label className="form-label small fw-bold">Giá từ</label>
              <input
                name="minPrice"
                type="number"
                className="form-control form-control-sm"
                placeholder="0"
                defaultValue={minPrice}
              />
            </div>
            <div className="col-6 col-sm-6 col-md-3 col-lg-2">
              <label className="form-label small fw-bold">Giá đến</label>
              <input
                name="maxPrice"
                type="number"
                className="form-control form-control-sm"
                placeholder="50000000"
                defaultValue={maxPrice}
              />
            </div>
            <div className="col-6 col-sm-6 col-md-3 col-lg-1">
              <label className="form-label small fw-bold">Đánh giá</label>
              <select
                name="rating"
                defaultValue={rating}
                className="form-select form-select-sm"
              >
                <option value="">All</option>
                <option value="4">&ge; 4★</option>
                <option value="3">&ge; 3★</option>
              </select>
            </div>
            <div className="col-6 col-sm-6 col-md-3 col-lg-2">
              <label className="form-label small fw-bold">Sắp xếp</label>
              <select
                name="sort"
                value={sort}
                onChange={(e) => {
                  const p = new URLSearchParams(window.location.search);
                  if (e.target.value) {
                    p.set('sort', e.target.value);
                  } else {
                    p.delete('sort');
                  }
                  p.set('page', '1');
                  window.location.href = `/?${p.toString()}`;
                }}
                className="form-select form-select-sm"
              >
                <option value="">Mới nhất</option>
                <option value="price">Giá tăng dần</option>
                <option value="-price">Giá giảm dần</option>
                <option value="-rating">Đánh giá cao</option>
              </select>
            </div>
            <div className="col-12 col-md-6 col-lg-2 d-flex gap-2 mt-3">
              <button type="submit" className="btn btn-primary btn-sm flex-grow-1">
                ✓ Lọc
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm flex-grow-1"
                onClick={() => {
                  window.location.href = '/';
                }}
              >
                ✕ Xoá
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* PRODUCTS LIST */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Đang tải sản phẩm...</p>
        </div>
      ) : (
        <>
          {data.total > 0 && (
            <div className="mb-3">
              <p className="text-muted">
                Tìm thấy <strong className="text-primary">{data.total}</strong> sản phẩm
              </p>
            </div>
          )}

          {data.products.length > 0 ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                {data.products.map((p) => (
                  <ProductCard key={p._id} p={p} />
                ))}
              </div>

              {/* PAGINATION */}
              {data.pages > 1 && (
                <nav className="mt-5">
                  <ul className="pagination justify-content-center">
                    {Array.from({ length: data.pages }, (_, i) => i + 1).map((n) => (
                      <li
                        key={n}
                        className={`page-item ${n === data.page ? 'active' : ''}`}
                      >
                        <a
                          className="page-link"
                          href={`/?${new URLSearchParams({
                            page: n,
                            keyword,
                            category,
                            brand,
                            minPrice,
                            maxPrice,
                            rating,
                            sort,
                          }).toString()}`}
                        >
                          {n}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </>
          ) : (
            <div className="alert alert-info text-center py-5" role="alert">
              <h5 className="mb-2">😕 Không tìm thấy sản phẩm</h5>
              <p className="mb-0">Vui lòng thử lại với các bộ lọc khác</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
