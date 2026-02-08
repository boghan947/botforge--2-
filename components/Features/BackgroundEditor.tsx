
import React, { useState } from 'react';
import { editBackground } from '../../services/geminiService';
import { useStore } from '../../store/useStore';

const BackgroundEditor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [instruction, setInstruction] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { addBotcoins } = useStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleProcess = async () => {
    if (!image || !instruction || isProcessing) return;

    setIsProcessing(true);
    try {
      const res = await editBackground(image, instruction);
      if (res) {
        setResult(res);
        addBotcoins(100, 'Global Scene Transformation', 'IMAGE');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
        {/* Left Control Panel */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl shadow-2xl">
            <h3 className="text-2xl font-display font-bold text-white mb-2 uppercase tracking-tighter">Scene Architect</h3>
            <p className="text-xs text-slate-500 mb-8 uppercase tracking-widest">Neural manipulation tier: Unlimited</p>
            
            <div className="space-y-6">
              <div className="relative border-2 border-dashed border-white/10 rounded-2xl p-8 transition-all hover:border-purple-500/50 hover:bg-white/5 flex flex-col items-center justify-center text-center cursor-pointer group shadow-inner">
                <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                {image ? (
                  <div className="relative group/img">
                    <img src={image} alt="Preview" className="max-h-40 rounded-lg shadow-lg" />
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                       <p className="text-[10px] font-bold text-white uppercase tracking-widest">Change Asset</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-white/5">
                      <svg className="w-8 h-8 text-slate-400 group-hover:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    </div>
                    <p className="text-sm font-bold text-slate-300">Upload Base Asset</p>
                    <p className="text-[10px] text-slate-600 mt-2 uppercase tracking-widest">Unlimited capacity available</p>
                  </>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">Architectural Vision</label>
                <input 
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all shadow-inner"
                  placeholder="Describe the new environment (e.g., 'Floating island in nebula')"
                />
              </div>

              <button 
                onClick={handleProcess}
                disabled={!image || !instruction || isProcessing}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-[1.02] h-16 rounded-2xl font-bold text-white shadow-xl transition-all active:scale-95 disabled:opacity-30 flex items-center justify-center gap-3"
              >
                {isProcessing ? (
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.1s]"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  </div>
                ) : (
                  <>
                    <span className="uppercase tracking-widest">Re-Manifest Scene</span>
                    <span className="text-[10px] font-bold text-purple-200 ml-2 border-l border-white/20 pl-3">UNLIMITED</span>
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="bg-purple-600/10 border border-purple-500/20 p-6 rounded-3xl flex items-start gap-4 backdrop-blur-md">
             <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
             </div>
             <div>
               <p className="text-sm font-bold text-white mb-1 uppercase tracking-tighter">Manifestation Tip</p>
               <p className="text-[11px] text-slate-500 leading-relaxed uppercase tracking-tighter">Neural backgrounds blend best with high-contrast subjects. Use descriptive environmental terms for superior architectural results.</p>
             </div>
          </div>
        </div>

        {/* Right Result Display */}
        <div className="bg-slate-900/50 border border-white/10 rounded-[2.5rem] overflow-hidden flex items-center justify-center relative shadow-2xl backdrop-blur-md group">
          {result ? (
            <>
               <img src={result} alt="Architected Scene" className="w-full h-full object-cover animate-pulse-once" />
               <div className="absolute top-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => {
                     const link = document.createElement('a');
                     link.href = result;
                     link.download = `scene_${Date.now()}.png`;
                     link.click();
                  }} className="p-3 bg-purple-600 rounded-xl text-white shadow-xl hover:scale-110 transition-transform">
                     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                     </svg>
                  </button>
               </div>
            </>
          ) : (
            <div className="text-center opacity-30 group-hover:opacity-50 transition-opacity">
              <div className="relative w-32 h-32 mx-auto mb-6">
                 <div className="absolute inset-0 border-4 border-slate-700 rounded-full animate-ping opacity-20"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                 </div>
              </div>
              <p className="font-display text-lg uppercase tracking-[0.3em] font-bold text-slate-500">Waiting for Manifestation</p>
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        @keyframes pulse-once {
          0% { filter: brightness(1.5) blur(5px); }
          100% { filter: brightness(1) blur(0); }
        }
        .animate-pulse-once {
          animation: pulse-once 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BackgroundEditor;
