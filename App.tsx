
import React, { useState } from 'react';
import LoginScreen from './components/auth/LoginScreen';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import HomeScreen from './components/home/HomeScreen';
import ProfileScreen from './components/profile/ProfileScreen';
import MessagesScreen from './components/messages/MessagesScreen';
import InviteModal from './components/InviteModal';
import { User } from './types';
import { MOCK_USER } from './constants';

type AppView = 'login' | 'onboarding' | 'home' | 'messages' | 'profile';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('login');
  const [user, setUser] = useState<User | null>(null);
  const [inviteModal, setInviteModal] = useState<{ isOpen: boolean; type: 'path' | 'reach' | 'verify'; data?: any }>({
    isOpen: false,
    type: 'reach'
  });

  const handleLogin = () => {
    setUser(MOCK_USER);
    setView('onboarding');
  };

  const handleOnboardingComplete = () => {
    setView('home');
  };

  const openInvite = (type: 'path' | 'reach' | 'verify', data?: any) => {
    setInviteModal({ isOpen: true, type, data });
  };

  const renderView = () => {
    switch (view) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'onboarding':
        return <OnboardingFlow onComplete={handleOnboardingComplete} />;
      case 'home':
        return <HomeScreen onNavigate={(v) => setView(v as AppView)} onOpenInvite={openInvite} />;
      case 'messages':
        return <MessagesScreen onNavigate={(v) => setView(v as AppView)} />;
      case 'profile':
        return (
          <ProfileScreen 
            user={user!} 
            onNavigate={(v) => setView(v as AppView)} 
            onLogout={() => setView('login')} 
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
