import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Code, Play, Pause, RotateCcw, ChevronRight, Zap, Timer, Search, GitMerge, Layers, Target, ArrowUpDown, Shuffle } from 'lucide-react';

// --- TAB NAVIGATION ---
interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { id: 'sorting', label: 'Sorting', icon: <ArrowUpDown size={16} /> },
  { id: 'searching', label: 'Searching', icon: <Search size={16} /> },
  { id: 'recursion', label: 'Recursion', icon: <Layers size={16} /> },
  { id: 'dp', label: 'Dynamic Programming', icon: <Target size={16} /> },
  { id: 'greedy', label: 'Greedy', icon: <Zap size={16} /> },
  { id: 'backtracking', label: 'Backtracking', icon: <GitMerge size={16} /> },
];

// --- SORTING VISUALIZER (Enhanced) ---
type SortingAlgorithm = 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick' | 'heap';

const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [algorithm, setAlgorithm] = useState<SortingAlgorithm>('bubble');
  const [speed, setSpeed] = useState(50);
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0 });
  const stopRef = useRef(false);

  const generateArray = useCallback((size: number = 20) => {
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 5);
    setArray(newArray);
    setComparing([]);
    setSorted([]);
    setSwapping([]);
    setStats({ comparisons: 0, swaps: 0 });
  }, []);

  useEffect(() => {
    generateArray();
  }, [generateArray]);

  const delay = () => new Promise(resolve => setTimeout(resolve, 200 - speed * 1.9));

  const algorithms: Record<SortingAlgorithm, { name: string; time: string; space: string; stable: boolean }> = {
    bubble: { name: 'Bubble Sort', time: 'O(n²)', space: 'O(1)', stable: true },
    selection: { name: 'Selection Sort', time: 'O(n²)', space: 'O(1)', stable: false },
    insertion: { name: 'Insertion Sort', time: 'O(n²)', space: 'O(1)', stable: true },
    merge: { name: 'Merge Sort', time: 'O(n log n)', space: 'O(n)', stable: true },
    quick: { name: 'Quick Sort', time: 'O(n log n)', space: 'O(log n)', stable: false },
    heap: { name: 'Heap Sort', time: 'O(n log n)', space: 'O(1)', stable: false },
  };

  const bubbleSort = async () => {
    const arr = [...array];
    let comps = 0, swaps = 0;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (stopRef.current) return;
        setComparing([j, j + 1]);
        comps++;
        await delay();
        if (arr[j] > arr[j + 1]) {
          setSwapping([j, j + 1]);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swaps++;
          setArray([...arr]);
          await delay();
          setSwapping([]);
        }
        setStats({ comparisons: comps, swaps });
      }
      setSorted(prev => [...prev, arr.length - i - 1]);
    }
    setComparing([]);
    setSorted(arr.map((_, i) => i));
  };

  const selectionSort = async () => {
    const arr = [...array];
    let comps = 0, swaps = 0;
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (stopRef.current) return;
        setComparing([minIdx, j]);
        comps++;
        await delay();
        if (arr[j] < arr[minIdx]) minIdx = j;
        setStats({ comparisons: comps, swaps });
      }
      if (minIdx !== i) {
        setSwapping([i, minIdx]);
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        swaps++;
        setArray([...arr]);
        await delay();
        setSwapping([]);
      }
      setSorted(prev => [...prev, i]);
    }
    setComparing([]);
    setSorted(arr.map((_, i) => i));
  };

  const insertionSort = async () => {
    const arr = [...array];
    let comps = 0, swaps = 0;
    setSorted([0]);
    for (let i = 1; i < arr.length; i++) {
      let j = i;
      while (j > 0 && arr[j] < arr[j - 1]) {
        if (stopRef.current) return;
        setComparing([j, j - 1]);
        comps++;
        setSwapping([j, j - 1]);
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
        swaps++;
        setArray([...arr]);
        await delay();
        setSwapping([]);
        j--;
        setStats({ comparisons: comps, swaps });
      }
      setSorted(prev => [...prev, i]);
    }
    setComparing([]);
    setSorted(arr.map((_, i) => i));
  };

  const quickSort = async (arr: number[], low: number, high: number, comps: { val: number }, swaps: { val: number }): Promise<void> => {
    if (low < high) {
      const pivotIdx = await partition(arr, low, high, comps, swaps);
      await quickSort(arr, low, pivotIdx - 1, comps, swaps);
      await quickSort(arr, pivotIdx + 1, high, comps, swaps);
    }
  };

  const partition = async (arr: number[], low: number, high: number, comps: { val: number }, swaps: { val: number }): Promise<number> => {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (stopRef.current) return -1;
      setComparing([j, high]);
      comps.val++;
      await delay();
      if (arr[j] < pivot) {
        i++;
        setSwapping([i, j]);
        [arr[i], arr[j]] = [arr[j], arr[i]];
        swaps.val++;
        setArray([...arr]);
        await delay();
        setSwapping([]);
      }
      setStats({ comparisons: comps.val, swaps: swaps.val });
    }
    setSwapping([i + 1, high]);
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    swaps.val++;
    setArray([...arr]);
    await delay();
    setSwapping([]);
    setSorted(prev => [...prev, i + 1]);
    return i + 1;
  };

  const mergeSort = async (arr: number[], left: number, right: number, comps: { val: number }): Promise<void> => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSort(arr, left, mid, comps);
      await mergeSort(arr, mid + 1, right, comps);
      await merge(arr, left, mid, right, comps);
    }
  };

  const merge = async (arr: number[], left: number, mid: number, right: number, comps: { val: number }): Promise<void> => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      if (stopRef.current) return;
      setComparing([left + i, mid + 1 + j]);
      comps.val++;
      await delay();
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      setArray([...arr]);
      setSorted(prev => [...new Set([...prev, k])]);
      k++;
      setStats({ comparisons: comps.val, swaps: 0 });
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      setArray([...arr]);
      setSorted(prev => [...new Set([...prev, k])]);
      i++;
      k++;
      await delay();
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      setArray([...arr]);
      setSorted(prev => [...new Set([...prev, k])]);
      j++;
      k++;
      await delay();
    }
  };

  const runAlgorithm = async () => {
    setIsRunning(true);
    stopRef.current = false;
    setSorted([]);
    setStats({ comparisons: 0, swaps: 0 });
    const arr = [...array];

    switch (algorithm) {
      case 'bubble':
        await bubbleSort();
        break;
      case 'selection':
        await selectionSort();
        break;
      case 'insertion':
        await insertionSort();
        break;
      case 'quick':
        await quickSort(arr, 0, arr.length - 1, { val: 0 }, { val: 0 });
        if (!stopRef.current) setSorted(arr.map((_, i) => i));
        break;
      case 'merge':
        await mergeSort(arr, 0, arr.length - 1, { val: 0 });
        if (!stopRef.current) setSorted(arr.map((_, i) => i));
        break;
      default:
        await bubbleSort();
    }

    setComparing([]);
    setSwapping([]);
    setIsRunning(false);
  };

  const stop = () => {
    stopRef.current = true;
    setIsRunning(false);
  };

  return (
    <div className="space-y-6">
      {/* Algorithm Selection */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(algorithms) as SortingAlgorithm[]).map(alg => (
          <button
            key={alg}
            onClick={() => !isRunning && setAlgorithm(alg)}
            disabled={isRunning}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              algorithm === alg
                ? 'bg-brand-600 text-white'
                : 'bg-dark-700 text-slate-400 hover:text-white'
            } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {algorithms[alg].name}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex gap-2">
          {!isRunning ? (
            <button onClick={runAlgorithm} className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium flex items-center gap-2">
              <Play size={16} /> Run
            </button>
          ) : (
            <button onClick={stop} className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium flex items-center gap-2">
              <Pause size={16} /> Stop
            </button>
          )}
          <button 
            onClick={() => generateArray()} 
            disabled={isRunning}
            className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50"
          >
            <Shuffle size={16} /> New Array
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Speed:</span>
          <input
            type="range"
            min="10"
            max="100"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="w-20"
          />
        </div>
      </div>

      {/* Algorithm Info */}
      <div className="bg-dark-900 border border-dark-700 rounded-lg p-4 flex flex-wrap gap-6">
        <div>
          <span className="text-xs text-slate-500">Algorithm</span>
          <p className="text-brand-400 font-mono">{algorithms[algorithm].name}</p>
        </div>
        <div>
          <span className="text-xs text-slate-500">Time</span>
          <p className="text-yellow-400 font-mono">{algorithms[algorithm].time}</p>
        </div>
        <div>
          <span className="text-xs text-slate-500">Space</span>
          <p className="text-green-400 font-mono">{algorithms[algorithm].space}</p>
        </div>
        <div>
          <span className="text-xs text-slate-500">Stable</span>
          <p className={`font-mono ${algorithms[algorithm].stable ? 'text-green-400' : 'text-red-400'}`}>
            {algorithms[algorithm].stable ? 'Yes' : 'No'}
          </p>
        </div>
        <div>
          <span className="text-xs text-slate-500">Comparisons</span>
          <p className="text-white font-mono">{stats.comparisons}</p>
        </div>
        <div>
          <span className="text-xs text-slate-500">Swaps</span>
          <p className="text-white font-mono">{stats.swaps}</p>
        </div>
      </div>

      {/* Visualization */}
      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
        <div className="flex items-end justify-center gap-1 h-64">
          {array.map((val, idx) => (
            <div
              key={idx}
              className={`transition-all duration-100 rounded-t ${
                sorted.includes(idx)
                  ? 'bg-green-500'
                  : swapping.includes(idx)
                  ? 'bg-red-500'
                  : comparing.includes(idx)
                  ? 'bg-yellow-500'
                  : 'bg-brand-600'
              }`}
              style={{
                height: `${val * 2.5}px`,
                width: `${Math.max(8, Math.floor(500 / array.length))}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-brand-600"></div>
          <span className="text-slate-400">Default</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-500"></div>
          <span className="text-slate-400">Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500"></div>
          <span className="text-slate-400">Swapping</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500"></div>
          <span className="text-slate-400">Sorted</span>
        </div>
      </div>
    </div>
  );
};

// --- BINARY SEARCH VISUALIZER ---
const BinarySearchVisualizer: React.FC = () => {
  const [array] = useState([2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91]);
  const [target, setTarget] = useState(23);
  const [left, setLeft] = useState<number | null>(null);
  const [right, setRight] = useState<number | null>(null);
  const [mid, setMid] = useState<number | null>(null);
  const [found, setFound] = useState<number | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const search = async () => {
    setIsSearching(true);
    setSteps([]);
    setFound(null);
    
    let l = 0, r = array.length - 1;
    setLeft(l);
    setRight(r);
    
    while (l <= r) {
      const m = Math.floor((l + r) / 2);
      setMid(m);
      setSteps(prev => [...prev, `mid = (${l} + ${r}) / 2 = ${m}, array[${m}] = ${array[m]}`]);
      await new Promise(res => setTimeout(res, 1000));
      
      if (array[m] === target) {
        setFound(m);
        setSteps(prev => [...prev, `Found ${target} at index ${m}!`]);
        break;
      } else if (array[m] < target) {
        l = m + 1;
        setLeft(l);
        setSteps(prev => [...prev, `${array[m]} < ${target}, search right half`]);
      } else {
        r = m - 1;
        setRight(r);
        setSteps(prev => [...prev, `${array[m]} > ${target}, search left half`]);
      }
      await new Promise(res => setTimeout(res, 500));
    }
    
    if (found === null && l > r) {
      setSteps(prev => [...prev, `${target} not found in array`]);
    }
    
    setIsSearching(false);
  };

  const reset = () => {
    setLeft(null);
    setRight(null);
    setMid(null);
    setFound(null);
    setSteps([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">Target:</span>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
            className="w-20 px-2 py-1 bg-dark-700 border border-dark-600 rounded text-white text-sm"
            disabled={isSearching}
          />
        </div>
        <button
          onClick={search}
          disabled={isSearching}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-sm font-medium disabled:opacity-50"
        >
          <Search size={16} className="inline mr-2" /> Search
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg text-sm font-medium"
        >
          <RotateCcw size={16} className="inline mr-2" /> Reset
        </button>
      </div>

      {/* Array visualization */}
      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
        <div className="flex gap-2 justify-center mb-4">
          {array.map((val, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-mono text-sm border-2 transition-all ${
                  found === idx
                    ? 'bg-green-600 border-green-400 scale-110'
                    : mid === idx
                    ? 'bg-yellow-600 border-yellow-400'
                    : left !== null && right !== null && idx >= left && idx <= right
                    ? 'bg-brand-600 border-brand-400'
                    : 'bg-dark-700 border-dark-600 opacity-50'
                }`}
              >
                {val}
              </div>
              <span className="text-xs text-slate-500">{idx}</span>
            </div>
          ))}
        </div>

        {/* Pointers */}
        <div className="flex justify-center gap-8 text-xs">
          {left !== null && <span className="text-green-400">L={left}</span>}
          {mid !== null && <span className="text-yellow-400">M={mid}</span>}
          {right !== null && <span className="text-red-400">R={right}</span>}
        </div>
      </div>

      {/* Steps log */}
      {steps.length > 0 && (
        <div className="bg-dark-900 border border-dark-700 rounded-lg p-4 max-h-40 overflow-y-auto">
          {steps.map((step, idx) => (
            <div key={idx} className="text-sm font-mono text-slate-300 flex items-start gap-2">
              <ChevronRight size={14} className="text-brand-400 mt-0.5 shrink-0" />
              {step}
            </div>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
          <h4 className="font-bold text-white mb-2">Time Complexity</h4>
          <p className="text-green-400 font-mono">O(log n)</p>
          <p className="text-xs text-slate-400 mt-1">Halves search space each iteration</p>
        </div>
        <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
          <h4 className="font-bold text-white mb-2">Requirement</h4>
          <p className="text-yellow-400">Sorted Array</p>
          <p className="text-xs text-slate-400 mt-1">Won't work on unsorted data</p>
        </div>
      </div>
    </div>
  );
};

// --- RECURSION VISUALIZER ---
const RecursionVisualizer: React.FC = () => {
  const [n, setN] = useState(5);
  const [calls, setCalls] = useState<{ n: number; result: number | null; depth: number }[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedExample, setSelectedExample] = useState<'factorial' | 'fibonacci'>('factorial');

  const visualizeFactorial = async (num: number, depth: number = 0): Promise<number> => {
    setCalls(prev => [...prev, { n: num, result: null, depth }]);
    await new Promise(res => setTimeout(res, 500));
    
    if (num <= 1) {
      setCalls(prev => {
        const updated = [...prev];
        const idx = updated.findIndex(c => c.n === num && c.result === null);
        if (idx >= 0) updated[idx].result = 1;
        return updated;
      });
      return 1;
    }
    
    const result = num * await visualizeFactorial(num - 1, depth + 1);
    
    setCalls(prev => {
      const updated = [...prev];
      const idx = updated.findIndex(c => c.n === num && c.result === null);
      if (idx >= 0) updated[idx].result = result;
      return updated;
    });
    
    return result;
  };

  const run = async () => {
    setIsRunning(true);
    setCalls([]);
    await visualizeFactorial(n);
    setIsRunning(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">Calculate:</span>
          <input
            type="number"
            value={n}
            onChange={(e) => setN(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-16 px-2 py-1 bg-dark-700 border border-dark-600 rounded text-white text-sm"
            min="1"
            max="10"
            disabled={isRunning}
          />
          <span className="text-white">!</span>
        </div>
        <button
          onClick={run}
          disabled={isRunning}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-sm font-medium disabled:opacity-50"
        >
          <Play size={16} className="inline mr-2" /> Visualize
        </button>
      </div>

      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 overflow-x-auto">
        <div className="space-y-2 min-w-max">
          {calls.map((call, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2"
              style={{ marginLeft: `${call.depth * 24}px` }}
            >
              <div className={`px-3 py-1.5 rounded font-mono text-sm ${
                call.result !== null ? 'bg-green-600/20 border border-green-500' : 'bg-brand-600/20 border border-brand-500'
              }`}>
                factorial({call.n})
                {call.result !== null && (
                  <span className="text-green-400 ml-2">→ {call.result}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-dark-900 p-4 rounded-lg border border-dark-700">
        <h4 className="font-bold text-white mb-2">Recursion Pattern</h4>
        <pre className="text-sm text-slate-300 font-mono">
{`function factorial(n) {
  if (n <= 1) return 1;        // Base case
  return n * factorial(n - 1); // Recursive case
}`}
        </pre>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
          <h4 className="font-bold text-white mb-2">Call Stack</h4>
          <p className="text-sm text-slate-400">Each recursive call adds a frame to the call stack</p>
          <p className="text-yellow-400 text-sm mt-2">Space: O(n) for factorial</p>
        </div>
        <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
          <h4 className="font-bold text-white mb-2">Tail Recursion</h4>
          <p className="text-sm text-slate-400">Some languages optimize tail calls to O(1) space</p>
          <p className="text-green-400 text-sm mt-2">JavaScript doesn't guarantee TCO</p>
        </div>
      </div>
    </div>
  );
};

// --- DP VISUALIZER (Fibonacci) ---
const DPVisualizer: React.FC = () => {
  const [n, setN] = useState(10);
  const [memo, setMemo] = useState<(number | null)[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const run = async () => {
    setIsRunning(true);
    const dp: (number | null)[] = Array(n + 1).fill(null);
    dp[0] = 0;
    dp[1] = 1;
    setMemo([...dp]);
    await new Promise(res => setTimeout(res, 500));

    for (let i = 2; i <= n; i++) {
      setCurrentIdx(i);
      await new Promise(res => setTimeout(res, 300));
      dp[i] = (dp[i - 1] || 0) + (dp[i - 2] || 0);
      setMemo([...dp]);
      await new Promise(res => setTimeout(res, 200));
    }

    setCurrentIdx(null);
    setIsRunning(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">Fibonacci(</span>
          <input
            type="number"
            value={n}
            onChange={(e) => setN(Math.min(20, Math.max(2, parseInt(e.target.value) || 2)))}
            className="w-16 px-2 py-1 bg-dark-700 border border-dark-600 rounded text-white text-sm"
            min="2"
            max="20"
            disabled={isRunning}
          />
          <span className="text-sm text-slate-400">)</span>
        </div>
        <button
          onClick={run}
          disabled={isRunning}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-sm font-medium disabled:opacity-50"
        >
          <Play size={16} className="inline mr-2" /> Run DP
        </button>
      </div>

      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {memo.map((val, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center font-mono text-sm border-2 transition-all ${
                  val !== null
                    ? currentIdx === idx
                      ? 'bg-yellow-600 border-yellow-400'
                      : 'bg-green-600/50 border-green-500'
                    : 'bg-dark-700 border-dark-600'
                }`}
              >
                <span className="text-white">{val ?? '?'}</span>
              </div>
              <span className="text-xs text-slate-500">dp[{idx}]</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-dark-900 p-4 rounded-lg border border-dark-700">
        <h4 className="font-bold text-white mb-2">Bottom-Up DP Pattern</h4>
        <pre className="text-sm text-slate-300 font-mono">
{`dp[0] = 0, dp[1] = 1
for i from 2 to n:
    dp[i] = dp[i-1] + dp[i-2]`}
        </pre>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
          <h4 className="font-bold text-white mb-2">Naive Recursion</h4>
          <p className="text-red-400 font-mono">O(2ⁿ) time</p>
        </div>
        <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
          <h4 className="font-bold text-white mb-2">Memoization</h4>
          <p className="text-yellow-400 font-mono">O(n) time, O(n) space</p>
        </div>
        <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
          <h4 className="font-bold text-white mb-2">Tabulation</h4>
          <p className="text-green-400 font-mono">O(n) time, O(n)→O(1)</p>
        </div>
      </div>
    </div>
  );
};

// --- GREEDY PLACEHOLDER ---
const GreedyVisualizer: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-dark-800 p-8 rounded-xl border border-dark-700 text-center">
      <Zap className="mx-auto text-yellow-400 mb-4" size={48} />
      <h3 className="text-xl font-bold text-white mb-2">Greedy Algorithms</h3>
      <p className="text-slate-400">Make locally optimal choices at each step</p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-dark-900 p-4 rounded-lg border border-dark-700">
        <h4 className="font-bold text-white mb-3">Classic Problems</h4>
        <ul className="space-y-2 text-slate-400">
          <li className="flex items-start gap-2">
            <span className="text-brand-400">•</span>
            <span><strong>Coin Change (greedy doesn't always work!)</strong></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-400">•</span>
            <span><strong>Activity Selection</strong> - Max non-overlapping</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-400">•</span>
            <span><strong>Huffman Coding</strong> - Optimal prefix codes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-400">•</span>
            <span><strong>Fractional Knapsack</strong> - Take fractions</span>
          </li>
        </ul>
      </div>
      <div className="bg-dark-900 p-4 rounded-lg border border-dark-700">
        <h4 className="font-bold text-white mb-3">When to Use</h4>
        <ul className="space-y-2 text-slate-400">
          <li className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span>Optimal substructure exists</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span>Greedy choice property holds</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-400">✗</span>
            <span>Overlapping subproblems (use DP)</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

// --- BACKTRACKING N-QUEENS VISUALIZER ---
const BacktrackingVisualizer: React.FC = () => {
  const [n, setN] = useState(4);
  const [board, setBoard] = useState<number[][]>([]);
  const [currentRow, setCurrentRow] = useState<number | null>(null);
  const [currentCol, setCurrentCol] = useState<number | null>(null);
  const [attackedCells, setAttackedCells] = useState<Set<string>>(new Set());
  const [solutions, setSolutions] = useState<number[][][]>([]);
  const [currentSolution, setCurrentSolution] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [speed, setSpeed] = useState(50);
  const stopRef = useRef(false);

  const initBoard = useCallback((size: number) => {
    return Array(size).fill(null).map(() => Array(size).fill(0));
  }, []);

  useEffect(() => {
    setBoard(initBoard(n));
    setSolutions([]);
    setCurrentSolution(0);
    setLog([]);
  }, [n, initBoard]);

  const delay = () => new Promise(res => setTimeout(res, 300 - speed * 2.5));

  const isSafe = (board: number[][], row: number, col: number): boolean => {
    // Check column above
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 1) return false;
    }
    // Check upper-left diagonal
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 1) return false;
    }
    // Check upper-right diagonal
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 1) return false;
    }
    return true;
  };

  const getAttackedCells = (board: number[][], size: number): Set<string> => {
    const attacked = new Set<string>();
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] === 1) {
          // Mark entire row and column
          for (let i = 0; i < size; i++) {
            attacked.add(`${row}-${i}`);
            attacked.add(`${i}-${col}`);
          }
          // Mark diagonals
          for (let i = 1; i < size; i++) {
            if (row + i < size && col + i < size) attacked.add(`${row + i}-${col + i}`);
            if (row + i < size && col - i >= 0) attacked.add(`${row + i}-${col - i}`);
            if (row - i >= 0 && col + i < size) attacked.add(`${row - i}-${col + i}`);
            if (row - i >= 0 && col - i >= 0) attacked.add(`${row - i}-${col - i}`);
          }
        }
      }
    }
    return attacked;
  };

  const solveNQueens = async (board: number[][], row: number, foundSolutions: number[][][]): Promise<boolean> => {
    if (stopRef.current) return false;
    
    if (row === n) {
      // Found a solution
      const solution = board.map(r => [...r]);
      foundSolutions.push(solution);
      setSolutions([...foundSolutions]);
      setLog(prev => [...prev, `✓ Found solution #${foundSolutions.length}!`]);
      await delay();
      return true;
    }

    for (let col = 0; col < n; col++) {
      if (stopRef.current) return false;
      
      setCurrentRow(row);
      setCurrentCol(col);
      setLog(prev => [...prev, `Try queen at (${row}, ${col})`]);
      await delay();

      if (isSafe(board, row, col)) {
        board[row][col] = 1;
        setBoard([...board.map(r => [...r])]);
        setAttackedCells(getAttackedCells(board, n));
        setLog(prev => [...prev, `✓ Safe! Place queen at (${row}, ${col})`]);
        await delay();

        await solveNQueens(board, row + 1, foundSolutions);

        // Backtrack
        if (stopRef.current) return false;
        board[row][col] = 0;
        setBoard([...board.map(r => [...r])]);
        setAttackedCells(getAttackedCells(board, n));
        setLog(prev => [...prev, `← Backtrack: remove queen from (${row}, ${col})`]);
        await delay();
      } else {
        setLog(prev => [...prev, `✗ Not safe at (${row}, ${col})`]);
      }
    }

    return false;
  };

  const run = async () => {
    setIsRunning(true);
    stopRef.current = false;
    const newBoard = initBoard(n);
    setBoard(newBoard);
    setSolutions([]);
    setCurrentSolution(0);
    setLog([]);
    setAttackedCells(new Set());

    setLog([`Starting N-Queens for n=${n}...`]);
    await solveNQueens(newBoard, 0, []);
    
    setCurrentRow(null);
    setCurrentCol(null);
    setIsRunning(false);
    setLog(prev => [...prev, `Done! Found ${solutions.length} solution(s)`]);
  };

  const stop = () => {
    stopRef.current = true;
    setIsRunning(false);
  };

  const showSolution = (idx: number) => {
    if (solutions[idx]) {
      setBoard(solutions[idx]);
      setCurrentSolution(idx);
      setAttackedCells(getAttackedCells(solutions[idx], n));
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">Board Size:</span>
          <select
            value={n}
            onChange={(e) => setN(parseInt(e.target.value))}
            disabled={isRunning}
            className="px-3 py-1.5 bg-dark-700 border border-dark-600 rounded text-white text-sm"
          >
            {[4, 5, 6, 7, 8].map(size => (
              <option key={size} value={size}>{size}x{size}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Speed:</span>
          <input
            type="range"
            min="10"
            max="100"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="w-20"
            title="Animation speed"
          />
        </div>

        <div className="flex gap-2">
          {!isRunning ? (
            <button
              onClick={run}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <Play size={16} /> Solve
            </button>
          ) : (
            <button
              onClick={stop}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <Pause size={16} /> Stop
            </button>
          )}
          <button
            onClick={() => { setBoard(initBoard(n)); setSolutions([]); setLog([]); setAttackedCells(new Set()); }}
            disabled={isRunning}
            className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50"
          >
            <RotateCcw size={16} /> Reset
          </button>
        </div>
      </div>

      {/* Solutions Navigation */}
      {solutions.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-slate-400">Solutions:</span>
          {solutions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => showSolution(idx)}
              className={`w-8 h-8 rounded text-sm font-medium transition-all ${
                currentSolution === idx
                  ? 'bg-purple-600 text-white'
                  : 'bg-dark-700 text-slate-400 hover:text-white'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Chess Board */}
        <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
          <h4 className="text-sm font-medium text-slate-400 mb-4">N-Queens Board</h4>
          <div className="flex justify-center">
            <div 
              className="grid gap-0 border-2 border-dark-600 rounded"
              style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}
            >
              {board.map((row, rowIdx) =>
                row.map((cell, colIdx) => {
                  const isLight = (rowIdx + colIdx) % 2 === 0;
                  const isCurrentTry = currentRow === rowIdx && currentCol === colIdx;
                  const hasQueen = cell === 1;
                  const isAttacked = attackedCells.has(`${rowIdx}-${colIdx}`) && !hasQueen;

                  return (
                    <div
                      key={`${rowIdx}-${colIdx}`}
                      className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-2xl transition-all duration-150 ${
                        isCurrentTry
                          ? 'bg-yellow-500/50 ring-2 ring-yellow-400'
                          : isAttacked
                          ? isLight ? 'bg-red-900/30' : 'bg-red-900/50'
                          : isLight
                          ? 'bg-dark-600'
                          : 'bg-dark-800'
                      }`}
                    >
                      {hasQueen && <span className="text-purple-400">♛</span>}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Log */}
        <div className="bg-dark-900 rounded-xl border border-dark-700 overflow-hidden">
          <div className="px-4 py-2 border-b border-dark-700 bg-dark-800">
            <h4 className="text-sm font-medium text-slate-400">Backtracking Log</h4>
          </div>
          <div className="p-4 h-64 overflow-y-auto font-mono text-xs space-y-1">
            {log.length === 0 ? (
              <p className="text-slate-600">Click "Solve" to start...</p>
            ) : (
              log.slice(-20).map((entry, idx) => (
                <div
                  key={idx}
                  className={`${
                    entry.startsWith('✓') ? 'text-green-400' :
                    entry.startsWith('✗') ? 'text-red-400' :
                    entry.startsWith('←') ? 'text-yellow-400' :
                    'text-slate-400'
                  }`}
                >
                  {entry}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Pattern Explanation */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-dark-900 p-4 rounded-lg border border-dark-700">
          <h4 className="font-bold text-white mb-3">Backtracking Pattern</h4>
          <pre className="text-xs text-slate-300 font-mono overflow-x-auto">
{`function solveNQueens(row):
    if row == n: // All queens placed
        saveSolution()
        return
    
    for col in 0..n:
        if isSafe(row, col):
            placeQueen(row, col)   // Choose
            solveNQueens(row + 1)  // Explore
            removeQueen(row, col)  // Unchoose`}
          </pre>
        </div>
        <div className="bg-dark-900 p-4 rounded-lg border border-dark-700">
          <h4 className="font-bold text-white mb-3">Time Complexity</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><code className="text-yellow-400">O(N!)</code> - Upper bound</li>
            <li className="text-xs">Pruning reduces actual runtime significantly</li>
            <li className="mt-2"><strong className="text-purple-400">Key Insight:</strong> Backtrack immediately when a constraint is violated</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
interface AlgorithmsDemoProps {
  isLearnMode?: boolean;
  initialTab?: string;
}

export const AlgorithmsDemo: React.FC<AlgorithmsDemoProps> = ({
  isLearnMode = false,
  initialTab = 'sorting'
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const renderVisualizer = () => {
    switch (activeTab) {
      case 'sorting':
        return <SortingVisualizer />;
      case 'searching':
        return <BinarySearchVisualizer />;
      case 'recursion':
        return <RecursionVisualizer />;
      case 'dp':
        return <DPVisualizer />;
      case 'greedy':
        return <GreedyVisualizer />;
      case 'backtracking':
        return <BacktrackingVisualizer />;
      default:
        return <SortingVisualizer />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-dark-700 pb-6">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Code className="text-brand-400" />
          Algorithms
        </h2>
        <p className="text-slate-400">Master algorithmic patterns and problem-solving techniques</p>
      </div>

      {/* Tabs */}
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

      {/* Content */}
      {renderVisualizer()}
    </div>
  );
};

export default AlgorithmsDemo;
