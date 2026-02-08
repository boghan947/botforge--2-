
import { useState, useEffect, useCallback } from 'react';
import { UserProfile, ActivityItem } from '../types';

const INITIAL_PROFILE: UserProfile = {
  id: 'user_1',
  username: 'AgentForge',
  email: 'agent@botforge.ai',
  avatar: 'https://picsum.photos/seed/botforge/200/200',
  botcoins: 9999999,
  level: 99,
  experience: 0,
  history: []
};

export const useStore = () => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('botforge_profile');
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  const [lastLogin, setLastLogin] = useState<number>(() => {
    return Number(localStorage.getItem('botforge_last_login')) || 0;
  });

  useEffect(() => {
    localStorage.setItem('botforge_profile', JSON.stringify(profile));
  }, [profile]);

  const addExperience = useCallback((amount: number) => {
    setProfile(prev => {
      const newExp = prev.experience + amount;
      const expNeeded = prev.level * 1000;
      if (newExp >= expNeeded) {
        return {
          ...prev,
          level: prev.level + 1,
          experience: newExp - expNeeded,
          botcoins: prev.botcoins + 1000
        };
      }
      return { ...prev, experience: newExp };
    });
  }, []);

  const addBotcoins = useCallback((amount: number, detail: string, type: ActivityItem['type']) => {
    setProfile(prev => {
      const newItem: ActivityItem = {
        id: Math.random().toString(36).substr(2, 9),
        type,
        timestamp: Date.now(),
        detail,
        coinsChange: amount
      };
      return {
        ...prev,
        botcoins: Math.max(0, prev.botcoins + amount),
        history: [newItem, ...prev.history].slice(0, 50)
      };
    });
    if (amount > 0) addExperience(amount * 5);
  }, [addExperience]);

  const claimDailyReward = useCallback(() => {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    if (now - lastLogin > oneDay) {
      addBotcoins(500, 'Daily Grand Reward', 'REWARD');
      setLastLogin(now);
      localStorage.setItem('botforge_last_login', now.toString());
      return true;
    }
    return false;
  }, [lastLogin, addBotcoins]);

  return {
    profile,
    addBotcoins,
    claimDailyReward,
    setProfile
  };
};
