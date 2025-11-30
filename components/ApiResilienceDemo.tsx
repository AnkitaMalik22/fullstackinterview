import React, { useState, useEffect } from 'react';
import { Play, AlertTriangle, Check, Loader2, RotateCcw, ShieldCheck, WifiOff, Globe, Lock, HardDrive, Network, Bug, Terminal, Cookie, Skull, ArrowLeftRight, Server } from 'lucide-react';
import { LogEntry } from '../types';

// --- BLOG CONTENT COMPONENT ---
const ResilienceGuide = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => {
  const tabs = [
    { id: 'fetching', label: 'Patterns', icon: <Network size={16} /> },
    { id: 'security', label: 'Security', icon: <Lock size={16} /> },
    { id: 'integration', label: 'Integration', icon: <Globe size={16} /> },
  ];

  return (
    <div className="space-y-8 max-w-5xl animate-fadeIn pb-24">
      <div className="border-b border-dark-700 pb-6">
        <h2 className="text-3xl font-bold text-white mb-4">Frontend Security & Resilience</h2>
        <div className="flex flex-wrap gap-3 text-sm text-slate-400">
          <span className="bg-brand-900/30 text-brand-300 px-2 py-1 rounded border border-brand-500/20">XSS & CSRF</span>
          <span className="bg-brand-900/30 text-brand-300 px-2 py-1 rounded border border-brand-500/20">CSP Headers</span>
          <span className="bg-brand-900/30 text-brand-300 px-2 py-1 rounded border border-brand-500/20">Retry Logic</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pb-4 border-b border-dark-800">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all active:scale-95 ${
              activeTab === tab.id 
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/20 scale-105' 
                : 'bg-dark-800 text-slate-400 hover:bg-dark-700 hover:text-white hover:scale-105'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="prose prose-invert max-w-none text-slate-300">
        {activeTab === 'fetching' && (
          <div className="space-y-8 animate-fadeIn">
            <section>
              <h3 className="text-2xl font-bold text-white mb-6">Resilience Patterns</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-brand-500/30 transition-all hover:bg-dark-800/80">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <RotateCcw className="text-brand-400" size={18} />
                    Exponential Backoff
                  </h4>
                  <p className="text-sm text-slate-400 mb-4">
                    Prevent "thundering herd" DDoS on your own API. Increase delay after each failure: 1s, 2s, 4s, 8s.
                  </p>
                </div>
                 <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-brand-500/30 transition-all hover:bg-dark-800/80">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <WifiOff className="text-brand-400" size={18} />
                    Circuit Breaker
                  </h4>
                  <p className="text-sm text-slate-400 mb-4">
                    If an API fails 50% of the time, stop calling it for 5 minutes. Fail fast on the client side to save resources.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-8 animate-fadeIn">
             <section>
               <h3 className="text-2xl font-bold text-white mb-6">Frontend Security Primitives</h3>
               <div className="space-y-6">
                 <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 border-l-4 border-l-red-500 hover:bg-dark-800/80 transition-all">
                   <h4 className="font-bold text-white mb-2">XSS (Cross-Site Scripting)</h4>
                   <p className="text-sm text-slate-400 mb-2">
                     Injecting malicious scripts. 
                     <br/><strong>Defense:</strong> React escapes data by default. Never use <code>dangerouslySetInnerHTML</code> with user input. Use Content Security Policy (CSP).
                   </p>
                 </div>
                 
                 <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 border-l-4 border-l-yellow-500 hover:bg-dark-800/80 transition-all">
                   <h4 className="font-bold text-white mb-2">CSRF (Cross-Site Request Forgery)</h4>
                   <p className="text-sm text-slate-400 mb-2">
                     Attacker tricks user's browser into executing action on another site where they are logged in.
                     <br/><strong>Defense:</strong> SameSite Cookies (`Lax` or `Strict`) and Anti-CSRF Tokens.
                   </p>
                 </div>

                 <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-brand-500/30 transition-all hover:bg-dark-800/80">
                   <h4 className="font-bold text-white mb-2">Content Security Policy (CSP)</h4>
                   <p className="text-sm text-slate-400 mb-2">
                     An HTTP header that tells the browser which sources are allowed for scripts, styles, and images.
                   </p>
                   <code className="text-xs bg-dark-950 p-2 rounded block font-mono text-brand-300">
                     Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.cdn.com;
                   </code>
                 </div>
               </div>
             </section>
          </div>
        )}
        
        {activeTab === 'integration' && (
           <div className="space-y-8 animate-fadeIn">
             <section>
               <h3 className="text-2xl font-bold text-white mb-6">API Integration Strategy</h3>
               <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-brand-500/30 transition-all hover:bg-dark-800/80">
                 <h4 className="font-bold text-white mb-2">Optimistic UI</h4>
                 <p className="text-sm text-slate-400 mb-2">
                   Update the UI <em>before</em> the server responds. If it fails, roll back. 
                   Makes apps feel instant.
                 </p>
               </div>
             </section>
           </div>
        )}
      </div>
    </div>
  );
};

