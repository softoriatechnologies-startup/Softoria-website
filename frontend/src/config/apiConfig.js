/**
 * API Configuration
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const API_ENDPOINTS = {
  // Public
  SUBMIT_ENQUIRY: `${API_BASE_URL}/enquiries`,
  
  // Admin Auth
  ADMIN_LOGIN: `${API_BASE_URL}/auth/login`,
  ADMIN_ME: `${API_BASE_URL}/auth/me`,
  
  // Admin Enquiries Management
  ADMIN_ENQUIRIES: `${API_BASE_URL}/admin/enquiries`,
  ADMIN_STATS: `${API_BASE_URL}/admin/enquiries/stats`,
  ADMIN_ENQUIRY_STATUS: (id) => `${API_BASE_URL}/admin/enquiries/${id}/status`,
  ADMIN_ENQUIRY_DELETE: (id) => `${API_BASE_URL}/admin/enquiries/${id}`,
};

