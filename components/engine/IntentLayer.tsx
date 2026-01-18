
import React from 'react';
import { IntentType } from '../../types';

interface IntentLayerProps {
  onSelect: (intent: IntentType) => void;
}

const IntentLayer: React.FC<IntentLayerProps> = ({ onSelect }) => {
  const intents: { id: IntentType; label: string; sub: string; icon: string }[] = [
    { id: 'MEET_NEW', label: 'Meet someone new', sub: 'Expand your horizon', icon: 'fa-user-plus' },
    { id: 'FIND_PEOPLE', label: 'Find my people', sub: 'Shared values and goals', icon: 'fa-users' },
    { id: 'EXPLORE_GROUP', label: 'Explore a group', sub: 'Access new circles', icon: 'fa-layer-group' },
    { id: 'CONVERSATION', label: 'Start a conversation', sub: 'Deep, focused exchange', icon: 'fa-comment-dots' },
  ];

  return (
    <div className="flex-1 flex flex-col p-10 animate-fade-in">
      <header className="mb-16 mt-8 space-y-2">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Layer 01</span>
        <h2 className="text-4xl font-black tracking-tight text-white">What brings you to Circlo today?</h2>
      </header>

      <div className="space-y-4">
        {intents.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className="w-full p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 text-left transition-all group flex items-center justify-between"
          >
            <div className="space-y-1">
              <h3 className="font-black text-lg text-slate-100 group-hover:text-indigo-400 transition-colors">{item.label}</h3>
              <p className="text-slate-500 font-medium text-sm">{item.sub}</p>
            </div>
            <i className={`fas ${item.icon} text-slate-700 group-hover:text-indigo-500/50 text-xl transition-all`}></i>
          </button>
        ))}
      </div>
    </div>
  );
};

export default IntentLayer;
