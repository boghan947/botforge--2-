
import React from 'react';

interface IntroScreenProps {
  isReplay?: boolean;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ isReplay }) => {
  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-50 overflow-hidden">
      <div className="relative">
        {/* Glowing Background */}
        <div className="absolute inset-0 bg-purple-600/20 blur-[100px] animate-pulse rounded-full"></div>
        
        {/* Animated Logo Container */}
        <div className="relative flex flex-col items-center">
          <div className="w-24 h-24 mb-6 relative animate-bounce">
            <svg viewBox="0 0 100 100" className="w-full h-full text-purple-500">
              <rect x="20" y="20" width="60" height="60" rx="12" className="stroke-current fill-none" strokeWidth="6" />
              <path d="M40 45 L50 35 L60 45" className="stroke-current fill-none" strokeWidth="6" strokeLinecap="round" />
              <circle cx="35" cy="60" r="4" className="fill-current" />
              <circle cx="65" cy="60" r="4" className="fill-current" />
              <path d="M40 70 Q50 75 60 70" className="stroke-current fill-none" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 border-4 border-purple-500/30 rounded-2xl animate-ping"></div>
          </div>
          
          <h1 className="text-5xl font-display font-bold text-white tracking-widest animate-pulse">
            BOTFORGE
          </h1>
          <p className="text-purple-400 mt-2 font-medium tracking-widest text-sm opacity-80 uppercase">
            {isReplay ? 'Authenticating...' : 'Initializing Systems'}
          </p>
        </div>
      </div>

      {/* Modern Loading Bar */}
      <div className="absolute bottom-20 w-64 h-1 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 animate-[loading_3s_ease-in-out_infinite]"></div>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default IntroScreen;
