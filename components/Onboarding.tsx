
import React, { useState } from 'react';

interface OnboardingProps {
  onComplete: () => void;
  isDarkMode: boolean;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, isDarkMode }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [connectedCount, setConnectedCount] = useState(0);

  const platforms = [
    { name: 'LinkedIn', icon: 'fa-linkedin', color: 'bg-[#0077b5]' },
    { name: 'Contacts', icon: 'fa-address-book', color: 'bg-slate-700' }
  ];

  const steps = [
    {
      title: "Introduction over outreach.",
      desc: "Circlo finds the warmest path to get you introduced to anyone. Based on who you trust, we find who they trust.",
      icon: "🎯",
      button: "Start Finding Paths"
    },
    {
      title: "Connect your circles.",
      desc: "We only store relationship IDs to map trust bridges. We never read your messages or content.",
      icon: "🔗",
      button: connectedCount > 0 ? "Unlock My Bridges" : "Sync one to begin"
    },
    {
      title: "The engine is ready.",
      desc: `Your trusted nodes are synced. We've identified 1,000+ potential warm paths for your goals.`,
      icon: "⚡",
      button: "Ask for an Intro"
    }
  ];

  const handleNext = () => {
    if (step === 2) {
      if (connectedCount === 0) return;
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(3);
      }, 1500);
    } else if (step === 3) {
      onComplete();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-6 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      <div className="max-w-md w-full text-center space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="space-y-6">
           <div className="text-7xl mb-4">{steps[step-1].icon}</div>
           <div className="space-y-4 px-6">
             <h2 className="text-4xl font-black tracking-tighter leading-tight">{steps[step-1].title}</h2>
             <p className="text-lg font-bold text-slate-400 leading-relaxed">{steps[step-1].desc}</p>
           </div>
        </div>

        {step === 2 && !loading && (
          <div className="flex flex-col gap-3 animate-in zoom-in duration-500 max-w-xs mx-auto w-full">
            {platforms.map(p => (
              <button 
                key={p.name}
                onClick={() => setConnectedCount(prev => prev + 1)}
                className="flex items-center gap-5 p-6 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900 border-2 border-transparent hover:border-slate-900 transition-all text-left group"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl ${p.color}`}>
                  <i className={`fab ${p.icon} text-2xl`}></i>
                </div>
                <div className="flex-1">
                  <span className="block font-black text-slate-900 dark:text-white">{p.name}</span>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Privacy Verified</span>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${connectedCount > 0 ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-200'}`}>
                  {connectedCount > 0 && <i className="fas fa-check text-[10px]"></i>}
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="space-y-8 px-8">
          <button 
            disabled={loading || (step === 2 && connectedCount === 0)}
            onClick={handleNext} 
            className={`w-full py-6 rounded-[2rem] font-black text-lg transition-all ${loading || (step === 2 && connectedCount === 0) ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xl hover:scale-[1.02]'}`}
          >
            {loading ? "Generating Safe Paths..." : steps[step-1].button}
          </button>
          
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 opacity-30">
              <i className="fas fa-lock text-xs"></i>
              <span className="text-[9px] font-black uppercase tracking-widest">Encryption Active</span>
            </div>
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">You can remove your connections anytime.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
