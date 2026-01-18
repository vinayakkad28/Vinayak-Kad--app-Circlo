
import React from 'react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-10 text-center animate-slide-in">
      <div className="mb-16">
        <div className="w-20 h-20 bg-slate-900 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl mb-8">
          <i className="fas fa-link text-white text-3xl"></i>
        </div>
        <h1 className="heading-xl text-slate-900 mb-4">Circlo</h1>
        <p className="text-lg font-medium text-slate-500 max-w-xs mx-auto">
          The most trusted way to turn your network into introductions.
        </p>
      </div>

      <div className="w-full space-y-6">
        <button 
          onClick={onLogin}
          className="w-full py-5 bg-slate-900 text-white rounded-btn font-bold text-lg shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          Get Started
        </button>
        
        <div className="flex items-center justify-center gap-2 opacity-40">
          <i className="fas fa-shield-halved text-xs"></i>
          <span className="label-sm">No surveillance. No noise.</span>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
