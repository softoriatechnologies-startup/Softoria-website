/**
 * Form Validation Utilities
 */

export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email.trim());
};

export const validatePhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  // Allows optional +, numbers, spaces, hyphens, parentheses, minimum 7 digits
  const cleaned = phone.replace(/[^0-9]/g, '');
  return cleaned.length >= 7 && cleaned.length <= 15;
};

export const validateEnquiryForm = (formData) => {
  const errors = {};

  // Check honeypot first
  if (formData.website_url_check && formData.website_url_check.trim() !== '') {
    errors.bot = 'Automated submission detected.';
    return errors;
  }

  // Full Name
  if (!formData.fullName || formData.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (minimum 2 characters).';
  } else if (formData.fullName.trim().length > 100) {
    errors.fullName = 'Full name must be less than 100 characters.';
  }

  // Email
  if (!formData.email || !validateEmail(formData.email)) {
    errors.email = 'Please provide a valid business email address.';
  }

  // Phone
  if (!formData.phone || !validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone or mobile number (minimum 7 digits).';
  }

  // Service
  if (!formData.service || formData.service.trim() === '') {
    errors.service = 'Please select a service you are interested in.';
  }

  // Project Description
  if (formData.projectDescription && formData.projectDescription.length > 2500) {
    errors.projectDescription = 'Project description must be under 2,500 characters.';
  }

  return errors;
};

