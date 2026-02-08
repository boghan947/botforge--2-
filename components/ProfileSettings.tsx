
import React from 'react';
import { useStore } from '../store/useStore';

const ProfileSettings: React.FC = () => {
  const { profile } = useStore();

  return (
    <div className="h-full overflow-y-auto p-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="relative">
          <img src={profile.avatar} alt="Profile" className="w-32 h-32 rounded-[2.5rem] border-4 border-purple-600 shadow-2xl shadow-purple-500/20" />
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-yellow-400 rounded-2xl flex items-center justify-center text-slate-900 font-bold border-4 border-slate-950">
            {profile.level}
          </div>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-display font-bold text-white mb-2">{profile.username}</h2>
          <p className="text-slate-400 font-medium mb-4">{profile.email}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
             <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-400 uppercase tracking-widest">Premium Member</span>
             <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-400 uppercase tracking-widest">Early Adopter</span>
             <span className="px-3 py-1 bg-purple-600/10 border border-purple-500/20 rounded-lg text-xs font-bold text-purple-400 uppercase tracking-widest">App Architect</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center">
          <p className="text-3xl font-display font-bold text-white mb-1">{profile.botcoins}</p>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em]">Available Botcoins</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center">
          <p className="text-3xl font-display font-bold text-white mb-1">{profile.history.length}</p>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em]">Neural Operations</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center">
          <p className="text-3xl font-display font-bold text-white mb-1">Rank #{100 - profile.level}</p>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em]">Global Architect Rank</p>
        </div>
      </div>

      <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-3">
        <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Activity Log
      </h3>

      <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Operation</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Currency Delta</th>
              <th className="px-6 py-4">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {profile.history.map((item) => (
              <tr key={item.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      item.type === 'CHAT' ? 'bg-blue-500/20 text-blue-400' :
                      item.type === 'IMAGE' ? 'bg-purple-500/20 text-purple-400' :
                      item.type === 'VOICE' ? 'bg-green-500/20 text-green-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-white">{item.type} Analysis</p>
                      <p className="text-xs text-slate-500 truncate max-w-[200px]">{item.detail}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold rounded uppercase">Executed</span>
                </td>
                <td className={`px-6 py-4 font-bold ${item.coinsChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {item.coinsChange > 0 ? '+' : ''}{item.coinsChange} BC
                </td>
                <td className="px-6 py-4 text-slate-500">
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </td>
              </tr>
            ))}
            {profile.history.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500 italic">No neural operations detected in the current session.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileSettings;
