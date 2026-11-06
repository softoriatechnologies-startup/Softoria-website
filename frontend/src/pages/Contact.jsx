import React from 'react';
import Badge from '../components/common/Badge';
import ContactSection from '../sections/ContactSection';
import { COMPANY_CONFIG } from '../config/companyConfig';

export default function Contact() {
  return (
    <div className="pt-28 pb-16">
      {/* Header */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="gold">Let's Connect</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-softoria-black tracking-tight leading-tight">
            Contact Softoria Technologies
          </h1>
          <p className="text-base sm:text-lg text-softoria-greyDark leading-relaxed max-w-3xl mx-auto">
            Ready to explore custom software, modernize a web platform, or launch a new digital product? Submit your project requirements below.
          </p>
        </div>
      </section>

      {/* Main Interactive Contact Section */}
      <ContactSection />
    </div>
  );
}

