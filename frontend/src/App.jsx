import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AutoEnquiryPopup from './components/enquiry/AutoEnquiryPopup';
import { useEnquiryPopup } from './hooks/useEnquiryPopup';
import { enquiryService } from './services/enquiryService';
import { ROUTE_SEO_METADATA, SEO_BASE_URL, normalizePathname } from './config/seoConfig';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Technologies from './pages/Technologies';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

// Scroll to top helper on navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// DOM helpers for safe in-place metadata updates without tag duplication
const setMetaTag = (attrName, attrValue, content) => {
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const removeMetaTag = (attrName, attrValue) => {
  const element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (element) {
    element.remove();
  }
};

const setCanonical = (href) => {
  let element = document.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

const removeCanonical = () => {
  const element = document.querySelector('link[rel="canonical"]');
  if (element) {
    element.remove();
  }
};

// Route-aware SEO and canonical metadata manager
function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const normalizedPath = normalizePathname(pathname);
    const metadata = ROUTE_SEO_METADATA[normalizedPath];

    if (metadata) {
      // 1. Remove noindex restriction if previously on admin route
      removeMetaTag('name', 'robots');

      // 2. Set document title
      document.title = metadata.title;

      // 3. Set meta description
      setMetaTag('name', 'description', metadata.description);

      // 4. Set Open Graph metadata
      setMetaTag('property', 'og:title', metadata.ogTitle || metadata.title);
      setMetaTag('property', 'og:description', metadata.ogDescription || metadata.description);
      const canonicalUrl = normalizedPath === '/'
        ? `${SEO_BASE_URL}/`
        : `${SEO_BASE_URL}${normalizedPath}`;
      setMetaTag('property', 'og:url', canonicalUrl);

      // 5. Set Twitter Card metadata
      setMetaTag('name', 'twitter:title', metadata.twitterTitle || metadata.title);
      setMetaTag('name', 'twitter:description', metadata.twitterDescription || metadata.description);

      // 6. Set route canonical link
      setCanonical(canonicalUrl);
    } else if (pathname.startsWith('/admin')) {
      // Admin Routes: prevent public metadata leaking & enforce noindex
      document.title = pathname.includes('dashboard')
        ? 'Admin Dashboard | Softoria Technologies'
        : 'Admin Login | Softoria Technologies';

      setMetaTag('name', 'robots', 'noindex, nofollow');
      removeMetaTag('name', 'description');
      removeMetaTag('property', 'og:title');
      removeMetaTag('property', 'og:description');
      removeMetaTag('property', 'og:url');
      removeMetaTag('name', 'twitter:title');
      removeMetaTag('name', 'twitter:description');
      removeCanonical();
    } else {
      // 404 or unlisted routes: remove canonical and set generic title
      document.title = 'Page Not Found | Softoria Technologies';
      removeCanonical();
    }
  }, [pathname]);

  return null;
}

function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Silent non-blocking backend warmup on initial application load (wakes up dormant cloud instances)
  useEffect(() => {
    enquiryService.warmupBackend();
  }, []);

  // Secret admin shortcut: Ctrl + Shift + A (or Cmd + Shift + A)
  useEffect(() => {
    const handleAdminHotkey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        navigate('/admin/login');
      }
    };
    window.addEventListener('keydown', handleAdminHotkey);
    return () => window.removeEventListener('keydown', handleAdminHotkey);
  }, [navigate]);

  const {
    isOpen: isPopupOpen,
    prefilledService,
    openPopup,
    closePopup,
    recordSubmission
  } = useEnquiryPopup();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ScrollToTop />
      <SeoManager />
      
      {/* Standard Public Navigation */}
      <Navbar onStartProject={openPopup} />

      {/* Main Content Viewport */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onOpenPopup={openPopup} />} />
          <Route path="/about" element={<About onOpenPopup={openPopup} />} />
          <Route path="/services" element={<Services onOpenPopup={openPopup} />} />
          <Route path="/technologies" element={<Technologies onOpenPopup={openPopup} />} />
          
          {/* Legacy portfolio routes redirected to homepage */}
          <Route path="/work" element={<Navigate to="/" replace />} />
          <Route path="/projects" element={<Navigate to="/" replace />} />
          
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          
          {/* Admin Portal */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Global Footer (shown on all public pages) */}
      {!isAdminRoute && <Footer />}

      {/* Automatic 5-Second Enquiry Popup (only on public pages) */}
      {!isAdminRoute && (
        <AutoEnquiryPopup
          isOpen={isPopupOpen}
          initialService={prefilledService}
          onClose={closePopup}
          onSubmitted={() => {
            recordSubmission();
            // Automatically close after a moment or keep confirmation visible until manual close
          }}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

