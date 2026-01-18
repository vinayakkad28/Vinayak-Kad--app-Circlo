
import React, { useState } from 'react';
import { User } from '../../types';
import BottomNav from '../shared/BottomNav';
import InsightCard from '../InsightCard';

interface ProfileScreenProps {
  user: User;
  onNavigate: (v: string) => void;
  onLogout: () => void;
  onOpenInvite: (type: 'path' | 'reach' | 'verify', data?: any) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onNavigate, onLogout, onOpenInvite }) => {
  const [tab, setTab] = useState<'network' | 'privacy'>('network');

  return (
    <div className="h-screen flex flex-col bg-[#FAFBFF]">
      <header className="px-8 pt-16 pb-6 flex items-center justify-between">
        <h2 className="heading-lg">Circle Vault</h2>
        <button onClick={onLogout} className="text-red-500 font-black label-sm">Logout</button>
      </header>

      <main className="flex-1 overflow-y-auto px-8 pb-32 no-scrollbar">
        <div className="space-y-12">
          {/* Hero Profile */}
          <div className="text-center space-y-6">
            <div className="relative inline-block group">
              <img src={user.avatar} className="w-32 h-32 rounded-panel object-cover shadow-2xl border-4 border-white transition-transform group-hover:scale-105" alt="Me" />
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg">
                <i className="fas fa-fingerprint text-xl"></i>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-black">{user.name}</h3>
              <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-1">{user.location}</p>
            </div>
          </div>

          <div className="flex p-1.5 bg-slate-100 rounded-btn">
            <button onClick={() => setTab('network')} className={`flex-1 py-3 rounded-2xl text-xs font-black transition-all ${tab === 'network' ? 'bg-white shadow-sm' : 'text-slate-400'}`}>Network Reach</button>
            <button onClick={() => setTab('privacy')} className={`flex-1 py-3 rounded-2xl text-xs font-black transition-all ${tab === 'privacy' ? 'bg-white shadow-sm' : 'text-slate-400'}`}>Privacy Ledger</button>
          </div>

          {tab === 'network' ? (
            <div className="space-y-8 animate-slide-in">
              <div onClick={() => onOpenInvite('reach')}>
                <InsightCard />
              </div>

              <div className="space-y-4">
                <p className="label-sm text-slate-400">Connected Nodes</p>
                {user.platforms.map(p => (
                  <div key={p.name} className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-card shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                        <i className={`fab fa-${p.name.toLowerCase()} text-slate-400`}></i>
                      </div>
                      <div>
                        <p className="font-bold text-sm capitalize">{p.name}</p>
                        <p className="label-sm text-[8px] text-emerald-500">Synced {p.lastSynced}</p>
                      </div>
                    </div>
                    <button className="text-red-400 label-sm">Revoke</button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-slide-in">
               <div className="p-8 bg-emerald-500/5 border-2 border-dashed border-emerald-500/20 rounded-panel text-center space-y-4">
                 <i className="fas fa-shield-check text-4xl text-emerald-500"></i>
                 <h4 className="font-black text-slate-900">Privacy First Ledger</h4>
                 <p className="text-sm text-slate-500 leading-relaxed">Circlo uses zero-knowledge identifiers to map bridges. We never store raw contact lists or message contents on our cloud servers.</p>
               </div>
               <div className="space-y-4">
                  <button className="w-full py-5 bg-white border border-slate-100 rounded-card flex items-center justify-between px-8 label-sm text-slate-900 font-black">
                     Download Network Export <i className="fas fa-download opacity-30"></i>
                  </button>
                  <button className="w-full py-5 bg-white border border-slate-100 rounded-card flex items-center justify-between px-8 label-sm text-slate-900 font-black">
                     Delete Local Graph <i className="fas fa-trash-can opacity-30"></i>
                  </button>
               </div>
            </div>
          )}
        </div>
      </main>

      <BottomNav active="profile" onNavigate={onNavigate} />
    </div>
  );
};

export default ProfileScreen;
