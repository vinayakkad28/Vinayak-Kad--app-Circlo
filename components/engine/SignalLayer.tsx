
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
    hope: '',
    availability: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = () => {
    setIsProcessing(true);
    // Simulate high-performance engine matching
    setTimeout(() => {
      const bestMatch = MOCK_ENGINE_MATCHES.find(m => 
        m.intentions.includes(intent) && 
        (signals.context === '' || m.role.toLowerCase().includes(signals.context.toLowerCase()))
      ) || MOCK_ENGINE_MATCHES[Math.floor(Math.random() * MOCK_ENGINE_MATCHES.length)];
      
      setIsProcessing(false);
      onSubmit(bestMatch);
    }, 1800);
  };

  const isComplete = signals.context.length > 2 && signals.hope.length > 2;

  return (
    <div className="flex-1 flex flex-col p-10 animate-fade-in max-w-sm mx-auto">
      <header className="mb-12 mt-4 space-y-2">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Layer 02</span>
        <h2 className="text-4xl font-black tracking-tight text-white">Refine Signal.</h2>
        <p className="text-slate-500 font-medium">Define your outcome to optimize path verification.</p>
      </header>

      <div className="space-y-10 flex-1 overflow-y-auto no-scrollbar">
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Context / Interests</label>
          <input 
            autoFocus
            type="text"
            placeholder="e.g. Systems design, Early-stage VC..."
            value={signals.context}
            onChange={(e) => setSignals({...signals, context: e.target.value})}
            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-5 text-sm font-bold text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700"
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">What are you hoping for?</label>
          <input 
            type="text"
            placeholder="e.g. Collaboration, Mentorship, Advice..."
            value={signals.hope}
            onChange={(e) => setSignals({...signals, hope: e.target.value})}
            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-5 text-sm font-bold text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700"
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Optional Availability</label>
          <input 
            type="text"
            placeholder="e.g. Next week, Mornings, SF local..."
            value={signals.availability}
            onChange={(e) => setSignals({...signals, availability: e.target.value})}
            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-5 text-sm font-bold text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700"
          />
        </div>
      </div>

      <div className="pt-8">
        <button 
          onClick={handleProcess}
          disabled={!isComplete || isProcessing}
          className={`w-full py-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl ${
            isComplete ? 'bg-indigo-600 text-white hover:bg-indigo-500 active:scale-95' : 'bg-slate-900 text-slate-700 cursor-not-allowed'
          }`}
        >
          {isProcessing ? 'Verifying 1,000+ Trust Paths...' : 'Search Engine'}
        </button>
      </div>
    </div>
  );
};

export default SignalLayer;
