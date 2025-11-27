# 📱 MERN Phone Shop - Hướng dẫn cài đặt

Website bán điện thoại sử dụng MERN Stack (MongoDB, Express, React, Node.js)

## 🚀 Yêu cầu hệ thống

- **Node.js** v20 trở lên ([tải tại đây](https://nodejs.org/))
- **MongoDB** v7 trở lên (hoặc sử dụng MongoDB Atlas)
- **Git** (tùy chọn)

## 📦 Cài đặt nhanh

### Bước 1: Clone/Tải project
```bash
git clone <repository-url>
cd mern-phone-shop-starter
```

### Bước 2: Cài đặt dependencies

**Cài đặt server:**
```bash
cd server
npm install
```

**Cài đặt client:**
```bash
cd ../client
npm install
```

### Bước 3: Cấu hình MongoDB

Mở file `server/src/utils/db.js` và kiểm tra connection string:
```javascript
const uri = 'mongodb://127.0.0.1:27017/phone_shop';
```

Đảm bảo MongoDB đang chạy trên máy tính của bạn.

### Bước 4: Chạy ứng dụng

**Mở terminal thứ nhất - Chạy Server:**
```bash
cd server
npm run dev
```
Server sẽ chạy tại: `http://localhost:5000`

**Mở terminal thứ hai - Chạy Client:**
```bash
cd client
npm run dev
```
Client sẽ chạy tại: `http://localhost:5173`

### Bước 5: Import dữ liệu mẫu (tùy chọn)

```bash
cd server
node src/seed.js
```

## 🎯 Tài khoản mặc định

Sau khi seed dữ liệu, sử dụng tài khoản admin:
- **Email:** admin@example.com
- **Password:** admin123

## 📚 Cấu trúc thư mục

```
mern-phone-shop-starter/
├── client/          # React frontend (Vite)
│   ├── src/
│   │   ├── pages/   # Các trang
│   │   ├── components/  # Components
│   │   └── api/     # Axios config
│   └── package.json
│
├── server/          # Node.js backend (Express)
│   ├── src/
│   │   ├── controllers/  # Business logic
│   │   ├── routes/       # API routes
│   │   ├── models/       # MongoDB models
│   │   └── middleware/   # Auth middleware
│   └── package.json
│
└── README.md
```

## 🔧 Các lệnh hữu ích

### Server
- `npm run dev` - Chạy server với nodemon (auto-restart)
- `npm start` - Chạy server production
- `node src/seed.js` - Import dữ liệu mẫu

### Client
- `npm run dev` - Chạy development server
- `npm run build` - Build cho production
- `npm run preview` - Preview bản build

## 🌟 Tính năng chính

✅ Đăng ký/Đăng nhập người dùng  
✅ Quản lý sản phẩm (CRUD)  
✅ Giỏ hàng & Đặt hàng  
✅ Đánh giá sản phẩm  
✅ Admin Dashboard  
✅ Tìm kiếm & Lọc sản phẩm theo danh mục/thương hiệu  
✅ Chatbot Dialogflow  
✅ Chat Zalo/Messenger  
✅ Upload logo tùy chỉnh  

## ❓ Xử lý lỗi thường gặp

**Lỗi: Cannot connect to MongoDB**
- Đảm bảo MongoDB đang chạy: `mongod`
- Kiểm tra connection string trong `server/src/utils/db.js`

**Lỗi: Port already in use**
- Server: Đổi port trong `server/src/server.js`
- Client: Đổi port trong `client/vite.config.js`

**Lỗi: Module not found**
- Chạy lại `npm install` trong thư mục tương ứng

---

## 🌐 Deploy lên Production

### Phương án 1: Deploy lên Render (Miễn phí) - Khuyên dùng

**1. Chuẩn bị MongoDB Atlas (Database Cloud)**

Đăng ký tài khoản miễn phí tại [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register):
- Tạo Cluster mới (chọn Free tier)
- Tạo Database User (username + password)
- Whitelist IP: `0.0.0.0/0` (cho phép mọi IP)
- Lấy Connection String: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/phone_shop`

**2. Deploy Backend lên Render**

Truy cập [Render.com](https://render.com) và đăng ký tài khoản:
- Click **"New +" → "Web Service"**
- Connect GitHub repo hoặc deploy từ Public Git
- Cấu hình:
  - **Name:** `phone-shop-api`
  - **Root Directory:** `server`
  - **Environment:** `Node`
  - **Build Command:** `npm install`
  - **Start Command:** `npm start`
  - **Instance Type:** `Free`
- Thêm Environment Variables:
  - `MONGODB_URI`: Connection string từ MongoDB Atlas
  - `JWT_SECRET`: `your-secret-key-here`
  - `CLIENT_URL`: `https://your-frontend-url.vercel.app`
- Click **"Create Web Service"**
- Lưu lại URL backend: `https://phone-shop-api.onrender.com`

**3. Deploy Frontend lên Vercel**

Truy cập [Vercel.com](https://vercel.com) và đăng ký:
- Click **"Add New Project"**
- Import GitHub repository
- Cấu hình:
  - **Root Directory:** `client`
  - **Framework Preset:** `Vite`
  - **Build Command:** `npm run build`
  - **Output Directory:** `dist`
- Environment Variables:
  - `VITE_API_URL`: `https://phone-shop-api.onrender.com/api`
- Click **"Deploy"**
- Lưu lại URL: `https://your-app.vercel.app`

**4. Cập nhật CORS trong Backend**

Mở `server/src/app.js` và cập nhật:
```javascript
const corsOptions = {
  origin: 'https://your-app.vercel.app',
  credentials: true
};
```

**5. Cập nhật API URL trong Frontend**

Mở `client/src/api/axios.js`:
```javascript
const api = axios.create({
  baseURL: 'https://phone-shop-api.onrender.com/api',
  withCredentials: true
});
```

**6. Import dữ liệu vào MongoDB Atlas**

Sử dụng MongoDB Compass hoặc mongoimport:
```bash
mongoimport --uri "mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/phone_shop" --collection products --file products.json --jsonArray
```

---

### Phương án 2: Deploy lên VPS (Server riêng)

**Yêu cầu:**
- VPS Ubuntu 22.04 (có thể thuê tại DigitalOcean, Vultr, AWS EC2)
- Domain name (tùy chọn)

**Bước 1: Setup VPS**

```bash
# SSH vào VPS
ssh root@your-vps-ip

# Cập nhật hệ thống
apt update && apt upgrade -y

# Cài Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Cài MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
apt update
apt install -y mongodb-org
systemctl start mongod
systemctl enable mongod

# Cài Nginx
apt install -y nginx

# Cài PM2 (Process Manager)
npm install -g pm2
```

**Bước 2: Upload code lên VPS**

```bash
# Trên máy local
scp -r mern-phone-shop-starter root@your-vps-ip:/var/www/
```

**Bước 3: Cài đặt và chạy Backend**

```bash
cd /var/www/mern-phone-shop-starter/server
npm install
npm run build  # Nếu có TypeScript
pm2 start src/server.js --name phone-shop-api
pm2 save
pm2 startup
```

**Bước 4: Build và deploy Frontend**

```bash
cd /var/www/mern-phone-shop-starter/client
npm install
npm run build

# Copy build files sang Nginx
cp -r dist/* /var/www/html/
```

**Bước 5: Cấu hình Nginx**

Tạo file `/etc/nginx/sites-available/phone-shop`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /var/www/html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
ln -s /etc/nginx/sites-available/phone-shop /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

**Bước 6: Cài SSL (HTTPS) - Tùy chọn**

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your-domain.com
```

---

### Phương án 3: Deploy nhanh với Railway.app

**1. Đăng ký Railway.app** ([railway.app](https://railway.app))

**2. Deploy Backend:**
- Click "New Project" → "Deploy from GitHub repo"
- Chọn folder `server`
- Railway tự động detect và deploy
- Add Environment Variables (MongoDB URI, JWT_SECRET)
- Lấy URL backend

**3. Deploy Frontend:**
- New Project → Deploy folder `client`
- Add Environment Variable: `VITE_API_URL`
- Deploy

---

### So sánh các phương án:

| Phương án | Chi phí | Độ khó | Tốc độ | Khuyên dùng cho |
|-----------|---------|--------|--------|-----------------|
| **Render + Vercel** | Miễn phí | ⭐⭐ | Trung bình | Demo, dự án nhỏ |
| **VPS** | $5-20/tháng | ⭐⭐⭐⭐ | Nhanh | Production, custom |
| **Railway** | $5/tháng | ⭐ | Nhanh | Prototype, demo |

**Khuyến nghị:** Dùng **Render + Vercel** cho demo team, sau chuyển sang VPS nếu cần performance tốt hơn.

---

## 📞 Hỗ trợ

Nếu gặp vấn đề, vui lòng tạo issue hoặc liên hệ qua email

## 📝 License

MIT License
