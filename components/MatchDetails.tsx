
import React, { useState, useEffect } from 'react';
import { MatchProfile, User, IntroIntelligence } from '../types';
import { getIntroIntelligence } from '../services/geminiService';

interface MatchDetailsProps {
  match: MatchProfile;
  user: User;
  onClose: () => void;
  onSendMessage: (matchId: string, message: string) => void;
}

const MatchDetails: React.FC<MatchDetailsProps> = ({ match, user, onClose, onSendMessage }) => {
  const [intel, setIntel] = useState<IntroIntelligence | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getIntroIntelligence(user, match);
      setIntel(data);
      setLoading(false);
    }
    load();
  }, [match, user]);

  const safetyColor = intel?.safety_status === 'Green' ? 'text-emerald-500' : 
                      intel?.safety_status === 'Amber' ? 'text-orange-500' : 'text-red-500';

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl animate-in slide-in-from-right duration-500 overflow-y-auto no-scrollbar flex flex-col">
        <header className="sticky top-0 z-20 px-10 pt-16 pb-6 flex items-center justify-between bg-white/90 backdrop-blur-xl border-b border-slate-50">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-lg"><i className="fas fa-fingerprint text-[10px]"></i></div>
             <div>
               <h3 className="text-xl font-black">Bridge Intel</h3>
               <p className="label-sm text-slate-400">Contextual Verification active</p>
             </div>
           </div>
           <button onClick={onClose} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors"><i className="fas fa-times"></i></button>
        </header>

        <div className="p-10 space-y-12">
          {/* Path Header */}
          <section className="flex flex-col items-center py-10 bg-slate-50 rounded-panel border border-slate-100 relative overflow-hidden">
             <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 border-t-2 border-dashed border-slate-200 mx-10 opacity-30"></div>
             <div className="flex items-center gap-12 relative z-10">
                <div className="flex flex-col items-center gap-4">
                   <img src={user.avatar} className="w-14 h-14 rounded-2xl border-4 border-white shadow-md" alt="Me" />
                   <span className="label-sm text-slate-300">You</span>
                </div>
                
                <div className="flex flex-col items-center gap-4">
                   <div className="relative group">
                      <img src={match.bridgeAvatar} className="w-24 h-24 rounded-[2.5rem] border-4 border-white shadow-xl transition-transform group-hover:scale-105" alt="Bridge" />
                      <div className="absolute -bottom-2 right-0 w-8 h-8 bg-slate-900 text-white rounded-xl flex items-center justify-center text-[10px] shadow-lg"><i className="fas fa-link"></i></div>
                   </div>
                   <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">{match.bridgeName}</span>
                </div>

                <div className="flex flex-col items-center gap-4">
                   <img src={match.avatar} className="w-14 h-14 rounded-2xl border-4 border-slate-50 shadow-sm grayscale opacity-30" alt="Target" />
                   <span className="label-sm text-slate-300">{match.name.split(' ')[0]}</span>
                </div>
             </div>
             <p className="mt-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Verified path via shared professional tree</p>
          </section>

          <section className="space-y-8">
             <div className="p-10 rounded-panel bg-slate-900 text-white shadow-2xl space-y-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <i className="fas fa-brain text-6xl"></i>
                </div>

                {loading ? (
                  <div className="space-y-6 animate-pulse">
                     <div className="h-4 bg-white/10 rounded-full w-24"></div>
                     <div className="h-20 bg-white/5 rounded-3xl w-full"></div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                       <p className="label-sm opacity-40">Logical Reasoning</p>
                       <p className="text-xl font-bold leading-tight">"{intel?.reasoning}"</p>
                    </div>

                    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 space-y-4">
                       <div className="flex items-center justify-between">
                         <p className="label-sm opacity-40">Bridge Magic Script</p>
                         <button 
                           onClick={() => navigator.clipboard.writeText(intel?.magic_script || '')}
                           className="text-[10px] text-emerald-400 hover:text-white uppercase font-black tracking-widest transition-colors"
                         >
                           Copy
                         </button>
                       </div>
                       <p className="text-md font-medium italic leading-relaxed text-slate-300">"{intel?.magic_script}"</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-6 rounded-[1.5rem] bg-white/5 border border-white/5 space-y-2">
                          <p className="label-sm opacity-40">Timing</p>
                          <p className="text-xs font-bold text-slate-100">{intel?.timing_guidance}</p>
                       </div>
                       <div className="p-6 rounded-[1.5rem] bg-white/5 border border-white/5 space-y-2">
                          <p className="label-sm opacity-40">Safety Check</p>
                          <p className={`text-xs font-bold ${safetyColor}`}>{intel?.safety_check}</p>
                       </div>
                    </div>

                    <button 
                      onClick={() => onSendMessage(match.id, intel?.magic_script || '')}
                      className="w-full py-6 bg-white text-slate-900 rounded-btn font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] transition-all"
                    >
                      Request Intro from {match.bridgeName}
                    </button>
                  </>
                )}
             </div>
          </section>

          <footer className="pt-10 pb-20 border-t border-slate-100 space-y-6">
             <div className="flex items-center justify-between">
                <h4 className="label-sm text-slate-400">Privacy Transparency</h4>
                <i className="fas fa-shield-check text-emerald-500"></i>
             </div>
             <p className="text-xs text-slate-500 leading-relaxed">
               Circlo mapped this path using zero-knowledge IDs. {match.bridgeName} is your verified anchor point. We never reveal your name or bio to {match.name} unless {match.bridgeName} accepts the request.
             </p>
             <button className="text-[10px] font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest underline decoration-dashed">Why am I seeing this match?</button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
