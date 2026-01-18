
import React, { useState, useEffect } from 'react';
import LoginScreen from './components/auth/LoginScreen';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import HomeScreen from './components/home/HomeScreen';
import ProfileScreen from './components/profile/ProfileScreen';
import MessagesScreen from './components/messages/MessagesScreen';
import InviteModal from './components/InviteModal';
import { User, MatchProfile } from './types';
import { storage } from './services/storageService';

type AppView = 'login' | 'onboarding' | 'home' | 'messages' | 'profile';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('login');
  const [user, setUser] = useState<User | null>(null);
  const [inviteModal, setInviteModal] = useState<{ isOpen: boolean; type: 'path' | 'reach' | 'verify'; data?: any }>({
    isOpen: false,
    type: 'reach'
  });

  useEffect(() => {
    const savedUser = storage.getUser();
    if (savedUser) {
      setUser(savedUser);
      // If user exists, skip login and go to home if onboarding was finished
      const synced = storage.getSyncedPlatforms();
      if (synced.length > 0) {
        setView('home');
      } else {
        setView('onboarding');
      }
    }
  }, []);

  const handleLogin = () => {
    // Initial mock user save
    const initialUser: User = {
      id: 'me',
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      bio: 'Product Designer in SF.',
      location: 'San Francisco, CA',
      trustScore: 88,
      platforms: []
    };
    storage.saveUser(initialUser);
    setUser(initialUser);
    setView('onboarding');
  };

  const handleOnboardingComplete = () => {
    setView('home');
  };

  const openInvite = (type: 'path' | 'reach' | 'verify', data?: any) => {
    setInviteModal({ isOpen: true, type, data });
  };

  const handleSendIntro = (match: MatchProfile, script: string) => {
    storage.saveIntroRequest(match, script);
    setView('messages');
  };

  const handleLogout = () => {
    storage.clearAll();
    setUser(null);
    setView('login');
  };

  const renderView = () => {
    switch (view) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'onboarding':
        return <OnboardingFlow onComplete={handleOnboardingComplete} />;
      case 'home':
        return <HomeScreen onNavigate={(v) => setView(v as AppView)} onOpenInvite={openInvite} onSendIntro={handleSendIntro} />;
      case 'messages':
        return <MessagesScreen onNavigate={(v) => setView(v as AppView)} />;
      case 'profile':
        return (
          <ProfileScreen 
            user={user!} 
            onNavigate={(v) => setView(v as AppView)} 
            onLogout={handleLogout} 
            onOpenInvite={openInvite}
          />
        );
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen max-w-lg mx-auto bg-[#FAFBFF] shadow-2xl overflow-hidden relative flex flex-col border-x border-slate-100">
      {renderView()}
      
      <InviteModal 
        isOpen={inviteModal.isOpen} 
        type={inviteModal.type} 
        data={inviteModal.data} 
        onClose={() => setInviteModal(prev => ({ ...prev, isOpen: false }))} 
      />
    </div>
  );
};

export default App;
