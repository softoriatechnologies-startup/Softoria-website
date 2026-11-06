import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { COMPANY_CONFIG } from '../config/companyConfig';

export default function CtaBannerSection({ onStartProject }) {
  return (
    <section className="py-20 sm:py-24 bg-softoria-black text-white relative overflow-hidden border-t border-softoria-greyMedium/40">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-softoria-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2">
          <Badge variant="gold">Let's Collaborate</Badge>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Have a Project in Mind? Let's Build It Together.
        </h2>

        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Tell us about your business requirements and software goals. Our team will help you evaluate options, plan architecture, and build a reliable digital solution.
        </p>

        {/* Dual Actions: Primary Discovery Modal + Direct Phone Consultation */}
        <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={onStartProject}
            icon={ArrowRight}
            iconPosition="right"
            className="shadow-gold-sm hover:shadow-gold-md"
          >
            Discuss Your Project
          </Button>

          <a
            href={`tel:${COMPANY_CONFIG.contact.phone1Tel}`}
            className="inline-flex items-center justify-center font-semibold text-base px-7 py-3.5 gap-2.5 rounded-md border border-softoria-gold/80 text-white bg-transparent hover:bg-softoria-gold hover:text-softoria-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-softoria-gold select-none"
          >
            <Phone className="w-4 h-4 text-softoria-gold shrink-0" />
            <span>Call Us: {COMPANY_CONFIG.contact.phone1}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

