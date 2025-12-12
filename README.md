# 📖 HƯỚNG DẪN CHẠY DỰ ÁN - MERN PHONE SHOP

## 🎯 Dành cho người mới bắt đầu

Hướng dẫn này sẽ giúp bạn chạy được dự án từ đầu đến cuối một cách đơn giản nhất.

---

## 📋 YÊU CẦU HỆ THỐNG

Trước khi bắt đầu, hãy cài đặt các phần mềm sau:

### 1. Node.js (Bắt buộc)
- **Phiên bản**: Node.js 20.x trở lên
- **Tải về**: https://nodejs.org/
- **Kiểm tra**: Mở terminal và chạy:
  ```bash
  node --version
  npm --version
  ```
  Nếu hiển thị số phiên bản là OK ✅

### 2. MongoDB (Bắt buộc)
- **Tải về**: https://www.mongodb.com/try/download/community
- **Hoặc sử dụng MongoDB Atlas** (miễn phí): https://www.mongodb.com/cloud/atlas
- **Kiểm tra**: Chạy lệnh sau để khởi động MongoDB:
  ```bash
  mongod
  ```
  Hoặc kiểm tra MongoDB service đang chạy

### 3. Git (Tùy chọn)
- **Tải về**: https://git-scm.com/downloads
- Dùng để clone dự án

### 4. Visual Studio Code (Khuyến nghị)
- **Tải về**: https://code.visualstudio.com/
- Editor tốt nhất cho dự án MERN

---

## 🚀 BƯỚC 1: TẢI DỰ ÁN

### Cách 1: Tải file ZIP
1. Tải file ZIP của dự án
2. Giải nén vào thư mục bạn muốn
3. Mở terminal tại thư mục đó

### Cách 2: Clone qua Git
```bash
git clone <link-repository>
cd mern-phone-shop-starter
```

---

## 📦 BƯỚC 2: CÀI ĐẶT CÁC PACKAGE

Dự án có 2 phần: **Backend** (server) và **Frontend** (client). Cần cài đặt package cho cả 2.

### 2.1. Cài đặt Backend
```bash
# Di chuyển vào thư mục server
cd server

# Cài đặt tất cả package
npm install

# Chờ đợi cho đến khi hoàn tất
```

### 2.2. Cài đặt Frontend
```bash
# Quay lại thư mục gốc
cd ..

# Di chuyển vào thư mục client
cd client

# Cài đặt tất cả package
npm install

# Chờ đợi cho đến khi hoàn tất
```

**⏱️ Lưu ý**: Quá trình cài đặt có thể mất 5-10 phút tùy tốc độ mạng.

---

## ⚙️ BƯỚC 3: CẤU HÌNH

### 3.1. Cấu hình Backend

1. **Tạo file `.env` trong thư mục `server/`**:
   ```bash
   cd server
   ```

2. **Tạo file mới tên là `.env`** và thêm nội dung sau:
   ```env
   # Cổng chạy server
   PORT=5000

   # MongoDB Connection
   MONGO_URI=mongodb://localhost:27017/phone-shop

   # JWT Secret (mã bí mật cho token)
   JWT_SECRET=your-super-secret-key-change-this-in-production

   # Email Configuration (Nodemailer)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password

   # Node Environment
   NODE_ENV=development
   ```

3. **Giải thích các biến**:
   - `PORT`: Cổng chạy backend (mặc định 5000)
   - `MONGO_URI`: Link kết nối MongoDB
     - Nếu dùng local: `mongodb://localhost:27017/phone-shop`
     - Nếu dùng Atlas: `mongodb+srv://username:password@cluster.mongodb.net/phone-shop`
   - `JWT_SECRET`: Mã bí mật bất kỳ (càng phức tạp càng tốt)
   - `EMAIL_USER` & `EMAIL_PASS`: Email để gửi thông báo (tùy chọn)

**🔐 Lưu ý về Email**:
- Nếu dùng Gmail, cần tạo App Password: https://myaccount.google.com/apppasswords
- Nếu không cần chức năng email, có thể bỏ qua 2 dòng này

### 3.2. Cấu hình Frontend

1. **Tạo file `.env` trong thư mục `client/`**:
   ```bash
   cd ../client
   ```

2. **Tạo file mới tên là `.env`** và thêm:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Giải thích**:
   - `VITE_API_URL`: Link API backend mà frontend sẽ gọi đến