// --- VIZ COMPONENTS ---
const mockFetch = async (shouldFail: boolean): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("503 Service Unavailable"));
      } else {
        resolve("Data successfully retrieved from shard-01");
      }
    }, 800);
  });
};

const FetchViz = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [failureRate, setFailureRate] = useState(0.7);
  const [retryCount, setRetryCount] = useState(0);

  const addLog = (type: LogEntry['type'], message: string) => {
    setLogs(prev => [{ id: Math.random().toString(), timestamp: Date.now(), type, message }, ...prev]);
  };

  const executeRequest = async (attempt = 1) => {
    if (attempt === 1) {
      setLogs([]);
      setStatus('loading');
      setRetryCount(0);
    }

    addLog('info', `Attempt ${attempt}: Sending request...`);
    
    try {
      const willFail = Math.random() < failureRate;
      const response = await mockFetch(willFail);
      addLog('success', response);
      setStatus('success');
    } catch (error: any) {
      addLog('error', `Attempt ${attempt} Failed: ${error.message}`);
      if (attempt < 4) {
        const delay = Math.pow(2, attempt) * 500;
        addLog('warning', `Retrying in ${delay}ms (Exponential Backoff)...`);
        setRetryCount(attempt);
        setTimeout(() => executeRequest(attempt + 1), delay);
      } else {
        addLog('error', "Max retries exceeded. Aborting.");
        setStatus('error');
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 h-fit">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Simulation Config</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">API Failure Rate</span>
                <span className="text-brand-400">{Math.round(failureRate * 100)}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1" 
                value={failureRate} 
                onChange={(e) => setFailureRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-brand-500"
              />
            </div>

            <div className="p-4 bg-dark-900 rounded-lg border border-dark-600 shadow-inner">
              <div className="text-xs text-slate-500 mb-1">Strategy</div>
              <div className="text-white font-mono text-sm">Exponential Backoff</div>
              <div className="text-xs text-slate-600 mt-1">delay = 2^attempt * 500ms</div>
            </div>

            <button
              onClick={() => executeRequest(1)}
              disabled={status === 'loading'}
              className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all active:scale-95
                ${status === 'loading' 
                  ? 'bg-brand-900/50 text-brand-400 cursor-not-allowed' 
                  : 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-900/20 hover:shadow-brand-900/30'
                }`}
            >
              {status === 'loading' ? <Loader2 className="animate-spin" size={18} /> : <Play size={18} />}
              {status === 'loading' ? 'Processing...' : 'Start Request'}
            </button>

            {status !== 'idle' && status !== 'loading' && (
               <button onClick={() => { setStatus('idle'); setLogs([]); }} className="w-full py-2 text-sm text-slate-500 hover:text-white flex items-center justify-center gap-2 transition-colors">
                 <RotateCcw size={14} /> Reset Simulation
               </button>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 bg-black rounded-xl border border-dark-700 overflow-hidden flex flex-col h-[500px] shadow-inner">
          <div className="bg-dark-800 px-4 py-2 border-b border-dark-700 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-xs font-mono text-slate-400">request-logger.ts</span>
          </div>
          <div className="p-4 overflow-y-auto flex-1 font-mono text-sm space-y-3">
            {logs.length === 0 && <div className="text-slate-600 text-center mt-10 italic">Ready to start simulation...</div>}
            {[...logs].reverse().map((log) => (
              <div key={log.id} className="flex gap-3 animate-slideIn">
                <span className="text-slate-600 text-xs mt-1 min-w-[60px]">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour12: false, second: '2-digit', fractionalSecondDigits: 2 } as any)}
                </span>
                <div className={`flex-1 ${log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-green-400' : log.type === 'warning' ? 'text-yellow-400' : 'text-slate-300'}`}>
                  {log.message}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

const XSSViz = () => {
  const [input, setInput] = useState('<img src=x onerror=alert("Hacked!")>');
  const [sanitized, setSanitized] = useState(true);

  return (
    <div className="bg-dark-800 p-8 rounded-xl border border-dark-700">
      <h2 className="text-xl font-bold text-white mb-6">XSS Playground</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-400">User Comment Input</label>
          <textarea 
            value={input} 
            onChange={e => setInput(e.target.value)}
            className="w-full h-32 bg-dark-900 border border-dark-600 rounded-lg p-3 text-slate-200 font-mono text-sm focus:ring-2 focus:ring-red-500 focus:outline-none transition-shadow"
          />
          <div className="flex items-center gap-3 bg-dark-900 p-3 rounded-lg shadow-inner">
             <button 
               onClick={() => setSanitized(!sanitized)} 
               className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${sanitized ? 'bg-green-600' : 'bg-red-600'}`}
             >
               <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow ${sanitized ? 'translate-x-6' : 'translate-x-1'}`} />
             </button>
             <span className={`text-sm font-bold ${sanitized ? 'text-green-400' : 'text-red-400'}`}>
               {sanitized ? 'Sanitization ON (React Default)' : 'Sanitization OFF (dangerouslySetInnerHTML)'}
             </span>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-400">Rendered Output</label>
          <div className="h-32 bg-white rounded-lg p-4 text-black overflow-auto border-2 border-slate-300 relative shadow-inner">
             {sanitized ? (
               <div className="break-all">{input}</div>
             ) : (
               <div className="break-all text-red-600 font-bold" dangerouslySetInnerHTML={{ __html: input }} />
             )}
             
             {!sanitized && (
               <div className="absolute top-2 right-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded font-bold border border-red-200 animate-pulse">
                 UNSAFE
               </div>
             )}
          </div>
          
          <div className="bg-dark-950 p-3 rounded-lg border border-dark-600 text-xs font-mono text-slate-500">
            {sanitized ? (
               <>
                 <span className="text-blue-400">{'<div>'}</span>{'{input}'}<span className="text-blue-400">{'</div>'}</span>
                 <br/><span className="text-slate-600">// React automatically escapes characters</span>
               </>
            ) : (
               <>
                 <span className="text-blue-400">{'<div'}</span> <span className="text-purple-400">dangerouslySetInnerHTML</span>={'{'} {'{'} __html: input {'}'} {'}'} <span className="text-blue-400">{'/>'}</span>
                 <br/><span className="text-red-400">// Scripts execute!</span>
               </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CsrfViz = () => {
  const [hasToken, setHasToken] = useState(false);
  const [attackStatus, setAttackStatus] = useState<'idle' | 'success' | 'blocked'>('idle');

  const attack = () => {
    // Simulating attack
    if (hasToken) {
      setAttackStatus('blocked');
    } else {
      setAttackStatus('success');
    }
    setTimeout(() => setAttackStatus('idle'), 3000);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Legit Site */}
      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 relative overflow-hidden transition-all hover:border-brand-500/30 hover:bg-dark-800/80">
        <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <ShieldCheck className="text-green-400" size={20} /> Bank of React
        </h3>
        <p className="text-xs text-slate-400 mb-4">Target Website. User is logged in (Cookies present).</p>
        
        <div className="bg-dark-900 p-4 rounded-lg border border-dark-600 mb-4 shadow-inner">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-300">Security Config</span>
            <button 
              onClick={() => setHasToken(!hasToken)}
              className={`px-3 py-1 rounded text-xs font-bold transition-all ${hasToken ? 'bg-green-600 text-white shadow' : 'bg-dark-700 text-slate-400 hover:text-white'}`}
            >
              {hasToken ? 'CSRF Token: ON' : 'CSRF Token: OFF'}
            </button>
          </div>
          <div className="font-mono text-xs text-slate-500">
            {hasToken ? (
              <span className="text-green-400">
                POST /transfer<br/>
                Cookie: session_id=123<br/>
                <span className="text-yellow-400">X-CSRF-Token: abc-xyz</span>
              </span>
            ) : (
              <span className="text-red-400">
                POST /transfer<br/>
                Cookie: session_id=123<br/>
                <span className="opacity-50 text-slate-600">// Missing Token</span>
              </span>
            )}
          </div>
        </div>

        {attackStatus === 'success' && (
          <div className="bg-red-500/20 border border-red-500/50 p-3 rounded text-red-200 text-sm flex items-center gap-2 animate-fadeIn shadow-lg">
            <AlertTriangle size={16} /> Fund transfer authorized! (Attack Success)
          </div>
        )}
         {attackStatus === 'blocked' && (
          <div className="bg-green-500/20 border border-green-500/50 p-3 rounded text-green-200 text-sm flex items-center gap-2 animate-fadeIn shadow-lg">
            <ShieldCheck size={16} /> 403 Forbidden: Invalid CSRF Token
          </div>
        )}
      </div>

      {/* Attacker Site */}
      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 relative overflow-hidden transition-all hover:border-brand-500/30 hover:bg-dark-800/80">
        <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <Skull className="text-red-400" size={20} /> Evil.com
        </h3>
        <p className="text-xs text-slate-400 mb-4">Malicious Website. User visits this page.</p>

        <div className="bg-dark-900 p-4 rounded-lg border border-dark-600 mb-4 h-32 flex flex-col justify-center items-center text-center shadow-inner">
           <p className="text-sm text-white mb-3">"Click here to win a FREE iPhone!"</p>
           <button 
             onClick={attack}
             className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-blue-900/50 transition-all active:scale-95 transform hover:scale-105"
           >
             Claim Prize
           </button>
        </div>

        <div className="text-xs text-slate-500">
          <p className="mb-1 font-bold">How it works:</p>
          Evil.com sends a POST request to Bank. Browser <strong>automatically</strong> attaches cookies. If Bank doesn't check for a CSRF token (which Evil.com can't read), the request succeeds.
        </div>
      </div>
    </div>
  );
};

// --- CORS VIZ ---
const CorsViz = () => {
  const [backendAllowed, setBackendAllowed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'blocked'>('idle');

  const sendRequest = () => {
    setStatus(backendAllowed ? 'success' : 'blocked');
    setTimeout(() => setStatus('idle'), 2500);
  };

  return (
    <div className="bg-dark-800 p-8 rounded-xl border border-dark-700">
      <h2 className="text-xl font-bold text-white mb-6">CORS Playground</h2>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Frontend */}
        <div className="flex-1 bg-dark-900 p-6 rounded-xl border border-dark-600 relative shadow-lg">
           <div className="absolute -top-3 left-4 bg-dark-600 text-xs px-2 py-1 rounded text-slate-300 shadow">
             Origin: http://localhost:3000
           </div>
           <Globe className="text-brand-400 mb-4" size={32} />
           <p className="text-sm text-slate-300 mb-4">Frontend App</p>
           <button 
             onClick={sendRequest}
             className="w-full bg-white text-dark-900 font-bold py-2 rounded hover:bg-slate-200 transition-all active:scale-95 shadow-md"
           >
             Fetch Data
           </button>
        </div>

        {/* Network */}
        <div className="flex flex-col items-center gap-2">
           <ArrowLeftRight className="text-slate-500" />
           {status === 'blocked' && <div className="text-red-500 text-xs font-bold animate-pulse">BLOCKED</div>}
           {status === 'success' && <div className="text-green-500 text-xs font-bold animate-pulse">OK 200</div>}
        </div>

        {/* Backend */}
        <div className="flex-1 bg-dark-900 p-6 rounded-xl border border-dark-600 relative shadow-lg">
           <div className="absolute -top-3 right-4 bg-dark-600 text-xs px-2 py-1 rounded text-slate-300 shadow">
             Origin: http://api.server.com
           </div>
           <Server className="text-purple-400 mb-4" size={32} />
           <p className="text-sm text-slate-300 mb-4">Backend API</p>
           
           <div className="bg-black p-3 rounded border border-dark-700 font-mono text-xs shadow-inner">
             <div className="text-slate-500 mb-1">Response Headers:</div>
             <div className="flex items-center justify-between gap-2">
               <span className={backendAllowed ? "text-green-400" : "text-slate-600 decoration-line-through"}>Access-Control-Allow-Origin: *</span>
               <button 
                 onClick={() => setBackendAllowed(!backendAllowed)}
                 className={`w-8 h-4 rounded-full transition-colors relative focus:outline-none ${backendAllowed ? 'bg-green-600' : 'bg-red-600'}`}
               >
                 <span className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all shadow-sm ${backendAllowed ? 'left-4.5' : 'left-0.5'}`} style={{ left: backendAllowed ? '18px' : '2px' }}></span>
               </button>
             </div>
           </div>
        </div>
      </div>
      
      {status === 'blocked' && (
        <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-200 text-xs font-mono animate-fadeIn shadow-inner">
          🚨 Access to fetch at 'http://api.server.com' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
        </div>
      )}
    </div>
  );
};

export const ApiResilienceDemo: React.FC<{ isLearnMode?: boolean, initialTab?: string }> = ({ isLearnMode = false, initialTab = 'fetching' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  if (isLearnMode) {
    return <ResilienceGuide activeTab={activeTab} setActiveTab={setActiveTab} />;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-dark-700 mb-6 scrollbar-hide">
        {[
          {id: 'fetching', label: 'Fetch Simulator'},
          {id: 'xss', label: 'XSS Lab'},
          {id: 'csrf', label: 'CSRF Attack'},
          {id: 'cors', label: 'CORS Playground'},
        ].map(t => (
          <button 
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${activeTab === t.id ? 'bg-white text-black' : 'bg-dark-800 text-slate-400 hover:text-white'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'fetching' && <FetchViz />}
      {activeTab === 'xss' && <XSSViz />}
      {activeTab === 'csrf' && <CsrfViz />}
      {activeTab === 'cors' && <CorsViz />}
    </div>
  );
};