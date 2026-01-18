
import React, { useState } from 'react';
import { Stack, Button, Typography, Section, Card } from '../design-system/Primitives';
import { Logo } from '../brand/Logo';

interface AuthViewProps {
  onComplete: () => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onComplete }) => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSocialAuth = (platform: string) => {
    setLoading(platform);
    // Simulate OAuth handshake
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <Section className="flex-1 flex flex-col justify-center p-10 animate-fade-in">
      <Stack gap={16}>
        <Stack gap={4} align="center">
          <Logo size="lg" />
          <Typography.Heading className="text-center">Start your path.</Typography.Heading>
          <Typography.Subheading className="text-center">Connect your primary social node to build your trust graph.</Typography.Subheading>
        </Stack>

        <Stack gap={4}>
          <button 
            onClick={() => handleSocialAuth('instagram')}
            disabled={!!loading}
            className="w-full py-6 flex items-center justify-between px-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-[2rem] text-sm font-black uppercase tracking-widest text-white shadow-xl hover:scale-[1.02] active:scale-95 transition-all group"
          >
            <div className="flex items-center gap-4">
              <i className="fab fa-instagram text-2xl"></i>
              <span>Connect Instagram</span>
            </div>
            {loading === 'instagram' ? <i className="fas fa-circle-notch animate-spin"></i> : <i className="fas fa-chevron-right opacity-30 group-hover:opacity-100"></i>}
          </button>

          <button 
            onClick={() => handleSocialAuth('facebook')}
            disabled={!!loading}
            className="w-full py-6 flex items-center justify-between px-8 bg-[#1877f2] rounded-[2rem] text-sm font-black uppercase tracking-widest text-white shadow-xl hover:scale-[1.02] active:scale-95 transition-all group"
          >
            <div className="flex items-center gap-4">
              <i className="fab fa-facebook text-2xl"></i>
              <span>Connect Facebook</span>
            </div>
            {loading === 'facebook' ? <i className="fas fa-circle-notch animate-spin"></i> : <i className="fas fa-chevron-right opacity-30 group-hover:opacity-100"></i>}
          </button>
        </Stack>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-900"></div></div>
          <div className="relative flex justify-center text-[8px] uppercase font-black tracking-[0.3em] text-slate-700 bg-slate-950 px-4">Secure Identity Vault</div>
        </div>

        <Stack gap={6}>
          <button 
            onClick={() => handleSocialAuth('google')}
            disabled={!!loading}
            className="w-full py-5 flex items-center justify-center gap-3 bg-slate-900 border border-slate-800 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all text-slate-400"
          >
            <i className="fab fa-google"></i>
            Continue with Google
          </button>
          
          <Typography.Meta className="text-center opacity-30 px-6 leading-relaxed">
            Circlo uses zero-knowledge mapping. <br/>We never store your social credentials or private content.
          </Typography.Meta>
        </Stack>
      </Stack>
    </Section>
  );
};

export default AuthView;
