
import React, { useMemo } from 'react';
import BottomNav from '../shared/BottomNav';
import { storage } from '../../services/storageService';

interface MessagesScreenProps {
  onNavigate: (v: string) => void;
}

const MessagesScreen: React.FC<MessagesScreenProps> = ({ onNavigate }) => {
  const requests = useMemo(() => storage.getIntroRequests(), []);

  return (
    <div className="h-screen flex flex-col bg-[#FAFBFF]">
      <header className="px-8 pt-16 pb-6">
        <h2 className="heading-lg">Introductions</h2>
      </header>

      <main className="flex-1 overflow-y-auto px-8 pb-32 no-scrollbar">
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2 mb-8">
            <span className="px-4 py-2 bg-slate-900 text-white rounded-full label-sm">Active ({requests.length})</span>
            <span className="px-4 py-2 bg-slate-100 text-slate-400 rounded-full label-sm">Requested</span>
          </div>

          {requests.length > 0 ? (
            requests.map(conv => (
              <div key={conv.id} className="p-6 bg-white border border-slate-100 rounded-card shadow-sm hover:shadow-lg transition-all flex items-center gap-5 group cursor-pointer animate-in fade-in slide-in-from-bottom-2">
                <div className="relative">
                  <img src={conv.matchAvatar} className="w-16 h-16 rounded-[1.5rem] object-cover" alt={conv.matchName} />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-900 text-white rounded-lg flex items-center justify-center text-[8px]">
                    <i className="fas fa-link"></i>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-black text-slate-900">{conv.matchName}</h4>
                    <span className="label-sm text-[8px] text-slate-400">{conv.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate italic">"{conv.lastMessage}"</p>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center space-y-4 opacity-30">
               <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                 <i className="fas fa-bolt text-2xl"></i>
               </div>
               <p className="label-sm">Introduction history is empty.</p>
               <p className="text-[10px] font-bold text-slate-400 uppercase">Request an intro from the home screen</p>
            </div>
          )}
        </div>
      </main>

      <BottomNav activeView="messages" onViewChange={onNavigate} />
    </div>
  );
};

export default MessagesScreen;
