import React, { useState } from 'react';
import { 
  Shield, Server, Database, Target, Layers, RefreshCw, 
  Clock, Activity 
} from 'lucide-react';

const CircuitBreakerViz: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'states' | 'simulation' | 'config' | 'patterns'>('states');
  const [circuitState, setCircuitState] = useState<'closed' | 'open' | 'half-open'>('closed');
  const [failureCount, setFailureCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [requestHistory, setRequestHistory] = useState<Array<{ id: number; success: boolean; timestamp: number }>>([]);
  
  const FAILURE_THRESHOLD = 5;
  const SUCCESS_THRESHOLD = 3;
  const TIMEOUT_DURATION = 5000; // 5 seconds
  
  const tabs = [
    { id: 'states', label: 'Circuit States' },
    { id: 'simulation', label: 'Live Simulation' },
    { id: 'config', label: 'Configuration' },
    { id: 'patterns', label: 'Related Patterns' },
  ];

  const simulateRequest = (forceResult?: 'success' | 'failure') => {
    const isSuccess = forceResult ? forceResult === 'success' : Math.random() > 0.6;
    const newRequest = { id: Date.now(), success: isSuccess, timestamp: Date.now() };
    
    setRequestHistory(prev => [...prev.slice(-9), newRequest]);
    
    if (circuitState === 'closed') {
      if (isSuccess) {
        setSuccessCount(prev => prev + 1);
        setFailureCount(0);
      } else {
        const newFailures = failureCount + 1;
        setFailureCount(newFailures);
        if (newFailures >= FAILURE_THRESHOLD) {
          setCircuitState('open');
          setFailureCount(0);
          // Auto transition to half-open after timeout
          setTimeout(() => {
            setCircuitState('half-open');
            setSuccessCount(0);
          }, TIMEOUT_DURATION);
        }
      }
    } else if (circuitState === 'half-open') {
      if (isSuccess) {
        const newSuccesses = successCount + 1;
        setSuccessCount(newSuccesses);
        if (newSuccesses >= SUCCESS_THRESHOLD) {
          setCircuitState('closed');
          setSuccessCount(0);
          setFailureCount(0);
        }
      } else {
        setCircuitState('open');
        setSuccessCount(0);
        setTimeout(() => {
          setCircuitState('half-open');
          setSuccessCount(0);
        }, TIMEOUT_DURATION);
      }
    }
    // If open, requests are rejected (fail-fast)
  };

  const resetSimulation = () => {
    setCircuitState('closed');
    setFailureCount(0);
    setSuccessCount(0);
    setRequestHistory([]);
  };

  const stateColors = {
    closed: 'text-green-400 bg-green-500/20 border-green-500',
    open: 'text-red-400 bg-red-500/20 border-red-500',
    'half-open': 'text-yellow-400 bg-yellow-500/20 border-yellow-500',
  };

  const stateDescriptions = {
    closed: 'Normal operation. Requests flow through. Failures are counted.',
    open: 'Circuit is tripped. All requests fail-fast without calling the service.',
    'half-open': 'Testing phase. Limited requests allowed to test if service recovered.',
  };

  return (
    <div className="space-y-6">
      <div className="bg-dark-800 rounded-xl p-4 border border-dark-700">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <Shield className="text-orange-400" size={20} />
          Circuit Breaker Pattern
        </h3>
        <p className="text-slate-400 text-sm">
          Prevents cascading failures by detecting failures and stopping requests to failing services.
          Like an electrical circuit breaker that trips to prevent damage.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-orange-500 text-white'
                : 'bg-dark-800 text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'states' && (
        <div className="space-y-6">
          {/* State Machine Diagram */}
          <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
            <h4 className="text-white font-semibold mb-6 text-center">Circuit Breaker State Machine</h4>
            
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {/* Closed State */}
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-green-500/20 border-4 border-green-500 flex items-center justify-center mb-2 mx-auto">
                  <div className="text-center">
                    <div className="text-green-400 font-bold text-lg">CLOSED</div>
                    <div className="text-green-400/60 text-xs mt-1">Normal</div>
                  </div>
                </div>
                <div className="text-slate-400 text-xs max-w-[120px]">
                  Requests pass through, failures counted
                </div>
              </div>

              {/* Arrow: Closed -> Open */}
              <div className="flex flex-col items-center">
                <div className="text-red-400 text-xs mb-1">Failure threshold</div>
                <div className="text-red-400 text-2xl">→</div>
                <div className="text-red-400 text-xs mt-1">exceeded</div>
              </div>

              {/* Open State */}
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-red-500/20 border-4 border-red-500 flex items-center justify-center mb-2 mx-auto">
                  <div className="text-center">
                    <div className="text-red-400 font-bold text-lg">OPEN</div>
                    <div className="text-red-400/60 text-xs mt-1">Fail Fast</div>
                  </div>
                </div>
                <div className="text-slate-400 text-xs max-w-[120px]">
                  All requests rejected immediately
                </div>
              </div>

              {/* Arrow: Open -> Half-Open */}
              <div className="flex flex-col items-center">
                <div className="text-yellow-400 text-xs mb-1">Timeout</div>
                <div className="text-yellow-400 text-2xl">→</div>
                <div className="text-yellow-400 text-xs mt-1">expires</div>
              </div>

              {/* Half-Open State */}
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-yellow-500/20 border-4 border-yellow-500 flex items-center justify-center mb-2 mx-auto">
                  <div className="text-center">
                    <div className="text-yellow-400 font-bold text-lg">HALF-OPEN</div>
                    <div className="text-yellow-400/60 text-xs mt-1">Testing</div>
                  </div>
                </div>
                <div className="text-slate-400 text-xs max-w-[120px]">
                  Limited requests to test recovery
                </div>
              </div>
            </div>

            {/* Return arrows */}
            <div className="mt-6 flex justify-center gap-16 text-xs">
              <div className="flex items-center gap-2 text-green-400">
                <span>← Success threshold met</span>
                <span className="text-slate-500">(Half-Open → Closed)</span>
              </div>
              <div className="flex items-center gap-2 text-red-400">
                <span>← Any failure</span>
                <span className="text-slate-500">(Half-Open → Open)</span>
              </div>
            </div>
          </div>

          {/* State Details */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-dark-800 rounded-xl p-4 border border-green-500/30">
              <h5 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                Closed State
              </h5>
              <ul className="text-slate-400 text-sm space-y-1">
                <li>• All requests pass through</li>
                <li>• Failures are counted</li>
                <li>• Success resets failure count</li>
                <li>• Transitions to OPEN when threshold hit</li>
              </ul>
            </div>

            <div className="bg-dark-800 rounded-xl p-4 border border-red-500/30">
              <h5 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                Open State
              </h5>
              <ul className="text-slate-400 text-sm space-y-1">
                <li>• All requests fail immediately</li>
                <li>• No calls to downstream service</li>
                <li>• Returns fallback response</li>
                <li>• Timer starts for recovery test</li>
              </ul>
            </div>

            <div className="bg-dark-800 rounded-xl p-4 border border-yellow-500/30">
              <h5 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                Half-Open State
              </h5>
              <ul className="text-slate-400 text-sm space-y-1">
                <li>• Limited requests allowed</li>
                <li>• Testing if service recovered</li>
                <li>• Success → back to CLOSED</li>
                <li>• Failure → back to OPEN</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'simulation' && (
        <div className="space-y-6">
          {/* Current State Display */}
          <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-white font-semibold">Live Circuit Breaker</h4>
              <button
                onClick={resetSimulation}
                className="px-3 py-1 bg-dark-700 text-slate-400 rounded text-sm hover:text-white"
              >
                Reset
              </button>
            </div>

            {/* Circuit Visualization */}
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-center">
                <Server className="text-blue-400 mx-auto mb-2" size={32} />
                <div className="text-slate-400 text-sm">Client</div>
              </div>

              <div className="flex flex-col items-center">
                <div className={`w-24 h-16 rounded-lg border-2 flex items-center justify-center ${stateColors[circuitState]}`}>
                  <span className="font-bold uppercase text-sm">{circuitState}</span>
                </div>
                <div className={`h-1 w-32 mt-2 rounded ${
                  circuitState === 'open' ? 'bg-red-500/30' : 'bg-green-500'
                }`} />
              </div>

              <div className="text-center">
                <Database className={`mx-auto mb-2 ${circuitState === 'open' ? 'text-red-400' : 'text-green-400'}`} size={32} />
                <div className="text-slate-400 text-sm">Service</div>
              </div>
            </div>

            <p className="text-center text-slate-400 text-sm mb-6">
              {stateDescriptions[circuitState]}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-dark-900 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-red-400">{failureCount}</div>
                <div className="text-slate-500 text-xs">Failures ({FAILURE_THRESHOLD} to trip)</div>
              </div>
              <div className="bg-dark-900 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-400">{successCount}</div>
                <div className="text-slate-500 text-xs">Successes ({SUCCESS_THRESHOLD} to close)</div>
              </div>
              <div className="bg-dark-900 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">{requestHistory.length}</div>
                <div className="text-slate-500 text-xs">Total Requests</div>
              </div>
            </div>

            {/* Request Buttons */}
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => simulateRequest('success')}
                disabled={circuitState === 'open'}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  circuitState === 'open'
                    ? 'bg-dark-700 text-slate-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-500'
                }`}
              >
                ✓ Successful Request
              </button>
              <button
                onClick={() => simulateRequest('failure')}
                disabled={circuitState === 'open'}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  circuitState === 'open'
                    ? 'bg-dark-700 text-slate-500 cursor-not-allowed'
                    : 'bg-red-600 text-white hover:bg-red-500'
                }`}
              >
                ✗ Failed Request
              </button>
              <button
                onClick={() => simulateRequest()}
                disabled={circuitState === 'open'}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  circuitState === 'open'
                    ? 'bg-dark-700 text-slate-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-500'
                }`}
              >
                🎲 Random Request
              </button>
            </div>

            {circuitState === 'open' && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-center">
                <div className="text-red-400 font-medium">Circuit is OPEN - Requests blocked!</div>
                <div className="text-slate-400 text-sm">Will transition to HALF-OPEN in 5 seconds...</div>
              </div>
            )}
          </div>

          {/* Request History */}
          <div className="bg-dark-800 rounded-xl p-4 border border-dark-700">
            <h4 className="text-white font-semibold mb-4">Request History</h4>
            <div className="flex gap-2 flex-wrap">
              {requestHistory.length === 0 ? (
                <span className="text-slate-500 text-sm">No requests yet. Click buttons above to simulate.</span>
              ) : (
                requestHistory.map((req) => (
                  <div
                    key={req.id}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold ${
                      req.success
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {req.success ? '✓' : '✗'}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'config' && (
        <div className="space-y-6">
          <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
            <h4 className="text-white font-semibold mb-4">Configuration Parameters</h4>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-dark-900 rounded-lg p-4">
                  <div className="text-orange-400 font-medium mb-2">Failure Threshold</div>
                  <div className="text-slate-400 text-sm mb-2">
                    Number of failures before circuit opens
                  </div>
                  <code className="text-green-400 text-sm">failureThreshold: 5</code>
                </div>

                <div className="bg-dark-900 rounded-lg p-4">
                  <div className="text-orange-400 font-medium mb-2">Success Threshold</div>
                  <div className="text-slate-400 text-sm mb-2">
                    Successes needed to close from half-open
                  </div>
                  <code className="text-green-400 text-sm">successThreshold: 3</code>
                </div>

                <div className="bg-dark-900 rounded-lg p-4">
                  <div className="text-orange-400 font-medium mb-2">Timeout Duration</div>
                  <div className="text-slate-400 text-sm mb-2">
                    Time before testing recovery (open → half-open)
                  </div>
                  <code className="text-green-400 text-sm">timeout: 30000 // 30 seconds</code>
                </div>

                <div className="bg-dark-900 rounded-lg p-4">
                  <div className="text-orange-400 font-medium mb-2">Sliding Window</div>
                  <div className="text-slate-400 text-sm mb-2">
                    Time window for counting failures
                  </div>
                  <code className="text-green-400 text-sm">slidingWindow: 60000 // 1 minute</code>
                </div>
              </div>
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
            <h4 className="text-white font-semibold mb-4">Implementation Example</h4>
            <pre className="bg-dark-900 rounded-lg p-4 text-sm overflow-x-auto">
              <code className="text-slate-300">{`class CircuitBreaker {
  constructor(options) {
    this.state = 'CLOSED';
    this.failureCount = 0;
    this.successCount = 0;
    this.failureThreshold = options.failureThreshold || 5;
    this.successThreshold = options.successThreshold || 3;
    this.timeout = options.timeout || 30000;
  }

  async call(action) {
    if (this.state === 'OPEN') {
      throw new Error('Circuit is OPEN - failing fast');
    }

    try {
      const result = await action();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;
    if (this.state === 'HALF_OPEN') {
      this.successCount++;
      if (this.successCount >= this.successThreshold) {
        this.state = 'CLOSED';
        this.successCount = 0;
      }
    }
  }

  onFailure() {
    this.failureCount++;
    if (this.state === 'HALF_OPEN' || 
        this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
      this.scheduleRecovery();
    }
  }

  scheduleRecovery() {
    setTimeout(() => {
      this.state = 'HALF_OPEN';
      this.successCount = 0;
    }, this.timeout);
  }
}`}</code>
            </pre>
          </div>

          {/* Fallback Strategies */}
          <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
            <h4 className="text-white font-semibold mb-4">Fallback Strategies</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">1</div>
                  <div>
                    <div className="text-white font-medium">Cached Response</div>
                    <div className="text-slate-400 text-sm">Return last known good response</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">2</div>
                  <div>
                    <div className="text-white font-medium">Default Value</div>
                    <div className="text-slate-400 text-sm">Return sensible default</div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">3</div>
                  <div>
                    <div className="text-white font-medium">Alternative Service</div>
                    <div className="text-slate-400 text-sm">Route to backup service</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">4</div>
                  <div>
                    <div className="text-white font-medium">Queue for Retry</div>
                    <div className="text-slate-400 text-sm">Store request for later processing</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'patterns' && (
        <div className="space-y-6">
          <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
            <h4 className="text-white font-semibold mb-4">Related Resiliency Patterns</h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* Bulkhead */}
              <div className="bg-dark-900 rounded-lg p-4 border border-dark-700">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Layers className="text-purple-400" size={16} />
                  </div>
                  <div className="text-white font-medium">Bulkhead Pattern</div>
                </div>
                <p className="text-slate-400 text-sm mb-3">
                  Isolate components so failure in one doesn't cascade to others.
                  Like compartments in a ship.
                </p>
                <div className="flex gap-2">
                  {['Pool A', 'Pool B', 'Pool C'].map((pool) => (
                    <div key={pool} className="flex-1 bg-dark-800 rounded p-2 text-center border border-dark-600">
                      <div className="text-xs text-slate-400">{pool}</div>
                      <div className="text-lg">🔒</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Retry */}
              <div className="bg-dark-900 rounded-lg p-4 border border-dark-700">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <RefreshCw className="text-green-400" size={16} />
                  </div>
                  <div className="text-white font-medium">Retry with Backoff</div>
                </div>
                <p className="text-slate-400 text-sm mb-3">
                  Automatically retry failed requests with increasing delays.
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">1s</span>
                  <span className="text-slate-600">→</span>
                  <span className="text-slate-400">2s</span>
                  <span className="text-slate-600">→</span>
                  <span className="text-slate-400">4s</span>
                  <span className="text-slate-600">→</span>
                  <span className="text-slate-400">8s</span>
                  <span className="text-green-400 ml-2">+ jitter</span>
                </div>
              </div>

              {/* Timeout */}
              <div className="bg-dark-900 rounded-lg p-4 border border-dark-700">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <Clock className="text-yellow-400" size={16} />
                  </div>
                  <div className="text-white font-medium">Timeout Pattern</div>
                </div>
                <p className="text-slate-400 text-sm mb-3">
                  Set maximum wait time for responses to prevent resource exhaustion.
                </p>
                <div className="text-xs text-slate-400">
                  <code>timeout: 3000ms</code> → Fail if no response
                </div>
              </div>

              {/* Health Check */}
              <div className="bg-dark-900 rounded-lg p-4 border border-dark-700">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <Activity className="text-red-400" size={16} />
                  </div>
                  <div className="text-white font-medium">Health Checks</div>
                </div>
                <p className="text-slate-400 text-sm mb-3">
                  Periodic checks to verify service availability and route traffic accordingly.
                </p>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className={`w-2 h-4 rounded ${i < 4 ? 'bg-green-500' : 'bg-red-500'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* When to Use */}
          <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
            <h4 className="text-white font-semibold mb-4">When to Use Circuit Breaker</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-green-400 font-medium mb-2">✓ Good Use Cases</div>
                <ul className="text-slate-400 text-sm space-y-1">
                  <li>• External API calls (payment, maps, etc.)</li>
                  <li>• Database connections</li>
                  <li>• Inter-service communication</li>
                  <li>• Network-bound operations</li>
                  <li>• Any operation that can fail temporarily</li>
                </ul>
              </div>
              <div>
                <div className="text-red-400 font-medium mb-2">✗ Not Ideal For</div>
                <ul className="text-slate-400 text-sm space-y-1">
                  <li>• In-memory operations</li>
                  <li>• Operations that must succeed</li>
                  <li>• Synchronous critical path</li>
                  <li>• When fallback isn't possible</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Libraries */}
          <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
            <h4 className="text-white font-semibold mb-4">Popular Libraries</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: 'Resilience4j', lang: 'Java' },
                { name: 'Hystrix', lang: 'Java (Legacy)' },
                { name: 'Polly', lang: '.NET' },
                { name: 'opossum', lang: 'Node.js' },
              ].map(lib => (
                <div key={lib.name} className="bg-dark-900 rounded-lg p-3 text-center">
                  <div className="text-white font-medium text-sm">{lib.name}</div>
                  <div className="text-slate-500 text-xs">{lib.lang}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Interview Tips */}
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl p-6 border border-orange-500/20">
        <h4 className="text-orange-400 font-semibold mb-3 flex items-center gap-2">
          <Target size={18} />
          Interview Tips
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="text-white font-medium">Key Discussion Points:</div>
            <ul className="text-slate-400 space-y-1">
              <li>• Explain the 3 states clearly</li>
              <li>• Mention cascading failure prevention</li>
              <li>• Discuss fallback strategies</li>
              <li>• Know when NOT to use it</li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="text-white font-medium">Bonus Points:</div>
            <ul className="text-slate-400 space-y-1">
              <li>• Combine with retry + backoff</li>
              <li>• Mention monitoring/alerting</li>
              <li>• Discuss bulkhead isolation</li>
              <li>• Reference Resilience4j or Hystrix</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircuitBreakerViz;
