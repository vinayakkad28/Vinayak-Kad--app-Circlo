
import { User, MatchProfile, Conversation } from '../types';

const KEYS = {
  USER: 'circlo_user_profile',
  INTRO_REQUESTS: 'circlo_intro_requests',
  SYNCED_PLATFORMS: 'circlo_synced_platforms'
};

export const storage = {
  saveUser: (user: User) => localStorage.setItem(KEYS.USER, JSON.stringify(user)),
  getUser: (): User | null => {
    const data = localStorage.getItem(KEYS.USER);
    return data ? JSON.parse(data) : null;
  },
  
  saveIntroRequest: (match: MatchProfile, script: string) => {
    const current = storage.getIntroRequests();
    const exists = current.find(r => r.matchId === match.id);
    if (exists) return;

    const newRequest: Conversation = {
      id: `conv-${Date.now()}`,
      matchId: match.id,
      matchName: match.name,
      matchAvatar: match.avatar,
      lastMessage: script,
      timestamp: 'Just now',
      unread: true
    };
    localStorage.setItem(KEYS.INTRO_REQUESTS, JSON.stringify([newRequest, ...current]));
  },
  
  getIntroRequests: (): Conversation[] => {
    const data = localStorage.getItem(KEYS.INTRO_REQUESTS);
    return data ? JSON.parse(data) : [];
  },

  syncPlatform: (platformName: string) => {
    const platforms = storage.getSyncedPlatforms();
    if (!platforms.includes(platformName)) {
      localStorage.setItem(KEYS.SYNCED_PLATFORMS, JSON.stringify([...platforms, platformName]));
    }
  },

  getSyncedPlatforms: (): string[] => {
    const data = localStorage.getItem(KEYS.SYNCED_PLATFORMS);
    return data ? JSON.parse(data) : [];
  },

  clearAll: () => {
    localStorage.removeItem(KEYS.USER);
    localStorage.removeItem(KEYS.INTRO_REQUESTS);
    localStorage.removeItem(KEYS.SYNCED_PLATFORMS);
  }
};
