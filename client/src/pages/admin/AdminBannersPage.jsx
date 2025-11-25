import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios.js';

export default function AdminBannersPage() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [formData, setFormData] = useState({
    imageUrl: '',
    link: '',
    order: 0,
    isActive: true,
    duration: 5000,
  });

  const loadBanners = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/banners/admin');
      setBanners(data);
    } catch (e) {
      console.error(e);
      alert('Lỗi khi tải banners');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const handleOpenModal = (banner = null) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({
        imageUrl: banner.imageUrl,
        link: banner.link || '',
        order: banner.order || 0,
        isActive: banner.isActive,
        duration: banner.duration || 5000,
      });
    } else {
      setEditingBanner(null);
      setFormData({
        imageUrl: '',
        link: '',
        order: banners.length,
        isActive: true,
        duration: 5000,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingBanner(null);
    setFormData({
      imageUrl: '',
      link: '',
      order: 0,
      isActive: true,
      duration: 5000,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBanner) {
        await api.put(`/banners/admin/${editingBanner._id}`, formData);
        alert('✓ Cập nhật banner thành công!');
      } else {
        await api.post('/banners/admin', formData);
        alert('✓ Thêm banner thành công!');
      }
      handleCloseModal();
      loadBanners();
    } catch (e) {
      console.error(e);
      alert('❌ Lỗi khi lưu banner');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Xóa banner này?')) return;
    try {
      await api.delete(`/banners/admin/${id}`);
      alert('✓ Xóa banner thành công!');
      loadBanners();
    } catch (e) {
      console.error(e);
      alert('❌ Lỗi khi xóa banner');
    }
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data } = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFormData((prev) => ({ ...prev, imageUrl: data.url }));
      alert('✓ Upload ảnh thành công!');
    } catch (e) {
      console.error(e);
      alert('❌ Lỗi khi upload ảnh');
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold" style={{ color: 'var(--primary)' }}>
          🎨 Quản lý Banners
        </h1>
        <button
          className="btn btn-primary"
          onClick={() => handleOpenModal()}
        >
          + Thêm Banner
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : banners.length === 0 ? (
        <div className="alert alert-info text-center py-5" role="alert">
          <h5 className="mb-3">Chưa có banner nào</h5>
          <button className="btn btn-primary" onClick={() => handleOpenModal()}>
            Thêm Banner đầu tiên
          </button>
        </div>
      ) : (
        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: '100px' }}>Thứ tự</th>
                    <th style={{ width: '200px' }}>Ảnh</th>
                    <th style={{ width: '150px' }}>Link</th>
                    <th style={{ width: '120px' }}>Thời gian (s)</th>
                    <th style={{ width: '100px' }}>Trạng thái</th>
                    <th className="text-end" style={{ width: '150px' }}>
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {banners.map((banner) => (
                    <tr key={banner._id} className="border-bottom">
                      <td>
                        <span className="badge bg-secondary">{banner.order}</span>
                      </td>
                      <td>
                        <img
                          src={banner.imageUrl}
                          alt={banner.title}
                          style={{
                            width: '100%',
                            height: '60px',
                            objectFit: 'cover',
                            borderRadius: '5px',
                          }}
                        />
                      </td>
                      <td>
                        {banner.link ? (
                          <a
                            href={banner.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none"
                          >
                            🔗 Link
                          </a>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                      <td>
                        <span className="badge bg-info">
                          {(banner.duration / 1000).toFixed(1)}s
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            banner.isActive ? 'bg-success' : 'bg-secondary'
                          }`}
                        >
                          {banner.isActive ? '✓ Active' : '✕ Inactive'}
                        </span>
                      </td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleOpenModal(banner)}
                        >
                          ✏️ Sửa
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(banner._id)}
                        >
                          🗑️ Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ADD/EDIT MODAL */}
      {showModal && (
        <div
          className="modal fade show"
          style={{
            display: 'block',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            overflowY: 'auto',
          }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-light border-bottom">
                <h5 className="modal-title fw-bold">
                  {editingBanner ? '✏️ Sửa Banner' : '+ Thêm Banner'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Ảnh Banner *</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        value={formData.imageUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, imageUrl: e.target.value })
                        }
                        required
                        placeholder="URL ảnh hoặc upload"
                      />
                      <label className="btn btn-outline-secondary">
                        📁 Upload
                        <input
                          type="file"
                          className="d-none"
                          accept="image/*"
                          onChange={handleUploadImage}
                        />
                      </label>
                    </div>
                    {formData.imageUrl && (
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="mt-2"
                        style={{
                          width: '100%',
                          maxHeight: '200px',
                          objectFit: 'cover',
                          borderRadius: '5px',
                        }}
                      />
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Link (tùy chọn)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.link}
                      onChange={(e) =>
                        setFormData({ ...formData, link: e.target.value })
                      }
                      placeholder="VD: /product/123 hoặc https://..."
                    />
                    <small className="text-muted">
                      Link đến khi người dùng click banner
                    </small>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Thời gian hiển thị (giây)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.duration / 1000}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: Number(e.target.value) * 1000 })
                      }
                      min="1"
                      step="0.5"
                    />
                    <small className="text-muted">
                      Thời gian banner này hiển thị trước khi chuyển sang banner tiếp theo
                    </small>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Thứ tự</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.order}
                        onChange={(e) =>
                          setFormData({ ...formData, order: Number(e.target.value) })
                        }
                        min="0"
                      />
                      <small className="text-muted">
                        Banner có thứ tự nhỏ hơn hiển thị trước
                      </small>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Trạng thái</label>
                      <div className="form-check form-switch mt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={formData.isActive}
                          onChange={(e) =>
                            setFormData({ ...formData, isActive: e.target.checked })
                          }
                        />
                        <label className="form-check-label">
                          {formData.isActive ? 'Active' : 'Inactive'}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-top">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Hủy
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingBanner ? '✓ Cập nhật' : '+ Thêm'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
