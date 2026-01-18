
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={`relative flex items-center justify-center ${sizes[size]} ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full fill-none" 
        stroke="currentColor" 
        aria-hidden="true"
      >
        {/* Path 1: Originating from top-left area, sweeping toward a deliberate intersection */}
        <path 
          d="M 25,75 C 25,45 45,25 75,25" 
          strokeWidth="3.5" 
          strokeLinecap="round"
          className="text-white opacity-40"
        />
        {/* Path 2: Originating from bottom-right area, converging at the meeting point with intentional asymmetry */}
        <path 
          d="M 45,85 C 75,85 85,65 85,35" 
          strokeWidth="3.5" 
          strokeLinecap="round"
          className="text-white opacity-90"
        />
      </svg>
    </div>
  );
};
