#### DEV 2 - Frontend Core - BẢO

git init

git remote add origin https://github.com/devvd25/mern-phone-shop.git

git checkout -b dev2-frontend-core


# Commit từng chức năng
git add client/package.json client/vite.config.js client/index.html
git commit -m "feat: setup React project with Vite"

git add client/src/components/Header.jsx client/src/components/Footer.jsx
git commit -m "feat: add Header and Footer components"

git add client/src/pages/HomePage.jsx client/src/components/ProductCard.jsx
git commit -m "feat: create HomePage with product listing and filters"

git add client/src/pages/ProductPage.jsx
git commit -m "feat: add ProductPage with details and reviews"

git add client/src/api/axios.js client/src/store.js
git commit -m "feat: setup Redux store and Axios configuration"

# Push
git push origin dev2-frontend-core
```

#### DEV 3 - User Features - PHƯỚC

cd mern-phone-shop

git remote add origin https://github.com/DEVVD25/mern-phone-shop

git checkout dev3-user-features

# Commit các file authentication
git add client/src/pages/LoginPage.jsx client/src/pages/RegisterPage.jsx
git commit -m "feat: add login and register pages"

git add client/src/slices/authSlice.js
git commit -m "feat: add authentication Redux slice"

git add client/src/pages/ForgotPasswordPage.jsx client/src/pages/ResetPasswordPage.jsx
git commit -m "feat: add forgot password functionality"

git add server/src/utils/sendEmail.js EMAIL_SETUP.md
git commit -m "feat: add email service with Nodemailer"

git add client/src/pages/ProfilePage.jsx client/src/pages/OrderDetailPage.jsx
git commit -m "feat: add profile and order detail pages"

git add client/src/components/RelatedProducts.jsx
git commit -m "feat: add related products component"

git push origin dev3-user-features
```

#### DEV 4 - Admin Panel - XUÂN HUY

```bash

git init

git remote add origin https://github.com/devvd25/mern-phone-shop.git

git checkout -b dev4-admin-panel

# Commit admin features
git add client/src/pages/admin/AdminDashboard.jsx
git commit -m "feat: add admin dashboard with statistics"

git add client/src/pages/admin/AdminProductsPage.jsx
git commit -m "feat: add admin product management page"

git add client/src/pages/admin/AdminOrdersPage.jsx
git commit -m "feat: add admin order management with status updates"

git add client/src/pages/admin/AdminUsersPage.jsx
git commit -m "feat: add admin user management"

git add client/src/pages/admin/AdminSettingsPage.jsx
git commit -m "feat: add admin settings page for theme customization"

git add server/src/controllers/adminController.js server/src/routes/adminRoutes.js
git commit -m "feat: add admin API endpoints"

git add server/src/controllers/uploadController.js server/src/routes/uploadRoutes.js
git commit -m "feat: add image upload functionality"

git push origin dev4-admin-panel
```

#### DEV 5 - Advanced Features - NHÀNG

```bash

git init

git remote add origin https://github.com/devvd25/mern-phone-shop.git

git checkout -b dev5-advanced-features

# Commit cart features
git add client/src/pages/CartPage.jsx client/src/slices/cartSlice.js
git commit -m "feat: add shopping cart with update and delete items"

git add client/src/pages/CheckoutPage.jsx
git commit -m "feat: add checkout page"

# Commit banner system
git add server/src/models/Banner.js server/src/controllers/bannerController.js
git commit -m "feat: add banner model and API"

git add client/src/components/BannerSlider.jsx
git commit -m "feat: add banner slider with auto-slide animation"

git add client/src/pages/admin/AdminBannersPage.jsx
git commit -m "feat: add admin banner management page"

git add client/src/App.jsx
git commit -m "feat: update routing with all new pages"

git push origin dev5-advanced-features
```

---

### BƯỚC 3: Tạo Pull Requests (PR)

Mỗi thành viên làm như sau:

1. Vào GitHub repository
2. Click **"Pull requests"** → **"New pull request"**
3. Chọn:
   - Base: `main`
   - Compare: `dev1-backend-core` (hoặc branch của mình)
4. Điền title: `[DEV1] Backend Core - Authentication & Product API`
5. Điền description chi tiết:
   ```
   ## Chức năng đã hoàn thành
   - Setup Express server
   - MongoDB connection
   - JWT authentication
   - Product CRUD API
   - Cart & Order management
   
   ## Files thay đổi
   - 15 files changed
   - 1,200+ lines added
   ```
6. Click **"Create pull request"**
7. **KHÔNG MERGE** - để thầy review từng PR riêng

---

### BƯỚC 4: Demo cho giáo viên

**Chuẩn bị:**

1. **Mỗi người có GitHub account riêng** với commits rõ ràng
2. **Screenshot/Video** demo chức năng mình làm
3. **Slides giải thích** (5-10 phút/người):
   - Công nghệ sử dụng
   - Khó khăn gặp phải
   - Giải pháp đã áp dụng

