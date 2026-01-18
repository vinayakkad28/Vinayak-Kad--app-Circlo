
import React, { useState, useEffect, useRef } from 'react';
import { storage } from './services/storageService';
import { matchingEngine } from './services/matchingEngine';
import { Page, Stack, Button, Card, Typography } from './components/design-system/Primitives';
import HeroView from './components/engine/HeroView';
import AuthView from './components/engine/AuthView';
import ConnectorsView from './components/engine/ConnectorsView';
import IntentLayer from './components/engine/IntentLayer';
import SignalLayer from './components/engine/SignalLayer';
import IntroductionView from './components/engine/IntroductionView';
import MessagesView from './components/engine/MessagesView';
import ProfileView from './components/engine/ProfileView';
import BottomNav from './components/shared/BottomNav';
import { ChatBot } from './components/engine/ChatBot';
import { CircloLiveSession } from './services/liveService';
import { User, IntentType, MatchProfile } from './types';
import { MOCK_USER } from './constants';

type ViewState = 'HERO' | 'AUTH' | 'CONNECT' | 'INTENT' | 'SIGNAL' | 'RESULT' | 'MESSAGES' | 'PROFILE';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HERO');
  const [user, setUser] = useState<User | null>(null);
  const [activeIntent, setActiveIntent] = useState<IntentType | null>(null);
  const [currentIntro, setCurrentIntro] = useState<MatchProfile | null>(null);
  
  // Live API Session
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [liveTranscription, setLiveTranscription] = useState<{ text: string, type: 'input' | 'output' }[]>([]);
  const liveSessionRef = useRef<CircloLiveSession | null>(null);

  useEffect(() => {
    const savedUser = storage.getUser();
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleStart = () => {
    setView('AUTH');
  };

  const handleAuthComplete = () => {
    const savedUser = storage.getUser() || MOCK_USER;
    storage.saveUser(savedUser);
    setUser(savedUser);
    setView('CONNECT');
  };

  const handleConnectComplete = () => {
    setView('INTENT');
  };

  const selectIntent = (intent: IntentType) => {
    setActiveIntent(intent);
    setView('SIGNAL');
  };

  const handleSignalSubmit = (context: string) => {
    const recommendation = matchingEngine.findRecommendation(activeIntent!, context);
    setCurrentIntro(recommendation);
    setView('RESULT');
  };

  const handleIntroAction = (intro: MatchProfile, script: string) => {
    storage.saveIntroRequest(intro, script);
    setView('MESSAGES');
  };

  const handleUpdateUser = (updatedUser: User) => {
    storage.saveUser(updatedUser);
    setUser(updatedUser);
  };

  const toggleLiveSession = async () => {
    if (isLiveActive) {
      liveSessionRef.current?.stop();
      setIsLiveActive(false);
      setLiveTranscription([]);
    } else {
      liveSessionRef.current = new CircloLiveSession();
      setIsLiveActive(true);
      try {
        await liveSessionRef.current.start((text, type) => {
          setLiveTranscription(prev => [...prev.slice(-4), { text, type }]);
        });
      } catch (err) {
        console.error("Live API failed", err);
        setIsLiveActive(false);
      }
    }
  };

  const renderView = () => {
    switch (view) {
      case 'HERO': return <HeroView onStart={handleStart} />;
      case 'AUTH': return <AuthView onComplete={handleAuthComplete} />;
      case 'CONNECT': return <ConnectorsView onComplete={handleConnectComplete} />;
      case 'INTENT': return <IntentLayer onSelect={selectIntent} />;
      case 'SIGNAL': return <SignalLayer intent={activeIntent!} onSubmit={handleSignalSubmit} />;
      case 'RESULT': return <IntroductionView intro={currentIntro!} onAction={handleIntroAction} onReset={() => setView('INTENT')} />;
      case 'MESSAGES': return <MessagesView />;
      case 'PROFILE': return (
        <ProfileView 
          user={user || MOCK_USER} 
          onUpdateUser={handleUpdateUser}
          onLogout={() => { storage.clearAll(); setView('HERO'); }} 
        />
      );
      default: return <HeroView onStart={handleStart} />;
    }
  };

  const showNav = !['HERO', 'AUTH', 'CONNECT', 'INTENT', 'SIGNAL'].includes(view);

  return (
    <Page className="max-w-md mx-auto relative overflow-hidden shadow-2xl border-x border-slate-900">
      <main className="flex-1 flex flex-col relative z-10">
        {renderView()}
      </main>

      {/* Real-time Live Audio UI Overlay */}
      {isLiveActive && (
        <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col p-10 animate-fade-in">
          <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8">
            <div className="w-32 h-32 rounded-full bg-indigo-600/20 flex items-center justify-center animate-pulse">
               <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center">
                 <i className="fas fa-microphone text-white text-2xl"></i>
               </div>
            </div>
            <Typography.Heading>Native Audio Active</Typography.Heading>
            <div className="w-full max-h-40 overflow-y-auto space-y-2 no-scrollbar">
              {liveTranscription.map((t, i) => (
                <div key={i} className={`text-[10px] font-black uppercase tracking-widest ${t.type === 'input' ? 'text-slate-500' : 'text-indigo-400'}`}>
                  {t.type === 'input' ? 'You: ' : 'Circlo: '}{t.text}
                </div>
              ))}
              {liveTranscription.length === 0 && <Typography.Body>Listening to your voice...</Typography.Body>}
            </div>
          </div>
          <Button onClick={toggleLiveSession} variant="primary" className="w-full">End Conversation</Button>
        </div>
      )}

      {showNav && (
        <>
          {/* Floating UI features */}
          <div className="fixed bottom-32 left-8 z-[100]">
             <button 
              onClick={toggleLiveSession}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl transition-all ${isLiveActive ? 'bg-rose-600 scale-95' : 'bg-indigo-600 hover:scale-105'}`}
            >
              <i className={`fas ${isLiveActive ? 'fa-microphone-slash' : 'fa-microphone-lines'}`}></i>
            </button>
          </div>
          <ChatBot />
          <BottomNav activeView={view} onViewChange={setView} />
        </>
      )}
    </Page>
  );
};

export default App;
