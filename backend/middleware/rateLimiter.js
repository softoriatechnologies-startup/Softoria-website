import rateLimit from 'express-rate-limit';

// Rate limiter for public customer enquiry submissions (prevents automated bot flooding)
export const enquirySubmissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 submissions per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many enquiry submissions received from this network. Please wait a few minutes before submitting again.'
  }
});

// Strict rate limiter for admin login attempts (prevents brute-force)
export const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 8, // Limit each IP to 8 login attempts per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many administrative login attempts. Please wait 15 minutes before trying again.'
  }
});

// General API protection
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false
});

