
import React, { useState } from 'react';
import { User } from '../types';
// Corrected: IntentionMode is defined in types/index.ts
import { IntentionMode } from '../types/index';
import InsightCard from './InsightCard';

interface SettingsProps {
  user: User;
  onClose: () => void;
  onLogout: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  onOpenInvite: () => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onClose, onLogout, isDarkMode, setIsDarkMode, onOpenInvite }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'privacy'>('profile');

  const getPlatformIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'linkedin': return 'fa-linkedin';
      case 'instagram': return 'fa-instagram';
      case 'tiktok': return 'fa-tiktok';
      case 'snapchat': return 'fa-snapchat';
      case 'facebook': return 'fa-facebook';
      case 'x': return 'fa-x-twitter';
      default: return 'fa-link';
    }
  };

  const getPlatformColor = (name: string) => {
    switch (name.toLowerCase()) {
      case 'linkedin': return 'text-[#0077b5]';
      case 'instagram': return 'text-[#ee2a7b]';
      case 'snapchat': return 'text-[#fffc00]';
      case 'facebook': return 'text-[#1877f2]';
      default: return 'text-slate-600';
    }
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto animate-in slide-in-from-right duration-300 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-[#fcfaff]'}`}>
      <header className={`px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md ${isDarkMode ? 'bg-slate-950/80' : 'bg-[#fcfaff]/80'}`}>
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"><i className="fas fa-arrow-left"></i></button>
          <h2 className="text-2xl font-black">Account</h2>
        </div>
        <button onClick={onClose} className="px-6 py-2.5 rounded-2xl text-xs font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900">Done</button>
      </header>

      <main className="px-6 pb-32 max-w-2xl mx-auto space-y-8">
        <div className={`flex p-1.5 rounded-2xl gap-1 transition-colors ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
          <button onClick={() => setActiveTab('profile')} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'profile' ? 'bg-white shadow-sm text-slate-900 dark:bg-slate-800 dark:text-white' : 'text-slate-500'}`}>Profile</button>
          <button onClick={() => setActiveTab('privacy')} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'privacy' ? 'bg-white shadow-sm text-slate-900 dark:bg-slate-800 dark:text-white' : 'text-slate-500'}`}>Privacy Vault</button>
        </div>

        {activeTab === 'profile' ? (
          <div className="space-y-12 animate-in fade-in duration-500">
            <section className="text-center space-y-4">
              <div className="relative inline-block">
                <img src={user.avatar} className="w-32 h-32 rounded-[2.5rem] object-cover shadow-2xl ring-4 ring-white dark:ring-slate-900" alt="Avatar" />
                <button className="absolute -bottom-2 -right-2 bg-violet-600 text-white w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg"><i className="fas fa-camera"></i></button>
              </div>
              <div>
                <h3 className="text-2xl font-black">{user.name}</h3>
                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">{user.location}</p>
              </div>
            </section>

            <section className="space-y-6">
               <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] px-4">Network Reach</h4>
               <div onClick={onOpenInvite}>
                 <InsightCard isDarkMode={isDarkMode} />
               </div>
            </section>

            <section className={`p-6 rounded-[2.5rem] border-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
               <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Bio</h4>
               <textarea className={`w-full bg-transparent border-none p-0 focus:ring-0 text-sm font-medium resize-none leading-relaxed ${isDarkMode ? 'text-white' : 'text-slate-600'}`} defaultValue={user.bio} rows={3} />
            </section>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className={`p-8 rounded-[2.5rem] border-2 border-emerald-500/20 bg-emerald-500/5`}>
               <h4 className="text-emerald-500 font-black text-[10px] uppercase tracking-widest mb-4">The Circlo Promise</h4>
               <ul className="space-y-3 text-sm font-medium">
                  <li className="flex items-center gap-3"><i className="fas fa-shield-halved text-emerald-500"></i> No Surveillance</li>
                  <li className="flex items-center gap-3"><i className="fas fa-shield-halved text-emerald-500"></i> No Private Content Storage</li>
                  <li className="flex items-center gap-3"><i className="fas fa-shield-halved text-emerald-500"></i> Localized Graph Computation</li>
               </ul>
            </div>

            <section className="space-y-4">
               <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] px-4">Active Social Nodes</h4>
               <div className="space-y-3">
                 {user.platforms.map(p => (
                   <div key={p.name} className={`flex items-center justify-between p-4 rounded-3xl border-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                     <div className="flex items-center gap-4">
                       <div className={`w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center ${getPlatformColor(p.name)}`}>
                         <i className={`fab ${getPlatformIcon(p.name)} text-lg`}></i>
                       </div>
                       <div>
                         <p className="text-sm font-bold">{p.name}</p>
                         <p className={`text-[9px] font-black uppercase ${p.connected ? 'text-emerald-500' : 'text-slate-400'}`}>
                           {p.connected ? `Verified Bridge • Last Synced ${p.lastSynced}` : 'Not Connected'}
                         </p>
                       </div>
                     </div>
                     <button className={`text-[9px] font-black uppercase px-4 py-2 rounded-xl transition-all ${p.connected ? 'bg-red-500/10 text-red-500' : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'}`}>
                       {p.connected ? 'Revoke' : 'Connect'}
                     </button>
                   </div>
                 ))}
               </div>
            </section>

            <button onClick={onLogout} className="w-full py-5 rounded-[2rem] bg-red-500/10 text-red-500 font-black uppercase text-xs tracking-widest hover:bg-red-500 hover:text-white transition-all">Clear All Nodes & Delete Account</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Settings;
