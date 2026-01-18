
export type IntentType = 'MEET_NEW' | 'FIND_PEOPLE' | 'EXPLORE_GROUP' | 'CONVERSATION';
export type IntentionMode = 'Dating' | 'Business' | 'Community' | 'Friendship';
export type Platform = 'instagram' | 'facebook' | 'x' | 'tiktok' | 'linkedin' | 'snapchat' | 'Contacts';

// Added IntroIntelligence to types to be accessible by components
export interface IntroIntelligence {
  reasoning: string;
  magic_script: string;
  timing_guidance: string;
  safety_status: 'Green' | 'Amber' | 'Red';
  safety_check: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
  company?: string;
  bio: string;
  location: string;
  trustScore: number;
  // Added platforms to User type
  platforms: {
    name: string;
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
  intentions?: (IntentType | IntentionMode)[];
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
  avatar: string;
  role: string;
  company?: string;
  bio: string;
  location: string;
  trustScore: number;
  bridgeName: string;
  bridgeAvatar: string;
  reasoning: string;
  intentions: (IntentType | IntentionMode)[];
  sharedContext: string;
  compatibilityScore: number;
  // Extended fields for path visualization and bridge intel
  age?: number;
  degree?: number;
  pathStrengthScore?: number;
  overallScore?: number;
  mutualFriends?: string[];
  pathExplanation?: string;
  interests?: string[];
}

export interface Conversation {
  id: string;
  matchId: string;
  matchName: string;
  matchAvatar: string;
  lastMessage: string;
  timestamp: string;
  status: 'PENDING' | 'ACTIVE';
  // Added unread to support messaging list indicators
  unread?: boolean;
}

export interface SyncState {
  platforms: string[];
  lastSynced: string | null;
}
