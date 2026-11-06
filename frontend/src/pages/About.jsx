import React from 'react';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import WhyChooseUsSection from '../sections/WhyChooseUsSection';
import CtaBannerSection from '../sections/CtaBannerSection';
import { COMPANY_CONFIG } from '../config/companyConfig';
import { Target, Compass, Award, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

export default function About({ onOpenPopup }) {
  return (
    <div className="pt-28 pb-16">
      {/* Page Header */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="gold">About Our Company</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-softoria-black tracking-tight leading-tight">
            Building Digital Solutions That Make a Difference
          </h1>
          <p className="text-base sm:text-lg text-softoria-greyDark leading-relaxed max-w-3xl mx-auto">
            {COMPANY_CONFIG.description}
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            
            <div className="p-8 sm:p-10 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-softoria-gold/15 flex items-center justify-center text-softoria-gold">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-softoria-black">Our Mission</h3>
                <p className="text-sm sm:text-base text-softoria-greyDark leading-relaxed">
                  To deliver resilient, customized software architectures that eliminate operational friction, empower teams to make informed decisions, and create durable competitive advantages for businesses of all scales.
                </p>
              </div>
            </div>

            <div className="p-8 sm:p-10 rounded-2xl bg-softoria-black text-white border border-softoria-greyMedium flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-softoria-gold text-softoria-black flex items-center justify-center">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Our Vision</h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  To become the trusted software development partner known for uncompromised code quality, honest engineering guidance, and dependable post-deployment technical partnership.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUsSection />

      {/* CTA */}
      <CtaBannerSection onStartProject={onOpenPopup} />
    </div>
  );
}

