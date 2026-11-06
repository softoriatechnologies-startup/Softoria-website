import express from 'express';
import {
  createEnquiry,
  getEnquiries,
  getEnquiryStats,
  updateEnquiryStatus,
  deleteEnquiry
} from '../controllers/enquiryController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { enquirySubmissionLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public: Submit enquiry
router.post('/enquiries', enquirySubmissionLimiter, createEnquiry);

// Protected Admin Enquiries Endpoints
router.get('/admin/enquiries', protectAdmin, getEnquiries);
router.get('/admin/enquiries/stats', protectAdmin, getEnquiryStats);
router.patch('/admin/enquiries/:id/status', protectAdmin, updateEnquiryStatus);
router.delete('/admin/enquiries/:id', protectAdmin, deleteEnquiry);

export default router;

