import React from 'react';
import { 
  Wrench, 
  Target, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  Headphones 
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/companyConfig';
import Badge from '../components/common/Badge';

const ICON_MAP = {
  Wrench,
  Target,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Headphones
};

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 sm:py-28 bg-softoria-black text-white relative overflow-hidden border-y border-softoria-greyMedium/40">
      
      {/* Subtle ambient gold radial lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-softoria-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-softoria-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <Badge variant="gold">Why Partner With Us</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Engineering Built Around Real Business Needs
          </h2>
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed font-normal">
            We measure our success by the operational efficiency, software resilience, and long-term value delivered to your business.
          </p>
        </div>

        {/* 6 Business Value Cards (3 cols desktop, 2 cols tablet, 1 col mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {COMPANY_CONFIG.whyChooseUs.map((item, index) => {
            const IconComponent = ICON_MAP[item.iconName] || CheckCircle2;
            const formattedIndex = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;

            return (
              <div
                key={index}
                className="p-7 sm:p-8 rounded-2xl bg-softoria-dark border border-softoria-greyMedium/80 hover:border-softoria-gold/70 hover:shadow-card-dark transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar with Icon and Index */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-softoria-greyDark border border-softoria-greyMedium flex items-center justify-center text-softoria-gold group-hover:bg-softoria-gold group-hover:text-softoria-black transition-colors duration-200 shadow-xs">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs text-gray-500 font-semibold group-hover:text-softoria-gold transition-colors">
                      {formattedIndex}
                    </span>
                  </div>
                  
                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-softoria-gold transition-colors tracking-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-gray-400 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

