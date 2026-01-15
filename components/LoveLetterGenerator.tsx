
import React, { useState } from 'react';
import { PenTool, Loader2, Copy, Check } from 'lucide-react';
import { craftLoveLetter } from '../services/geminiService';

const LoveLetterGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCraft = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const letter = await craftLoveLetter(prompt);
      setResult(letter);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Words of Affection</h1>
        <p className="text-slate-500">Sometimes the heart knows, but the words are hard to find.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <section className="bg-white p-8 rounded-[2.5rem] border border-rose-100 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-800">What do you want to say?</h2>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Tell me about a memory, an anniversary, or just how you feel today... e.g. 'Write a short poem about how her laughter sounds like morning light.'"
            className="w-full h-48 p-6 bg-slate-50 border-none rounded-3xl resize-none focus:ring-2 focus:ring-rose-200 outline-none"
          />
          <button
            onClick={handleCraft}
            disabled={loading || !prompt.trim()}
            className="w-full py-4 bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-100"
          >
            {loading ? <Loader2 className="animate-spin" /> : <PenTool size={20} />}
            {loading ? 'Crafting...' : 'Write Letter'}
          </button>
        </section>

        <section className={`transition-all duration-500 ${result ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`}>
          <div className="bg-white p-10 rounded-[2.5rem] border-2 border-rose-50 shadow-sm relative min-h-[400px] flex flex-col">
            {!result && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-400">
                <PenTool size={48} className="mb-4 opacity-20" />
                <p className="max-w-[200px]">Your heartfelt words will appear here.</p>
              </div>
            )}
            
            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                <Loader2 className="animate-spin mb-4" />
                <p>Pouring ink onto paper...</p>
              </div>
            )}

            {result && !loading && (
              <>
                <div className="flex-1">
                  <p className="font-serif text-xl text-slate-700 leading-relaxed whitespace-pre-wrap italic">
                    {result}
                  </p>
                </div>
                <div className="mt-8 flex justify-end pt-6 border-t border-rose-50">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-colors font-bold text-sm"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied' : 'Copy Text'}
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoveLetterGenerator;
