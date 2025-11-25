import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice.js';

export default function Header() {
  const { user } = useSelector(s => s.auth);
  const { items } = useSelector(s => s.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [siteSettings, setSiteSettings] = React.useState({
    logoUrl: '',
    siteName: 'Phone DZ',
    siteNameColor: '#ffffff'
  });

  // Load site settings from localStorage
  React.useEffect(() => {
    const saved = localStorage.getItem('site-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSiteSettings({
          logoUrl: parsed.logoUrl || '',
          siteName: parsed.siteName || 'Phone DZ',
          siteNameColor: parsed.siteNameColor || '#ffffff'
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const cartCount = items?.reduce((sum, i) => sum + (i.qty || 0), 0) || 0;

  const onLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get('q');
    const params = new URLSearchParams(window.location.search);
    if (q) params.set('keyword', q); else params.delete('keyword');
    params.set('page', '1');
    window.location.href = `/?${params.toString()}`;
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #374151 100%)' }}>
      <div className="container">
        {/* LOGO */}
        <a
          href="/"
          className="navbar-brand fw-bold d-flex align-items-center gap-2"
          style={{ 
            color: `${siteSettings.siteNameColor} !important`, 
            fontSize: '1.5rem', 
            letterSpacing: '-0.5px',
            cursor: 'pointer'
          }}
        >
          {siteSettings.logoUrl ? (
            <>
              <img 
                src={siteSettings.logoUrl} 
                alt={siteSettings.siteName}
                style={{ 
                  height: '40px', 
                  maxWidth: '80px',
                  objectFit: 'contain'
                }}
              />
              <span style={{ color: siteSettings.siteNameColor }}>{siteSettings.siteName}</span>
            </>
          ) : (
            <>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                }}
              >
                📱
              </div>
              <span style={{ color: siteSettings.siteNameColor }}>{siteSettings.siteName}</span>
            </>
          )}
        </a>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          style={{ color: '#fff' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          {/* SEARCH FORM */}
          <form
            className="d-flex ms-lg-auto me-lg-3 my-2 my-lg-0 flex-grow-1"
            style={{ maxWidth: '500px' }}
            onSubmit={handleSearch}
          >
            <input
              className="form-control me-2"
              name="q"
              type="search"
              placeholder="🔍 Tìm điện thoại..."
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
              }}
            />
            <button
              className="btn"
              type="submit"
              style={{
                background: 'rgba(59, 130, 246, 0.9)',
                color: '#fff',
                border: 'none',
                fontWeight: '600',
              }}
            >
              Tìm
            </button>
          </form>

          {/* NAV ITEMS */}
          <ul className="navbar-nav align-items-lg-center gap-lg-3 ms-auto">
            {/* CART */}
            <li className="nav-item">
              <Link
                to="/cart"
                className="nav-link d-flex align-items-center gap-1 position-relative"
                style={{ color: '#fff !important', fontWeight: '500', paddingRight: '1rem' }}
              >
                🛒 Giỏ hàng
                {cartCount > 0 && (
                  <span
                    className="badge bg-danger"
                    style={{
                      position: 'absolute',
                      top: '-5px',
                      right: '0',
                      fontSize: '0.7rem',
                      padding: '2px 5px',
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>

            {/* USER MENU */}
            {user ? (
              <li className="nav-item dropdown">
                <button
                  className="btn fw-bold d-flex align-items-center gap-1"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                  data-bs-toggle="dropdown"
                >
                  👤 {user.username}
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  style={{
                    background: '#fff',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }}
                >
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      👤 Tài khoản
                    </Link>
                  </li>
                  {user.role === 'admin' && (
                    <>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin">
                          ⚙️ Dashboard Admin
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin/products">
                          📦 Quản lý sản phẩm
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin/orders">
                          📋 Quản lý đơn hàng
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin/users">
                          👥 Quản lý user
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={onLogout}>
                      ↪️ Đăng xuất
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  className="btn fw-bold"
                  to="/login"
                  style={{
                    background: 'var(--accent)',
                    color: '#fff',
                    border: 'none',
                  }}
                >
                  🔑 Đăng nhập
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
