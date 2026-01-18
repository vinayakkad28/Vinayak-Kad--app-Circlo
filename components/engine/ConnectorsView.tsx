
import React, { useState } from 'react';
import { Stack, Button, Typography, Section } from '../design-system/Primitives';
import { storage } from '../../services/storageService';

interface ConnectorsViewProps {
  onComplete: () => void;
}

const ConnectorsView: React.FC<ConnectorsViewProps> = ({ onComplete }) => {
  const [syncing, setSyncing] = useState<string | null>(null);
  const [connected, setConnected] = useState<string[]>(() => storage.getSyncedPlatforms());

  const platforms = [
    { id: 'linkedin', name: 'LinkedIn', icon: 'fa-linkedin', color: 'text-[#0077b5]' },
    { id: 'instagram', name: 'Instagram', icon: 'fa-instagram', color: 'text-[#e4405f]' },
    { id: 'google_contacts', name: 'Google Contacts', icon: 'fa-google', color: 'text-[#4285F4]' },
    { id: 'gmail', name: 'Gmail', icon: 'fa-envelope', color: 'text-[#EA4335]' },
    { id: 'x', name: 'X', icon: 'fa-x-twitter', color: 'text-white' },
    { id: 'phone_contacts', name: 'Phone Contacts', icon: 'fa-address-book', color: 'text-emerald-500' },
    { id: 'snapchat', name: 'Snapchat', icon: 'fa-snapchat', color: 'text-[#FFFC00]' },
    { id: 'whatsapp', name: 'WhatsApp', icon: 'fa-whatsapp', color: 'text-[#25D366]' },
    { id: 'facebook', name: 'Facebook', icon: 'fa-facebook', color: 'text-[#1877f2]' }
  ];

  const handleToggle = (id: string) => {
    if (connected.includes(id)) {
      const next = connected.filter(item => item !== id);
      setConnected(next);
      // In a real app, we'd persist the removal to the vault here
    } else {
      setSyncing(id);
      setTimeout(() => {
        setConnected([...connected, id]);
        setSyncing(null);
        storage.syncPlatform(id);
      }, 800);
    }
  };

  return (
    <Section className="flex-1 flex flex-col p-10 animate-fade-in overflow-y-auto no-scrollbar bg-black">
      <Stack gap={12} className="mt-8">
        <Stack gap={4}>
          <Typography.Heading className="text-4xl">Trusted Anchors.</Typography.Heading>
          <Typography.Subheading className="text-slate-500">
            Activate social signals to map your trust bridges. <br/>
            <span className="text-slate-700 text-[10px] font-black uppercase tracking-widest">End-to-end encrypted node verification</span>
          </Typography.Subheading>
        </Stack>

        <div className="space-y-3">
          {platforms.map((p) => {
            const isActive = connected.includes(p.id);
            const isSyncing = syncing === p.id;

            return (
              <div
                key={p.id}
                onClick={() => !isSyncing && handleToggle(p.id)}
                className={`p-6 rounded-[2.2rem] bg-[#080808] border transition-all flex items-center justify-between cursor-pointer group ${
                  isActive ? 'border-white/10 bg-white/[0.02]' : 'border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-2xl bg-black border border-white/5 flex items-center justify-center text-xl transition-transform group-active:scale-95 ${p.color}`}>
                    <i className={`fab ${p.icon}`}></i>
                  </div>
                  <div className="text-left">
                    <p className={`font-black tracking-tight text-sm ${isActive ? 'text-white' : 'text-slate-500'}`}>{p.name}</p>
                    <p className={`text-[8px] font-black uppercase tracking-[0.2em] ${isActive ? 'text-emerald-500' : 'text-slate-700'}`}>
                      {isActive ? 'Signal Active' : 'Bridge Locked'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  {isSyncing ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <div className={`w-12 h-6 rounded-full relative transition-colors duration-300 flex items-center px-1 ${isActive ? 'bg-white' : 'bg-white/5'}`}>
                      <div className={`w-4 h-4 rounded-full transition-transform duration-300 ${isActive ? 'translate-x-6 bg-black' : 'translate-x-0 bg-white/20'}`}></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <Stack gap={6} className="mt-8 pb-12">
          <Button 
            onClick={onComplete} 
            variant={connected.length > 0 ? 'primary' : 'secondary'}
            className="w-full h-20 shadow-[0_40px_80px_-20px_rgba(255,255,255,0.05)]"
          >
            {connected.length > 0 ? 'Sync Trust Graph' : 'Skip for now'}
          </Button>
          <div className="flex flex-col items-center gap-2 opacity-20">
            <Typography.Meta className="text-center text-[8px]">
              CIRCLO ZERO-KNOWLEDGE PROTOCOL V4.2
            </Typography.Meta>
            <div className="flex gap-2">
              <i className="fas fa-shield-check text-[10px]"></i>
              <i className="fas fa-lock text-[10px]"></i>
              <i className="fas fa-eye-slash text-[10px]"></i>
            </div>
          </div>
        </Stack>
      </Stack>
    </Section>
  );
};

export default ConnectorsView;
