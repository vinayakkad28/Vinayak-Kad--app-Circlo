
import React, { useState } from 'react';
import { Stack, Button, Typography, Section, Input } from '../design-system/Primitives';
import { Logo } from '../brand/Logo';

interface AuthViewProps {
  onComplete: () => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onComplete }) => {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
  const [credentials, setCredentials] = useState({
    identifier: '',
    password: '',
    fullName: ''
  });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate authentication handshake with the vault
    setTimeout(() => {
      onComplete();
      setLoading(false);
    }, 1500);
  };

  const toggleMode = () => {
    setMode(prev => prev === 'LOGIN' ? 'SIGNUP' : 'LOGIN');
    setCredentials({ identifier: '', password: '', fullName: '' });
  };

  return (
    <Section className="flex-1 flex flex-col justify-center p-10 bg-black">
      <Stack gap={16}>
        <Stack gap={10} align="center">
          <Logo size="lg" className="text-white" />
          <div className="text-center space-y-4">
            <Typography.Heading className="text-4xl">
              {mode === 'LOGIN' ? 'Start your path.' : 'Create Node.'}
            </Typography.Heading>
            <Typography.Subheading className="max-w-[260px] mx-auto text-slate-500">
              {mode === 'LOGIN' 
                ? 'Access your private identity vault to continue.' 
                : 'Establish a new identity node on the trust graph.'}
            </Typography.Subheading>
          </div>
        </Stack>

        <form onSubmit={handleAuth}>
          <Stack gap={4}>
            {mode === 'SIGNUP' && (
              <Input 
                type="text"
                placeholder="Full Name"
                required
                value={credentials.fullName}
                onChange={(e) => setCredentials({...credentials, fullName: e.target.value})}
              />
            )}
            <Input 
              type="text"
              placeholder="Username or Email"
              required
              value={credentials.identifier}
              onChange={(e) => setCredentials({...credentials, identifier: e.target.value})}
            />
            <Input 
              type="password"
              placeholder="Password"
              required
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
            
            {mode === 'LOGIN' && (
              <div className="flex justify-end px-2">
                <button 
                  type="button"
                  className="text-[9px] font-black uppercase tracking-widest text-slate-600 hover:text-white transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <Button 
              isLoading={loading}
              className="mt-4 w-full h-20 shadow-[0_40px_80px_-20px_rgba(255,255,255,0.05)]"
            >
              {mode === 'LOGIN' ? 'Establish Connection' : 'Register Identity'}
            </Button>
          </Stack>
        </form>

        <Stack gap={6} align="center">
          <div className="flex items-center gap-3">
            <Typography.Meta className="text-slate-700">
              {mode === 'LOGIN' ? "New to the graph?" : "Already established?"}
            </Typography.Meta>
            <button 
              onClick={toggleMode}
              className="text-[10px] font-black uppercase tracking-widest text-white underline underline-offset-4 decoration-white/20 hover:decoration-white transition-all"
            >
              {mode === 'LOGIN' ? "Sign Up" : "Login"}
            </button>
          </div>
          
          <div className="px-8 mt-4">
            <Typography.Meta className="text-center opacity-10 leading-relaxed block normal-case tracking-normal text-[9px]">
              Circlo utilize zero-knowledge identification nodes. <br/>
              Your raw credentials are never indexed or persisted outside your local vault.
            </Typography.Meta>
          </div>
        </Stack>
      </Stack>
    </Section>
  );
};

export default AuthView;
