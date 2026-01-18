
import React, { useState, useEffect } from 'react';
import { MatchProfile } from '../../types';
import { getIntroIntelligence } from '../../services/geminiService';
import { MOCK_USER } from '../../constants';

interface MatchDetailsPanelProps {
  match: MatchProfile;
  onClose: () => void;
  onOpenInvite: (type: 'path' | 'reach' | 'verify', data?: any) => void;
}

const MatchDetailsPanel: React.FC<MatchDetailsPanelProps> = ({ match, onClose, onOpenInvite }) => {
  const [loading, setLoading] = useState(true);
  const [intel, setIntel] = useState<any>(null);

  useEffect(() => {
    const fetchIntel = async () => {
      setLoading(true);
      const data = await getIntroIntelligence(MOCK_USER, match);
      setIntel(data);
      setLoading(false);
    };
    fetchIntel();
  }, [match]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl animate-in slide-in-from-right duration-500 overflow-y-auto no-scrollbar flex flex-col">
        <header className="sticky top-0 z-20 px-10 pt-16 pb-6 flex items-center justify-between bg-white/90 backdrop-blur-xl border-b border-slate-50">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white"><i className="fas fa-fingerprint text-[10px]"></i></div>
             <div>
               <h3 className="text-xl font-black">Bridge Intel</h3>
               <p className="label-sm text-slate-400">Contextual Reasoning Active</p>
             </div>
           </div>
           <button onClick={onClose} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center hover:bg-slate-100"><i className="fas fa-times"></i></button>
        </header>

        <div className="p-10 space-y-12">
          {/* Path Header */}
          <section className="flex flex-col items-center py-10 bg-slate-50 rounded-panel border border-slate-100 relative">
             <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 border-t-2 border-dashed border-slate-200 mx-10"></div>
             <div className="flex items-center gap-12 relative z-10">
                <div className="flex flex-col items-center gap-4">
                   <img src={MOCK_USER.avatar} className="w-14 h-14 rounded-2xl border-4 border-white shadow-md" alt="Me" />
                   <span className="label-sm text-slate-400">You</span>
                </div>
                
                <div className="flex flex-col items-center gap-4">
                   <div className="relative">
                      <img src={match.bridgeAvatar} className="w-20 h-20 rounded-[2rem] border-4 border-white shadow-xl" alt="Bridge" />
                      <div className="absolute -bottom-2 right-0 w-8 h-8 bg-emerald-500 text-white rounded-xl flex items-center justify-center text-[10px] shadow-lg"><i className="fas fa-link"></i></div>
                   </div>
                   <span className="text-[10px] font-black text-slate-900 uppercase">{match.bridgeName}</span>
                </div>

                <div className="flex flex-col items-center gap-4">
                   <img src={match.avatar} className="w-14 h-14 rounded-2xl border-4 border-slate-50 shadow-sm grayscale opacity-30" alt="Target" />
                   <span className="label-sm text-slate-300">{match.name.split(' ')[0]}</span>
                </div>
             </div>
             <button 
               onClick={() => onOpenInvite('verify', { name: match.bridgeName })}
               className="mt-8 px-6 py-2.5 bg-white border border-slate-200 rounded-xl label-sm text-slate-600 hover:text-slate-900 transition-all shadow-sm"
             >
               Verify this bridge <i className="fas fa-plus ml-1"></i>
             </button>
          </section>

          <section className="space-y-6">
             <div className="p-10 rounded-panel bg-slate-900 text-white shadow-2xl space-y-10">
                {loading ? (
                  <div className="space-y-6 animate-pulse">
                     <div className="h-4 bg-white/10 rounded-full w-24"></div>
                     <div className="h-20 bg-white/5 rounded-[2rem] w-full"></div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                       <p className="label-sm opacity-40">Intro Reasoning</p>
                       <p className="text-lg font-bold leading-tight">"{intel?.reasoning}"</p>
                    </div>

                    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 space-y-4">
                       <div className="flex items-center justify-between">
                         <p className="label-sm opacity-40">Script for {match.bridgeName}</p>
                         <button className="text-[9px] text-white hover:text-emerald-400 uppercase font-black tracking-widest">Copy</button>
                       </div>
                       <p className="text-sm font-medium italic leading-relaxed text-slate-300">"{intel?.magic_script}"</p>
                    </div>

                    <div className="space-y-4">
                       <p className="label-sm opacity-40">Timing Guidance</p>
                       <p className="text-sm font-bold text-emerald-400">{intel?.timing_guidance}</p>
                    </div>

                    <button className="w-full py-5 bg-white text-slate-900 rounded-btn font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-all">
                      Request Intro from {match.bridgeName}
                    </button>
                  </>
                )}
             </div>
          </section>

          <footer className="pt-10 pb-16 border-t border-slate-100 flex items-center justify-between opacity-50">
             <span className="label-sm">Privacy Verified</span>
             <i className="fas fa-shield-check text-emerald-500"></i>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default MatchDetailsPanel;
