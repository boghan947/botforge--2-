
import React, { useState } from 'react';
import { generateSpeech, decodeBase64, decodeAudioData } from '../../services/geminiService';
import { useStore } from '../../store/useStore';

const VoiceGen: React.FC = () => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addBotcoins } = useStore();

  const handleSynthesize = async () => {
    if (!text.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const b64 = await generateSpeech(text);
      if (b64) {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const bytes = decodeBase64(b64);
        const buffer = await decodeAudioData(bytes, audioCtx);
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.start();
        addBotcoins(25, `Vocal Matrix Render: ${text.substring(0, 20)}...`, 'VOICE');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-8 items-center justify-center max-w-4xl mx-auto overflow-y-auto">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-display font-bold text-white mb-4 uppercase tracking-tighter">Sonic Morph Engine</h3>
        <p className="text-slate-400">Convert any text into high-fidelity neural speech. Pro Tier Unlimited Access active.</p>
      </div>

      <div className="w-full bg-slate-900/50 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4">
           <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
              <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Kore-X Unlimited</span>
           </div>
        </div>

        <label className="block text-xs font-bold text-slate-500 mb-4 uppercase tracking-[0.2em]">Neural Input Stream</label>
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-32 bg-slate-950/80 border border-white/10 rounded-2xl p-6 text-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all placeholder:text-slate-800 shadow-inner"
          placeholder="Enter the phrase to be manifested..."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {['Aesthetic', 'Energetic', 'Authoritative', 'Ethereal'].map((style) => (
            <button key={style} className="px-4 py-3 bg-white/5 border border-white/5 hover:border-purple-500/50 hover:bg-purple-500/5 rounded-xl text-[10px] font-bold text-slate-500 hover:text-white transition-all uppercase tracking-widest">
              {style}
            </button>
          ))}
        </div>

        <button 
          onClick={handleSynthesize}
          disabled={isLoading}
          className="w-full mt-10 bg-white hover:bg-purple-50 text-slate-900 h-16 rounded-2xl font-bold flex items-center justify-center gap-4 group transition-all transform active:scale-95 disabled:opacity-50 shadow-xl"
        >
          {isLoading ? (
             <div className="flex gap-2">
               <div className="w-2 h-2 bg-slate-900 rounded-full animate-bounce"></div>
               <div className="w-2 h-2 bg-slate-900 rounded-full animate-bounce [animation-delay:0.1s]"></div>
               <div className="w-2 h-2 bg-slate-900 rounded-full animate-bounce [animation-delay:0.2s]"></div>
             </div>
          ) : (
            <>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="uppercase tracking-widest text-sm">Initialize Vocalizer</span>
              <span className="text-[10px] font-bold text-green-600 ml-auto mr-4 uppercase tracking-tighter">Unlimited BC</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-12 flex gap-12 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
        <div className="text-center">
          <p className="text-2xl font-display font-bold text-white tracking-tighter">48kHz</p>
          <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Hi-Fi Response</p>
        </div>
        <div className="w-[1px] bg-white/10 h-12"></div>
        <div className="text-center">
          <p className="text-2xl font-display font-bold text-white tracking-tighter">32-Bit</p>
          <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Float Depth</p>
        </div>
        <div className="w-[1px] bg-white/10 h-12"></div>
        <div className="text-center">
          <p className="text-2xl font-display font-bold text-white tracking-tighter">&lt;200ms</p>
          <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Neural Latency</p>
        </div>
      </div>
    </div>
  );
};

export default VoiceGen;
