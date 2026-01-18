
import React from 'react';
import { Conversation } from '../types';

interface MessagesListProps {
  conversations: Conversation[];
  onSelectConversation: (id: string) => void;
  isDarkMode?: boolean;
}

const MessagesList: React.FC<MessagesListProps> = ({ conversations, onSelectConversation, isDarkMode = false }) => {
  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-6">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
          <i className="fas fa-comment-dots text-slate-300 text-3xl"></i>
        </div>
        <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>No messages yet</h3>
        <p className="text-sm text-slate-500 max-w-xs">Match with people from your social tree to start a conversation.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recent Chats</h3>
        <button className="text-[10px] font-black text-violet-600 uppercase">Mark all read</button>
      </div>
      {conversations.map((chat) => (
        <div 
          key={chat.id}
          onClick={() => onSelectConversation(chat.id)}
          className={`flex items-center gap-4 p-4 rounded-3xl border transition-all cursor-pointer group ${
            chat.unread 
              ? (isDarkMode ? 'bg-slate-900 border-violet-900/50 shadow-lg shadow-violet-950/20' : 'bg-white border-violet-100 shadow-sm') 
              : (isDarkMode ? 'bg-transparent border-transparent hover:bg-slate-900/50' : 'bg-transparent border-transparent hover:bg-slate-50')
          }`}
        >
          <div className="relative shrink-0">
            <img src={chat.matchAvatar} className="w-14 h-14 rounded-2xl object-cover" alt={chat.matchName} />
            {chat.unread && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-violet-600 border-2 border-white dark:border-slate-950 rounded-full"></div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline mb-0.5">
              <h4 className={`font-bold truncate ${chat.unread ? (isDarkMode ? 'text-white' : 'text-slate-900') : 'text-slate-500'}`}>
                {chat.matchName}
              </h4>
              <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{chat.timestamp}</span>
            </div>
            <p className={`text-xs truncate ${chat.unread ? (isDarkMode ? 'text-slate-300 font-medium' : 'text-slate-600 font-medium') : 'text-slate-400'}`}>
              {chat.lastMessage}
            </p>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <i className="fas fa-chevron-right text-slate-300 text-xs"></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagesList;
