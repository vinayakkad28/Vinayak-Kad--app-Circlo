
import React, { useState } from 'react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [syncing, setSyncing] = useState(false);
  const [platforms, setPlatforms] = useState<string[]>([]);

  const togglePlatform = (p: string) => {
    if (platforms.includes(p)) setPlatforms(platforms.filter(x => x !== p));
    else setPlatforms([...platforms, p]);
  };

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setStep(3);
    }, 2500);
  };

  return (
    <div className="h-screen flex flex-col p-10 bg-white animate-slide-in">
      <div className="flex justify-between items-center label-sm text-slate-300 mb-12">
        <span>Phase {step} of 3</span>
        <div className="flex gap-2">
          {[1,2,3].map(i => <div key={i} className={`h-1.5 rounded-full transition-all ${step === i ? 'w-10 bg-slate-900' : 'w-3 bg-slate-100'}`}></div>)}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {step === 1 && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="w-24 h-24 bg-slate-900 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl">
              <i className="fas fa-handshake text-4xl"></i>
            </div>
            <div className="space-y-6">
              <h2 className="text-6xl font-black tracking-tighter leading-[0.9] text-slate-900">Warm paths <br/>only.</h2>
              <p className="text-xl font-medium text-slate-500 leading-relaxed max-w-sm">Dating is better when verified by people you actually trust. No cold outreach, just warm bridges.</p>
            </div>
            <button onClick={() => setStep(2)} className="w-full py-6 bg-slate-900 text-white rounded-btn font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-[1.02] transition-all">Connect My Circles</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="space-y-3">
              <h2 className="heading-lg">Identify your bridges.</h2>
              <p className="text-slate-500 font-medium">Circlo maps trust connections, not personal data. Sync one platform to begin.</p>
            </div>

            <div className="space-y-3">
              {[
                { id: 'linkedin', icon: 'fa-linkedin', color: 'text-blue-600', label: 'LinkedIn' },
                { id: 'instagram', icon: 'fa-instagram', color: 'text-pink-600', label: 'Instagram' },
                { id: 'contacts', icon: 'fa-address-book', color: 'text-slate-600', label: 'Contacts' }
              ].map(p => (
                <button 
                  key={p.id}
                  onClick={() => togglePlatform(p.id)}
                  className={`w-full flex items-center justify-between p-7 rounded-card border-2 transition-all group ${platforms.includes(p.id) ? 'border-slate-900 bg-slate-50 shadow-inner' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center ${p.color} transition-transform group-active:scale-90`}>
                      <i className={`fab ${p.icon} text-2xl`}></i>
                    </div>
                    <div className="text-left">
                      <p className="font-black text-slate-900 tracking-tight">{p.label}</p>
                      <p className="label-sm text-[8px] opacity-40">Privacy Verified</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${platforms.includes(p.id) ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-200'}`}>
                    {platforms.includes(p.id) && <i className="fas fa-check text-[10px]"></i>}
                  </div>
                </button>
              ))}
            </div>

            <button 
              disabled={platforms.length === 0 || syncing}
              onClick={handleSync} 
              className={`w-full py-6 rounded-btn font-black text-xs uppercase tracking-widest transition-all shadow-xl ${platforms.length > 0 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-300'}`}
            >
              {syncing ? 'Mapping Trust Nodes...' : 'Verify Connections'}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-12 animate-in zoom-in duration-700">
            <div className="relative inline-block">
               <div className="text-9xl mb-4">⚡</div>
               <div className="absolute -top-4 -right-4 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest animate-bounce">Live</div>
            </div>
            <div className="space-y-6">
              <h2 className="text-5xl font-black tracking-tighter text-slate-900 leading-tight">Engine Ready.</h2>
              <p className="text-xl font-medium text-slate-500 max-w-xs mx-auto">We've identified 3,420+ warm paths through your verified bridges.</p>
            </div>
            <button onClick={onComplete} className="w-full py-6 bg-slate-900 text-white rounded-btn font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-[1.02] transition-all">Enter the Circle</button>
          </div>
        )}
      </div>

      <footer className="mt-auto pt-10 text-center opacity-30">
        <p className="label-sm text-[8px]">Zero-Knowledge Privacy Ledger Active</p>
      </footer>
    </div>
  );
};

export default OnboardingFlow;
