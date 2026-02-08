
import React from 'react';
import { useStore } from '../../store/useStore';

const BotcoinCounter: React.FC = () => {
  const { profile } = useStore();

  return (
    <div className="bg-slate-900 border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-lg hover:scale-105 transition-all cursor-help group relative">
      <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-slate-900 shadow-[0_0_15px_rgba(250,204,21,0.4)] group-hover:rotate-12 transition-transform">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.94 5.5c.944-.315 2.032-.5 3.06-.5 1.028 0 2.116.185 3.06.5.64.214.94.868.72 1.508l-.21 1.05a1 1 0 01-1.44.72l-1.05-.35a1 1 0 00-.63 0l-1.05.35a1 1 0 01-1.44-.72l-.21-1.05c-.22-.64.08-1.294.72-1.508zM5 11a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" />
        </svg>
      </div>
      <div>
        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-0.5">Infinite Balance</p>
        <p className="text-sm font-bold text-white leading-none uppercase tracking-tighter">Unlimited</p>
      </div>
      
      {/* Tooltip */}
      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-56 p-4 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-2">
           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
           <p className="text-[10px] font-bold text-white uppercase tracking-widest">Architect Tier: God</p>
        </div>
        <p className="text-[10px] text-slate-400 leading-relaxed uppercase tracking-tighter">You have been granted unlimited access to the BotForge neural engine. No costs, no limits.</p>
        <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
           <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 animate-[progress_1s_linear_infinite]" style={{width: '60%'}}></div>
        </div>
      </div>
      
      <style>{`
        @keyframes progress {
          from { transform: translateX(-100%); }
          to { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default BotcoinCounter;
