# 📋 DANH SÁCH CHỨC NĂNG WEBSITE BÁN ĐIỆN THOẠI

## 🎯 PHÂN CÔNG CHO 5 THÀNH VIÊN

---

## 👤 **DEV 1 - Backend Core** (Người 1)

### 🔧 Backend Infrastructure
1. **Database Setup**
   - MongoDB connection và configuration
   - Models: User, Product, Order, Cart, Banner
   - Database seeding (dữ liệu mẫu)

2. **Authentication System**
   - JWT token với HTTP-only cookies
   - Register/Login/Logout
   - Middleware: protect, isAdmin
   - Password hashing với bcrypt

3. **Product API**
   - GET /api/products - Lấy danh sách sản phẩm (có pagination, filter, sort)
   - GET /api/products/:id - Chi tiết sản phẩm
   - POST /api/products - Tạo sản phẩm (Admin)
   - PUT /api/products/:id - Cập nhật sản phẩm (Admin)
   - DELETE /api/products/:id - Xóa sản phẩm (Admin)

4. **Review System**
   - POST /api/products/:id/reviews - Thêm đánh giá
   - GET /api/products/:id/reviews - Lấy danh sách đánh giá

---

## 🎨 **DEV 2 - Frontend Core** (Người 2)

### 🖼️ UI Components & Layout
1. **Core Components**
   - Header (Logo, Menu, Search, Cart icon, User dropdown)
   - Footer (Company info, links, social media)
   - ProductCard (Hiển thị sản phẩm với hình ảnh, giá, rating)

2. **HomePage**
   - Banner slider tự động chạy
   - Bộ lọc sản phẩm (thương hiệu, giá, đánh giá, danh mục)
   - Sắp xếp (giá, mới nhất, rating)
   - Pagination
   - Responsive grid layout

3. **ProductPage**
   - Hình ảnh sản phẩm (gallery)
   - Thông tin chi tiết (tên, giá, mô tả, specs)
   - Nút thêm vào giỏ
   - Related Products (4 sản phẩm tương tự)
   - Phần đánh giá và comment

4. **Redux Store Setup**
   - Redux Toolkit configuration
   - authSlice, cartSlice
   - Axios configuration với interceptors

---

## 👥 **DEV 3 - User Features** (Người 3)

### 🔐 Authentication Pages
1. **LoginPage**
   - Form đăng nhập
   - Link "Quên mật khẩu"
   - Redirect sau khi login thành công

2. **RegisterPage**
   - Form đăng ký (username, email, password, confirmPassword)
   - Validation
   - Auto-login sau register

3. **Forgot Password Flow**
   - ForgotPasswordPage - Nhập email
   - Reset password token generation
   - Email service với Nodemailer (Gmail SMTP)
   - ResetPasswordPage - Nhập mật khẩu mới

### 📱 User Dashboard
4. **ProfilePage**
   - Thông tin cá nhân
   - Danh sách đơn hàng (clickable)
   - Lịch sử mua hàng

5. **OrderDetailPage**
   - Chi tiết đơn hàng
   - Trạng thái đơn hàng (timeline)
   - Thông tin giao hàng
   - Danh sách sản phẩm trong đơn

6. **Related Products Component**
   - Hiển thị 4 sản phẩm liên quan
   - Filter theo category/brand
   - Responsive grid

---

## 🛡️ **DEV 4 - Admin Panel** (Người 4)

### 👨‍💼 Admin Dashboard
1. **AdminDashboard**
   - Thống kê: Tổng sản phẩm, đơn hàng, người dùng, doanh thu
   - Quick actions buttons
   - Statistics cards

2. **AdminProductsPage**
   - Bảng quản lý sản phẩm
   - Thêm/sửa/xóa sản phẩm
   - Upload ảnh sản phẩm (multiple images)
   - Form validation

3. **AdminOrdersPage**
   - Danh sách tất cả đơn hàng
   - Filter theo trạng thái
   - Cập nhật trạng thái đơn (pending → paid → shipped → delivered)
   - Xóa đơn hàng
   - Chi tiết đơn trong modal

4. **AdminUsersPage**
   - Danh sách người dùng
   - Xem lịch sử đơn hàng của user
   - Xóa user (không cho xóa admin)
   - User statistics

5. **AdminSettingsPage**
   - Tùy chỉnh background website
   - Upload background image
   - Color picker cho background
   - Preview realtime

6. **Upload System**
   - Multer middleware cho upload ảnh
   - POST /api/upload - Upload single image
   - Lưu vào folder /uploads
   - Return image URL

---

## 🚀 **DEV 5 - Advanced Features** (Người 5)

