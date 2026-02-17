
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeLog = async (logDetails: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a high-level security officer for NagadBet, a sports betting platform. Analyze this security/transaction log and explain the risk level (Low, Medium, High). Specifically look for money laundering patterns or account takeover signs via Nagad. Provide 3 bullet points of actionable advice. Keep it bold and professional. Log: ${logDetails}`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });
    return response.text;
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return "Failed to analyze log. Please check your API configuration.";
  }
};

export const generateAdminReport = async (stats: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a betting platform consultant. Based on these NagadBet system statistics, generate a strategic summary for the management board. Focus on GGR (Gross Gaming Revenue), user retention, and risk mitigation. Use a confident, results-oriented tone. Stats: ${stats}`,
      config: {
        temperature: 0.8,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Report generation failed:", error);
    return "Failed to generate report.";
  }
};

export const suggestUserPolicy = async (userName: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a security access review for ${userName}, an admin on the NagadBet betting platform. Suggest specific permission adjustments to prevent internal fraud or transaction tampering.`,
    });
    return response.text;
  } catch (error) {
    return "Error generating suggestion.";
  }
};
