import apiClient from './api';

export const enquiryService = {
  /**
   * Submit enquiry from popup, contact form, or CTA
   * @param {Object} data 
   */
  async submitEnquiry(data) {
    const response = await apiClient.post('/enquiries', data);
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

