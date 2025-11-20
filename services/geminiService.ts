import { GoogleGenAI, Chat } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = async () => {
  if (!API_KEY) {
    console.warn("Gemini API Key is missing. Chat will not function.");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are an AI Assistant for Shakibul Alam Emon's personal portfolio website. 
        
        About Shakibul:
        - Product Designer with expertise in UI/UX, React, and Motion Design.
        - Focuses on clean, dark-themed, functional aesthetics.
        - Based in Dhaka, Bangladesh (implied).
        - Passionate about "building something bigger than ourselves."
        
        Your Role:
        - Answer questions about Shakibul's skills, past work (Fintech Revolution, EcoStream, Lumina Health), and services.
        - Be professional, yet creative and witty. 
        - Keep answers concise (under 100 words usually).
        - If asked for contact info, refer them to the contact form or hello@lustra.studio (as per the design).
        
        Tone: Minimalist, confident, helpful.`,
      },
    });
    return chatSession;
  } catch (error) {
    console.error("Failed to initialize chat:", error);
    return null;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    await initializeChat();
  }

  if (!chatSession) {
    return "I'm currently offline due to configuration. Please email Shakibul directly.";
  }

  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "I didn't catch that. Could you rephrase?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error processing your request.";
  }
};
