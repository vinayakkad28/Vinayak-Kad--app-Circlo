
import React from 'react';

interface BottomNavProps {
  activeView: string;
  onViewChange: (view: any) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, onViewChange }) => {
  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-4rem)] max-w-sm px-10 py-5 rounded-[2.5rem] bg-slate-900/80 backdrop-blur-xl border border-slate-800 text-white shadow-2xl flex items-center justify-between z-40">
      <button 
        onClick={() => onViewChange('INTENT')}
        className={`text-xl transition-all ${activeView === 'INTENT' || activeView === 'SIGNAL' || activeView === 'RESULT' ? 'text-indigo-400 scale-125' : 'text-slate-600'}`}
      >
        <i className="fas fa-bolt"></i>
      </button>
      <button 
        onClick={() => onViewChange('MESSAGES')}
        className={`text-xl transition-all ${activeView === 'MESSAGES' ? 'text-indigo-400 scale-125' : 'text-slate-600'}`}
      >
        <i className="fas fa-link"></i>
      </button>
      <button 
        onClick={() => onViewChange('PROFILE')}
        className={`text-xl transition-all ${activeView === 'PROFILE' ? 'text-indigo-400 scale-125' : 'text-slate-600'}`}
      >
        <i className="fas fa-fingerprint"></i>
      </button>
    </nav>
  );
};

export default BottomNav;
