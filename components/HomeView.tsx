
import React from 'react';
import { Heart, Stars, Sparkles, Trophy, Camera } from 'lucide-react';

const HomeView: React.FC = () => {
  const couplePhoto = "https://aistudio.google.com/content/f8c0529d3da59f711909a3410eb6714d2ca783f9828eb71d7986791b7d52f676";

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="space-y-2">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800">Hello, Lovers.</h1>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-xs font-bold border border-amber-200 self-start">
                <Trophy size={14} />
                1st Year Milestone Reached
            </div>
        </div>
        <p className="text-slate-500 text-lg">Welcome back to your private sanctuary.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Anniversary Photo Card */}
        <div className="relative group overflow-hidden rounded-[2.5rem] bg-slate-900 aspect-[16/10] md:aspect-auto md:h-64 shadow-xl shadow-rose-200/20 border border-white">
           <img 
            src={couplePhoto} 
            alt="Anniversary Moment" 
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
           <div className="absolute bottom-0 left-0 p-8 text-white">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-amber-500 p-1.5 rounded-lg">
                  <Camera size={16} className="text-white" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-amber-300">Milestone Photo</span>
              </div>
              <h2 className="text-2xl font-bold font-serif">Chapter One</h2>
              <p className="text-sm opacity-80 italic">Capturing the heart of our first 365 days.</p>
           </div>
           <div className="absolute top-6 right-6">
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                <Heart className="text-rose-400 fill-rose-400" size={24} />
              </div>
           </div>
        </div>

        <div className="bg-white border border-rose-100 rounded-[2.5rem] p-8 flex flex-col justify-between h-64 shadow-sm hover:shadow-md transition-shadow">
          <div>
            <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center mb-4">
              <Sparkles className="text-rose-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Daily Connection</h2>
            <p className="text-slate-500 italic leading-relaxed">"I love you not only for what you are, but for what I am when I am with you."</p>
          </div>
          <div className="flex -space-x-2">
            <div className="w-10 h-10 rounded-full border-2 border-white bg-rose-100 flex items-center justify-center text-rose-500 font-bold text-xs uppercase shadow-sm">A</div>
            <div className="w-10 h-10 rounded-full border-2 border-white bg-rose-500 flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm">B</div>
          </div>
        </div>
      </div>

      <section className="bg-rose-50/50 border border-rose-100 rounded-[2.5rem] p-8 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 text-rose-100/30 rotate-12">
            <Stars size={120} />
        </div>
        <h3 className="text-xl font-bold text-rose-800 mb-4 flex items-center gap-2 relative z-10">
          <Stars size={20} className="text-rose-400" />
          AI Insight for Today
        </h3>
        <p className="text-rose-700 leading-relaxed relative z-10 max-w-2xl">
          One year down! To celebrate this milestone, the AI suggests revisiting the very first place you had a date. Re-living that nervous excitement can reignite the spark for year two!
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-8 bg-white border border-slate-100 rounded-[2rem] text-center shadow-sm hover:border-amber-200 transition-colors group">
          <div className="text-4xl font-bold text-amber-500 mb-1 font-serif group-hover:scale-110 transition-transform">365</div>
          <div className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">Days Strong</div>
        </div>
        <div className="p-8 bg-white border border-slate-100 rounded-[2rem] text-center shadow-sm hover:border-amber-200 transition-colors group">
          <div className="text-4xl font-bold text-amber-500 mb-1 font-serif group-hover:scale-110 transition-transform">12</div>
          <div className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">Months of Love</div>
        </div>
        <div className="p-8 bg-white border border-slate-100 rounded-[2rem] text-center shadow-sm hover:border-amber-200 transition-colors group">
          <div className="text-4xl font-bold text-amber-500 mb-1 font-serif group-hover:scale-110 transition-transform">52</div>
          <div className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">Date Nights</div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
