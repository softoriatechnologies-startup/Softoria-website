import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AutoEnquiryPopup from './components/enquiry/AutoEnquiryPopup';
import { useEnquiryPopup } from './hooks/useEnquiryPopup';
import { enquiryService } from './services/enquiryService';

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

