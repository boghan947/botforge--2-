
import React from 'react';

export type AppState = 'INTRO' | 'AUTH' | 'DASHBOARD';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar: string;
  botcoins: number;
  level: number;
  experience: number;
  history: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'CHAT' | 'IMAGE' | 'VOICE' | 'REWARD';
  timestamp: number;
  detail: string;
  coinsChange: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  code?: string;
}

export interface AppTool {
  id: string;
  name: string;
  // Fix: Importing React is required to use the React namespace for ReactNode
  icon: React.ReactNode;
  description: string;
}
