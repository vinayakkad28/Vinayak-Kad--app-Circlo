
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
      {/* Outer Glow */}
      <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full animate-pulse-slow"></div>
      
      {/* The Intersecting Paths Logo */}
      <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 fill-none">
        <circle 
          cx="40" cy="50" r="30" 
          stroke="white" 
          strokeWidth="8" 
          strokeOpacity="0.1"
        />
        <circle 
          cx="60" cy="50" r="30" 
          stroke="white" 
          strokeWidth="8" 
          strokeOpacity="0.2"
        />
        {/* Core Intersect Node */}
        <circle 
          cx="50" cy="50" r="10" 
          className="fill-indigo-500 animate-pulse"
        />
        {/* Directional Path Fragment */}
        <path 
          d="M50 50 L75 25" 
          stroke="white" 
          strokeWidth="4" 
          strokeLinecap="round"
          className="opacity-50"
        />
      </svg>
    </div>
  );
};
