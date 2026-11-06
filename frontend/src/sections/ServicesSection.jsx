import React from 'react';
import { 
  Code2, 
  Globe, 
  LayoutGrid, 
  ShoppingBag, 
  Layers, 
  Briefcase, 
  Network, 
  BarChart3, 
  ShieldCheck,
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/companyConfig';
import Badge from '../components/common/Badge';

const ICON_MAP = {
  Code2,
  Globe,
  LayoutGrid,
  ShoppingBag,
  Layers,
  Briefcase,
  Network,
  BarChart3,
  ShieldCheck
};

export default function ServicesSection({ onSelectService }) {
  const services = COMPANY_CONFIG.services;
  const totalServices = services.length;

  return (
    <section id="services" className="py-20 sm:py-28 bg-softoria-bgLight border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14 sm:mb-20">
          <Badge variant="gold">Comprehensive Capabilities</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-softoria-black tracking-tight">
            Tailored Engineering & Digital Services
          </h2>
          <p className="text-base sm:text-lg text-softoria-greyDark leading-relaxed font-normal">
            From specialized custom software to full-scale SaaS platforms, explore our complete suite of software engineering services built for performance, security, and long-term business scalability.
          </p>
        </div>

        {/* Vertically Stacked & Layered Sticky Overlapping Panels */}
        <div className="relative max-w-6xl mx-auto [--sticky-base:4.5rem] [--sticky-offset:4px] sm:[--sticky-base:4.75rem] sm:[--sticky-offset:6px] lg:[--sticky-base:5.25rem] lg:[--sticky-offset:8px]">
          {services.map((service, index) => {
            const formattedIndex = (index + 1).toString().padStart(2, '0');
            const formattedTotal = totalServices.toString().padStart(2, '0');
            const IconComponent = ICON_MAP[service.iconName] || Code2;

            return (
              <div
                key={service.id}
                id={`service-${service.id}`}
                className="sticky w-full rounded-2xl sm:rounded-3xl bg-white border border-gray-200/90 shadow-[0_-8px_30px_rgba(0,0,0,0.06),0_16px_36px_rgba(0,0,0,0.08)] hover:border-softoria-gold/60 hover:shadow-gold-md p-4 sm:p-6 lg:p-8 mb-12 sm:mb-20 lg:mb-28 last:mb-0 flex flex-col justify-between group transition-shadow duration-300"
                style={{
                  top: `calc(var(--sticky-base) + ${index} * var(--sticky-offset))`,
                  zIndex: 10 + index
                }}
              >
                {/* Top Bar with Icon, Category & Monospace Number */}
                <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-100 mb-3 sm:mb-5">
                  <div className="flex items-center gap-2.5 sm:gap-3.5">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-softoria-black text-softoria-gold flex items-center justify-center shadow-2xs group-hover:bg-softoria-gold group-hover:text-softoria-black transition-colors duration-200">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-softoria-gold block">
                        Service {formattedIndex}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-softoria-black">
                        {service.title}
                      </span>
                    </div>
                  </div>

                  {/* Prominent Gold Monospace Number */}
                  <div className="font-mono text-xl sm:text-2xl lg:text-3xl font-extrabold text-softoria-gold tracking-tight">
                    {formattedIndex}
                  </div>
                </div>

                {/* Two-Column Panel Layout on Desktop / Balanced Responsive on Mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center mb-4 sm:mb-5">
                  
                  {/* Left Column: Description, Features & Primary CTA (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-3 sm:space-y-4">
                    <div className="space-y-1.5 sm:space-y-2">
                      <h3 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-softoria-black tracking-tight group-hover:text-softoria-goldDark transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm lg:text-base text-softoria-greyDark leading-relaxed font-normal">
                        {service.shortDescription}
                      </p>
                      {service.fullDescription && (
                        <p className="text-xs sm:text-sm text-softoria-greyLight leading-relaxed hidden sm:block">
                          {service.fullDescription}
                        </p>
                      )}
                    </div>

                    {/* Feature Checkpoints with Arrow Links */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 pt-0.5">
                      {service.features.map((feat, fIdx) => (
                        <div 
                          key={fIdx} 
                          className="flex items-center justify-between p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-gray-50/80 border border-gray-100 text-[11px] sm:text-xs font-semibold text-softoria-black hover:border-softoria-gold/50 transition-colors"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="w-1.5 h-1.5 rounded-full bg-softoria-gold shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 text-softoria-gold shrink-0 ml-1" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Distinct Realistic Service Image (5 cols) */}
                  <div className="lg:col-span-5 h-[160px] sm:h-[220px] lg:h-[280px] relative rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200/90 shadow-2xs group/img bg-softoria-black">
                    <img
                      src={`/assets/services/service-${service.id}.jpg`}
                      alt={`${service.title} enterprise software architecture preview`}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover/img:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-softoria-black/75 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[10px] sm:text-[11px] font-mono pointer-events-none">
                      <span className="bg-softoria-black/85 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10 text-softoria-gold font-semibold truncate max-w-[70%]">
                        {service.title}
                      </span>
                      <span className="bg-softoria-black/85 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10 text-gray-300 hidden sm:inline-block">
                        Enterprise Solution
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer with Existing Enquiry CTA */}
                <div className="pt-3 sm:pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectService && onSelectService(service.title)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-xl bg-softoria-black text-white hover:bg-softoria-gold hover:text-softoria-black font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-2xs hover:shadow-gold-sm cursor-pointer"
                  >
                    <span>Inquire About {service.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-softoria-gold group-hover:text-softoria-black transition-transform duration-200 group-hover:translate-x-1" />
                  </button>

                  <div className="flex items-center justify-end gap-1.5 text-xs text-softoria-greyLight font-mono">
                    <span>Service {formattedIndex} of {formattedTotal}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