---

## 🗃️ BƯỚC 4: KHỞI TẠO DỮ LIỆU MẪU

Để có dữ liệu test (sản phẩm, user admin...), chạy lệnh seed:

```bash
# Di chuyển vào thư mục server (nếu chưa có)
cd server

# Chạy seed data
npm run seed
```

**✅ Nếu thành công**, bạn sẽ thấy:
- ✅ Database connected
- ✅ Data cleared
- ✅ Admin created
- ✅ Products created
- ✅ Sample orders created

**📝 Thông tin tài khoản mặc định**:
- **Admin**:
  - Email: `admin@phoneshop.com`
  - Password: `admin123`
- **User thường**:
  - Email: `user@example.com`
  - Password: `user123`

---

## ▶️ BƯỚC 5: CHẠY DỰ ÁN

### Cách 1: Chạy thủ công (2 terminal)

#### Terminal 1 - Backend:
```bash
# Di chuyển vào thư mục server
cd server

# Chạy server
npm run dev
```
**✅ Thành công khi thấy**: `Server running on port 5000` và `MongoDB Connected`

#### Terminal 2 - Frontend:
```bash
# Mở terminal mới
# Di chuyển vào thư mục client
cd client

# Chạy frontend
npm run dev
```
**✅ Thành công khi thấy**: `Local: http://localhost:5173/`

### Cách 2: Chạy với Docker (Nếu có Docker)
```bash
# Chạy từ thư mục gốc
docker-compose up
```

---

## 🌐 BƯỚC 6: MỞ TRÌNH DUYỆT

1. Mở trình duyệt (Chrome, Firefox, Edge...)
2. Truy cập: **http://localhost:5173**
3. Bạn sẽ thấy trang chủ Phone Shop! 🎉

---

## 👤 BƯỚC 7: ĐĂNG NHẬP VÀ THỰC HIỆN THAO TÁC

### Đăng nhập với tài khoản Admin:
1. Click **"Đăng nhập"** trên header
2. Nhập:
   - Email: `admin@phoneshop.com`
   - Password: `admin123`
3. Sau khi đăng nhập, click vào avatar → **Admin Dashboard**

### Các chức năng có thể test:
- ✅ Xem danh sách sản phẩm
- ✅ Thêm sản phẩm vào giỏ hàng
- ✅ Thanh toán (nhập mã voucher nếu có)
- ✅ Xem đơn hàng của mình
- ✅ **Admin**: Quản lý sản phẩm, đơn hàng, user, voucher, settings

---

## 🧪 BƯỚC 8: TEST API VỚI POSTMAN (Tùy chọn)

Nếu bạn muốn test API trực tiếp:

1. **Tải Postman**: https://www.postman.com/downloads/
2. **Import collection**:
   - Mở Postman
   - Click **Import**
   - Chọn file `MERN_Phone_Shop_API.postman_collection.json`
3. **Chạy các request**:
   - Auth → Login
   - Products → Get All Products
   - Vouchers → Validate Voucher
   - ...và nhiều endpoint khác

**📚 Chi tiết**: Xem file `PROJECT_GUIDE.md` phần "Testing với Postman"

---

## ❗ XỬ LÝ LỖI THƯỜNG GẶP

### Lỗi 1: `Cannot find module`
**Nguyên nhân**: Chưa cài đặt package
**Giải pháp**:
```bash
cd server
npm install
cd ../client
npm install
```

### Lỗi 2: `ECONNREFUSED MongoDB`
**Nguyên nhân**: MongoDB chưa chạy
**Giải pháp**:
- Windows: Khởi động MongoDB service trong Services
- Mac/Linux: Chạy `mongod` trong terminal
- Hoặc dùng MongoDB Atlas (cloud)

### Lỗi 3: `Port 5000 already in use`
**Nguyên nhân**: Cổng 5000 đã được sử dụng bởi app khác
**Giải pháp**:
1. Đổi PORT trong file `server/.env` (ví dụ: 5001)
2. Cập nhật `VITE_API_URL` trong `client/.env` thành `http://localhost:5001/api`

### Lỗi 4: `JWT malformed` hoặc lỗi xác thực
**Nguyên nhân**: Token không đúng hoặc đã hết hạn
**Giải pháp**:
- Đăng xuất và đăng nhập lại
- Xóa localStorage: F12 → Application → Local Storage → Clear

