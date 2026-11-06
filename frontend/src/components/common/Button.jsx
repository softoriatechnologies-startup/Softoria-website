import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'dark' | 'ghost' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  type = 'button',
  isLoading = false,
  disabled = false,
  onClick,
  className = '',
  icon: Icon,
  iconPosition = 'right',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none tracking-wide';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5 font-semibold'
  };

  const variantStyles = {
    primary: 'bg-softoria-gold text-softoria-black hover:bg-softoria-goldLight font-semibold shadow-gold-sm hover:shadow-gold-md focus:ring-softoria-gold active:translate-y-0.5',
    secondary: 'border border-softoria-gold text-softoria-black bg-transparent hover:bg-softoria-gold hover:text-softoria-black focus:ring-softoria-gold active:translate-y-0.5',
    secondaryDark: 'border border-softoria-gold text-white bg-transparent hover:bg-softoria-gold hover:text-softoria-black focus:ring-softoria-gold active:translate-y-0.5',
    dark: 'bg-softoria-black text-white hover:bg-softoria-greyDark border border-softoria-greyMedium focus:ring-softoria-black active:translate-y-0.5',
    ghost: 'text-softoria-black hover:text-softoria-gold hover:bg-gray-100 focus:ring-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
      {!isLoading && Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {!isLoading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}

