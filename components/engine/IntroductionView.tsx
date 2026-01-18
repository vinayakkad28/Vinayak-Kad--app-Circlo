
import React, { useState, useEffect } from 'react';
import { MatchProfile } from '../../types';
import { getIntroIntelligence } from '../../services/geminiService';
import { MOCK_USER } from '../../constants';

interface IntroductionViewProps {
  intro: MatchProfile;
  onAction: (intro: MatchProfile, script: string) => void;
  onReset: () => void;
}

const IntroductionView: React.FC<IntroductionViewProps> = ({ intro, onAction, onReset }) => {
  const [loading, setLoading] = useState(true);
  const [intel, setIntel] = useState<any>(null);

  useEffect(() => {
    const fetchIntel = async () => {
      setLoading(true);
      const data = await getIntroIntelligence(MOCK_USER, intro);
      setIntel(data);
      setLoading(false);
    };
    fetchIntel();
  }, [intro]);

  return (
    <div className="flex-1 flex flex-col p-8 animate-fade-in overflow-y-auto no-scrollbar pb-32 max-w-sm mx-auto">
      <header className="mb-10 mt-4 space-y-2">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Layer 03</span>
        <h2 className="text-4xl font-black tracking-tight text-white">Introduction.</h2>
      </header>

      <div className="space-y-8">
        {/* Outcome Focus */}
        <div className="p-8 rounded-[3rem] bg-slate-900/50 border border-slate-800 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <i className="fas fa-link text-6xl"></i>
          </div>
          
          <div className="space-y-8 relative z-10">
            <div className="flex items-center gap-6">
              <img src={intro.avatar} className="w-20 h-20 rounded-[2rem] object-cover border-2 border-slate-800 shadow-xl" alt={intro.name} />
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-white">{intro.name}</h3>
                <p className="text-indigo-400 font-bold uppercase text-[9px] tracking-widest">{intro.role} • {intro.company}</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-400 leading-relaxed italic">
                "{intro.bio}"
              </p>
              <div className="flex items-center gap-3 py-3 px-4 bg-slate-950/50 rounded-xl border border-slate-800/50">
                <img src={intro.bridgeAvatar} className="w-6 h-6 rounded-lg opacity-50" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Verified via {intro.bridgeName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Intelligence Logic */}
        <section className="space-y-6">
           <h4 className="text-[10px] font-black uppercase text-slate-600 tracking-[0.2em] px-2">Engine Outcome Analysis</h4>
           <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 space-y-8">
              {loading ? (
                <div className="animate-pulse space-y-6">
                  <div className="h-4 bg-slate-800 rounded-full w-3/4"></div>
                  <div className="h-16 bg-slate-800 rounded-2xl w-full"></div>
                </div>
              ) : (
                <>
                  <p className="text-lg font-bold text-slate-200 leading-tight">"{intel?.reasoning}"</p>
                  
                  <div className="space-y-3">
                    <p className="text-[9px] font-black uppercase text-indigo-400 tracking-widest">Suggested Intro Script</p>
                    <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800 text-sm font-medium italic text-slate-400 leading-relaxed">
                      "{intel?.magic_script}"
                    </div>
                  </div>

                  <button 
                    onClick={() => onAction(intro, intel?.magic_script)}
                    className="w-full py-5 bg-slate-100 text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white active:scale-95 transition-all shadow-xl"
                  >
                    Request introduction
                  </button>
                </>
              )}
           </div>
        </section>

        <button 
          onClick={onReset}
          className="w-full py-4 text-slate-600 font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors"
        >
          Reset Engine Search
        </button>
      </div>
    </div>
  );
};

export default IntroductionView;
