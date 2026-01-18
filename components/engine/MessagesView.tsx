
import React, { useMemo } from 'react';
import { storage } from '../../services/storageService';

const MessagesView: React.FC = () => {
  const requests = useMemo(() => storage.getIntroRequests(), []);

  return (
    <div className="flex-1 flex flex-col p-10 animate-fade-in overflow-y-auto no-scrollbar pb-32">
      <header className="mb-12 mt-8 space-y-2">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Ledger</span>
        <h2 className="text-4xl font-black tracking-tight text-white">Introductions.</h2>
      </header>

      <div className="space-y-4">
        {requests.length > 0 ? (
          requests.map((r) => (
            <div key={r.id} className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 flex items-center gap-6 group hover:border-indigo-500/30 transition-all cursor-pointer">
              <img src={r.matchAvatar} className="w-16 h-16 rounded-2xl object-cover shadow-lg" alt="" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-black text-white">{r.matchName}</h4>
                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Active Path</span>
                </div>
                <p className="text-xs text-slate-500 truncate italic">"{r.lastMessage}"</p>
              </div>
            </div>
          ))
        ) : (
          <div className="py-32 text-center space-y-6 opacity-20">
            <i className="fas fa-inbox text-5xl"></i>
            <p className="text-[10px] font-black uppercase tracking-widest">Introduction ledger is empty.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesView;
