
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles, Loader2, Info } from 'lucide-react';
import { getCounselingAdvice } from '../services/geminiService';
import { Message } from '../types';

const RelationshipCoach: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello. I'm Love Hub, your relationship companion. How are things going between you and your partner today? Is there something you'd like to discuss or a bond you'd like to strengthen?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await getCounselingAdvice([...messages, userMessage]);
      setMessages((prev) => [...prev, { role: 'model', text: response }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: 'model', text: "I'm sorry, I'm having trouble connecting right now. Let's try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-180px)] md:h-[calc(100vh-120px)] flex flex-col animate-in fade-in duration-500">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Heart-to-Heart</h1>
          <p className="text-slate-500 flex items-center gap-2">
            AI Communication Coach
            <span className="inline-block px-2 py-0.5 bg-rose-100 text-rose-600 text-[10px] font-bold rounded uppercase">Compassionate AI</span>
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-white border border-slate-100 px-4 py-2 rounded-2xl">
          <Info size={14} />
          Private & Secure Conversation
        </div>
      </header>

      <div className="flex-1 bg-white rounded-[2.5rem] border border-rose-100 shadow-sm flex flex-col overflow-hidden">
        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-slate-800' : 'bg-rose-500'
                }`}>
                  {msg.role === 'user' ? <User size={20} className="text-white" /> : <Sparkles size={20} className="text-white" />}
                </div>
                <div className={`p-4 rounded-[1.5rem] ${
                  msg.role === 'user' 
                    ? 'bg-slate-100 text-slate-800 rounded-tr-none' 
                    : 'bg-rose-50 text-rose-900 rounded-tl-none'
                }`}>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
               <div className="flex gap-3">
                 <div className="w-10 h-10 rounded-2xl bg-rose-500 flex items-center justify-center">
                    <Loader2 size={20} className="text-white animate-spin" />
                 </div>
                 <div className="p-4 rounded-[1.5rem] bg-rose-50 rounded-tl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-rose-300 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-rose-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-rose-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    </div>
                 </div>
               </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-6 border-t border-slate-100">
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tell me what's on your mind..."
              className="flex-1 bg-slate-50 border-none rounded-2xl px-6 focus:ring-2 focus:ring-rose-200 outline-none"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="w-14 h-14 bg-rose-500 text-white rounded-2xl flex items-center justify-center hover:bg-rose-600 transition-colors disabled:bg-rose-300"
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelationshipCoach;
