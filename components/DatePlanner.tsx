
import React, { useState } from 'react';
import { Sparkles, MapPin, DollarSign, Loader2 } from 'lucide-react';
import { generateDateIdeas } from '../services/geminiService';
import { DateIdea } from '../types';

const DatePlanner: React.FC = () => {
  const [preferences, setPreferences] = useState('');
  const [ideas, setIdeas] = useState<DateIdea[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!preferences.trim()) return;
    setLoading(true);
    try {
      const result = await generateDateIdeas(preferences);
      setIdeas(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Date Night Planner</h1>
        <p className="text-slate-500">Let AI design the perfect experience for you two.</p>
      </header>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-rose-50">
        <label className="block text-sm font-semibold text-slate-700 mb-2">What are you in the mood for?</label>
        <textarea
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          placeholder="e.g. Low budget, outdoor activity, maybe something artistic, we have 4 hours..."
          className="w-full h-32 p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-rose-300 resize-none mb-4"
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !preferences.trim()}
          className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
          {loading ? 'Curating Ideas...' : 'Generate Romantic Ideas'}
        </button>
      </div>

      {ideas.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {ideas.map((idea, idx) => (
            <div key={idx} className="bg-white border border-rose-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              <div className="p-8 flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold text-slate-800 group-hover:text-rose-500 transition-colors">{idea.title}</h3>
                    <div className="flex items-center gap-1 px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-xs font-bold uppercase tracking-wider">
                      {idea.budget}
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{idea.description}</p>
                  
                  <div className="flex flex-wrap gap-4 pt-2">
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl">
                      <MapPin size={16} className="text-rose-400" />
                      {idea.setting}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl">
                      <Sparkles size={16} className="text-rose-400" />
                      {idea.activity}
                    </div>
                  </div>
                </div>
                <button className="md:w-32 bg-slate-800 text-white rounded-2xl font-semibold flex flex-col items-center justify-center p-4 hover:bg-slate-700 transition-colors">
                   <span className="text-xs opacity-70">ADD TO</span>
                   <span>PLAN</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DatePlanner;
