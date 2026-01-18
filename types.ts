
export type IntentionMode = 'Dating' | 'Business' | 'Community' | 'Friendship';
export type PlatformName = 'LinkedIn' | 'Instagram' | 'TikTok' | 'Snapchat' | 'Facebook' | 'X' | 'Contacts';

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  location: string;
  trustScore: number;
  platforms: {
    name: PlatformName;
    connected: boolean;
    lastSynced?: string;
  }[];
}

export interface GraphNode {
  id: string;
  name: string;
  avatar: string;
  type: 'user' | 'friend' | 'match';
  degree: number;
  intentions?: IntentionMode[];
  strengthScore?: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  strength: number;
  recency: number;
}

export interface MatchProfile extends User {
  age: number;
  degree: number;
  mutualFriends: string[];
  bridgeName: string;
  bridgeAvatar: string;
  pathExplanation: string;
  compatibilityScore: number;
  strengthScore: number;
  pathStrengthScore?: number;
  overallScore?: number;
  interests: string[];
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

export interface IntroIntelligence {
  reasoning: string;
  magic_script: string;
  timing_guidance: string;
  safety_status: 'Green' | 'Amber' | 'Red';
  safety_check: string;
  talking_points: string[];
}
