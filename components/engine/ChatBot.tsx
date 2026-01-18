
import React, { useState, useRef, useEffect } from 'react';
import { Card, Stack, Typography, Button } from '../design-system/Primitives';
import { askCircloChat } from '../../services/geminiService';

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
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
    const botResponse = await askCircloChat(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-32 right-8 z-[100]">
      {isOpen ? (
        <Card variant="glass" className="w-80 h-96 flex flex-col p-4 shadow-3xl animate-fade-in">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2">
            <Typography.Meta>Vault Assistant</Typography.Meta>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white"><i className="fas fa-times"></i></button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 no-scrollbar mb-4">
            {messages.length === 0 && <Typography.Body className="text-center italic opacity-40 py-10">How can I assist your social graph today?</Typography.Body>}
            {messages.map((m, i) => (
              <div key={i} className={`p-3 rounded-2xl text-[11px] font-medium leading-relaxed ${m.role === 'user' ? 'bg-indigo-600/20 ml-8 text-right' : 'bg-slate-800/50 mr-8 text-left'}`}>
                {m.text}
              </div>
            ))}
            {loading && <div className="animate-pulse text-[10px] text-indigo-400">Syncing Pro reasoning...</div>}
          </div>
          <div className="flex gap-2">
            <input 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white outline-none"
            />
            <button onClick={handleSend} className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white"><i className="fas fa-paper-plane text-[10px]"></i></button>
          </div>
        </Card>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          <i className="fas fa-sparkles"></i>
        </button>
      )}
    </div>
  );
};
