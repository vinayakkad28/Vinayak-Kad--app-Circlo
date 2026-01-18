
import { MatchProfile, GraphNode, GraphLink, IntentionMode, User } from './types';

export const MOCK_USER: User = {
  id: 'me',
  name: 'Alex Johnson',
  avatar: 'https://picsum.photos/seed/alex/400',
  bio: 'Product Designer looking for high-trust connections in tech and art.',
  location: 'San Francisco, CA',
  trustScore: 88,
  platforms: [
    { name: 'LinkedIn', connected: true, lastSynced: '2h ago' },
    { name: 'Instagram', connected: true, lastSynced: '5h ago' }
  ]
};

const firstNames = ['James', 'Sarah', 'Marcus', 'Elena', 'Lily', 'David', 'Chloe', 'Alex', 'Sofia', 'Omar', 'Aria', 'Leo', 'Mia', 'Kai', 'Nora', 'Zane', 'Yuki', 'Amara', 'Finn', 'Ivy'];
const bridgePool = [
  { name: 'Rahul', avatar: 'https://picsum.photos/seed/rahul/100' },
  { name: 'Jessica', avatar: 'https://picsum.photos/seed/jess/100' },
  { name: 'Michael', avatar: 'https://picsum.photos/seed/mike/100' },
  { name: 'Priya', avatar: 'https://picsum.photos/seed/priya/100' }
];

export const generateMatches = (): MatchProfile[] => {
  const modes: IntentionMode[] = ['Dating', 'Business', 'Community', 'Friendship'];
  return Array.from({ length: 100 }).map((_, i) => {
    const bridge = bridgePool[i % bridgePool.length];
    const firstName = firstNames[i % firstNames.length];
    const intention = modes[i % modes.length];
    return {
      id: `m-${i}`,
      name: `${firstName} ${String.fromCharCode(65 + (i % 26))}.`,
      // Add missing age property as required by MatchProfile
      age: 22 + (i % 15),
      avatar: `https://picsum.photos/seed/match${i}/400`,
      bio: `Passionate about ${['Design', 'AI', 'SaaS', 'Climate'][i % 4]}. Looking for ${intention === 'Dating' ? 'someone to explore new galleries with' : 'collaborators'}.`,
      location: 'San Francisco, CA',
      trustScore: 75 + (i % 20),
      platforms: [{ name: 'LinkedIn', connected: true }],
      degree: 2,
      bridgeName: bridge.name,
      bridgeAvatar: bridge.avatar,
      mutualFriends: [bridge.name],
      pathExplanation: `${bridge.name} and ${firstName} were colleagues at Stripe.`,
      compatibilityScore: 60 + (i % 40),
      strengthScore: 50 + (i % 50),
      interests: ['Design', 'Coffee', 'Hiking'],
      intentions: [intention]
    };
  });
};

export const MOCK_MATCHES = generateMatches();

export const generateGraphData = () => {
  const nodes: GraphNode[] = [
    { id: 'me', name: 'You', avatar: MOCK_USER.avatar, type: 'user', degree: 0 }
  ];
  const links: GraphLink[] = [];

  bridgePool.forEach((b, i) => {
    const id = `b-${i}`;
    nodes.push({ id, name: b.name, avatar: b.avatar, type: 'friend', degree: 1 });
    links.push({ source: 'me', target: id, strength: 80, recency: 0.9 });
    
    for (let j = 0; j < 5; j++) {
      const matchIdx = (i * 5 + j) % MOCK_MATCHES.length;
      const match = MOCK_MATCHES[matchIdx];
      nodes.push({ id: match.id, name: match.name, avatar: match.avatar, type: 'match', degree: 2, intentions: match.intentions });
      links.push({ source: id, target: match.id, strength: 40, recency: 0.5 });
    }
  });

  return { nodes, links };
};

export const GRAPH_DATA = generateGraphData();
