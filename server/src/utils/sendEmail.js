import nodemailer from 'nodemailer';

// Cấu hình email transporter
const createTransporter = () => {
  // Sử dụng Gmail (hoặc SMTP khác)
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Email của bạn
      pass: process.env.EMAIL_PASSWORD, // App password (không phải mật khẩu Gmail thường)
    },
  });
};

// Gửi email reset password
export async function sendPasswordResetEmail(to, resetUrl, username) {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Phone Shop" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: '🔐 Đặt lại mật khẩu - Phone Shop',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: #f9f9f9;
              border-radius: 10px;
              padding: 30px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              padding-bottom: 20px;
              border-bottom: 2px solid #4CAF50;
            }
            .header h1 {
              color: #4CAF50;
              margin: 0;
              font-size: 28px;
            }
            .content {
              padding: 20px 0;
            }
            .button {
              display: inline-block;
              padding: 15px 30px;
              background: #4CAF50;
              color: white !important;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
              margin: 20px 0;
            }
            .button:hover {
              background: #45a049;
            }
            .footer {
              text-align: center;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              color: #999;
              font-size: 12px;
            }
            .warning {
              background: #fff3cd;
              border-left: 4px solid #ffc107;
              padding: 10px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📱 Phone Shop</h1>
            </div>
            
            <div class="content">
              <h2>Xin chào ${username || 'bạn'},</h2>
              
              <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>
              
              <p>Nhấn vào nút bên dưới để đặt lại mật khẩu:</p>
              
              <center>
                <a href="${resetUrl}" class="button">
                  🔑 Đặt lại mật khẩu
                </a>
              </center>
              
              <p>Hoặc copy link sau vào trình duyệt:</p>
              <p style="word-break: break-all; background: #f5f5f5; padding: 10px; border-radius: 5px;">
                ${resetUrl}
              </p>
              
              <div class="warning">
                <strong>⚠️ Lưu ý quan trọng:</strong>
                <ul>
                  <li>Link này chỉ có hiệu lực trong <strong>30 phút</strong></li>
                  <li>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này</li>
                  <li>Không chia sẻ link này với bất kỳ ai</li>
                </ul>
              </div>
              
              <p>Nếu bạn gặp vấn đề, vui lòng liên hệ với chúng tôi.</p>
              
              <p>
                Trân trọng,<br>
                <strong>Phone Shop Team</strong>
              </p>
            </div>
            
            <div class="footer">
              <p>© 2025 Phone Shop. All rights reserved.</p>
              <p>Email này được gửi tự động, vui lòng không trả lời.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Xin chào ${username || 'bạn'},

Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.

Nhấn vào link sau để đặt lại mật khẩu:
${resetUrl}

⚠️ Lưu ý:
- Link này chỉ có hiệu lực trong 30 phút
- Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này
- Không chia sẻ link này với bất kỳ ai

Trân trọng,
Phone Shop Team
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✓ Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('✗ Error sending email:', error);
    return { success: false, error: error.message };
  }
}

// Test email configuration
export async function testEmailConfig() {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✓ Email configuration is valid');
    return true;
  } catch (error) {
    console.error('✗ Email configuration error:', error.message);
    return false;
  }
}
// Commit