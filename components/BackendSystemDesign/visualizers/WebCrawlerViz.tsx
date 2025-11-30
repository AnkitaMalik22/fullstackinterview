import React, { useState } from 'react';
import { 
  Search, Layers, Globe, FileText, Filter, Database, Network, 
  Shield, CheckCircle2, Gauge, Play, Link, Lightbulb 
} from 'lucide-react';

const WebCrawlerViz: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'design' | 'frontier' | 'flow' | 'scale'>('design');
  const [crawlSimulation, setCrawlSimulation] = useState<Array<{url: string; status: string; depth: number}>>([]);
  const [isCrawling, setIsCrawling] = useState(false);
  const [visitedCount, setVisitedCount] = useState(0);

  const sampleUrls = [
    { url: 'https://example.com', depth: 0 },
    { url: 'https://example.com/about', depth: 1 },
    { url: 'https://example.com/products', depth: 1 },
    { url: 'https://example.com/blog', depth: 1 },
    { url: 'https://example.com/products/item-1', depth: 2 },
    { url: 'https://example.com/products/item-2', depth: 2 },
    { url: 'https://example.com/blog/post-1', depth: 2 },
    { url: 'https://external-site.com', depth: 2 },
  ];

  const simulateCrawl = () => {
    setIsCrawling(true);
    setCrawlSimulation([]);
    setVisitedCount(0);
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < sampleUrls.length) {
        const current = sampleUrls[index];
        const status = current.url.includes('external') ? 'skipped' : 'crawled';
        setCrawlSimulation(prev => [...prev, { ...current, status }]);
        if (status === 'crawled') setVisitedCount(v => v + 1);
        index++;
      } else {
        clearInterval(interval);
        setIsCrawling(false);
      }
    }, 600);
  };

  const systemComponents = [
    { name: 'URL Frontier', icon: <Layers size={20} />, desc: 'Priority queue of URLs to crawl', color: 'blue' },
    { name: 'Fetcher', icon: <Globe size={20} />, desc: 'Downloads web pages (HTTP client)', color: 'green' },
    { name: 'Parser', icon: <FileText size={20} />, desc: 'Extracts links, content, metadata', color: 'purple' },
    { name: 'Duplicate Detector', icon: <Filter size={20} />, desc: 'Bloom filter for seen URLs', color: 'yellow' },
    { name: 'Content Store', icon: <Database size={20} />, desc: 'Stores crawled pages (S3/HDFS)', color: 'orange' },
    { name: 'DNS Resolver', icon: <Network size={20} />, desc: 'Cached DNS lookups', color: 'pink' },
  ];

  const politenessRules = [
    { rule: 'robots.txt', desc: 'Respect crawl rules and disallowed paths', example: 'User-agent: * Disallow: /private/' },
    { rule: 'Crawl Delay', desc: 'Wait between requests to same domain', example: '1-2 seconds between requests' },
    { rule: 'Rate Limiting', desc: 'Max requests per domain per minute', example: '60 req/min per domain' },
    { rule: 'Time-based', desc: 'Avoid peak hours for target sites', example: 'Crawl at night (target timezone)' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Search className="text-brand-400" size={24} />
          Web Crawler Architecture
        </h3>
        <div className="flex gap-2">
          {[
            { id: 'design', label: 'System Design' },
            { id: 'frontier', label: 'URL Frontier' },
            { id: 'flow', label: 'Crawl Flow' },
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
                <li>• Crawl billions of web pages</li>
                <li>• Extract and store page content</li>
                <li>• Discover new URLs from links</li>
                <li>• Re-crawl pages periodically (freshness)</li>
                <li>• Handle different content types</li>
              </ul>
            </div>
            <div className="bg-dark-800 p-5 rounded-xl border border-dark-700">
              <h4 className="text-sm font-bold text-blue-400 mb-3 flex items-center gap-2">
                <Gauge size={16} /> Non-Functional Requirements
              </h4>
              <ul className="text-sm text-slate-300 space-y-2">
                <li>• Scalability: 1B+ pages/day</li>
                <li>• Politeness: Don't overload servers</li>
                <li>• Robustness: Handle failures gracefully</li>
                <li>• Extensibility: Plugins for content types</li>
                <li>• Distributed: Run across data centers</li>
              </ul>
            </div>
          </div>

          {/* Back of Envelope */}
          <div className="bg-dark-800 p-5 rounded-xl border border-dark-700">
            <h4 className="text-sm font-bold text-yellow-400 mb-4 flex items-center gap-2">
              <FileText size={16} /> Back-of-Envelope Estimation
            </h4>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div className="bg-dark-900 p-3 rounded-lg">
                <div className="text-slate-500 text-xs">Pages/day</div>
                <div className="text-white font-bold">1 Billion</div>
              </div>
              <div className="bg-dark-900 p-3 rounded-lg">
                <div className="text-slate-500 text-xs">Pages/sec</div>
                <div className="text-white font-bold">1B / 86400 ≈ 11,500</div>
              </div>
              <div className="bg-dark-900 p-3 rounded-lg">
                <div className="text-slate-500 text-xs">Avg page size</div>
                <div className="text-white font-bold">500 KB</div>
              </div>
              <div className="bg-dark-900 p-3 rounded-lg">
                <div className="text-slate-500 text-xs">Storage/month</div>
                <div className="text-white font-bold">1B × 500KB × 30 ≈ 15 PB</div>
              </div>
            </div>
          </div>

          {/* System Components */}
          <div className="bg-dark-800 p-5 rounded-xl border border-dark-700">
            <h4 className="text-sm font-bold text-white mb-4">Core Components</h4>
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

          {/* Politeness */}
          <div className="bg-dark-800 p-5 rounded-xl border border-dark-700">
            <h4 className="text-sm font-bold text-red-400 mb-4 flex items-center gap-2">
              <Shield size={16} /> Politeness Policies (Critical!)
            </h4>
            <div className="space-y-3">
              {politenessRules.map((p, i) => (
                <div key={i} className="bg-dark-900 p-4 rounded-lg flex items-start gap-4">
                  <div className="w-24 shrink-0 font-bold text-white text-sm">{p.rule}</div>
                  <div className="flex-1 text-sm text-slate-400">{p.desc}</div>
                  <div className="text-xs font-mono text-slate-500 bg-dark-800 px-2 py-1 rounded">{p.example}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* URL Frontier Tab */}
      {activeTab === 'frontier' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h4 className="text-lg font-bold text-white mb-4">URL Frontier - The Heart of Crawler</h4>
            <p className="text-sm text-slate-400 mb-6">
              The URL Frontier is a priority queue that determines which URLs to crawl next. It balances <strong className="text-white">freshness</strong>, <strong className="text-white">importance</strong>, and <strong className="text-white">politeness</strong>.
            </p>

            {/* Frontier Architecture */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-dark-900 p-4 rounded-lg">
                <h5 className="font-bold text-blue-400 mb-3">Front Queues (Priority)</h5>
                <div className="space-y-2">
                  {['High Priority (news, trending)', 'Medium Priority (updated pages)', 'Low Priority (static pages)', 'Backlog (rarely changes)'].map((q, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-red-500' : i === 1 ? 'bg-yellow-500' : i === 2 ? 'bg-blue-500' : 'bg-slate-500'}`} />
                      <span className="text-sm text-slate-300">{q}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-dark-900 p-4 rounded-lg">
                <h5 className="font-bold text-green-400 mb-3">Back Queues (Per-Host)</h5>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>example.com</span>
                    <span className="text-green-400">→ queue_1</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>news.site</span>
                    <span className="text-green-400">→ queue_2</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>blog.org</span>
                    <span className="text-green-400">→ queue_3</span>
                  </div>
                  <div className="text-slate-500 mt-2">Each host has its own queue for politeness</div>
                </div>
              </div>
            </div>

            {/* Priority Calculation */}
            <div className="bg-dark-900 p-4 rounded-lg">
              <h5 className="font-bold text-purple-400 mb-3">Priority Score Calculation</h5>
              <div className="font-mono text-sm space-y-2">
                <div className="text-slate-300">priority = (freshness × 0.3) + (pagerank × 0.4) + (update_freq × 0.3)</div>
                <div className="text-slate-500 text-xs mt-2">
                  • <strong>Freshness:</strong> How recently was page last crawled?<br/>
                  • <strong>PageRank:</strong> How important is this page?<br/>
                  • <strong>Update Frequency:</strong> How often does content change?
                </div>
              </div>
            </div>
          </div>

          {/* Duplicate Detection */}
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h4 className="text-sm font-bold text-yellow-400 mb-4 flex items-center gap-2">
              <Filter size={16} /> Duplicate URL Detection
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-dark-900 p-4 rounded-lg">
                <h5 className="font-bold text-white mb-2">Bloom Filter</h5>
                <p className="text-sm text-slate-400 mb-2">Space-efficient probabilistic data structure</p>
                <ul className="text-xs text-slate-500 space-y-1">
                  <li>• O(1) lookup time</li>
                  <li>• ~10 bits per URL</li>
                  <li>• False positives OK (skip some URLs)</li>
                  <li>• No false negatives (never re-crawl)</li>
                </ul>
              </div>
              <div className="bg-dark-900 p-4 rounded-lg">
                <h5 className="font-bold text-white mb-2">URL Normalization</h5>
                <p className="text-sm text-slate-400 mb-2">Canonicalize before dedup check</p>
                <div className="font-mono text-xs text-slate-500 space-y-1">
                  <div>HTTP → HTTPS</div>
                  <div>Remove trailing slash</div>
                  <div>Lowercase domain</div>
                  <div>Sort query params</div>
                  <div>Remove tracking params (utm_*)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Crawl Flow Tab */}
      {activeTab === 'flow' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Interactive Simulation */}
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-white">Crawl Simulation</h4>
              <button
                onClick={simulateCrawl}
                disabled={isCrawling}
                className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-bold disabled:opacity-50 flex items-center gap-2"
              >
                {isCrawling ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Crawling...
                  </>
                ) : (
                  <>
                    <Play size={14} /> Start Crawl
                  </>
                )}
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-dark-900 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-white">{visitedCount}</div>
                <div className="text-xs text-slate-500">Pages Crawled</div>
              </div>
              <div className="bg-dark-900 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-white">{crawlSimulation.filter(c => c.status === 'skipped').length}</div>
                <div className="text-xs text-slate-500">Skipped (external)</div>
              </div>
              <div className="bg-dark-900 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-white">{sampleUrls.length - crawlSimulation.length}</div>
                <div className="text-xs text-slate-500">In Queue</div>
              </div>
            </div>

            <div className="bg-dark-900 p-4 rounded-lg max-h-64 overflow-y-auto space-y-2">
              {crawlSimulation.length === 0 ? (
                <div className="text-center text-slate-500 py-8">Click "Start Crawl" to simulate</div>
              ) : (
                crawlSimulation.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded bg-dark-800 animate-fadeIn">
                    <div className={`w-2 h-2 rounded-full ${item.status === 'crawled' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                    <span className="font-mono text-xs text-slate-400 flex-1 truncate">{item.url}</span>
                    <span className="text-xs text-slate-500">depth: {item.depth}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${item.status === 'crawled' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {item.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Crawl Pipeline */}
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h4 className="text-sm font-bold text-white mb-4">Crawl Pipeline Steps</h4>
            <div className="space-y-3">
              {[
                { step: 1, name: 'Pick URL', detail: 'Frontier selects highest priority URL from back queue', icon: <Layers size={16} /> },
                { step: 2, name: 'DNS Lookup', detail: 'Resolve hostname to IP (cached)', icon: <Network size={16} /> },
                { step: 3, name: 'Robots Check', detail: 'Verify URL is allowed by robots.txt', icon: <Shield size={16} /> },
                { step: 4, name: 'Fetch Page', detail: 'HTTP GET with timeout, retries, user-agent', icon: <Globe size={16} /> },
                { step: 5, name: 'Parse Content', detail: 'Extract text, links, metadata, images', icon: <FileText size={16} /> },
                { step: 6, name: 'Deduplicate', detail: 'Check content hash against seen pages', icon: <Filter size={16} /> },
                { step: 7, name: 'Store', detail: 'Save to content store (S3/HDFS)', icon: <Database size={16} /> },
                { step: 8, name: 'Extract URLs', detail: 'Add new URLs to frontier (if not seen)', icon: <Link size={16} /> },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-dark-900 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-sm font-bold">
                    {s.step}
                  </div>
                  <div className="text-brand-400">{s.icon}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{s.name}</div>
                    <div className="text-xs text-slate-500">{s.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Scaling Tab */}
      {activeTab === 'scale' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h4 className="text-lg font-bold text-white mb-4">Distributed Crawler Architecture</h4>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-dark-900 p-4 rounded-lg">
                <h5 className="font-bold text-blue-400 mb-3">Horizontal Scaling</h5>
                <ul className="text-sm text-slate-400 space-y-2">
                  <li>• <strong className="text-white">Multiple Fetchers:</strong> Each handles different domains</li>
                  <li>• <strong className="text-white">Partitioned Frontier:</strong> Shard by domain hash</li>
                  <li>• <strong className="text-white">Distributed Storage:</strong> HDFS or S3 for pages</li>
                  <li>• <strong className="text-white">Message Queues:</strong> Kafka for URL distribution</li>
                </ul>
              </div>
              <div className="bg-dark-900 p-4 rounded-lg">
                <h5 className="font-bold text-green-400 mb-3">Geographic Distribution</h5>
                <ul className="text-sm text-slate-400 space-y-2">
                  <li>• Crawl from region closest to target</li>
                  <li>• Reduce latency for fetches</li>
                  <li>• Comply with data residency laws</li>
                  <li>• Handle regional site variations</li>
                </ul>
              </div>
            </div>

            {/* Failure Handling */}
            <div className="bg-dark-900 p-4 rounded-lg">
              <h5 className="font-bold text-red-400 mb-3">Failure Handling</h5>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-bold text-white mb-1">Timeout</div>
                  <div className="text-slate-400">30s timeout, exponential backoff retry (3x)</div>
                </div>
                <div>
                  <div className="font-bold text-white mb-1">HTTP Errors</div>
                  <div className="text-slate-400">4xx: skip, 5xx: retry later, 3xx: follow redirects</div>
                </div>
                <div>
                  <div className="font-bold text-white mb-1">Spider Traps</div>
                  <div className="text-slate-400">Max depth limit, URL pattern detection</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Deduplication */}
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h4 className="text-sm font-bold text-purple-400 mb-4">Content Deduplication</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-dark-900 p-4 rounded-lg">
                <h5 className="font-bold text-white mb-2">Exact Duplicates</h5>
                <p className="text-sm text-slate-400">Hash entire page content (MD5/SHA256)</p>
                <div className="font-mono text-xs text-slate-500 mt-2">hash(content) → dedupe set</div>
              </div>
              <div className="bg-dark-900 p-4 rounded-lg">
                <h5 className="font-bold text-white mb-2">Near Duplicates</h5>
                <p className="text-sm text-slate-400">SimHash or MinHash for similar pages</p>
                <div className="font-mono text-xs text-slate-500 mt-2">Hamming distance &lt; 3 = duplicate</div>
              </div>
            </div>
          </div>

          {/* Recrawl Strategy */}
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h4 className="text-sm font-bold text-yellow-400 mb-4">Recrawl Strategies</h4>
            <div className="space-y-3">
              {[
                { name: 'Uniform', desc: 'Recrawl all pages at fixed interval', when: 'Simple, small crawls', interval: 'Every 7 days' },
                { name: 'Proportional', desc: 'Recrawl based on change frequency', when: 'News sites, blogs', interval: 'Hours to months' },
                { name: 'Adaptive', desc: 'ML model predicts next change time', when: 'Large-scale crawlers', interval: 'Dynamic' },
              ].map((s, i) => (
                <div key={i} className="bg-dark-900 p-4 rounded-lg grid md:grid-cols-4 gap-4">
                  <div className="font-bold text-white">{s.name}</div>
                  <div className="text-sm text-slate-400">{s.desc}</div>
                  <div className="text-xs text-slate-500">Best for: {s.when}</div>
                  <div className="text-xs font-mono text-brand-400">{s.interval}</div>
                </div>
              ))}
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
              <li>• Always mention politeness (robots.txt, rate limiting)</li>
              <li>• Bloom filter for URL deduplication</li>
              <li>• How to handle spider traps?</li>
              <li>• Prioritization: PageRank vs freshness</li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="text-white font-medium">Bonus Points:</div>
            <ul className="text-slate-400 space-y-1">
              <li>• Mention DNS caching importance</li>
              <li>• JavaScript rendering (headless browser)</li>
              <li>• Sitemap.xml parsing</li>
              <li>• Legal considerations (ToS, copyright)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebCrawlerViz;
