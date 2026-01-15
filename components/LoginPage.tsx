
import React, { useState, useEffect } from 'react';
import { Heart, Lock, ShieldCheck, Sparkles, Star, Check, AlertCircle } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [role, setRole] = useState<'A' | 'B' | null>(null);
  const [promises, setPromises] = useState({
    choose: false,
    safe: false,
    cherish: false
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [hearts, setHearts] = useState<{ id: number, left: string, size: number, duration: string, delay: string }[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const allAgreed = promises.choose && promises.safe && promises.cherish;
  const SECRET_PASSWORD = "Forever";

  useEffect(() => {
    // Generate floating hearts for the background
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.floor(Math.random() * 20) + 10,
      duration: `${Math.random() * 8 + 7}s`,
      delay: `${Math.random() * 5}s`
    }));
    setHearts(newHearts);
  }, []);

  const handleEnter = () => {
    if (password === SECRET_PASSWORD) {
      setError(false);
      setIsSuccess(true);
      // Wait for animation to finish before calling onLogin
      setTimeout(() => onLogin(), 2000);
    } else {
      setError(true);
      // Reset error after a few seconds
      setTimeout(() => setError(false), 3000);
    }
  };

  const togglePromise = (key: keyof typeof promises) => {
    setPromises(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-rose-500 overflow-hidden text-white transition-all duration-1000">
        <div className="relative mb-8 animate-bounce">
          <Heart fill="white" size={120} className="drop-shadow-2xl" />
          <Sparkles className="absolute -top-4 -right-4 animate-spin" size={40} />
        </div>
        <h1 className="text-5xl font-serif font-bold mb-4 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">Access Granted!</h1>
        <p className="text-xl opacity-90 text-center max-w-md animate-in fade-in slide-in-from-bottom-12 duration-1000">
          Welcome back to the heart of everything. <br/>
          Your sanctuary is ready for you both.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-rose-100 via-white to-pink-200">
      {/* Background Floating Hearts */}
      {hearts.map(h => (
        <div 
          key={h.id} 
          className="heart text-rose-300 opacity-40" 
          style={{ 
            left: h.left, 
            fontSize: `${h.size}px`, 
            animationDuration: h.duration,
            animationDelay: h.delay
          }}
        >
          <Heart fill="currentColor" />
        </div>
      ))}

      <div className={`w-full max-w-md glass-effect p-8 md:p-12 rounded-[3.5rem] shadow-2xl shadow-rose-300/30 z-10 animate-in zoom-in-95 duration-700 border border-white/50 ${error ? 'animate-shake' : ''}`}>
        <div className="text-center mb-10">
          <div className="relative inline-block">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-rose-500 rounded-[2rem] mb-6 shadow-xl shadow-rose-200 animate-pulse transition-all">
              <Heart className="text-white fill-white" size={48} />
            </div>
            <Star className="absolute -top-2 -right-2 text-yellow-400 animate-spin" size={24} fill="currentColor" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2 font-serif">Love Hub</h1>
          <p className="text-slate-500 italic text-sm">Our private digital sanctuary.</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-2">Identify Yourself</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setRole('A')}
                className={`p-5 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 relative overflow-hidden ${
                  role === 'A' ? 'border-rose-500 bg-rose-50 text-rose-600 shadow-inner' : 'border-slate-100 bg-white text-slate-400 hover:border-rose-200'
                }`}
              >
                <div className="text-3xl">🦸‍♂️</div>
                <span className="text-[10px] font-bold uppercase tracking-tighter text-center">Protector of Hearts</span>
                {role === 'A' && <div className="absolute top-1 right-1"><Heart size={12} className="fill-rose-500" /></div>}
              </button>
              <button
                onClick={() => setRole('B')}
                className={`p-5 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 relative overflow-hidden ${
                  role === 'B' ? 'border-rose-500 bg-rose-50 text-rose-600 shadow-inner' : 'border-slate-100 bg-white text-slate-400 hover:border-rose-200'
                }`}
              >
                <div className="text-3xl">👸</div>
                <span className="text-[10px] font-bold uppercase tracking-tighter text-center">Giver of Joy</span>
                {role === 'B' && <div className="absolute top-1 right-1"><Heart size={12} className="fill-rose-500" /></div>}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <div className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${error ? 'text-rose-500' : 'text-slate-400 group-focus-within:text-rose-500'}`}>
                {error ? <AlertCircle size={18} /> : <Lock size={18} />}
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="The Secret Word" 
                className={`w-full pl-14 pr-4 py-5 bg-white rounded-3xl border outline-none transition-all placeholder:text-slate-300 shadow-sm ${
                  error ? 'border-rose-500 ring-4 ring-rose-100' : 'border-slate-100 focus:ring-4 focus:ring-rose-100'
                }`}
              />
            </div>
            {error && (
              <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest text-center animate-in fade-in slide-in-from-top-1">
                That's not our secret word, darling...
              </p>
            )}
          </div>

          <div className="space-y-3">
             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-2">Our Vows for Love Hub</label>
             <div className="space-y-2">
                {[
                  { key: 'choose', text: "I promise to choose you, every single day." },
                  { key: 'safe', text: "I promise to be your safest place and biggest fan." },
                  { key: 'cherish', text: "I promise to cherish the small moments that make us 'us'." }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => togglePromise(item.key as keyof typeof promises)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border text-left ${
                      promises[item.key as keyof typeof promises] 
                        ? 'bg-rose-50 border-rose-200 text-rose-700' 
                        : 'bg-white border-slate-100 text-slate-500 hover:border-rose-100'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      promises[item.key as keyof typeof promises] ? 'bg-rose-500' : 'bg-slate-100'
                    }`}>
                      {promises[item.key as keyof typeof promises] ? <Check size={14} className="text-white" /> : <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />}
                    </div>
                    <span className="text-xs font-medium leading-tight italic">
                      {item.text}
                    </span>
                  </button>
                ))}
             </div>
          </div>

          <button
            onClick={handleEnter}
            disabled={!role || !allAgreed || !password}
            className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-slate-200 disabled:text-slate-400 text-white py-6 rounded-[2rem] font-bold text-lg shadow-2xl shadow-rose-300 flex items-center justify-center gap-3 transition-all hover:scale-[1.03] active:scale-95 group relative overflow-hidden"
          >
            {role && allAgreed && password ? (
              <>
                <Sparkles size={24} className="animate-pulse" />
                <span className="relative z-10">Enter Our World</span>
              </>
            ) : (
              <>
                <Lock size={20} className="group-hover:rotate-12 transition-transform" />
                <span>Unlock Sanctuary</span>
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </button>
        </div>

        <div className="mt-10 text-center">
          <p className="text-[10px] text-slate-400 flex items-center justify-center gap-2 uppercase tracking-widest font-bold">
            <ShieldCheck size={14} className="text-emerald-400" />
            End-to-End Love Encryption Active
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}} />
    </div>
  );
};

export default LoginPage;