### Lỗi 5: Frontend không kết nối được Backend
**Nguyên nhân**: Backend chưa chạy hoặc URL sai
**Giải pháp**:
1. Kiểm tra backend đang chạy tại `http://localhost:5000`
2. Kiểm tra file `client/.env` có đúng `VITE_API_URL=http://localhost:5000/api`
3. Restart frontend sau khi sửa `.env`

### Lỗi 6: Không thấy dữ liệu sản phẩm
**Nguyên nhân**: Chưa chạy seed data
**Giải pháp**:
```bash
cd server
npm run seed
```

---

## 📁 CẤU TRÚC DỰ ÁN CƠ BẢN

```
mern-phone-shop-starter/
│
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # Các component tái sử dụng
│   │   ├── pages/         # Các trang
│   │   ├── api/           # Cấu hình API (axios)
│   │   ├── slices/        # Redux slices
│   │   └── App.jsx        # Component chính
│   ├── .env               # Biến môi trường frontend
│   └── package.json
│
├── server/                 # Backend (Node.js + Express)
│   ├── src/
│   │   ├── controllers/   # Logic xử lý request
│   │   ├── models/        # Schema MongoDB
│   │   ├── routes/        # Định nghĩa routes
│   │   ├── middleware/    # Auth, error handling
│   │   └── utils/         # Helpers
│   ├── .env               # Biến môi trường backend
│   └── package.json
│
├── PROJECT_GUIDE.md        # Hướng dẫn chi tiết dự án
├── FEATURES.md             # Tài liệu tính năng
└── MERN_Phone_Shop_API.postman_collection.json
```

---

## 🎓 TÀI LIỆU THAM KHẢO

- **PROJECT_GUIDE.md**: Hướng dẫn đầy đủ về cấu trúc dự án, API endpoints, team
- **FEATURES.md**: Chi tiết các tính năng và contribution
- **README.md**: Thông tin tổng quan dự án

---

## 💡 TIPS CHO NGƯỜI MỚI

### 1. Luôn kiểm tra terminal
- Backend terminal phải hiển thị "Server running" và "MongoDB Connected"
- Frontend terminal phải hiển thị "Local: http://localhost:5173"

### 2. Khi gặp lỗi
- Đọc kỹ thông báo lỗi trong terminal
- Google lỗi đó (copy paste thông báo)
- Kiểm tra file `.env` có đầy đủ không

### 3. Khi thay đổi code
- **Backend**: Server tự restart (nodemon)
- **Frontend**: Trang tự reload (Vite HMR)
- **File .env**: Phải restart lại server/client thủ công

### 4. Sử dụng DevTools
- F12 để mở Chrome DevTools
- Tab Console: Xem lỗi JavaScript
- Tab Network: Xem các API request
- Tab Application: Xem localStorage, cookies

### 5. Học thêm
- **React**: https://react.dev/
- **Express**: https://expressjs.com/
- **MongoDB**: https://docs.mongodb.com/
- **Redux**: https://redux-toolkit.js.org/

---

## 🆘 HỖ TRỢ

Nếu gặp vấn đề không giải quyết được:

1. **Kiểm tra lại từng bước** trong guide này
2. **Xem logs** trong terminal (backend và frontend)
3. **Google lỗi** cụ thể
4. **Liên hệ** team lead hoặc người hướng dẫn

---

## ✅ CHECKLIST HOÀN THÀNH

Đánh dấu ✅ khi hoàn thành:

- [ ] Đã cài đặt Node.js và MongoDB
- [ ] Đã clone/tải dự án về
- [ ] Đã chạy `npm install` cho cả server và client
- [ ] Đã tạo file `.env` cho cả 2 phần
- [ ] Đã chạy `npm run seed` thành công
- [ ] Backend đang chạy tại port 5000
- [ ] Frontend đang chạy tại port 5173
- [ ] Đã mở được trang web trên trình duyệt
- [ ] Đã đăng nhập thành công
- [ ] Đã test các chức năng cơ bản

---

## 🎉 CHÚC MỪNG!

Bạn đã chạy thành công dự án MERN Phone Shop! 🚀

Giờ bạn có thể:
- Khám phá code
- Thêm tính năng mới
- Test các API
- Học cách MERN stack hoạt động

**Happy Coding! 💻**
