
import React, { useState, useMemo } from 'react';
// Corrected: MOCK_MATCHES is exported from utils/constants.ts
import { MOCK_MATCHES } from '../../utils/constants';
import { MOCK_USER } from '../../constants';
import WarmPathCard from '../WarmPathCard';
import MatchDetails from '../MatchDetails';
import BottomNav from '../shared/BottomNav';
import SocialTree from '../SocialTree';
import { MatchProfile } from '../../types';
// Corrected: IntentionMode is defined in types/index.ts
import { IntentionMode } from '../../types/index';

interface HomeScreenProps {
  onNavigate: (v: string) => void;
  onOpenInvite: (type: 'path' | 'reach' | 'verify', data?: any) => void;
  onSendIntro: (match: MatchProfile, script: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onOpenInvite, onSendIntro }) => {
  const [query, setQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'graph'>('list');
  const [activeIntention, setActiveIntention] = useState<IntentionMode>('Dating');
  const [selectedMatch, setSelectedMatch] = useState<MatchProfile | null>(null);

  const filteredMatches = useMemo(() => {
    const q = query.toLowerCase();
    // Casting MOCK_MATCHES to any[] to handle type discrepancies between file-local types and actual exported data
    return (MOCK_MATCHES as any[]).filter(m => {
      const matchesQuery = q ? (
        m.name.toLowerCase().includes(q) || 
        m.bio.toLowerCase().includes(q) ||
        (m.interests && m.interests.some((i: string) => i.toLowerCase().includes(q)))
      ) : true;
      const matchesIntention = m.intentions.includes(activeIntention as any);
      return matchesQuery && matchesIntention;
    }).slice(0, 20); // Show top 20 for performance
  }, [query, activeIntention]);

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden bg-[#FAFBFF]">
      <header className="px-8 pt-16 pb-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95">
            <i className="fas fa-link text-white text-sm"></i>
          </div>
          <div className="flex bg-slate-200/50 p-1.5 rounded-2xl backdrop-blur-sm">
             <button onClick={() => setViewMode('list')} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}>List</button>
             <button onClick={() => setViewMode('graph')} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${viewMode === 'graph' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}>Map</button>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button onClick={() => onOpenInvite('reach')} className="w-11 h-11 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 shadow-sm transition-all hover:text-slate-900 active:scale-90"><i className="fas fa-share-nodes"></i></button>
           <button onClick={() => onNavigate('profile')} className="w-11 h-11 rounded-full border-2 border-white shadow-md overflow-hidden transition-all hover:ring-2 hover:ring-slate-100 active:scale-90"><img src={MOCK_USER.avatar} className="w-full h-full object-cover" alt="Me" /></button>
        </div>
      </header>

      <main className="flex-1 relative overflow-hidden flex flex-col">
        {viewMode === 'graph' ? (
          <div className="flex-1 p-6 pb-40">
            <SocialTree 
              onNodeClick={(id) => {
                const match = (MOCK_MATCHES as any[]).find(m => m.id === id);
                if (match) setSelectedMatch(match as MatchProfile);
              }} 
              activeMode={activeIntention} 
            />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-8 pb-40 no-scrollbar">
            <div className="space-y-10 py-6">
              <div className="space-y-5">
                <h1 className="text-4xl font-black tracking-tighter leading-none text-slate-900">Your warm <br/>connections.</h1>
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="Search roles, companies, or bridges..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full py-7 px-10 rounded-card bg-white border border-slate-100 focus:border-slate-900 transition-all font-bold text-lg shadow-xl outline-none"
                  />
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors">
                    <i className="fas fa-search text-xl"></i>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {['Dating', 'Business', 'Community', 'Friendship'].map((m) => (
                  <button 
                    key={m}
                    onClick={() => setActiveIntention(m as IntentionMode)}
                    className={`px-6 py-3 rounded-2xl whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all ${activeIntention === m ? 'bg-slate-900 text-white shadow-lg scale-105' : 'bg-white text-slate-400 border border-slate-100 hover:border-slate-200'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              <div className="space-y-8">
                <div className="flex items-center justify-between px-2">
                  <h3 className="label-sm text-slate-400">Trusted {activeIntention} Paths ({(MOCK_MATCHES as any[]).filter(m => m.intentions.includes(activeIntention as any)).length})</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">AI Paths Syncing</span>
                  </div>
                </div>
                
                <div className="space-y-10">
                  {filteredMatches.length > 0 ? (
                    filteredMatches.map(match => (
                      <WarmPathCard 
                        key={match.id} 
                        match={match as any} 
                        onSelect={() => setSelectedMatch(match as any)}
                        onShare={() => onOpenInvite('path', match)}
                      />
                    ))
                  ) : (
                    <div className="py-20 text-center space-y-4 opacity-30">
                      <i className="fas fa-radar text-4xl"></i>
                      <p className="label-sm">No paths found for this search</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <BottomNav activeView="home" onViewChange={onNavigate} />

      {selectedMatch && (
        <MatchDetails 
          match={selectedMatch} 
          user={MOCK_USER}
          onClose={() => setSelectedMatch(null)} 
          onSendMessage={(id, msg) => {
            onSendIntro(selectedMatch, msg);
            setSelectedMatch(null);
          }}
        />
      )}
    </div>
  );
};

export default HomeScreen;
