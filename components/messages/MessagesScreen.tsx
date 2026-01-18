
import React from 'react';
import BottomNav from '../shared/BottomNav';

interface MessagesScreenProps {
  onNavigate: (v: string) => void;
}

const MessagesScreen: React.FC<MessagesScreenProps> = ({ onNavigate }) => {
  return (
    <div className="h-screen flex flex-col bg-[#FAFBFF]">
      <header className="px-8 pt-16 pb-6">
        <h2 className="heading-lg">Introductions</h2>
      </header>

      <main className="flex-1 overflow-y-auto px-8 pb-32 no-scrollbar">
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2 mb-8">
            <span className="px-4 py-2 bg-slate-900 text-white rounded-full label-sm">Active</span>
            <span className="px-4 py-2 bg-slate-100 text-slate-400 rounded-full label-sm">Requested</span>
          </div>

          {[
            { id: 1, name: 'Elena Chen', bridge: 'Rahul', lastMsg: 'Rahul mentioned you are into startups!', time: '2m ago' },
            { id: 2, name: 'Marcus Miller', bridge: 'Jessica', lastMsg: 'Hi Alex! Jessica told me we should connect.', time: '1h ago' }
          ].map(conv => (
            <div key={conv.id} className="p-6 bg-white border border-slate-100 rounded-card shadow-sm hover:shadow-lg transition-all flex items-center gap-5 group cursor-pointer">
              <div className="relative">
                <img src={`https://picsum.photos/seed/face${conv.id}/100`} className="w-16 h-16 rounded-[1.5rem] object-cover" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-900 text-white rounded-lg flex items-center justify-center text-[8px]">
                  <i className="fas fa-link"></i>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-black text-slate-900">{conv.name}</h4>
                  <span className="label-sm text-[8px] text-slate-400">{conv.time}</span>
                </div>
                <p className="text-xs text-slate-500 truncate">Via {conv.bridge}: "{conv.lastMsg}"</p>
              </div>
            </div>
          ))}
          
          <div className="py-20 text-center space-y-4 opacity-30">
             <i className="fas fa-bolt text-4xl"></i>
             <p className="label-sm">Introduction history ends here.</p>
          </div>
        </div>
      </main>

      <BottomNav active="messages" onNavigate={onNavigate} />
    </div>
  );
};

export default MessagesScreen;
