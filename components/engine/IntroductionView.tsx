
import React, { useState, useEffect } from 'react';
import { MatchProfile, IntroIntelligence } from '../../types';
import { getIntroIntelligence } from '../../services/geminiService';
import { MOCK_USER } from '../../constants';

interface IntroductionViewProps {
  intro: MatchProfile;
  onAction: (intro: MatchProfile, script: string) => void;
  onReset: () => void;
}

const IntroductionView: React.FC<IntroductionViewProps> = ({ intro, onAction, onReset }) => {
  const [loading, setLoading] = useState(true);
  const [intel, setIntel] = useState<IntroIntelligence | null>(null);

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
    <div className="flex-1 flex flex-col p-8 animate-fade-in overflow-y-auto no-scrollbar pb-32 max-w-md mx-auto">
      <header className="mb-12 mt-4 space-y-2 text-center">
        <h2 className="text-4xl font-black tracking-tight text-white">Suggested Connection.</h2>
      </header>

      <div className="space-y-12">
        {/* Recommendation Hero */}
        <div className="p-1 rounded-[3.5rem] bg-gradient-to-br from-indigo-500/30 to-slate-800 shadow-3xl">
          <div className="bg-slate-950 rounded-[3.4rem] p-10 space-y-10 relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl"></div>
            
            <div className="flex flex-col items-center text-center gap-6 relative z-10">
              <img src={intro.avatar} className="w-32 h-32 rounded-[3rem] object-cover border-4 border-slate-900 shadow-2xl" alt={intro.name} />
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-white leading-tight">{intro.name}</h3>
                <p className="text-indigo-400 font-bold uppercase text-[10px] tracking-[0.3em]">{intro.role} • {intro.company}</p>
              </div>
            </div>

            <p className="text-xl text-slate-300 font-medium leading-relaxed italic text-center px-4">
              "{intro.bio}"
            </p>

            <div className="pt-8 border-t border-slate-900 flex flex-col items-center gap-4">
               <div className="flex items-center gap-3 py-2 px-5 bg-slate-900 rounded-full border border-slate-800">
                  <img src={intro.bridgeAvatar} className="w-6 h-6 rounded-lg opacity-80" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified via {intro.bridgeName}</span>
               </div>
            </div>
          </div>
        </div>

        {/* Confidence Section */}
        <section className="space-y-8">
           <div className="px-4 space-y-10">
              {loading ? (
                <div className="animate-pulse space-y-6">
                  <div className="h-6 bg-slate-800 rounded-full w-full"></div>
                  <div className="h-24 bg-slate-800 rounded-3xl w-full"></div>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <p className="text-xl font-bold text-slate-200 leading-snug">
                      {intel?.reasoning}
                    </p>
                    <p className="text-sm font-medium text-emerald-400">
                      <i className="fas fa-check-circle mr-2"></i>
                      {intel?.confidence_statement}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-8 rounded-[2.5rem] bg-slate-900/50 border border-slate-800 space-y-4">
                      <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Message for {intro.bridgeName}</p>
                      <p className="text-sm font-medium italic text-slate-400 leading-relaxed">
                        "{intel?.magic_script}"
                      </p>
                    </div>

                    <button 
                      onClick={() => onAction(intro, intel?.magic_script!)}
                      className="w-full py-7 bg-slate-100 text-slate-950 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-white active:scale-95 transition-all shadow-xl"
                    >
                      Connect with confidence
                    </button>
                  </div >
                </>
              )}
           </div>
        </section>

        <button 
          onClick={onReset}
          className="w-full py-4 text-slate-700 font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors"
        >
          Try a different focus
        </button>
      </div>
    </div>
  );
};

export default IntroductionView;
