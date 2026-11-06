import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { COMPANY_CONFIG } from '../config/companyConfig';
import { validateEnquiryForm } from '../utils/validation';
import { enquiryService } from '../services/enquiryService';

const generateSubmissionId = () => `softoria_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

const BUDGET_RANGES = [
  'Under 5,000 / Flexible',
  '5,000 - 15,000',
  '15,000 - 30,000',
  '30,000 - 50,000',
  '50,000+ Enterprise',
  'Not Defined Yet'
];

export default function ContactSection({ initialService = '' }) {
  const submissionIdRef = useRef(generateSubmissionId());
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    service: initialService,
    projectBudget: '',
    projectDescription: '',
    website_url_check: '' // Anti-spam honeypot
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slowNotice, setSlowNotice] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (serverError) setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate rapid submissions

    setServerError('');
    setSlowNotice(false);

    const validationErrors = validateEnquiryForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Show reassuring message if server takes longer than 4s (e.g. dormant container waking up)
    const slowTimer = setTimeout(() => {
      setSlowNotice(true);
    }, 4000);

    try {
      await enquiryService.submitEnquiry({
        ...formData,
        clientSubmissionId: submissionIdRef.current,
        source: 'contact_page'
      });

      setSubmitSuccess(true);
      submissionIdRef.current = generateSubmissionId(); // Renew submission token for legitimate next inquiry
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        service: '',
        projectBudget: '',
        projectDescription: '',
        website_url_check: ''
      });
    } catch (err) {
      console.error('Contact submission error:', err);
      let msg = err.response?.data?.message;
      if (!msg) {
        if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
          msg = 'Server connection timed out during startup. Please click submit again to proceed.';
        } else {
          msg = 'Unable to submit enquiry right now. Please verify your connection or try again.';
        }
      }
      setServerError(msg);
    } finally {
      clearTimeout(slowTimer);
      setSlowNotice(false);
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-softoria-bgLight border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <Badge variant="gold">Direct Project Inquiries</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-softoria-black tracking-tight">
            Start Your Software Discovery Consultation
          </h2>
          <p className="text-base sm:text-lg text-softoria-greyDark leading-relaxed">
            Reach out with your project scope or architectural challenges. Our engineers will analyze your requirements and outline a concrete development strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

          {/* Left Column: Direct Company Contact Card (5 cols) */}
          <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-8">
            <div>
              <h3 className="text-xl font-bold text-softoria-black tracking-tight mb-2">
                Get In Touch
              </h3>
              <p className="text-sm text-softoria-greyLight leading-relaxed">
                Connect directly with our solutions team. We respond to all technical inquiries within one business day.
              </p>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-softoria-gold/15 flex items-center justify-center text-softoria-gold shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-softoria-greyLight">
                    Email Inquiries
                  </h4>
                  <a
                    href={`mailto:${COMPANY_CONFIG.contact.email}`}
                    className="text-sm font-semibold text-softoria-black hover:text-softoria-gold transition-colors block mt-0.5 break-all"
                  >
                    {COMPANY_CONFIG.contact.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-softoria-gold/15 flex items-center justify-center text-softoria-gold shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-softoria-greyLight">
                    Direct Phone Numbers
                  </h4>
                  <p className="text-sm font-semibold text-softoria-black mt-0.5 flex items-center gap-1.5 flex-wrap">
                    <a
                      href={`tel:${COMPANY_CONFIG.contact.phone1Tel}`}
                      className="hover:text-softoria-gold transition-colors"
                    >
                      {COMPANY_CONFIG.contact.phone1}
                    </a>
                    <span className="text-gray-400 font-normal">/</span>
                    <a
                      href={`tel:${COMPANY_CONFIG.contact.phone2Tel}`}
                      className="hover:text-softoria-gold transition-colors"
                    >
                      {COMPANY_CONFIG.contact.phone2}
                    </a>
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-softoria-gold/15 flex items-center justify-center text-softoria-gold shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-softoria-greyLight">
                    Location
                  </h4>
                  <p className="text-sm font-semibold text-softoria-black mt-0.5">
                    {COMPANY_CONFIG.contact.location}
                  </p>
                </div>
              </div>

              {/* Office Availability */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-softoria-gold/15 flex items-center justify-center text-softoria-gold shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-softoria-greyLight">
                    Office Availability
                  </h4>
                  <p className="text-sm font-semibold text-softoria-black mt-0.5">
                    {COMPANY_CONFIG.contact.officeAvailability}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-xs text-softoria-greyDark leading-relaxed">
              <span className="font-bold text-softoria-black">Confidentiality Assured:</span> All client project briefs, source code discussions, and proprietary ideas are protected under mutual NDA standards.
            </div>
          </div>

          {/* Right Column: Full Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-gray-100 shadow-sm">
            {submitSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-softoria-gold/15 rounded-full flex items-center justify-center mx-auto text-softoria-gold">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-softoria-black">
                  Enquiry Successfully Submitted
                </h3>
                <p className="text-sm text-softoria-greyLight max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Softoria Technologies. Our senior software architect will review your project requirements and follow up with a technical discovery brief.
                </p>
                <div className="pt-4">
                  <Button
                    variant="primary"
                    onClick={() => {
                      submissionIdRef.current = generateSubmissionId();
                      setSubmitSuccess(false);
                    }}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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

                {serverError && (
                  <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{serverError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="contact-fullName" className="block text-xs font-semibold text-softoria-greyDark mb-1.5">
                      Full Name <span className="text-softoria-gold">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Name"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-softoria-gold transition-colors ${errors.fullName ? 'border-red-500 bg-red-50/30' : 'border-gray-200 focus:border-softoria-gold'
                        }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Business Email */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-softoria-greyDark mb-1.5">
                      Business Email <span className="text-softoria-gold">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-softoria-gold transition-colors ${errors.email ? 'border-red-500 bg-red-50/30' : 'border-gray-200 focus:border-softoria-gold'
                        }`}
                    />
                    {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold text-softoria-greyDark mb-1.5">
                      Mobile / Phone Number <span className="text-softoria-gold">*</span>
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-softoria-gold transition-colors ${errors.phone ? 'border-red-500 bg-red-50/30' : 'border-gray-200 focus:border-softoria-gold'
                        }`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                  </div>

                  {/* Company Name */}
                  <div>
                    <label htmlFor="contact-companyName" className="block text-xs font-semibold text-softoria-greyDark mb-1.5">
                      Company / Organization <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="contact-companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Company Name"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 focus:border-softoria-gold focus:outline-none focus:ring-2 focus:ring-softoria-gold transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Service Selection */}
                  <div>
                    <label htmlFor="contact-service" className="block text-xs font-semibold text-softoria-greyDark mb-1.5">
                      Service Interested In <span className="text-softoria-gold">*</span>
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-softoria-gold transition-colors ${errors.service ? 'border-red-500 bg-red-50/30' : 'border-gray-200 focus:border-softoria-gold'
                        }`}
                    >
                      <option value="">Select a service...</option>
                      {COMPANY_CONFIG.services.map((svc) => (
                        <option key={svc.id} value={svc.title}>
                          {svc.title}
                        </option>
                      ))}
                      <option value="Other">Other / Multiple Services</option>
                    </select>
                    {errors.service && <p className="text-[11px] text-red-600 mt-1">{errors.service}</p>}
                  </div>

                  {/* Project Budget */}
                  <div>
                    <label htmlFor="contact-projectBudget" className="block text-xs font-semibold text-softoria-greyDark mb-1.5">
                      Estimated Budget <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <select
                      id="contact-projectBudget"
                      name="projectBudget"
                      value={formData.projectBudget}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 focus:border-softoria-gold focus:outline-none focus:ring-2 focus:ring-softoria-gold transition-colors"
                    >
                      <option value="">Select budget range...</option>
                      {BUDGET_RANGES.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label htmlFor="contact-projectDescription" className="block text-xs font-semibold text-softoria-greyDark mb-1.5">
                    Project Scope / Description <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="contact-projectDescription"
                    name="projectDescription"
                    rows="4"
                    value={formData.projectDescription}
                    onChange={handleChange}
                    placeholder="Text your msg here..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 focus:border-softoria-gold focus:outline-none focus:ring-2 focus:ring-softoria-gold transition-colors resize-none"
                  />
                  {errors.projectDescription && <p className="text-[11px] text-red-600 mt-1">{errors.projectDescription}</p>}
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    className="w-full justify-center"
                    icon={Send}
                  >
                    Submit Project Inquiry
                  </Button>
                  {isSubmitting && slowNotice && (
                    <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2.5 mt-2.5 text-center">
                      Connecting to secure server... Please allow a few seconds while your enquiry is processed.
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

