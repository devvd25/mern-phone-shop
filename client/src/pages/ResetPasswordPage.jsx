import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import api from '../api/axios.js';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tokenValid, setTokenValid] = useState(true);

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      setError('❌ Link không hợp lệ hoặc đã hết hạn');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password.length < 6) {
      setError('❌ Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (password !== confirmPassword) {
      setError('❌ Mật khẩu không khớp!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data } = await api.post('/auth/reset-password', { token, password });
      alert('✓ Đặt lại mật khẩu thành công! Vui lòng đăng nhập.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || '❌ Có lỗi xảy ra. Link có thể đã hết hạn.');
    } finally {
      setLoading(false);
    }
  };

  if (!tokenValid) {
    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 text-center">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
                <h1 className="h4 fw-bold mb-3 text-danger">
                  Link không hợp lệ
                </h1>
                <p className="text-muted mb-4">
                  Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.
                </p>
                <Link to="/forgot-password" className="btn btn-primary">
                  Gửi lại link mới
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔑</div>
                <h1 className="h3 fw-bold mb-2" style={{ color: 'var(--primary)' }}>
                  Đặt lại mật khẩu
                </h1>
                <p className="text-muted small">
                  Nhập mật khẩu mới cho tài khoản của bạn
                </p>
              </div>

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
                  <label className="form-label fw-bold">Mật khẩu mới</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                  <small className="text-muted">Tối thiểu 6 ký tự</small>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Nhập lại mật khẩu</label>
                  <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-bold py-2"
                  disabled={loading}
                >
                  {loading ? '⏳ Đang xử lý...' : '✓ Đặt lại mật khẩu'}
                </button>
              </form>

              <div className="text-center mt-4 pt-3 border-top">
                <p className="text-muted mb-0 small">
                  <Link to="/login" className="fw-bold text-primary text-decoration-none">
                    ← Quay lại đăng nhập
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
//commit