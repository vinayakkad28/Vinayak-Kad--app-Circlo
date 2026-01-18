
import React from 'react';

interface HeroViewProps {
  onStart: () => void;
}

const HeroView: React.FC<HeroViewProps> = ({ onStart }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in max-w-sm mx-auto">
      <div className="mb-16 space-y-10">
        <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl relative">
          <div className="w-8 h-8 bg-indigo-500 rounded-full blur-[2px] animate-pulse"></div>
          <div className="w-3 h-3 bg-white rounded-full absolute"></div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-black tracking-tight leading-[1] text-slate-100">
            The World’s <br/> Introduction <br/> Engine
          </h1>
          <p className="text-slate-400 font-medium text-lg leading-relaxed">
            Discover the right people to connect with — for any purpose.
          </p>
        </div>
      </div>

      <div className="w-full space-y-16">
        <button 
          onClick={onStart}
          className="w-full py-6 bg-slate-100 text-slate-950 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-white active:scale-95 transition-all"
        >
          Find one meaningful connection
        </button>

        <section className="pt-12 border-t border-slate-900">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-6">
            Built to make introductions that matter
          </p>
          <div className="grid grid-cols-1 gap-4 text-left">
            <div className="flex items-center gap-3">
              <i className="fas fa-shield-check text-indigo-500 text-xs"></i>
              <span className="text-xs font-bold text-slate-400">Privacy-first architecture</span>
            </div>
            <div className="flex items-center gap-3">
              <i className="fas fa-ban text-indigo-500 text-xs"></i>
              <span className="text-xs font-bold text-slate-400">Strict zero-spam policy</span>
            </div>
            <div className="flex items-center gap-3">
              <i className="fas fa-bullseye text-indigo-500 text-xs"></i>
              <span className="text-xs font-bold text-slate-400">Intent-based verification</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeroView;
