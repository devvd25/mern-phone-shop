#### **DEV 1 - Công Vũ - FRONTEND CHÍNH + CORE** (26 files) ⭐
```bash
# Setup project
git add client/package.json client/vite.config.js client/index.html client/src/main.jsx
git commit -m "feat: Thiết lập React project với Vite"

# Layout components
git add client/src/components/Header.jsx client/src/components/Footer.jsx
git commit -m "feat: Tạo Header và Footer components"

# Product components
git add client/src/components/ProductCard.jsx client/src/components/ProductReviews.jsx client/src/components/RelatedProducts.jsx
git commit -m "feat: Tạo ProductCard, ProductReviews và RelatedProducts components"

# Banner component
git add client/src/components/BannerSlider.jsx
git commit -m "feat: Xây dựng BannerSlider với auto-slide và manual controls"

# HomePage
git add client/src/pages/HomePage.jsx
git commit -m "feat: Xây dựng trang chủ với filter, sort, pagination và banner"

# ProductPage
git add client/src/pages/ProductPage.jsx
git commit -m "feat: Tạo trang chi tiết sản phẩm với gallery và reviews"

# Auth pages
git add client/src/pages/LoginPage.jsx client/src/pages/RegisterPage.jsx
git commit -m "feat: Thêm trang đăng nhập và đăng ký"

# User pages
git add client/src/pages/ProfilePage.jsx
git commit -m "feat: Tạo trang profile người dùng với lịch sử đơn hàng"

git add client/src/pages/CheckoutPage.jsx
git commit -m "feat: Tạo trang thanh toán với form giao hàng"

# Redux store
git add client/src/store.js client/src/api/axios.js
git commit -m "feat: Thiết lập Redux Store và Axios với interceptors"



# App routing
git add client/src/App.jsx
git commit -m "feat: Cấu hình routing cho toàn bộ ứng dụng"

# Styles
git add client/src/styles.css
git commit -m "style: Thêm CSS styling responsive cho toàn bộ website"



# Voucher system - MyVouchersPage
git add client/src/pages/MyVouchersPage.jsx
git commit -m "feat: Tạo trang hiển thị voucher của user với card layout và copy code"

# Voucher system - VoucherInput
git add client/src/components/VoucherInput.jsx
git commit -m "feat: Xây dựng VoucherInput với dropdown auto-select best voucher"

# Voucher system - CheckoutPage integration
git add client/src/pages/CheckoutPage.jsx
git commit -m "feat: Tích hợp voucher discount vào checkout page"

# Decoration effects
git add client/src/components/DecorationEffects.jsx
git commit -m "feat: Thêm hiệu ứng trang trí 4 góc và tuyết rơi cho HomePage"

# Push lên branch
git push -u origin dangcongvu-frontend-core
```

---

#### **DEV 2 - Chí Bảo - BACKEND CORE** (11 files)
```bash
# Tạo branch từ main (ĐÃ TẠO Ở BƯỚC 1)
git checkout main
git checkout -b dinhngocphuoc-backend-core

# Database setup
git add server/src/utils/db.js
git commit -m "feat: Thiết lập kết nối MongoDB"

# Models
git add server/src/models/User.js server/src/models/Product.js server/src/models/Order.js server/src/models/Cart.js
git commit -m "feat: Tạo các Models (User, Product, Order, Cart)"

# Auth system
git add server/src/controllers/authController.js server/src/routes/authRoutes.js server/src/middleware/auth.js server/src/utils/token.js
git commit -m "feat: Xây dựng hệ thống xác thực với JWT"

# Email service
git add server/src/utils/sendEmail.js
git commit -m "feat: Tích hợp email service với Nodemailer"

# Product & Review APIs
git add server/src/controllers/productController.js server/src/routes/productRoutes.js server/src/routes/reviewRoutes.js
git commit -m "feat: Thêm API quản lý sản phẩm và đánh giá"

# Seed data
git add server/src/seed.js
git commit -m "feat: Thêm dữ liệu mẫu cho database"

# Push lên branch
git push -u origin dinhngocphuoc-backend-core
```

