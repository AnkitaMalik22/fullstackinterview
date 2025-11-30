import React, { useState, useEffect } from 'react';
import { 
  Lock, Unlock, Database, Eye, RefreshCw, Split, 
  Play, RotateCcw, Lightbulb 
} from 'lucide-react';

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
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {(Object.keys(levels) as Array<keyof typeof levels>).map(level => (
          <button
            key={level}
            onClick={() => { setActiveLevel(level); resetSimulation(); }}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-bold transition-colors whitespace-nowrap ${
              activeLevel === level 
                ? `bg-${levels[level].color}-500/30 text-${levels[level].color}-400 border border-${levels[level].color}-500`
                : 'bg-dark-700 text-slate-400 hover:text-white'
            }`}
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

export default IsolationLevelsViz;