### 🛒 Shopping Cart System
1. **CartPage**
   - Hiển thị danh sách sản phẩm trong giỏ
   - Nút +/- để điều chỉnh số lượng
   - Input trực tiếp số lượng
   - Xóa từng sản phẩm
   - Nút "Xóa toàn bộ giỏ hàng"
   - Tổng tiền tự động cập nhật
   - Redux integration (updateCartItem, removeCartItem, clearCart)

2. **CheckoutPage**
   - Form thông tin giao hàng
   - Chọn phương thức thanh toán (COD)
   - Review order trước khi đặt
   - Tạo đơn hàng (POST /api/orders)
   - Clear cart sau khi đặt hàng thành công

### 🎨 Banner Management System
3. **Banner Model & API**
   - Model: imageUrl, link, order, isActive, duration
   - GET /api/banners - Lấy banners active (public)
   - GET /api/banners/admin - Lấy tất cả (admin)
   - POST /api/banners/admin - Tạo banner
   - PUT /api/banners/admin/:id - Cập nhật
   - DELETE /api/banners/admin/:id - Xóa

4. **BannerSlider Component**
   - Auto-slide với thời gian tùy chỉnh (mỗi banner có duration riêng)
   - Nút Previous/Next
   - Dots indicator (click to jump)
   - Hover to pause
   - Smooth transitions với CSS transforms
   - Responsive design
   - Optional click-through links

5. **AdminBannersPage**
   - Bảng quản lý banners
   - Upload ảnh banner
   - Set thứ tự hiển thị
   - Set thời gian hiển thị (seconds)
   - Thêm link (optional)
   - Toggle Active/Inactive
   - Preview ảnh trong form
   - Drag to reorder (optional)

### 🔗 Integration
6. **App.jsx - Routing**
   - Tất cả routes (public, protected, admin)
   - ProtectedRoute component
   - AdminRoute component
   - Route guards
   - 404 handling

---

## 📊 TỔNG KẾT CHỨC NĂNG

### Backend (24 endpoints)
- ✅ Auth: 5 endpoints (register, login, logout, forgot, reset)
- ✅ Products: 6 endpoints (list, detail, create, update, delete, reviews)
- ✅ Orders: 7 endpoints (create, list, detail, update status, delete, mark paid, all orders)
- ✅ Cart: 5 endpoints (get, add, update, remove, clear)
- ✅ Admin: 3 endpoints (list users, user orders, delete user)
- ✅ Banners: 5 endpoints (public list, admin CRUD)
- ✅ Upload: 1 endpoint

### Frontend (20 pages/components)
- ✅ Public Pages: 4 (Home, Product, Login, Register)
- ✅ Auth Pages: 2 (Forgot Password, Reset Password)
- ✅ User Pages: 3 (Profile, Cart, Checkout, Order Detail)
- ✅ Admin Pages: 6 (Dashboard, Products, Orders, Users, Settings, Banners)
- ✅ Components: 5 (Header, Footer, ProductCard, BannerSlider, RelatedProducts)

### Features Summary
- 🔐 Authentication & Authorization (JWT, Roles)
- 📦 Product Management (CRUD, Filter, Search, Sort)
- 🛒 Shopping Cart (Add, Update, Delete, Clear)
- 💳 Checkout & Orders (Create, Track, History)
- ⭐ Review System (Add, Display, Rating)
- 👥 User Management (Admin)
- 📊 Dashboard & Statistics
- 🎨 Theme Customization
- 🖼️ Banner Carousel (Auto-slide, Dynamic duration)
- 📧 Email Service (Password Reset)
- 📤 Image Upload (Products, Banners, Background)

---

## 🎯 HƯỚNG DẪN TẠO PULL REQUESTS

### Bước 1: Clone & Setup
```bash
git clone https://github.com/DEVVD25/mern-phone-shop.git
cd mern-phone-shop
```

### Bước 2: Tạo Branch riêng
```bash
# DEV 1
git checkout -b dev1-backend-core

# DEV 2
git checkout -b dangcongvu-frontend-core

# DEV 3
git checkout -b dev3-user-features

# DEV 4
git checkout -b dev4-admin-panel

# DEV 5
git checkout -b dev5-advanced-features
```

### Bước 3: Commit từng chức năng

> **⚠️ QUAN TRỌNG:** Mỗi người tự tạo repo riêng trên GitHub và chỉ push **CODE MÌNH LÀM**.
> Không được push hết toàn bộ project lên, thầy sẽ nghi ngờ!

---

#### **Quy trình cho MỖI NGƯỜI (5 người làm độc lập):**


