
import { GoogleGenAI, Type, Modality } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are BotForge AI. You are a world-class assistant, helpful, professional, and slightly futuristic. 
If the user asks to build an app or a visual component, provide a complete, standalone, single-file HTML/CSS/JS solution inside a markdown code block starting with \`\`\`html. 
Make the apps look premium with Tailwind CSS (already available via CDN). 
Always identify yourself as BotForge.`;

export const getGeminiChatStream = async (prompt: string, history: {role: 'user' | 'model', parts: {text: string}[]}[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const responseStream = await ai.models.generateContentStream({
    model: 'gemini-3-flash-preview',
    contents: [...history, { role: 'user', parts: [{ text: prompt }] }],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION
    }
  });
  return responseStream;
};

export const getGeminiResponse = async (prompt: string, history: {role: 'user' | 'model', parts: {text: string}[]}[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.AIzaSyCGvrHKARaR7DKnorEvRtt21DkGe_G2dKQ });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [...history, { role: 'user', parts: [{ text: prompt }] }],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION
    }
  });
  return response.text;
};

export const generateImage = async (prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: `Generate a high-quality, professional, aesthetic image of: ${prompt}` }]
    },
    config: {
      imageConfig: { aspectRatio: "1:1" }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

export const generateSpeech = async (text: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  return base64Audio;
};

export const editBackground = async (imageB64: string, instruction: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: imageB64.split(',')[1], mimeType: 'image/png' } },
        { text: `Re-architect the background of this image based on: ${instruction}. Maintain the subject integrity.` }
      ]
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

export function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
