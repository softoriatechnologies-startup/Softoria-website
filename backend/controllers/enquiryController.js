import mongoose from 'mongoose';
import { Enquiry } from '../models/Enquiry.js';

/**
 * Escapes characters with special meaning in regular expressions
 * Prevents ReDoS and syntax errors from untrusted search inputs
 */
const escapeRegex = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const createEnquiry = async (req, res) => {
  const startTime = Date.now();

  try {
    // Fast database readiness check to prevent hanging if connection drops
    if (mongoose.connection.readyState !== 1) {
      console.warn('⚠️ [Enquiry Controller] Database not connected. Current readyState:', mongoose.connection.readyState);
      return res.status(503).json({
        success: false,
        message: 'Database service is temporarily unavailable. Please try again in a few moments.'
      });
    }

    const {
      fullName,
      email,
      phone,
      companyName,
      service,
      projectBudget,
      projectDescription,
      source,
      clientSubmissionId,
      website_url_check // Honeypot field
    } = req.body;

    // Honeypot check: Bots fill hidden fields
    if (website_url_check && website_url_check.trim() !== '') {
      console.warn('⚠️ [Enquiry Controller] Honeypot field triggered from IP:', req.ip);
      return res.status(400).json({
        success: false,
        message: 'Suspicious submission activity detected.'
      });
    }

    // Required fields check
    if (!fullName || !email || !phone || !service) {
      return res.status(400).json({
        success: false,
        message: 'Full Name, Email, Phone, and Service selection are required.'
      });
    }

    // Idempotency check: if clientSubmissionId was provided, check if already recorded
    if (clientSubmissionId && typeof clientSubmissionId === 'string' && clientSubmissionId.trim()) {
      const sanitizedSubmissionId = clientSubmissionId.trim().slice(0, 64);
      const existingEnquiry = await Enquiry.findOne({ clientSubmissionId: sanitizedSubmissionId });
      if (existingEnquiry) {
        console.log(`ℹ️ [Enquiry Controller] Idempotent duplicate replayed for submission ID: ${sanitizedSubmissionId} (${Date.now() - startTime}ms)`);
        return res.status(200).json({
          success: true,
          message: 'Enquiry successfully registered with Softoria Technologies.',
          enquiryId: existingEnquiry._id,
          idempotent: true
        });
      }
    }

    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const newEnquiry = await Enquiry.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      companyName: companyName ? companyName.trim() : '',
      service,
      projectBudget: projectBudget ? projectBudget.trim() : '',
      projectDescription: projectDescription ? projectDescription.trim() : '',
      source: source || 'contact_page',
      clientSubmissionId: clientSubmissionId && typeof clientSubmissionId === 'string' ? clientSubmissionId.trim().slice(0, 64) : undefined,
      ipAddress
    });

    console.log(`✅ [Enquiry Controller] Enquiry persisted [ID: ${newEnquiry._id}] for service "${service}" (${Date.now() - startTime}ms)`);

    return res.status(201).json({
      success: true,
      message: 'Enquiry successfully registered with Softoria Technologies.',
      enquiryId: newEnquiry._id
    });
  } catch (error) {
    console.error(`❌ [Enquiry Controller] Error processing enquiry (${Date.now() - startTime}ms):`, error.message);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join('. ')
      });
    }

    return res.status(500).json({
      success: false,
      message: 'A technical error occurred while processing your enquiry. Please try again.'
    });
  }
};

export const getEnquiries = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, service, search } = req.query;

    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (service && service !== 'all') {
      query.service = service;
    }

    if (search && typeof search === 'string' && search.trim() !== '') {
      const safeTerm = escapeRegex(search.trim().slice(0, 100));
      query.$or = [
        { fullName: { $regex: safeTerm, $options: 'i' } },
        { email: { $regex: safeTerm, $options: 'i' } },
        { phone: { $regex: safeTerm, $options: 'i' } },
        { companyName: { $regex: safeTerm, $options: 'i' } }
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const [enquiries, totalCount] = await Promise.all([
      Enquiry.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Enquiry.countDocuments(query)
    ]);

    return res.json({
      success: true,
      enquiries,
      pagination: {
        total: totalCount,
        page: pageNum,
        pages: Math.ceil(totalCount / limitNum),
        limit: limitNum
      }
    });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve enquiries.'
    });
  }
};

export const getEnquiryStats = async (req, res) => {
  try {
    const [total, newCount, contactedCount, inProgressCount, completedCount] = await Promise.all([
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: 'new' }),
      Enquiry.countDocuments({ status: 'contacted' }),
      Enquiry.countDocuments({ status: 'in-progress' }),
      Enquiry.countDocuments({ status: 'completed' })
    ]);

    return res.json({
      success: true,
      stats: {
        total,
        new: newCount,
        contacted: contactedCount,
        inProgress: inProgressCount,
        completed: completedCount
      }
    });
  } catch (error) {
    console.error('Error calculating enquiry stats:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve enquiry statistics.'
    });
  }
};

export const updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid enquiry identifier format.'
      });
    }

    const { status } = req.body;

    const validStatuses = ['new', 'contacted', 'in-progress', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value provided.'
      });
    }

    const updated = await Enquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.'
      });
    }

    return res.json({
      success: true,
      message: 'Enquiry status updated successfully.',
      enquiry: updated
    });
  } catch (error) {
    console.error('Error updating enquiry status:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update enquiry status.'
    });
  }
};

export const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid enquiry identifier format.'
      });
    }

    const deleted = await Enquiry.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.'
      });
    }

    return res.json({
      success: true,
      message: 'Enquiry successfully deleted.'
    });
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete enquiry.'
    });
  }
};

