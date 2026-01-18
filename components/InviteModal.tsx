
import React, { useState } from 'react';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'path' | 'reach' | 'verify';
  data?: any;
  isDarkMode?: boolean;
}

const InviteModal: React.FC<InviteModalProps> = ({ isOpen, onClose, type, data, isDarkMode = false }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const getInviteContent = () => {
    switch (type) {
      case 'path':
        return {
          title: "Share this warm path",
          desc: `Send a secure preview to ${data?.bridgeName || 'your bridge'} to ask for the introduction.`,
          link: `circlo.app/p/warm-intro-${Math.random().toString(36).substr(2, 5)}`,
          btn: "Copy Intro Link"
        };
      case 'reach':
        return {
          title: "Share your network reach",
          desc: "Show your professional trust score on LinkedIn or X without revealing any private contacts.",
          link: `circlo.app/u/alex-reach`,
          btn: "Copy Profile Link"
        };
      case 'verify':
        return {
          title: `Invite ${data?.name || 'Contact'}`,
          desc: `Ask ${data?.name || 'them'} to verify this trust bridge and unlock better introductions.`,
          link: `circlo.app/v/bridge-request`,
          btn: "Send Verification Link"
        };
      default:
        return { title: '', desc: '', link: '', btn: '' };
    }
  };

  const content = getInviteContent();

  const handleCopy = () => {
    navigator.clipboard.writeText(content.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className={`relative w-full max-w-sm p-10 rounded-[3rem] shadow-2xl animate-in zoom-in duration-300 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors">
          <i className="fas fa-times"></i>
        </button>

        <div className="text-center space-y-8">
          <div className="w-20 h-20 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-xl">
             <i className={`fas ${type === 'path' ? 'fa-paper-plane' : type === 'reach' ? 'fa-chart-pie' : 'fa-user-plus'} text-3xl`}></i>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-black tracking-tight">{content.title}</h2>
            <p className="text-sm font-medium text-slate-500 leading-relaxed">{content.desc}</p>
          </div>

          <div className={`p-6 rounded-[2rem] border-2 border-dashed flex items-center justify-between gap-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
             <span className="text-xs font-bold text-slate-400 truncate flex-1 text-left">{content.link}</span>
             <i className="fas fa-lock text-[10px] text-slate-300"></i>
          </div>

          <button 
            onClick={handleCopy}
            className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'}`}
          >
            {copied ? 'Link Copied!' : content.btn}
          </button>

          <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">
            <i className="fas fa-shield-halved mr-2"></i>
            Encrypted • Zero Private Data Shared
          </p>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
