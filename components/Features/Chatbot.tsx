
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiChatStream } from '../../services/geminiService';
import { useStore } from '../../store/useStore';
import { ChatMessage } from '../../types';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState<string | null>(null);
  const { addBotcoins } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    let streamText = "";
    const aiMsgId = (Date.now() + 1).toString();

    // Initial message holder for stream
    setMessages(prev => [...prev, { id: aiMsgId, role: 'model', text: "" }]);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const stream = await getGeminiChatStream(input, history);
      
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        if (chunkText) {
          streamText += chunkText;
          setMessages(prev => 
            prev.map(m => m.id === aiMsgId ? { ...m, text: streamText } : m)
          );
        }
      }
      
      // Look for code block in final text
      const codeMatch = streamText.match(/```(?:html|javascript|css)?\s*([\s\S]*?)```/i);
      const code = codeMatch ? codeMatch[1] : undefined;

      if (code) {
        setMessages(prev => 
          prev.map(m => m.id === aiMsgId ? { ...m, code } : m)
        );
        setShowPreview(code);
      }

      addBotcoins(10, 'Advanced Neural Link Established', 'CHAT');
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: 'err', role: 'model', text: 'Error communicating with BotForge neural link. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full">
      {/* Chat Area */}
      <div className={`flex flex-col flex-1 transition-all duration-500 ${showPreview ? 'max-w-[50%]' : 'max-w-full'}`}>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <div className="w-20 h-20 bg-slate-800 rounded-3xl mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-2 uppercase tracking-widest">BotForge v3.0</h3>
              <p className="max-w-md text-slate-400">Unlimited neural processing active. Ask me to build apps, solve problems, or generate content.</p>
            </div>
          )}

          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl ${
                m.role === 'user' 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' 
                  : 'bg-white/5 border border-white/10 text-slate-100'
              } transition-all duration-300`}>
                <p className="whitespace-pre-wrap leading-relaxed text-sm">
                  {m.text.replace(/```[\s\S]*?```/g, '') || (m.role === 'model' && !isLoading ? '...' : '')}
                </p>
                {m.code && (
                  <button 
                    onClick={() => setShowPreview(m.code!)}
                    className="mt-3 px-3 py-1.5 bg-slate-900/50 hover:bg-slate-900 border border-white/10 rounded-lg text-xs font-bold text-purple-400 flex items-center gap-2 transition-colors group"
                  >
                    <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Live Manifestation
                  </button>
                )}
              </div>
            </div>
          ))}

          {isLoading && !messages[messages.length - 1]?.text && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-6 border-t border-white/5 bg-slate-950/80 backdrop-blur-xl">
          <div className="relative max-w-4xl mx-auto">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Request a complex application or ask a question..."
              className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-6 pr-16 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all shadow-inner"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 hover:scale-110 rounded-xl flex items-center justify-center text-white transition-all active:scale-95 disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-center text-[9px] text-slate-500 mt-3 uppercase tracking-widest font-bold">
            Unlimited Neural Compute Tier • Powered by Gemini 3 Pro
          </p>
        </div>
      </div>

      {/* Preview Sidebar */}
      {showPreview && (
        <div className="w-[50%] border-l border-white/10 bg-slate-900/50 flex flex-col animate-[slideIn_0.3s_ease-out]">
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900">
            <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Virtual Sandbox Mode
            </h3>
            <div className="flex gap-2">
               <button 
                onClick={() => {
                  const blob = new Blob([showPreview], {type: 'text/html'});
                  const url = URL.createObjectURL(blob);
                  window.open(url, '_blank');
                }}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                title="Open in new window"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
              <button 
                onClick={() => setShowPreview(null)}
                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-500/5 rounded-lg transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <iframe 
            srcDoc={showPreview.includes('<!DOCTYPE html>') ? showPreview : `<!DOCTYPE html><html><head><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-slate-950">${showPreview}</body></html>`}
            className="flex-1 bg-white"
            title="App Preview"
          />
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