**Ví dụ slides cho Dev 1:**
```
📌 DEV 1 - Backend Core
━━━━━━━━━━━━━━━━━━━━━━
✅ Express.js Server Setup
✅ MongoDB Connection (Mongoose)
✅ JWT Authentication
   • Login/Register/Logout
   • HTTP-only cookies
   • Password hashing (bcrypt)
✅ Product API
   • CRUD operations
   • Filters (category, brand, price)
   • Pagination & sorting
✅ Cart & Order System
   • Add/Update/Remove items
   • Checkout process

🔧 Tech Stack:
   • Node.js 20
   • Express.js
   • MongoDB + Mongoose
   • JWT
   • Bcrypt
```

---

## 🔍 CHẤM ĐIỂM CỦA GIÁO VIÊN

Thầy sẽ kiểm tra:

### ✅ Git History
```bash
# Xem commits của từng người
git log --author="Dev1Name" --oneline
git log --author="Dev2Name" --oneline
```

### ✅ Code Contribution
```bash
# Xem số dòng code mỗi người
git log --author="Dev1Name" --pretty=tformat: --numstat | \
awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }'
```

### ✅ Pull Requests riêng biệt
- Mỗi người có PR riêng từ branch riêng
- Description chi tiết
- Không overlap code

### ✅ Commit messages rõ ràng
- Format chuẩn: `feat:`, `fix:`, `chore:`
- Mô tả ngắn gọn, dễ hiểu

### ✅ Demo chức năng
- Video/screenshot hoạt động
- Giải thích được logic code
- Trả lời được câu hỏi của thầy

---

## ⚠️ LƯU Ý QUAN TRỌNG

### ❌ TUYỆT ĐỐI KHÔNG:
1. **Commit tất cả code từ 1 máy** → Thầy sẽ biết qua IP/device
2. **Copy-paste commit history** → GitHub tracking rất chính xác
3. **Dùng chung 1 GitHub account** → Mất điểm teamwork
4. **Merge tất cả vào main** → Để riêng từng PR

### ✅ NÊN LÀM:
1. **Mỗi người làm trên máy riêng**, commit từ account riêng
2. **Setup Git config đúng**:
   ```bash
   git config user.name "Nguyen Van A"
   git config user.email "nguyenvana@gmail.com"
   ```
3. **Commit thường xuyên** (5-10 commits/người)
4. **Viết commit message có ý nghĩa**
5. **Test kỹ chức năng trước khi demo**

---

## 📊 CHECKLIST TRƯỚC KHI NỘP

### Dev 1 (Leader)
- [ ] Repository đã public trên GitHub
- [ ] README.md chi tiết cách chạy dự án
- [ ] .gitignore đầy đủ (không push node_modules, .env)
- [ ] Có 5 branches riêng biệt
- [ ] Backend chạy được (npm run dev)
- [ ] Database có data mẫu (seed.js)

### Dev 2-5 (Members)
- [ ] Clone repo thành công
- [ ] Checkout đúng branch của mình
- [ ] Code chạy được local
- [ ] Đã push code lên branch riêng
- [ ] Đã tạo Pull Request
- [ ] Screenshots/video demo sẵn sàng

### Toàn nhóm
- [ ] Tất cả có GitHub account riêng
- [ ] Git commit history rõ ràng từng người
- [ ] Pull Requests có description chi tiết
- [ ] Slides thuyết trình đã chuẩn bị
- [ ] Test toàn bộ tính năng không lỗi

---

## 🎯 TIMELINE ĐỀ XUẤT

**Tuần 1:**
- Dev 1: Setup repo, backend core
- Dev 2: Clone repo, setup frontend
- Dev 3: Clone repo, làm authentication UI

**Tuần 2:**
- Dev 1: Hoàn thành API, hỗ trợ team
- Dev 4: Admin panel
- Dev 5: Cart & Banner features

**Tuần 3:**
- Integration testing
- Fix bugs
- Chuẩn bị demo
- Tạo Pull Requests
- Rehearsal thuyết trình

**Ngày nộp:**
- Demo trực tiếp cho thầy
- Giải đáp câu hỏi
- Submit GitHub repo link

---

## 📞 HỖ TRỢ

**Nếu gặp vấn đề:**

1. **Git conflicts:**
   ```bash
   git pull origin main
   git merge main
   # Resolve conflicts
   git add .
   git commit -m "chore: resolve merge conflicts"
   ```

2. **Không push được:**
   ```bash
   git remote -v  # Kiểm tra remote
   git push -u origin branch-name --force  # Force push (cẩn thận)
   ```

3. **Code không chạy:**
   - Check `npm install` đã chạy chưa
   - Check `.env` file
   - Check MongoDB đang chạy
   - Check port conflicts

4. **Liên hệ Dev 1** (Leader) để hỗ trợ merge và fix lỗi

---

**🎓 CHÚC CẢ NHÓM BẢO VỆ THÀNH CÔNG!**
