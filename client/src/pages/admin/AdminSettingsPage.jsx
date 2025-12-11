import React, { useEffect, useState } from 'react';
import api from '../../api/axios.js';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    backgroundUrl: '',
    backgroundColor: '#ffffff',
    logoUrl: '',
    siteName: 'Phone DZ',
    siteNameColor: '#ffffff',
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [logoPreviewUrl, setLogoPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  /// Load settings from localStorage or API
  useEffect(() => {
    const saved = localStorage.getItem('site-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
        setPreviewUrl(parsed.backgroundUrl || '');
        setLogoPreviewUrl(parsed.logoUrl || '');
        applyBackground(parsed);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const applyBackground = (bg) => {
    if (bg.backgroundUrl) {
      document.body.style.background = `url('${bg.backgroundUrl}') center/cover no-repeat fixed`;
    } else if (bg.backgroundColor) {
      document.body.style.background = bg.backgroundColor;
    }
  };

  const handleColorChange = (e) => {
    const newBg = { ...settings, backgroundColor: e.target.value, backgroundUrl: '' };
    setSettings(newBg);
    setPreviewUrl('');
    applyBackground(newBg);
  };

  const handleUrlChange = (e) => {
    setPreviewUrl(e.target.value);
  };

  const applyUrl = () => {
    if (!previewUrl.trim()) {
      alert('Vui lòng nhập URL ảnh');
      return;
    }
    const newBg = { ...settings, backgroundUrl: previewUrl };
    setSettings(newBg);
    applyBackground(newBg);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('❌ Kích thước ảnh không được vượt quá 5MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('❌ Vui lòng chọn file ảnh hợp lệ');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', file);

      const { data } = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const imageUrl = data.url || data.path;
      const newBg = { ...settings, backgroundUrl: imageUrl };
      setSettings(newBg);
      setPreviewUrl(imageUrl);
      applyBackground(newBg);
      alert('✓ Upload ảnh thành công!');
    } catch (err) {
      console.error(err);
      alert('❌ Upload ảnh thất bại');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      // Save to localStorage
      localStorage.setItem('site-settings', JSON.stringify(settings));
      alert('✓ Lưu cài đặt thành công!');
    } catch (err) {
      console.error(err);
      alert('❌ Lưu cài đặt thất bại');
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('❌ Kích thước logo không được vượt quá 2MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('❌ Vui lòng chọn file ảnh hợp lệ');
      return;
    }

    try {
      setUploadingLogo(true);
      const formData = new FormData();
      formData.append('image', file);

      const { data } = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const logoUrl = data.url || data.path;
      const newSettings = { ...settings, logoUrl };
      setSettings(newSettings);
      setLogoPreviewUrl(logoUrl);
      alert('✓ Upload logo thành công!');
    } catch (err) {
      console.error(err);
      alert('❌ Upload logo thất bại');
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSiteNameChange = (e) => {
    setSettings({ ...settings, siteName: e.target.value });
  };

  const handleSiteNameColorChange = (e) => {
    setSettings({ ...settings, siteNameColor: e.target.value });
  };

  const handleReset = () => {
    const defaultBg = { 
      backgroundUrl: '', 
      backgroundColor: '#ffffff',
      logoUrl: '',
      siteName: 'Phone DZ',
      siteNameColor: '#ffffff',
    };
    setSettings(defaultBg);
    setPreviewUrl('');
    setLogoPreviewUrl('');
    applyBackground(defaultBg);
    localStorage.setItem('site-settings', JSON.stringify(defaultBg));
    alert('✓ Reset cài đặt mặc định!');
  };

  return (
    <div className="container my-5">
      <h1 className="h3 fw-bold mb-4" style={{ color: 'var(--primary)' }}>
        ⚙️ Cài đặt giao diện
      </h1>

      <div className="row g-4">
        {/* SETTINGS FORM */}
        <div className="col-12 col-lg-6">
          {/* LOGO SETTINGS */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-light border-bottom py-3">
              <h5 className="card-title mb-0 fw-bold">📱 Logo & Tên website</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label fw-bold">🏷️ Tên website</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Phone DZ"
                  value={settings.siteName}
                  onChange={handleSiteNameChange}
                />
                <small className="text-muted d-block mt-1">
                  Tên hiển thị trên header website
                </small>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">🎨 Màu tên website</label>
                <div className="d-flex gap-2 align-items-center">
                  <input
                    type="color"
                    className="form-control form-control-color"
                    style={{ width: '60px', height: '45px', cursor: 'pointer' }}
                    value={settings.siteNameColor}
                    onChange={handleSiteNameColorChange}
                  />
                  <div>
                    <p className="mb-1 fw-bold">{settings.siteNameColor}</p>
                    <small className="text-muted">Màu chữ tên website trên header</small>
                  </div>
                </div>
                <div className="mt-2">
                  <small className="text-muted fw-bold d-block mb-1">Quick colors:</small>
                  <div className="d-flex gap-1 flex-wrap">
                    {[
                      { name: 'Trắng', color: '#ffffff' },
                      { name: 'Đen', color: '#000000' },
                      { name: 'Xanh', color: '#3b82f6' },
                      { name: 'Đỏ', color: '#ef4444' },
                      { name: 'Vàng', color: '#f59e0b' },
                      { name: 'Tím', color: '#a855f7' },
                    ].map((c) => (
                      <button
                        key={c.color}
                        type="button"
                        className="btn btn-sm"
                        style={{
                          width: '30px',
                          height: '30px',
                          padding: 0,
                          backgroundColor: c.color,
                          border: settings.siteNameColor === c.color ? '3px solid #000' : '1px solid #ccc',
                        }}
                        onClick={() => handleSiteNameColorChange({ target: { value: c.color } })}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">📤 Upload logo</label>
                <input
                  type="file"
                  className="form-control form-control-sm"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  disabled={uploadingLogo}
                />
                <small className="text-muted d-block mt-2">
                  {uploadingLogo ? '⏳ Đang upload...' : '📝 Logo tốt nhất: PNG với nền trong suốt (tối đa 2MB)'}
                </small>
              </div>

              {logoPreviewUrl && (
                <div className="mb-3">
                  <label className="form-label fw-bold small">Xem trước logo:</label>
                  <div className="p-3 bg-dark rounded text-center">
                    <img
                      src={logoPreviewUrl}
                      alt="Logo"
                      style={{ maxHeight: '60px', maxWidth: '200px', objectFit: 'contain' }}
                    />
                  </div>
                  <button
                    className="btn btn-outline-danger btn-sm mt-2 w-100"
                    onClick={() => {
                      setSettings({ ...settings, logoUrl: '' });
                      setLogoPreviewUrl('');
                    }}
                  >
                    🗑️ Xóa logo
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* BACKGROUND SETTINGS */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-light border-bottom py-3">
              <h5 className="card-title mb-0 fw-bold">🎨 Tùy chỉnh background</h5>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <label className="form-label fw-bold">📤 Upload ảnh background</label>
                <input
                  type="file"
                  className="form-control form-control-sm"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
                <small className="text-muted d-block mt-2">
                  {uploading ? '⏳ Đang upload...' : '📝 Chọn ảnh từ máy tính (tối đa 5MB)'}
                </small>
              </div>

              <div className="d-flex justify-content-center my-3">
                <div style={{ color: '#ccc', fontSize: '0.9rem' }}>hoặc</div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">🔗 URL ảnh background</label>
                <div className="input-group input-group-sm mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="https://example.com/image.jpg"
                    value={previewUrl}
                    onChange={handleUrlChange}
                  />
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={applyUrl}
                  >
                    Áp dụng
                  </button>
                </div>
                <small className="text-muted d-block">
                  Nhập đường dẫn URL đầy đủ của ảnh (phải là link trực tiếp)
                </small>
              </div>

              <hr />

              <div className="mb-4">
                <label className="form-label fw-bold">🎯 Màu nền</label>
                <div className="d-flex gap-2 align-items-center">
                  <input
                    type="color"
                    className="form-control form-control-color"
                    style={{ width: '60px', height: '45px', cursor: 'pointer' }}
                    value={settings.backgroundColor}
                    onChange={handleColorChange}
                    disabled={!!settings.backgroundUrl}
                  />
                  <div>
                    <p className="mb-1 fw-bold">{settings.backgroundColor}</p>
                    <small className="text-muted">
                      {settings.backgroundUrl
                        ? '(Tắt vì đang dùng ảnh background)'
                        : 'Nhấp để chọn màu'}
                    </small>
                  </div>
                </div>
              </div>

              <hr />

              <div className="mb-4">
                <h6 className="fw-bold mb-3">📚 Background presets</h6>
                <div className="row g-2">
                  {[
                    { name: 'Trắng', bg: '#ffffff' },
                    { name: 'Xám nhạt', bg: '#f9fafb' },
                    { name: 'Xanh đậm', bg: '#1f2937' },
                    { name: 'Tím nhạt', bg: '#f3e8ff' },
                  ].map((preset) => (
                    <div key={preset.bg} className="col-6 col-sm-3">
                      <button
                        className="btn btn-outline-secondary btn-sm w-100"
                        onClick={() => {
                          const newBg = {
                            backgroundColor: preset.bg,
                            backgroundUrl: '',
                          };
                          setSettings(newBg);
                          setPreviewUrl('');
                          applyBackground(newBg);
                        }}
                        style={{
                          backgroundColor:
                            settings.backgroundColor === preset.bg
                              ? preset.bg
                              : 'transparent',
                          color:
                            settings.backgroundColor === preset.bg
                              ? '#fff'
                              : 'inherit',
                          borderColor: 'var(--border-color)',
                        }}
                      >
                        {preset.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <hr />

              <div className="d-flex gap-2">
                <button
                  className="btn btn-primary btn-sm flex-grow-1"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? '⏳ Đang lưu...' : '✓ Lưu cài đặt'}
                </button>
                <button
                  className="btn btn-outline-secondary btn-sm flex-grow-1"
                  onClick={handleReset}
                >
                  🔄 Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* PREVIEW */}
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-light border-bottom py-3">
              <h5 className="card-title mb-0 fw-bold">👀 Xem trước</h5>
            </div>
            <div className="card-body p-0">
              <div
                style={{
                  minHeight: '500px',
                  background: settings.backgroundUrl
                    ? `url('${settings.backgroundUrl}') center/cover no-repeat`
                    : settings.backgroundColor,
                  backgroundAttachment: 'fixed',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  textAlign: 'center',
                  padding: '2rem',
                  gap: '1rem',
                }}
              >
                <h3
                  style={{
                    color: settings.backgroundColor === '#1f2937' ? '#fff' : '#333',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  🎨 Xem trước
                </h3>
                <p
                  style={{
                    color: settings.backgroundColor === '#1f2937' ? '#ccc' : '#666',
                    textShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  }}
                >
                  {settings.backgroundUrl
                    ? '✓ Ảnh background đã được áp dụng'
                    : `Màu: ${settings.backgroundColor}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INFO */}
      <div className="mt-4">
        <div className="alert alert-info border-0">
          <h6 className="alert-heading fw-bold">ℹ️ Hướng dẫn sử dụng</h6>
          <ul className="mb-0 small">
            <li>
              <strong>Logo:</strong> Upload logo website (PNG/JPG, tối đa 2MB). Nên dùng ảnh PNG với nền trong suốt.
            </li>
            <li>
              <strong>Tên website:</strong> Thay đổi tên hiển thị trên header.
            </li>
            <li>
              <strong>Upload ảnh:</strong> Chọn ảnh từ máy tính của bạn (tối đa 5MB, jpg/png/gif)
            </li>
            <li>
              <strong>URL ảnh:</strong> Hoặc nhập đường dẫn URL đầy đủ của ảnh (phải bắt đầu bằng
              http:// hoặc https://)
            </li>
            <li>
              <strong>Màu nền:</strong> Chỉ hoạt động khi không có ảnh background. Nhấp vào ô
              màu để chọn.
            </li>
            <li>
              <strong>Presets:</strong> Nhanh chóng chọn các màu được định sẵn.
            </li>
            <li>
              <strong>Lưu:</strong> Cài đặt sẽ được lưu vào localStorage (trình duyệt).
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
