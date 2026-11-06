import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'softoria_popup_state_v1';
const SESSION_DISMISS_KEY = 'softoria_popup_session_dismissed';
const TRIGGER_DELAY_MS = 5000; // 5 seconds

export function useEnquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState('');

  useEffect(() => {
    // Check if running in browser environment
    if (typeof window === 'undefined') return;

    try {
      // Rule 1: If visitor has already submitted an enquiry, never interrupt with auto popup
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.submitted) {
          return;
        }
      }

      // Rule 2: If dismissed during the current browsing session, do not auto-reopen
      const sessionDismissed = sessionStorage.getItem(SESSION_DISMISS_KEY);
      if (sessionDismissed === 'true') {
        return;
      }
    } catch {
      // In case of storage access restrictions, continue gracefully
    }

    // Set 5-second automatic trigger timer for first eligible visit
    const timer = setTimeout(() => {
      setIsOpen((prev) => {
        // Do not alter if already manually opened or active
        if (prev) return prev;
        return true;
      });
    }, TRIGGER_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const openPopup = useCallback((service = '') => {
    if (typeof service === 'string' && service.trim()) {
      setPrefilledService(service.trim());
    } else {
      setPrefilledService('');
    }
    setIsOpen(true);
  }, []);

  const closePopup = useCallback(() => {
    setIsOpen(false);

    try {
      // Mark as dismissed for the active browsing session
      sessionStorage.setItem(SESSION_DISMISS_KEY, 'true');

      // Update persistent storage timestamp for analytical or cooldown records
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : {};
      if (!parsed.submitted) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            ...parsed,
            dismissedAt: Date.now()
          })
        );
      }
    } catch {
      // Fail gracefully
    }
  }, []);

  const recordSubmission = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_DISMISS_KEY, 'true');
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          submitted: true,
          submittedAt: Date.now()
        })
      );
    } catch {
      // Fail gracefully
    }
  }, []);

  return {
    isOpen,
    prefilledService,
    openPopup,
    closePopup,
    recordSubmission
  };
}
