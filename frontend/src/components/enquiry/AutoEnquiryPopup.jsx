import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Sparkles, Send } from 'lucide-react';
import { validateEnquiryForm } from '../../utils/validation';
import { enquiryService } from '../../services/enquiryService';
import { COMPANY_CONFIG } from '../../config/companyConfig';
import Button from '../common/Button';

export default function AutoEnquiryPopup({ isOpen, onClose, onSubmitted, initialService = '' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    service: initialService || '',
    projectDescription: '',
    website_url_check: '' // Anti-spam honeypot
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  // Synchronize initialService when changed or passed via manual trigger
  useEffect(() => {
    setFormData((prev) => ({ ...prev, service: initialService || '' }));
  }, [initialService]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Prevent background body scrolling while modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow || 'unset';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (serverError) setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const validationErrors = validateEnquiryForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await enquiryService.submitEnquiry({
        ...formData,
        source: 'popup'
      });

      setSubmitSuccess(true);
      if (onSubmitted) onSubmitted();
    } catch (err) {
      console.error('Enquiry submission error:', err);
      const msg = err.response?.data?.message || 'Unable to submit enquiry right now. Please verify your connection or try again.';
      setServerError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3.5 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
      onClick={(e) => {
        // Close if clicking directly on the outer viewport padding
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Dimmed backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Popup Container Card */}
      <div
        className="relative w-full max-w-xl max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-10 my-auto transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-softoria-black via-softoria-gold to-softoria-black shrink-0" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-softoria-black hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-softoria-gold cursor-pointer z-20"
          aria-label="Close enquiry popup"
        >
          <X className="w-5 h-5" />
        </button>

        {submitSuccess ? (
          /* Success Confirmation State */
          <div className="p-8 sm:p-10 text-center space-y-4 overflow-y-auto">
            <div className="w-16 h-16 bg-softoria-gold/15 rounded-full flex items-center justify-center mx-auto text-softoria-gold">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-softoria-black tracking-tight">
              Thank You! We Have Received Your Enquiry.
            </h3>
            <p className="text-sm text-softoria-greyLight max-w-md mx-auto leading-relaxed">
              Our software engineering team is reviewing your project details. We will contact you promptly at <span className="font-semibold text-softoria-black">{formData.email}</span> with a discovery consultation.
            </p>
            <div className="pt-4">
              <Button variant="primary" onClick={onClose} className="w-full sm:w-auto px-8">
                Done
              </Button>
            </div>
          </div>
        ) : (
          /* Form Content */
          <div className="p-6 sm:p-8 overflow-y-auto">
            <div className="mb-5 pr-8">
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-4 h-4 text-softoria-gold" />
                <span className="text-xs font-bold uppercase tracking-wider text-softoria-gold">
                  Direct Consultation
                </span>
              </div>
              <h3 id="popup-title" className="text-2xl font-bold text-softoria-black tracking-tight">
                Let's Discuss Your Project.
              </h3>
              <p className="text-xs sm:text-sm text-softoria-greyLight mt-1">
                Looking for a reliable software development partner? Tell us a little about your requirements.
              </p>
            </div>

            {serverError && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="website_url_check"
                value={formData.website_url_check}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex="-1"
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Full Name */}
                <div>
                  <label htmlFor="popup-fullName" className="block text-xs font-semibold text-softoria-greyDark mb-1">
                    Full Name <span className="text-softoria-gold">*</span>
                  </label>
                  <input
                    type="text"
                    id="popup-fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className={`w-full px-3 py-2 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-softoria-gold transition-colors ${
                      errors.fullName ? 'border-red-500 bg-red-50/30' : 'border-gray-200 focus:border-softoria-gold'
                    }`}
                  />
                  {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="popup-email" className="block text-xs font-semibold text-softoria-greyDark mb-1">
                    Email Address <span className="text-softoria-gold">*</span>
                  </label>
                  <input
                    type="email"
                    id="popup-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className={`w-full px-3 py-2 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-softoria-gold transition-colors ${
                      errors.email ? 'border-red-500 bg-red-50/30' : 'border-gray-200 focus:border-softoria-gold'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Mobile Number */}
                <div>
                  <label htmlFor="popup-phone" className="block text-xs font-semibold text-softoria-greyDark mb-1">
                    Mobile Number <span className="text-softoria-gold">*</span>
                  </label>
                  <input
                    type="tel"
                    id="popup-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`w-full px-3 py-2 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-softoria-gold transition-colors ${
                      errors.phone ? 'border-red-500 bg-red-50/30' : 'border-gray-200 focus:border-softoria-gold'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                </div>

                {/* Company Name */}
                <div>
                  <label htmlFor="popup-companyName" className="block text-xs font-semibold text-softoria-greyDark mb-1">
                    Company Name <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="popup-companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Your Business Name"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-softoria-gold focus:outline-none focus:ring-2 focus:ring-softoria-gold transition-colors"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label htmlFor="popup-service" className="block text-xs font-semibold text-softoria-greyDark mb-1">
                  Service Interested In <span className="text-softoria-gold">*</span>
                </label>
                <select
                  id="popup-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-softoria-gold transition-colors ${
                    errors.service ? 'border-red-500 bg-red-50/30' : 'border-gray-200 focus:border-softoria-gold'
                  }`}
                >
                  <option value="">Select a core service...</option>
                  {COMPANY_CONFIG.services.map((svc) => (
                    <option key={svc.id} value={svc.title}>
                      {svc.title}
                    </option>
                  ))}
                  <option value="Other">Other / Multiple Services</option>
                </select>
                {errors.service && <p className="text-[11px] text-red-600 mt-1">{errors.service}</p>}
              </div>

              {/* Project Description */}
              <div>
                <label htmlFor="popup-projectDescription" className="block text-xs font-semibold text-softoria-greyDark mb-1">
                  Project Description <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  id="popup-projectDescription"
                  name="projectDescription"
                  rows="2"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  placeholder="Tell us briefly about your goals, features, or timeline..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-softoria-gold focus:outline-none focus:ring-2 focus:ring-softoria-gold transition-colors resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSubmitting}
                  className="w-full justify-center shadow-gold-sm"
                  icon={Send}
                >
                  Submit Project Enquiry
                </Button>
                <p className="text-[11px] text-center text-gray-400 mt-2">
                  🔒 We respect your privacy. No spam. Direct technical reply.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
