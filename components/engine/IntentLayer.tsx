
import React from 'react';
import { IntentType } from '../../types';

interface IntentLayerProps {
  onSelect: (intent: IntentType) => void;
}

const IntentLayer: React.FC<IntentLayerProps> = ({ onSelect }) => {
  const intents: { id: IntentType; label: string; icon: string }[] = [
    { id: 'NEW_PEER', label: 'A new professional peer', icon: 'fa-user-plus' },
    { id: 'BUILDER_CIRCLE', label: 'A circle of builders', icon: 'fa-users' },
    { id: 'MEANINGFUL_CONVO', label: 'A conversation that matters', icon: 'fa-comment-dots' },
    { id: 'EXPLORE_NEW', label: 'Something entirely new', icon: 'fa-compass' },
  ];

  return (
    <div className="flex-1 flex flex-col p-12 animate-fade-in max-w-sm mx-auto justify-center">
      <header className="mb-20 space-y-4">
        <h2 className="text-4xl font-black tracking-tight text-white leading-tight">
          What kind of connection are you looking for today?
        </h2>
      </header>

      <div className="space-y-4">
        {intents.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className="w-full p-8 rounded-[2rem] bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 text-left transition-all group flex items-center justify-between"
          >
            <h3 className="font-bold text-lg text-slate-100 group-hover:text-indigo-400 transition-colors">
              {item.label}
            </h3>
            <i className={`fas ${item.icon} text-slate-700 group-hover:text-indigo-500/50 text-xl transition-all`}></i>
          </button>
        ))}
      </div>
    </div>
  );
};

export default IntentLayer;
