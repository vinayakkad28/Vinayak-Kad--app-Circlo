
import React from 'react';
import { User } from '../../types';

interface ProfileViewProps {
  user: User;
  onLogout: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onLogout }) => {
  return (
    <div className="flex-1 flex flex-col p-10 animate-fade-in overflow-y-auto no-scrollbar pb-32">
      <header className="mb-12 mt-8 space-y-2">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Vault</span>
        <h2 className="text-4xl font-black tracking-tight text-white">Circle.</h2>
      </header>

      <div className="space-y-12">
        <section className="text-center space-y-6 py-8 border-b border-slate-900">
          <div className="relative inline-block">
            <img src={user.avatar} className="w-32 h-32 rounded-[3rem] object-cover border-4 border-slate-900 shadow-2xl" alt="" />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg"><i className="fas fa-fingerprint"></i></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-white">{user.name}</h3>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">{user.role} • {user.location}</p>
          </div>
        </section>

        <section className="space-y-6">
          <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Introduction Philosophy</h4>
          <div className="p-10 rounded-[3rem] bg-indigo-500/5 border border-indigo-500/10 space-y-6">
             <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-indigo-400 shadow-xl">
               <i className="fas fa-brain text-xl"></i>
             </div>
             <div className="space-y-4">
                <h5 className="text-xl font-black text-white">Systems thinking over social noise.</h5>
                <p className="text-sm font-medium text-slate-400 leading-relaxed">
                  Circlo isn't a networking tool; it's a verification engine. We believe introductions should be outcomes of shared context and verified trust, not cold outreach. By prioritizing intent over identity, we preserve the highest signal-to-noise ratio in human connectivity.
                </p>
             </div>
             <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">— The Founder</p>
          </div>
        </section>

        <div className="space-y-4">
           <button className="w-full py-6 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between px-8 text-xs font-black uppercase tracking-widest text-slate-300">
             Export Trust Nodes <i className="fas fa-download opacity-30"></i>
           </button>
           <button onClick={onLogout} className="w-full py-6 bg-red-500/5 border border-red-500/10 rounded-2xl text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white transition-all">
             Revoke All Access & Clear Vault
           </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
