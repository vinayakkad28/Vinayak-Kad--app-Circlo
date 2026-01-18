
import React from 'react';
import { Stack, Typography, Section } from '../design-system/Primitives';
import { IntentType } from '../../types';

interface IntentLayerProps {
  onSelect: (intent: IntentType) => void;
}

const IntentLayer: React.FC<IntentLayerProps> = ({ onSelect }) => {
  const intents: { id: IntentType; label: string; sub: string; icon: string; color: string }[] = [
    { 
      id: 'ROMANTIC_SOUL', 
      label: 'Something real.', 
      sub: 'Dating with depth and verified intent.',
      icon: 'fa-heart',
      color: 'group-hover:text-rose-500' 
    },
    { 
      id: 'CASUAL_SPARK', 
      label: 'A casual spark.', 
      sub: 'Physical connection, low pressure, high trust.',
      icon: 'fa-fire',
      color: 'group-hover:text-orange-500' 
    },
    { 
      id: 'PEER_MIND', 
      label: 'A professional peer.', 
      sub: 'Builders, founders, and high-signal minds.',
      icon: 'fa-brain',
      color: 'group-hover:text-indigo-400' 
    },
    { 
      id: 'CREATIVE_ALLIED', 
      label: 'A creative ally.', 
      sub: 'Art, design, music, and collaborative chaos.',
      icon: 'fa-palette',
      color: 'group-hover:text-emerald-400' 
    },
  ];

  return (
    <Section className="flex-1 flex flex-col p-10 justify-center animate-fade-in">
      <Stack gap={16}>
        <Stack gap={3}>
          <Typography.Heading>
            What are we finding?
          </Typography.Heading>
          <Typography.Subheading>
            Be honest. Your intention is the filter.
          </Typography.Subheading>
        </Stack>

        <Stack gap={4}>
          {intents.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className="w-full p-8 rounded-[2.5rem] bg-slate-900/40 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-left transition-all group flex items-center justify-between active:scale-95"
            >
              <div className="space-y-1">
                <h3 className="font-black text-xl text-slate-100 transition-colors">
                  {item.label}
                </h3>
                <p className="text-xs font-medium text-slate-500">{item.sub}</p>
              </div>
              <div className={`w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center text-xl text-slate-700 transition-all ${item.color}`}>
                <i className={`fas ${item.icon}`}></i>
              </div>
            </button>
          ))}
        </Stack>
      </Stack>
    </Section>
  );
};

export default IntentLayer;
