
export type IntentType = 'NEW_PEER' | 'BUILDER_CIRCLE' | 'MEANINGFUL_CONVO' | 'EXPLORE_NEW' | 'Dating' | 'Business' | 'Community' | 'Friendship';
// Added IntentionMode as an alias for IntentType for component compatibility
export type IntentionMode = IntentType;

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
  company?: string;
  bio: string;
  location: string;
  trustScore: number;
  platforms: {
    name: string;
    connected: boolean;
    lastSynced?: string;
  }[];
}

export interface MatchProfile extends User {
  bridgeName: string;
  bridgeAvatar: string;
  reasoning: string;
  intentions: IntentType[];
  sharedContext: string;
  compatibilityScore: number;
  // Added missing properties required by various components
  mutualFriends: string[];
  pathExplanation: string;
  interests: string[];
  age?: number;
}

export interface Conversation {
  id: string;
  matchId: string;
  matchName: string;
  matchAvatar: string;
  lastMessage: string;
  timestamp: string;
  status: 'PENDING' | 'ACTIVE';
  unread?: boolean;
}

// Added safety fields required by MatchDetails component
export interface IntroIntelligence {
  reasoning: string;
  magic_script: string;
  timing_guidance: string;
  confidence_statement: string;
  safety_status: 'Green' | 'Amber' | 'Red';
  safety_check: string;
}

// Added Node and Link interfaces for SocialTree visualization
export interface Node {
  id: string;
  name: string;
  avatar: string;
  type: 'user' | 'friend' | 'match';
  degree: number;
  intentions?: IntentType[];
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
