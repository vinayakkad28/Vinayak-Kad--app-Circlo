
import React, { useState } from 'react';
import { Stack, Button, Typography, Section, Card } from '../design-system/Primitives';
import { Logo } from '../brand/Logo';

interface AuthViewProps {
  onComplete: () => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onComplete }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  return (
    <Section className="flex-1 flex flex-col justify-center p-10 animate-fade-in">
      <Stack gap={16}>
        <Stack gap={4} align="center">
          <Logo size="lg" />
          <Typography.Heading className="text-center">Welcome.</Typography.Heading>
          <Typography.Subheading className="text-center">Your private path begins here.</Typography.Subheading>
        </Stack>

        <Card variant="surface" className="p-8">
          <Stack gap={6}>
            <div className="space-y-4">
              <input 
                type="email" 
                placeholder="Email address"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-5 text-sm font-bold text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700"
              />
              <input 
                type="password" 
                placeholder="Password"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-5 text-sm font-bold text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700"
              />
            </div>
            <Button onClick={handleLogin} disabled={loading} className="w-full">
              {loading ? 'Securing Vault...' : 'Enter the Circle'}
            </Button>
          </Stack>
        </Card>

        <Stack gap={4}>
          <button 
            onClick={handleLogin}
            className="w-full py-5 flex items-center justify-center gap-3 bg-slate-900 border border-slate-800 rounded-3xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all"
          >
            <i className="fab fa-google opacity-50"></i>
            Continue with Google
          </button>
          
          <Typography.Meta className="text-center opacity-30 px-6 leading-relaxed">
            By continuing, you agree to our trust-first privacy philosophy.
          </Typography.Meta>
        </Stack>
      </Stack>
    </Section>
  );
};

export default AuthView;
