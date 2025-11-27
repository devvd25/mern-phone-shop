# Hướng dẫn cấu hình Dialogflow Messenger cho Phone Shop

## Bước 1: Tạo Dialogflow Agent

1. Truy cập https://dialogflow.cloud.google.com/
2. Đăng nhập bằng tài khoản Google
3. Click **Create Agent**
4. Điền thông tin:
   - **Agent name**: Phone Shop AI
   - **Default language**: Vietnamese - vi
   - **Default time zone**: (GMT+7:00) Asia/Ho_Chi_Minh
5. Click **Create**

## Bước 2: Tạo các Intent (Ý định)

### Intent 1: Chào hỏi (Welcome)
- **Training phrases**:
  - "Xin chào"
  - "Hello"
  - "Chào bạn"
  - "Hi"
  
- **Responses**:
  - "Xin chào! Tôi là trợ lý Phone Shop. Tôi có thể giúp gì cho bạn?"
  - "Chào bạn! Bạn cần tìm điện thoại hay có câu hỏi gì không?"

### Intent 2: Tìm sản phẩm theo thương hiệu
- **Training phrases**:
  - "Tôi muốn mua iPhone"
  - "Có điện thoại Samsung không?"
  - "Cho xem máy Xiaomi"
  - "Điện thoại Apple giá bao nhiêu?"
  
- **Parameters**:
  - Parameter name: brand
  - Entity: @sys.any
  
- **Responses**:
  - "Chúng tôi có nhiều sản phẩm $brand. Bạn có thể xem tại trang chủ và lọc theo thương hiệu $brand nhé!"

### Intent 3: Hỏi về giá
- **Training phrases**:
  - "Giá bao nhiêu?"
  - "Bao nhiêu tiền?"
  - "Chi phí ra sao?"
  - "Giá cả thế nào?"
  
- **Responses**:
  - "Giá của chúng tôi rất cạnh tranh, từ 1.9 triệu đến 35 triệu đồng tuỳ theo model. Bạn có thể xem chi tiết trên website!"

### Intent 4: Hỏi về vận chuyển
- **Training phrases**:
  - "Giao hàng mất bao lâu?"
  - "Phí ship bao nhiêu?"
  - "Có ship COD không?"
  - "Vận chuyển như thế nào?"
  
- **Responses**:
  - "Chúng tôi giao hàng toàn quốc trong 2-3 ngày. Phí ship 30.000đ hoặc MIỄN PHÍ với đơn trên 5 triệu. Có hỗ trợ thanh toán COD!"

### Intent 5: Hỏi về bảo hành
- **Training phrases**:
  - "Bảo hành bao lâu?"
  - "Chế độ bảo hành thế nào?"
  - "Có bảo hành chính hãng không?"
  
- **Responses**:
  - "Tất cả sản phẩm đều có bảo hành chính hãng 12 tháng. Đổi trả trong 7 ngày nếu có lỗi từ nhà sản xuất!"

### Intent 6: So sánh sản phẩm
- **Training phrases**:
  - "So sánh iPhone và Samsung"
  - "iPhone tốt hơn hay Samsung?"
  - "Nên mua loại nào?"
  
- **Responses**:
  - "iPhone (iOS) nổi bật về hệ sinh thái, bảo mật cao, camera đẹp. Samsung (Android) đa dạng giá, màn hình AMOLED đẹp, sạc nhanh. Tuỳ nhu cầu và ngân sách bạn nhé!"

### Intent 7: Thanh toán
- **Training phrases**:
  - "Thanh toán như thế nào?"
  - "Có thể trả góp không?"
  - "Hình thức thanh toán?"
  
- **Responses**:
  - "Chúng tôi hỗ trợ: COD (thanh toán khi nhận hàng), chuyển khoản, thẻ tín dụng. Có hỗ trợ trả góp 0% cho đơn từ 3 triệu!"

## Bước 3: Lấy thông tin Agent

1. Trong Dialogflow console, click vào **Settings** (biểu tượng bánh răng)
2. Lấy thông tin:
   - **Project ID**: Ví dụ "phone-shop-ai-xxxx"
   - **Agent ID**: Trong phần "General" tab

## Bước 4: Cập nhật code

Mở file `client/index.html` và thay thế:

```html
<df-messenger
  project-id="THAY_PROJECT_ID_CUA_BAN"
  agent-id="THAY_AGENT_ID_CUA_BAN"
  language-code="vi"
  max-query-length="-1">
```

## Bước 5: Tích hợp Dialogflow Messenger

Widget chatbot sẽ tự động xuất hiện ở góc dưới bên phải màn hình.

### Tuỳ chỉnh giao diện (trong index.html):

```css
df-messenger {
  --df-messenger-button-titlebar-color: #1976d2; /* Màu header */
  --df-messenger-button-titlebar-font-color: #fff; /* Màu chữ header */
  --df-messenger-chat-background: #f3f6fc; /* Màu nền chat */
  --df-messenger-message-user-background: #d3e3fd; /* Màu tin nhắn user */
  --df-messenger-message-bot-background: #fff; /* Màu tin nhắn bot */
}
```

## Bước 6: Test chatbot

1. Reload website
2. Click vào icon chatbot góc dưới phải
3. Thử hỏi:
   - "Xin chào"
   - "Tôi muốn mua iPhone"
   - "Giá bao nhiêu?"
   - "Giao hàng mất bao lâu?"

## Nâng cao

### Webhook để kết nối database:
1. Tạo endpoint `/api/chatbot/webhook` trong server
2. Cấu hình Fulfillment trong Dialogflow
3. Trả về dữ liệu động từ database

### Rich Messages:
- Thêm hình ảnh sản phẩm
- Thêm button "Xem sản phẩm"
- Thêm card sản phẩm

## Lưu ý

- Dialogflow ES: Miễn phí, giới hạn 180 requests/phút
- Dialogflow CX: Mạnh hơn nhưng có phí
- Cần bật Billing trong Google Cloud nếu muốn dùng tính năng nâng cao

## Tài liệu tham khảo

- Dialogflow Docs: https://cloud.google.com/dialogflow/docs
- Messenger Integration: https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger
