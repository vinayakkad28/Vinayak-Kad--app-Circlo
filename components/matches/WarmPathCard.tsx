
import React from 'react';
import { MatchProfile } from '../../types';

interface WarmPathCardProps {
  match: MatchProfile;
  onSelect: () => void;
  onShare: () => void;
}

const WarmPathCard: React.FC<WarmPathCardProps> = ({ match, onSelect, onShare }) => {
  return (
    <div 
      className="p-8 rounded-panel bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer space-y-6 group"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1" onClick={onSelect}>
          <h3 className="text-xl font-black text-slate-900 leading-tight">Meet {match.name}</h3>
          <p className="label-sm text-slate-400">Warm introduction found</p>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onShare(); }}
          className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
        >
          <i className="fas fa-share-nodes"></i>
        </button>
      </div>

      <div className="flex items-center gap-3 py-4 px-6 bg-slate-50 rounded-[2rem] border border-slate-100" onClick={onSelect}>
         <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-black text-[8px] shrink-0">YOU</div>
         <i className="fas fa-chevron-right text-[8px] text-slate-300"></i>
         <div className="flex items-center gap-2 shrink-0">
            <img src={match.bridgeAvatar} className="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-md" alt="Bridge" />
            <span className="font-black text-xs text-slate-900">{match.bridgeName}</span>
         </div>
         <i className="fas fa-chevron-right text-[8px] text-slate-300"></i>
         <div className="flex items-center gap-2 overflow-hidden">
            <img src={match.avatar} className="w-8 h-8 rounded-lg object-cover grayscale opacity-40 shrink-0" alt="Target" />
            <span className="font-bold text-xs text-slate-300 truncate">{match.name.split(' ')[0]}</span>
         </div>
      </div>

      <div className="space-y-2" onClick={onSelect}>
        <p className="text-sm font-bold text-slate-600 leading-relaxed">
          {match.pathExplanation}
        </p>
        <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest">
          <i className="fas fa-shield-check"></i> High Trust Bridge
        </div>
      </div>

      <button onClick={onSelect} className="w-full py-4 bg-slate-900 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-lg group-hover:scale-[1.02] transition-all">
        Ask {match.bridgeName} for intro
      </button>
    </div>
  );
};

export default WarmPathCard;
