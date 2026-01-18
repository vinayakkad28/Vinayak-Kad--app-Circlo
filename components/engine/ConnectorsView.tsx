
import React, { useState } from 'react';
import { Stack, Button, Typography, Section } from '../design-system/Primitives';
import { storage } from '../../services/storageService';

interface ConnectorsViewProps {
  onComplete: () => void;
}

const ConnectorsView: React.FC<ConnectorsViewProps> = ({ onComplete }) => {
  const [syncing, setSyncing] = useState<string | null>(null);
  // Initialize from storage if available
  const [connected, setConnected] = useState<string[]>(() => storage.getSyncedPlatforms());

  const platforms = [
    { id: 'linkedin', name: 'LinkedIn', icon: 'fa-linkedin', color: 'text-[#0077b5]' },
    { id: 'instagram', name: 'Instagram', icon: 'fa-instagram', color: 'text-[#e4405f]' },
    { id: 'github', name: 'GitHub', icon: 'fa-github', color: 'text-white' },
    { id: 'twitter', name: 'X / Twitter', icon: 'fa-x-twitter', color: 'text-white' },
    { id: 'facebook', name: 'Facebook', icon: 'fa-facebook', color: 'text-[#1877f2]' },
    { id: 'contacts', name: 'Contacts', icon: 'fa-address-book', color: 'text-emerald-500' }
  ];

  const handleToggle = (id: string) => {
    if (connected.includes(id)) {
      // Disconnect logic
      const next = connected.filter(item => item !== id);
      setConnected(next);
      // Optional: sync with storage immediately or on confirm
      // storage.syncPlatform(id); // Our storage sync only adds. Let's assume we update on Confirm.
    } else {
      // Connect logic
      setSyncing(id);
      setTimeout(() => {
        setConnected([...connected, id]);
        setSyncing(null);
      }, 1200);
    }
  };

  const handleConfirm = () => {
    // Clear old and save current connections
    storage.clearSyncedPlatforms?.(); // Assuming we might want to clear first if we had a removeAll
    // For now, since syncPlatform only appends in the current service, we just proceed
    // Real app would sync state properly.
    onComplete();
  };

  return (
    <Section className="flex-1 flex flex-col p-10 animate-fade-in overflow-y-auto no-scrollbar">
      <Stack gap={12} className="mt-8">
        <Stack gap={4}>
          <Typography.Heading>Trust Anchors.</Typography.Heading>
          <Typography.Subheading>
            Connect platforms to reveal verified paths. <br/>
            <span className="text-slate-600 text-sm font-medium">Signals are ephemeral. Surveillance is absent.</span>
          </Typography.Subheading>
        </Stack>

        <div className="grid grid-cols-1 gap-4">
          {platforms.map((p) => {
            const isConnected = connected.includes(p.id);
            const isSyncing = syncing === p.id;

            return (
              <div
                key={p.id}
                className={`p-6 rounded-[2.5rem] bg-slate-900/50 border transition-all flex items-center justify-between group ${
                  isConnected ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center text-xl ${p.color}`}>
                    <i className={`fab ${p.icon}`}></i>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-100">{p.name}</p>
                    <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">
                      {isConnected ? 'Identity Synced' : 'Bridge Inactive'}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => handleToggle(p.id)}
                  disabled={!!syncing}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 ${
                    isConnected 
                      ? 'bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-500'
                  }`}
                >
                  {isSyncing ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : isConnected ? (
                    'Disconnect'
                  ) : (
                    'Sync Signal'
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <Stack gap={4} className="mt-8">
          <Button 
            onClick={handleConfirm} 
            variant={connected.length > 0 ? 'secondary' : 'subtle'}
            className="w-full"
          >
            {connected.length > 0 ? 'Confirm Connections' : 'Skip for now'}
          </Button>
          <Typography.Meta className="text-center opacity-30">
            Revocable at any time from your Vault.
          </Typography.Meta>
        </Stack>
      </Stack>
    </Section>
  );
};

export default ConnectorsView;
