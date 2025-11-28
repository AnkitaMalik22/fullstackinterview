import React from 'react';
import { ViewState } from '../types';
import { ArrowRight, Code2, Server, Binary, BookOpen, Layers } from 'lucide-react';

interface DashboardProps {
  onNavigate: (view: ViewState) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto py-4 md:py-8">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-dark-900 to-dark-900 rounded-2xl border border-brand-900/50 p-8 md:p-16 shadow-2xl shadow-black/40 text-center transform transition-all hover:shadow-brand-900/10">
        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-brand-500/10 text-brand-300 border border-brand-500/20 px-4 py-1.5 rounded-full text-sm font-medium mb-6 animate-fadeIn shadow-sm hover:scale-105 transition-transform cursor-default">
             🚀 Updated for 2025 Interview Season
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-teal-400">Full Stack</span> Interview
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
            A comprehensive preparation platform combining deep theoretical guides with interactive mental models. 
            Stop memorizing. Start understanding.
          </p>
        </div>
        
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none animate-pulseSlow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3 pointer-events-none animate-pulseSlow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Mastery Tracks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Frontend Track */}
        <div 
          onClick={() => onNavigate(ViewState.ARCHITECTURE)}
          className="bg-dark-800 rounded-xl border border-dark-700 p-6 hover:border-brand-500/30 transition-all duration-300 hover:bg-dark-800/80 group flex flex-col cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-900/20 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors group-hover:scale-110 duration-300">
            <Code2 className="text-blue-400" size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">Frontend Engineering</h3>
          <p className="text-slate-400 text-sm mb-6 flex-1">
            Deep dive into React performance, system design, accessibility, and modern browser APIs.
          </p>
          <div className="space-y-3 mb-6">
             <div className="flex items-center gap-2 text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
               <Layers size={14} /> System Design
             </div>
             <div className="flex items-center gap-2 text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
               <BookOpen size={14} /> Core Web Vitals
             </div>
          </div>
          <button 
            className="w-full py-3 bg-dark-700 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 group-hover:bg-brand-600 group-hover:shadow-lg active:scale-95"
          >
            Start Track <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Backend Track */}
        <div 
          onClick={() => onNavigate(ViewState.BACKEND_SYSTEM)}
          className="bg-dark-800 rounded-xl border border-dark-700 p-6 hover:border-purple-500/30 transition-all duration-300 hover:bg-dark-800/80 group flex flex-col cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-900/20 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors group-hover:scale-110 duration-300">
            <Server className="text-purple-400" size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">Backend Architecture</h3>
          <p className="text-slate-400 text-sm mb-6 flex-1">
            Master distributed systems, database scaling, API design patterns, and security.
          </p>
          <div className="space-y-3 mb-6">
             <div className="flex items-center gap-2 text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
               <Layers size={14} /> Microservices
             </div>
             <div className="flex items-center gap-2 text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
               <BookOpen size={14} /> Database Sharding
             </div>
          </div>
          <button 
            className="w-full py-3 bg-dark-700 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 group-hover:bg-purple-600 group-hover:shadow-lg active:scale-95"
          >
            Start Track <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* CS / DSA Track */}
        <div 
          onClick={() => onNavigate(ViewState.DSA_ALGORITHMS)}
          className="bg-dark-800 rounded-xl border border-dark-700 p-6 hover:border-green-500/30 transition-all duration-300 hover:bg-dark-800/80 group flex flex-col cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-900/20 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors group-hover:scale-110 duration-300">
            <Binary className="text-green-400" size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">Computer Science</h3>
          <p className="text-slate-400 text-sm mb-6 flex-1">
            Essential data structures and algorithms with interactive visualizations for deep understanding.
          </p>
          <div className="space-y-3 mb-6">
             <div className="flex items-center gap-2 text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
               <Layers size={14} /> Graph Algorithms
             </div>
             <div className="flex items-center gap-2 text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
               <BookOpen size={14} /> Time Complexity
             </div>
          </div>
          <button 
            className="w-full py-3 bg-dark-700 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 group-hover:bg-green-600 group-hover:shadow-lg active:scale-95"
          >
            Start Track <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
};