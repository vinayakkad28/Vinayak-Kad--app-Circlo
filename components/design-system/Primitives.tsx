
import React from 'react';

export const Stack: React.FC<{ 
  children: React.ReactNode, 
  gap?: number, 
  className?: string,
  align?: 'start' | 'center' | 'end' | 'stretch'
}> = ({ children, gap = 8, className = '', align = 'stretch' }) => (
  <div className={`flex flex-col gap-${gap} items-${align} ${className}`}>
    {children}
  </div>
);

// Fix: Removed stray 'Section;' token and added missing closing parenthesis for the component expression.
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
  <div className={`min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-white ${className}`}>
    {children}
  </div>
);

export const Card: React.FC<{ 
  children: React.ReactNode, 
  className?: string,
  variant?: 'surface' | 'glass' | 'accent' | 'dark-glass'
}> = ({ children, className = '', variant = 'surface' }) => {
  const variants = {
    surface: 'bg-slate-900 border border-slate-800',
    glass: 'bg-white/5 backdrop-blur-2xl border border-white/10',
    'dark-glass': 'bg-black/40 backdrop-blur-3xl border border-white/5',
    accent: 'bg-indigo-600 border border-indigo-500'
  };
  return (
    <div className={`p-8 rounded-[3rem] shadow-2xl transition-all duration-500 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

export const Typography = {
  Heading: ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <h1 className={`text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] text-white ${className}`}>
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
  variant?: 'primary' | 'secondary' | 'subtle' | 'ghost',
  disabled?: boolean,
  className?: string,
  isLoading?: boolean
}> = ({ children, onClick, variant = 'primary', disabled = false, className = '', isLoading = false }) => {
  const variants = {
    primary: 'bg-white text-slate-950 hover:bg-slate-100 shadow-[0_20px_40px_rgba(255,255,255,0.1)]',
    secondary: 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_20px_40px_rgba(99,102,241,0.2)]',
    subtle: 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800',
    ghost: 'bg-transparent text-slate-500 hover:text-white hover:bg-white/5'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`py-6 px-10 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
    >
      {isLoading && <i className="fas fa-circle-notch animate-spin"></i>}
      {children}
    </button>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input 
    {...props}
    className={`w-full bg-black/40 border border-white/5 rounded-[1.5rem] px-6 py-5 text-sm font-medium text-white placeholder:text-slate-700 outline-none focus:border-indigo-500/50 focus:bg-black/60 transition-all ${props.className}`}
  />
);
