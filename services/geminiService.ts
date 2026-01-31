
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getAIResponse = async (userMessage: string) => {
  if (!API_KEY) return "Support is currently unavailable.";

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: "You are a helpful customer support agent for Nagad88, a leading online gaming platform in Bangladesh. Answer in Bengali. Be polite and professional. Help users with account creation, deposits (via Nagad, Bkash, Rocket), and game rules. If you don't know, suggest they contact WhatsApp support.",
      },
    });
    return response.text || "দুঃখিত, আমি বুঝতে পারছি না। দয়া করে আবার বলুন।";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "সার্ভারে কিছু সমস্যা হয়েছে। দয়া করে কিছুক্ষণ পর চেষ্টা করুন।";
  }
};
