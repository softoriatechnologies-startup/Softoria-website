import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowRight, CheckCircle2, Award } from 'lucide-react';
import Badge from '../components/common/Badge';
import { COMPANY_CONFIG } from '../config/companyConfig';

const DELIVERABLE_MAP = {
  '01': {
    outcome: 'Project Scope Brief',
    deliverables: ['Stakeholder Requirements Document', 'Scope Boundaries & Deliverables Matrix', 'Initial Feasibility Assessment']
  },
  '02': {
    outcome: 'Architecture Plan & Roadmap',
    deliverables: ['Database Schema & ER Diagrams', 'System Architecture Blueprints', 'Sprint Milestones & Timeline']
  },
  '03': {
    outcome: 'Responsive UI Prototypes',
    deliverables: ['Figma UX Wireframes & Prototypes', 'Brand Color & Component Guide', 'User Flow & Interaction States']
  },
  '04': {
    outcome: 'Modular Code Sprints',
    deliverables: ['Clean Modular Frontend & Backend Logic', 'Documented RESTful Endpoints', 'Continuous Git Code Reviews']
  },
  '05': {
    outcome: 'QA Testing & Sign-Off',
    deliverables: ['Cross-Device Responsive Validation', 'Input Sanitization & Security Scans', 'Performance & Load Testing Sign-Off']
  },
  '06': {
    outcome: 'Production Deployment',
    deliverables: ['Secure Cloud Infrastructure Setup', 'Automated CI/CD Deployment Pipeline', 'SSL & DNS Domain Provisioning']
  },
  '07': {
    outcome: 'Ongoing Maintenance & Support',
    deliverables: ['Proactive Uptime & Health Monitoring', 'Security Patch Management', 'Continuous Performance Optimization']
  }
};

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);

  const [activeStage, setActiveStage] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const stages = COMPANY_CONFIG.processStages;
  const totalStages = stages.length;

  // Calculate and update horizontal translation based on vertical scroll through the pinned section
  const handleScroll = useCallback(() => {
    if (!sectionRef.current || !trackRef.current || !viewportRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const totalScrollable = sectionRef.current.offsetHeight - window.innerHeight;
    if (totalScrollable <= 0) return;

    // How far user has scrolled into the section
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

    // Calculate maximum horizontal travel distance
    const trackWidth = trackRef.current.scrollWidth;
    const viewportWidth = viewportRef.current.clientWidth;
    // Add extra padding to ensure the final card is completely visible in view
    const maxTranslate = Math.max(0, trackWidth - viewportWidth + 32);

    setTranslateX(progress * maxTranslate);

    // Synchronize active stage index (0 to 6)
    const rawIndex = Math.floor(progress * totalStages);
    const targetIndex = Math.min(totalStages - 1, Math.max(0, rawIndex));
    setActiveStage(targetIndex);
  }, [totalStages]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  const formattedActive = (activeStage + 1).toString().padStart(2, '0');
  const formattedTotal = totalStages.toString().padStart(2, '0');

  return (
    <section 
      id="process" 
      ref={sectionRef} 
      className="relative bg-white"
      style={{ height: `${totalStages * 42}vh` }} // ~294vh natural vertical scroll track
    >
      {/* Sticky Pinned Viewport Container with safe clearance for fixed navbar */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden border-b border-gray-200 z-10 pt-20 pb-5 sm:pt-20 sm:pb-8 lg:pt-24 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-between h-full max-h-[740px]">
          
          {/* Section Header with Stage Indicator */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 shrink-0 pb-3 sm:pb-4 border-b border-gray-100">
            <div className="max-w-2xl space-y-1.5">
              <Badge variant="gold">Engineering Methodology</Badge>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-softoria-black tracking-tight">
                Our 7-Stage Software Development Lifecycle
              </h2>
              <p className="text-xs sm:text-sm text-softoria-greyDark leading-relaxed font-normal hidden sm:block">
                A structured, transparent delivery pipeline designed to minimize project risk, maintain velocity, and ensure high code quality from initial concept to launch and beyond.
              </p>
            </div>

            {/* Stage Counter */}
            <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
              <div className="font-mono text-xs font-semibold tracking-wider text-softoria-greyLight bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 shadow-2xs select-none flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold text-softoria-gold">STAGE</span>
                <span className="text-softoria-black font-extrabold text-sm">{formattedActive}</span>
                <span className="text-gray-300">/</span>
                <span>{formattedTotal}</span>
              </div>
            </div>
          </div>

          {/* Horizontally Progressing Stages Track (Controlled by Natural Page Scroll) */}
          <div 
            ref={viewportRef}
            className="w-full overflow-hidden flex-1 flex items-center my-auto min-h-0 py-3 sm:py-4"
          >
            <div
              ref={trackRef}
              className="flex gap-5 sm:gap-6 will-change-transform transition-transform duration-100 ease-out motion-reduce:transition-none"
              style={{ transform: `translateX(-${translateX}px)` }}
            >
              {stages.map((stage, index) => {
                const isActive = index === activeStage;
                const isLast = index === totalStages - 1;
                const stageDetails = DELIVERABLE_MAP[stage.number] || {
                  outcome: 'Milestone Delivery',
                  deliverables: ['Scope Review', 'Deliverables Document', 'Sign-Off']
                };

                return (
                  <div
                    key={stage.number}
                    className={`w-[84vw] sm:w-[380px] lg:w-[420px] shrink-0 rounded-3xl p-6 sm:p-7 lg:p-8 flex flex-col justify-between transition-all duration-300 ${
                      isActive
                        ? 'bg-softoria-black text-white border-2 border-softoria-gold shadow-gold-md scale-102 ring-1 ring-softoria-gold/30'
                        : 'bg-softoria-bgLight text-softoria-black border border-gray-200/90 shadow-sm opacity-85 hover:opacity-100'
                    }`}
                  >
                    <div>
                      {/* Top Bar with Number & Phase Indicator */}
                      <div className="flex items-start justify-between pb-4 border-b border-gray-200/40 mb-4 sm:mb-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl font-mono font-extrabold text-sm sm:text-base flex items-center justify-center shadow-2xs ${
                            isActive
                              ? 'bg-softoria-gold text-softoria-black'
                              : 'bg-white text-softoria-black border border-gray-200'
                          }`}>
                            {stage.number}
                          </div>
                          <div>
                            <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider block ${
                              isActive ? 'text-softoria-gold' : 'text-softoria-greyLight'
                            }`}>
                              Phase {index + 1}
                            </span>
                            <span className={`text-xs font-bold ${
                              isActive ? 'text-white' : 'text-softoria-black'
                            }`}>
                              {stage.title}
                            </span>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div>
                          {isLast ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-softoria-gold/20 text-softoria-gold border border-softoria-gold/40 text-[10px] font-mono font-bold tracking-wider">
                              <Award className="w-3 h-3 text-softoria-gold" />
                              <span>FINAL PHASE</span>
                            </span>
                          ) : isActive ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-softoria-gold text-softoria-black text-[10px] font-mono font-bold tracking-wider">
                              <span>ACTIVE</span>
                              <ArrowRight className="w-3 h-3 text-softoria-black" />
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gray-200/70 text-gray-500 text-[10px] font-mono font-medium">
                              Stage {stage.number}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Stage Heading & Description */}
                      <h3 className={`text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight mb-2 ${
                        isActive ? 'text-white' : 'text-softoria-black'
                      }`}>
                        {stage.title}
                      </h3>
                      
                      <p className={`text-xs sm:text-sm leading-relaxed font-normal mb-4 sm:mb-5 ${
                        isActive ? 'text-gray-300' : 'text-softoria-greyDark'
                      }`}>
                        {stage.description}
                      </p>

                      {/* Key Sprint Deliverables */}
                      <div className="space-y-1.5 sm:space-y-2 mb-4 pt-3 border-t border-gray-200/30">
                        <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${
                          isActive ? 'text-softoria-gold' : 'text-softoria-greyLight'
                        }`}>
                          Key Sprint Deliverables:
                        </div>
                        {stageDetails.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className={`flex items-start gap-2 text-xs font-medium ${
                            isActive ? 'text-gray-200' : 'text-softoria-greyDark'
                          }`}>
                            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                              isActive ? 'text-softoria-gold' : 'text-softoria-goldDark'
                            }`} />
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Grounded Deliverable Tag */}
                    <div className="pt-3 border-t border-gray-200/30 flex items-center justify-between text-xs mt-auto">
                      <div className="flex items-center gap-1.5 truncate mr-2">
                        <span className={`text-[10px] font-semibold ${
                          isActive ? 'text-gray-400' : 'text-softoria-greyLight'
                        }`}>
                          Outcome:
                        </span>
                        <span className={`font-bold text-xs truncate ${
                          isActive ? 'text-softoria-gold' : 'text-softoria-black'
                        }`}>
                          {stageDetails.outcome}
                        </span>
                      </div>
                      <span className="font-mono text-softoria-gold font-extrabold text-xs shrink-0">
                        {stage.number}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Progress Track tied to horizontal scroll progress */}
          <div className="pt-2 shrink-0 flex items-center justify-center">
            <div className="w-36 sm:w-56 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-softoria-gold transition-all duration-150 ease-out"
                style={{ width: `${((activeStage + 1) / totalStages) * 100}%` }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
