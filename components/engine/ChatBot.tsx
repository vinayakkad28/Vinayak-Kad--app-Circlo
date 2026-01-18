
import React, { useState, useRef, useEffect } from 'react';
import { Card, Stack, Typography, Button } from '../design-system/Primitives';
import { askCircloChat } from '../../services/geminiService';

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [useDeepThink, setUseDeepThink] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);
    const botResponse = await askCircloChat(userMsg, useDeepThink);
    setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-32 right-8 z-[100]">
      {isOpen ? (
        <Card variant="glass" className="w-80 h-96 flex flex-col p-4 shadow-3xl animate-fade-in border-indigo-500/20">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2">
            <Stack gap={1}>
              <Typography.Meta>Vault Assistant</Typography.Meta>
              <div className="flex items-center gap-2">
                <div className={`w-1 h-1 rounded-full ${loading ? 'bg-indigo-500 animate-pulse' : 'bg-slate-700'}`}></div>
                <span className="text-[8px] font-black uppercase text-slate-500">Pro Connected</span>
              </div>
            </Stack>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors"><i className="fas fa-times"></i></button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 no-scrollbar mb-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 opacity-30 text-center space-y-4">
                <i className="fas fa-sparkles text-3xl"></i>
                <Typography.Body className="italic">How can I assist your social graph today?</Typography.Body>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`p-4 rounded-3xl text-[11px] font-medium leading-relaxed border ${
                m.role === 'user' 
                  ? 'bg-indigo-600/10 border-indigo-500/10 ml-8 text-right text-slate-200' 
                  : 'bg-slate-900/50 border-slate-800 mr-8 text-left text-slate-300'
              }`}>
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 mr-8">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400 ml-2">
                  {useDeepThink ? 'Thinking Mode Active...' : 'Syncing Path...'}
                </span>
              </div>
            )}
          </div>

          <Stack gap={3}>
            <div className="flex items-center justify-between px-2">
              <button 
                onClick={() => setUseDeepThink(!useDeepThink)}
                className={`flex items-center gap-2 transition-all ${useDeepThink ? 'text-indigo-400' : 'text-slate-600'}`}
              >
                <i className={`fas fa-brain text-[10px] ${useDeepThink ? 'animate-pulse' : ''}`}></i>
                <span className="text-[9px] font-black uppercase tracking-widest">Deep Thinking</span>
              </button>
              <Typography.Meta className="opacity-20">Private Node</Typography.Meta>
            </div>
            <div className="flex gap-2">
              <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask about paths or trust..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-500/50 transition-all"
              />
              <button 
                onClick={handleSend} 
                disabled={loading || !input.trim()}
                className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-500 disabled:opacity-20 transition-all active:scale-90"
              >
                <i className="fas fa-paper-plane text-[10px]"></i>
              </button>
            </div>
          </Stack>
        </Card>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-2xl hover:scale-105 active:scale-95 transition-all group"
        >
          <i className="fas fa-sparkles group-hover:animate-pulse"></i>
        </button>
      )}
    </div>
  );
};
