import React, { useState, useRef, useCallback } from 'react';
import { Globe, ArrowRight, Server } from 'lucide-react';

const LoadBalancerViz: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<'round-robin' | 'least-conn' | 'weighted' | 'ip-hash'>('round-robin');
  const [requests, setRequests] = useState<Array<{ id: number; server: number; processing: boolean }>>([]);
  const [serverLoads, setServerLoads] = useState([0, 0, 0, 0]);
  const [serverWeights] = useState([4, 2, 1, 1]); // For weighted
  const requestId = useRef(0);
  const lastServer = useRef(0);

  const getNextServer = useCallback(() => {
    switch (algorithm) {
      case 'round-robin':
        lastServer.current = (lastServer.current + 1) % 4;
        return lastServer.current;
      case 'least-conn':
        return serverLoads.indexOf(Math.min(...serverLoads));
      case 'weighted': {
        // Weighted round-robin
        const total = serverWeights.reduce((a, b) => a + b, 0);
        let rand = Math.floor(Math.random() * total);
        for (let i = 0; i < serverWeights.length; i++) {
          rand -= serverWeights[i];
          if (rand < 0) return i;
        }
        return 0;
      }
      case 'ip-hash':
        // Simulate IP hash - just random for demo
        return Math.floor(Math.random() * 4);
      default:
        return 0;
    }
  }, [algorithm, serverLoads, serverWeights]);

  const sendRequest = useCallback(() => {
    const server = getNextServer();
    const id = requestId.current++;
    
    setRequests(prev => [...prev, { id, server, processing: true }]);
    setServerLoads(prev => prev.map((load, i) => i === server ? load + 1 : load));

    // Complete after random time
    setTimeout(() => {
      setRequests(prev => prev.filter(r => r.id !== id));
      setServerLoads(prev => prev.map((load, i) => i === server ? Math.max(0, load - 1) : load));
    }, 1500 + Math.random() * 2000);
  }, [getNextServer]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Globe className="text-green-400" size={24} />
          Load Balancing Algorithms
        </h3>
        <div className="flex gap-2 flex-wrap">
          {(['round-robin', 'least-conn', 'weighted', 'ip-hash'] as const).map(a => (
            <button
              key={a}
              onClick={() => { setAlgorithm(a); setRequests([]); setServerLoads([0, 0, 0, 0]); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                algorithm === a ? 'bg-brand-600 text-white' : 'bg-dark-700 text-slate-400 hover:text-white'
              }`}
            >
              {a.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-lg font-bold text-white capitalize">{algorithm.replace('-', ' ')}</h4>
            <p className="text-sm text-slate-400">
              {algorithm === 'round-robin' && 'Distributes requests sequentially across servers'}
              {algorithm === 'least-conn' && 'Routes to server with fewest active connections'}
              {algorithm === 'weighted' && 'Higher weight = more traffic (powerful servers)'}
              {algorithm === 'ip-hash' && 'Same client IP always goes to same server (sticky sessions)'}
            </p>
          </div>
          <button onClick={sendRequest} className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-bold">
            + Send Request
          </button>
        </div>

        <div className="flex items-center gap-8">
          {/* Load Balancer */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-xl bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
              <Globe size={40} className="text-green-400" />
            </div>
            <span className="text-xs text-slate-400 mt-2">Load Balancer</span>
          </div>

          {/* Arrow */}
          <ArrowRight className="text-slate-600" size={32} />

          {/* Servers */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className={`p-4 rounded-xl border-2 transition-all ${
                  serverLoads[i] > 0 ? 'bg-blue-500/20 border-blue-500' : 'bg-dark-700 border-dark-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white">Server {i + 1}</span>
                  {algorithm === 'weighted' && (
                    <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">
                      w={serverWeights[i]}
                    </span>
                  )}
                </div>
                <div className="flex gap-1 mb-2">
                  {Array(Math.min(serverLoads[i], 5)).fill(0).map((_, j) => (
                    <div key={j} className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                  ))}
                </div>
                <div className="text-xs text-slate-400">
                  {serverLoads[i]} active {serverLoads[i] === 1 ? 'request' : 'requests'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadBalancerViz;
