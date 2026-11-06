import React, { useState, useMemo } from 'react';
import Badge from '../components/common/Badge';
import TechLogo from '../components/common/TechLogo';
import { COMPANY_CONFIG } from '../config/companyConfig';

export default function TechnologiesSection() {
  const [selectedCategory, setSelectedCategory] = useState('Frontend Engineering');

  // Flatten all approved technologies for the "All Technologies" view
  const allTechnologies = useMemo(() => {
    return COMPANY_CONFIG.technologies.flatMap((cat) =>
      cat.items.map((item) => ({ ...item, categoryName: cat.category }))
    );
  }, []);

  // Compute item counts for each category
  const categoryCounts = useMemo(() => {
    const counts = { 'All Technologies': allTechnologies.length };
    COMPANY_CONFIG.technologies.forEach((cat) => {
      counts[cat.category] = cat.items.length;
    });
    return counts;
  }, [allTechnologies]);

  // List of all filter tabs
  const categoryTabs = useMemo(() => {
    return ['All Technologies', ...COMPANY_CONFIG.technologies.map((c) => c.category)];
  }, []);

  // Filter technologies based on active category
  const displayedTechnologies = useMemo(() => {
    if (selectedCategory === 'All Technologies') {
      return allTechnologies;
    }
    const currentGroup = COMPANY_CONFIG.technologies.find(
      (cat) => cat.category === selectedCategory
    );
    return currentGroup ? currentGroup.items : [];
  }, [selectedCategory, allTechnologies]);

  return (
    <section id="technologies" className="py-20 sm:py-28 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <Badge variant="gold">Modern Tech Stack</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-softoria-black tracking-tight">
            Our Technology Stack
          </h2>
          <p className="text-base sm:text-lg text-softoria-greyDark leading-relaxed">
            Technologies We Use to Build Digital Solutions
          </p>
        </div>

        {/* Category Navigation (Pill Filters) */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-5xl mx-auto mb-12 sm:mb-16"
          role="tablist"
          aria-label="Technology Stack Categories"
        >
          {categoryTabs.map((catName) => {
            const isActive = selectedCategory === catName;
            const count = categoryCounts[catName] || 0;

            return (
              <button
                key={catName}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(catName)}
                className={`group inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-softoria-gold/50 cursor-pointer ${
                  isActive
                    ? 'bg-softoria-black text-white border border-softoria-black shadow-xs ring-1 ring-softoria-gold/40'
                    : 'bg-white text-softoria-greyDark border border-gray-200/90 hover:border-softoria-gold/50 hover:text-softoria-black hover:bg-gray-50/70'
                }`}
              >
                <span>{catName}</span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-softoria-greyLight group-hover:bg-softoria-gold/15 group-hover:text-softoria-black'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Technology Cards Grid */}
        <div
          key={selectedCategory}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto transition-all duration-300"
        >
          {displayedTechnologies.map((tech, idx) => (
            <div
              key={`${tech.name}-${idx}`}
              className="p-5 sm:p-6 bg-white rounded-2xl border border-gray-100/90 shadow-xs hover:border-softoria-gold/50 hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center group min-h-[175px] sm:min-h-[195px]"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gray-50/80 border border-gray-100/80 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-white group-hover:border-softoria-gold/30 group-hover:scale-105 transition-all duration-300">
                <TechLogo logoKey={tech.logoKey} name={tech.name} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-softoria-black group-hover:text-softoria-black transition-colors">
                {tech.name}
              </h3>
              <p className="text-xs text-softoria-greyLight mt-1 font-medium leading-relaxed">
                {tech.role}
              </p>
              {selectedCategory === 'All Technologies' && tech.categoryName && (
                <span className="mt-3 inline-block px-2.5 py-0.5 text-[10px] font-semibold text-softoria-greyDark bg-gray-50 border border-gray-200/60 rounded-full">
                  {tech.categoryName}
                </span>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

