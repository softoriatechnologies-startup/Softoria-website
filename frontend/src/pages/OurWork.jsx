import React from 'react';
import Badge from '../components/common/Badge';
import ProjectsSection from '../sections/ProjectsSection';
import CtaBannerSection from '../sections/CtaBannerSection';

export default function OurWork({ onOpenPopup }) {
  return (
    <div className="pt-28 pb-16">
      {/* Header */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="gold">Case Studies</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-softoria-black tracking-tight leading-tight">
            Our Portfolio & Engineered Systems
          </h1>
          <p className="text-base sm:text-lg text-softoria-greyDark leading-relaxed max-w-3xl mx-auto">
            Discover real platforms designed, developed, and deployed by Softoria Technologies across diverse operational domains.
          </p>
        </div>
      </section>

      {/* Projects Grid with Interactive Details Modal */}
      <ProjectsSection onStartProject={onOpenPopup} />

      {/* CTA */}
      <CtaBannerSection onStartProject={onOpenPopup} />
    </div>
  );
}

