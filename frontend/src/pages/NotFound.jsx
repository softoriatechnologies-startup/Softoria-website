import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

export default function NotFound() {
  return (
    <div className="min-h-screen pt-36 pb-24 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-100">
        <Badge variant="gold">404 Error</Badge>
        <h1 className="text-4xl sm:text-5xl font-black text-softoria-black tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-softoria-greyLight leading-relaxed">
          The requested address could not be found or has been relocated within the Softoria Technologies portal.
        </p>
        <div className="pt-2 flex justify-center">
          <Link to="/">
            <Button variant="primary" icon={Home} iconPosition="left">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