---

#### **DEV 3 - Ngọc Phước - CART & ORDER SYSTEM** (5 files)
```bash
# Tạo branch từ main (ĐÃ TẠO Ở BƯỚC 1)
git checkout main
git checkout -b dev3-cart-order

# Cart backend
git add server/src/controllers/cartController.js server/src/routes/cartRoutes.js
git commit -m "feat: Thêm API quản lý giỏ hàng (get, add, update, remove, clear)"

# Order backend
git add server/src/controllers/orderController.js server/src/routes/orderRoutes.js
git commit -m "feat: Thêm API quản lý đơn hàng (create, list, update status, delete)"

# Order detail page
git add client/src/pages/OrderDetailPage.jsx
git commit -m "feat: Tạo trang chi tiết đơn hàng với timeline trạng thái"

# Chat integration
git add client/index.html
git commit -m "feat: Tích hợp Dialogflow AI Chatbot, Zalo và Messenger chat buttons"

# Push lên branch
git push -u origin dev3-cart-order
```

---

#### **DEV 4 - Đình Nhàng - ADMIN PANEL** (10 files)
```bash
# Tạo branch từ main (ĐÃ TẠO Ở BƯỚC 1)
git checkout main
git checkout -b dev4-admin-panel

# Admin backend
git add server/src/controllers/adminController.js server/src/routes/adminRoutes.js
git commit -m "feat: Thêm admin API (list users, user orders, delete user)"

# Upload system
git add server/src/controllers/uploadController.js server/src/routes/uploadRoutes.js
git commit -m "feat: Thêm chức năng upload ảnh với Multer"

# Admin dashboard
git add client/src/pages/admin/AdminDashboard.jsx
git commit -m "feat: Xây dựng admin dashboard với thống kê"

# Admin products
git add client/src/pages/admin/AdminProductsPage.jsx
git commit -m "feat: Tạo trang quản lý sản phẩm cho admin"

# Admin orders
git add client/src/pages/admin/AdminOrdersPage.jsx
git commit -m "feat: Thêm trang quản lý đơn hàng với cập nhật trạng thái"

# Admin users
git add client/src/pages/admin/AdminUsersPage.jsx
git commit -m "feat: Xây dựng trang quản lý người dùng"

# Admin reviews
git add client/src/pages/admin/AdminReviewsPage.jsx
git commit -m "feat: Tạo trang quản lý đánh giá sản phẩm"

# Admin settings
git add client/src/pages/admin/AdminSettingsPage.jsx
git commit -m "feat: Thêm trang cài đặt giao diện (background, colors)"

git add client/src/slices/authSlice.js client/src/slices/cartSlice.js
git commit -m "feat: Tạo authSlice và cartSlice cho state management"

# Push lên branch
git push -u origin dev4-admin-panel
```

---

#### **DEV 5 - Xuân Huy - BANNER SYSTEM & AUTH PAGES** (7 files)
```bash
# Tạo branch từ main (ĐÃ TẠO Ở BƯỚC 1)
git checkout main
git checkout -b dev5-banner-auth

# Banner model
git add server/src/models/Banner.js
git commit -m "feat: Tạo Banner model"

# Banner backend
git add server/src/controllers/bannerController.js server/src/routes/bannerRoutes.js
git commit -m "feat: Thêm Banner API (list, create, update, delete)"

# Banner admin page
git add client/src/pages/admin/AdminBannersPage.jsx
git commit -m "feat: Tạo trang quản lý banner cho admin"

# Banner component
git add client/src/components/BannerSection.jsx
git commit -m "feat: Thêm BannerSection wrapper component"

# Auth pages
git add client/src/pages/ForgotPasswordPage.jsx client/src/pages/ResetPasswordPage.jsx
git commit -m "feat: Xây dựng chức năng quên mật khẩu và reset password"

git add client/src/pages/CartPage.jsx
git commit -m "feat: Xây dựng giỏ hàng với tăng/giảm số lượng"

# Push lên branch
git push -u origin dev5-banner-auth
