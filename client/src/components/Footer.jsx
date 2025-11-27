import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-section">
          <h5>Về chúng tôi</h5>
          <ul>
            <li><a href="#about">Giới thiệu</a></li>
            <li><a href="#careers">Tuyển dụng</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#press">Báo chí</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h5>Hỗ trợ</h5>
          <ul>
            <li><a href="#faq">Câu hỏi thường gặp</a></li>
            <li><a href="#contact">Liên hệ</a></li>
            <li><a href="#shipping">Giao hàng</a></li>
            <li><a href="#returns">Trả hàng</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h5>Chính sách</h5>
          <ul>
            <li><a href="#privacy">Bảo mật</a></li>
            <li><a href="#terms">Điều khoản</a></li>
            <li><a href="#cookies">Cookie</a></li>
            <li><a href="#warranty">Bảo hành</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h5>Kết nối</h5>
          <ul>
            <li><a href="#facebook" target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href="#instagram" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="#twitter" target="_blank" rel="noreferrer">Twitter</a></li>
            <li><a href="#youtube" target="_blank" rel="noreferrer">YouTube</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Phone DZ Shop. Tất cả quyền được bảo lưu.</p>
      </div>
    </footer>
  );
}
