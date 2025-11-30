import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';

const RateLimitingViz: React.FC = () => {
  const [strategy, setStrategy] = useState<'token' | 'sliding' | 'fixed' | 'leaky'>('token');
  const [tokens, setTokens] = useState(10);
  const [requestLog, setRequestLog] = useState<Array<{ time: number; allowed: boolean }>>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [windowRequests, setWindowRequests] = useState(0);
  const [queue, setQueue] = useState<number[]>([]);
  const bucketRef = useRef(10);
  const lastRefill = useRef(Date.now());

  // Token bucket refill
  useEffect(() => {
    if (strategy !== 'token') return;
    const interval = setInterval(() => {
      setTokens(prev => Math.min(prev + 1, 10));
    }, 1000);
    return () => clearInterval(interval);
  }, [strategy]);

  // Fixed window reset
  useEffect(() => {
    if (strategy !== 'fixed') return;
    const interval = setInterval(() => {
      setWindowRequests(0);
    }, 5000);
    return () => clearInterval(interval);
  }, [strategy]);

  // Leaky bucket drain
  useEffect(() => {
    if (strategy !== 'leaky') return;
    const interval = setInterval(() => {
      setQueue(prev => prev.slice(1));
    }, 500);
    return () => clearInterval(interval);
  }, [strategy]);

  const sendRequest = useCallback(() => {
    const now = Date.now();
    let allowed = false;

    switch (strategy) {
      case 'token':
        if (tokens > 0) {
          setTokens(prev => prev - 1);
          allowed = true;
        }
        break;
      case 'fixed':
        if (windowRequests < 5) {
          setWindowRequests(prev => prev + 1);
          allowed = true;
        }
        break;
      case 'sliding':
        // Sliding window log - allow 5 requests per 5 seconds
        const recentRequests = requestLog.filter(r => now - r.time < 5000);
        allowed = recentRequests.length < 5;
        break;
      case 'leaky':
        if (queue.length < 5) {
          setQueue(prev => [...prev, now]);
          allowed = true;
        }
        break;
    }

    setRequestLog(prev => [...prev.slice(-19), { time: now, allowed }]);
  }, [strategy, tokens, windowRequests, requestLog, queue]);

  const reset = () => {
    setTokens(10);
    setRequestLog([]);
    setWindowRequests(0);
    setQueue([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Timer className="text-yellow-400" size={24} />
          Rate Limiting Strategies
        </h3>
        <div className="flex gap-2 flex-wrap">
          {(['token', 'fixed', 'sliding', 'leaky'] as const).map(s => (
            <button
              key={s}
              onClick={() => { setStrategy(s); reset(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                strategy === s ? 'bg-brand-600 text-white' : 'bg-dark-700 text-slate-400 hover:text-white'
              }`}
            >
              {s === 'token' ? 'Token Bucket' :
               s === 'fixed' ? 'Fixed Window' :
               s === 'sliding' ? 'Sliding Log' : 'Leaky Bucket'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Visualization */}
        <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-white capitalize">{strategy.replace('-', ' ')}</h4>
            <div className="flex gap-2">
              <button onClick={sendRequest} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold">
                Send Request
              </button>
              <button onClick={reset} className="p-1.5 bg-dark-700 text-slate-400 rounded-lg">
                <RotateCcw size={14} />
              </button>
            </div>
          </div>

          {strategy === 'token' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-400">Tokens: {tokens}/10 (refills 1/sec)</p>
              <div className="flex gap-1 flex-wrap">
                {Array(10).fill(0).map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      i < tokens ? 'bg-green-500 text-white' : 'bg-dark-700 text-slate-600'
                    }`}
                  >
                    {i < tokens ? '●' : '○'}
                  </div>
                ))}
              </div>
            </div>
          )}

          {strategy === 'fixed' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-400">Window: {windowRequests}/5 requests (resets every 5s)</p>
              <div className="h-4 bg-dark-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500 transition-all"
                  style={{ width: `${(windowRequests / 5) * 100}%` }}
                />
              </div>
            </div>
          )}

          {strategy === 'sliding' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-400">Tracks timestamps - 5 requests per 5 second window</p>
              <div className="text-2xl font-bold text-white">
                {requestLog.filter(r => Date.now() - r.time < 5000).length}/5 recent
              </div>
            </div>
          )}

          {strategy === 'leaky' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-400">Queue: {queue.length}/5 (drains 2/sec)</p>
              <div className="flex gap-1">
                {Array(5).fill(0).map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-12 rounded-b-lg border-2 transition-all ${
                      i < queue.length ? 'bg-blue-500 border-blue-600' : 'bg-dark-700 border-dark-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Request Log */}
        <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
          <h4 className="text-lg font-bold text-white mb-4">Request Log</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {requestLog.length === 0 ? (
              <p className="text-slate-500 text-sm">No requests yet</p>
            ) : (
              requestLog.slice().reverse().map((req, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg text-sm flex items-center justify-between ${
                    req.allowed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  <span>{req.allowed ? '✓ Allowed' : '✗ Rate Limited'}</span>
                  <span className="text-xs opacity-60">{new Date(req.time).toLocaleTimeString()}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitingViz;
