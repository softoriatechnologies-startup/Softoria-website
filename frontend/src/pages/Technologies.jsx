import React from 'react';
import Badge from '../components/common/Badge';
import TechnologiesSection from '../sections/TechnologiesSection';
import CtaBannerSection from '../sections/CtaBannerSection';
import { ShieldCheck, Zap, Layers, RefreshCw } from 'lucide-react';

export default function Technologies({ onOpenPopup }) {
  return (
    <div className="pt-28 pb-16">
      {/* Header */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="gold">Engineering Stack</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-softoria-black tracking-tight leading-tight">
            Our Technology Foundation
          </h1>
          <p className="text-base sm:text-lg text-softoria-greyDark leading-relaxed max-w-3xl mx-auto">
            We intentionally select stable, battle-tested modern frameworks that ensure performance, longevity, and seamless maintenance.
          </p>
        </div>
      </section>

      {/* Main Tech Section */}
      <TechnologiesSection />

      {/* Tech Standards */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h3 className="text-2xl font-bold text-softoria-black">Our Technology Selection Criteria</h3>
            <p className="text-sm text-softoria-greyDark">How we ensure the longevity and maintainability of client codebases.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-gray-50 border border-gray-100 text-left space-y-3">
              <Zap className="w-6 h-6 text-softoria-gold" />
              <h4 className="font-bold text-softoria-black text-base">Performance First</h4>
              <p className="text-xs text-softoria-greyDark leading-relaxed">Fast initial page loads, snappy reactivity, and lean server payloads optimized for real network conditions.</p>
            </div>

            <div className="p-6 rounded-xl bg-gray-50 border border-gray-100 text-left space-y-3">
              <ShieldCheck className="w-6 h-6 text-softoria-gold" />
              <h4 className="font-bold text-softoria-black text-base">Defensive Security</h4>
              <p className="text-xs text-softoria-greyDark leading-relaxed">Parameterized database queries, strict schema validation, sanitized inputs, and cryptographic password hashing.</p>
            </div>

            <div className="p-6 rounded-xl bg-gray-50 border border-gray-100 text-left space-y-3">
              <Layers className="w-6 h-6 text-softoria-gold" />
              <h4 className="font-bold text-softoria-black text-base">Modular Architecture</h4>
              <p className="text-xs text-softoria-greyDark leading-relaxed">Clean separation between controllers, services, database models, and presentation layers for easy refactoring.</p>
            </div>

            <div className="p-6 rounded-xl bg-gray-50 border border-gray-100 text-left space-y-3">
              <RefreshCw className="w-6 h-6 text-softoria-gold" />
              <h4 className="font-bold text-softoria-black text-base">Scalability & Cloud</h4>
              <p className="text-xs text-softoria-greyDark leading-relaxed">Stateless API design and MongoDB Atlas cloud clustering ready to handle scaling traffic loads effortlessly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBannerSection onStartProject={onOpenPopup} />
    </div>
  );
}

