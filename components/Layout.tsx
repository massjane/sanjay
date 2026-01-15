
import React from 'react';
import { Heart, Calendar, Camera, MessageCircle, PenTool, Home } from 'lucide-react';
import { AppSection } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'dates', icon: Calendar, label: 'Dates' },
    { id: 'memories', icon: Camera, label: 'Memories' },
    { id: 'chat', icon: MessageCircle, label: 'Coach' },
    { id: 'letters', icon: PenTool, label: 'Letters' },
  ];

  return (
    <div className="min-h-screen pb-24 md:pb-0 md:pl-64 flex flex-col bg-[#fffafb]">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-rose-100 p-6 z-50">
        <div className="flex items-center gap-2 mb-10 text-rose-500">
          <Heart className="fill-rose-500" />
          <span className="text-2xl font-serif font-bold tracking-tight">Love Hub</span>
        </div>
        
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as AppSection)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                activeSection === item.id 
                  ? 'bg-rose-50 text-rose-600 font-semibold' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto p-4 bg-rose-50 rounded-2xl text-rose-800 text-sm">
          <p className="font-semibold mb-1">Weekly Prompt:</p>
          <p className="italic">"What's one small thing your partner did this week that made you smile?"</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8">
        {children}
      </main>

      {/* Bottom Nav - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-rose-100 flex justify-around p-4 z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id as AppSection)}
            className={`flex flex-col items-center gap-1 ${
              activeSection === item.id ? 'text-rose-500' : 'text-slate-400'
            }`}
          >
            <item.icon size={24} />
            <span className="text-[10px] uppercase tracking-wider font-bold">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
