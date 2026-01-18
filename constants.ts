
import { MatchProfile, IntentType, User } from './types';

const firstNames = ['James', 'Sarah', 'Marcus', 'Elena', 'Lily', 'David', 'Chloe', 'Alex', 'Sofia', 'Omar', 'Aria', 'Leo', 'Mia', 'Kai', 'Nora', 'Zane', 'Yuki', 'Amara', 'Finn', 'Ivy', 'Arlo', 'Maya'];
const lastNames = ['Chen', 'Miller', 'Vogel', 'Tanaka', 'Rossi', 'Gomez', 'Smith', 'Ahmed', 'Kim', 'Patel', 'Wong', 'Olsen', 'Ito', 'Garcia', 'Muller'];
const roles = ['Systems Architect', 'Founder', 'VC', 'Designer', 'Photographer', 'Artist', 'Engineer', 'Producer', 'Writer', 'Chef'];
const companies = ['Stripe', 'Linear', 'Independent', 'Vercel', 'Airbnb', 'Self-employed', 'SpaceX', 'Studio', 'Anthropic', 'Agency'];
const educationPool = ['Stanford University', 'MIT', 'RISD', 'Self-Taught', 'Oxford', 'UCL', 'Harvard', 'Bauhaus'];
const interestPool = ['AI', 'Bouldering', 'Jazz', 'Post-Structuralism', 'Minimalism', 'Crave-worthy Food', 'Deep Tech', 'Analog Photography'];
const hobbyPool = ['Surfing', 'Chess', 'Meditation', 'Restoring Porsches', 'Urban Exploring', 'Poetry', 'Vinyl Collecting'];
const workPool = ['Scaling distributed systems', 'Curating underground art', 'Managing late-stage venture capital', 'Designing minimalist interfaces', 'Researching AI safety', 'Producing lo-fi hip hop', 'Architecting sustainable cities'];

const bridgePool = [
  { name: 'Sarah M.', avatar: 'https://i.pravatar.cc/150?u=sarahm' },
  { name: 'Michael K.', avatar: 'https://i.pravatar.cc/150?u=mikek' },
  { name: 'Elena V.', avatar: 'https://i.pravatar.cc/150?u=elenav' },
  { name: 'David R.', avatar: 'https://i.pravatar.cc/150?u=davidr' },
  { name: 'Zane T.', avatar: 'https://i.pravatar.cc/150?u=zanet' }
];

export const generateEngineMatches = (count: number = 100000): MatchProfile[] => {
  const intents: IntentType[] = ['ROMANTIC_SOUL', 'CASUAL_SPARK', 'PEER_MIND', 'CREATIVE_ALLIED', 'EXPLORE_NEW'];
  
  return Array.from({ length: count }).map((_, i) => {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];
    const role = roles[i % roles.length];
    const company = companies[i % companies.length];
    const bridge = bridgePool[i % bridgePool.length];
    
    const userIntents = [intents[i % intents.length]];
    if (i % 3 === 0) userIntents.push(intents[(i + 1) % intents.length]);

    const bioPool = [
      "Obsessed with minimalism and late night talks about systems.",
      "Looking for someone who doesn't take life too seriously. High energy only.",
      "Building the future of shared intelligence. Coffee?",
      "Exploring the intersection of touch and technology.",
      "Just here for a good time and better conversations.",
      "Artist searching for a muse or a partner in crime."
    ];

    return {
      id: `u-${i}`,
      name: `${firstName} ${lastName}`,
      avatar: `https://i.pravatar.cc/150?u=circlo-${i % 500}`, // Using i%500 to keep avatars somewhat diverse but avoid massive loading issues
      role,
      work: workPool[i % workPool.length],
      company,
      bio: bioPool[i % bioPool.length],
      location: ['San Francisco', 'London', 'Berlin', 'New York', 'Tokyo', 'Mumbai'][i % 6],
      education: educationPool[i % educationPool.length],
      interests: [interestPool[i % interestPool.length], interestPool[(i + 1) % interestPool.length]],
      hobbies: [hobbyPool[i % hobbyPool.length]],
      trustScore: 85 + (i % 15),
      bridgeName: bridge.name,
      bridgeAvatar: bridge.avatar,
      intentions: userIntents,
      sharedContext: `Mutual friends from ${['uni', 'past projects', 'SF circle', 'the art scene'][i % 4]}.`,
      compatibilityScore: 75 + (i % 25),
      platforms: [{ name: 'Instagram', connected: true, handle: `${firstName.toLowerCase()}${i}` }]
    };
  });
};

export const MOCK_ENGINE_MATCHES = generateEngineMatches(100000);

export const MOCK_USER: User = {
  id: 'me',
  name: 'Alex Johnson',
  role: 'Product Designer',
  work: 'Designing high-trust social fabrics',
  avatar: 'https://i.pravatar.cc/150?u=me',
  bio: 'Exploring systems of human connection and high-trust introductions.',
  location: 'SF / Remote',
  education: 'RISD / Stanford',
  interests: ['Systems Thinking', 'Human Interaction', 'AI Ethics'],
  hobbies: ['Road Cycling', 'Modular Synths'],
  trustScore: 92,
  platforms: [
    { name: 'LinkedIn', connected: true, lastSynced: '2h ago', handle: 'alexj' },
    { name: 'Twitter', connected: true, lastSynced: '5h ago', handle: 'alexj_design' }
  ]
};
