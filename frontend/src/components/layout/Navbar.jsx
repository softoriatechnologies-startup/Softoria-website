import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Phone, Mail } from 'lucide-react';
import { COMPANY_CONFIG } from '../../config/companyConfig';
import Button from '../common/Button';

export default function Navbar({ onStartProject }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Technologies', path: '/technologies' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-gray-100 py-3.5'
          : 'bg-white/90 backdrop-blur-sm border-b border-gray-100/70 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 focus:outline-none group select-none"
            aria-label={`${COMPANY_CONFIG.name} Homepage`}
          >
            <img
              src={COMPANY_CONFIG.logos.emblem}
              alt={COMPANY_CONFIG.logos.alt}
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-wider text-softoria-black uppercase font-sans">
                Softoria
              </span>
              <span className="text-[10px] tracking-[0.25em] text-softoria-gold font-bold uppercase -mt-1">
                Technologies
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    active
                      ? 'text-softoria-black font-semibold bg-gray-50/90'
                      : 'text-softoria-greyDark hover:text-softoria-black hover:bg-gray-50/70'
                  }`}
                >
                  <span>{link.name}</span>
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-softoria-gold rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={onStartProject}
              icon={ArrowRight}
              iconPosition="right"
              className="shadow-gold-sm hover:shadow-gold-md"
            >
              Start a Project
            </Button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-softoria-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-softoria-gold transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="px-4 pt-3 pb-6 space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-3.5 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    active
                      ? 'bg-softoria-gold/10 text-softoria-black font-semibold border-l-4 border-softoria-gold'
                      : 'text-softoria-greyDark hover:bg-gray-50 hover:text-softoria-black'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Drawer CTA */}
            <div className="pt-4 border-t border-gray-100 mt-4 space-y-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onStartProject) onStartProject();
                }}
                className="w-full justify-center shadow-gold-sm"
                icon={ArrowRight}
              >
                Start a Project
              </Button>

              {/* Mobile Quick-Contact Links */}
              <div className="p-3 rounded-xl bg-gray-50/90 border border-gray-100 space-y-2 text-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-softoria-greyLight">
                  Direct Inquiries
                </div>
                <div className="flex items-center gap-2 font-medium text-softoria-black">
                  <Phone className="w-3.5 h-3.5 text-softoria-gold shrink-0" />
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <a
                      href={`tel:${COMPANY_CONFIG.contact.phone1Tel}`}
                      className="hover:text-softoria-gold transition-colors font-semibold"
                    >
                      {COMPANY_CONFIG.contact.phone1}
                    </a>
                    <span className="text-gray-400 font-normal">/</span>
                    <a
                      href={`tel:${COMPANY_CONFIG.contact.phone2Tel}`}
                      className="hover:text-softoria-gold transition-colors font-semibold"
                    >
                      {COMPANY_CONFIG.contact.phone2}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-medium text-softoria-black">
                  <Mail className="w-3.5 h-3.5 text-softoria-gold shrink-0" />
                  <a
                    href={`mailto:${COMPANY_CONFIG.contact.email}`}
                    className="hover:text-softoria-gold transition-colors truncate font-semibold"
                  >
                    {COMPANY_CONFIG.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

