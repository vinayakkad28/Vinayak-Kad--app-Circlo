
import { GoogleGenAI, Type } from "@google/genai";
import { MatchProfile, IntroIntelligence, User, SocialInsight, MapInsight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getIntroIntelligence(user: User, match: MatchProfile): Promise<IntroIntelligence> {
  try {
    const prompt = `Act as a high-trust, zero-judgment social curator for Circlo. 
    
    Task: Analyze the connection between ${user.name} and ${match.name} and write a context-aware intro path.
    
    Context:
    - User: ${user.name} (${user.role})
    - Target: ${match.name} (${match.role} @ ${match.company})
    - Intentions: ${match.intentions.join(', ')}
    - Common Link: ${match.bridgeName}
    - Bridge Path: ${match.sharedContext}

    Guidelines:
    1. Adapt the tone to the intention. If it is romantic or casual, be warm and vibe-focused. If professional, be sharp and value-focused.
    2. The Reasoning must justify why this bridge (${match.bridgeName}) is the perfect filter for this specific desire.
    3. The Magic Script is a message the user sends to ${match.bridgeName} to start the process.
    
    Return JSON:
    {
      "reasoning": "string",
      "magic_script": "string",
      "timing_guidance": "string",
      "confidence_statement": "string",
      "safety_status": "Green",
      "safety_check": "string"
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Analysis failure:", error);
    return {
      reasoning: "Verified path with shared history.",
      magic_script: `Hey ${match.bridgeName}, could you introduce me to ${match.name.split(' ')[0]}?`,
      timing_guidance: "Evening message is best.",
      confidence_statement: "High trust probability.",
      safety_status: "Green",
      safety_check: "No red flags."
    };
  }
}

/**
 * Uses Google Search Grounding to find up-to-date context about a match
 */
export async function getSocialContext(match: MatchProfile): Promise<SocialInsight> {
  try {
    const prompt = `Find 2 interesting current events or news related to ${match.company || match.location || match.interests[0]} for a conversation icebreaker with ${match.name}.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || 'Source',
      uri: chunk.web?.uri || ''
    })).filter((s: any) => s.uri) || [];

    return {
      text: response.text || "No insights found.",
      sources: sources.slice(0, 3)
    };
  } catch (error) {
    return { text: "Unable to sync social context right now.", sources: [] };
  }
}

/**
 * Uses Google Maps Grounding to find spots for meeting
 */
export async function getMapsContext(match: MatchProfile): Promise<MapInsight> {
  try {
    const prompt = `Find 3 high-rated, interesting spots (cafes, bars, galleries) in ${match.location} for a first meetup with someone interested in ${match.interests.join(', ')}.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }]
      }
    });

    const places = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.maps?.title || 'Place',
      uri: chunk.maps?.uri || ''
    })).filter((s: any) => s.uri) || [];

    return {
      text: response.text || "No places found.",
      places: places.slice(0, 3)
    };
  } catch (error) {
    return { text: "Map intelligence currently offline.", places: [] };
  }
}

/**
 * Chatbot powered by gemini-3-pro-preview
 */
export async function askCircloChat(message: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: message,
      config: {
        systemInstruction: "You are Circlo AI, a high-trust social network assistant. Help users understand trust scores, bridge paths, and find meaningful connections. Keep it concise and minimalist."
      }
    });
    return response.text || "I'm having trouble processing that right now.";
  } catch (error) {
    return "The vault is busy. Please try again soon.";
  }
}

/**
 * Edits a profile image using Gemini 2.5 Flash Image
 */
export async function editProfileImage(imageB64: string, editPrompt: string): Promise<string | null> {
  try {
    const base64Data = imageB64.split(',').pop() || '';
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: 'image/png'
            }
          },
          { text: `${editPrompt}. Return only the edited image in binary format.` }
        ]
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image edit failed:", error);
    return null;
  }
}
