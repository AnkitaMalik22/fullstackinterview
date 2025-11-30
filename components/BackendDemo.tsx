import React, { useState, useEffect, useRef } from 'react';
import { Server, Database, Globe, Lock, Binary, Cpu, ArrowRight, Check, X, GitBranch, ShieldAlert, Key, RefreshCcw, Layers, Zap, Hash, BarChart2, MoveRight, Terminal, Clock, Shield, Network } from 'lucide-react';

// --- BLOG CONTENT COMPONENT ---
const BackendGuide = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => {
  const tabs = [
    { id: 'arch', label: 'Architecture', icon: <Server size={16} /> },
    { id: 'db', label: 'Databases', icon: <Database size={16} /> },
    { id: 'api', label: 'API Design', icon: <Globe size={16} /> },
    { id: 'security', label: 'Security', icon: <Lock size={16} /> },
    { id: 'dsa', label: 'DSA Masterclass', icon: <Binary size={16} /> },
  ];

  return (
    <div className="space-y-8 max-w-5xl animate-fadeIn pb-24">
      <div className="border-b border-dark-700 pb-6">
        <h2 className="text-3xl font-bold text-white mb-4">Backend & DSA Masterclass</h2>
        <div className="flex flex-wrap gap-3 text-sm text-slate-400">
          <span className="bg-brand-900/30 text-brand-300 px-2 py-1 rounded border border-brand-500/20">Scalability</span>
          <span className="bg-brand-900/30 text-brand-300 px-2 py-1 rounded border border-brand-500/20">Distributed Systems</span>
          <span className="bg-brand-900/30 text-brand-300 px-2 py-1 rounded border border-brand-500/20">Algorithms</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pb-4 border-b border-dark-800 overflow-x-auto scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap active:scale-95 ${
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
        {activeTab === 'arch' && (
          <div className="space-y-8 animate-fadeIn">
            <section>
              <h3 className="text-2xl font-bold text-white mb-6">System Design & Architecture</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-brand-500/30 transition-all hover:bg-dark-800/80">
                  <h4 className="font-bold text-white mb-3">Microservices vs Monolith</h4>
                  <p className="text-sm text-slate-400 mb-4">The #1 trade-off question. Do not default to microservices.</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2"><Check size={14} className="text-green-400 mt-1"/> <strong>Monolith:</strong> Simpler deployment, no network latency, easy debugging.</li>
                    <li className="flex gap-2"><Check size={14} className="text-brand-400 mt-1"/> <strong>Microservices:</strong> Independent scaling, tech diversity, organizational scale.</li>
                  </ul>
                </div>
                <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-brand-500/30 transition-all hover:bg-dark-800/80">
                  <h4 className="font-bold text-white mb-3">CAP Theorem</h4>
                  <p className="text-sm text-slate-400 mb-4">In a distributed system with a network partition (P), you must choose:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"/> <strong>Consistency (CP):</strong> All nodes see same data (e.g., Banking).</li>
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5"/> <strong>Availability (AP):</strong> System keeps running, data might be stale (e.g., Social Feed).</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'db' && (
           <div className="space-y-8 animate-fadeIn">
             <section>
               <h3 className="text-2xl font-bold text-white mb-6">Database Scaling</h3>
               <div className="grid md:grid-cols-2 gap-6">
                 <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-brand-500/30 transition-all hover:bg-dark-800/80">
                    <h4 className="font-bold text-white mb-2">Sharding (Horizontal Scaling)</h4>
                    <p className="text-sm text-slate-400">
                      Splitting a large dataset across multiple servers (shards) based on a Shard Key (e.g., User ID).
                      <br/><span className="text-brand-400">Pros:</span> Unlimited storage/throughput.
                      <br/><span className="text-red-400">Cons:</span> Complex joins, rebalancing is hard.
                    </p>
                 </div>
                 <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-brand-500/30 transition-all hover:bg-dark-800/80">
                    <h4 className="font-bold text-white mb-2">Replication (Read Scaling)</h4>
                    <p className="text-sm text-slate-400">
                      Master-Slave architecture. Writes go to Master, Reads go to Slaves.
                      <br/><span className="text-brand-400">Pros:</span> High availability for reads.
                      <br/><span className="text-red-400">Cons:</span> Replication lag (Eventual Consistency).
                    </p>
                 </div>
               </div>
             </section>
           </div>
        )}

        {activeTab === 'api' && (
           <div className="space-y-8 animate-fadeIn">
             <section>
               <h3 className="text-2xl font-bold text-white mb-6">API Paradigms</h3>
               <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-brand-500/30 transition-all hover:bg-dark-800/80">
                  <h4 className="font-bold text-white mb-3">REST vs GraphQL</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-300">
                      <thead>
                        <tr className="border-b border-dark-600 text-slate-500">
                          <th className="py-2">Feature</th>
                          <th className="py-2">REST</th>
                          <th className="py-2">GraphQL</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-dark-700">
                          <td className="py-2 font-semibold">Data Fetching</td>
                          <td className="py-2 text-red-400">Over/Under-fetching</td>
                          <td className="py-2 text-green-400">Exact data requested</td>
                        </tr>
                         <tr className="border-b border-dark-700">
                          <td className="py-2 font-semibold">Round Trips</td>
                          <td className="py-2 text-red-400">Multiple for nested data</td>
                          <td className="py-2 text-green-400">Single request</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-semibold">Caching</td>
                          <td className="py-2 text-green-400">Easy (HTTP caching)</td>
                          <td className="py-2 text-red-400">Hard (Application level)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
               </div>
             </section>
           </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-8 animate-fadeIn">
            <section>
              <h3 className="text-2xl font-bold text-white mb-6">Backend Security Essentials</h3>
              <div className="space-y-6">
                <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 border-l-4 border-l-red-500 hover:bg-dark-800/80 transition-all">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <ShieldAlert size={18} className="text-red-400"/> SQL Injection
                  </h4>
                  <p className="text-sm text-slate-400 mb-2">Never concatenate strings in queries. Always use parameterized queries.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="bg-dark-950 p-2 rounded border border-red-900/50">
                      <p className="text-xs text-red-400 font-mono break-all">"SELECT * FROM users WHERE id = " + input</p>
                    </div>
                    <div className="bg-dark-950 p-2 rounded border border-green-900/50">
                      <p className="text-xs text-green-400 font-mono break-all">db.query("SELECT * FROM users WHERE id = $1", [input])</p>
                    </div>
                  </div>
                </div>

                <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-brand-500/30 transition-all hover:bg-dark-800/80">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <Clock size={18} className="text-brand-400"/> Rate Limiting
                  </h4>
                  <p className="text-sm text-slate-400">
                    Protect your API from abuse and DDoS using algorithms like <strong>Token Bucket</strong> or <strong>Leaky Bucket</strong>.
                    Store counters in Redis for distributed counting.
                  </p>
                </div>

                <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-brand-500/30 transition-all hover:bg-dark-800/80">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <Hash size={18} className="text-purple-400"/> Hashing & Salting
                  </h4>
                  <p className="text-sm text-slate-400">
                    Never store plain text passwords. Use <strong>bcrypt</strong> or <strong>Argon2</strong>.
                    Salting adds random data to each password to prevent Rainbow Table attacks.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'dsa' && (
          <div className="space-y-12 animate-fadeIn">
            <section>
              <div className="flex items-center gap-2 mb-6">
                 <Binary className="text-brand-400" size={28} />
                 <h3 className="text-2xl font-bold text-white">DSA Roadmap 2025</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-brand-500/30 transition-all hover:bg-dark-800/80">
                   <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                     <Zap size={18} className="text-yellow-400" /> MUST KNOW (80% of Interviews)
                   </h4>
                   <ul className="space-y-3 text-sm text-slate-300">
                     <li className="flex items-start gap-2">
                       <span className="bg-dark-700 text-slate-200 px-1.5 py-0.5 rounded text-xs font-mono mt-0.5">Arrays</span>
                       <span>Two Pointers, Sliding Window, Prefix Sum</span>
                     </li>
                     <li className="flex items-start gap-2">
                       <span className="bg-dark-700 text-slate-200 px-1.5 py-0.5 rounded text-xs font-mono mt-0.5">Hash Maps</span>
                       <span>O(1) Lookups, Frequency Counting</span>
                     </li>
                     <li className="flex items-start gap-2">
                       <span className="bg-dark-700 text-slate-200 px-1.5 py-0.5 rounded text-xs font-mono mt-0.5">Trees</span>
                       <span>BFS, DFS, Validate BST, Max Depth</span>
                     </li>
                     <li className="flex items-start gap-2">
                       <span className="bg-dark-700 text-slate-200 px-1.5 py-0.5 rounded text-xs font-mono mt-0.5">Linked Lists</span>
                       <span>Cycle Detection (Tortoise/Hare), Reversal</span>
                     </li>
                   </ul>
                </div>

                <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-brand-500/30 transition-all hover:bg-dark-800/80">
                   <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                     <Layers size={18} className="text-brand-400" /> Pattern Recognition
                   </h4>
                   <div className="space-y-3 text-sm">
                     <div>
                       <div className="text-brand-300 font-semibold">Sorted Array?</div>
                       <div className="text-slate-400">→ Binary Search or Two Pointers</div>
                     </div>
                     <div>
                       <div className="text-brand-300 font-semibold">Subarray / Substring?</div>
                       <div className="text-slate-400">→ Sliding Window</div>
                     </div>
                     <div>
                       <div className="text-brand-300 font-semibold">Optimization / Counting?</div>
                       <div className="text-slate-400">→ Dynamic Programming</div>
                     </div>
                     <div>
                       <div className="text-brand-300 font-semibold">Cycle Detection?</div>
                       <div className="text-slate-400">→ Fast & Slow Pointers</div>
                     </div>
                   </div>
                </div>
              </div>

              <h4 className="text-xl font-bold text-white mb-6">Top 20 Problems (Start Here)</h4>
              <div className="grid md:grid-cols-3 gap-4">
                 <div className="space-y-2">
                   <div className="text-xs font-bold text-green-400 uppercase tracking-wider">Easy / Foundation</div>
                   <ul className="text-sm text-slate-400 space-y-1">
                     <li>1. Two Sum</li>
                     <li>2. Valid Parentheses</li>
                     <li>3. Linked List Cycle</li>
                     <li>4. Best Time to Buy Stock</li>
                     <li>5. Climbing Stairs (DP)</li>
                   </ul>
                 </div>
                 <div className="space-y-2">
                   <div className="text-xs font-bold text-yellow-400 uppercase tracking-wider">Medium / Core</div>
                   <ul className="text-sm text-slate-400 space-y-1">
                     <li>6. Longest Substring no Repeat</li>
                     <li>7. 3Sum</li>
                     <li>8. Number of Islands</li>
                     <li>9. Level Order Traversal</li>
                     <li>10. Coin Change (DP)</li>
                   </ul>
                 </div>
                 <div className="space-y-2">
                   <div className="text-xs font-bold text-red-400 uppercase tracking-wider">Hard / Advanced</div>
                   <ul className="text-sm text-slate-400 space-y-1">
                     <li>11. Merge K Sorted Lists</li>
                     <li>12. Trapping Rain Water</li>
                     <li>13. Median of Two Sorted Arrays</li>
                     <li>14. Word Ladder</li>
                   </ul>
                 </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

// --- VISUALIZERS ---

const LoadBalancerViz = () => {
  const [algorithm, setAlgorithm] = useState<'round-robin' | 'ip-hash'>('round-robin');
  const [servers, setServers] = useState([
    { id: 1, requests: 0, healthy: true },
    { id: 2, requests: 0, healthy: true },
    { id: 3, requests: 0, healthy: true },
  ]);
  const [requests, setRequests] = useState<{id: number, serverId: number | null, ip: string}[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const simulateRequest = () => {
    const ip = `192.168.1.${Math.floor(Math.random() * 255)}`;
    let targetServerIndex = 0;

    if (algorithm === 'round-robin') {
      targetServerIndex = currentIndex % servers.length;
      setCurrentIndex(prev => prev + 1);
    } else {
      // Simple IP Hash
      const hash = ip.split('.').reduce((acc, part) => acc + parseInt(part), 0);
      targetServerIndex = hash % servers.length;
    }

    const targetServer = servers[targetServerIndex];

    setServers(prev => prev.map((s, i) => 
      i === targetServerIndex ? { ...s, requests: s.requests + 1 } : s
    ));

    const reqId = Date.now();
    setRequests(prev => [...prev.slice(-4), { id: reqId, serverId: targetServer.id, ip }]);
  };

  return (
    <div className="bg-dark-800 p-4 md:p-8 rounded-xl border border-dark-700">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Load Balancer Logic</h2>
          <p className="text-sm text-slate-400">Visualizing traffic distribution strategies.</p>
        </div>
        <div className="flex bg-dark-900 rounded-lg p-1 border border-dark-600">
          <button onClick={() => setAlgorithm('round-robin')} className={`px-4 py-2 rounded text-sm transition-all ${algorithm === 'round-robin' ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}>Round Robin</button>
          <button onClick={() => setAlgorithm('ip-hash')} className={`px-4 py-2 rounded text-sm transition-all ${algorithm === 'ip-hash' ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}>IP Hash</button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8">
        <button 
          onClick={simulateRequest}
          className="bg-white text-dark-900 px-6 py-3 rounded-full font-bold hover:bg-slate-200 transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-white/10 hover:shadow-white/20"
        >
          <Globe size={18} /> Send Request
        </button>

        <div className="h-16 w-full flex justify-center items-center gap-4 flex-wrap">
          {requests.map(req => (
            <div key={req.id} className="animate-bounce bg-brand-500 text-white text-xs px-2 py-1 rounded-full shadow-lg">
              REQ from {algorithm === 'ip-hash' ? req.ip : 'Client'}
            </div>
          ))}
        </div>

        <div className="w-full h-2 bg-dark-600 rounded relative">
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-900 border border-brand-500 px-4 py-1 text-xs text-brand-300 rounded whitespace-nowrap shadow-lg">
             LB ({algorithm})
           </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 w-full">
          {servers.map(s => (
            <div key={s.id} className="flex flex-col items-center gap-2 transition-all duration-300 transform">
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-xl border-2 flex flex-col items-center justify-center gap-2 bg-dark-900 transition-all duration-300
                ${s.requests > 0 ? 'border-brand-500 shadow-[0_0_15px_rgba(14,165,233,0.3)] scale-105' : 'border-dark-600'}
              `}>
                <Server size={24} className={s.requests > 0 ? 'text-brand-400' : 'text-slate-600'} />
                <span className="text-xl md:text-2xl font-bold text-white">{s.requests}</span>
              </div>
              <span className="text-xs text-slate-500">Server {s.id}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- SHARDING VIZ ---
const ShardingViz = () => {
  const [users, setUsers] = useState<{id: number, name: string}[]>([]);
  const [newName, setNewName] = useState('');
  
  // Shard logic: Even IDs -> Shard A, Odd IDs -> Shard B
  const shardA = users.filter(u => u.id % 2 === 0);
  const shardB = users.filter(u => u.id % 2 !== 0);

  const addUser = () => {
    if (!newName) return;
    const newUser = { id: Math.floor(Math.random() * 1000), name: newName };
    setUsers(prev => [...prev, newUser]);
    setNewName('');
  };

  return (
    <div className="bg-dark-800 p-8 rounded-xl border border-dark-700">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Database Sharding</h2>
          <p className="text-sm text-slate-400">Horizontal Scaling Strategy (Partition by ID)</p>
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <input 
          type="text" 
          value={newName} 
          onChange={e => setNewName(e.target.value)}
          placeholder="Enter user name"
          className="bg-dark-900 border border-dark-600 rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-brand-500 transition-shadow"
        />
        <button 
          onClick={addUser}
          className="bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-slate-200 transition-transform active:scale-95 shadow"
        >
          Add User
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8 relative">
        {/* Router visual */}
        <div className="absolute left-1/2 -top-4 -translate-x-1/2 bg-brand-900 text-brand-300 text-xs px-3 py-1 rounded-full border border-brand-500 z-10 shadow-lg">
          Shard Key: User ID % 2
        </div>

        <div className="border-2 border-dashed border-dark-600 rounded-xl p-4 bg-dark-900/50 transition-colors hover:border-blue-500/30">
          <div className="flex items-center gap-2 mb-4 text-blue-400 font-bold">
            <Database size={18} /> Shard A (Even IDs)
          </div>
          <div className="space-y-2">
            {shardA.map(u => (
              <div key={u.id} className="bg-dark-800 p-2 rounded flex justify-between text-xs animate-slideIn border border-dark-700">
                <span className="text-slate-300">{u.name}</span>
                <span className="font-mono text-slate-500">ID:{u.id}</span>
              </div>
            ))}
            {shardA.length === 0 && <span className="text-slate-600 text-xs italic">Empty</span>}
          </div>
        </div>

        <div className="border-2 border-dashed border-dark-600 rounded-xl p-4 bg-dark-900/50 transition-colors hover:border-purple-500/30">
          <div className="flex items-center gap-2 mb-4 text-purple-400 font-bold">
             <Database size={18} /> Shard B (Odd IDs)
          </div>
          <div className="space-y-2">
            {shardB.map(u => (
              <div key={u.id} className="bg-dark-800 p-2 rounded flex justify-between text-xs animate-slideIn border border-dark-700">
                <span className="text-slate-300">{u.name}</span>
                <span className="font-mono text-slate-500">ID:{u.id}</span>
              </div>
            ))}
             {shardB.length === 0 && <span className="text-slate-600 text-xs italic">Empty</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- API DESIGN VIZ ---
const ApiDesignViz = () => {
  const [mode, setMode] = useState<'REST' | 'GraphQL'>('REST');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const fetchData = () => {
    setLoading(true);
    setData(null);
    
    // Simulate network delay
    setTimeout(() => {
      setLoading(false);
      setData({
        user: "Alice",
        posts: [{ title: "Hello World" }, { title: "React Rocks" }],
        followers: 1200 // Only used in GQL if requested, but for viz we show payload diff
      });
    }, 1500);
  };

  return (
    <div className="bg-dark-800 p-8 rounded-xl border border-dark-700">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">REST vs GraphQL</h2>
          <p className="text-sm text-slate-400">Visualizing Over-fetching vs Precise Fetching</p>
        </div>
        <div className="flex bg-dark-900 rounded-lg p-1 border border-dark-600">
          <button onClick={() => setMode('REST')} className={`px-4 py-2 rounded text-sm transition-all ${mode === 'REST' ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}>REST</button>
          <button onClick={() => setMode('GraphQL')} className={`px-4 py-2 rounded text-sm transition-all ${mode === 'GraphQL' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}>GraphQL</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="bg-dark-950 p-4 rounded-lg border border-dark-600 font-mono text-xs shadow-inner">
            <div className="text-slate-500 mb-2">// Request</div>
            {mode === 'REST' ? (
              <div className="space-y-1">
                <div className="text-green-400">GET /users/1</div>
                <div className="text-green-400">GET /users/1/posts</div>
                <div className="text-slate-500 italic mt-2 text-[10px]">* REST often requires multiple round-trips or specialized endpoints to get nested data.</div>
              </div>
            ) : (
              <div className="text-purple-400">
                query {'{'} <br/>
                &nbsp;&nbsp;user(id: 1) {'{'}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;name<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;posts {'{'} title {'}'}<br/>
                &nbsp;&nbsp;{'}'}<br/>
                {'}'}
              </div>
            )}
          </div>
          
          <button 
            onClick={fetchData} 
            disabled={loading}
            className="w-full py-2 bg-white text-black font-bold rounded hover:bg-slate-200 disabled:opacity-50 transition-transform active:scale-95 shadow"
          >
            {loading ? 'Fetching...' : 'Simulate Request'}
          </button>
        </div>

        <div className="relative">
           <div className="bg-dark-950 p-4 rounded-lg border border-dark-600 font-mono text-xs h-full min-h-[150px] shadow-inner transition-colors">
             <div className="text-slate-500 mb-2">// Response Payload</div>
             {data ? (
               <div className="animate-fadeIn">
                 {'{'}<br/>
                 &nbsp;&nbsp;"user": "Alice",<br/>
                 &nbsp;&nbsp;"posts": [...],<br/>
                 <span className={mode === 'REST' ? "text-red-400 bg-red-900/20 px-1" : "hidden"}>
                   &nbsp;&nbsp;"followers": 1200, <span className="text-slate-500">// Unused data (Over-fetching)</span><br/>
                 </span>
                 <span className={mode === 'REST' ? "text-red-400 bg-red-900/20 px-1" : "hidden"}>
                   &nbsp;&nbsp;"settings": {'{...}'}, <span className="text-slate-500">// Unused data</span><br/>
                 </span>
                 {'}'}
               </div>
             ) : (
               <div className="flex items-center justify-center h-20 text-slate-600">
                 {loading ? <RefreshCcw className="animate-spin"/> : 'Waiting...'}
               </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};

// --- SQL INJECTION VIZ ---
const SqlInjectionViz = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'vulnerable' | 'secure'>('vulnerable');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any[] | null>(null);

  // Mock DB
  const users = [
    { id: 1, name: "admin", role: "admin", secret: "super_secret_key" },
    { id: 2, name: "alice", role: "user", secret: "alice_notes" },
    { id: 3, name: "bob", role: "user", secret: "bob_photos" },
  ];

  useEffect(() => {
    if (mode === 'vulnerable') {
      setQuery(`SELECT * FROM users WHERE id = '${input}'`);
      
      // Vulnerable Logic Simulation
      if (input.includes("' OR '1'='1")) {
        setResult(users);
      } else {
        const id = parseInt(input);
        const user = users.find(u => u.id === id);
        setResult(user ? [user] : []);
      }
    } else {
      setQuery(`SELECT * FROM users WHERE id = $1`);
      // Secure Logic
      const id = parseInt(input);
      const user = users.find(u => u.id === id);
      setResult(user ? [user] : []);
    }
  }, [input, mode]);

  return (
    <div className="bg-dark-800 p-8 rounded-xl border border-dark-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Terminal size={20} className={mode === 'vulnerable' ? "text-red-400" : "text-green-400"} />
          SQL Injection Lab
        </h2>
        <div className="flex bg-dark-900 rounded-lg p-1 border border-dark-600">
          <button onClick={() => setMode('vulnerable')} className={`px-4 py-2 rounded text-sm transition-all ${mode === 'vulnerable' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}>Vulnerable</button>
          <button onClick={() => setMode('secure')} className={`px-4 py-2 rounded text-sm transition-all ${mode === 'secure' ? 'bg-green-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}>Secure (Parameterized)</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">User ID Input</label>
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Try: 1' OR '1'='1"
              className="w-full bg-dark-900 border border-dark-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono transition-shadow"
            />
          </div>
          
          <div className="bg-dark-950 p-4 rounded-lg border border-dark-600 shadow-inner">
            <div className="text-xs text-slate-500 uppercase mb-2">Executed Query</div>
            <code className={`font-mono text-sm break-all ${mode === 'vulnerable' ? 'text-red-300' : 'text-green-300'}`}>
              {mode === 'vulnerable' 
                ? `SELECT * FROM users WHERE id = '${input}'`
                : `db.query('SELECT * FROM users WHERE id = $1', ['${input}'])`
              }
            </code>
          </div>

          {mode === 'vulnerable' && (
            <div className="text-xs text-slate-500 p-2 bg-red-900/10 border border-red-900/30 rounded">
              Tip: Type <code className="text-white">1' OR '1'='1</code> to dump the whole database.
            </div>
          )}
        </div>

        <div className="border border-dark-700 rounded-lg overflow-hidden flex flex-col">
          <div className="bg-dark-900 px-4 py-2 border-b border-dark-700 text-xs font-bold text-slate-400">Database Result</div>
          <div className="p-0 overflow-auto bg-dark-800 flex-1 h-48">
             <table className="w-full text-left text-sm text-slate-300">
               <thead className="bg-dark-900 text-slate-500">
                 <tr>
                   <th className="px-4 py-2">ID</th>
                   <th className="px-4 py-2">Name</th>
                   <th className="px-4 py-2">Secret</th>
                 </tr>
               </thead>
               <tbody>
                 {result && result.length > 0 ? result.map(u => (
                   <tr key={u.id} className="border-b border-dark-700 last:border-0 hover:bg-dark-700/50">
                     <td className="px-4 py-2">{u.id}</td>
                     <td className="px-4 py-2">{u.name}</td>
                     <td className="px-4 py-2 font-mono text-xs text-yellow-400">{u.secret}</td>
                   </tr>
                 )) : (
                   <tr>
                     <td colSpan={3} className="px-4 py-8 text-center text-slate-500 italic">No results</td>
                   </tr>
                 )}
               </tbody>
             </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- PASSWORD HASHING VIZ ---
const PasswordHashViz = () => {
  const [password, setPassword] = useState('password123');
  const [salt, setSalt] = useState('');
  const [hash, setHash] = useState('');
  const [isHashing, setIsHashing] = useState(false);

  // Simple numeric hash function for simulation
  const simpleHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
  };

  const generate = () => {
    setIsHashing(true);
    const newSalt = Math.random().toString(36).substring(2, 10);
    setSalt(newSalt);
    
    setTimeout(() => {
      setHash(simpleHash(password + newSalt));
      setIsHashing(false);
    }, 500);
  };

  return (
    <div className="bg-dark-800 p-8 rounded-xl border border-dark-700">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Hash size={20} className="text-purple-400" /> Password Hashing & Salting
      </h2>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">User Password</label>
            <input 
              type="text" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-dark-900 border border-dark-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
            />
          </div>

          <button 
            onClick={generate}
            disabled={!password || isHashing}
            className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-brand-900/20"
          >
            {isHashing ? <RefreshCcw className="animate-spin" size={18}/> : <Key size={18}/>}
            Generate Secure Hash
          </button>
        </div>

        <div className="space-y-4">
           <div className="relative p-4 bg-dark-950 rounded-lg border border-dark-600 shadow-inner">
             <div className="text-xs text-slate-500 uppercase mb-1">Generated Salt</div>
             <div className="font-mono text-brand-400 text-lg">{salt || '...'}</div>
             <div className="absolute right-4 top-4 text-[10px] text-slate-600">Random Bytes</div>
           </div>

           <div className="flex justify-center text-slate-500">
             <ArrowRight className="rotate-90 md:rotate-0" />
           </div>

           <div className="relative p-4 bg-dark-950 rounded-lg border border-dark-600 shadow-inner">
             <div className="text-xs text-slate-500 uppercase mb-1">Final Hash (Stored in DB)</div>
             <div className="font-mono text-green-400 text-lg break-all">
               {hash ? `$2b$10$${salt}...${hash}` : '...'}
             </div>
             <div className="absolute right-4 top-4 text-[10px] text-slate-600">Bcrypt Format</div>
           </div>

           <div className="text-xs text-slate-500 mt-2">
             <strong>Why Salt?</strong> Even if two users have the same password ("password123"), their stored hashes will be completely different because the random salt is different. This prevents Rainbow Table attacks.
           </div>
        </div>
      </div>
    </div>
  );
};

// --- RATE LIMIT VIZ ---
const RateLimitViz = () => {
  const [tokens, setTokens] = useState(5);
  const maxTokens = 10;
  const [requests, setRequests] = useState<{id: number, status: 'ok' | 'blocked'}[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTokens(t => Math.min(t + 1, maxTokens));
    }, 1000); // Refill 1 token per second
    return () => clearInterval(interval);
  }, []);

  const sendRequest = () => {
    const id = Date.now();
    if (tokens > 0) {
      setTokens(t => t - 1);
      setRequests(prev => [...prev.slice(-4), { id, status: 'ok' }]);
    } else {
      setRequests(prev => [...prev.slice(-4), { id, status: 'blocked' }]);
    }
  };

  return (
    <div className="bg-dark-800 p-8 rounded-xl border border-dark-700">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Clock className="text-brand-400" /> Token Bucket Algorithm
      </h2>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-48 border-4 border-slate-500 border-t-0 rounded-b-xl bg-dark-900/50 flex flex-col justify-end overflow-hidden mb-4 shadow-inner">
            <div 
              className="bg-brand-500 transition-all duration-300 w-full"
              style={{ height: `${(tokens / maxTokens) * 100}%` }}
            >
              <div className="w-full h-full bg-brand-400 opacity-20 animate-pulse"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-white drop-shadow-md">
              {tokens}
            </div>
          </div>
          <p className="text-xs text-slate-400 text-center">Refills 1 token/sec</p>
        </div>

        <div className="flex flex-col gap-6">
          <button 
            onClick={sendRequest}
            className="w-full py-3 bg-white text-dark-900 rounded-lg font-bold hover:bg-slate-200 transition-transform active:scale-95 shadow-lg shadow-white/10"
          >
            Send API Request
          </button>

          <div className="space-y-2">
            {requests.map(req => (
              <div key={req.id} className={`p-3 rounded-lg flex items-center justify-between text-sm font-medium animate-slideIn ${req.status === 'ok' ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-red-900/30 text-red-400 border border-red-500/30'}`}>
                <span>Request #{req.id.toString().slice(-4)}</span>
                {req.status === 'ok' ? <Check size={16}/> : <ShieldAlert size={16}/>}
              </div>
            ))}
            {requests.length === 0 && <div className="text-center text-slate-600 text-sm italic">No requests yet</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- LINKED LIST VIZ (CYCLE DETECTION) ---
const LinkedListViz = () => {
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState("Ready to start Floyd's Cycle Finding Algorithm");
  
  // Nodes 0-5. 5 points back to 2.
  // Slow (S) moves 1, Fast (F) moves 2.
  const nodes = [0, 1, 2, 3, 4, 5];
  const nextPointer = { 0:1, 1:2, 2:3, 3:4, 4:5, 5:2 }; // 5 loops to 2
  
  const [slow, setSlow] = useState(0);
  const [fast, setFast] = useState(0);
  const [detected, setDetected] = useState(false);

  const reset = () => {
    setSlow(0);
    setFast(0);
    setDetected(false);
    setMessage("Ready");
    setIsRunning(false);
  };

  const nextStep = () => {
    if (detected) return;

    const nextSlow = nextPointer[slow as keyof typeof nextPointer];
    const nextFast = nextPointer[nextPointer[fast as keyof typeof nextPointer] as keyof typeof nextPointer];

    setSlow(nextSlow);
    setFast(nextFast);

    if (nextSlow === nextFast) {
      setDetected(true);
      setMessage(`Collision detected at Node ${nextSlow}! Cycle found.`);
      setIsRunning(false);
    } else {
      setMessage(`Slow moves to ${nextSlow}, Fast moves to ${nextFast}.`);
    }
  };

  useEffect(() => {
    let interval: any;
    if (isRunning && !detected) {
      interval = setInterval(nextStep, 1500);
    }
    return () => clearInterval(interval);
  }, [isRunning, slow, fast, detected]);

  return (
    <div className="bg-dark-800 p-8 rounded-xl border border-dark-700">
      <div className="flex justify-between items-center mb-8">
         <h2 className="text-xl font-bold text-white flex items-center gap-2">
           <Repeat className="text-brand-400" /> Linked List Cycle
         </h2>
         <div className="flex gap-2">
           <button onClick={reset} className="px-4 py-2 bg-dark-700 rounded-lg text-sm text-slate-300 hover:bg-dark-600 transition-colors">Reset</button>
           <button onClick={() => setIsRunning(!isRunning)} className="px-4 py-2 bg-brand-600 rounded-lg text-sm text-white font-bold hover:bg-brand-500 transition-all active:scale-95 shadow-lg">
             {isRunning ? 'Pause' : 'Start'}
           </button>
         </div>
      </div>

      <div className="relative h-40 bg-dark-950 rounded-xl border border-dark-600 flex items-center justify-center p-8 overflow-hidden">
        {nodes.map((n, i) => (
          <div key={n} className="relative flex items-center">
             <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold z-10 bg-dark-800 transition-all duration-500 transform
               ${(slow === n || fast === n) ? 'border-white scale-110 shadow-lg' : 'border-dark-600 text-slate-500'}
               ${detected && slow === n ? 'bg-green-600 border-green-400 text-white shadow-[0_0_20px_rgba(34,197,94,0.6)] scale-125' : ''}
             `}>
               {n}
               {slow === n && <div className="absolute -top-6 text-xs text-brand-400 font-bold animate-bounce">SLOW</div>}
               {fast === n && <div className="absolute -bottom-6 text-xs text-purple-400 font-bold animate-bounce">FAST</div>}
             </div>
             
             {/* Arrow */}
             {i < nodes.length - 1 && (
               <div className="w-12 h-0.5 bg-dark-600 mx-2 relative">
                 <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-dark-600 transform rotate-45"></div>
               </div>
             )}
          </div>
        ))}
        {/* Cycle Line */}
        <div className="absolute w-[45%] h-24 border-b-2 border-l-2 border-r-2 border-dark-600 rounded-b-3xl -bottom-4 left-[35%] pointer-events-none"></div>
      </div>

      <div className="mt-6 text-center font-mono text-sm text-brand-200 bg-brand-900/20 p-3 rounded border border-brand-500/20">
        {message}
      </div>
    </div>
  );
};

// --- GRAPH TRAVERSAL VISUALIZER (BFS/DFS) ---
const GraphViz = () => {
  const [mode, setMode] = useState<'BFS' | 'DFS'>('BFS');
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [visited, setVisited] = useState<Set<number>>(new Set());
  const [queue, setQueue] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  // Simple graph adjacency list
  // 0 -> 1, 2
  // 1 -> 3, 4
  // 2 -> 5
  // 3,4,5 are leaves
  const adjList: Record<number, number[]> = {
    0: [1, 2],
    1: [3, 4],
    2: [5],
    3: [], 4: [], 5: []
  };

  const positions = {
    0: { x: 50, y: 10 },
    1: { x: 30, y: 40 },
    2: { x: 70, y: 40 },
    3: { x: 20, y: 80 },
    4: { x: 40, y: 80 },
    5: { x: 80, y: 80 },
  };

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const runTraversal = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setVisited(new Set());
    setQueue([]);
    setLogs([]);
    setActiveNode(null);

    const seen = new Set<number>();
    
    if (mode === 'BFS') {
       const workQueue = [0];
       setQueue([...workQueue]);
       seen.add(0);
       setLogs(l => [...l, `Starting BFS from Node 0`]);

       while (workQueue.length > 0) {
         await delay(800);
         const current = workQueue.shift()!;
         setActiveNode(current);
         setQueue([...workQueue]);
         setVisited(prev => new Set(prev).add(current));
         setLogs(l => [...l, `Visited Node ${current}`]);

         const neighbors = adjList[current] || [];
         for (const neighbor of neighbors) {
           if (!seen.has(neighbor)) {
             seen.add(neighbor);
             workQueue.push(neighbor);
             setQueue([...workQueue]);
             setLogs(l => [...l, `Queued neighbor ${neighbor}`]);
           }
         }
       }
    } else {
       // DFS (Iterative)
       const workStack = [0];
       setQueue([...workStack]); 
       // Note: Visualizing stack in the same "queue" UI for simplicity, labeled "Stack"
       setLogs(l => [...l, `Starting DFS from Node 0`]);

       while (workStack.length > 0) {
         await delay(800);
         const current = workStack.pop()!;
         
         if (!seen.has(current)) {
           setActiveNode(current);
           setQueue([...workStack]); // Update UI stack
           seen.add(current);
           setVisited(prev => new Set(prev).add(current));
           setLogs(l => [...l, `Visited Node ${current}`]);

           const neighbors = adjList[current] || [];
           // Reverse for stack to process left-to-right (optional, mostly for visual clarity)
           for (let i = neighbors.length - 1; i >= 0; i--) {
             const neighbor = neighbors[i];
             if (!seen.has(neighbor)) {
                workStack.push(neighbor);
                setQueue([...workStack]);
                setLogs(l => [...l, `Pushed neighbor ${neighbor}`]);
             }
           }
         }
       }
    }

    await delay(500);
    setActiveNode(null);
    setIsRunning(false);
    setLogs(l => [...l, `Traversal Complete`]);
  };

  return (
    <div className="bg-dark-800 p-4 md:p-8 rounded-xl border border-dark-700">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
           <h2 className="text-xl font-bold text-white">Graph Traversal</h2>
           <p className="text-sm text-slate-400">Visualizing {mode} order.</p>
        </div>
        <div className="flex bg-dark-900 rounded-lg p-1 border border-dark-600">
          <button onClick={() => !isRunning && setMode('BFS')} className={`px-4 py-2 rounded text-sm transition-all ${mode === 'BFS' ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}>BFS (Queue)</button>
          <button onClick={() => !isRunning && setMode('DFS')} className={`px-4 py-2 rounded text-sm transition-all ${mode === 'DFS' ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}>DFS (Stack)</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 relative h-[300px] border border-dark-700 bg-dark-950 rounded-xl overflow-hidden shadow-inner">
           {/* Edges */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none">
             {[0,1,2].map(parent => (
               adjList[parent].map(child => (
                 <line 
                   key={`${parent}-${child}`}
                   x1={`${positions[parent as keyof typeof positions].x}%`} 
                   y1={`${positions[parent as keyof typeof positions].y + 5}%`}
                   x2={`${positions[child as keyof typeof positions].x}%`} 
                   y2={`${positions[child as keyof typeof positions].y - 5}%`}
                   stroke="#334155" 
                   strokeWidth="2"
                 />
               ))
             ))}
           </svg>

           {/* Nodes */}
           {Object.keys(positions).map(key => {
             const id = Number(key);
             const pos = positions[id as keyof typeof positions];
             let stateClass = "bg-dark-800 border-dark-600 text-slate-400";
             
             if (activeNode === id) stateClass = "bg-brand-500 border-brand-400 text-white scale-110 shadow-[0_0_15px_rgba(14,165,233,0.5)]";
             else if (visited.has(id)) stateClass = "bg-green-900/50 border-green-500 text-green-300";

             return (
               <div 
                 key={id}
                 className={`absolute w-10 h-10 -ml-5 -mt-5 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all duration-300 z-10 ${stateClass}`}
                 style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
               >
                 {id}
               </div>
             )
           })}
        </div>

        <div className="flex flex-col gap-4">
           <button 
             onClick={runTraversal}
             disabled={isRunning}
             className="w-full py-3 bg-white text-dark-900 rounded-lg font-bold hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg"
           >
             {isRunning ? <RefreshCcw className="animate-spin" size={16}/> : <Search size={16}/>}
             {isRunning ? 'Running...' : 'Start'}
           </button>

           <div className="bg-dark-900 rounded-lg p-4 border border-dark-600 flex-1 flex flex-col min-h-[200px] shadow-inner">
             <div className="text-xs font-bold text-slate-500 uppercase mb-2">
               {mode === 'BFS' ? 'Queue' : 'Stack'} Structure
             </div>
             <div className="flex gap-2 flex-wrap mb-4">
               {queue.length === 0 ? <span className="text-slate-600 text-sm italic">Empty</span> : 
                 queue.map((n, i) => (
                   <div key={i} className="bg-brand-900 text-brand-300 border border-brand-500/30 px-2 py-1 rounded text-xs animate-fadeIn">
                     {n}
                   </div>
                 ))
               }
             </div>
             <div className="border-t border-dark-700 pt-2 flex-1 overflow-y-auto">
                <div className="text-xs font-bold text-slate-500 uppercase mb-2">Logs</div>
                <div className="space-y-1 font-mono text-xs text-slate-400">
                  {logs.slice(-6).map((l, i) => <div key={i} className="animate-fadeIn">&gt; {l}</div>)}
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- QUICKSORT VISUALIZER ---
const QuickSortViz = () => {
  const [array, setArray] = useState([50, 23, 9, 18, 61, 32, 88, 45, 12, 7]);
  const [pivotIndex, setPivotIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [compareIndex, setCompareIndex] = useState<number | null>(null);
  const [isSorting, setIsSorting] = useState(false);
  const [swappedIndices, setSwappedIndices] = useState<number[]>([]);

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  const partition = async (arr: number[], low: number, high: number, updateArr: (a: number[]) => void) => {
    const pivot = arr[high];
    setPivotIndex(high);
    
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      setCurrentIndex(j);
      setCompareIndex(high);
      await sleep(500);

      if (arr[j] < pivot) {
        i++;
        setSwappedIndices([i, j]);
        [arr[i], arr[j]] = [arr[j], arr[i]];
        updateArr([...arr]);
        await sleep(500);
        setSwappedIndices([]);
      }
    }
    
    setSwappedIndices([i + 1, high]);
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    updateArr([...arr]);
    await sleep(500);
    setSwappedIndices([]);
    
    return i + 1;
  };

  const quickSort = async (arr: number[], low: number, high: number, updateArr: (a: number[]) => void) => {
    if (low < high) {
      const pi = await partition(arr, low, high, updateArr);
      
      setPivotIndex(null);
      setCurrentIndex(null);
      setCompareIndex(null);
      
      await quickSort(arr, low, pi - 1, updateArr);
      await quickSort(arr, pi + 1, high, updateArr);
    }
  };

  const startSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    const arrCopy = [...array];
    await quickSort(arrCopy, 0, arrCopy.length - 1, setArray);
    setIsSorting(false);
    setPivotIndex(null);
    setCurrentIndex(null);
    setCompareIndex(null);
  };

  const reset = () => {
    setArray(Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1));
  };

  return (
    <div className="bg-dark-800 p-4 md:p-8 rounded-xl border border-dark-700">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">QuickSort Visualization</h2>
          <p className="text-sm text-slate-400">Divide & Conquer: Pivot Partitioning</p>
        </div>
        <div className="flex gap-2">
           <button onClick={reset} disabled={isSorting} className="px-3 py-1 bg-dark-700 rounded text-sm text-white hover:bg-dark-600 disabled:opacity-50 transition-colors">Reset</button>
           <button onClick={startSort} disabled={isSorting} className="px-3 py-1 bg-brand-600 rounded text-sm text-white hover:bg-brand-500 disabled:opacity-50 transition-all active:scale-95 shadow">
             {isSorting ? 'Sorting...' : 'Start'}
           </button>
        </div>
      </div>

      <div className="h-64 flex items-end justify-center gap-2 md:gap-4 bg-dark-950 rounded-xl p-6 border border-dark-800 shadow-inner">
        {array.map((val, idx) => {
          let colorClass = "bg-brand-600";
          if (idx === pivotIndex) colorClass = "bg-yellow-500";
          else if (idx === currentIndex) colorClass = "bg-blue-400";
          else if (idx === compareIndex) colorClass = "bg-purple-500";
          else if (swappedIndices.includes(idx)) colorClass = "bg-green-500";

          return (
            <div key={idx} className="flex flex-col items-center gap-1 group w-8 md:w-12">
              <div 
                className={`w-full rounded-t-md transition-all duration-300 ${colorClass} opacity-90 group-hover:opacity-100 shadow-sm`}
                style={{ height: `${val * 2}px` }}
              ></div>
              <span className="text-xs font-mono text-slate-500">{val}</span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 flex gap-4 justify-center text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-500 rounded"></div> Pivot</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-400 rounded"></div> Current</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded"></div> Swapping</div>
      </div>
    </div>
  );
};

export const BackendDemo: React.FC<{ isLearnMode?: boolean, initialTab?: string }> = ({ isLearnMode = false, initialTab = 'arch' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  if (isLearnMode) {
    return <BackendGuide activeTab={activeTab} setActiveTab={setActiveTab} />;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-dark-700 mb-6 scrollbar-hide">
        {[
          {id: 'arch', label: 'Load Balancer'},
          {id: 'db', label: 'Sharding'},
          {id: 'api', label: 'API Patterns'},
          {id: 'sql', label: 'SQL Injection'},
          {id: 'hash', label: 'Password Hashing'},
          {id: 'rate', label: 'Rate Limiter'},
          {id: 'dsa', label: 'Graph BFS/DFS'},
          {id: 'linked', label: 'Linked List Cycle'},
        ].map(t => (
          <button 
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap active:scale-95 ${
              activeTab === t.id 
                ? 'bg-white text-black scale-105 shadow' 
                : 'bg-dark-800 text-slate-400 hover:text-white hover:scale-105'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'arch' && <LoadBalancerViz />}
      {activeTab === 'db' && <ShardingViz />}
      {activeTab === 'api' && <ApiDesignViz />}
      {activeTab === 'sql' && <SqlInjectionViz />}
      {activeTab === 'hash' && <PasswordHashViz />}
      {activeTab === 'rate' && <RateLimitViz />}
      {activeTab === 'dsa' && <GraphViz />}
      {activeTab === 'linked' && <LinkedListViz />}
      
      {/* Fallback */}
      {!['arch', 'db', 'api', 'sql', 'hash', 'rate', 'dsa', 'linked'].includes(activeTab) && (
        <div className="bg-dark-800 p-12 rounded-xl border border-dark-700 text-center flex flex-col items-center">
           <div className="p-4 bg-dark-900 rounded-full mb-4 animate-bounce">
             <Binary className="text-slate-500" size={32} />
           </div>
           <h3 className="text-lg font-bold text-white mb-2">Detailed Theory Available</h3>
           <p className="text-slate-400 max-w-md">
             Switch to <strong>Study Mode</strong> to access the comprehensive guide for {activeTab}.
           </p>
        </div>
      )}
    </div>
  );
};