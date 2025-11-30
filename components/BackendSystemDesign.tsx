import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Database, Server, HardDrive, Layers, Hash, Clock, Globe, 
  ArrowRight, Play, Pause, RotateCcw, Zap, MessageSquare,
  Building2, Car, Tv, Users, MapPin, Video, ShoppingCart,
  BookOpen, Target, CheckCircle2, AlertTriangle, Scale, Shield,
  Activity, TrendingUp, Gauge, FileText, HelpCircle, Lightbulb,
  Network, Workflow, Box, CircleDot, Cpu, Lock, Unlock, Eye,
  RefreshCw, Split, GitBranch, Filter, Search, Link
} from 'lucide-react';

// ============================================
// INTRODUCTION TO SYSTEM DESIGN
// ============================================
const IntroductionViz: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'what' | 'approach' | 'good-system'>('what');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="text-brand-400" size={24} />
          Introduction to System Design
        </h3>
        <div className="flex gap-2">
          {[
            { id: 'what', label: 'What is SD?', time: '9 min' },
            { id: 'approach', label: 'How to Approach', time: '17 min' },
            { id: 'good-system', label: 'Good Systems', time: '9 min' },
          ].map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                activeSection === s.id ? 'bg-brand-600 text-white' : 'bg-dark-700 text-slate-400 hover:text-white'
              }`}
            >
              {s.label}
              <span className="text-[10px] opacity-60">({s.time})</span>
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 1: What is System Design? */}
      {activeSection === 'what' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <HelpCircle className="text-blue-400" size={20} />
              What is System Design?
            </h4>
            <p className="text-slate-300 mb-6">
              System Design is the process of defining the <strong className="text-white">architecture, components, modules, interfaces, and data flow</strong> of a system to satisfy specified requirements. It's how we build software that works at scale.
            </p>

            {/* HLD vs LLD */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h5 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
                  <Layers size={16} /> High-Level Design (HLD)
                </h5>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• System architecture overview</li>
                  <li>• Component interactions</li>
                  <li>• Database choices</li>
                  <li>• API contracts</li>
                  <li>• Technology stack decisions</li>
                </ul>
                <div className="mt-3 text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded inline-block">
                  Asked in: Senior/Staff interviews
                </div>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h5 className="font-bold text-purple-400 mb-2 flex items-center gap-2">
                  <Cpu size={16} /> Low-Level Design (LLD)
                </h5>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• Class diagrams & OOP</li>
                  <li>• Data structures used</li>
                  <li>• Algorithm choices</li>
                  <li>• Code organization</li>
                  <li>• Design patterns</li>
                </ul>
                <div className="mt-3 text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded inline-block">
                  Asked in: SDE-2/3 interviews
                </div>
              </div>
            </div>

            {/* Interview Expectations */}
            <div className="bg-dark-900 p-4 rounded-lg">
              <h5 className="font-bold text-white mb-3 flex items-center gap-2">
                <Target size={16} className="text-yellow-400" /> What Interviewers Look For
              </h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Requirement Gathering', icon: <FileText size={14} /> },
                  { label: 'Trade-off Analysis', icon: <Scale size={14} /> },
                  { label: 'Scalability Thinking', icon: <TrendingUp size={14} /> },
                  { label: 'Communication', icon: <MessageSquare size={14} /> },
                ].map((item, i) => (
                  <div key={i} className="bg-dark-800 p-3 rounded-lg text-center">
                    <div className="text-brand-400 mb-1 flex justify-center">{item.icon}</div>
                    <div className="text-xs text-slate-300">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Visual: System Design Components */}
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h5 className="font-bold text-white mb-4">Components of a Typical System</h5>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                { name: 'Clients', icon: <Users size={20} />, color: 'blue' },
                { name: 'Load Balancer', icon: <Network size={20} />, color: 'green' },
                { name: 'App Servers', icon: <Server size={20} />, color: 'purple' },
                { name: 'Cache', icon: <Zap size={20} />, color: 'yellow' },
                { name: 'Database', icon: <Database size={20} />, color: 'pink' },
                { name: 'Message Queue', icon: <MessageSquare size={20} />, color: 'orange' },
              ].map((comp, i) => (
                <React.Fragment key={comp.name}>
                  <div className={`p-4 rounded-xl border-2 bg-${comp.color}-500/10 border-${comp.color}-500/50 flex flex-col items-center gap-2`}>
                    <div className={`text-${comp.color}-400`}>{comp.icon}</div>
                    <span className="text-xs text-slate-300">{comp.name}</span>
                  </div>
                  {i < 5 && <ArrowRight size={16} className="text-slate-600" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: How to Approach System Design */}
      {activeSection === 'approach' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Workflow className="text-green-400" size={20} />
              The RESHADED Framework
            </h4>
            <p className="text-slate-400 mb-6">
              A structured approach to tackle any system design interview question.
            </p>

            <div className="space-y-3">
              {[
                { letter: 'R', word: 'Requirements', desc: 'Clarify functional & non-functional requirements', color: 'red', example: '"Should we support real-time updates?"' },
                { letter: 'E', word: 'Estimation', desc: 'Back-of-envelope calculations for scale', color: 'orange', example: '"100M users × 10 requests/day = 1B requests/day"' },
                { letter: 'S', word: 'Storage', desc: 'Design the data model and database schema', color: 'yellow', example: '"Users table, Posts table, Follows table..."' },
                { letter: 'H', word: 'High-level Design', desc: 'Draw the architecture diagram', color: 'green', example: '"Client → LB → API → Cache → DB"' },
                { letter: 'A', word: 'API Design', desc: 'Define endpoints and contracts', color: 'blue', example: '"POST /tweets, GET /timeline"' },
                { letter: 'D', word: 'Detailed Design', desc: 'Deep dive into critical components', color: 'indigo', example: '"How does the feed ranking algorithm work?"' },
                { letter: 'E', word: 'Evaluate', desc: 'Discuss trade-offs and bottlenecks', color: 'purple', example: '"Pull vs Push model trade-offs"' },
                { letter: 'D', word: 'Distinctive Features', desc: 'Add unique considerations', color: 'pink', example: '"Rate limiting, Monitoring, Security"' },
              ].map((step, i) => (
                <div key={i} className={`flex items-start gap-4 p-4 rounded-lg bg-${step.color}-500/10 border border-${step.color}-500/30`}>
                  <div className={`w-10 h-10 rounded-full bg-${step.color}-500 text-white flex items-center justify-center font-bold text-lg shrink-0`}>
                    {step.letter}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white">{step.word}</div>
                    <div className="text-sm text-slate-400">{step.desc}</div>
                    <div className="text-xs text-slate-500 mt-1 italic">"{step.example}"</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Back of Envelope */}
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h5 className="font-bold text-white mb-4 flex items-center gap-2">
              <Gauge size={18} className="text-yellow-400" />
              Back-of-Envelope Estimation Cheat Sheet
            </h5>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-dark-900 p-4 rounded-lg">
                <h6 className="text-sm font-bold text-slate-300 mb-2">Time Constants</h6>
                <div className="text-xs font-mono text-slate-400 space-y-1">
                  <div>1 day = 86,400 seconds ≈ <span className="text-green-400">100K seconds</span></div>
                  <div>1 month ≈ <span className="text-green-400">2.5M seconds</span></div>
                  <div>1 year ≈ <span className="text-green-400">30M seconds</span></div>
                </div>
              </div>
              <div className="bg-dark-900 p-4 rounded-lg">
                <h6 className="text-sm font-bold text-slate-300 mb-2">Storage Sizes</h6>
                <div className="text-xs font-mono text-slate-400 space-y-1">
                  <div>1 KB = 1,000 bytes (text)</div>
                  <div>1 MB = 1,000 KB (image)</div>
                  <div>1 GB = 1,000 MB (video)</div>
                  <div>1 TB = 1,000 GB (database)</div>
                </div>
              </div>
              <div className="bg-dark-900 p-4 rounded-lg">
                <h6 className="text-sm font-bold text-slate-300 mb-2">Latency Numbers</h6>
                <div className="text-xs font-mono text-slate-400 space-y-1">
                  <div>L1 cache: <span className="text-green-400">0.5 ns</span></div>
                  <div>RAM access: <span className="text-yellow-400">100 ns</span></div>
                  <div>SSD read: <span className="text-orange-400">150 μs</span></div>
                  <div>Network roundtrip: <span className="text-red-400">150 ms</span></div>
                </div>
              </div>
              <div className="bg-dark-900 p-4 rounded-lg">
                <h6 className="text-sm font-bold text-slate-300 mb-2">Traffic Estimates</h6>
                <div className="text-xs font-mono text-slate-400 space-y-1">
                  <div>1M users × 10 req/day = <span className="text-green-400">~100 QPS</span></div>
                  <div>100M users × 10 req/day = <span className="text-yellow-400">~10K QPS</span></div>
                  <div>1B users × 10 req/day = <span className="text-red-400">~100K QPS</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: Good System Characteristics */}
      {activeSection === 'good-system' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-green-400" size={20} />
              Non-Functional Requirements (NFRs)
            </h4>
            <p className="text-slate-400 mb-6">
              A good system isn't just about functionality—it's about how well it handles real-world conditions.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { 
                  name: 'Scalability', 
                  icon: <TrendingUp size={20} />, 
                  color: 'green',
                  desc: 'Handle growth in users, data, and traffic',
                  metrics: ['Horizontal scaling', 'Vertical scaling', 'Auto-scaling']
                },
                { 
                  name: 'Availability', 
                  icon: <Activity size={20} />, 
                  color: 'blue',
                  desc: 'System uptime and accessibility',
                  metrics: ['99.9% = 8.7 hrs/year down', '99.99% = 52 min/year', '99.999% = 5 min/year']
                },
                { 
                  name: 'Reliability', 
                  icon: <Shield size={20} />, 
                  color: 'purple',
                  desc: 'Consistent performance over time',
                  metrics: ['Fault tolerance', 'Data durability', 'Error handling']
                },
                { 
                  name: 'Latency', 
                  icon: <Gauge size={20} />, 
                  color: 'yellow',
                  desc: 'Response time for requests',
                  metrics: ['P50 < 100ms', 'P99 < 500ms', 'P99.9 < 1s']
                },
                { 
                  name: 'Consistency', 
                  icon: <RefreshCw size={20} />, 
                  color: 'orange',
                  desc: 'Data accuracy across nodes',
                  metrics: ['Strong consistency', 'Eventual consistency', 'Causal consistency']
                },
                { 
                  name: 'Maintainability', 
                  icon: <Workflow size={20} />, 
                  color: 'pink',
                  desc: 'Ease of updates and debugging',
                  metrics: ['Modularity', 'Observability', 'Documentation']
                },
              ].map((nfr, i) => (
                <div key={i} className={`bg-${nfr.color}-500/10 border border-${nfr.color}-500/30 rounded-lg p-4`}>
                  <div className={`flex items-center gap-2 mb-2 text-${nfr.color}-400`}>
                    {nfr.icon}
                    <span className="font-bold text-white">{nfr.name}</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{nfr.desc}</p>
                  <div className="space-y-1">
                    {nfr.metrics.map((m, j) => (
                      <div key={j} className="text-[10px] text-slate-500">• {m}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CAP Theorem */}
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h5 className="font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle size={18} className="text-yellow-400" />
              CAP Theorem - The Fundamental Trade-off
            </h5>
            <p className="text-slate-400 mb-4">
              In a distributed system, you can only guarantee <strong className="text-white">2 out of 3</strong> properties:
            </p>
            <div className="flex justify-center mb-6">
              <svg viewBox="0 0 200 180" className="w-64 h-56">
                {/* Triangle */}
                <polygon points="100,10 10,170 190,170" fill="none" stroke="#475569" strokeWidth="2" />
                
                {/* C - Consistency */}
                <circle cx="100" cy="20" r="25" fill="#3b82f6" opacity="0.3" />
                <text x="100" y="25" textAnchor="middle" className="fill-blue-400 text-sm font-bold">C</text>
                
                {/* A - Availability */}
                <circle cx="20" cy="160" r="25" fill="#22c55e" opacity="0.3" />
                <text x="20" y="165" textAnchor="middle" className="fill-green-400 text-sm font-bold">A</text>
                
                {/* P - Partition Tolerance */}
                <circle cx="180" cy="160" r="25" fill="#f97316" opacity="0.3" />
                <text x="180" y="165" textAnchor="middle" className="fill-orange-400 text-sm font-bold">P</text>
                
                {/* Labels */}
                <text x="100" y="50" textAnchor="middle" className="fill-slate-400 text-[8px]">Consistency</text>
                <text x="35" y="185" textAnchor="middle" className="fill-slate-400 text-[8px]">Availability</text>
                <text x="165" y="185" textAnchor="middle" className="fill-slate-400 text-[8px]">Partition</text>
              </svg>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-dark-900 p-3 rounded-lg">
                <div className="text-sm font-bold text-blue-400 mb-1">CP Systems</div>
                <div className="text-xs text-slate-400">MongoDB, HBase, Redis</div>
                <div className="text-[10px] text-slate-500 mt-1">Sacrifice availability for consistency</div>
              </div>
              <div className="bg-dark-900 p-3 rounded-lg">
                <div className="text-sm font-bold text-green-400 mb-1">AP Systems</div>
                <div className="text-xs text-slate-400">Cassandra, DynamoDB, CouchDB</div>
                <div className="text-[10px] text-slate-500 mt-1">Sacrifice consistency for availability</div>
              </div>
              <div className="bg-dark-900 p-3 rounded-lg">
                <div className="text-sm font-bold text-orange-400 mb-1">CA Systems</div>
                <div className="text-xs text-slate-400">Traditional RDBMS (single node)</div>
                <div className="text-[10px] text-slate-500 mt-1">Not partition tolerant (not distributed)</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// DATABASE DESIGN VISUALIZER
// ============================================
const DatabaseDesignViz: React.FC = () => {
  const [normalizationLevel, setNormalizationLevel] = useState<'1NF' | '2NF' | '3NF' | 'denorm'>('denorm');
  
  const schemas = {
    denorm: {
      title: 'Denormalized (No Normalization)',
      tables: [
        {
          name: 'orders',
          columns: ['order_id', 'customer_name', 'customer_email', 'customer_address', 'product_name', 'product_price', 'quantity', 'order_date'],
          issues: ['Data redundancy', 'Update anomalies', 'Delete anomalies']
        }
      ],
      description: 'All data in one table. Fast reads but data duplication.'
    },
    '1NF': {
      title: 'First Normal Form (1NF)',
      tables: [
        {
          name: 'orders',
          columns: ['order_id (PK)', 'customer_id', 'product_id', 'quantity', 'order_date'],
          issues: ['Partial dependencies still exist']
        },
        {
          name: 'customers',
          columns: ['customer_id (PK)', 'name', 'email', 'address'],
          issues: []
        },
        {
          name: 'products',
          columns: ['product_id (PK)', 'name', 'price'],
          issues: []
        }
      ],
      description: 'Atomic values, no repeating groups. Separate entities.'
    },
    '2NF': {
      title: 'Second Normal Form (2NF)',
      tables: [
        {
          name: 'orders',
          columns: ['order_id (PK)', 'customer_id (FK)', 'order_date'],
          issues: []
        },
        {
          name: 'order_items',
          columns: ['order_id (FK)', 'product_id (FK)', 'quantity', 'unit_price'],
          issues: []
        },
        {
          name: 'customers',
          columns: ['customer_id (PK)', 'name', 'email', 'address'],
          issues: ['Transitive dependency: address depends on zip']
        },
        {
          name: 'products',
          columns: ['product_id (PK)', 'name', 'price', 'category_name'],
          issues: ['Transitive dependency: category']
        }
      ],
      description: 'No partial dependencies. Every non-key depends on entire PK.'
    },
    '3NF': {
      title: 'Third Normal Form (3NF)',
      tables: [
        {
          name: 'orders',
          columns: ['order_id (PK)', 'customer_id (FK)', 'order_date'],
          issues: []
        },
        {
          name: 'order_items',
          columns: ['order_id (FK)', 'product_id (FK)', 'quantity', 'unit_price'],
          issues: []
        },
        {
          name: 'customers',
          columns: ['customer_id (PK)', 'name', 'email', 'address_id (FK)'],
          issues: []
        },
        {
          name: 'addresses',
          columns: ['address_id (PK)', 'street', 'city', 'zip'],
          issues: []
        },
        {
          name: 'products',
          columns: ['product_id (PK)', 'name', 'price', 'category_id (FK)'],
          issues: []
        },
        {
          name: 'categories',
          columns: ['category_id (PK)', 'name'],
          issues: []
        }
      ],
      description: 'No transitive dependencies. Every attribute depends only on PK.'
    }
  };

  const current = schemas[normalizationLevel];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Database className="text-brand-400" size={24} />
          Database Normalization
        </h3>
        <div className="flex gap-2">
          {(['denorm', '1NF', '2NF', '3NF'] as const).map(level => (
            <button
              key={level}
              onClick={() => setNormalizationLevel(level)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                normalizationLevel === level
                  ? 'bg-brand-600 text-white'
                  : 'bg-dark-700 text-slate-400 hover:text-white'
              }`}
            >
              {level === 'denorm' ? 'Raw' : level}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
        <h4 className="text-lg font-bold text-white mb-2">{current.title}</h4>
        <p className="text-sm text-slate-400 mb-6">{current.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {current.tables.map((table, idx) => (
            <div
              key={idx}
              className={`bg-dark-900 rounded-lg border ${
                table.issues.length > 0 ? 'border-yellow-500/50' : 'border-green-500/50'
              }`}
            >
              <div className={`px-4 py-2 border-b ${
                table.issues.length > 0 ? 'border-yellow-500/30 bg-yellow-500/10' : 'border-green-500/30 bg-green-500/10'
              }`}>
                <span className="font-mono text-sm font-bold text-white">{table.name}</span>
              </div>
              <div className="p-3 space-y-1">
                {table.columns.map((col, cidx) => (
                  <div key={cidx} className="text-xs font-mono text-slate-400 flex items-center gap-2">
                    <span className={col.includes('PK') ? 'text-yellow-400' : col.includes('FK') ? 'text-blue-400' : ''}>
                      {col}
                    </span>
                  </div>
                ))}
              </div>
              {table.issues.length > 0 && (
                <div className="px-3 pb-3">
                  {table.issues.map((issue, iidx) => (
                    <div key={iidx} className="text-xs text-yellow-400 mt-1">⚠️ {issue}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs">
        <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
          <div className="text-2xl font-bold text-white mb-1">{current.tables.length}</div>
          <div className="text-slate-400">Tables</div>
        </div>
        <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
          <div className="text-2xl font-bold text-white mb-1">
            {normalizationLevel === 'denorm' ? 'High' : normalizationLevel === '3NF' ? 'None' : 'Medium'}
          </div>
          <div className="text-slate-400">Redundancy</div>
        </div>
        <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
          <div className="text-2xl font-bold text-white mb-1">
            {normalizationLevel === 'denorm' ? 'Fast' : normalizationLevel === '3NF' ? 'Slower' : 'Medium'}
          </div>
          <div className="text-slate-400">Read Speed</div>
        </div>
        <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
          <div className="text-2xl font-bold text-white mb-1">
            {normalizationLevel === 'denorm' ? 'Risky' : 'Safe'}
          </div>
          <div className="text-slate-400">Data Integrity</div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// TRANSACTION ISOLATION LEVELS
// ============================================
const IsolationLevelsViz: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState<'read-uncommitted' | 'read-committed' | 'repeatable-read' | 'serializable'>('read-committed');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [showAnomaly, setShowAnomaly] = useState<string | null>(null);

  const levels = {
    'read-uncommitted': {
      name: 'Read Uncommitted',
      isolation: 1,
      performance: 5,
      description: 'Lowest isolation. Transactions can read uncommitted changes from other transactions.',
      anomalies: { dirtyRead: true, nonRepeatableRead: true, phantomRead: true },
      useCase: 'Rarely used. Only for read-only analytics where accuracy isn\'t critical.',
      color: 'red'
    },
    'read-committed': {
      name: 'Read Committed',
      isolation: 2,
      performance: 4,
      description: 'Only reads committed data. Most common default (PostgreSQL, Oracle, SQL Server).',
      anomalies: { dirtyRead: false, nonRepeatableRead: true, phantomRead: true },
      useCase: 'General purpose. Good balance for most OLTP applications.',
      color: 'yellow'
    },
    'repeatable-read': {
      name: 'Repeatable Read',
      isolation: 3,
      performance: 3,
      description: 'Guarantees same result for repeated reads within a transaction. MySQL default.',
      anomalies: { dirtyRead: false, nonRepeatableRead: false, phantomRead: true },
      useCase: 'Financial reports, inventory checks that need consistent snapshots.',
      color: 'blue'
    },
    'serializable': {
      name: 'Serializable',
      isolation: 4,
      performance: 1,
      description: 'Highest isolation. Transactions execute as if serial. Full ACID guarantee.',
      anomalies: { dirtyRead: false, nonRepeatableRead: false, phantomRead: false },
      useCase: 'Banking transactions, critical financial operations, audit logs.',
      color: 'green'
    }
  };

  const anomalyExplanations = {
    dirtyRead: {
      name: 'Dirty Read',
      icon: <Eye className="text-red-400" size={16} />,
      description: 'Reading data that another transaction has modified but not yet committed.',
      example: 'T1 updates balance to $500 (not committed). T2 reads $500. T1 rolls back. T2 has wrong data.',
      visual: [
        { t1: 'UPDATE balance = 500', t2: '', db: '$100', highlight: 't1' },
        { t1: '', t2: 'SELECT balance', db: '$500 (uncommitted)', highlight: 't2' },
        { t1: 'ROLLBACK', t2: '', db: '$100', highlight: 't1' },
        { t1: '', t2: 'Has $500 ❌', db: '$100', highlight: 'error' },
      ]
    },
    nonRepeatableRead: {
      name: 'Non-Repeatable Read',
      icon: <RefreshCw className="text-yellow-400" size={16} />,
      description: 'Reading the same row twice in a transaction yields different values.',
      example: 'T1 reads balance=$100. T2 updates to $50 and commits. T1 reads again, gets $50.',
      visual: [
        { t1: 'SELECT balance → $100', t2: '', db: '$100', highlight: 't1' },
        { t1: '', t2: 'UPDATE balance = 50', db: '$100', highlight: 't2' },
        { t1: '', t2: 'COMMIT', db: '$50', highlight: 't2' },
        { t1: 'SELECT balance → $50 ❌', t2: '', db: '$50', highlight: 'error' },
      ]
    },
    phantomRead: {
      name: 'Phantom Read',
      icon: <Split className="text-blue-400" size={16} />,
      description: 'A query returns different set of rows when executed twice (new rows appear).',
      example: 'T1 counts 10 orders. T2 inserts new order & commits. T1 counts again, gets 11.',
      visual: [
        { t1: 'SELECT COUNT(*) → 10', t2: '', db: '10 rows', highlight: 't1' },
        { t1: '', t2: 'INSERT new order', db: '10 rows', highlight: 't2' },
        { t1: '', t2: 'COMMIT', db: '11 rows', highlight: 't2' },
        { t1: 'SELECT COUNT(*) → 11 ❌', t2: '', db: '11 rows', highlight: 'error' },
      ]
    }
  };

  const current = levels[activeLevel];

  useEffect(() => {
    if (isSimulating && showAnomaly) {
      const anomaly = anomalyExplanations[showAnomaly as keyof typeof anomalyExplanations];
      if (simStep < anomaly.visual.length - 1) {
        const timer = setTimeout(() => setSimStep(s => s + 1), 1500);
        return () => clearTimeout(timer);
      } else {
        setIsSimulating(false);
      }
    }
  }, [isSimulating, simStep, showAnomaly]);

  const startSimulation = (anomalyType: string) => {
    setShowAnomaly(anomalyType);
    setSimStep(0);
    setIsSimulating(true);
  };

  const resetSimulation = () => {
    setShowAnomaly(null);
    setSimStep(0);
    setIsSimulating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Lock className="text-brand-400" size={24} />
          Transaction Isolation Levels
        </h3>
      </div>

      {/* Level Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {(Object.keys(levels) as Array<keyof typeof levels>).map(level => (
          <button
            key={level}
            onClick={() => { setActiveLevel(level); resetSimulation(); }}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
              activeLevel === level 
                ? `bg-${levels[level].color}-500/30 text-${levels[level].color}-400 border border-${levels[level].color}-500`
                : 'bg-dark-700 text-slate-400 hover:text-white'
            }`}
            style={{
              backgroundColor: activeLevel === level ? `var(--${levels[level].color}-bg)` : undefined,
            }}
          >
            {levels[level].name}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Level Details */}
        <div className="space-y-4">
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h4 className="text-lg font-bold text-white mb-2">{current.name}</h4>
            <p className="text-sm text-slate-400 mb-4">{current.description}</p>
            
            {/* Isolation vs Performance */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-dark-900 p-3 rounded-lg">
                <div className="text-xs text-slate-500 mb-1">Isolation Level</div>
                <div className="flex gap-1">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`h-2 w-6 rounded ${i <= current.isolation ? 'bg-green-500' : 'bg-dark-600'}`} />
                  ))}
                </div>
              </div>
              <div className="bg-dark-900 p-3 rounded-lg">
                <div className="text-xs text-slate-500 mb-1">Performance</div>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className={`h-2 w-4 rounded ${i <= current.performance ? 'bg-blue-500' : 'bg-dark-600'}`} />
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-dark-900 p-3 rounded-lg">
              <div className="text-xs text-slate-500 mb-1">Best For</div>
              <div className="text-sm text-slate-300">{current.useCase}</div>
            </div>
          </div>

          {/* Anomaly Prevention Chart */}
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h4 className="text-sm font-bold text-white mb-4">Anomaly Prevention</h4>
            <div className="space-y-3">
              {(['dirtyRead', 'nonRepeatableRead', 'phantomRead'] as const).map(anomaly => {
                const prevented = !current.anomalies[anomaly];
                const info = anomalyExplanations[anomaly];
                return (
                  <div 
                    key={anomaly}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                      showAnomaly === anomaly ? 'bg-brand-600/20 border border-brand-500' : 'bg-dark-900 hover:bg-dark-700'
                    }`}
                    onClick={() => !prevented && startSimulation(anomaly)}
                  >
                    <div className="flex items-center gap-3">
                      {info.icon}
                      <div>
                        <div className="text-sm font-medium text-white">{info.name}</div>
                        <div className="text-xs text-slate-500">{prevented ? 'Prevented ✓' : 'Can occur'}</div>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      prevented ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {prevented ? <Lock size={12} /> : <Unlock size={12} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Anomaly Visualization */}
        <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
          {showAnomaly ? (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  {anomalyExplanations[showAnomaly as keyof typeof anomalyExplanations].icon}
                  {anomalyExplanations[showAnomaly as keyof typeof anomalyExplanations].name}
                </h4>
                <button onClick={resetSimulation} title="Reset simulation" className="p-2 bg-dark-700 rounded-lg hover:bg-dark-600">
                  <RotateCcw size={16} className="text-slate-400" />
                </button>
              </div>
              <p className="text-sm text-slate-400">
                {anomalyExplanations[showAnomaly as keyof typeof anomalyExplanations].description}
              </p>
              
              {/* Timeline Visualization */}
              <div className="bg-dark-900 p-4 rounded-lg">
                <div className="grid grid-cols-3 gap-2 text-xs font-bold text-slate-500 mb-3 border-b border-dark-700 pb-2">
                  <div className="text-center">Transaction 1</div>
                  <div className="text-center">Transaction 2</div>
                  <div className="text-center">Database</div>
                </div>
                <div className="space-y-3">
                  {anomalyExplanations[showAnomaly as keyof typeof anomalyExplanations].visual.map((step, idx) => (
                    <div 
                      key={idx}
                      className={`grid grid-cols-3 gap-2 text-xs p-2 rounded transition-all ${
                        idx === simStep 
                          ? step.highlight === 'error' 
                            ? 'bg-red-500/20 border border-red-500' 
                            : 'bg-brand-500/20 border border-brand-500'
                          : idx < simStep 
                            ? 'opacity-50' 
                            : 'opacity-30'
                      }`}
                    >
                      <div className={`text-center ${step.t1 ? 'text-blue-400' : 'text-slate-600'}`}>
                        {step.t1 || '—'}
                      </div>
                      <div className={`text-center ${step.t2 ? 'text-purple-400' : 'text-slate-600'}`}>
                        {step.t2 || '—'}
                      </div>
                      <div className="text-center text-green-400">{step.db}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => { setSimStep(0); setIsSimulating(true); }}
                  className="flex-1 py-2 bg-brand-600 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2"
                >
                  <Play size={14} /> Replay
                </button>
              </div>

              <div className="text-xs text-slate-500 bg-dark-900 p-3 rounded-lg">
                <strong className="text-yellow-400">Example:</strong> {anomalyExplanations[showAnomaly as keyof typeof anomalyExplanations].example}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <Database size={48} className="text-slate-600 mb-4" />
              <h4 className="text-lg font-bold text-white mb-2">Select an Anomaly</h4>
              <p className="text-sm text-slate-400 max-w-xs">
                Click on a non-prevented anomaly on the left to see how it occurs with the current isolation level.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
        <h4 className="text-lg font-bold text-white mb-4">Quick Comparison</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-dark-700">
                <th className="p-3 text-slate-400">Level</th>
                <th className="p-3 text-center text-slate-400">Dirty Read</th>
                <th className="p-3 text-center text-slate-400">Non-Repeatable</th>
                <th className="p-3 text-center text-slate-400">Phantom</th>
                <th className="p-3 text-slate-400">Database Default</th>
              </tr>
            </thead>
            <tbody>
              {(Object.entries(levels) as [string, typeof levels[keyof typeof levels]][]).map(([key, level]) => (
                <tr key={key} className={`border-b border-dark-700 ${activeLevel === key ? 'bg-brand-500/10' : ''}`}>
                  <td className="p-3 font-medium text-white">{level.name}</td>
                  <td className="p-3 text-center">
                    {level.anomalies.dirtyRead 
                      ? <span className="text-red-400">✗</span>
                      : <span className="text-green-400">✓</span>
                    }
                  </td>
                  <td className="p-3 text-center">
                    {level.anomalies.nonRepeatableRead 
                      ? <span className="text-red-400">✗</span>
                      : <span className="text-green-400">✓</span>
                    }
                  </td>
                  <td className="p-3 text-center">
                    {level.anomalies.phantomRead 
                      ? <span className="text-red-400">✗</span>
                      : <span className="text-green-400">✓</span>
                    }
                  </td>
                  <td className="p-3 text-slate-400 text-xs">
                    {key === 'read-committed' && 'PostgreSQL, Oracle, SQL Server'}
                    {key === 'repeatable-read' && 'MySQL/InnoDB'}
                    {key === 'serializable' && 'Some banking systems'}
                    {key === 'read-uncommitted' && 'Rarely used'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interview Tips */}
      <div className="bg-gradient-to-r from-brand-600/20 to-purple-600/20 p-6 rounded-xl border border-brand-500/30">
        <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <Lightbulb className="text-yellow-400" size={20} />
          Interview Tips
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="text-white font-medium">Common Questions:</div>
            <ul className="text-slate-400 space-y-1">
              <li>• "Explain the difference between Read Committed and Repeatable Read"</li>
              <li>• "When would you use Serializable isolation?"</li>
              <li>• "How do you handle phantom reads in your application?"</li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="text-white font-medium">Key Points:</div>
            <ul className="text-slate-400 space-y-1">
              <li>• Higher isolation = Lower concurrency = Worse performance</li>
              <li>• Most apps use Read Committed (good enough)</li>
              <li>• Serializable uses locks or MVCC (snapshot isolation)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// CACHING STRATEGIES VISUALIZER
// ============================================
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

// ============================================
// MESSAGE QUEUE VISUALIZER
// ============================================
const MessageQueueViz: React.FC = () => {
  const [pattern, setPattern] = useState<'pubsub' | 'queue' | 'fanout'>('queue');
  const [messages, setMessages] = useState<Array<{ id: number; text: string; consumer?: number }>>([]);
  const [consumers] = useState([1, 2, 3]);
  const msgId = useRef(0);

  const addMessage = useCallback(() => {
    const newMsg = { id: msgId.current++, text: `Msg-${msgId.current}` };
    setMessages(prev => [...prev, newMsg]);

    // Simulate consumption after delay
    setTimeout(() => {
      setMessages(prev => {
        const msg = prev.find(m => m.id === newMsg.id);
        if (!msg) return prev;
        
        if (pattern === 'queue') {
          // Round-robin to one consumer
          const consumer = (newMsg.id % 3) + 1;
          return prev.map(m => m.id === newMsg.id ? { ...m, consumer } : m);
        } else {
          // Fanout - all consumers get it (simulate by showing all)
          return prev.map(m => m.id === newMsg.id ? { ...m, consumer: -1 } : m);
        }
      });
    }, 1500);

    // Remove after 3s
    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.id !== newMsg.id));
    }, 3000);
  }, [pattern]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="text-purple-400" size={24} />
          Message Queues
        </h3>
        <div className="flex gap-2">
          {(['queue', 'pubsub', 'fanout'] as const).map(p => (
            <button
              key={p}
              onClick={() => { setPattern(p); setMessages([]); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                pattern === p ? 'bg-brand-600 text-white' : 'bg-dark-700 text-slate-400 hover:text-white'
              }`}
            >
              {p === 'queue' ? 'Work Queue' : p === 'pubsub' ? 'Pub/Sub' : 'Fan-out'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-lg font-bold text-white">
              {pattern === 'queue' ? 'Work Queue (Competing Consumers)' : 
               pattern === 'pubsub' ? 'Publish/Subscribe' : 'Fan-out Exchange'}
            </h4>
            <p className="text-sm text-slate-400">
              {pattern === 'queue' ? 'Each message goes to ONE consumer (load balancing)' :
               pattern === 'pubsub' ? 'Messages broadcast to all subscribers' :
               'Exchange routes to all bound queues'}
            </p>
          </div>
          <button onClick={addMessage} className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-bold">
            + Send Message
          </button>
        </div>

        <div className="flex items-start justify-between gap-8">
          {/* Producer */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-xl bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center">
              <Server size={32} className="text-blue-400" />
            </div>
            <span className="text-xs text-slate-400 mt-2">Producer</span>
          </div>

          {/* Queue/Exchange */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full h-20 rounded-xl bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center gap-2 overflow-hidden px-4">
              {messages.filter(m => !m.consumer).map(m => (
                <div key={m.id} className="px-2 py-1 bg-purple-500 text-white text-xs rounded animate-pulse">
                  {m.text}
                </div>
              ))}
              {messages.filter(m => !m.consumer).length === 0 && (
                <span className="text-purple-400 text-sm">Queue Empty</span>
              )}
            </div>
            <span className="text-xs text-slate-400 mt-2">
              {pattern === 'fanout' ? 'Exchange' : 'Queue'} ({pattern === 'queue' ? 'RabbitMQ' : 'Kafka'})
            </span>
          </div>

          {/* Consumers */}
          <div className="flex flex-col gap-2">
            {consumers.map(c => (
              <div key={c} className="flex items-center gap-2">
                <div className={`w-16 h-12 rounded-lg border-2 flex items-center justify-center transition-all ${
                  messages.some(m => m.consumer === c || m.consumer === -1)
                    ? 'bg-green-500/20 border-green-500 scale-105'
                    : 'bg-dark-700 border-dark-600'
                }`}>
                  <Server size={20} className={
                    messages.some(m => m.consumer === c || m.consumer === -1) ? 'text-green-400' : 'text-slate-500'
                  } />
                </div>
                <span className="text-xs text-slate-400">Consumer {c}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-dark-900 p-4 rounded-lg">
          <h5 className="text-sm font-bold text-white mb-2">Use Cases</h5>
          <div className="text-xs text-slate-400 space-y-1">
            {pattern === 'queue' && (
              <>
                <div>• Task distribution (image processing, emails)</div>
                <div>• Load balancing across workers</div>
                <div>• Background job processing</div>
              </>
            )}
            {pattern === 'pubsub' && (
              <>
                <div>• Real-time notifications</div>
                <div>• Event streaming (Kafka topics)</div>
                <div>• Microservice communication</div>
              </>
            )}
            {pattern === 'fanout' && (
              <>
                <div>• Broadcast updates to all services</div>
                <div>• Cache invalidation</div>
                <div>• Multi-region replication</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// LOAD BALANCING VISUALIZER
// ============================================
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

// ============================================
// CONSISTENT HASHING VISUALIZER
// ============================================
const ConsistentHashingViz: React.FC = () => {
  const [nodes, setNodes] = useState(['Node A', 'Node B', 'Node C']);
  const [keys, setKeys] = useState(['user:123', 'user:456', 'session:789']);
  const [highlightedKey, setHighlightedKey] = useState<string | null>(null);

  // Simple hash function for demo
  const hashPosition = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash) % 360;
  };

  const nodePositions = nodes.map(n => ({ name: n, position: hashPosition(n) })).sort((a, b) => a.position - b.position);
  const keyMappings = keys.map(k => {
    const keyPos = hashPosition(k);
    // Find next node clockwise
    const node = nodePositions.find(n => n.position >= keyPos) || nodePositions[0];
    return { key: k, position: keyPos, node: node.name };
  });

  const addNode = () => {
    const newNode = `Node ${String.fromCharCode(65 + nodes.length)}`;
    if (nodes.length < 8) setNodes([...nodes, newNode]);
  };

  const removeNode = () => {
    if (nodes.length > 2) setNodes(nodes.slice(0, -1));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Hash className="text-orange-400" size={24} />
          Consistent Hashing
        </h3>
        <div className="flex gap-2">
          <button onClick={removeNode} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-500/20 text-red-400 hover:bg-red-500/30">
            - Remove Node
          </button>
          <button onClick={addNode} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-green-500/20 text-green-400 hover:bg-green-500/30">
            + Add Node
          </button>
        </div>
      </div>

      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
        <div className="flex items-start gap-8">
          {/* Ring visualization */}
          <div className="relative w-64 h-64 flex-shrink-0">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Ring */}
              <circle cx="100" cy="100" r="80" fill="none" stroke="#334155" strokeWidth="4" />
              
              {/* Nodes */}
              {nodePositions.map((node, i) => {
                const angle = (node.position - 90) * (Math.PI / 180);
                const x = 100 + 80 * Math.cos(angle);
                const y = 100 + 80 * Math.sin(angle);
                return (
                  <g key={node.name}>
                    <circle cx={x} cy={y} r="12" fill="#22c55e" />
                    <text x={x} y={y + 4} textAnchor="middle" className="text-[8px] fill-white font-bold">
                      {node.name.split(' ')[1]}
                    </text>
                  </g>
                );
              })}

              {/* Keys */}
              {keyMappings.map((km, i) => {
                const angle = (km.position - 90) * (Math.PI / 180);
                const x = 100 + 60 * Math.cos(angle);
                const y = 100 + 60 * Math.sin(angle);
                const isHighlighted = highlightedKey === km.key;
                return (
                  <circle
                    key={km.key}
                    cx={x}
                    cy={y}
                    r={isHighlighted ? 8 : 6}
                    fill={isHighlighted ? '#f97316' : '#3b82f6'}
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHighlightedKey(km.key)}
                    onMouseLeave={() => setHighlightedKey(null)}
                  />
                );
              })}
            </svg>
          </div>

          {/* Mapping table */}
          <div className="flex-1">
            <h4 className="text-lg font-bold text-white mb-4">Key → Node Mapping</h4>
            <div className="space-y-2">
              {keyMappings.map(km => (
                <div
                  key={km.key}
                  className={`p-3 rounded-lg border transition-all ${
                    highlightedKey === km.key
                      ? 'bg-orange-500/20 border-orange-500'
                      : 'bg-dark-700 border-dark-600'
                  }`}
                  onMouseEnter={() => setHighlightedKey(km.key)}
                  onMouseLeave={() => setHighlightedKey(null)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono text-blue-400">{km.key}</span>
                    <ArrowRight size={16} className="text-slate-500" />
                    <span className="text-sm font-bold text-green-400">{km.node}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Position: {km.position}°</div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-dark-900 rounded-lg">
              <p className="text-xs text-slate-400">
                <strong className="text-white">FAANG Interview Tip:</strong> When a node is added/removed,
                only K/N keys need remapping (K=keys, N=nodes). Traditional hashing would remap ~all keys.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// RATE LIMITING VISUALIZER
// ============================================
const RateLimitingViz: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<'token-bucket' | 'sliding-window' | 'fixed-window' | 'leaky-bucket'>('token-bucket');
  const [tokens, setTokens] = useState(10);
  const [requests, setRequests] = useState<Array<{ id: number; status: 'allowed' | 'denied' }>>([]);
  const [windowCount, setWindowCount] = useState(0);
  const maxTokens = 10;
  const refillRate = 2; // tokens per second

  // Token refill
  useEffect(() => {
    const interval = setInterval(() => {
      if (algorithm === 'token-bucket') {
        setTokens(t => Math.min(maxTokens, t + refillRate));
      }
      if (algorithm === 'fixed-window') {
        setWindowCount(0); // Reset window
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [algorithm]);

  const makeRequest = useCallback(() => {
    const id = Date.now();
    let allowed = false;

    if (algorithm === 'token-bucket') {
      if (tokens > 0) {
        setTokens(t => t - 1);
        allowed = true;
      }
    } else if (algorithm === 'fixed-window') {
      if (windowCount < 5) {
        setWindowCount(c => c + 1);
        allowed = true;
      }
    } else if (algorithm === 'sliding-window') {
      // Simplified - just allow if < 5 recent
      if (requests.filter(r => r.status === 'allowed').length < 5) {
        allowed = true;
      }
    } else if (algorithm === 'leaky-bucket') {
      // Always process at fixed rate, queue or drop
      allowed = requests.length < 10;
    }

    setRequests(prev => [...prev.slice(-9), { id, status: allowed ? 'allowed' : 'denied' }]);
  }, [algorithm, tokens, windowCount, requests]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Clock className="text-red-400" size={24} />
          Rate Limiting Algorithms
        </h3>
        <div className="flex gap-2 flex-wrap">
          {(['token-bucket', 'sliding-window', 'fixed-window', 'leaky-bucket'] as const).map(a => (
            <button
              key={a}
              onClick={() => { setAlgorithm(a); setRequests([]); setTokens(10); setWindowCount(0); }}
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
              {algorithm === 'token-bucket' && `Tokens: ${tokens}/${maxTokens} (refills ${refillRate}/sec)`}
              {algorithm === 'fixed-window' && `Window count: ${windowCount}/5 (resets every 2s)`}
              {algorithm === 'sliding-window' && 'Rolling window tracks requests over time'}
              {algorithm === 'leaky-bucket' && 'Requests processed at fixed rate, excess queued/dropped'}
            </p>
          </div>
          <button onClick={makeRequest} className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-bold">
            Make Request
          </button>
        </div>

        {/* Token bucket visualization */}
        {algorithm === 'token-bucket' && (
          <div className="flex items-end gap-1 h-20 mb-6">
            {Array(maxTokens).fill(0).map((_, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t transition-all ${
                  i < tokens ? 'bg-green-500 h-full' : 'bg-dark-600 h-4'
                }`}
              />
            ))}
          </div>
        )}

        {/* Request history */}
        <div className="flex gap-2 flex-wrap">
          {requests.map(r => (
            <div
              key={r.id}
              className={`px-3 py-1 rounded text-xs font-bold ${
                r.status === 'allowed' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}
            >
              {r.status === 'allowed' ? '✓' : '✗'}
            </div>
          ))}
        </div>

        <div className="mt-6 bg-dark-900 p-4 rounded-lg">
          <h5 className="text-sm font-bold text-white mb-2">Algorithm Details</h5>
          <div className="text-xs text-slate-400 space-y-1">
            {algorithm === 'token-bucket' && (
              <>
                <div>• Bucket holds tokens, refilled at constant rate</div>
                <div>• Each request consumes 1 token</div>
                <div>• Allows bursts up to bucket size</div>
                <div>• Used by: AWS API Gateway, Stripe</div>
              </>
            )}
            {algorithm === 'fixed-window' && (
              <>
                <div>• Time divided into fixed windows (e.g., 1 min)</div>
                <div>• Counter resets at window boundary</div>
                <div>• Simple but allows burst at window edges</div>
                <div>• Used by: Simple implementations</div>
              </>
            )}
            {algorithm === 'sliding-window' && (
              <>
                <div>• Combines fixed window with sliding log</div>
                <div>• Weighted count from current + previous window</div>
                <div>• Smooths out edge bursts</div>
                <div>• Used by: Redis, Cloudflare</div>
              </>
            )}
            {algorithm === 'leaky-bucket' && (
              <>
                <div>• Requests enter bucket, leak out at fixed rate</div>
                <div>• Smooths traffic to constant output rate</div>
                <div>• Excess requests dropped when bucket full</div>
                <div>• Used by: Network traffic shaping</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// CASE STUDIES - SYSTEM DESIGN
// ============================================
const CaseStudiesViz: React.FC = () => {
  const [activeCase, setActiveCase] = useState<'twitter' | 'uber' | 'netflix'>('twitter');

  const cases = {
    twitter: {
      icon: <MessageSquare size={24} />,
      title: 'Design Twitter',
      scale: '500M+ users, 500M tweets/day',
      components: [
        { name: 'Tweet Service', color: 'blue', desc: 'Write path: Store tweets' },
        { name: 'Timeline Service', color: 'green', desc: 'Read path: Build feed' },
        { name: 'Fan-out Service', color: 'purple', desc: 'Push tweets to followers' },
        { name: 'Redis Cache', color: 'yellow', desc: 'Hot tweets, user timelines' },
        { name: 'Graph DB', color: 'pink', desc: 'Follow relationships' },
        { name: 'Search (Elasticsearch)', color: 'orange', desc: 'Tweet search, trends' },
      ],
      keyDecisions: [
        { q: 'Pull vs Push?', a: 'Hybrid: Push for normal users, Pull for celebrities (fanout on read)' },
        { q: 'Timeline storage?', a: 'Pre-computed in Redis, limit to 800 tweets per user' },
        { q: 'Database choice?', a: 'MySQL sharded by user_id + Redis + Elasticsearch' },
      ]
    },
    uber: {
      icon: <Car size={24} />,
      title: 'Design Uber',
      scale: '100M+ users, 5M rides/day',
      components: [
        { name: 'Rider Service', color: 'blue', desc: 'Rider app backend' },
        { name: 'Driver Service', color: 'green', desc: 'Driver locations, status' },
        { name: 'Matching Service', color: 'purple', desc: 'Match riders to drivers' },
        { name: 'Location Service', color: 'yellow', desc: 'Real-time GPS, geohashing' },
        { name: 'Pricing Service', color: 'pink', desc: 'Dynamic surge pricing' },
        { name: 'Maps/ETA Service', color: 'orange', desc: 'Route, time estimates' },
      ],
      keyDecisions: [
        { q: 'Location updates?', a: 'Drivers send GPS every 3-4 sec, stored in memory + Redis' },
        { q: 'Finding nearby drivers?', a: 'Geohashing: Convert lat/lng to grid cells, query nearby cells' },
        { q: 'Matching algorithm?', a: 'Dispatch optimization: ETA, driver rating, distance weighted' },
      ]
    },
    netflix: {
      icon: <Tv size={24} />,
      title: 'Design Netflix',
      scale: '200M+ users, 1B hours streamed/day',
      components: [
        { name: 'Content Delivery (CDN)', color: 'blue', desc: 'Open Connect Appliances' },
        { name: 'Recommendation Engine', color: 'green', desc: 'ML-based personalization' },
        { name: 'Transcoding Pipeline', color: 'purple', desc: 'Multiple resolutions/codecs' },
        { name: 'Playback Service', color: 'yellow', desc: 'Adaptive bitrate streaming' },
        { name: 'User Profiles', color: 'pink', desc: 'Watch history, preferences' },
        { name: 'A/B Testing Platform', color: 'orange', desc: 'Continuous experimentation' },
      ],
      keyDecisions: [
        { q: 'Video delivery?', a: 'Pre-position content on ISP-local OCAs (Open Connect)' },
        { q: 'Adaptive streaming?', a: 'Chunk videos into segments, ABR picks quality per segment' },
        { q: 'Recommendations?', a: 'Collaborative filtering + content-based + deep learning' },
      ]
    }
  };

  const current = cases[activeCase];
  const colors: Record<string, string> = {
    blue: 'bg-blue-500/20 border-blue-500 text-blue-400',
    green: 'bg-green-500/20 border-green-500 text-green-400',
    purple: 'bg-purple-500/20 border-purple-500 text-purple-400',
    yellow: 'bg-yellow-500/20 border-yellow-500 text-yellow-400',
    pink: 'bg-pink-500/20 border-pink-500 text-pink-400',
    orange: 'bg-orange-500/20 border-orange-500 text-orange-400',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Building2 className="text-brand-400" size={24} />
          Real Case Studies
        </h3>
        <div className="flex gap-2">
          {(['twitter', 'uber', 'netflix'] as const).map(c => (
            <button
              key={c}
              onClick={() => setActiveCase(c)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                activeCase === c ? 'bg-brand-600 text-white' : 'bg-dark-700 text-slate-400 hover:text-white'
              }`}
            >
              {cases[c].icon}
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
        <div className="mb-6">
          <h4 className="text-2xl font-bold text-white mb-2">{current.title}</h4>
          <p className="text-sm text-slate-400">{current.scale}</p>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {current.components.map((comp, i) => (
            <div key={i} className={`p-4 rounded-xl border-2 ${colors[comp.color]}`}>
              <h5 className="font-bold text-white text-sm mb-1">{comp.name}</h5>
              <p className="text-xs opacity-80">{comp.desc}</p>
            </div>
          ))}
        </div>

        {/* Key Decisions */}
        <div className="space-y-4">
          <h5 className="text-lg font-bold text-white">Key Design Decisions</h5>
          {current.keyDecisions.map((kd, i) => (
            <div key={i} className="bg-dark-900 p-4 rounded-lg">
              <div className="text-sm font-bold text-brand-400 mb-2">Q: {kd.q}</div>
              <div className="text-sm text-slate-300">A: {kd.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// URL SHORTENING SERVICE
// ============================================
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
              onClick={() => setActiveTab(t.id as any)}
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

// ============================================
// MAIN EXPORT COMPONENT
// ============================================
export const BackendSystemDesign: React.FC = () => {
  const [activeViz, setActiveViz] = useState('intro');

  const visualizers = [
    { id: 'intro', label: 'Introduction', icon: <BookOpen size={16} /> },
    { id: 'database', label: 'Databases', icon: <Database size={16} /> },
    { id: 'isolation', label: 'Isolation Levels', icon: <Lock size={16} /> },
    { id: 'caching', label: 'Caching', icon: <Zap size={16} /> },
    { id: 'queues', label: 'Async & Queues', icon: <MessageSquare size={16} /> },
    { id: 'resiliency', label: 'Resiliency', icon: <Shield size={16} /> },
    { id: 'hashing', label: 'Consistent Hashing', icon: <Hash size={16} /> },
    { id: 'ratelimit', label: 'Rate Limiting', icon: <Clock size={16} /> },
    { id: 'urlshortener', label: 'URL Shortener', icon: <Link size={16} /> },
    { id: 'casestudies', label: 'Case Studies', icon: <Building2 size={16} /> },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-dark-700 mb-6 scrollbar-hide">
        {visualizers.map(v => (
          <button
            key={v.id}
            onClick={() => setActiveViz(v.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 active:scale-95 ${
              activeViz === v.id
                ? 'bg-white text-black scale-105 shadow'
                : 'bg-dark-800 text-slate-400 hover:text-white hover:scale-105'
            }`}
          >
            {v.icon}
            {v.label}
          </button>
        ))}
      </div>

      {activeViz === 'intro' && <IntroductionViz />}
      {activeViz === 'database' && <DatabaseDesignViz />}
      {activeViz === 'isolation' && <IsolationLevelsViz />}
      {activeViz === 'caching' && <CachingViz />}
      {activeViz === 'queues' && <MessageQueueViz />}
      {activeViz === 'resiliency' && <LoadBalancerViz />}
      {activeViz === 'hashing' && <ConsistentHashingViz />}
      {activeViz === 'ratelimit' && <RateLimitingViz />}
      {activeViz === 'urlshortener' && <URLShortenerViz />}
      {activeViz === 'casestudies' && <CaseStudiesViz />}
    </div>
  );
};

export default BackendSystemDesign;