git init
git remote add origin https://github.com/USERNAME/mern-phone-shop-dev1.git

---

#### **DEV 1 - Backend Core:**
```bash
# Tạo branch
git checkout -b dev1-backend-core

# CHỈ ADD FILE MÌNH LÀM - commit từng chức năng
git add server/src/utils/db.js server/src/models/
git commit -m "feat: Thiết lập kết nối MongoDB và các Models"

git add server/src/controllers/authController.js server/src/routes/authRoutes.js server/src/middleware/auth.js
git commit -m "feat: Xây dựng hệ thống xác thực với JWT"

git add server/src/controllers/productController.js server/src/routes/productRoutes.js
git commit -m "feat: Thêm API quản lý sản phẩm (CRUD)"

git add server/src/controllers/reviewController.js server/src/routes/reviewRoutes.js
git commit -m "feat: Xây dựng hệ thống đánh giá sản phẩm"

git add server/src/seed.js
git commit -m "feat: Thêm dữ liệu mẫu cho database"

# Push lên branch (KHÔNG phải main)
git push -u origin dev1-backend-core
```

---

#### **DEV 2 - Frontend Core:** Vũ
```bash
# Tạo branch
git checkout -b dangcongvu-frontend-core

# CHỈ ADD FILE MÌNH LÀM - commit từng chức năng
git add client/package.json client/vite.config.js client/index.html
git commit -m "feat: Thiết lập React project với Vite"

# Layout components
git add client/src/components/Header.jsx client/src/components/Footer.jsx
git commit -m "feat: Tạo Header và Footer components"

# Product card
git add client/src/components/ProductCard.jsx
git commit -m "feat: Tạo ProductCard component"

# HomePage
git add client/src/pages/HomePage.jsx
git commit -m "feat: Xây dựng trang chủ với danh sách sản phẩm và bộ lọc"

# ProductPage
git add client/src/pages/ProductPage.jsx
git commit -m "feat: Tạo trang chi tiết sản phẩm"

# Redux setup
git add client/src/store.js client/src/api/axios.js client/src/slices/
git commit -m "feat: Thiết lập Redux Store và Axios"

# Styles
git add client/src/styles.css
git commit -m "style: Thêm CSS styling cho components"

# Push lên branch
git push -u origin dev2-frontend-core
```

---

#### **DEV 3 - User Features:**
```bash
# Tạo branch
git checkout -b dev3-user-features

# CHỈ ADD FILE MÌNH LÀM - commit từng chức năng
git add client/src/pages/LoginPage.jsx client/src/pages/RegisterPage.jsx
git commit -m "feat: Thêm trang đăng nhập và đăng ký"

# Auth Redux slice
git add client/src/slices/authSlice.js
git commit -m "feat: Tạo Redux slice cho authentication"

# Forgot password pages
git add client/src/pages/ForgotPasswordPage.jsx client/src/pages/ResetPasswordPage.jsx
git commit -m "feat: Xây dựng chức năng quên mật khẩu"

# Email service
git add server/src/utils/sendEmail.js server/src/controllers/authController.js
git commit -m "feat: Tích hợp email service với Nodemailer"

git add EMAIL_SETUP.md
git commit -m "docs: Thêm hướng dẫn cài đặt email"

# Profile page
git add client/src/pages/ProfilePage.jsx
git commit -m "feat: Thêm trang profile người dùng"

# Order detail page
git add client/src/pages/OrderDetailPage.jsx
git commit -m "feat: Tạo trang chi tiết đơn hàng"

# Related products
git add client/src/components/RelatedProducts.jsx
git commit -m "feat: Tạo component sản phẩm liên quan"

# Update routes
git add client/src/App.jsx
git commit -m "feat: Cập nhật routing cho authentication pages"

# Push lên branch
git push -u origin dev3-user-features
```

---

