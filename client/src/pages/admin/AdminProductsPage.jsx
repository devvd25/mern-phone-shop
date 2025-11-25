import React, { useEffect, useState } from 'react';
import api from '../../api/axios.js';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const [form, setForm] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    quantity: '',
    description: '',
  });
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoadingProducts(true);
        const { data } = await api.get('/products', { params: { limit: 100 } });
        setProducts(data.products || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingProducts(false);
      }
    }
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);
      const { data } = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setImageUrl(data.url);
    } catch (err) {
      console.error(err);
      alert('Upload ảnh thất bại');
    } finally {
      setUploading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.brand || !form.category) {
      alert('Vui lòng nhập tên, giá, thương hiệu, danh mục');
      return;
    }

    try {
      setCreating(true);

      const payload = {
        name: form.name,
        description: form.description || form.name,
        price: Number(form.price),
        category: form.category,
        brand: form.brand,
        quantity: Number(form.quantity || 0),
        images: imageUrl ? [imageUrl] : [],
      };

      const { data } = await api.post('/products', payload);
      setProducts((prev) => [data, ...prev]);

      setForm({
        name: '',
        brand: '',
        category: '',
        price: '',
        quantity: '',
        description: '',
      });
      setImageUrl('');
      alert('Thêm sản phẩm thành công!');
    } catch (err) {
      console.error(err);
      alert('Thêm sản phẩm thất bại');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!deleteConfirm || deleteConfirm.id !== productId) {
      setDeleteConfirm({ id: productId, type: 'product' });
      return;
    }

    try {
      await api.delete(`/products/${productId}`);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      setDeleteConfirm(null);
      alert('✓ Xoá sản phẩm thành công!');
    } catch (err) {
      console.error(err);
      alert('❌ Xoá sản phẩm thất bại');
    }
  };

  return (
    <div className="container my-5">
      <h1 className="h3 fw-bold mb-4" style={{ color: 'var(--primary)' }}>
        📦 Quản lý sản phẩm
      </h1>

      <div className="row g-4">
        {/* PRODUCT LIST */}
        <div className="col-12 col-lg-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-light border-bottom py-3">
              <h5 className="card-title mb-0 fw-bold">Danh sách sản phẩm ({products.length})</h5>
            </div>
            <div className="card-body" style={{ maxHeight: '800px', overflowY: 'auto' }}>
              {loadingProducts ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted">Chưa có sản phẩm nào.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle table-sm mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Tên sản phẩm</th>
                        <th>Thương hiệu</th>
                        <th className="text-end">Giá</th>
                        <th className="text-center">Tồn kho</th>
                        <th className="text-center" style={{ width: '60px' }}>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p._id} className="border-bottom">
                          <td>
                            <small className="fw-semibold">{p.name}</small>
                          </td>
                          <td>
                            <small className="text-muted">{p.brand}</small>
                          </td>
                          <td className="text-end">
                            <small className="fw-bold text-primary">
                              {p.price.toLocaleString('vi-VN')} ₫
                            </small>
                          </td>
                          <td className="text-center">
                            <span className="badge bg-info">{p.quantity}</span>
                          </td>
                          <td className="text-center">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDeleteProduct(p._id)}
                              title="Xoá sản phẩm"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ADD PRODUCT FORM */}
        <div className="col-12 col-lg-5">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-light border-bottom py-3">
              <h5 className="card-title mb-0 fw-bold">➕ Thêm sản phẩm mới</h5>
            </div>
            <div className="card-body">
              <form className="vstack gap-3" onSubmit={handleCreate}>
                <div>
                  <label className="form-label fw-bold small">Tên sản phẩm *</label>
                  <input
                    className="form-control form-control-sm"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="VD: iPhone 15 Pro"
                    required
                  />
                </div>

                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label fw-bold small">Thương hiệu *</label>
                    <input
                      className="form-control form-control-sm"
                      name="brand"
                      value={form.brand}
                      onChange={handleChange}
                      placeholder="VD: Apple"
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-bold small">Danh mục *</label>
                    <input
                      className="form-control form-control-sm"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      placeholder="VD: smartphone"
                      required
                    />
                  </div>
                </div>

                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label fw-bold small">Giá (₫) *</label>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="0"
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-bold small">Số lượng</label>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      name="quantity"
                      value={form.quantity}
                      onChange={handleChange}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label fw-bold small">Mô tả</label>
                  <textarea
                    className="form-control form-control-sm"
                    rows="2"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Mô tả chi tiết sản phẩm"
                  />
                </div>

                <div>
                  <label className="form-label fw-bold small">Ảnh sản phẩm</label>
                  <div className="input-group input-group-sm">
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    {uploading && (
                      <span className="input-group-text bg-light small">
                        📤 Uploading...
                      </span>
                    )}
                  </div>
                  {imageUrl && (
                    <div className="mt-2">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="img-fluid rounded border"
                        style={{ maxHeight: '150px', maxWidth: '100%' }}
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-sm fw-bold mt-2"
                  disabled={creating || uploading}
                >
                  {creating ? '⏳ Đang lưu...' : '✓ Thêm sản phẩm'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirm && deleteConfirm.type === 'product' && (
        <div
          className="modal fade show"
          style={{
            display: 'block',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            overflowY: 'auto',
          }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-light border-bottom">
                <h5 className="modal-title fw-bold text-danger">⚠️ Xoá sản phẩm</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setDeleteConfirm(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="mb-0">
                  Bạn chắc chắn muốn xoá sản phẩm này? <br />
                  <strong className="text-danger">
                    {products.find((p) => p._id === deleteConfirm.id)?.name}
                  </strong>
                </p>
              </div>
              <div className="modal-footer border-top">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setDeleteConfirm(null)}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteProduct(deleteConfirm.id)}
                >
                  ✓ Xoá
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
