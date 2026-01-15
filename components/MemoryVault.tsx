
import React, { useState, useRef } from 'react';
import { Camera, Plus, Loader2, Heart, Sparkles, BookOpen, Music, Trash2, Book, Pen } from 'lucide-react';
import { tellMemoryStory } from '../services/geminiService';
import { Memory } from '../types';

const StoryLoadingIndicator: React.FC = () => (
  <div className="flex flex-col items-center justify-center space-y-4 py-8">
    <div className="relative">
      <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center animate-pulse">
        <Book size={32} className="text-rose-400 animate-bounce" />
      </div>
      <div className="absolute -top-2 -right-2">
        <Pen size={20} className="text-amber-500 animate-writing-quill" />
      </div>
      <Sparkles size={16} className="absolute top-0 -left-4 text-amber-300 animate-ping" />
      <Sparkles size={12} className="absolute bottom-2 -right-6 text-rose-300 animate-ping delay-300" />
    </div>
    <div className="text-center">
      <p className="text-rose-600 font-serif italic text-lg animate-pulse">Turning this moment into poetry...</p>
      <div className="flex gap-1 justify-center mt-2">
        <div className="w-1.5 h-1.5 bg-rose-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-1.5 h-1.5 bg-rose-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-1.5 h-1.5 bg-rose-300 rounded-full animate-bounce"></div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes writing-quill {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(5px, -5px) rotate(15deg); }
        50% { transform: translate(10px, 0px) rotate(-10deg); }
        75% { transform: translate(5px, 5px) rotate(5deg); }
      }
      .animate-writing-quill {
        animation: writing-quill 2s ease-in-out infinite;
      }
    `}} />
  </div>
);

const MemoryVault: React.FC = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [context, setContext] = useState('');
  const [selectedTone, setSelectedTone] = useState('Poetic');
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tones = [
    { id: 'Poetic', icon: '✨', label: 'Poetic' },
    { id: 'Cinematic', icon: '🎬', label: 'Cinematic' },
    { id: 'Nostalgic', icon: '🕰️', label: 'Nostalgic' },
    { id: 'Humorous', icon: '😄', label: 'Funny' },
  ];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      const base64Data = base64.split(',')[1];
      
      try {
        const story = await tellMemoryStory(base64Data, context, selectedTone);
        const newMemory: Memory = {
          id: Date.now().toString(),
          imageUrl: base64,
          caption: context || "A New Chapter",
          story: story,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        };
        setMemories([newMemory, ...memories]);
        setIsGeneratorOpen(false);
        setContext('');
      } catch (err) {
        console.error(err);
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const deleteMemory = (id: string) => {
    setMemories(memories.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700 pb-12">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-rose-500">
            <BookOpen size={28} />
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight">Our Storybook</h1>
          </div>
          <p className="text-slate-500 text-lg max-w-md">Every picture tells a story. Let AI write yours into eternity.</p>
        </div>
        
        {!isGeneratorOpen && (
          <button 
            onClick={() => setIsGeneratorOpen(true)}
            className="group relative bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all hover:bg-rose-600 shadow-xl shadow-slate-200"
          >
            <Sparkles className="animate-pulse" size={20} />
            Capture New Memory
            <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          </button>
        )}
      </header>

      {/* AI Story Generator Modal/Area */}
      {isGeneratorOpen && (
        <div className="bg-white border border-rose-100 rounded-[3rem] p-8 md:p-12 shadow-2xl animate-in zoom-in-95 duration-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 pointer-events-none" />
          
          {isUploading ? (
            <div className="min-h-[400px] flex items-center justify-center">
              <StoryLoadingIndicator />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">1. Set the Vibe</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {tones.map((tone) => (
                      <button
                        key={tone.id}
                        onClick={() => setSelectedTone(tone.id)}
                        className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${
                          selectedTone === tone.id 
                            ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-inner' 
                            : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-rose-200'
                        }`}
                      >
                        <span className="text-xl">{tone.icon}</span>
                        <span className="font-bold text-sm uppercase tracking-wider">{tone.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">2. What happened?</h3>
                  <div className="relative">
                    <textarea
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                      placeholder="Briefly describe the moment... (e.g., 'Rainy day coffee in Venice')"
                      className="w-full h-32 p-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-rose-200 resize-none outline-none transition-all placeholder:text-slate-300"
                    />
                    <div className="absolute bottom-4 right-4 text-xs font-bold text-rose-300 uppercase tracking-widest">
                      AI Context
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setIsGeneratorOpen(false)}
                    className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl font-bold hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex-[2] bg-rose-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-rose-600 shadow-lg shadow-rose-200 disabled:bg-rose-300 transition-all active:scale-95"
                  >
                    <Camera size={20} />
                    Create Story
                  </button>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileUpload} 
                />
              </div>

              <div className="hidden md:flex flex-col items-center justify-center p-12 bg-rose-50/50 rounded-[2.5rem] border-2 border-dashed border-rose-100 min-h-[400px]">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <Music className="text-rose-400 animate-bounce" size={32} />
                </div>
                <h4 className="text-xl font-bold text-rose-800 mb-2">The AI Storyteller</h4>
                <p className="text-center text-rose-600/70 text-sm leading-relaxed max-w-xs italic">
                  "Upload a photo, and I'll analyze every look, smile, and sunset to write a piece of your 1st-year legacy."
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Memories Gallery */}
      <div className="space-y-8">
        {memories.length > 0 && (
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Heart size={20} className="text-rose-500 fill-rose-500" />
            Our Collected Moments
          </h2>
        )}

        {memories.length === 0 && !isUploading && !isGeneratorOpen && (
          <div className="bg-white border-2 border-dashed border-rose-100 rounded-[3rem] p-20 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-8 shadow-inner">
              <Camera className="text-rose-400" size={48} />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4 font-serif italic">A blank page in our history</h2>
            <p className="text-slate-500 max-w-sm mb-10 leading-relaxed">Your storybook is waiting for its first entry. Upload a photo and let's start writing your 1st-anniversary legacy together.</p>
            <button 
              onClick={() => setIsGeneratorOpen(true)}
              className="px-10 py-5 bg-rose-500 text-white rounded-2xl font-bold flex items-center gap-3 hover:bg-rose-600 transition-all shadow-xl shadow-rose-200"
            >
              Start Telling Stories
            </button>
          </div>
        )}

        <div className="columns-1 md:columns-2 gap-8 space-y-8">
          {isUploading && !isGeneratorOpen && (
            <div className="break-inside-avoid aspect-[4/5] bg-slate-50 rounded-[2.5rem] flex flex-col items-center justify-center border-2 border-dashed border-rose-100">
               <StoryLoadingIndicator />
            </div>
          )}
          
          {memories.map((mem) => (
            <article key={mem.id} className="break-inside-avoid bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-rose-50 group hover:shadow-xl hover:shadow-rose-100/50 transition-all duration-500 relative">
              <div className="relative overflow-hidden group/img">
                <img 
                  src={mem.imageUrl} 
                  alt={mem.caption} 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000" 
                />
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-slate-800 shadow-sm uppercase tracking-widest">
                    {mem.date}
                  </span>
                </div>
                <button 
                  onClick={() => deleteMemory(mem.id)}
                  className="absolute top-6 right-6 p-3 bg-white/20 hover:bg-rose-500 text-white backdrop-blur-md rounded-2xl opacity-0 group-hover/img:opacity-100 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-50 rounded-xl">
                    <Heart size={16} className="text-rose-500 fill-rose-500" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-800 font-serif italic">{mem.caption}</h3>
                </div>
                <div className="relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-rose-100 rounded-full" />
                  <p className="text-slate-600 italic leading-relaxed font-serif text-lg animate-in fade-in slide-in-from-left-2 duration-1000">
                    "{mem.story}"
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryVault;
