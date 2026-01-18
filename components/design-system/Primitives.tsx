
import React from 'react';

export const Stack: React.FC<{ 
  children: React.ReactNode, 
  gap?: number, 
  className?: string,
  align?: 'start' | 'center' | 'end'
}> = ({ children, gap = 8, className = '', align = 'stretch' }) => (
  <div className={`flex flex-col gap-${gap} items-${align} ${className}`}>
    {children}
  </div>
);

export const Section: React.FC<{ 
  children: React.ReactNode, 
  className?: string 
}> = ({ children, className = '' }) => (
  <section className={`w-full py-8 ${className}`}>
    {children}
  </section>
);

export const Page: React.FC<{ 
  children: React.ReactNode, 
  className?: string 
}> = ({ children, className = '' }) => (
  <div className={`min-h-screen flex flex-col bg-slate-950 text-slate-100 ${className}`}>
    {children}
  </div>
);

export const Card: React.FC<{ 
  children: React.ReactNode, 
  className?: string,
  variant?: 'surface' | 'glass' | 'accent'
}> = ({ children, className = '', variant = 'surface' }) => {
  const variants = {
    surface: 'bg-slate-900 border border-slate-800',
    glass: 'bg-slate-900/50 backdrop-blur-xl border border-slate-800/50',
    accent: 'bg-indigo-600 border border-indigo-500'
  };
  return (
    <div className={`p-8 rounded-[2.5rem] shadow-2xl transition-all ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

export const Typography = {
  Heading: ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <h1 className={`text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] ${className}`}>
      {children}
    </h1>
  ),
  Subheading: ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <h2 className={`text-xl font-bold text-slate-400 ${className}`}>
      {children}
    </h2>
  ),
  Body: ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <p className={`text-sm font-medium leading-relaxed text-slate-400 ${className}`}>
      {children}
    </p>
  ),
  Meta: ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <span className={`text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ${className}`}>
      {children}
    </span>
  )
};

export const Button: React.FC<{
  children: React.ReactNode,
  onClick?: () => void,
  variant?: 'primary' | 'secondary' | 'subtle',
  disabled?: boolean,
  className?: string
}> = ({ children, onClick, variant = 'primary', disabled = false, className = '' }) => {
  const variants = {
    primary: 'bg-slate-100 text-slate-950 hover:bg-white shadow-xl',
    secondary: 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg',
    subtle: 'bg-transparent text-slate-400 hover:text-white border border-slate-800'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`py-6 px-10 rounded-3xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
