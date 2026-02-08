
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Chatbot from './Features/Chatbot';
import ImageGen from './Features/ImageGen';
import VoiceGen from './Features/VoiceGen';
import BackgroundEditor from './Features/BackgroundEditor';
import ProfileSettings from './ProfileSettings';
import BotcoinCounter from './UI/BotcoinCounter';
import { useStore } from '../store/useStore';

type Tab = 'chat' | 'images' | 'voice' | 'background' | 'settings';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const { profile, claimDailyReward } = useStore();
  const [showRewardToast, setShowRewardToast] = useState(false);

  useEffect(() => {
    const claimed = claimDailyReward();
    if (claimed) {
      setShowRewardToast(true);
      setTimeout(() => setShowRewardToast(false), 5000);
    }
  }, [claimDailyReward]);

  const renderContent = () => {
    switch (activeTab) {
      case 'chat': return <Chatbot />;
      case 'images': return <ImageGen />;
      case 'voice': return <VoiceGen />;
      case 'background': return <BackgroundEditor />;
      case 'settings': return <ProfileSettings />;
      default: return <Chatbot />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative h-full">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-slate-950/50 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-display font-bold capitalize text-white tracking-tight">
              {activeTab === 'chat' ? 'BotForge AI Assistant' : 
               activeTab === 'images' ? 'Neural Image Creator' :
               activeTab === 'voice' ? 'Sonic Morph Generator' :
               activeTab === 'background' ? 'Scene Architect' : 'Neural Core Settings'}
            </h2>
            <div className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] text-purple-400 font-bold tracking-widest uppercase">
              Pro Access
            </div>
          </div>

          <div className="flex items-center gap-6">
            <BotcoinCounter />
            <div className="flex items-center gap-3 border-l border-white/10 pl-6 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setActiveTab('settings')}>
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-white">{profile.username}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-tighter">Level {profile.level} Architect</p>
              </div>
              <img src={profile.avatar} alt="Avatar" className="w-10 h-10 rounded-xl border border-white/10 shadow-lg" />
            </div>
          </div>
        </header>

        {/* Feature Render */}
        <main className="flex-1 overflow-hidden">
          {renderContent()}
        </main>

        {/* Level Progress Bar (Bottom) */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
            style={{ width: `${(profile.experience / (profile.level * 1000)) * 100}%` }}
          />
        </div>

        {/* Toast for Reward */}
        {showRewardToast && (
          <div className="fixed bottom-10 right-10 bg-gradient-to-br from-purple-600 to-indigo-700 p-4 rounded-2xl shadow-2xl animate-bounce flex items-center gap-4 border border-white/20 z-50">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-slate-900 font-bold">
              🪙
            </div>
            <div>
              <p className="font-bold text-white">Daily Reward Claimed!</p>
              <p className="text-xs text-purple-100">+50 Botcoins added to your vault.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
