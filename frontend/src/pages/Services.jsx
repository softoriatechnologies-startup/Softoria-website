import React from 'react';
import Badge from '../components/common/Badge';
import ServicesSection from '../sections/ServicesSection';
import ProcessSection from '../sections/ProcessSection';
import CtaBannerSection from '../sections/CtaBannerSection';
import { COMPANY_CONFIG } from '../config/companyConfig';

export default function Services({ onOpenPopup }) {
  return (
    <div className="pt-28 pb-16">
      {/* Header */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="gold">What We Do</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-softoria-black tracking-tight leading-tight">
            Comprehensive Software Engineering Services
          </h1>
          <p className="text-base sm:text-lg text-softoria-greyDark leading-relaxed max-w-3xl mx-auto">
            Explore our specialized development domains, from bespoke enterprise software systems to modern cloud applications and API ecosystems.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <ServicesSection onSelectService={onOpenPopup} />

      {/* Development Lifecycle */}
      <ProcessSection />

      {/* CTA */}
      <CtaBannerSection onStartProject={onOpenPopup} />
    </div>
  );
}

