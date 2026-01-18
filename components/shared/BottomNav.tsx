
import React from 'react';

interface BottomNavProps {
  active: 'home' | 'messages' | 'profile';
  onNavigate: (v: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ active, onNavigate }) => {
  return (
    <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 px-10 py-5 rounded-btn bg-slate-900 text-white shadow-2xl flex items-center gap-14 z-40 transition-all active:scale-95">
      <button 
        onClick={() => onNavigate('home')}
        className={`text-2xl transition-all ${active === 'home' ? 'scale-110' : 'opacity-40'}`}
      >
        <i className="fas fa-search"></i>
      </button>
      <button 
        onClick={() => onNavigate('messages')}
        className={`text-2xl relative transition-all ${active === 'messages' ? 'scale-110' : 'opacity-40'}`}
      >
        <i className="fas fa-paper-plane"></i>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
      </button>
      <button 
        onClick={() => onNavigate('profile')}
        className={`text-2xl transition-all ${active === 'profile' ? 'scale-110' : 'opacity-40'}`}
      >
        <i className="fas fa-fingerprint"></i>
      </button>
    </nav>
  );
};

export default BottomNav;
