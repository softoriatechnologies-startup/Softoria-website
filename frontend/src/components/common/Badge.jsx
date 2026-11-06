import React from 'react';

export default function Badge({
  children,
  variant = 'gold', // 'gold' | 'dark' | 'light' | 'outline' | 'success'
  size = 'sm',
  className = ''
}) {
  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-sm px-3 py-1'
  };

  const variantStyles = {
    gold: 'bg-softoria-gold/15 text-softoria-gold border border-softoria-gold/30 font-medium',
    dark: 'bg-softoria-dark text-gray-200 border border-softoria-greyMedium font-medium',
    light: 'bg-gray-100 text-softoria-greyDark border border-gray-200 font-medium',
    outline: 'border border-softoria-gold/50 text-softoria-gold font-medium',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium',
    info: 'bg-blue-50 text-blue-700 border border-blue-200 font-medium'
  };

  return (
    <span className={`inline-flex items-center rounded-full font-sans tracking-wide uppercase ${sizeStyles[size] || sizeStyles.sm} ${variantStyles[variant] || variantStyles.gold} ${className}`}>
      {children}
    </span>
  );
}