#### **DEV 4 - Admin Panel:**
```bash
# Tạo branch
git checkout -b dev4-admin-panel

# CHỈ ADD FILE MÌNH LÀM - commit từng chức năng
git add client/src/pages/admin/AdminDashboard.jsx
git commit -m "feat: Xây dựng admin dashboard với thống kê"

# Admin products page
git add client/src/pages/admin/AdminProductsPage.jsx
git commit -m "feat: Tạo trang quản lý sản phẩm"

# Admin orders page
git add client/src/pages/admin/AdminOrdersPage.jsx
git commit -m "feat: Thêm trang quản lý đơn hàng với cập nhật trạng thái"

# Admin users page
git add client/src/pages/admin/AdminUsersPage.jsx
git commit -m "feat: Xây dựng trang quản lý người dùng"

# Admin settings page
git add client/src/pages/admin/AdminSettingsPage.jsx
git commit -m "feat: Tạo trang cài đặt giao diện"

# Admin reviews page
git add client/src/pages/admin/AdminReviewsPage.jsx
git commit -m "feat: Thêm trang quản lý đánh giá"

# Admin API
git add server/src/controllers/adminController.js server/src/routes/adminRoutes.js
git commit -m "feat: Thêm admin API endpoints"

# Upload system
git add server/src/controllers/uploadController.js server/src/routes/uploadRoutes.js
git commit -m "feat: Thêm chức năng upload ảnh"

# Update order controller
git add server/src/controllers/orderController.js
git commit -m "feat: Thêm chức năng xóa đơn hàng và cập nhật trạng thái"

# Update routes
git add client/src/App.jsx
git commit -m "feat: Cập nhật routing cho admin pages"

# Push lên branch
git push -u origin dev4-admin-panel
```

---

#### **DEV 5 - Advanced Features:**
```bash
# Tạo branch
git checkout -b dev5-advanced-features

# CHỈ ADD FILE MÌNH LÀM - commit từng chức năng
git add client/src/pages/CartPage.jsx
git commit -m "feat: Xây dựng giỏ hàng với cập nhật và xóa sản phẩm"

# Cart Redux slice
git add client/src/slices/cartSlice.js
git commit -m "feat: Cập nhật cartSlice với chức năng mới"

# Cart API
git add server/src/controllers/cartController.js server/src/routes/cartRoutes.js
git commit -m "feat: Thêm API quản lý giỏ hàng"

# Checkout page
git add client/src/pages/CheckoutPage.jsx
git commit -m "feat: Tạo trang thanh toán"

# Order API
git add server/src/controllers/orderController.js server/src/routes/orderRoutes.js
git commit -m "feat: Thêm API tạo đơn hàng"

# Banner model
git add server/src/models/Banner.js
git commit -m "feat: Tạo Banner model"

# Banner API
git add server/src/controllers/bannerController.js server/src/routes/bannerRoutes.js
git commit -m "feat: Thêm Banner API endpoints"

# Banner slider component
git add client/src/components/BannerSlider.jsx
git commit -m "feat: Xây dựng banner slider với hiệu ứng tự động"

# Admin banners page
git add client/src/pages/admin/AdminBannersPage.jsx
git commit -m "feat: Tạo trang quản lý banner cho admin"

# Update HomePage
git add client/src/pages/HomePage.jsx
git commit -m "feat: Thêm banner slider vào trang chủ"

# Update app routes
git add client/src/App.jsx server/src/app.js
git commit -m "feat: Cập nhật routing cho tất cả trang mới"

# Push lên branch
git push -u origin dev5-advanced-features
```

---

### Bước 4: Push lên GitHub (Đã push ở trên rồi!)
```bash
git push origin dev1-backend-core
```

### Bước 5: Tạo Pull Request
1. Vào GitHub repository
2. Click "Pull requests" → "New pull request"
3. Chọn branch của bạn (vd: `dev1-backend-core`)
4. **Title:** `[DEV 1] Backend Core - Xác thực người dùng và API sản phẩm`
5. **Description:** 
```
## Tóm tắt
- Thiết lập kết nối MongoDB và các Models (User, Product, Order, Cart, Banner)
- Xây dựng hệ thống xác thực JWT với HTTP-only cookies
- API quản lý sản phẩm (CRUD, filter, sort, pagination)
- Hệ thống đánh giá sản phẩm

## Chi tiết chức năng
### 1. Database Setup
- Kết nối MongoDB với Mongoose
- Tạo 5 models chính: User, Product, Order, Cart, Banner
- Seed dữ liệu mẫu

### 2. Authentication System
- Register/Login/Logout với JWT
- Middleware: protect, isAdmin
- Password hashing với bcrypt
- HTTP-only cookies cho bảo mật

### 3. Product API
- GET /api/products - Danh sách sản phẩm (filter, sort, pagination)
- GET /api/products/:id - Chi tiết sản phẩm
- POST /api/products - Tạo sản phẩm (Admin)
- PUT /api/products/:id - Cập nhật sản phẩm (Admin)
- DELETE /api/products/:id - Xóa sản phẩm (Admin)

### 4. Review System
- POST /api/products/:id/reviews - Thêm đánh giá
- GET /api/products/:id/reviews - Lấy danh sách đánh giá
- Tính rating trung bình tự động

## Test
- ✅ Auth APIs hoạt động đúng
- ✅ Product CRUD operations
- ✅ Review system
- ✅ Middleware bảo vệ routes admin
```
6. Assign reviewer (giáo viên)
7. Submit PR

