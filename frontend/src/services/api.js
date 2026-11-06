import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
});

// Request interceptor to attach admin JWT token if present
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('softoria_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for centralized error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Only clear token and redirect if we're currently on an admin page
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('softoria_admin_token');
        localStorage.removeItem('softoria_admin_user');
        window.location.href = '/admin/login?sessionExpired=true';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

