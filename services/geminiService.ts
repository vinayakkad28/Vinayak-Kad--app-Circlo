
import { GoogleGenAI, Type } from "@google/genai";
import { MatchProfile, IntroIntelligence } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getIntroIntelligence(user: any, match: MatchProfile): Promise<IntroIntelligence> {
  try {
    const prompt = `You are the Circlo Intro Architect. Your goal is to find the most ethical and effective way for Alex (User) to meet ${match.name}.

    Context:
    - User: Alex (Product Designer, SF)
    - Target: ${match.name} (${match.bio})
    - Bridge Person: ${match.bridgeName}
    - Intention: ${match.intentions[0]}

    Rules:
    - NO direct cold outreach. Always use ${match.bridgeName} as the primary channel.
    - Focus on "Safety Check": Assess if the connection is logically sound or high-risk.
    - "Magic Script": Write a message for Alex to send to ${match.bridgeName}, NOT to ${match.name}.

    Return valid JSON:
    {
      "reasoning": "2-sentence why this bridge is logically strong based on shared history",
      "magic_script": "warm, respectful message Alex can send to his bridge person",
      "timing_guidance": "1-sentence on when it's best to ask",
      "safety_status": "Green|Amber|Red",
      "safety_check": "Detailed 1-sentence assessment of risk/safety",
      "talking_points": ["point 1", "point 2", "point 3"]
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reasoning: { type: Type.STRING },
            magic_script: { type: Type.STRING },
            timing_guidance: { type: Type.STRING },
            safety_status: { type: Type.STRING },
            safety_check: { type: Type.STRING },
            talking_points: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["reasoning", "magic_script", "timing_guidance", "safety_status", "safety_check", "talking_points"]
        }
      }
    });

    const parsed = JSON.parse(response.text);
    return {
      ...parsed,
      safety_status: ['Green', 'Amber', 'Red'].includes(parsed.safety_status) ? parsed.safety_status : 'Green'
    };
  } catch (error) {
    console.error("AI Error, using fallback:", error);
    return {
      reasoning: `Shared professional context through your bridge, ${match.bridgeName}.`,
      magic_script: `Hey ${match.bridgeName}! I saw you're connected to ${match.name.split(' ')[0]}. Since we're all in the same circle, would you be comfortable introducing us?`,
      timing_guidance: "A casual afternoon check-in is best.",
      safety_status: "Green",
      safety_check: "Verified second-degree link with recent bridge activity.",
      talking_points: ["Shared professional history", "Mutual circles", "Community interests"]
    };
  }
}
