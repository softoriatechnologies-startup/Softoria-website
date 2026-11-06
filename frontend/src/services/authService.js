import apiClient from './api';

const TOKEN_KEY = 'softoria_admin_token';
const USER_KEY = 'softoria_admin_user';

export const authService = {
  /**
   * Admin Login
   * @param {string} identifier (username or email)
   * @param {string} password 
   */
  async login(identifier, password) {
    const response = await apiClient.post('/auth/login', { identifier, password });
    if (response.data && response.data.token) {
      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.data.admin));
    }
    return response.data;
  },

  /**
   * Verify current token
   */
  async getCurrentAdmin() {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  /**
   * Logout
   */
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  /**
   * Check if user has an auth token stored
   */
  isAuthenticated() {
    return Boolean(localStorage.getItem(TOKEN_KEY));
  },

  /**
   * Get stored user profile
   */
  getStoredUser() {
    try {
      const user = localStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }
};

