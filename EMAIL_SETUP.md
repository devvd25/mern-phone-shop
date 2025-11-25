# Hướng dẫn cấu hình Email để gửi Reset Password

## Bước 1: Lấy App Password từ Gmail

### Cách tạo App Password cho Gmail:

1. **Đăng nhập Gmail** của bạn
2. Truy cập: https://myaccount.google.com/apppasswords
3. Nếu chưa bật **2-Step Verification**:
   - Vào https://myaccount.google.com/security
   - Bật **2-Step Verification** (xác thực 2 bước)
4. Quay lại https://myaccount.google.com/apppasswords
5. Chọn:
   - **Select app**: Mail
   - **Select device**: Other (Custom name) → nhập "Phone Shop"
6. Click **Generate**
7. Copy **16 ký tự** mật khẩu hiển thị (dạng: `xxxx xxxx xxxx xxxx`)

---

## Bước 2: Cập nhật file `.env`

Mở file `server/.env` và thay đổi:

```env
# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com          # Thay bằng Gmail của bạn
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx       # Paste App Password vừa tạo
```

**Ví dụ:**
```env
EMAIL_USER=phoneshop.support@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

---

## Bước 3: Restart Server

```bash
cd server
npm run dev
```

---

## Kiểm tra hoạt động:

1. Vào trang: http://localhost:5173/forgot-password
2. Nhập email (có thể là email bất kỳ có trong database)
3. Check email của bạn → Sẽ nhận được email đẹp với nút "Đặt lại mật khẩu"

---

## ⚠️ Lưu ý quan trọng:

### Nếu không muốn dùng Gmail:
- Sửa file `server/src/utils/sendEmail.js`
- Thay đổi `service: 'gmail'` thành SMTP khác:

```javascript
return nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

### Email providers phổ biến:
- **Gmail**: `service: 'gmail'`
- **Outlook**: `service: 'hotmail'`
- **SendGrid**: Custom SMTP
- **AWS SES**: Custom SMTP
- **Mailgun**: Custom SMTP

---

## Test Email Configuration:

Thêm route test vào `server/src/routes/authRoutes.js`:

```javascript
import { testEmailConfig } from '../utils/sendEmail.js';

router.get('/test-email', async (req, res) => {
  const isValid = await testEmailConfig();
  res.json({ valid: isValid });
});
```

Truy cập: http://localhost:5000/api/auth/test-email

---

## Troubleshooting:

### Lỗi "Invalid login":
- Kiểm tra EMAIL_USER có đúng không
- Kiểm tra App Password có đúng 16 ký tự không
- Đảm bảo đã bật 2-Step Verification

### Lỗi "Connection timeout":
- Check firewall/antivirus
- Thử port khác (465 với `secure: true`)

### Email vào Spam:
- Đổi `from` trong sendEmail.js
- Thêm domain verification (production)
