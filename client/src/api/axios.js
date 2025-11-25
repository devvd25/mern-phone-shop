import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // hoặc chỉ '/api' nếu bạn có proxy
  withCredentials: true,
});

export default api;
