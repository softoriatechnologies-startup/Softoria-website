import React, { useRef } from 'react';
import HeroSection from '../sections/HeroSection';
import IntroSection from '../sections/IntroSection';
import ServicesSection from '../sections/ServicesSection';
import WhyChooseUsSection from '../sections/WhyChooseUsSection';
import TechnologiesSection from '../sections/TechnologiesSection';
import ProcessSection from '../sections/ProcessSection';
import CtaBannerSection from '../sections/CtaBannerSection';
import ContactSection from '../sections/ContactSection';

export default function Home({ onOpenPopup }) {
  const contactRef = useRef(null);
  const servicesRef = useRef(null);

  const scrollToContact = (prefilledService = '') => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (onOpenPopup) {
      onOpenPopup();
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <HeroSection
        onStartProject={onOpenPopup || scrollToContact}
        onExploreServices={scrollToServices}
      />
      
      <IntroSection />
      
      <ServicesSection
        onSelectService={(serviceTitle) => {
          if (onOpenPopup) {
            onOpenPopup(serviceTitle);
          } else {
            scrollToContact(serviceTitle);
          }
        }}
      />
      
      <WhyChooseUsSection />
      
      <TechnologiesSection />
      
      <ProcessSection />
      
      <CtaBannerSection onStartProject={onOpenPopup || scrollToContact} />
      
      <ContactSection />
    </div>
  );
}

