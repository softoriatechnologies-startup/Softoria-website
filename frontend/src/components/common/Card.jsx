import React from 'react';

export default function Card({
  children,
  className = '',
  variant = 'light', // 'light' | 'dark' | 'outline' | 'glass'
  hoverEffect = true,
  onClick,
  ...props
}) {
  const base = 'rounded-xl transition-all duration-300 relative';
  
  const variants = {
    light: 'bg-white border border-gray-100 shadow-sm text-softoria-black',
    dark: 'bg-softoria-dark border border-softoria-greyMedium/70 text-white shadow-card-dark',
    outline: 'bg-transparent border border-gray-200 text-softoria-black',
    glass: 'bg-white/80 backdrop-blur-md border border-gray-100/80 shadow-premium'
  };

  const hover = hoverEffect
    ? 'hover:-translate-y-1 hover:border-softoria-gold/50 hover:shadow-gold-sm'
    : '';

  return (
    <div
      onClick={onClick}
      className={`${base} ${variants[variant] || variants.light} ${hover} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

