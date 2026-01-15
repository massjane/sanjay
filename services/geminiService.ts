
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { DateIdea } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateDateIdeas = async (preferences: string): Promise<DateIdea[]> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate 3 romantic and unique date ideas based on these preferences: ${preferences}. 
    Return the response in a structured JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            budget: { type: Type.STRING },
            setting: { type: Type.STRING },
            activity: { type: Type.STRING },
          },
          required: ["title", "description", "budget", "setting", "activity"],
        },
      },
    },
  });

  return JSON.parse(response.text || '[]');
};

export const tellMemoryStory = async (imageB64: string, context?: string, tone: string = 'Poetic'): Promise<string> => {
  const ai = getAI();
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: imageB64 } },
        { text: `Look at this photo of a couple. Using the following context: "${context || 'a shared moment'}". 
        Write a short, highly emotional and ${tone} story (3-4 sentences) that captures the soul of this memory. 
        Focus on their connection and the feeling of their 1st year together.` }
      ]
    },
    config: {
      systemInstruction: "You are an elite romantic biographer. You transform photos into timeless literary snapshots of love."
    }
  });
  return response.text || "A beautiful moment captured in time.";
};

export const getCounselingAdvice = async (history: { role: 'user' | 'model', text: string }[]): Promise<string> => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: "You are Love Hub, a compassionate relationship coach. Your goal is to help couples communicate better, resolve minor conflicts with empathy, and suggest bonding exercises. Keep advice gentle and encouraging."
    }
  });

  const lastMessage = history[history.length - 1];
  const response = await chat.sendMessage({ message: lastMessage.text });
  return response.text || "I'm here to listen. Tell me more.";
};

export const craftLoveLetter = async (prompt: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Write a heartfelt, romantic love letter or poem based on the following context: ${prompt}. Make it sound authentic and deeply personal.`
  });
  return response.text || "My dearest...";
};
