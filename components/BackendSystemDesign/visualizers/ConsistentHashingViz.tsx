import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Circle, Plus, Trash2 } from 'lucide-react';

const ConsistentHashingViz: React.FC = () => {
  const [nodes, setNodes] = useState([
    { id: 'A', position: 0 },
    { id: 'B', position: 120 },
    { id: 'C', position: 240 }
  ]);
  const [keys, setKeys] = useState<Array<{ id: string; position: number }>>([]);
  const keyCounter = useRef(0);

  const addNode = () => {
    const newId = String.fromCharCode(65 + nodes.length);
    const position = Math.floor(Math.random() * 360);
    setNodes(prev => [...prev, { id: newId, position }].sort((a, b) => a.position - b.position));
  };

  const addKey = () => {
    const position = Math.floor(Math.random() * 360);
    setKeys(prev => [...prev, { id: `k${keyCounter.current++}`, position }]);
  };

  const getResponsibleNode = useCallback((keyPosition: number) => {
    const sortedNodes = [...nodes].sort((a, b) => a.position - b.position);
    for (const node of sortedNodes) {
      if (node.position >= keyPosition) return node.id;
    }
    return sortedNodes[0]?.id; // Wrap around
  }, [nodes]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Circle className="text-purple-400" size={24} />
          Consistent Hashing
        </h3>
        <div className="flex gap-2">
          <button onClick={addNode} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white">
            <Plus size={14} /> Add Node
          </button>
          <button onClick={addKey} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-green-600 text-white">
            <Plus size={14} /> Add Key
          </button>
          <button
            onClick={() => { setNodes([{ id: 'A', position: 0 }, { id: 'B', position: 120 }, { id: 'C', position: 240 }]); setKeys([]); }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-dark-700 text-slate-400 hover:text-white"
          >
            <Trash2 size={14} /> Reset
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Hash Ring Visualization */}
        <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
          <h4 className="text-lg font-bold text-white mb-4">Hash Ring</h4>
          <div className="relative w-64 h-64 mx-auto">
            {/* Ring */}
            <svg className="w-full h-full">
              <circle
                cx="128" cy="128" r="100"
                fill="none"
                stroke="#374151"
                strokeWidth="4"
              />
              {/* Nodes */}
              {nodes.map(node => {
                const angle = (node.position * Math.PI * 2) / 360 - Math.PI / 2;
                const x = 128 + 100 * Math.cos(angle);
                const y = 128 + 100 * Math.sin(angle);
                return (
                  <g key={node.id}>
                    <circle cx={x} cy={y} r="16" fill="#3b82f6" />
                    <text x={x} y={y + 5} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                      {node.id}
                    </text>
                  </g>
                );
              })}
              {/* Keys */}
              {keys.map(key => {
                const angle = (key.position * Math.PI * 2) / 360 - Math.PI / 2;
                const x = 128 + 100 * Math.cos(angle);
                const y = 128 + 100 * Math.sin(angle);
                const responsibleNode = getResponsibleNode(key.position);
                return (
                  <g key={key.id}>
                    <circle cx={x} cy={y} r="8" fill="#10b981" />
                    <text x={x} y={y - 15} textAnchor="middle" fill="#9ca3af" fontSize="10">
                      → {responsibleNode}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Key Assignment Table */}
        <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
          <h4 className="text-lg font-bold text-white mb-4">Key Assignments</h4>
          <div className="space-y-4">
            <div className="text-sm text-slate-400 mb-4">
              Keys are assigned to the <span className="text-blue-400">first node clockwise</span> from their position.
            </div>
            {keys.length === 0 ? (
              <p className="text-slate-500 text-sm">Add some keys to see assignments</p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {keys.map(key => (
                  <div key={key.id} className="flex items-center justify-between p-2 bg-dark-700 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-white text-sm font-mono">{key.id}</span>
                      <span className="text-slate-500 text-xs">@{key.position}°</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-slate-400 text-xs">→</span>
                      <span className="text-blue-400 font-bold">Node {getResponsibleNode(key.position)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <h5 className="text-yellow-400 font-bold text-sm mb-2">Why Consistent Hashing?</h5>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>• <strong>Minimal redistribution</strong>: Adding/removing nodes only affects nearby keys</li>
              <li>• <strong>Virtual nodes</strong>: Multiple positions per node for better distribution</li>
              <li>• <strong>Used by</strong>: DynamoDB, Cassandra, Memcached</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsistentHashingViz;
