import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios.js';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [resetUrl, setResetUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    setResetUrl('');

    try {
      const { data } = await api.post('/auth/forgot-password', { email });
      setMessage(data.message || '✓ Link đặt lại mật khẩu đã được gửi đến email của bạn!');
      
      // Show reset URL in dev mode
      if (data.resetUrl) {
        setResetUrl(data.resetUrl);
      }
      
      setEmail('');
    } catch (err) {
      setError(err.response?.data?.message || '❌ Có lỗi xảy ra. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
                <h1 className="h3 fw-bold mb-2" style={{ color: 'var(--primary)' }}>
                  Quên mật khẩu?
                </h1>
                <p className="text-muted small">
                  Nhập email của bạn, chúng tôi sẽ gửi link đặt lại mật khẩu
                </p>
              </div>

              {message && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  {message}
                  <button
                    type="button"
                    className="btn-close btn-sm"
                    onClick={() => setMessage('')}
                  ></button>
                </div>
              )}

              {resetUrl && (
                <div className="alert alert-info" role="alert">
                  <strong>🔗 Link đặt lại mật khẩu (Dev Mode):</strong>
                  <div className="mt-2">
                    <a 
                      href={resetUrl} 
                      className="btn btn-sm btn-primary w-100"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Nhấn vào đây để đặt lại mật khẩu
                    </a>
                  </div>
                  <small className="text-muted d-block mt-2">
                    Hoặc copy link: <code className="text-break">{resetUrl}</code>
                  </small>
                </div>
              )}

              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
                  <button
                    type="button"
                    className="btn-close btn-sm"
                    onClick={() => setError('')}
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-bold py-2"
                  disabled={loading}
                >
                  {loading ? '⏳ Đang gửi...' : '📧 Gửi link đặt lại'}
                </button>
              </form>

              <div className="text-center mt-4 pt-3 border-top">
                <p className="text-muted mb-0 small">
                  Nhớ mật khẩu rồi?{' '}
                  <Link to="/login" className="fw-bold text-primary text-decoration-none">
                    Đăng nhập
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