---

## 📝 MẪU PULL REQUEST CHO TỪNG DEV

### DEV 1 - Backend Core
**Title:** `[DEV 1] Backend Core - Xác thực người dùng và API sản phẩm`

**Commits:**
```bash
git commit -m "feat: Thiết lập kết nối MongoDB và các Models"
git commit -m "feat: Xây dựng hệ thống xác thực với JWT"
git commit -m "feat: Thêm API quản lý sản phẩm (CRUD)"
git commit -m "feat: Xây dựng hệ thống đánh giá sản phẩm"
```

---

### DEV 2 - Frontend Core
**Title:** `[DEV 2] Frontend Core - Giao diện trang chủ và chi tiết sản phẩm`

**Commits:**
```bash
git commit -m "feat: Thiết lập React project với Vite"
git commit -m "feat: Tạo Header và Footer components"
git commit -m "feat: Xây dựng trang chủ với danh sách sản phẩm và bộ lọc"
git commit -m "feat: Tạo trang chi tiết sản phẩm"
git commit -m "feat: Thiết lập Redux Store và Axios"
```

---

### DEV 3 - User Features
**Title:** `[DEV 3] User Features - Đăng nhập, đăng ký và quản lý tài khoản`

**Commits:**
```bash
git commit -m "feat: Thêm trang đăng nhập và đăng ký"
git commit -m "feat: Tạo Redux slice cho authentication"
git commit -m "feat: Xây dựng chức năng quên mật khẩu"
git commit -m "feat: Tích hợp email service với Nodemailer"
git commit -m "feat: Thêm trang profile và chi tiết đơn hàng"
git commit -m "feat: Tạo component sản phẩm liên quan"
```

---

### DEV 4 - Admin Panel
**Title:** `[DEV 4] Admin Panel - Quản trị hệ thống và dashboard`

**Commits:**
```bash
git commit -m "feat: Xây dựng admin dashboard với thống kê"
git commit -m "feat: Tạo trang quản lý sản phẩm"
git commit -m "feat: Thêm trang quản lý đơn hàng với cập nhật trạng thái"
git commit -m "feat: Xây dựng trang quản lý người dùng"
git commit -m "feat: Tạo trang cài đặt giao diện"
git commit -m "feat: Thêm chức năng upload ảnh"
```

---

### DEV 5 - Advanced Features
**Title:** `[DEV 5] Advanced Features - Giỏ hàng, thanh toán và banner`

**Commits:**
```bash
git commit -m "feat: Xây dựng giỏ hàng với cập nhật và xóa sản phẩm"
git commit -m "feat: Tạo trang thanh toán"
git commit -m "feat: Thêm Banner model và API"
git commit -m "feat: Xây dựng banner slider với hiệu ứng tự động"
git commit -m "feat: Tạo trang quản lý banner cho admin"
git commit -m "feat: Cập nhật routing cho tất cả trang mới"
```

---

## 📝 COMMIT MESSAGE CONVENTION

### Format:
```
<type>: <subject>

<body> (optional)
```

### Types:
- `feat:` - Tính năng mới
- `fix:` - Sửa bug
- `docs:` - Documentation
- `style:` - Format code
- `refactor:` - Refactor code
- `test:` - Thêm tests
- `chore:` - Maintenance tasks

### Ví dụ:
```bash
git commit -m "feat: Thêm chức năng xác thực người dùng với JWT"
git commit -m "fix: Sửa lỗi cập nhật giỏ hàng"
git commit -m "docs: Cập nhật hướng dẫn cài đặt trong README"
git commit -m "refactor: Tối ưu code controller sản phẩm"
git commit -m "style: Format lại code theo chuẩn Prettier"
```

---

## ⚠️ LƯU Ý QUAN TRỌNG

1. **Mỗi người làm branch riêng** - Không commit trực tiếp vào `main`
2. **Commit thường xuyên** - Mỗi chức năng 1 commit riêng
3. **Code clean** - Format code trước khi commit
4. **Test kỹ** - Đảm bảo chức năng chạy đúng
5. **Comment code** - Giải thích logic phức tạp
6. **Pull request description** - Viết rõ ràng những gì đã làm
7. **Resolve conflicts** - Merge main vào branch của bạn trước khi PR

---

## 📞 HỖ TRỢ

- GitHub Issues: Report bugs
- Team Chat: Thảo luận technical
- Code Review: Comment trên PR
- Documentation: README.md, FEATURES.md

---

**Good luck! 🚀**
