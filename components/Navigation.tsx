import React from 'react';
import { ViewState, NavItem } from '../types';
import { 
  LayoutDashboard, 
  Layers, 
  Zap, 
  Network, 
  Bot, 
  Code2,
  Database,
  Palette,
  Accessibility,
  Server,
  Globe,
  Lock,
  Binary,
  Cpu,
  Box,
  X,
  ShieldAlert
} from 'lucide-react';

interface NavigationProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate, isOpen, onClose }) => {
  const navItems: NavItem[] = [
    // START
    { 
      id: ViewState.HOME, 
      label: 'Dashboard', 
      icon: <LayoutDashboard size={18} />,
      group: 'Start'
    },
    
    // CS FUNDAMENTALS (Learn these first!)
    {
      id: ViewState.DSA_STRUCTURES,
      label: 'Data Structures',
      icon: <Binary size={18} />,
      group: 'CS Fundamentals'
    },
    {
      id: ViewState.DSA_ALGORITHMS,
      label: 'Algorithms',
      icon: <Cpu size={18} />,
      group: 'CS Fundamentals'
    },

    // FRONTEND CORE (Start with basics, then advanced)
    { 
      id: ViewState.CSS_STYLING, 
      label: 'CSS & Layouts', 
      icon: <Palette size={18} />,
      group: 'Frontend Core'
    },
    { 
      id: ViewState.STATE_MANAGEMENT, 
      label: 'State Management', 
      icon: <Code2 size={18} />,
      group: 'Frontend Core'
    },
    { 
      id: ViewState.PERFORMANCE_LAB, 
      label: 'Performance & Rendering', 
      icon: <Zap size={18} />,
      group: 'Frontend Core'
    },
    { 
      id: ViewState.BROWSER_APIS, 
      label: 'Browser APIs', 
      icon: <Box size={18} />,
      group: 'Frontend Core'
    },

    // FRONTEND ADVANCED
    { 
      id: ViewState.ARCHITECTURE, 
      label: 'System Design', 
      icon: <Layers size={18} />,
      group: 'Frontend Advanced'
    },
    { 
      id: ViewState.API_RESILIENCE, 
      label: 'API & Networking', 
      icon: <Network size={18} />,
      group: 'Frontend Advanced'
    },
    { 
      id: ViewState.SECURITY, 
      label: 'Web Security', 
      icon: <ShieldAlert size={18} />,
      group: 'Frontend Advanced'
    },
    { 
      id: ViewState.ACCESSIBILITY, 
      label: 'Accessibility (a11y)', 
      icon: <Accessibility size={18} />,
      group: 'Frontend Advanced'
    },

    // BACKEND
    {
      id: ViewState.BACKEND_SYSTEM,
      label: 'System Architecture', 
      icon: <Server size={18} />,
      group: 'Backend'
    },
    {
      id: ViewState.BACKEND_DB,
      label: 'Databases & Scaling',
      icon: <Database size={18} />,
      group: 'Backend'
    },
    {
      id: ViewState.BACKEND_API,
      label: 'API Design',
      icon: <Globe size={18} />,
      group: 'Backend'
    },
    {
      id: ViewState.BACKEND_SECURITY,
      label: 'Backend Security',
      icon: <Lock size={18} />,
      group: 'Backend'
    },

    // PRACTICE
    { 
      id: ViewState.AI_COACH, 
      label: 'AI Interview Coach', 
      icon: <Bot size={18} />,
      group: 'Practice'
    },
  ];

  // Group items
  const groupedItems = navItems.reduce((acc, item) => {
    const group = item.group || 'Other';
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {} as Record<string, NavItem[]>);

  const groupOrder = ['Start', 'CS Fundamentals', 'Frontend Core', 'Frontend Advanced', 'Backend', 'Practice'];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar / Drawer */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-dark-950 border-r border-dark-800 flex flex-col h-full shrink-0 
        transform transition-transform duration-300 ease-out md:translate-x-0 md:static md:w-64
        ${isOpen ? 'translate-x-0 shadow-2xl shadow-black' : '-translate-x-full'}
      `}>
        {/* Unique Logo Section */}
        <div className="p-6 flex items-center justify-between sticky top-0 bg-dark-950 z-10 border-b border-dark-800 md:border-none">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="relative w-10 h-10 flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-tr from-brand-500 to-purple-600 rounded-xl rotate-6 opacity-40 group-hover:rotate-12 transition-transform duration-300"></div>
               <div className="absolute inset-0 bg-dark-900 border border-dark-700 rounded-xl flex items-center justify-center shadow-lg group-hover:border-brand-500/50 transition-colors">
                 <div className="relative">
                   <div className="absolute -top-1 -right-1 w-2 h-2 bg-brand-400 rounded-full animate-pulse"></div>
                   <Layers className="text-white" size={20} strokeWidth={2.5} />
                 </div>
               </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight leading-none font-mono">
                FS<span className="text-brand-400">Prep</span>
              </h1>
              <p className="text-[9px] text-slate-500 font-medium tracking-widest mt-0.5 uppercase">Mastery v2.0</p>
            </div>
          </div>
          <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-8 overflow-y-auto scrollbar-hide">
          {groupOrder.map((group) => (
            <div key={group} className="animate-fadeIn">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3 px-3 flex items-center gap-2">
                {group}
              </h3>
              <div className="space-y-1">
                {groupedItems[group]?.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left group active:scale-95
                      ${currentView === item.id 
                        ? 'bg-brand-600/10 text-brand-400 border border-brand-500/20 shadow-sm translate-x-1' 
                        : 'text-slate-400 hover:bg-dark-800 hover:text-white border border-transparent hover:translate-x-1'
                      }`}
                  >
                    <div className={`${currentView === item.id ? 'text-brand-400' : 'text-slate-500 group-hover:text-white transition-colors'}`}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-medium text-xs md:text-sm">{item.label}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
        
        <div className="p-4 border-t border-dark-800 text-[10px] text-slate-600 text-center">
          © 2025 FullStackPrep Inc.
        </div>
      </aside>
    </>
  );
};