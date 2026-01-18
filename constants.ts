
import { MatchProfile, IntentType, User } from './types';

const firstNames = ['James', 'Sarah', 'Marcus', 'Elena', 'Lily', 'David', 'Chloe', 'Alex', 'Sofia', 'Omar', 'Aria', 'Leo', 'Mia', 'Kai', 'Nora', 'Zane', 'Yuki', 'Amara', 'Finn', 'Ivy', 'Arlo', 'Maya'];
const lastNames = ['Chen', 'Miller', 'Vogel', 'Tanaka', 'Rossi', 'Gomez', 'Smith', 'Ahmed', 'Kim', 'Patel'];
const roles = ['Systems Architect', 'Founder', 'VC', 'Product Lead', 'Creative Director', 'Lead Engineer', 'Principal Scientist', 'General Partner'];
const companies = ['Stripe', 'Linear', 'OpenAI', 'Vercel', 'Airbnb', 'Figma', 'SpaceX', 'Retool'];

const bridgePool = [
  { name: 'Sarah M.', avatar: 'https://i.pravatar.cc/150?u=sarahm' },
  { name: 'Michael K.', avatar: 'https://i.pravatar.cc/150?u=mikek' },
  { name: 'Elena V.', avatar: 'https://i.pravatar.cc/150?u=elenav' }
];

export const generateEngineMatches = (): MatchProfile[] => {
  // Fixed: Use valid IntentType values
  const intents: IntentType[] = ['NEW_PEER', 'BUILDER_CIRCLE', 'MEANINGFUL_CONVO', 'EXPLORE_NEW'];
  
  return Array.from({ length: 1000 }).map((_, i) => {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];
    const role = roles[i % roles.length];
    const company = companies[i % companies.length];
    const bridge = bridgePool[i % bridgePool.length];
    
    return {
      id: `u-${i}`,
      name: `${firstName} ${lastName}`,
      avatar: `https://i.pravatar.cc/150?u=eng-${i}`,
      role,
      company,
      bio: `Focused on building scalable ${company}-grade systems. Interested in deep tech and human-centric design.`,
      location: 'San Francisco, CA',
      trustScore: 85 + (i % 15),
      bridgeName: bridge.name,
      bridgeAvatar: bridge.avatar,
      reasoning: `You and ${firstName} both operate within the ${company} alumni circle and share high-trust links via ${bridge.name}.`,
      intentions: [intents[i % intents.length]],
      sharedContext: `Worked in adjacent sectors during the 2022-2023 cycle.`,
      compatibilityScore: 75 + (i % 25),
      mutualFriends: [`b-${i % bridgePool.length}`],
      pathExplanation: `${bridge.name} and ${firstName} were colleagues at ${company}.`,
      interests: ['Systems Design', 'Deep Tech'],
      // Fixed: Added missing platforms property to match MatchProfile (which extends User)
      platforms: []
    };
  });
};

export const MOCK_ENGINE_MATCHES = generateEngineMatches();
export const MOCK_MATCHES = MOCK_ENGINE_MATCHES;

export const MOCK_USER: User = {
  id: 'me',
  name: 'Alex Johnson',
  role: 'Product Designer',
  avatar: 'https://i.pravatar.cc/150?u=me',
  bio: 'Exploring systems of human connection and introduction.',
  location: 'SF / Remote',
  trustScore: 92,
  platforms: [
    { name: 'LinkedIn', connected: true, lastSynced: '2h ago' },
    { name: 'Instagram', connected: true, lastSynced: '5h ago' }
  ]
};

// Added GRAPH_DATA to support SocialTree visualization
export const GRAPH_DATA = {
  nodes: [
    { id: 'me', name: 'You', avatar: MOCK_USER.avatar, type: 'user', degree: 0 },
    ...bridgePool.map((b, i) => ({ id: `b-${i}`, name: b.name, avatar: b.avatar, type: 'friend', degree: 1 })),
    ...MOCK_ENGINE_MATCHES.slice(0, 20).map(m => ({ id: m.id, name: m.name, avatar: m.avatar, type: 'match', degree: 2, intentions: m.intentions }))
  ] as any[],
  links: [
    ...bridgePool.map((_, i) => ({ source: 'me', target: `b-${i}`, strength: 80, recency: 0.9 })),
    ...MOCK_ENGINE_MATCHES.slice(0, 20).map((m, i) => ({ source: `b-${i % bridgePool.length}`, target: m.id, strength: 40, recency: 0.5 }))
  ] as any[]
};
