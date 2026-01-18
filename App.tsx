
import React, { useState, useEffect } from 'react';
import { storage } from './services/storageService';
import HeroView from './components/engine/HeroView';
import IntentLayer from './components/engine/IntentLayer';
import SignalLayer from './components/engine/SignalLayer';
import IntroductionView from './components/engine/IntroductionView';
import MessagesView from './components/engine/MessagesView';
import ProfileView from './components/engine/ProfileView';
import BottomNav from './components/shared/BottomNav';
import { User, IntentType, MatchProfile } from './types';

type ViewState = 'HERO' | 'INTENT' | 'SIGNAL' | 'RESULT' | 'MESSAGES' | 'PROFILE';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HERO');
  const [user, setUser] = useState<User | null>(null);
  const [activeIntent, setActiveIntent] = useState<IntentType | null>(null);
  const [currentIntro, setCurrentIntro] = useState<MatchProfile | null>(null);

  useEffect(() => {
    const savedUser = storage.getUser();
    if (savedUser) {
      setUser(savedUser);
      // If user exists, go straight to engine if not on hero
    }
  }, []);

  const handleStart = () => {
    const initialUser = {
      id: 'me',
      name: 'Alex Johnson',
      role: 'Product Designer',
      avatar: 'https://i.pravatar.cc/150?u=me',
      bio: 'Exploring systems of human connection.',
      location: 'SF / Remote',
      trustScore: 92
    };
    storage.saveUser(initialUser);
    setUser(initialUser);
    setView('INTENT');
  };

  const selectIntent = (intent: IntentType) => {
    setActiveIntent(intent);
    setView('SIGNAL');
  };

  const handleSignalSubmit = (intro: MatchProfile) => {
    setCurrentIntro(intro);
    setView('RESULT');
  };

  const handleIntroAction = (intro: MatchProfile, script: string) => {
    storage.saveIntroRequest(intro, script);
    setView('MESSAGES');
  };

  const renderView = () => {
    switch (view) {
      case 'HERO': return <HeroView onStart={handleStart} />;
      case 'INTENT': return <IntentLayer onSelect={selectIntent} />;
      case 'SIGNAL': return <SignalLayer intent={activeIntent!} onSubmit={handleSignalSubmit} />;
      case 'RESULT': return <IntroductionView intro={currentIntro!} onAction={handleIntroAction} onReset={() => setView('INTENT')} />;
      case 'MESSAGES': return <MessagesView />;
      case 'PROFILE': return <ProfileView user={user!} onLogout={() => { storage.clearAll(); setView('HERO'); }} />;
      default: return <HeroView onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen max-w-lg mx-auto bg-slate-950 shadow-2xl overflow-hidden relative flex flex-col border-x border-slate-900 selection:bg-indigo-500/30">
      <main className="flex-1 flex flex-col">
        {renderView()}
      </main>
      {view !== 'HERO' && view !== 'INTENT' && view !== 'SIGNAL' && (
        <BottomNav activeView={view} onViewChange={setView} />
      )}
    </div>
  );
};

export default App;
