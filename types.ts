
export type IntentType = 'ROMANTIC_SOUL' | 'CASUAL_SPARK' | 'PEER_MIND' | 'CREATIVE_ALLIED' | 'EXPLORE_NEW';

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
  work: string;
  company?: string;
  bio: string;
  location: string;
  education: string;
  hobbies: string[];
  interests: string[];
  trustScore: number;
  platforms: PlatformConnection[];
}

export interface PlatformConnection {
  name: string;
  connected: boolean;
  lastSynced?: string;
  handle?: string;
}

export interface MatchProfile extends User {
  bridgeName: string;
  bridgeAvatar: string;
  sharedContext: string;
  compatibilityScore: number;
  reasoning?: string;
  intentions: IntentType[];
  mutualFriends?: string[];
  pathExplanation?: string;
}

export interface IntroIntelligence {
  reasoning: string;
  magic_script: string;
  timing_guidance: string;
  confidence_statement: string;
  safety_status: 'Green' | 'Amber' | 'Red';
  safety_check: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface SocialInsight {
  text: string;
  sources: GroundingSource[];
}

export interface MapInsight {
  text: string;
  places: GroundingSource[];
}

export interface Conversation {
  id: string;
  matchId: string;
  matchName: string;
  matchAvatar: string;
  lastMessage: string;
  timestamp: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
  unread: boolean;
}
