import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Linkedin, 
  Instagram, 
  Facebook, 
  Github, 
  Youtube, 
  MessageSquare,
  ArrowUp,
  Lock
} from 'lucide-react';
import { COMPANY_CONFIG } from '../../config/companyConfig';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Social link definitions mapped to config keys (only rendered if URL is set)
  const socialItems = [
    { name: 'LinkedIn', icon: Linkedin, url: COMPANY_CONFIG.socialLinks.linkedin },
    { name: 'Instagram', icon: Instagram, url: COMPANY_CONFIG.socialLinks.instagram },
    { name: 'Facebook', icon: Facebook, url: COMPANY_CONFIG.socialLinks.facebook },
    { name: 'GitHub', icon: Github, url: COMPANY_CONFIG.socialLinks.github },
    { name: 'YouTube', icon: Youtube, url: COMPANY_CONFIG.socialLinks.youtube },
    { name: 'WhatsApp', icon: MessageSquare, url: COMPANY_CONFIG.socialLinks.whatsapp }
  ].filter(item => item.url && item.url.trim() !== '');

  return (
    <footer className="bg-softoria-black text-gray-300 pt-16 pb-12 border-t border-softoria-greyMedium/50 relative overflow-hidden">
      {/* Subtle background ambient gold accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-softoria-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-softoria-greyMedium/40">
          
          {/* Column 1: Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <Link to="/" className="flex items-center gap-3 group select-none">
              <img
                src={COMPANY_CONFIG.logos.emblem}
                alt={COMPANY_CONFIG.logos.alt}
                className="h-12 w-auto object-contain rounded"
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-wider text-white uppercase font-sans">
                  Softoria
                </span>
                <span className="text-xs tracking-[0.25em] text-softoria-gold font-bold uppercase -mt-1">
                  Technologies
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-gray-400 max-w-md">
              {COMPANY_CONFIG.description}
            </p>

            <div className="pt-1">
              <span className="inline-block px-3 py-1 rounded bg-softoria-greyDark border border-softoria-gold/30 text-softoria-gold text-xs font-semibold tracking-wider uppercase">
                {COMPANY_CONFIG.statement}
              </span>
            </div>

            {/* Social links (only shown if configured) */}
            {socialItems.length > 0 && (
              <div className="pt-2">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                  Connect With Us
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {socialItems.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-softoria-greyDark border border-softoria-greyMedium flex items-center justify-center text-gray-300 hover:text-softoria-gold hover:border-softoria-gold transition-colors"
                        aria-label={social.name === 'WhatsApp' ? 'Chat with Softoria on WhatsApp' : `Visit Softoria on ${social.name}`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-white uppercase">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-softoria-gold transition-colors flex items-center gap-1 group">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-softoria-gold transition-colors flex items-center gap-1 group">
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-softoria-gold transition-colors flex items-center gap-1 group">
                  <span>Services</span>
                </Link>
              </li>
              <li>
                <Link to="/technologies" className="text-gray-400 hover:text-softoria-gold transition-colors flex items-center gap-1 group">
                  <span>Technologies</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-softoria-gold transition-colors flex items-center gap-1 group">
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-white uppercase">
              Core Services
            </h4>
            <ul className="space-y-3 text-sm">
              {COMPANY_CONFIG.services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services#${service.id}`}
                    className="text-gray-400 hover:text-softoria-gold transition-colors line-clamp-1"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Office (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-white uppercase">
              Inquiries
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5 text-gray-400">
                <MapPin className="w-4 h-4 text-softoria-gold shrink-0 mt-0.5" />
                <span>{COMPANY_CONFIG.contact.location}</span>
              </div>
              <div className="flex items-start gap-2.5 text-gray-400">
                <Mail className="w-4 h-4 text-softoria-gold shrink-0 mt-0.5" />
                <a
                  href={`mailto:${COMPANY_CONFIG.contact.email}`}
                  className="break-all text-gray-400 hover:text-softoria-gold transition-colors"
                >
                  {COMPANY_CONFIG.contact.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5 text-gray-400">
                <Phone className="w-4 h-4 text-softoria-gold shrink-0 mt-0.5" />
                <div className="flex items-center gap-1.5 flex-wrap text-sm">
                  <a
                    href={`tel:${COMPANY_CONFIG.contact.phone1Tel}`}
                    className="text-gray-300 hover:text-softoria-gold transition-colors"
                  >
                    {COMPANY_CONFIG.contact.phone1}
                  </a>
                  <span className="text-gray-500">/</span>
                  <a
                    href={`tel:${COMPANY_CONFIG.contact.phone2Tel}`}
                    className="text-gray-300 hover:text-softoria-gold transition-colors"
                  >
                    {COMPANY_CONFIG.contact.phone2}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-gray-400">
                <MessageSquare className="w-4 h-4 text-softoria-gold shrink-0 mt-0.5" />
                <div className="flex items-center gap-1.5 flex-wrap text-sm">
                  <a
                    href={COMPANY_CONFIG.contact.whatsapp1Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-softoria-gold transition-colors"
                    aria-label={`Chat on WhatsApp with Softoria at ${COMPANY_CONFIG.contact.whatsapp1}`}
                  >
                    {COMPANY_CONFIG.contact.whatsapp1}
                  </a>
                  <span className="text-gray-500">/</span>
                  <a
                    href={COMPANY_CONFIG.contact.whatsapp2Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-softoria-gold transition-colors"
                    aria-label={`Chat on WhatsApp with Softoria at ${COMPANY_CONFIG.contact.whatsapp2}`}
                  >
                    {COMPANY_CONFIG.contact.whatsapp2}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-gray-400">
                <Clock className="w-4 h-4 text-softoria-gold shrink-0 mt-0.5" />
                <span>{COMPANY_CONFIG.contact.officeAvailability}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {currentYear} {COMPANY_CONFIG.name}. All rights reserved.</p>

          <div className="flex items-center flex-wrap justify-center gap-6">
            <Link to="/privacy-policy" className="hover:text-softoria-gold transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-softoria-gold transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/admin/login" className="hover:text-softoria-gold text-gray-500 transition-colors flex items-center gap-1.5 group">
              <Lock className="w-3 h-3 text-softoria-gold/70 group-hover:text-softoria-gold" />
              <span>Admin Portal</span>
            </Link>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-softoria-gold transition-colors cursor-pointer text-gray-400 ml-2"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
