import React from 'react';
import { ArrowRight, CheckCircle2, Code2 } from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { COMPANY_CONFIG } from '../config/companyConfig';

export default function HeroSection({ onStartProject, onExploreServices }) {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-white">
      {/* Subtle geometric dot background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#0B0B0B 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Subtle gold ambient glow */}
      <div className="absolute top-1/4 right-1/10 w-80 h-80 bg-softoria-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Brand Eyebrow Tag */}
            <div className="inline-flex items-center gap-2">
              <Badge variant="gold">
                Corporate Software Engineering
              </Badge>
              <span className="text-xs font-semibold tracking-wider text-softoria-greyLight uppercase">
                {COMPANY_CONFIG.tagline}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-softoria-black tracking-tight leading-[1.14]">
              Engineering Digital Solutions That Help{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Businesses Grow.</span>
                <span className="absolute bottom-1.5 left-0 right-0 h-3 bg-softoria-gold/30 -z-0 rounded" />
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-softoria-greyDark leading-relaxed max-w-2xl font-normal">
              At Softoria Technologies, we design and build bespoke software systems and modern web applications that streamline business workflows, improve operational clarity, and support sustainable digital growth.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={onStartProject}
                icon={ArrowRight}
                iconPosition="right"
                className="shadow-gold-sm hover:shadow-gold-md"
              >
                Start a Project
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={onExploreServices}
              >
                Explore Our Services
              </Button>
            </div>

            {/* Verifiable Trust Information Strip */}
            <div className="pt-6 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold text-softoria-greyDark">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-softoria-gold shrink-0" />
                <span>Custom-Built Solutions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-softoria-gold shrink-0" />
                <span>Modern Tech Stack</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-softoria-gold shrink-0" />
                <span>Responsive Development</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-softoria-gold shrink-0" />
                <span>Business-Focused</span>
              </div>
            </div>
          </div>

          {/* Right Column: Enterprise Software Dashboard Visual (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Premium image container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-softoria-greyMedium/60 bg-softoria-dark group">
                <img
                  src="/assets/hero/enterprise-software-dashboard.jpg"
                  alt="Softoria Technologies Enterprise Software Application Dashboard"
                  className="w-full h-auto aspect-[16/10] object-cover rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="eager"
                />

                {/* Subtle soft gradient overlay on bottom to anchor with brand */}
                <div className="absolute inset-0 bg-gradient-to-t from-softoria-black/30 via-transparent to-transparent pointer-events-none rounded-2xl" />
              </div>

              {/* Floating accent badge */}
              <div className="absolute -bottom-4 -left-4 bg-white p-3.5 rounded-xl shadow-xl border border-gray-100 hidden sm:flex items-center gap-3 z-10">
                <div className="w-9 h-9 rounded-lg bg-softoria-gold/15 flex items-center justify-center text-softoria-gold font-bold">
                  <Code2 className="w-5 h-5 text-softoria-gold" />
                </div>
                <div>
                  <div className="text-xs font-bold text-softoria-black">Enterprise Solutions</div>
                  <div className="text-[10px] text-softoria-greyLight">Tailored Architecture</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
