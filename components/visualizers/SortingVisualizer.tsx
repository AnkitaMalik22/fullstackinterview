import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, FastForward, ChevronDown } from 'lucide-react';

interface Bar {
  value: number;
  state: 'default' | 'comparing' | 'swapping' | 'sorted';
}

type Algorithm = 'bubble' | 'selection' | 'insertion' | 'quick' | 'merge';

const ALGORITHMS: { id: Algorithm; name: string; complexity: string }[] = [
  { id: 'bubble', name: 'Bubble Sort', complexity: 'O(n²)' },
  { id: 'selection', name: 'Selection Sort', complexity: 'O(n²)' },
  { id: 'insertion', name: 'Insertion Sort', complexity: 'O(n²)' },
  { id: 'quick', name: 'Quick Sort', complexity: 'O(n log n)' },
  { id: 'merge', name: 'Merge Sort', complexity: 'O(n log n)' },
];

export const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<Bar[]>([]);
  const [arraySize, setArraySize] = useState(30);
  const [speed, setSpeed] = useState(50);
  const [algorithm, setAlgorithm] = useState<Algorithm>('bubble');
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  
  const pauseRef = useRef(false);
  const stopRef = useRef(false);

  // Generate random array
  const generateArray = useCallback(() => {
    stopRef.current = true;
    setIsRunning(false);
    setIsPaused(false);
    setComparisons(0);
    setSwaps(0);
    
    const newArray: Bar[] = Array.from({ length: arraySize }, () => ({
      value: Math.floor(Math.random() * 90) + 10,
      state: 'default',
    }));
    setArray(newArray);
    stopRef.current = false;
  }, [arraySize]);

  useEffect(() => {
    generateArray();
  }, [arraySize]);

  // Sleep helper
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Wait if paused
  const waitIfPaused = async () => {
    while (pauseRef.current && !stopRef.current) {
      await sleep(100);
    }
  };

  // Update array state
  const updateArray = (arr: Bar[]) => {
    if (!stopRef.current) {
      setArray([...arr]);
    }
  };

  // Bubble Sort
  const bubbleSort = async () => {
    const arr = [...array];
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (stopRef.current) return;
        await waitIfPaused();

        arr[j].state = 'comparing';
        arr[j + 1].state = 'comparing';
        updateArray(arr);
        setComparisons(c => c + 1);
        await sleep(100 - speed);

        if (arr[j].value > arr[j + 1].value) {
          arr[j].state = 'swapping';
          arr[j + 1].state = 'swapping';
          updateArray(arr);
          await sleep(100 - speed);

          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setSwaps(s => s + 1);
        }

        arr[j].state = 'default';
        arr[j + 1].state = 'default';
      }
      arr[n - 1 - i].state = 'sorted';
      updateArray(arr);
    }
    arr[0].state = 'sorted';
    updateArray(arr);
  };

  // Selection Sort
  const selectionSort = async () => {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      if (stopRef.current) return;
      
      let minIdx = i;
      arr[i].state = 'comparing';
      updateArray(arr);

      for (let j = i + 1; j < n; j++) {
        if (stopRef.current) return;
        await waitIfPaused();

        arr[j].state = 'comparing';
        updateArray(arr);
        setComparisons(c => c + 1);
        await sleep(100 - speed);

        if (arr[j].value < arr[minIdx].value) {
          if (minIdx !== i) arr[minIdx].state = 'default';
          minIdx = j;
        } else {
          arr[j].state = 'default';
        }
        updateArray(arr);
      }

      if (minIdx !== i) {
        arr[i].state = 'swapping';
        arr[minIdx].state = 'swapping';
        updateArray(arr);
        await sleep(100 - speed);

        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setSwaps(s => s + 1);
      }

      arr[i].state = 'sorted';
      if (minIdx !== i) arr[minIdx].state = 'default';
      updateArray(arr);
    }
    arr[n - 1].state = 'sorted';
    updateArray(arr);
  };

  // Insertion Sort
  const insertionSort = async () => {
    const arr = [...array];
    const n = arr.length;

    arr[0].state = 'sorted';
    updateArray(arr);

    for (let i = 1; i < n; i++) {
      if (stopRef.current) return;
      
      const key = arr[i];
      let j = i - 1;
      
      arr[i].state = 'comparing';
      updateArray(arr);
      await sleep(100 - speed);

      while (j >= 0 && arr[j].value > key.value) {
        if (stopRef.current) return;
        await waitIfPaused();

        setComparisons(c => c + 1);
        arr[j + 1] = arr[j];
        arr[j + 1].state = 'swapping';
        updateArray(arr);
        setSwaps(s => s + 1);
        await sleep(100 - speed);
        
        arr[j + 1].state = 'sorted';
        j--;
      }
      
      arr[j + 1] = key;
      arr[j + 1].state = 'sorted';
      updateArray(arr);
    }
  };

  // Quick Sort
  const quickSort = async () => {
    const arr = [...array];
    
    const partition = async (low: number, high: number): Promise<number> => {
      const pivot = arr[high];
      pivot.state = 'comparing';
      updateArray(arr);
      
      let i = low - 1;
      
      for (let j = low; j < high; j++) {
        if (stopRef.current) return -1;
        await waitIfPaused();

        arr[j].state = 'comparing';
        updateArray(arr);
        setComparisons(c => c + 1);
        await sleep(100 - speed);

        if (arr[j].value < pivot.value) {
          i++;
          arr[i].state = 'swapping';
          arr[j].state = 'swapping';
          updateArray(arr);
          await sleep(100 - speed);

          [arr[i], arr[j]] = [arr[j], arr[i]];
          setSwaps(s => s + 1);
        }
        
        arr[j].state = 'default';
        if (i >= low) arr[i].state = 'default';
        updateArray(arr);
      }

      arr[i + 1].state = 'swapping';
      arr[high].state = 'swapping';
      updateArray(arr);
      await sleep(100 - speed);

      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      setSwaps(s => s + 1);

      arr[i + 1].state = 'sorted';
      updateArray(arr);
      
      return i + 1;
    };

    const sort = async (low: number, high: number) => {
      if (stopRef.current) return;
      if (low < high) {
        const pi = await partition(low, high);
        if (pi === -1) return;
        await sort(low, pi - 1);
        await sort(pi + 1, high);
      } else if (low === high) {
        arr[low].state = 'sorted';
        updateArray(arr);
      }
    };

    await sort(0, arr.length - 1);
  };

  // Merge Sort
  const mergeSort = async () => {
    const arr = [...array];
    
    const merge = async (left: number, mid: number, right: number) => {
      const leftArr = arr.slice(left, mid + 1);
      const rightArr = arr.slice(mid + 1, right + 1);
      
      let i = 0, j = 0, k = left;
      
      while (i < leftArr.length && j < rightArr.length) {
        if (stopRef.current) return;
        await waitIfPaused();
        
        setComparisons(c => c + 1);
        await sleep(100 - speed);
        
        if (leftArr[i].value <= rightArr[j].value) {
          arr[k] = { ...leftArr[i], state: 'swapping' };
          i++;
        } else {
          arr[k] = { ...rightArr[j], state: 'swapping' };
          j++;
        }
        setSwaps(s => s + 1);
        updateArray(arr);
        await sleep(100 - speed);
        arr[k].state = 'default';
        k++;
      }
      
      while (i < leftArr.length) {
        if (stopRef.current) return;
        arr[k] = { ...leftArr[i], state: 'default' };
        i++;
        k++;
        updateArray(arr);
      }
      
      while (j < rightArr.length) {
        if (stopRef.current) return;
        arr[k] = { ...rightArr[j], state: 'default' };
        j++;
        k++;
        updateArray(arr);
      }
    };

    const sort = async (left: number, right: number) => {
      if (stopRef.current) return;
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await sort(left, mid);
        await sort(mid + 1, right);
        await merge(left, mid, right);
      }
    };

    await sort(0, arr.length - 1);
    
    // Mark all as sorted
    for (let i = 0; i < arr.length; i++) {
      arr[i].state = 'sorted';
    }
    updateArray(arr);
  };

  // Run sorting
  const runSort = async () => {
    setIsRunning(true);
    setIsPaused(false);
    pauseRef.current = false;
    stopRef.current = false;
    setComparisons(0);
    setSwaps(0);

    // Reset states
    const arr = array.map(bar => ({ ...bar, state: 'default' as const }));
    setArray(arr);

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
        await quickSort();
        break;
      case 'merge':
        await mergeSort();
        break;
    }

    setIsRunning(false);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
    pauseRef.current = !pauseRef.current;
  };

  const getBarColor = (state: Bar['state']) => {
    switch (state) {
      case 'comparing':
        return 'bg-yellow-400';
      case 'swapping':
        return 'bg-red-400';
      case 'sorted':
        return 'bg-green-400';
      default:
        return 'bg-brand-500';
    }
  };

  const selectedAlgo = ALGORITHMS.find(a => a.id === algorithm)!;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white">Sorting Visualizer</h3>
          <p className="text-slate-400 text-sm">Watch algorithms sort data in real-time</p>
        </div>

        {/* Stats */}
        <div className="flex gap-4">
          <div className="bg-dark-800 px-4 py-2 rounded-lg border border-dark-700">
            <div className="text-xs text-slate-500">Comparisons</div>
            <div className="text-lg font-mono text-brand-400">{comparisons}</div>
          </div>
          <div className="bg-dark-800 px-4 py-2 rounded-lg border border-dark-700">
            <div className="text-xs text-slate-500">Swaps</div>
            <div className="text-lg font-mono text-yellow-400">{swaps}</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-dark-800 p-4 rounded-xl border border-dark-700 flex flex-wrap gap-4 items-center">
        {/* Algorithm Selector */}
        <div className="relative">
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as Algorithm)}
            disabled={isRunning}
            className="appearance-none bg-dark-700 text-white px-4 py-2 pr-10 rounded-lg border border-dark-600 focus:border-brand-500 focus:outline-none disabled:opacity-50 cursor-pointer"
          >
            {ALGORITHMS.map(algo => (
              <option key={algo.id} value={algo.id}>
                {algo.name} ({algo.complexity})
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Size Slider */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-400">Size:</span>
          <input
            type="range"
            min="10"
            max="100"
            value={arraySize}
            onChange={(e) => setArraySize(parseInt(e.target.value))}
            disabled={isRunning}
            className="w-24 h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-brand-500 disabled:opacity-50"
          />
          <span className="text-sm text-white font-mono w-8">{arraySize}</span>
        </div>

        {/* Speed Slider */}
        <div className="flex items-center gap-3">
          <FastForward size={16} className="text-slate-400" />
          <input
            type="range"
            min="0"
            max="90"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="w-24 h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-brand-500"
          />
        </div>

        <div className="flex-1" />

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={generateArray}
            disabled={isRunning && !isPaused}
            className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <RotateCcw size={16} />
            Reset
          </button>

          {!isRunning ? (
            <button
              onClick={runSort}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Play size={16} />
              Start
            </button>
          ) : (
            <button
              onClick={togglePause}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                isPaused 
                  ? 'bg-green-600 hover:bg-green-500 text-white' 
                  : 'bg-yellow-600 hover:bg-yellow-500 text-white'
              }`}
            >
              {isPaused ? <Play size={16} /> : <Pause size={16} />}
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          )}
        </div>
      </div>

      {/* Visualization */}
      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 min-h-[300px]">
        <div className="flex items-end justify-center gap-[2px] h-64">
          {array.map((bar, idx) => (
            <div
              key={idx}
              className={`${getBarColor(bar.state)} rounded-t transition-all duration-100`}
              style={{
                height: `${bar.value}%`,
                width: `${Math.max(100 / array.length - 1, 2)}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-6 justify-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-brand-500" />
          <span className="text-slate-400">Unsorted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-400" />
          <span className="text-slate-400">Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-400" />
          <span className="text-slate-400">Swapping</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-400" />
          <span className="text-slate-400">Sorted</span>
        </div>
      </div>

      {/* Algorithm Info */}
      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
        <h4 className="font-bold text-white mb-2">{selectedAlgo.name}</h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-slate-500">Time Complexity:</span>
            <span className="ml-2 text-brand-400 font-mono">{selectedAlgo.complexity}</span>
          </div>
          <div>
            <span className="text-slate-500">Space:</span>
            <span className="ml-2 text-brand-400 font-mono">
              {algorithm === 'merge' ? 'O(n)' : 'O(1)'}
            </span>
          </div>
          <div>
            <span className="text-slate-500">Stable:</span>
            <span className="ml-2 text-brand-400">
              {['bubble', 'insertion', 'merge'].includes(algorithm) ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
