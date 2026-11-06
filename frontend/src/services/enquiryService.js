import apiClient from './api';

// Module-level memoized promise to ensure warmup ping is executed only once per session
let warmupPromise = null;

export const enquiryService = {
  /**
   * Silently ping the backend health check when the application loads.
   * Runs non-blockingly in the background to wake up sleeping instances (e.g., Render free tier)
   * so the backend is warm before the user submits an enquiry.
   */
  warmupBackend() {
    if (warmupPromise) return warmupPromise;

    warmupPromise = apiClient
      .get('/health', { timeout: 30000 })
      .catch((err) => {
        // Silently swallow background warmup network/timeout errors without console disruption
        return null;
      });

    return warmupPromise;
  },

  /**
   * Submit enquiry from popup, contact form, or CTA.
   * Uses an explicit 60-second timeout specifically for enquiry persistence to accommodate cloud cold starts.
   * @param {Object} data 
   */
  async submitEnquiry(data) {
    const response = await apiClient.post('/enquiries', data, {
      timeout: 60000 // Specific 60-second timeout for enquiry submissions
    });
    return response.data;
  },

  /**
   * Admin: Get all enquiries with optional filters
   * @param {Object} params { page, limit, status, service, search }
   */
  async getAdminEnquiries(params = {}) {
    const response = await apiClient.get('/admin/enquiries', { params });
    return response.data;
  },

  /**
   * Admin: Get enquiries status metrics
   */
  async getAdminStats() {
    const response = await apiClient.get('/admin/enquiries/stats');
    return response.data;
  },

  /**
   * Admin: Update status of an enquiry
   * @param {string} id 
   * @param {string} status 
   */
  async updateEnquiryStatus(id, status) {
    const response = await apiClient.patch(`/admin/enquiries/${id}/status`, { status });
    return response.data;
  },

  /**
   * Admin: Delete enquiry by ID
   * @param {string} id 
   */
  async deleteEnquiry(id) {
    const response = await apiClient.delete(`/admin/enquiries/${id}`);
    return response.data;
  }
};

