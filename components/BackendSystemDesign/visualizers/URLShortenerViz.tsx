import React, { useState } from 'react';
import { 
  Link, Server, Cpu, Hash, Zap, Database, Activity, 
  CheckCircle2, Gauge, FileText, Lightbulb, AlertTriangle 
} from 'lucide-react';

const URLShortenerViz: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'design' | 'encoding' | 'flow' | 'scale'>('design');
  const [inputURL, setInputURL] = useState('https://example.com/very/long/path/to/resource?query=param');
  const [shortCode, setShortCode] = useState('');
  const [isEncoding, setIsEncoding] = useState(false);
  const [encodingStep, setEncodingStep] = useState(0);
  const [counterValue, setCounterValue] = useState(1000000);

  const base62Chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  const encodeBase62 = (num: number): string => {
    let result = '';
    while (num > 0) {
      result = base62Chars[num % 62] + result;
      num = Math.floor(num / 62);
    }
    return result.padStart(7, '0');
  };

  const simulateEncoding = () => {
    setIsEncoding(true);
    setEncodingStep(0);
    setShortCode('');
    
    const steps = [1, 2, 3, 4];
    let stepIndex = 0;
    
    const interval = setInterval(() => {
      setEncodingStep(steps[stepIndex]);
      stepIndex++;
      
      if (stepIndex >= steps.length) {
        clearInterval(interval);
        const newCounter = counterValue + 1;
        setCounterValue(newCounter);
        setShortCode(encodeBase62(newCounter));
        setIsEncoding(false);
      }
    }, 800);
  };

  const systemComponents = [
    { name: 'Load Balancer', icon: <Server size={20} />, desc: 'Distributes traffic across API servers', color: 'blue' },
    { name: 'API Servers', icon: <Cpu size={20} />, desc: 'Handle create/redirect requests', color: 'green' },
    { name: 'ID Generator', icon: <Hash size={20} />, desc: 'Generates unique IDs (counter/snowflake)', color: 'purple' },
    { name: 'Cache (Redis)', icon: <Zap size={20} />, desc: 'Hot URL lookups for fast redirects', color: 'yellow' },
    { name: 'Database', icon: <Database size={20} />, desc: 'Stores URL mappings persistently', color: 'orange' },
    { name: 'Analytics', icon: <Activity size={20} />, desc: 'Click tracking, geo, referrers', color: 'pink' },
  ];

  const scalingStrategies = [
    { 
      title: 'Database Sharding', 
      desc: 'Shard by first character of short code or hash-based partitioning',
      benefit: 'Horizontal scalability for billions of URLs'
    },
    { 
      title: 'Cache Layer', 
      desc: 'Redis cluster for hot URLs (80/20 rule - 20% URLs get 80% traffic)',
      benefit: '< 10ms redirect latency'
    },
    { 
      title: 'Distributed ID Generation', 
      desc: 'Twitter Snowflake or pre-allocated counter ranges per server',
      benefit: 'No single point of failure, no collisions'
    },
    { 
      title: 'Read Replicas', 
      desc: 'Multiple read replicas for redirect queries (read-heavy workload)',
      benefit: '100:1 read/write ratio handled efficiently'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Link className="text-brand-400" size={24} />
          URL Shortening Service
        </h3>
        <div className="flex gap-2">
          {[
            { id: 'design', label: 'System Design' },
            { id: 'encoding', label: 'Base62 Encoding' },
            { id: 'flow', label: 'Request Flow' },
            { id: 'scale', label: 'Scaling' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as typeof activeTab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === t.id ? 'bg-brand-600 text-white' : 'bg-dark-700 text-slate-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* System Design Tab */}
      {activeTab === 'design' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Requirements */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-dark-800 p-5 rounded-xl border border-dark-700">
              <h4 className="text-sm font-bold text-green-400 mb-3 flex items-center gap-2">
                <CheckCircle2 size={16} /> Functional Requirements
              </h4>
              <ul className="text-sm text-slate-300 space-y-2">
                <li>• Generate short URL from long URL</li>
                <li>• Redirect short URL to original</li>
                <li>• Custom aliases (optional)</li>
                <li>• Link expiration (optional)</li>
                <li>• Analytics (clicks, geo, referrer)</li>
              </ul>
            </div>
            <div className="bg-dark-800 p-5 rounded-xl border border-dark-700">
              <h4 className="text-sm font-bold text-blue-400 mb-3 flex items-center gap-2">
                <Gauge size={16} /> Non-Functional Requirements
              </h4>
              <ul className="text-sm text-slate-300 space-y-2">
                <li>• High availability (99.9%)</li>
                <li>• Low latency redirects (&lt;100ms)</li>
                <li>• 100M URLs created/day</li>
                <li>• 10B redirects/day (100:1 read/write)</li>
                <li>• URLs readable, not predictable</li>
              </ul>
            </div>
          </div>

          {/* Back of Envelope */}
          <div className="bg-dark-800 p-5 rounded-xl border border-dark-700">
            <h4 className="text-sm font-bold text-yellow-400 mb-4 flex items-center gap-2">
              <FileText size={16} /> Back-of-Envelope Estimation
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-dark-900 p-3 rounded-lg">
                <div className="text-slate-500 text-xs">Write QPS</div>
                <div className="text-white font-bold">100M / 86400 ≈ 1160/sec</div>
              </div>
              <div className="bg-dark-900 p-3 rounded-lg">
                <div className="text-slate-500 text-xs">Read QPS</div>
                <div className="text-white font-bold">1160 × 100 ≈ 116K/sec</div>
              </div>
              <div className="bg-dark-900 p-3 rounded-lg">
                <div className="text-slate-500 text-xs">Storage (5 years)</div>
                <div className="text-white font-bold">100M × 365 × 5 × 500B ≈ 91TB</div>
              </div>
            </div>
          </div>

          {/* System Components */}
          <div className="bg-dark-800 p-5 rounded-xl border border-dark-700">
            <h4 className="text-sm font-bold text-white mb-4">System Components</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {systemComponents.map((comp, i) => (
                <div key={i} className={`p-4 rounded-lg bg-${comp.color}-500/10 border border-${comp.color}-500/30`}>
                  <div className={`text-${comp.color}-400 mb-2`}>{comp.icon}</div>
                  <div className="text-sm font-bold text-white">{comp.name}</div>
                  <div className="text-xs text-slate-400 mt-1">{comp.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Database Schema */}
          <div className="bg-dark-800 p-5 rounded-xl border border-dark-700">
            <h4 className="text-sm font-bold text-white mb-4">Database Schema</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-dark-900 p-4 rounded-lg font-mono text-xs">
                <div className="text-green-400 mb-2">// urls table</div>
                <div className="text-slate-300">
                  <div>id: <span className="text-yellow-400">BIGINT PK</span></div>
                  <div>short_code: <span className="text-blue-400">VARCHAR(7) UNIQUE</span></div>
                  <div>original_url: <span className="text-blue-400">TEXT</span></div>
                  <div>user_id: <span className="text-purple-400">BIGINT FK</span></div>
                  <div>created_at: <span className="text-orange-400">TIMESTAMP</span></div>
                  <div>expires_at: <span className="text-orange-400">TIMESTAMP NULL</span></div>
                  <div>click_count: <span className="text-green-400">INT DEFAULT 0</span></div>
                </div>
              </div>
              <div className="bg-dark-900 p-4 rounded-lg font-mono text-xs">
                <div className="text-green-400 mb-2">// analytics table</div>
                <div className="text-slate-300">
                  <div>id: <span className="text-yellow-400">BIGINT PK</span></div>
                  <div>url_id: <span className="text-purple-400">BIGINT FK</span></div>
                  <div>clicked_at: <span className="text-orange-400">TIMESTAMP</span></div>
                  <div>ip_address: <span className="text-blue-400">VARCHAR(45)</span></div>
                  <div>user_agent: <span className="text-blue-400">TEXT</span></div>
                  <div>referrer: <span className="text-blue-400">TEXT</span></div>
                  <div>country: <span className="text-blue-400">VARCHAR(2)</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Encoding Tab */}
      {activeTab === 'encoding' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h4 className="text-lg font-bold text-white mb-4">Base62 Encoding Demo</h4>
            
            {/* Input URL */}
            <div className="mb-6">
              <label className="text-xs text-slate-500 block mb-2">Long URL</label>
              <input
                type="text"
                value={inputURL}
                onChange={(e) => setInputURL(e.target.value)}
                placeholder="Enter a long URL to shorten"
                className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-3 text-sm text-white font-mono"
              />
            </div>

            {/* Encoding Process */}
            <div className="bg-dark-900 p-4 rounded-lg mb-6">
              <div className="grid grid-cols-4 gap-4 text-center">
                {[
                  { step: 1, label: 'Get Counter', value: counterValue.toString(), active: encodingStep >= 1 },
                  { step: 2, label: 'Increment', value: (counterValue + 1).toString(), active: encodingStep >= 2 },
                  { step: 3, label: 'Convert Base62', value: encodeBase62(counterValue + 1), active: encodingStep >= 3 },
                  { step: 4, label: 'Store & Return', value: `short.ly/${encodeBase62(counterValue + 1)}`, active: encodingStep >= 4 },
                ].map((s, i) => (
                  <div 
                    key={i}
                    className={`p-3 rounded-lg transition-all ${
                      s.active ? 'bg-brand-600/30 border border-brand-500' : 'bg-dark-800'
                    }`}
                  >
                    <div className={`text-xs mb-1 ${s.active ? 'text-brand-400' : 'text-slate-500'}`}>
                      Step {s.step}
                    </div>
                    <div className="text-xs text-slate-400 mb-2">{s.label}</div>
                    <div className={`font-mono text-sm ${s.active ? 'text-white' : 'text-slate-600'}`}>
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={simulateEncoding}
              disabled={isEncoding}
              className="w-full py-3 bg-brand-600 text-white rounded-lg font-bold disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isEncoding ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Encoding...
                </>
              ) : (
                <>
                  <Zap size={16} /> Generate Short URL
                </>
              )}
            </button>

            {shortCode && (
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg animate-fadeIn">
                <div className="text-xs text-green-400 mb-1">Generated Short URL</div>
                <div className="text-lg font-mono text-white">short.ly/{shortCode}</div>
              </div>
            )}
          </div>

          {/* Base62 Explanation */}
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h4 className="text-sm font-bold text-white mb-4">Why Base62?</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="bg-dark-900 p-3 rounded-lg">
                  <div className="text-sm font-bold text-white mb-1">62 characters</div>
                  <div className="font-mono text-xs text-slate-400 break-all">{base62Chars}</div>
                </div>
                <div className="bg-dark-900 p-3 rounded-lg">
                  <div className="text-sm font-bold text-white mb-1">7 characters = 3.5 trillion URLs</div>
                  <div className="text-xs text-slate-400">62^7 = 3,521,614,606,208 unique codes</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-dark-900 p-3 rounded-lg">
                  <div className="text-sm font-bold text-white mb-1">No special characters</div>
                  <div className="text-xs text-slate-400">URL-safe, no encoding needed</div>
                </div>
                <div className="bg-dark-900 p-3 rounded-lg">
                  <div className="text-sm font-bold text-white mb-1">Case-sensitive</div>
                  <div className="text-xs text-slate-400">'a' ≠ 'A' (more combinations)</div>
                </div>
              </div>
            </div>
          </div>

          {/* ID Generation Strategies */}
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h4 className="text-sm font-bold text-white mb-4">ID Generation Strategies</h4>
            <div className="space-y-3">
              {[
                { name: 'Counter + Base62', pros: 'Simple, sequential', cons: 'Single point of failure, predictable', rec: 'Small scale' },
                { name: 'UUID → Base62', pros: 'No coordination needed', cons: 'Longer codes, random order', rec: 'Distributed systems' },
                { name: 'Snowflake ID', pros: 'Sortable, distributed', cons: 'Complex setup', rec: 'Twitter-scale' },
                { name: 'Pre-allocated Ranges', pros: 'High throughput', cons: 'Range management', rec: 'High-write systems' },
              ].map((strategy, i) => (
                <div key={i} className="bg-dark-900 p-4 rounded-lg grid md:grid-cols-4 gap-4">
                  <div className="font-bold text-white">{strategy.name}</div>
                  <div className="text-xs"><span className="text-green-400">✓</span> {strategy.pros}</div>
                  <div className="text-xs"><span className="text-red-400">✗</span> {strategy.cons}</div>
                  <div className="text-xs text-brand-400">Best for: {strategy.rec}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Request Flow Tab */}
      {activeTab === 'flow' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Create Short URL Flow */}
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h4 className="text-sm font-bold text-green-400 mb-4">Create Short URL (Write Path)</h4>
            <div className="space-y-3">
              {[
                { step: 1, action: 'POST /api/shorten', from: 'Client', to: 'Load Balancer', detail: '{"url": "https://..."}' },
                { step: 2, action: 'Forward request', from: 'Load Balancer', to: 'API Server', detail: 'Round-robin selection' },
                { step: 3, action: 'Check custom alias', from: 'API Server', to: 'Cache/DB', detail: 'If alias provided, check uniqueness' },
                { step: 4, action: 'Get unique ID', from: 'API Server', to: 'ID Generator', detail: 'Counter++ or Snowflake ID' },
                { step: 5, action: 'Encode to Base62', from: 'API Server', to: 'API Server', detail: `ID → 7-char code` },
                { step: 6, action: 'Store mapping', from: 'API Server', to: 'Database', detail: 'INSERT (short_code, original_url)' },
                { step: 7, action: 'Cache hot URL', from: 'API Server', to: 'Redis', detail: 'SET with TTL' },
                { step: 8, action: 'Return short URL', from: 'API Server', to: 'Client', detail: '{"short_url": "short.ly/abc123"}' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-dark-900 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">
                    {s.step}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{s.action}</div>
                    <div className="text-xs text-slate-500">{s.from} → {s.to}</div>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">{s.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Redirect Flow */}
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h4 className="text-sm font-bold text-blue-400 mb-4">Redirect (Read Path) - 100x more traffic</h4>
            <div className="space-y-3">
              {[
                { step: 1, action: 'GET /abc123', from: 'Client', to: 'Load Balancer', detail: 'User clicks short link' },
                { step: 2, action: 'Forward to server', from: 'Load Balancer', to: 'API Server', detail: 'Any available server' },
                { step: 3, action: 'Check cache FIRST', from: 'API Server', to: 'Redis', detail: 'GET abc123 (cache hit = fast!)' },
                { step: 4, action: 'Cache miss → DB', from: 'API Server', to: 'Database', detail: 'SELECT * WHERE short_code = abc123' },
                { step: 5, action: 'Log analytics async', from: 'API Server', to: 'Message Queue', detail: 'Fire-and-forget to Kafka/SQS' },
                { step: 6, action: '301/302 Redirect', from: 'API Server', to: 'Client', detail: 'Location: https://original-url.com' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-dark-900 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                    {s.step}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{s.action}</div>
                    <div className="text-xs text-slate-500">{s.from} → {s.to}</div>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">{s.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 301 vs 302 */}
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h4 className="text-sm font-bold text-white mb-4">301 vs 302 Redirect</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <div className="text-lg font-bold text-green-400 mb-2">301 Permanent</div>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Browser caches redirect</li>
                  <li>• Faster subsequent visits</li>
                  <li>• Harder to track clicks</li>
                  <li>• Better for SEO</li>
                </ul>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="text-lg font-bold text-blue-400 mb-2">302 Temporary</div>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• No browser caching</li>
                  <li>• Every click hits server</li>
                  <li>• Accurate analytics</li>
                  <li>• Can change destination</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scaling Tab */}
      {activeTab === 'scale' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h4 className="text-lg font-bold text-white mb-4">Scaling Strategies</h4>
            <div className="space-y-4">
              {scalingStrategies.map((s, i) => (
                <div key={i} className="bg-dark-900 p-4 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-white mb-1">{s.title}</div>
                      <div className="text-sm text-slate-400">{s.desc}</div>
                    </div>
                    <div className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded whitespace-nowrap">
                      {s.benefit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Collision Handling */}
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h4 className="text-sm font-bold text-yellow-400 mb-4 flex items-center gap-2">
              <AlertTriangle size={16} /> Collision Handling
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-dark-900 p-4 rounded-lg">
                <div className="font-bold text-white mb-2">Counter-based (No collisions)</div>
                <div className="text-sm text-slate-400">Each ID is unique by design. Use distributed counter with pre-allocated ranges.</div>
              </div>
              <div className="bg-dark-900 p-4 rounded-lg">
                <div className="font-bold text-white mb-2">Hash-based (Possible collisions)</div>
                <div className="text-sm text-slate-400">If collision: append random chars, retry, or use longer code. DB unique constraint catches.</div>
              </div>
            </div>
          </div>

          {/* Custom Aliases */}
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h4 className="text-sm font-bold text-purple-400 mb-4">Custom Alias Feature</h4>
            <div className="bg-dark-900 p-4 rounded-lg font-mono text-xs space-y-2">
              <div className="text-slate-400">// Before saving custom alias</div>
              <div className="text-white">1. Check if alias is taken (cache + DB lookup)</div>
              <div className="text-white">2. Validate format (alphanumeric, length limits)</div>
              <div className="text-white">3. Check against reserved words ("admin", "api", "login")</div>
              <div className="text-white">4. Use DB unique constraint as final guard</div>
            </div>
          </div>

          {/* Rate Limiting */}
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h4 className="text-sm font-bold text-red-400 mb-4">Abuse Prevention</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-dark-900 p-3 rounded-lg">
                <div className="font-bold text-white mb-1">Rate Limiting</div>
                <div className="text-slate-400">100 URLs/hour per IP, 1000/hour for registered users</div>
              </div>
              <div className="bg-dark-900 p-3 rounded-lg">
                <div className="font-bold text-white mb-1">URL Validation</div>
                <div className="text-slate-400">Blocklist malicious domains, check against Safe Browsing API</div>
              </div>
              <div className="bg-dark-900 p-3 rounded-lg">
                <div className="font-bold text-white mb-1">Spam Detection</div>
                <div className="text-slate-400">ML model for suspicious patterns, CAPTCHA for high-volume</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interview Tips */}
      <div className="bg-gradient-to-r from-brand-600/20 to-purple-600/20 p-6 rounded-xl border border-brand-500/30">
        <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <Lightbulb className="text-yellow-400" size={20} />
          Interview Tips
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="text-white font-medium">Key Discussion Points:</div>
            <ul className="text-slate-400 space-y-1">
              <li>• Why Base62 over MD5/SHA? (shorter, URL-safe)</li>
              <li>• How to handle 100B+ reads/day? (caching!)</li>
              <li>• Custom aliases vs auto-generated?</li>
              <li>• 301 vs 302 tradeoff for analytics</li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="text-white font-medium">Bonus Points:</div>
            <ul className="text-slate-400 space-y-1">
              <li>• Mention link expiration cleanup (cron job)</li>
              <li>• Discuss analytics pipeline (async)</li>
              <li>• Geographic distribution (multi-region)</li>
              <li>• A/B testing different destinations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLShortenerViz;
