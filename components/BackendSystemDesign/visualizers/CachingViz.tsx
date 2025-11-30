import React, { useState, useEffect } from 'react';
import { 
  Zap, Database, Server, Users, ArrowRight, 
  Play, Pause, RotateCcw 
} from 'lucide-react';

const CachingViz: React.FC = () => {
  const [strategy, setStrategy] = useState<'write-through' | 'write-back' | 'cache-aside' | 'read-through'>('cache-aside');
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const strategies = {
    'cache-aside': {
      title: 'Cache-Aside (Lazy Loading)',
      steps: [
        { action: 'read', from: 'client', to: 'app', label: '1. Request data' },
        { action: 'check', from: 'app', to: 'cache', label: '2. Check cache' },
        { action: 'miss', from: 'cache', to: 'app', label: '3. Cache MISS' },
        { action: 'read', from: 'app', to: 'db', label: '4. Query DB' },
        { action: 'return', from: 'db', to: 'app', label: '5. Return data' },
        { action: 'write', from: 'app', to: 'cache', label: '6. Populate cache' },
        { action: 'return', from: 'app', to: 'client', label: '7. Return to client' },
      ],
      pros: ['Only requested data cached', 'Cache failures don\'t break app'],
      cons: ['Cache miss = slower first request', 'Stale data possible']
    },
    'write-through': {
      title: 'Write-Through',
      steps: [
        { action: 'write', from: 'client', to: 'app', label: '1. Write request' },
        { action: 'write', from: 'app', to: 'cache', label: '2. Write to cache' },
        { action: 'write', from: 'cache', to: 'db', label: '3. Cache writes to DB' },
        { action: 'ack', from: 'db', to: 'cache', label: '4. DB confirms' },
        { action: 'ack', from: 'cache', to: 'app', label: '5. Cache confirms' },
        { action: 'return', from: 'app', to: 'client', label: '6. Success response' },
      ],
      pros: ['Data consistency', 'Simple mental model'],
      cons: ['Higher write latency', 'Cache may store unused data']
    },
    'write-back': {
      title: 'Write-Back (Write-Behind)',
      steps: [
        { action: 'write', from: 'client', to: 'app', label: '1. Write request' },
        { action: 'write', from: 'app', to: 'cache', label: '2. Write to cache' },
        { action: 'return', from: 'cache', to: 'app', label: '3. Immediate ACK' },
        { action: 'return', from: 'app', to: 'client', label: '4. Fast response' },
        { action: 'async', from: 'cache', to: 'db', label: '5. Async persist (later)' },
      ],
      pros: ['Very fast writes', 'Reduced DB load'],
      cons: ['Data loss risk on crash', 'Complexity']
    },
    'read-through': {
      title: 'Read-Through',
      steps: [
        { action: 'read', from: 'client', to: 'app', label: '1. Request data' },
        { action: 'read', from: 'app', to: 'cache', label: '2. Request from cache' },
        { action: 'miss', from: 'cache', to: 'db', label: '3. Cache fetches from DB' },
        { action: 'return', from: 'db', to: 'cache', label: '4. DB returns data' },
        { action: 'store', from: 'cache', to: 'cache', label: '5. Cache stores it' },
        { action: 'return', from: 'cache', to: 'app', label: '6. Return to app' },
        { action: 'return', from: 'app', to: 'client', label: '7. Return to client' },
      ],
      pros: ['App code simpler', 'Cache handles loading'],
      cons: ['Cache must know DB schema', 'First request still slow']
    }
  };

  const current = strategies[strategy];

  useEffect(() => {
    if (isPlaying && step < current.steps.length) {
      const timer = setTimeout(() => setStep(s => s + 1), 1000);
      return () => clearTimeout(timer);
    } else if (step >= current.steps.length) {
      setIsPlaying(false);
    }
  }, [isPlaying, step, current.steps.length]);

  const reset = () => { setStep(0); setIsPlaying(false); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Zap className="text-yellow-400" size={24} />
          Caching Strategies
        </h3>
        <div className="flex gap-2 flex-wrap">
          {Object.keys(strategies).map(s => (
            <button
              key={s}
              onClick={() => { setStrategy(s as any); reset(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                strategy === s ? 'bg-brand-600 text-white' : 'bg-dark-700 text-slate-400 hover:text-white'
              }`}
            >
              {s.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-bold text-white">{current.title}</h4>
          <div className="flex gap-2">
            <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 rounded-lg bg-brand-600 text-white">
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button onClick={reset} className="p-2 rounded-lg bg-dark-700 text-slate-400 hover:text-white">
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Visual representation */}
        <div className="flex items-center justify-around py-8 relative">
          {/* Client */}
          <div className={`flex flex-col items-center transition-all ${step > 0 ? 'opacity-100' : 'opacity-50'}`}>
            <div className="w-16 h-16 rounded-xl bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center">
              <Users size={24} className="text-blue-400" />
            </div>
            <span className="text-xs text-slate-400 mt-2">Client</span>
          </div>

          <ArrowRight className="text-slate-600" size={24} />

          {/* App */}
          <div className={`flex flex-col items-center transition-all ${step > 0 ? 'opacity-100' : 'opacity-50'}`}>
            <div className="w-16 h-16 rounded-xl bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
              <Server size={24} className="text-green-400" />
            </div>
            <span className="text-xs text-slate-400 mt-2">App Server</span>
          </div>

          <ArrowRight className="text-slate-600" size={24} />

          {/* Cache */}
          <div className={`flex flex-col items-center transition-all ${step >= 2 ? 'scale-110 opacity-100' : 'opacity-50'}`}>
            <div className="w-16 h-16 rounded-xl bg-yellow-500/20 border-2 border-yellow-500 flex items-center justify-center">
              <Zap size={24} className="text-yellow-400" />
            </div>
            <span className="text-xs text-slate-400 mt-2">Redis Cache</span>
          </div>

          <ArrowRight className="text-slate-600" size={24} />

          {/* DB */}
          <div className={`flex flex-col items-center transition-all ${step >= 4 ? 'scale-110 opacity-100' : 'opacity-50'}`}>
            <div className="w-16 h-16 rounded-xl bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center">
              <Database size={24} className="text-purple-400" />
            </div>
            <span className="text-xs text-slate-400 mt-2">Database</span>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-6">
          {current.steps.map((s, idx) => (
            <div
              key={idx}
              className={`px-3 py-2 rounded-lg text-sm transition-all ${
                idx < step
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : idx === step
                  ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30 animate-pulse'
                  : 'bg-dark-700 text-slate-500 border border-dark-600'
              }`}
            >
              {s.label}
            </div>
          ))}
        </div>

        {/* Pros/Cons */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <h5 className="text-sm font-bold text-green-400 mb-2">Pros</h5>
            {current.pros.map((p, i) => (
              <div key={i} className="text-xs text-slate-400">✓ {p}</div>
            ))}
          </div>
          <div>
            <h5 className="text-sm font-bold text-red-400 mb-2">Cons</h5>
            {current.cons.map((c, i) => (
              <div key={i} className="text-xs text-slate-400">✗ {c}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CachingViz;
