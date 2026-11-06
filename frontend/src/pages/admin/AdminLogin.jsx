import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, User, AlertCircle, ShieldCheck } from 'lucide-react';
import { authService } from '../../services/authService';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { COMPANY_CONFIG } from '../../config/companyConfig';

export default function AdminLogin() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionExpired = searchParams.get('sessionExpired');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim() || !password) {
      setError('Please provide your admin username/email and password.');
      return;
    }

    setIsLoading(true);

    try {
      await authService.login(identifier, password);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Admin login error:', err);
      const msg = err.response?.data?.message || 'Invalid administrator credentials.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-softoria-black text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-softoria-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10 bg-softoria-dark p-8 sm:p-10 rounded-2xl border border-softoria-greyMedium/70 shadow-2xl">
        
        {/* Emblem & Title */}
        <div className="text-center space-y-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-softoria-gold/15 border border-softoria-gold/30 flex items-center justify-center mx-auto text-softoria-gold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <Badge variant="gold" size="sm">Administrative Control</Badge>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Softoria Admin Portal
          </h2>
          <p className="text-xs text-gray-400">
            Secure authentication for managing customer enquiries and leads.
          </p>
        </div>

        {sessionExpired && (
          <div className="mb-5 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-xs">
            Your admin session has expired. Please sign in again.
          </div>
        )}

        {error && (
          <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Username or Email
            </label>
            <div className="relative">
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="admin@softoria.com"
                className="w-full pl-10 pr-3.5 py-2.5 bg-softoria-black border border-softoria-greyMedium rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-softoria-gold transition-colors"
                autoComplete="username"
              />
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 bg-softoria-black border border-softoria-greyMedium rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-softoria-gold transition-colors"
                autoComplete="current-password"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full justify-center"
            >
              Sign In to Dashboard
            </Button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-softoria-greyMedium/40 text-center">
          <p className="text-[11px] text-gray-500">
            🔒 Protected by cryptographic salt & stateless JWT authentication.
          </p>
        </div>
      </div>
    </div>
  );
}

