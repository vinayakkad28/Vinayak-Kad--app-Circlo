
import React from 'react';
import { MatchProfile } from '../types';

interface WarmPathCardProps {
  match: MatchProfile;
  onSelect: () => void;
  onShare: () => void;
}

const WarmPathCard: React.FC<WarmPathCardProps> = ({ match, onSelect, onShare }) => {
  return (
    <div 
      className="group p-10 rounded-[3.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all space-y-8"
    >
      <div className="flex items-start justify-between">
        {/* Fix: Merged duplicate className attributes */}
        <div className="space-y-1 cursor-pointer" onClick={onSelect}>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">Best way to get introduced to {match.name}</h3>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Verified warm bridge found</p>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onShare(); }}
          className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <i className="fas fa-share-nodes"></i>
        </button>
      </div>

      {/* Human Readable Path */}
      {/* Fix: Merged duplicate className attributes */}
      <div className="flex items-center gap-4 py-5 px-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 cursor-pointer" onClick={onSelect}>
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-black text-[10px]">YOU</div>
           <i className="fas fa-chevron-right text-[10px] text-slate-300"></i>
           <div className="flex items-center gap-3">
              <img src={`https://picsum.photos/seed/${match.mutualFriends[0]}/100`} className="w-10 h-10 rounded-xl object-cover ring-2 ring-white dark:ring-slate-900 shadow-md" alt="Bridge" />
              <span className="font-black text-sm text-slate-700 dark:text-slate-300">{match.bridgeName}</span>
           </div>
           <i className="fas fa-chevron-right text-[10px] text-slate-300"></i>
           <div className="flex items-center gap-3">
              <img src={match.avatar} className="w-10 h-10 rounded-xl object-cover grayscale opacity-60" alt="Target" />
              <span className="font-bold text-sm text-slate-400">{match.name.split(' ')[0]}</span>
           </div>
        </div>
      </div>

      {/* The "Why" - Decision Intelligence */}
      {/* Fix: Merged duplicate className attributes */}
      <div className="space-y-4 cursor-pointer" onClick={onSelect}>
        <div className="flex items-center gap-2">
           <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Why this works</h5>
           <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
        </div>
        <p className="text-md font-bold text-slate-600 dark:text-slate-400 leading-relaxed">
          <span className="text-slate-900 dark:text-white">Based on what you've shared,</span> {match.pathExplanation.toLowerCase()}
          <br/>
          <span className="text-[11px] font-black text-slate-900 dark:text-white mt-2 inline-block">This is a high-trust, low-risk introduction path.</span>
        </p>
      </div>

      {/* Primary Action */}
      <div className="pt-2 flex items-center gap-3">
         <button 
           onClick={onSelect}
           className="flex-1 py-5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-[1.8rem] font-black text-xs uppercase tracking-[0.2em] group-hover:scale-[1.02] transition-all shadow-xl"
         >
           Ask {match.bridgeName} for intro
         </button>
         <button onClick={onSelect} className="w-16 h-16 rounded-full border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-300 hover:text-slate-900 transition-colors" title="See explanation">
           <i className="fas fa-circle-question text-xl"></i>
         </button>
      </div>
    </div>
  );
};

export default WarmPathCard;