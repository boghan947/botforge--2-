
import React, { useState } from 'react';
import { generateImage } from '../../services/geminiService';
import { useStore } from '../../store/useStore';

const ImageGen: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { addBotcoins } = useStore();

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const img = await generateImage(prompt);
      if (img) {
        setResult(img);
        addBotcoins(50, `Image Asset Manifested: ${prompt.substring(0, 20)}...`, 'IMAGE');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-8 items-center overflow-y-auto">
      <div className="max-w-2xl w-full text-center mb-12">
        <h3 className="text-3xl font-display font-bold text-white mb-4 uppercase tracking-tighter">Neural Vision Core</h3>
        <p className="text-slate-400">Unlimited high-fidelity synthesis active. Manifest your thoughts into reality instantly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl pb-20">
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
            <label className="block text-sm font-bold text-slate-300 mb-3 uppercase tracking-widest">Synthesis Prompt</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-40 bg-slate-900/50 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none shadow-inner"
              placeholder="Cinematic shot of a cybernetic warrior in a rain-slicked Tokyo, 8k, photorealistic, neon highlights..."
            />
            
            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 text-[10px] text-purple-300 font-bold rounded-lg uppercase tracking-tighter">Unlimited Active</span>
                <span className="px-3 py-1 bg-green-500/20 border border-green-500/40 text-[10px] text-green-400 font-bold rounded-lg uppercase tracking-tighter">High Fidelity</span>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Cost</p>
                <p className="text-green-400 font-bold uppercase tracking-tighter">Free Access</p>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 py-4 rounded-2xl font-bold text-white hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-purple-900/20 disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping [animation-delay:0.4s]"></div>
                  </div>
                  Synthesizing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  Manifest Asset
                </>
              )}
            </button>
          </div>
        </div>

        <div className="relative aspect-square bg-slate-900/50 border-2 border-dashed border-white/10 rounded-3xl overflow-hidden group shadow-2xl">
          {result ? (
            <>
              <img src={result} alt="Generated" className="w-full h-full object-cover animate-[fadeIn_0.5s_ease-out]" />
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4">
                <button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = result;
                    link.download = `botforge_${Date.now()}.png`;
                    link.click();
                  }}
                  className="p-4 bg-purple-600 hover:bg-purple-500 rounded-full text-white transition-all transform hover:scale-110 shadow-xl"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
                <button 
                  onClick={() => setResult(null)}
                  className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all transform hover:scale-110 shadow-xl"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-700">
              <div className="w-24 h-24 mb-6 border-2 border-slate-800 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="font-display font-bold uppercase tracking-widest text-xs opacity-50">Awaiting Neural Input</p>
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(1.1); filter: blur(10px); }
          to { opacity: 1; transform: scale(1); filter: blur(0); }
        }
      `}</style>
    </div>
  );
};

export default ImageGen;
