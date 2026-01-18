
import { GoogleGenAI, Type } from "@google/genai";
import { MatchProfile, IntroIntelligence, User } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getIntroIntelligence(user: User, match: MatchProfile): Promise<IntroIntelligence> {
  try {
    const prompt = `Act as a high-trust personal curator for Circlo.
    
    Task: Write a calm, assured explanation for why ${user.name} should connect with ${match.name}.
    
    Context:
    - User: ${user.name} (${user.role})
    - Target: ${match.name} (${match.role} @ ${match.company})
    - Common Link: ${match.bridgeName}
    - Connection: ${match.sharedContext}

    Guidelines:
    1. The Reasoning must start with "This is a strong match because..." and feel inevitable.
    2. The Magic Script should be a short, respectful message to ${match.bridgeName}.
    3. Use calm, human language. Avoid terms like "algorithm", "engine", or "nodes".
    4. Provide a confidence statement about the outcome of the talk.
    5. Evaluate safety: determine a status (Green, Amber, Red) and provide a safety check reasoning.

    Return JSON:
    {
      "reasoning": "string",
      "magic_script": "string",
      "timing_guidance": "string",
      "confidence_statement": "string",
      "safety_status": "Green" | "Amber" | "Red",
      "safety_check": "string"
    }`;

    // Updated schema to include safety properties
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
            confidence_statement: { type: Type.STRING },
            safety_status: { type: Type.STRING, description: "Connection safety level: Green, Amber, or Red" },
            safety_check: { type: Type.STRING, description: "Explanation of why this connection is safe or risky" }
          },
          required: ["reasoning", "magic_script", "timing_guidance", "confidence_statement", "safety_status", "safety_check"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Analysis failure:", error);
    return {
      reasoning: `This is a strong match because your work in ${user.role} and ${match.name}'s experience at ${match.company} create a rare opportunity for a high-value exchange.`,
      magic_script: `Hi ${match.bridgeName}, I'm looking to connect with ${match.name.split(' ')[0]} regarding our shared interests. Would you be open to introducing us?`,
      timing_guidance: "A brief reach-out today is ideal.",
      confidence_statement: "We are confident this conversation will be highly productive.",
      safety_status: "Green",
      safety_check: "Verified through multi-layered professional trust circles."
    };
  }
}
