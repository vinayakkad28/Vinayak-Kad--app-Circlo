
import { MOCK_ENGINE_MATCHES } from '../constants';
import { MatchProfile, IntentType } from '../types';

export const matchingEngine = {
  findRecommendation: (intent: IntentType, context: string): MatchProfile => {
    // 1. Filter by Intent
    const candidates = MOCK_ENGINE_MATCHES.filter(m => m.intentions.includes(intent));
    
    // 2. Score by Context Relevance (simulated)
    const scored = candidates.map(c => {
      let score = Math.random() * 50; // Base score
      if (context && (
        c.bio.toLowerCase().includes(context.toLowerCase()) || 
        c.role.toLowerCase().includes(context.toLowerCase()) ||
        c.company?.toLowerCase().includes(context.toLowerCase())
      )) {
        score += 50;
      }
      return { ...c, score };
    });

    // 3. Sort by Score
    scored.sort((a, b) => b.score - a.score);

    // 4. Return EXACTLY ONE recommendation
    // We remove the score field to match the MatchProfile type
    const { score, ...bestMatch } = (scored[0] || MOCK_ENGINE_MATCHES[0]) as any;
    return bestMatch;
  }
};
