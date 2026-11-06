import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  const styles = {
    success: 'bg-emerald-900/90 text-white border-emerald-500/50',
    error: 'bg-red-900/90 text-white border-red-500/50',
    info: 'bg-softoria-dark text-white border-softoria-gold/50'
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-softoria-gold shrink-0" />
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-2xl backdrop-blur-md transition-all transform animate-in slide-in-from-bottom-5 duration-300 ${styles[type] || styles.info}`}
      role="alert"
    >
      {icons[type]}
      <p className="text-sm font-medium tracking-wide">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 text-gray-300 hover:text-white p-1 rounded-md transition-colors"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

