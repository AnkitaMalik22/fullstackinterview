import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  GitCompare, Timer, Layers, Paintbrush, Play, Pause, RotateCcw,
  ArrowRight, Clock, Zap, Eye, Box, AlertCircle
} from 'lucide-react';

// ============================================
// VIRTUAL DOM DIFFING VISUALIZER
// ============================================
const VirtualDOMViz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scenario, setScenario] = useState<'update' | 'reorder' | 'add-remove'>('update');

  const scenarios = {
    update: {
      title: 'Property Update',
      oldTree: [
        { id: 1, tag: 'div', props: { class: 'container' }, children: [
          { id: 2, tag: 'h1', props: { class: 'title' }, text: 'Hello' },
          { id: 3, tag: 'p', props: { class: 'text' }, text: 'World' },
        ]},
      ],
      newTree: [
        { id: 1, tag: 'div', props: { class: 'container' }, children: [
          { id: 2, tag: 'h1', props: { class: 'title active' }, text: 'Hello' },
          { id: 3, tag: 'p', props: { class: 'text' }, text: 'React!' },
        ]},
      ],
      steps: [
        { desc: 'Compare root <div> - Same', action: 'compare', nodeId: 1, result: 'same' },
        { desc: 'Compare <h1> - Class changed!', action: 'compare', nodeId: 2, result: 'prop-change' },
        { desc: 'Patch: setAttribute("class", "title active")', action: 'patch', nodeId: 2 },
        { desc: 'Compare <p> - Text changed!', action: 'compare', nodeId: 3, result: 'text-change' },
        { desc: 'Patch: textContent = "React!"', action: 'patch', nodeId: 3 },
        { desc: 'Diff complete - 2 DOM updates', action: 'done' },
      ]
    },
    reorder: {
      title: 'List Reorder (Keys)',
      oldTree: [
        { id: 'list', tag: 'ul', children: [
          { id: 'a', tag: 'li', key: 'a', text: 'Apple' },
          { id: 'b', tag: 'li', key: 'b', text: 'Banana' },
          { id: 'c', tag: 'li', key: 'c', text: 'Cherry' },
        ]},
      ],
      newTree: [
        { id: 'list', tag: 'ul', children: [
          { id: 'c', tag: 'li', key: 'c', text: 'Cherry' },
          { id: 'a', tag: 'li', key: 'a', text: 'Apple' },
          { id: 'b', tag: 'li', key: 'b', text: 'Banana' },
        ]},
      ],
      steps: [
        { desc: 'Compare <ul> children by key', action: 'compare', nodeId: 'list', result: 'reorder' },
        { desc: 'Key "c" moved to position 0', action: 'move', nodeId: 'c' },
        { desc: 'Key "a" stays at position 1', action: 'skip', nodeId: 'a' },
        { desc: 'Key "b" stays at position 2', action: 'skip', nodeId: 'b' },
        { desc: 'Diff complete - 1 DOM move (not 3 recreates!)', action: 'done' },
      ]
    },
    'add-remove': {
      title: 'Add/Remove Nodes',
      oldTree: [
        { id: 1, tag: 'div', children: [
          { id: 2, tag: 'span', text: 'Keep' },
          { id: 3, tag: 'span', text: 'Remove' },
        ]},
      ],
      newTree: [
        { id: 1, tag: 'div', children: [
          { id: 2, tag: 'span', text: 'Keep' },
          { id: 4, tag: 'button', text: 'New!' },
        ]},
      ],
      steps: [
        { desc: 'Compare <div> children', action: 'compare', nodeId: 1, result: 'children-changed' },
        { desc: 'Child 0: <span> unchanged', action: 'skip', nodeId: 2 },
        { desc: 'Child 1: Tag mismatch (span → button)', action: 'compare', nodeId: 3, result: 'replace' },
        { desc: 'Remove old <span>', action: 'remove', nodeId: 3 },
        { desc: 'Create new <button>', action: 'create', nodeId: 4 },
        { desc: 'Diff complete - 1 remove, 1 create', action: 'done' },
      ]
    }
  };

  const current = scenarios[scenario];

  useEffect(() => {
    if (isPlaying && step < current.steps.length) {
      const timer = setTimeout(() => setStep(s => s + 1), 1200);
      return () => clearTimeout(timer);
    } else if (step >= current.steps.length) {
      setIsPlaying(false);
    }
  }, [isPlaying, step, current.steps.length]);

  const reset = () => { setStep(0); setIsPlaying(false); };

  const renderNode = (node: any, depth = 0, highlightId?: string | number, highlightType?: string) => {
    const isHighlighted = node.id === highlightId;
    const bgColor = isHighlighted 
      ? highlightType === 'prop-change' || highlightType === 'text-change' ? 'bg-yellow-500/30 border-yellow-500' 
      : highlightType === 'replace' || highlightType === 'remove' ? 'bg-red-500/30 border-red-500'
      : highlightType === 'create' ? 'bg-green-500/30 border-green-500'
      : highlightType === 'move' ? 'bg-purple-500/30 border-purple-500'
      : 'bg-blue-500/30 border-blue-500'
      : 'bg-dark-700 border-dark-600';

    return (
      <div key={node.id} style={{ marginLeft: depth * 16 }} className={`p-2 rounded border mb-1 ${bgColor} transition-all`}>
        <span className="text-xs font-mono">
          <span className="text-purple-400">&lt;{node.tag}</span>
          {node.props && Object.entries(node.props).map(([k, v]) => (
            <span key={k} className="text-green-400"> {k}="{String(v)}"</span>
          ))}
          {node.key && <span className="text-yellow-400"> key="{node.key}"</span>}
          <span className="text-purple-400">&gt;</span>
          {node.text && <span className="text-white">{node.text}</span>}
        </span>
        {node.children?.map((child: any) => renderNode(child, depth + 1, highlightId, highlightType))}
      </div>
    );
  };

  const currentStep = current.steps[step - 1];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <GitCompare className="text-blue-400" size={24} />
          Virtual DOM Diffing
        </h3>
        <div className="flex gap-2">
          {(['update', 'reorder', 'add-remove'] as const).map(s => (
            <button
              key={s}
              onClick={() => { setScenario(s); reset(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                scenario === s ? 'bg-brand-600 text-white' : 'bg-dark-700 text-slate-400 hover:text-white'
              }`}
            >
              {s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
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

        {/* Trees comparison */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h5 className="text-sm font-bold text-slate-400 mb-3">Old Virtual DOM</h5>
            <div className="bg-dark-900 p-4 rounded-lg">
              {current.oldTree.map(node => renderNode(node, 0, currentStep?.nodeId, currentStep?.result))}
            </div>
          </div>
          <div>
            <h5 className="text-sm font-bold text-slate-400 mb-3">New Virtual DOM</h5>
            <div className="bg-dark-900 p-4 rounded-lg">
              {current.newTree.map(node => renderNode(node, 0))}
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-2">
          <h5 className="text-sm font-bold text-white">Diff Algorithm Steps</h5>
          {current.steps.map((s, i) => (
            <div
              key={i}
              className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-3 ${
                i < step
                  ? s.action === 'patch' || s.action === 'create' ? 'bg-green-500/20 text-green-400'
                  : s.action === 'remove' ? 'bg-red-500/20 text-red-400'
                  : s.action === 'move' ? 'bg-purple-500/20 text-purple-400'
                  : s.action === 'done' ? 'bg-brand-500/20 text-brand-400'
                  : 'bg-dark-700 text-slate-300'
                  : i === step
                  ? 'bg-yellow-500/20 text-yellow-400 animate-pulse'
                  : 'bg-dark-900 text-slate-600'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-dark-800 flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              {s.desc}
            </div>
          ))}
        </div>

        <div className="mt-6 bg-dark-900 p-4 rounded-lg">
          <h5 className="text-sm font-bold text-white mb-2">Key Insight</h5>
          <p className="text-xs text-slate-400">
            React's diffing uses O(n) heuristics: same component type = update, different = replace.
            <strong className="text-white"> Keys</strong> are crucial for list reordering - they let React identify which items moved vs. changed.
          </p>
        </div>
      </div>
    </div>
  );
};

// ============================================
// DEBOUNCE/THROTTLE VISUALIZER
// ============================================
const DebounceThrottleViz: React.FC = () => {
  const [mode, setMode] = useState<'debounce' | 'throttle'>('debounce');
  const [delay] = useState(500);
  const [rawEvents, setRawEvents] = useState<number[]>([]);
  const [processedEvents, setProcessedEvents] = useState<number[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const throttleLastRun = useRef(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    startTime.current = Date.now();
    setRawEvents([]);
    setProcessedEvents([]);
  }, [mode]);

  const handleInput = useCallback(() => {
    const now = Date.now() - startTime.current;
    setRawEvents(prev => [...prev, now]);

    if (mode === 'debounce') {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        const processedTime = Date.now() - startTime.current;
        setProcessedEvents(prev => [...prev, processedTime]);
      }, delay);
    } else {
      // Throttle
      if (now - throttleLastRun.current >= delay) {
        throttleLastRun.current = now;
        setProcessedEvents(prev => [...prev, now]);
      }
    }
  }, [mode, delay]);

  const reset = () => {
    startTime.current = Date.now();
    setRawEvents([]);
    setProcessedEvents([]);
    throttleLastRun.current = 0;
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
  };

  const maxTime = Math.max(...rawEvents, ...processedEvents, 3000);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Timer className="text-green-400" size={24} />
          Debounce vs Throttle
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setMode('debounce')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              mode === 'debounce' ? 'bg-brand-600 text-white' : 'bg-dark-700 text-slate-400 hover:text-white'
            }`}
          >
            Debounce
          </button>
          <button
            onClick={() => setMode('throttle')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              mode === 'throttle' ? 'bg-brand-600 text-white' : 'bg-dark-700 text-slate-400 hover:text-white'
            }`}
          >
            Throttle
          </button>
        </div>
      </div>

      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
        <div className="mb-6">
          <h4 className="text-lg font-bold text-white mb-2">
            {mode === 'debounce' ? 'Debounce' : 'Throttle'} Demo ({delay}ms)
          </h4>
          <p className="text-sm text-slate-400">
            {mode === 'debounce' 
              ? 'Waits until you stop triggering for 500ms, then fires once.' 
              : 'Fires at most once per 500ms, ignoring events in between.'}
          </p>
        </div>

        {/* Input trigger */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleInput}
            className="flex-1 py-4 bg-brand-600 text-white rounded-xl font-bold text-lg hover:bg-brand-500 active:scale-98 transition-all"
          >
            Click Rapidly! 
          </button>
          <button onClick={reset} className="px-4 bg-dark-700 text-slate-400 rounded-xl hover:text-white">
            <RotateCcw size={20} />
          </button>
        </div>

        {/* Timeline visualization */}
        <div className="space-y-4">
          {/* Raw events */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm text-slate-400">Raw Events ({rawEvents.length})</span>
            </div>
            <div ref={timelineRef} className="h-12 bg-dark-900 rounded-lg relative overflow-hidden">
              {rawEvents.map((t, i) => (
                <div
                  key={i}
                  className="absolute top-2 w-2 h-8 bg-red-500 rounded-full"
                  style={{ left: `${(t / maxTime) * 100}%` }}
                />
              ))}
            </div>
          </div>

          {/* Processed events */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-slate-400">
                {mode === 'debounce' ? 'Debounced' : 'Throttled'} Output ({processedEvents.length})
              </span>
            </div>
            <div className="h-12 bg-dark-900 rounded-lg relative overflow-hidden">
              {processedEvents.map((t, i) => (
                <div
                  key={i}
                  className="absolute top-2 w-4 h-8 bg-green-500 rounded-full"
                  style={{ left: `${(t / maxTime) * 100}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Code example */}
        <div className="mt-6 bg-dark-900 p-4 rounded-lg">
          <h5 className="text-sm font-bold text-white mb-3">Implementation</h5>
          <pre className="text-xs text-green-400 font-mono overflow-x-auto">
{mode === 'debounce' ? `function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

// Usage: Search input
const debouncedSearch = debounce(search, 300);
input.addEventListener('input', debouncedSearch);` 
: `function throttle(fn, delay) {
  let lastRun = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastRun >= delay) {
      lastRun = now;
      fn(...args);
    }
  };
}

// Usage: Scroll handler
const throttledScroll = throttle(onScroll, 100);
window.addEventListener('scroll', throttledScroll);`}
          </pre>
        </div>

        {/* Use cases */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg border ${mode === 'debounce' ? 'bg-brand-500/10 border-brand-500' : 'bg-dark-700 border-dark-600'}`}>
            <h5 className="text-sm font-bold text-white mb-2">Debounce Use Cases</h5>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>• Search-as-you-type</li>
              <li>• Window resize handlers</li>
              <li>• Auto-save drafts</li>
              <li>• Form validation</li>
            </ul>
          </div>
          <div className={`p-4 rounded-lg border ${mode === 'throttle' ? 'bg-brand-500/10 border-brand-500' : 'bg-dark-700 border-dark-600'}`}>
            <h5 className="text-sm font-bold text-white mb-2">Throttle Use Cases</h5>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>• Scroll event tracking</li>
              <li>• Button click (prevent double)</li>
              <li>• Game loop updates</li>
              <li>• API rate limiting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// EVENT LOOP VISUALIZER
// ============================================
const EventLoopViz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scenario, setScenario] = useState<'basic' | 'promises' | 'mixed'>('basic');

  const scenarios = {
    basic: {
      title: 'Sync vs Async',
      code: `console.log('Start');
setTimeout(() => console.log('Timer'), 0);
console.log('End');`,
      steps: [
        { callStack: ['main()'], taskQueue: [], microQueue: [], output: [], desc: 'Script starts executing' },
        { callStack: ['console.log("Start")'], taskQueue: [], microQueue: [], output: ['Start'], desc: 'Log "Start"' },
        { callStack: ['setTimeout()'], taskQueue: [], microQueue: [], output: ['Start'], desc: 'setTimeout called, callback queued' },
        { callStack: [], taskQueue: ['Timer callback'], microQueue: [], output: ['Start'], desc: 'setTimeout returns, callback in Task Queue' },
        { callStack: ['console.log("End")'], taskQueue: ['Timer callback'], microQueue: [], output: ['Start', 'End'], desc: 'Log "End"' },
        { callStack: [], taskQueue: ['Timer callback'], microQueue: [], output: ['Start', 'End'], desc: 'Call stack empty, check queues' },
        { callStack: ['Timer callback'], taskQueue: [], microQueue: [], output: ['Start', 'End', 'Timer'], desc: 'Timer callback executed' },
      ]
    },
    promises: {
      title: 'Microtasks (Promises)',
      code: `console.log('Start');
Promise.resolve().then(() => console.log('Promise'));
console.log('End');`,
      steps: [
        { callStack: ['main()'], taskQueue: [], microQueue: [], output: [], desc: 'Script starts' },
        { callStack: ['console.log("Start")'], taskQueue: [], microQueue: [], output: ['Start'], desc: 'Log "Start"' },
        { callStack: ['Promise.resolve().then()'], taskQueue: [], microQueue: [], output: ['Start'], desc: 'Promise resolved, .then callback queued' },
        { callStack: [], taskQueue: [], microQueue: ['Promise callback'], output: ['Start'], desc: 'Callback added to Microtask Queue' },
        { callStack: ['console.log("End")'], taskQueue: [], microQueue: ['Promise callback'], output: ['Start', 'End'], desc: 'Log "End"' },
        { callStack: [], taskQueue: [], microQueue: ['Promise callback'], output: ['Start', 'End'], desc: 'Stack empty → Drain Microtask Queue' },
        { callStack: ['Promise callback'], taskQueue: [], microQueue: [], output: ['Start', 'End', 'Promise'], desc: 'Promise callback executed' },
      ]
    },
    mixed: {
      title: 'Mixed: Macro + Micro',
      code: `console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');`,
      steps: [
        { callStack: ['main()'], taskQueue: [], microQueue: [], output: [], desc: 'Script starts' },
        { callStack: ['log("1")'], taskQueue: [], microQueue: [], output: ['1'], desc: 'Log "1"' },
        { callStack: ['setTimeout()'], taskQueue: ['Timer: log("2")'], microQueue: [], output: ['1'], desc: 'Timer callback → Task Queue' },
        { callStack: ['Promise.then()'], taskQueue: ['Timer'], microQueue: ['Promise: log("3")'], output: ['1'], desc: 'Promise callback → Microtask Queue' },
        { callStack: ['log("4")'], taskQueue: ['Timer'], microQueue: ['Promise'], output: ['1', '4'], desc: 'Log "4"' },
        { callStack: [], taskQueue: ['Timer'], microQueue: ['Promise'], output: ['1', '4'], desc: 'Stack empty → Microtasks first!' },
        { callStack: ['Promise callback'], taskQueue: ['Timer'], microQueue: [], output: ['1', '4', '3'], desc: 'Microtask: Log "3"' },
        { callStack: [], taskQueue: ['Timer'], microQueue: [], output: ['1', '4', '3'], desc: 'Microtasks done → Task Queue' },
        { callStack: ['Timer callback'], taskQueue: [], microQueue: [], output: ['1', '4', '3', '2'], desc: 'Task: Log "2"' },
      ]
    }
  };

  const current = scenarios[scenario];

  useEffect(() => {
    if (isPlaying && step < current.steps.length - 1) {
      const timer = setTimeout(() => setStep(s => s + 1), 1500);
      return () => clearTimeout(timer);
    } else if (step >= current.steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, step, current.steps.length]);

  const reset = () => { setStep(0); setIsPlaying(false); };
  const currentState = current.steps[step];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Layers className="text-purple-400" size={24} />
          JavaScript Event Loop
        </h3>
        <div className="flex gap-2">
          {(['basic', 'promises', 'mixed'] as const).map(s => (
            <button
              key={s}
              onClick={() => { setScenario(s); reset(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                scenario === s ? 'bg-brand-600 text-white' : 'bg-dark-700 text-slate-400 hover:text-white'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
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
            <button 
              onClick={() => setStep(s => Math.min(s + 1, current.steps.length - 1))} 
              className="p-2 rounded-lg bg-dark-700 text-slate-400 hover:text-white"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Code display */}
        <div className="bg-dark-900 p-4 rounded-lg mb-6">
          <pre className="text-sm text-green-400 font-mono">{current.code}</pre>
        </div>

        {/* Visual representation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {/* Call Stack */}
          <div className="bg-dark-900 rounded-xl p-4 border-2 border-blue-500/50">
            <h5 className="text-xs font-bold text-blue-400 mb-3 flex items-center gap-2">
              <Box size={14} /> Call Stack
            </h5>
            <div className="space-y-1 min-h-[80px] flex flex-col-reverse">
              {currentState.callStack.map((item, i) => (
                <div key={i} className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded font-mono animate-fadeIn">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Task Queue (Macrotasks) */}
          <div className="bg-dark-900 rounded-xl p-4 border-2 border-yellow-500/50">
            <h5 className="text-xs font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <Clock size={14} /> Task Queue
            </h5>
            <div className="space-y-1 min-h-[80px]">
              {currentState.taskQueue.map((item, i) => (
                <div key={i} className="bg-yellow-500/20 text-yellow-300 text-xs px-2 py-1 rounded font-mono">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Microtask Queue */}
          <div className="bg-dark-900 rounded-xl p-4 border-2 border-purple-500/50">
            <h5 className="text-xs font-bold text-purple-400 mb-3 flex items-center gap-2">
              <Zap size={14} /> Microtask Queue
            </h5>
            <div className="space-y-1 min-h-[80px]">
              {currentState.microQueue.map((item, i) => (
                <div key={i} className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded font-mono">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Console Output */}
          <div className="bg-dark-900 rounded-xl p-4 border-2 border-green-500/50">
            <h5 className="text-xs font-bold text-green-400 mb-3 flex items-center gap-2">
              <Eye size={14} /> Console
            </h5>
            <div className="space-y-1 min-h-[80px]">
              {currentState.output.map((item, i) => (
                <div key={i} className="text-green-300 text-xs font-mono">
                  &gt; {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Current step description */}
        <div className="bg-brand-500/10 border border-brand-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center text-xs font-bold text-white">
              {step + 1}
            </span>
            <span className="text-sm text-white">{currentState.desc}</span>
          </div>
        </div>

        {/* Key insight */}
        <div className="mt-6 bg-dark-900 p-4 rounded-lg">
          <h5 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <AlertCircle size={16} className="text-yellow-400" /> Interview Key Points
          </h5>
          <ul className="text-xs text-slate-400 space-y-1">
            <li>• <strong className="text-white">Microtasks</strong> (Promises, queueMicrotask) run <em>before</em> the next macrotask</li>
            <li>• <strong className="text-white">Macrotasks</strong> (setTimeout, setInterval, I/O) run one per event loop iteration</li>
            <li>• After each macrotask, ALL microtasks are drained before the next macrotask</li>
            <li>• This is why Promise.then() runs before setTimeout(..., 0)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// ============================================
// RENDERING PIPELINE VISUALIZER
// ============================================
const RenderingPipelineViz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const pipelineSteps = [
    {
      name: 'JavaScript',
      color: 'yellow',
      icon: <Box size={20} />,
      desc: 'Execute JS, handle events, modify DOM',
      detail: 'React reconciliation, state updates, DOM mutations',
      duration: '~3-10ms',
    },
    {
      name: 'Style',
      color: 'purple',
      icon: <Paintbrush size={20} />,
      desc: 'Compute styles (CSS → Computed Styles)',
      detail: 'Match selectors, calculate specificity, inherit values',
      duration: '~1-2ms',
    },
    {
      name: 'Layout',
      color: 'blue',
      icon: <Layers size={20} />,
      desc: 'Calculate geometry (position, size)',
      detail: 'Box model, flexbox/grid layout, text wrapping',
      duration: '~2-5ms',
    },
    {
      name: 'Paint',
      color: 'green',
      icon: <Paintbrush size={20} />,
      desc: 'Fill in pixels (colors, images, text)',
      detail: 'Create paint records, rasterize layers',
      duration: '~1-3ms',
    },
    {
      name: 'Composite',
      color: 'orange',
      icon: <Layers size={20} />,
      desc: 'Combine layers, GPU acceleration',
      detail: 'Layer ordering, transforms, opacity (GPU-accelerated)',
      duration: '~0.5-1ms',
    },
  ];

  useEffect(() => {
    if (isPlaying && step < pipelineSteps.length) {
      const timer = setTimeout(() => setStep(s => s + 1), 1500);
      return () => clearTimeout(timer);
    } else if (step >= pipelineSteps.length) {
      setIsPlaying(false);
    }
  }, [isPlaying, step]);

  const reset = () => { setStep(0); setIsPlaying(false); };

  const colorClasses: Record<string, string> = {
    yellow: 'bg-yellow-500/20 border-yellow-500 text-yellow-400',
    purple: 'bg-purple-500/20 border-purple-500 text-purple-400',
    blue: 'bg-blue-500/20 border-blue-500 text-blue-400',
    green: 'bg-green-500/20 border-green-500 text-green-400',
    orange: 'bg-orange-500/20 border-orange-500 text-orange-400',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Paintbrush className="text-pink-400" size={24} />
          Browser Rendering Pipeline
        </h3>
        <div className="flex gap-2">
          <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 rounded-lg bg-brand-600 text-white">
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button onClick={reset} className="p-2 rounded-lg bg-dark-700 text-slate-400 hover:text-white">
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
        <div className="mb-6">
          <h4 className="text-lg font-bold text-white mb-2">Critical Rendering Path</h4>
          <p className="text-sm text-slate-400">
            Every frame (16.67ms for 60fps) goes through this pipeline. Optimize to avoid expensive steps!
          </p>
        </div>

        {/* Pipeline visualization */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {pipelineSteps.map((ps, i) => (
            <React.Fragment key={i}>
              <div
                className={`p-4 rounded-xl border-2 transition-all duration-500 flex-1 min-w-[150px] ${
                  i < step ? colorClasses[ps.color] : 'bg-dark-700 border-dark-600 text-slate-500'
                } ${i === step ? 'scale-110 shadow-lg animate-pulse' : ''}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {ps.icon}
                  <span className="font-bold text-sm">{ps.name}</span>
                </div>
                <p className="text-xs opacity-80">{ps.desc}</p>
                <p className="text-xs mt-1 opacity-60">{ps.duration}</p>
              </div>
              {i < pipelineSteps.length - 1 && (
                <ArrowRight size={20} className="text-slate-600 flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Current step detail */}
        {step > 0 && step <= pipelineSteps.length && (
          <div className={`p-4 rounded-lg border-2 mb-6 ${colorClasses[pipelineSteps[step - 1].color]}`}>
            <h5 className="font-bold mb-2">{pipelineSteps[step - 1].name} Phase</h5>
            <p className="text-sm opacity-80">{pipelineSteps[step - 1].detail}</p>
          </div>
        )}

        {/* Optimization tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-dark-900 p-4 rounded-lg">
            <h5 className="text-sm font-bold text-green-400 mb-2">✓ Composite Only</h5>
            <p className="text-xs text-slate-400 mb-2">
              Use <code className="bg-dark-700 px-1 rounded">transform</code> and <code className="bg-dark-700 px-1 rounded">opacity</code>
            </p>
            <p className="text-xs text-slate-500">Skips Layout & Paint = smooth 60fps animations</p>
          </div>
          <div className="bg-dark-900 p-4 rounded-lg">
            <h5 className="text-sm font-bold text-yellow-400 mb-2">⚠️ Avoid Layout Thrashing</h5>
            <p className="text-xs text-slate-400 mb-2">
              Don't read then write DOM in loops
            </p>
            <p className="text-xs text-slate-500">Batch reads, then batch writes</p>
          </div>
          <div className="bg-dark-900 p-4 rounded-lg">
            <h5 className="text-sm font-bold text-red-400 mb-2">✗ Expensive Properties</h5>
            <p className="text-xs text-slate-400 mb-2">
              <code className="bg-dark-700 px-1 rounded">width</code>, <code className="bg-dark-700 px-1 rounded">height</code>, <code className="bg-dark-700 px-1 rounded">top</code>
            </p>
            <p className="text-xs text-slate-500">Trigger full Layout → Paint → Composite</p>
          </div>
        </div>

        {/* Will-change and layers */}
        <div className="mt-6 bg-dark-900 p-4 rounded-lg">
          <h5 className="text-sm font-bold text-white mb-3">Layer Promotion (GPU Acceleration)</h5>
          <pre className="text-xs text-green-400 font-mono mb-3">
{`.animated-element {
  will-change: transform;  /* Hint to browser */
  transform: translateZ(0); /* Force layer */
}`}
          </pre>
          <p className="text-xs text-slate-400">
            Elements with <code>transform</code>, <code>opacity</code>, or <code>will-change</code> get their own compositing layer.
            Animating these skips Layout and Paint entirely!
          </p>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN EXPORT
// ============================================
export const FrontendDSADemo: React.FC = () => {
  const [activeViz, setActiveViz] = useState('virtualdom');

  const visualizers = [
    { id: 'virtualdom', label: 'Virtual DOM', icon: <GitCompare size={16} /> },
    { id: 'debounce', label: 'Debounce/Throttle', icon: <Timer size={16} /> },
    { id: 'eventloop', label: 'Event Loop', icon: <Layers size={16} /> },
    { id: 'rendering', label: 'Rendering Pipeline', icon: <Paintbrush size={16} /> },
  ];

  return (
    <div className="space-y-6 animate-fadeIn px-4 md:px-0">
      {/* Mobile-optimized horizontal scroll tabs */}
      <div className="relative -mx-4 md:mx-0">
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-dark-700 mb-6 scrollbar-hide px-4 md:px-0">
          {visualizers.map(v => (
            <button
              key={v.id}
              onClick={() => setActiveViz(v.id)}
              className={`flex-shrink-0 px-3 md:px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-2 touch-manipulation ${
                activeViz === v.id
                  ? 'bg-white text-black'
                  : 'bg-dark-800 text-slate-400 hover:text-white'
              }`}
            >
              {v.icon}
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {activeViz === 'virtualdom' && <VirtualDOMViz />}
      {activeViz === 'debounce' && <DebounceThrottleViz />}
      {activeViz === 'eventloop' && <EventLoopViz />}
      {activeViz === 'rendering' && <RenderingPipelineViz />}
    </div>
  );
};

export default FrontendDSADemo;
