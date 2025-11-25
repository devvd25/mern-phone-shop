import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slices/authSlice.js';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error } = useSelector((s) => s.auth);

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const onSubmit = async (values) => {
    const action = await dispatch(login(values));
    if (login.fulfilled.match(action)) {
      navigate('/');
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <h1 className="h3 fw-bold mb-2" style={{ color: 'var(--primary)' }}>
                  📱 Đăng nhập
                </h1>
                <p className="text-muted small">Truy cập tài khoản của bạn</p>
              </div>

              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  <strong>⚠️ Lỗi:</strong> {error}
                  <button
                    type="button"
                    className="btn-close btn-sm"
                    data-bs-dismiss="alert"
                  ></button>
                </div>
              )}

              <form className="vstack gap-3" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="form-label fw-bold">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    {...register('email', { required: 'Email là bắt buộc' })}
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="form-label fw-bold">Mật khẩu</label>
                  <input
                    type="password"
                    className="form-control"
                    {...register('password', { required: 'Mật khẩu là bắt buộc' })}
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-bold py-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '⏳ Đang đăng nhập...' : '✓ Đăng nhập'}
                </button>
              </form>

              <div className="text-center mt-4 pt-3 border-top">
                <p className="text-muted mb-0 small">
                  Chưa có tài khoản?{' '}
                  <Link to="/register" className="fw-bold text-primary text-decoration-none">
                    Đăng ký
                  </Link>
                </p>
                <p className="text-muted mb-0 small">
                  <Link to="/forgot-password" className="text-decoration-none">
                    Quên mật khẩu?
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
