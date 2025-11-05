import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon' | 'text';
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ variant = 'full', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-16'
  };

  if (variant === 'icon') {
    return (
      <div className={`${sizeClasses[size]} aspect-square rounded-lg bg-gradient-to-br from-[#007BFF] to-[#003D80] flex items-center justify-center shadow-lg`}>
        <svg viewBox="0 0 24 24" fill="none" className="w-2/3 h-2/3">
          <rect x="8" y="4" width="8" height="16" rx="1" stroke="white" strokeWidth="2" fill="none"/>
          <circle cx="12" cy="14" r="1" fill="white"/>
        </svg>
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={`${sizeClasses[size]} flex items-center`}>
        <span className="text-white font-bold text-2xl tracking-tight">Next Door</span>
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} flex items-center gap-2`}>
      <div className="h-full aspect-square rounded-lg bg-gradient-to-br from-[#007BFF] to-[#003D80] flex items-center justify-center shadow-lg">
        <svg viewBox="0 0 24 24" fill="none" className="w-2/3 h-2/3">
          <rect x="8" y="4" width="8" height="16" rx="1" stroke="white" strokeWidth="2" fill="none"/>
          <circle cx="12" cy="14" r="1" fill="white"/>
        </svg>
      </div>
      <span className="text-white font-bold text-xl tracking-tight">Next Door</span>
    </div>
  );
};

export default Logo;
