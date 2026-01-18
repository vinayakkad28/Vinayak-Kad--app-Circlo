
export type IntentionMode = 'Dating' | 'Business' | 'Community' | 'Friendship';
export type Platform = 'instagram' | 'facebook' | 'x' | 'tiktok' | 'linkedin' | 'snapchat' | 'Contacts';

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  location: string;
  trustScore: number;
  platforms: {
    name: Platform;
    connected: boolean;
    lastSynced?: string;
  }[];
}

export interface Node {
  id: string;
  name: string;
  avatar: string;
  type: 'user' | 'friend' | 'match';
  degree: number;
  intentions?: IntentionMode[];
  strengthScore?: number;
  x?: number;
  y?: number;
}

export interface Link {
  source: string | Node;
  target: string | Node;
  strength: number;
  recency: number;
}

export interface MatchProfile {
  id: string;
  name: string;
  age: number;
  bio: string;
  avatar: string;
  degree: number;
  compatibilityScore: number;
  pathStrengthScore: number;
  overallScore: number;
  bridgeName: string;
  bridgeAvatar: string;
  mutualFriends: string[];
  pathExplanation: string;
  interests: string[];
  location: string;
  intentions: IntentionMode[];
}

export interface Conversation {
  id: string;
  matchId: string;
  matchName: string;
  matchAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}
