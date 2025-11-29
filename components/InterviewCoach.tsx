import React, { useState } from 'react';
import { Lock, Sparkles, CheckCircle2, Zap, Brain, MessageSquare, ArrowLeft, CreditCard, Star } from 'lucide-react';

export const InterviewCoach: React.FC = () => {
  const [showPricing, setShowPricing] = useState(false);

  if (showPricing) {
    return (
      <div className="h-full flex items-center justify-center p-4 animate-fadeIn">
        <div className="max-w-3xl w-full bg-dark-800 border border-dark-700 rounded-2xl p-8 text-center relative overflow-hidden shadow-2xl">
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <button 
            onClick={() => setShowPricing(false)}
            className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium z-10"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <div className="relative z-10 mt-8 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider mb-6">
              <Star size={12} className="fill-purple-300" /> Early Access
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Pro Plans Coming Soon</h2>
            <p className="text-slate-400 max-w-lg mx-auto text-sm md:text-base">
              We are currently fine-tuning the AI Coach models for maximum accuracy. 
              The Pro plan will launch in Q2 2025.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 opacity-50 pointer-events-none select-none filter blur-[1px] transform scale-95">
             {/* Mock Pricing Cards */}
             {[
               { name: "Starter", price: "$0", feat: ["Basic Access", "Community Support"] },
               { name: "Pro", price: "$29", feat: ["AI Coach", "Unlimited Mocks", "Code Reviews"] },
               { name: "Team", price: "$99", feat: ["Admin Dashboard", "SSO", "Priority Support"] }
             ].map((plan, i) => (
               <div key={i} className={`p-6 rounded-xl border ${i===1 ? 'bg-dark-900 border-brand-500' : 'bg-dark-800 border-dark-700'} flex flex-col items-center`}>
                 <div className="text-sm font-bold text-slate-300 mb-2">{plan.name}</div>
                 <div className="text-2xl font-bold text-white mb-4">{plan.price}</div>
                 <div className="space-y-2 mb-4 w-full">
                   {plan.feat.map((f, j) => <div key={j} className="text-xs text-slate-500">{f}</div>)}
                 </div>
                 <div className="h-8 w-full bg-dark-700 rounded"></div>
               </div>
             ))}
          </div>

          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-dark-800 to-transparent flex items-end justify-center pb-8">
            <div className="bg-dark-950 border border-dark-600 px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
               <CreditCard size={18} className="text-brand-400" />
               <span className="text-slate-200 font-medium text-sm">Payments disabled during beta</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center p-4 animate-fadeIn">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        
        {/* Left Side: Value Prop */}
        <div className="space-y-6 md:space-y-8 order-2 md:order-1">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/50 border border-brand-500/30 text-brand-300 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4 animate-fadeIn">
              <Sparkles size={12} />
              Premium Feature
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              Unlock Your Personal <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">
                AI Interview Coach
              </span>
            </h1>
            <p className="text-slate-400 text-sm md:text-lg leading-relaxed">
              Get real-time feedback on your answers, simulate full system design interviews, and receive code optimization tips from a Senior Staff AI Engineer.
            </p>
          </div>

          <div className="space-y-3 md:space-y-4">
            {[
              "Unlimited Mock Interviews (System Design & Coding)",
              "Real-time Resume Parsing & Feedback",
              "Behavioral Answer Refinement (STAR Method)",
              "Deep Dive Architecture Reviews"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle2 className="text-green-400 shrink-0" size={18} />
                <span className="text-slate-300 text-sm md:text-base">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:gap-4 pt-4">
            <button 
              onClick={() => setShowPricing(true)}
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white rounded-xl font-bold text-sm md:text-base shadow-lg shadow-brand-900/20 transition-all transform hover:scale-105 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
            >
              <Zap size={18} fill="currentColor" />
              Upgrade to Pro
            </button>
            <button 
              onClick={() => setShowPricing(true)}
              className="w-full md:w-auto px-6 py-3 bg-dark-800 hover:bg-dark-700 text-slate-300 rounded-xl font-bold text-sm md:text-base transition-all hover:text-white flex items-center justify-center hover:shadow-lg active:scale-95"
            >
              View Pricing
            </button>
          </div>
          
          <p className="text-[10px] md:text-xs text-slate-500 text-center md:text-left">
            Includes 7-day money-back guarantee. Cancel anytime.
          </p>
        </div>

        {/* Right Side: Visual */}
        <div className="relative order-1 md:order-2">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-600/20 to-purple-600/20 rounded-3xl blur-2xl transform rotate-3 scale-95 pointer-events-none animate-pulseSlow"></div>
          
          {/* Mock UI Card */}
          <div className="relative bg-dark-900 border border-dark-700 rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-sm md:max-w-none transform hover:-translate-y-2 transition-transform duration-500">
            {/* Header */}
            <div className="bg-dark-950 p-4 border-b border-dark-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center">
                <Brain size={16} className="text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">AI Coach</div>
                <div className="text-[10px] text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  Online
                </div>
              </div>
            </div>

            {/* Blurred Chat Content */}
            <div className="p-6 space-y-6 relative h-[300px] md:h-auto">
              <div className="absolute inset-0 z-10 backdrop-blur-[2px] bg-dark-900/10 flex items-center justify-center">
                <div className="bg-dark-950/90 p-6 rounded-full border border-dark-700 shadow-xl animate-pulseSlow">
                  <Lock size={32} className="text-slate-400" />
                </div>
              </div>

              {/* Fake Messages */}
              <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-brand-600 shrink-0"></div>
                 <div className="bg-dark-800 rounded-2xl rounded-tl-none p-4 w-[85%] h-24"></div>
              </div>
              <div className="flex gap-4 flex-row-reverse">
                 <div className="w-8 h-8 rounded-full bg-slate-600 shrink-0"></div>
                 <div className="bg-brand-900/30 rounded-2xl rounded-tr-none p-4 w-[60%] h-16"></div>
              </div>
              <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-brand-600 shrink-0"></div>
                 <div className="bg-dark-800 rounded-2xl rounded-tl-none p-4 w-[75%] h-20"></div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-dark-950 border-t border-dark-800">
               <div className="h-10 md:h-12 bg-dark-800 rounded-lg flex items-center px-4 justify-between opacity-50">
                 <span className="text-slate-600 text-sm">Ask a question...</span>
                 <MessageSquare size={16} className="text-slate-600"/>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};