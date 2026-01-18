
import React, { useState } from 'react';
import { IntentType, MatchProfile } from '../../types';
import { MOCK_ENGINE_MATCHES } from '../../constants';

interface SignalLayerProps {
  intent: IntentType;
  onSubmit: (intro: MatchProfile) => void;
}

const SignalLayer: React.FC<SignalLayerProps> = ({ intent, onSubmit }) => {
  const [signals, setSignals] = useState({
    context: '',
    hope: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const bestMatch = MOCK_ENGINE_MATCHES.find(m => 
        m.intentions.includes(intent) && 
        (signals.context === '' || m.role.toLowerCase().includes(signals.context.toLowerCase()))
      ) || MOCK_ENGINE_MATCHES[Math.floor(Math.random() * MOCK_ENGINE_MATCHES.length)];
      
      setIsProcessing(false);
      onSubmit(bestMatch);
    }, 1500);
  };

  const isComplete = signals.context.length > 2;

  return (
    <div className="flex-1 flex flex-col p-12 animate-fade-in max-w-sm mx-auto justify-center">
      <header className="mb-20">
        <h2 className="text-4xl font-black tracking-tight text-white">Define the focus.</h2>
      </header>

      <div className="space-y-12 flex-1">
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Context</label>
          <input 
            autoFocus
            type="text"
            placeholder="e.g. Systems design, Early-stage VC"
            value={signals.context}
            onChange={(e) => setSignals({...signals, context: e.target.value})}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 text-xl font-bold text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700"
          />
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Outcome</label>
          <input 
            type="text"
            placeholder="What are you hoping for?"
            value={signals.hope}
            onChange={(e) => setSignals({...signals, hope: e.target.value})}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 text-xl font-bold text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700"
          />
        </div>
      </div>

      <div className="pt-12">
        <button 
          onClick={handleProcess}
          disabled={!isComplete || isProcessing}
          className={`w-full py-7 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all shadow-2xl ${
            isComplete ? 'bg-indigo-600 text-white hover:bg-indigo-500 active:scale-95' : 'bg-slate-900 text-slate-700 cursor-not-allowed'
          }`}
        >
          {isProcessing ? 'Verifying Paths...' : 'Find Connection'}
        </button>
      </div>
    </div>
  );
};

export default SignalLayer;
