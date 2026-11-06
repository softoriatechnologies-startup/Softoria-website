/**
 * API Configuration
 */

/**
 * Normalizes the API base URL to guarantee consistency across Netlify & local environments:
 * 1. Strips trailing slashes.
 * 2. Automatically appends '/api' if omitted (prevents 404s).
 * 3. Prevents duplicate '/api/api' paths.
 */
const getNormalizedApiBaseUrl = () => {
  const raw = import.meta.env.VITE_API_BASE_URL || '/api';
  const trimmed = String(raw).trim().replace(/\/+$/, '');

  if (trimmed === '' || trimmed === '/api') {
    return '/api';
  }

  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
};

export const API_BASE_URL = getNormalizedApiBaseUrl();

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

