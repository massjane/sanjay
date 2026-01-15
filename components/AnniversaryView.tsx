
import React, { useEffect, useState } from 'react';
import { Heart, Sparkles, Star, ArrowRight, Quote } from 'lucide-react';

interface AnniversaryViewProps {
  onContinue: () => void;
}

const AnniversaryView: React.FC<AnniversaryViewProps> = ({ onContinue }) => {
  const [showContent, setShowContent] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setShowContent(true);
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev < 365) return prev + 5;
        clearInterval(interval);
        return 365;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const couplePhoto = "https://in.pinterest.com/pin/564427765821779274/";

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden bg-slate-950">
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={couplePhoto}
          alt="Anniversary Background" 
          className="w-full h-full object-cover opacity-30 blur-sm scale-110 animate-subtle-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/90" />
      </div>

      {/* Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse text-amber-200"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.5
            }}
          >
            <Star size={Math.random() * 12 + 4} fill="currentColor" />
          </div>
        ))}
      </div>

      <div className={`max-w-2xl w-full text-center space-y-8 relative z-20 transition-all duration-1000 transform ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        
        {/* Main Photo Frame */}
        <div className="relative inline-block mb-4">
          <div className="relative z-10 p-3 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-sm rotate-2 hover:rotate-0 transition-transform duration-700 animate-float-slow">
             <div className="overflow-hidden bg-slate-100 aspect-[3/4] w-64 md:w-80">
                <img 
                  src={couplePhoto} 
                  alt="Us" 
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                />
             </div>
             <div className="pt-4 pb-2 text-center">
                <p className="font-serif italic text-slate-800 text-lg">Chapter One: Forever to Go</p>
             </div>
          </div>
          
          {/* Milestone Badge Overlapping Photo */}
          <div className="absolute -top-6 -right-6 z-20 w-24 h-24 bg-gradient-to-tr from-amber-400 to-rose-400 rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-white animate-bounce-slow">
            <span className="text-white text-3xl font-serif font-bold leading-none">1st</span>
            <span className="text-white text-[10px] uppercase font-bold tracking-widest">Year</span>
          </div>
          
          <div className="absolute -bottom-4 -left-4 z-20 text-rose-500 animate-pulse">
            <Heart size={48} fill="currentColor" className="drop-shadow-lg" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight drop-shadow-xl">
            Happy <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-[length:200%_auto] animate-shimmer">Anniversary</span>
          </h1>
          <p className="text-lg md:text-xl text-amber-100/80 font-light tracking-[0.2em] uppercase">
            365 Days of Loving You
          </p>
        </div>

        {/* Milestone Stats */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 py-6 border-y border-white/10 backdrop-blur-md bg-white/5 rounded-[2rem] px-4">
          <div className="space-y-0.5">
            <div className="text-2xl md:text-3xl font-bold text-amber-400 font-serif">{count}</div>
            <div className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">Days</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl md:text-3xl font-bold text-amber-400 font-serif">8,760</div>
            <div className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">Hours</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl md:text-3xl font-bold text-amber-400 font-serif">∞</div>
            <div className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">Moments</div>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden group">
          <Quote className="absolute top-2 left-2 text-white/5" size={40} />
          <p className="text-base md:text-lg text-white/90 italic font-serif leading-relaxed relative z-10">
            "I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more."
          </p>
        </div>

        <button
          onClick={onContinue}
          className="group relative inline-flex items-center gap-4 bg-white text-slate-900 px-14 py-5 rounded-full font-bold text-lg hover:bg-amber-400 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-amber-400/40 active:scale-95 overflow-hidden"
        >
          <Sparkles className="group-hover:rotate-12 transition-transform text-amber-600" />
          <span className="relative z-10">Open Our Hub</span>
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-200/0 via-amber-200/20 to-amber-200/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(2deg); }
          50% { transform: translateY(-15px) rotate(1deg); }
        }
        @keyframes subtle-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-subtle-zoom {
          animation: subtle-zoom 25s ease-in-out infinite alternate;
        }
        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }
      `}} />
    </div>
  );
};

export default AnniversaryView;
