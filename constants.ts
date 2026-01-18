
import { MatchProfile, GraphNode, GraphLink, IntentionMode, User } from './types';

export const MOCK_USER: User = {
  id: 'me',
  name: 'Alex Johnson',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
  bio: 'Product Designer looking for high-trust connections in tech and art.',
  location: 'San Francisco, CA',
  trustScore: 88,
  platforms: [
    { name: 'LinkedIn', connected: true, lastSynced: '2h ago' },
    { name: 'Instagram', connected: true, lastSynced: '5h ago' }
  ]
};

const firstNames = ['James', 'Sarah', 'Marcus', 'Elena', 'Lily', 'David', 'Chloe', 'Alex', 'Sofia', 'Omar', 'Aria', 'Leo', 'Mia', 'Kai', 'Nora', 'Zane', 'Yuki', 'Amara', 'Finn', 'Ivy', 'Hugo', 'Sloane', 'Silas', 'Freya', 'Arlo', 'Maya'];
const lastInitials = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const roles = ['Founder', 'Engineer', 'Artist', 'VC', 'Designer', 'Scientist', 'Chef', 'Writer', 'Architect', 'DJ'];
const companies = ['Stripe', 'Airbnb', 'OpenAI', 'SpaceX', 'Apple', 'Linear', 'Retool', 'Figma', 'Notion', 'Vercel'];

const bridgePool = [
  { name: 'Rahul', avatar: 'https://i.pravatar.cc/150?u=rahul' },
  { name: 'Jessica', avatar: 'https://i.pravatar.cc/150?u=jess' },
  { name: 'Michael', avatar: 'https://i.pravatar.cc/150?u=mike' },
  { name: 'Priya', avatar: 'https://i.pravatar.cc/150?u=priya' },
  { name: 'Sam', avatar: 'https://i.pravatar.cc/150?u=sam' },
  { name: 'Jordan', avatar: 'https://i.pravatar.cc/150?u=jordan' }
];

export const generateMatches = (): MatchProfile[] => {
  const modes: IntentionMode[] = ['Dating', 'Business', 'Community', 'Friendship'];
  return Array.from({ length: 1000 }).map((_, i) => {
    const bridge = bridgePool[i % bridgePool.length];
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastInitials[i % lastInitials.length];
    const role = roles[i % roles.length];
    const company = companies[i % companies.length];
    const intention = modes[i % modes.length];
    
    return {
      id: `m-${i}`,
      name: `${firstName} ${lastName}.`,
      age: 21 + (i % 18),
      avatar: `https://i.pravatar.cc/150?u=match${i}`,
      bio: `${role} at ${company}. Interested in ${['AI Ethics', 'Sustainable Urbanism', 'Neo-Expressionism', 'Analog Synths'][i % 4]}.`,
      location: 'San Francisco, CA',
      trustScore: 70 + (i % 30),
      platforms: [{ name: 'LinkedIn', connected: true }],
      degree: 2,
      bridgeName: bridge.name,
      bridgeAvatar: bridge.avatar,
      mutualFriends: [bridge.name],
      pathExplanation: `${bridge.name} and ${firstName} were colleagues at ${company}.`,
      compatibilityScore: 50 + (i % 50),
      strengthScore: 60 + (i % 40),
      interests: [role, 'Coffee', 'Travel'],
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
    const bridgeId = `b-${i}`;
    nodes.push({ id: bridgeId, name: b.name, avatar: b.avatar, type: 'friend', degree: 1 });
    links.push({ source: 'me', target: bridgeId, strength: 100, recency: 1.0 });
    
    // Connect each bridge to a subset of the 1000 users to maintain performance
    // In a real app, this would be computed by a graph DB
    for (let j = 0; j < 15; j++) {
      const matchIdx = (i * 15 + j) % MOCK_MATCHES.length;
      const match = MOCK_MATCHES[matchIdx];
      nodes.push({ 
        id: match.id, 
        name: match.name, 
        avatar: match.avatar, 
        type: 'match', 
        degree: 2, 
        intentions: match.intentions 
      });
      links.push({ source: bridgeId, target: match.id, strength: 30, recency: 0.4 });
    }
  });

  return { nodes, links };
};

export const GRAPH_DATA = generateGraphData();
