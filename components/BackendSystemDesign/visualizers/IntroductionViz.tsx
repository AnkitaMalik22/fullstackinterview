import React, { useState } from 'react';
import { 
  BookOpen, Target, CheckCircle2, Scale, Shield, 
  Activity, TrendingUp, Gauge, HelpCircle, Lightbulb, Box
} from 'lucide-react';

const IntroductionViz: React.FC = () => {
  const [activeFramework, setActiveFramework] = useState<'reshaded' | 'nfr' | 'cap'>('reshaded');

  const reshadedSteps = [
    { letter: 'R', title: 'Requirements', desc: 'Clarify functional & non-functional requirements. Ask about scale, users, and constraints.', icon: <Target size={20} /> },
    { letter: 'E', title: 'Estimation', desc: 'Back-of-envelope calculations: QPS, storage, bandwidth, servers needed.', icon: <Gauge size={20} /> },
    { letter: 'S', title: 'Storage Schema', desc: 'Design data models, choose database types (SQL vs NoSQL), define relationships.', icon: <Box size={20} /> },
    { letter: 'H', title: 'High-Level Design', desc: 'Draw main components: clients, load balancers, services, databases, caches.', icon: <Activity size={20} /> },
    { letter: 'A', title: 'API Design', desc: 'Define REST/GraphQL endpoints, request/response formats, authentication.', icon: <CheckCircle2 size={20} /> },
    { letter: 'D', title: 'Detailed Design', desc: 'Deep dive into critical components, algorithms, data flow, edge cases.', icon: <TrendingUp size={20} /> },
    { letter: 'E', title: 'Evaluation', desc: 'Identify bottlenecks, single points of failure, and how to address them.', icon: <Scale size={20} /> },
    { letter: 'D', title: 'Distinguish', desc: 'Stand out: mention trade-offs, alternatives, real-world examples, future improvements.', icon: <Lightbulb size={20} /> },
  ];

  const nfrs = [
    { name: 'Scalability', desc: 'Handle growing load: horizontal vs vertical scaling', color: 'blue' },
    { name: 'Availability', desc: 'System uptime: 99.9% = 8.76h downtime/year', color: 'green' },
    { name: 'Reliability', desc: 'Consistent correct behavior, fault tolerance', color: 'purple' },
    { name: 'Performance', desc: 'Latency (P50, P99), throughput targets', color: 'yellow' },
    { name: 'Durability', desc: 'Data persistence, backups, replication', color: 'orange' },
    { name: 'Security', desc: 'Authentication, authorization, encryption', color: 'red' },
  ];

  const capTheorem = {
    C: { name: 'Consistency', desc: 'All nodes see same data at same time', examples: 'Banking, Inventory' },
    A: { name: 'Availability', desc: 'System responds to every request', examples: 'Social media, DNS' },
    P: { name: 'Partition Tolerance', desc: 'System works despite network failures', examples: 'Always needed in distributed systems' },
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-brand-600/20 to-purple-600/20 p-6 rounded-xl border border-brand-500/30">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <BookOpen className="text-brand-400" size={24} />
          System Design Interview Framework
        </h3>
        <p className="text-slate-400">
          Master the structured approach to ace any system design interview. Learn the RESHADED framework,
          understand non-functional requirements, and apply the CAP theorem.
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'reshaded', label: 'RESHADED Framework' },
          { id: 'nfr', label: 'Non-Functional Requirements' },
          { id: 'cap', label: 'CAP Theorem' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveFramework(tab.id as any)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeFramework === tab.id
                ? 'bg-brand-600 text-white'
                : 'bg-dark-700 text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeFramework === 'reshaded' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="grid gap-3">
            {reshadedSteps.map((step, i) => (
              <div
                key={i}
                className="bg-dark-800 p-4 rounded-xl border border-dark-700 flex items-start gap-4 hover:border-brand-500/50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold text-xl shrink-0">
                  {step.letter}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-brand-400">{step.icon}</span>
                    <h4 className="font-bold text-white">{step.title}</h4>
                  </div>
                  <p className="text-sm text-slate-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-dark-800 p-4 rounded-xl border border-dark-700">
            <h4 className="font-bold text-yellow-400 mb-2 flex items-center gap-2">
              <HelpCircle size={16} />
              Pro Tip: Questions to Ask
            </h4>
            <div className="grid md:grid-cols-2 gap-2 text-sm text-slate-400">
              <div>• Who are the users? How many?</div>
              <div>• What are the main features?</div>
              <div>• What's the read/write ratio?</div>
              <div>• What consistency level is needed?</div>
              <div>• What's the expected QPS/TPS?</div>
              <div>• Are there any latency requirements?</div>
            </div>
          </div>
        </div>
      )}

      {activeFramework === 'nfr' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nfrs.map((nfr, i) => (
              <div
                key={i}
                className={`bg-dark-800 p-4 rounded-xl border border-${nfr.color}-500/30 hover:border-${nfr.color}-500/60 transition-all`}
              >
                <h4 className={`font-bold text-${nfr.color}-400 mb-2`}>{nfr.name}</h4>
                <p className="text-sm text-slate-400">{nfr.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-dark-800 p-4 rounded-xl border border-dark-700">
            <h4 className="font-bold text-white mb-3">Availability Table</h4>
            <div className="grid grid-cols-4 gap-2 text-sm">
              <div className="font-bold text-slate-400">Level</div>
              <div className="font-bold text-slate-400">Uptime %</div>
              <div className="font-bold text-slate-400">Downtime/Year</div>
              <div className="font-bold text-slate-400">Use Case</div>
              
              <div className="text-white">Two 9s</div>
              <div className="text-slate-300">99%</div>
              <div className="text-slate-300">3.65 days</div>
              <div className="text-slate-400">Internal tools</div>
              
              <div className="text-white">Three 9s</div>
              <div className="text-slate-300">99.9%</div>
              <div className="text-slate-300">8.76 hours</div>
              <div className="text-slate-400">Most SaaS</div>
              
              <div className="text-white">Four 9s</div>
              <div className="text-slate-300">99.99%</div>
              <div className="text-slate-300">52.6 minutes</div>
              <div className="text-slate-400">E-commerce</div>
              
              <div className="text-white">Five 9s</div>
              <div className="text-slate-300">99.999%</div>
              <div className="text-slate-300">5.26 minutes</div>
              <div className="text-slate-400">Banking, Healthcare</div>
            </div>
          </div>
        </div>
      )}

      {activeFramework === 'cap' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <div className="flex justify-center mb-6">
              {/* CAP Triangle SVG */}
              <svg width="300" height="260" viewBox="0 0 300 260">
                <polygon points="150,20 280,230 20,230" fill="none" stroke="#38bdf8" strokeWidth="2" />
                
                {/* C vertex */}
                <circle cx="150" cy="20" r="30" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="150" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-lg">C</text>
                
                {/* A vertex */}
                <circle cx="280" cy="230" r="30" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
                <text x="280" y="235" textAnchor="middle" fill="#22c55e" className="font-bold text-lg">A</text>
                
                {/* P vertex */}
                <circle cx="20" cy="230" r="30" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="20" y="235" textAnchor="middle" fill="#a855f7" className="font-bold text-lg">P</text>
                
                {/* Labels */}
                <text x="150" y="65" textAnchor="middle" fill="#94a3b8" className="text-xs">Consistency</text>
                <text x="260" y="195" textAnchor="end" fill="#94a3b8" className="text-xs">Availability</text>
                <text x="40" y="195" textAnchor="start" fill="#94a3b8" className="text-xs">Partition</text>
                <text x="40" y="208" textAnchor="start" fill="#94a3b8" className="text-xs">Tolerance</text>
                
                {/* Center text */}
                <text x="150" y="155" textAnchor="middle" fill="#64748b" className="text-sm">Pick 2</text>
              </svg>
            </div>

            <p className="text-center text-slate-400 mb-6">
              In a distributed system with network partitions, you must choose between Consistency and Availability.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(capTheorem).map(([key, value]) => (
                <div key={key} className="bg-dark-900 p-4 rounded-lg">
                  <div className={`text-2xl font-bold mb-2 ${
                    key === 'C' ? 'text-sky-400' : key === 'A' ? 'text-green-400' : 'text-purple-400'
                  }`}>
                    {value.name}
                  </div>
                  <p className="text-sm text-slate-400 mb-2">{value.desc}</p>
                  <p className="text-xs text-slate-500">Examples: {value.examples}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-dark-800 p-4 rounded-xl border border-sky-500/30">
              <h4 className="font-bold text-sky-400 mb-2 flex items-center gap-2">
                <Shield size={16} />
                CP Systems (Consistency + Partition Tolerance)
              </h4>
              <p className="text-sm text-slate-400 mb-2">Sacrifice availability during partitions</p>
              <div className="text-xs text-slate-500">Examples: MongoDB, HBase, Redis (in cluster mode)</div>
            </div>
            <div className="bg-dark-800 p-4 rounded-xl border border-green-500/30">
              <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                <Activity size={16} />
                AP Systems (Availability + Partition Tolerance)
              </h4>
              <p className="text-sm text-slate-400 mb-2">Sacrifice consistency during partitions</p>
              <div className="text-xs text-slate-500">Examples: Cassandra, DynamoDB, CouchDB</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntroductionViz;
