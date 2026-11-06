import React from 'react';
import { Target, Users, Zap, Compass, CheckCircle2 } from 'lucide-react';
import Badge from '../components/common/Badge';
import { COMPANY_CONFIG } from '../config/companyConfig';

export default function IntroSection() {
  const pillars = [
    {
      icon: Users,
      title: 'Who We Are',
      description:
        'We are a dedicated software engineering company built on the principles of technical precision, clean architecture, and transparent communication. We partner directly with clients as an extension of their technical vision.',
      accent: 'gold'
    },
    {
      icon: Target,
      title: 'Who We Serve',
      description:
        'From ambitious startups and expanding small-to-medium businesses to established enterprises seeking modernization, we build systems that match current operational demands and scale smoothly for future growth.',
      accent: 'dark'
    },
    {
      icon: Zap,
      title: 'How We Deliver Value',
      description:
        'By focusing on solving real operational bottlenecks rather than writing unnecessary code. Every application, database schema, and interface is engineered to improve workflow speed, data visibility, and profitability.',
      accent: 'gold'
    }
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Left Column: Editorial Company Overview (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <Badge variant="gold">About Softoria Technologies</Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-softoria-black tracking-tight leading-[1.18]">
                Building Digital Solutions That Make a Difference.
              </h2>
            </div>

            <p className="text-base sm:text-lg text-softoria-greyDark leading-relaxed font-normal">
              {COMPANY_CONFIG.description}
            </p>

            {/* Philosophy Highlight Box */}
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-3 relative overflow-hidden">
              <div className="w-1 h-full bg-softoria-gold absolute left-0 top-0 bottom-0" />
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-softoria-gold">
                <Compass className="w-4 h-4" />
                <span>Our Engineering Philosophy</span>
              </div>
              <p className="text-sm text-softoria-greyDark leading-relaxed">
                We believe software should solve genuine business challenges without unnecessary complexity. Every architectural decision is guided by long-term stability, maintainability, and client goals.
              </p>
              <div className="pt-1 flex items-center gap-2 text-xs font-semibold text-softoria-greyLight uppercase tracking-wider">
                <span>{COMPANY_CONFIG.tagline}</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Pillar Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {pillars.map((pillar, idx) => {
              const IconComponent = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-2xl bg-gray-50/70 border border-gray-100 hover:border-softoria-gold/50 hover:bg-white hover:shadow-xs transition-all duration-300 flex flex-col sm:flex-row items-start gap-4 sm:gap-5 group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-200 ${
                      pillar.accent === 'dark'
                        ? 'bg-softoria-black text-softoria-gold group-hover:bg-softoria-gold group-hover:text-softoria-black'
                        : 'bg-softoria-gold/15 text-softoria-gold group-hover:bg-softoria-gold group-hover:text-softoria-black'
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-softoria-black group-hover:text-softoria-black transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-softoria-greyDark leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

