import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { register as registerUser } from '../slices/authSlice.js';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const { register, handleSubmit, watch, formState: { isSubmitting, errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error } = useSelector((s) => s.auth);

  const password = watch('password');

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const onSubmit = async (values) => {
    if (values.password !== values.confirmPassword) {
      alert('❌ Mật khẩu không khớp!');
      return;
    }
    
    const { confirmPassword, ...registerData } = values;
    const action = await dispatch(registerUser(registerData));
    if (registerUser.fulfilled.match(action)) {
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
                  🎉 Đăng ký
                </h1>
                <p className="text-muted small">Tạo tài khoản mới để bắt đầu</p>
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
                  <label className="form-label fw-bold">Tên hiển thị</label>
                  <input
                    className="form-control"
                    {...register('username', { required: 'Tên là bắt buộc' })}
                    placeholder="Nhập tên của bạn"
                  />
                </div>

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
                    {...register('password', { 
                      required: 'Mật khẩu là bắt buộc',
                      minLength: { value: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
                    })}
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <small className="text-danger d-block mt-1">{errors.password.message}</small>
                  )}
                </div>

                <div>
                  <label className="form-label fw-bold">Nhập lại mật khẩu</label>
                  <input
                    type="password"
                    className="form-control"
                    {...register('confirmPassword', {
                      required: 'Vui lòng nhập lại mật khẩu',
                      validate: value => value === password || 'Mật khẩu không khớp'
                    })}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && (
                    <small className="text-danger d-block mt-1">{errors.confirmPassword.message}</small>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-bold py-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '⏳ Đang tạo...' : '✓ Đăng ký'}
                </button>
              </form>

              <div className="text-center mt-4 pt-3 border-top">
                <p className="text-muted mb-0 small">
                  Đã có tài khoản?{' '}
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
