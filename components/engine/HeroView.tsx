
import React from 'react';

interface HeroViewProps {
  onStart: () => void;
}

const HeroView: React.FC<HeroViewProps> = ({ onStart }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center animate-fade-in max-w-sm mx-auto">
      <div className="mb-24 space-y-12">
        <div className="w-24 h-24 bg-slate-900 border border-slate-800 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl relative">
          <div className="w-10 h-10 bg-indigo-500 rounded-full blur-[4px] animate-pulse"></div>
          <div className="w-4 h-4 bg-white rounded-full absolute"></div>
        </div>
        
        <div className="space-y-6">
          <h1 className="text-6xl font-black tracking-tight leading-[1] text-slate-100">
            Circlo.
          </h1>
          <p className="text-slate-400 font-medium text-xl leading-relaxed">
            Meaningful introductions, <br/>verified through trust.
          </p>
        </div>
      </div>

      <div className="w-full space-y-16">
        <button 
          onClick={onStart}
          className="w-full py-7 bg-slate-100 text-slate-950 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-white active:scale-95 transition-all"
        >
          Find a connection
        </button>

        <section className="pt-12 border-t border-slate-900">
          <div className="flex items-center justify-center gap-4 text-slate-600">
            <i className="fas fa-shield-check text-xs"></i>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified Paths Only</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeroView;
