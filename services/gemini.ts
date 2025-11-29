import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are a Senior Staff Frontend Engineer at a top-tier tech company (like Netflix, Vercel, or Linear). 
You are conducting a technical interview prep session.
Your tone is professional, encouraging, concise, and highly technical.
Focus on:
1. Trade-offs (e.g., Virtual DOM vs Direct Manipulation, CSR vs SSR vs ISR).
2. Performance optimizations (rendering, network, bundles).
3. System design scalability.
4. Clean code and best practices.

Do not give generic junior-level advice. Assume the user is experienced but wants to reach the staff level.
If asked for code, provide clean, modern TypeScript React code.
`;

export const sendMessageToCoach = async (history: Message[], newMessage: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.content }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to the interview coach. Please check your API key.";
  }
};

export const generateChallenge = async (topic: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a short, difficult, senior-level frontend interview challenge question related to: ${topic}. 
      Focus on a specific scenario (e.g., "Design a file uploader that handles 5GB files"). 
      Keep it under 2 sentences.`,
    });
    return response.text;
  } catch (error) {
    return "Design a real-time collaborative text editor using OT or CRDTs.";
  }
};