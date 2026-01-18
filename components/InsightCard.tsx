
import React from 'react';

interface InsightCardProps {
  isDarkMode?: boolean;
}

const InsightCard: React.FC<InsightCardProps> = ({ isDarkMode = false }) => {
  return (
    <div className={`p-10 rounded-[4rem] shadow-2xl overflow-hidden relative group transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900 border border-slate-100'}`}>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-600/10 via-transparent to-emerald-500/10 opacity-50"></div>
      
      <div className="relative z-10 space-y-10">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center">
               <i className="fas fa-link text-sm"></i>
             </div>
             <span className="font-black tracking-tighter text-xl">Circlo</span>
           </div>
           <div className="px-4 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
             <span className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">Verified Reach</span>
           </div>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.4em]">Trust Network Score</p>
          <h2 className="text-6xl font-black tracking-tighter">98.4</h2>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Trust Nodes</span>
            <p className="text-2xl font-black">1,240</p>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Warm Paths</span>
            <p className="text-2xl font-black">4,800+</p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
           <div className="flex -space-x-3">
             {[1,2,3,4].map(i => (
               <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 overflow-hidden">
                 <img src={`https://picsum.photos/seed/face${i}/50`} className="w-full h-full object-cover" />
               </div>
             ))}
           </div>
           <span className="text-[10px] font-black uppercase text-slate-400">Join my trusted circle</span>
        </div>
      </div>
      
      <div className="absolute bottom-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg">
          <i className="fas fa-share-nodes"></i>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
