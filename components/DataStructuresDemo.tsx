import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Binary, Layers, GitBranch, Box, List, Hash, TreePine, Network, ArrowRight, Plus, Minus, Search, RotateCcw, Play, Pause, Triangle } from 'lucide-react';

// --- TAB NAVIGATION ---
interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { id: 'arrays', label: 'Arrays & Strings', icon: <List size={16} /> },
  { id: 'linked', label: 'Linked Lists', icon: <GitBranch size={16} /> },
  { id: 'stacks', label: 'Stacks & Queues', icon: <Layers size={16} /> },
  { id: 'heaps', label: 'Heaps', icon: <Triangle size={16} /> },
  { id: 'trees', label: 'Trees & BST', icon: <TreePine size={16} /> },
  { id: 'graphs', label: 'Graphs', icon: <Network size={16} /> },
  { id: 'hash', label: 'Hash Maps', icon: <Hash size={16} /> },
];

// --- ARRAY VISUALIZER ---
const ArrayVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([10, 25, 15, 40, 30, 5, 20]);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const [operation, setOperation] = useState<string>('');

  const addElement = () => {
    const newVal = Math.floor(Math.random() * 50) + 1;
    setArray([...array, newVal]);
    setHighlightIndex(array.length);
    setOperation(`push(${newVal}) - O(1)`);
    setTimeout(() => setHighlightIndex(null), 1000);
  };

  const removeElement = () => {
    if (array.length === 0) return;
    const removed = array[array.length - 1];
    setArray(array.slice(0, -1));
    setOperation(`pop() → ${removed} - O(1)`);
  };

  const insertAt = (index: number) => {
    const newVal = Math.floor(Math.random() * 50) + 1;
    const newArray = [...array.slice(0, index), newVal, ...array.slice(index)];
    setArray(newArray);
    setHighlightIndex(index);
    setOperation(`insert(${index}, ${newVal}) - O(n)`);
    setTimeout(() => setHighlightIndex(null), 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <button onClick={addElement} className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium flex items-center gap-2">
          <Plus size={16} /> Push
        </button>
        <button onClick={removeElement} className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium flex items-center gap-2">
          <Minus size={16} /> Pop
        </button>
        <button onClick={() => insertAt(Math.floor(array.length / 2))} className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-sm font-medium">
          Insert at Middle
        </button>
      </div>

      {operation && (
        <div className="bg-dark-900 border border-dark-700 rounded-lg px-4 py-2 text-sm font-mono text-brand-400">
          {operation}
        </div>
      )}

      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
        <div className="flex items-end gap-2 min-h-[200px]">
          {array.map((val, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div
                className={`w-12 rounded-t transition-all duration-300 flex items-end justify-center pb-2 text-white text-xs font-mono
                  ${highlightIndex === idx ? 'bg-green-500' : 'bg-brand-600'}`}
                style={{ height: `${val * 4}px` }}
              >
                {val}
              </div>
              <span className="text-xs text-slate-500 font-mono">[{idx}]</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
          <h4 className="font-bold text-white mb-2">Time Complexities</h4>
          <ul className="space-y-1 text-slate-400">
            <li><code className="text-green-400">Access: O(1)</code> - Direct index</li>
            <li><code className="text-green-400">Push/Pop: O(1)</code> - End operations</li>
            <li><code className="text-yellow-400">Insert/Delete: O(n)</code> - Shift elements</li>
            <li><code className="text-yellow-400">Search: O(n)</code> - Linear scan</li>
          </ul>
        </div>
        <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
          <h4 className="font-bold text-white mb-2">Common Patterns</h4>
          <ul className="space-y-1 text-slate-400">
            <li>• Two Pointers</li>
            <li>• Sliding Window</li>
            <li>• Prefix Sum</li>
            <li>• Kadane's Algorithm</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// --- LINKED LIST VISUALIZER ---
interface ListNode {
  value: number;
  id: string;
}

const LinkedListVisualizer: React.FC = () => {
  const [nodes, setNodes] = useState<ListNode[]>([
    { value: 10, id: '1' },
    { value: 20, id: '2' },
    { value: 30, id: '3' },
    { value: 40, id: '4' },
  ]);
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [operation, setOperation] = useState<string>('');

  const addToHead = () => {
    const newVal = Math.floor(Math.random() * 100) + 1;
    const newNode = { value: newVal, id: Date.now().toString() };
    setNodes([newNode, ...nodes]);
    setHighlightId(newNode.id);
    setOperation(`prepend(${newVal}) - O(1)`);
    setTimeout(() => setHighlightId(null), 1000);
  };

  const addToTail = () => {
    const newVal = Math.floor(Math.random() * 100) + 1;
    const newNode = { value: newVal, id: Date.now().toString() };
    setNodes([...nodes, newNode]);
    setHighlightId(newNode.id);
    setOperation(`append(${newVal}) - O(n) or O(1) with tail pointer`);
    setTimeout(() => setHighlightId(null), 1000);
  };

  const removeHead = () => {
    if (nodes.length === 0) return;
    const removed = nodes[0].value;
    setNodes(nodes.slice(1));
    setOperation(`removeHead() → ${removed} - O(1)`);
  };

  const reverse = async () => {
    setOperation('Reversing... - O(n)');
    const reversed: ListNode[] = [];
    for (let i = nodes.length - 1; i >= 0; i--) {
      setHighlightId(nodes[i].id);
      await new Promise(r => setTimeout(r, 300));
      reversed.push(nodes[i]);
    }
    setNodes(reversed);
    setHighlightId(null);
    setOperation('reverse() - O(n) time, O(1) space');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <button onClick={addToHead} className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium">
          Add Head
        </button>
        <button onClick={addToTail} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium">
          Add Tail
        </button>
        <button onClick={removeHead} className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium">
          Remove Head
        </button>
        <button onClick={reverse} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium">
          Reverse
        </button>
      </div>

      {operation && (
        <div className="bg-dark-900 border border-dark-700 rounded-lg px-4 py-2 text-sm font-mono text-brand-400">
          {operation}
        </div>
      )}

      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 overflow-x-auto">
        <div className="flex items-center gap-0 min-w-max">
          <div className="px-3 py-2 bg-dark-700 rounded text-xs text-slate-400 font-mono mr-2">HEAD</div>
          {nodes.map((node, idx) => (
            <div key={node.id} className="flex items-center">
              <div
                className={`w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-300
                  ${highlightId === node.id ? 'border-green-500 bg-green-500/20' : 'border-brand-500 bg-dark-900'}`}
              >
                <span className="text-white font-bold">{node.value}</span>
                <span className="text-xs text-slate-500">node</span>
              </div>
              {idx < nodes.length - 1 && (
                <div className="flex items-center px-1">
                  <div className="w-6 h-0.5 bg-brand-500"></div>
                  <ArrowRight size={16} className="text-brand-500 -ml-1" />
                </div>
              )}
            </div>
          ))}
          <div className="px-3 py-2 bg-dark-700 rounded text-xs text-slate-400 font-mono ml-2">NULL</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
          <h4 className="font-bold text-white mb-2">Singly vs Doubly</h4>
          <ul className="space-y-1 text-slate-400">
            <li><strong className="text-brand-400">Singly:</strong> next pointer only</li>
            <li><strong className="text-brand-400">Doubly:</strong> next + prev pointers</li>
            <li>• Doubly allows O(1) tail removal</li>
            <li>• Doubly uses more memory</li>
          </ul>
        </div>
        <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
          <h4 className="font-bold text-white mb-2">Interview Patterns</h4>
          <ul className="space-y-1 text-slate-400">
            <li>• Fast & Slow Pointers (Cycle detection)</li>
            <li>• Reverse in-place</li>
            <li>• Merge two sorted lists</li>
            <li>• Find middle node</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// --- STACK & QUEUE VISUALIZER ---
const StackQueueVisualizer: React.FC = () => {
  const [stack, setStack] = useState<number[]>([10, 20, 30]);
  const [queue, setQueue] = useState<number[]>([5, 15, 25]);
  const [stackOp, setStackOp] = useState('');
  const [queueOp, setQueueOp] = useState('');

  const pushStack = () => {
    const val = Math.floor(Math.random() * 100) + 1;
    setStack([...stack, val]);
    setStackOp(`push(${val})`);
  };

  const popStack = () => {
    if (stack.length === 0) return;
    const val = stack[stack.length - 1];
    setStack(stack.slice(0, -1));
    setStackOp(`pop() → ${val}`);
  };

  const enqueue = () => {
    const val = Math.floor(Math.random() * 100) + 1;
    setQueue([...queue, val]);
    setQueueOp(`enqueue(${val})`);
  };

  const dequeue = () => {
    if (queue.length === 0) return;
    const val = queue[0];
    setQueue(queue.slice(1));
    setQueueOp(`dequeue() → ${val}`);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Stack */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Layers className="text-brand-400" /> Stack (LIFO)
        </h3>
        <div className="flex gap-2">
          <button onClick={pushStack} className="px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded text-sm">Push</button>
          <button onClick={popStack} className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded text-sm">Pop</button>
        </div>
        {stackOp && <div className="text-xs font-mono text-brand-400">{stackOp}</div>}
        <div className="bg-dark-800 p-4 rounded-xl border border-dark-700">
          <div className="flex flex-col-reverse items-center gap-1">
            {stack.map((val, idx) => (
              <div
                key={idx}
                className={`w-24 h-10 rounded flex items-center justify-center text-white font-mono text-sm
                  ${idx === stack.length - 1 ? 'bg-green-600' : 'bg-dark-600'}`}
              >
                {val}
              </div>
            ))}
          </div>
          <div className="text-center mt-2 text-xs text-slate-500">← TOP</div>
        </div>
        <div className="text-xs text-slate-400">
          <strong>Uses:</strong> Undo/Redo, Browser History, Call Stack, DFS
        </div>
      </div>

      {/* Queue */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Box className="text-purple-400" /> Queue (FIFO)
        </h3>
        <div className="flex gap-2">
          <button onClick={enqueue} className="px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded text-sm">Enqueue</button>
          <button onClick={dequeue} className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded text-sm">Dequeue</button>
        </div>
        {queueOp && <div className="text-xs font-mono text-purple-400">{queueOp}</div>}
        <div className="bg-dark-800 p-4 rounded-xl border border-dark-700">
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-500 mr-2">FRONT →</span>
            {queue.map((val, idx) => (
              <div
                key={idx}
                className={`w-12 h-12 rounded flex items-center justify-center text-white font-mono text-sm
                  ${idx === 0 ? 'bg-purple-600' : 'bg-dark-600'}`}
              >
                {val}
              </div>
            ))}
            <span className="text-xs text-slate-500 ml-2">← REAR</span>
          </div>
        </div>
        <div className="text-xs text-slate-400">
          <strong>Uses:</strong> BFS, Task Scheduling, Rate Limiting, Message Queues
        </div>
      </div>
    </div>
  );
};

// --- BINARY TREE VISUALIZER ---
interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

const BinaryTreeVisualizer: React.FC = () => {
  const [tree, setTree] = useState<TreeNode>({
    value: 50,
    left: {
      value: 30,
      left: { value: 20 },
      right: { value: 40 },
    },
    right: {
      value: 70,
      left: { value: 60 },
      right: { value: 80 },
    },
  });
  const [traversal, setTraversal] = useState<number[]>([]);
  const [traversalType, setTraversalType] = useState('');

  const inorder = (node: TreeNode | undefined, result: number[] = []): number[] => {
    if (!node) return result;
    inorder(node.left, result);
    result.push(node.value);
    inorder(node.right, result);
    return result;
  };

  const preorder = (node: TreeNode | undefined, result: number[] = []): number[] => {
    if (!node) return result;
    result.push(node.value);
    preorder(node.left, result);
    preorder(node.right, result);
    return result;
  };

  const postorder = (node: TreeNode | undefined, result: number[] = []): number[] => {
    if (!node) return result;
    postorder(node.left, result);
    postorder(node.right, result);
    result.push(node.value);
    return result;
  };

  const levelOrder = (root: TreeNode): number[] => {
    const result: number[] = [];
    const queue: TreeNode[] = [root];
    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return result;
  };

  const runTraversal = (type: string) => {
    let result: number[] = [];
    switch (type) {
      case 'inorder':
        result = inorder(tree);
        break;
      case 'preorder':
        result = preorder(tree);
        break;
      case 'postorder':
        result = postorder(tree);
        break;
      case 'levelorder':
        result = levelOrder(tree);
        break;
    }
    setTraversal(result);
    setTraversalType(type);
  };

  const TreeNodeComponent: React.FC<{ node: TreeNode; depth: number }> = ({ node, depth }) => (
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 rounded-full bg-brand-600 border-2 border-brand-400 flex items-center justify-center text-white font-bold text-sm">
        {node.value}
      </div>
      {(node.left || node.right) && (
        <div className="flex gap-8 mt-2">
          <div className="flex flex-col items-center">
            {node.left ? (
              <>
                <div className="w-px h-4 bg-dark-600"></div>
                <TreeNodeComponent node={node.left} depth={depth + 1} />
              </>
            ) : (
              <div className="w-10 h-10 rounded-full border-2 border-dashed border-dark-600 flex items-center justify-center text-slate-600 text-xs">
                ∅
              </div>
            )}
          </div>
          <div className="flex flex-col items-center">
            {node.right ? (
              <>
                <div className="w-px h-4 bg-dark-600"></div>
                <TreeNodeComponent node={node.right} depth={depth + 1} />
              </>
            ) : (
              <div className="w-10 h-10 rounded-full border-2 border-dashed border-dark-600 flex items-center justify-center text-slate-600 text-xs">
                ∅
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {['inorder', 'preorder', 'postorder', 'levelorder'].map(type => (
          <button
            key={type}
            onClick={() => runTraversal(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${traversalType === type ? 'bg-brand-600 text-white' : 'bg-dark-700 text-slate-400 hover:text-white'}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {traversal.length > 0 && (
        <div className="bg-dark-900 border border-dark-700 rounded-lg px-4 py-2">
          <span className="text-xs text-slate-500">{traversalType}: </span>
          <span className="font-mono text-brand-400">[{traversal.join(' → ')}]</span>
        </div>
      )}

      <div className="bg-dark-800 p-8 rounded-xl border border-dark-700 flex justify-center overflow-x-auto">
        <TreeNodeComponent node={tree} depth={0} />
      </div>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
          <h4 className="font-bold text-white mb-2">BST Property</h4>
          <p className="text-slate-400">Left subtree values &lt; Node &lt; Right subtree values</p>
          <p className="text-slate-400 mt-2"><strong>Inorder</strong> of BST = Sorted array</p>
        </div>
        <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
          <h4 className="font-bold text-white mb-2">Time Complexity</h4>
          <ul className="space-y-1 text-slate-400">
            <li><code className="text-green-400">Search: O(log n)</code> balanced</li>
            <li><code className="text-red-400">Search: O(n)</code> skewed</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// --- HASH MAP VISUALIZER ---
const HashMapVisualizer: React.FC = () => {
  const [buckets, setBuckets] = useState<{ key: string; value: number }[][]>(
    Array(8).fill(null).map(() => [])
  );
  const [inputKey, setInputKey] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [highlightBucket, setHighlightBucket] = useState<number | null>(null);

  const hash = (key: string): number => {
    let h = 0;
    for (let i = 0; i < key.length; i++) {
      h = (h * 31 + key.charCodeAt(i)) % buckets.length;
    }
    return h;
  };

  const put = () => {
    if (!inputKey) return;
    const idx = hash(inputKey);
    const newBuckets = [...buckets];
    const existing = newBuckets[idx].findIndex(e => e.key === inputKey);
    if (existing >= 0) {
      newBuckets[idx][existing].value = parseInt(inputValue) || 0;
    } else {
      newBuckets[idx].push({ key: inputKey, value: parseInt(inputValue) || 0 });
    }
    setBuckets(newBuckets);
    setHighlightBucket(idx);
    setInputKey('');
    setInputValue('');
    setTimeout(() => setHighlightBucket(null), 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        <input
          type="text"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
          placeholder="Key"
          className="px-3 py-2 bg-dark-700 border border-dark-600 rounded text-white text-sm w-32"
        />
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Value"
          className="px-3 py-2 bg-dark-700 border border-dark-600 rounded text-white text-sm w-24"
        />
        <button onClick={put} className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded text-sm font-medium">
          Put
        </button>
      </div>

      {inputKey && (
        <div className="text-sm text-slate-400">
          hash("{inputKey}") = <span className="text-brand-400 font-mono">{hash(inputKey)}</span>
        </div>
      )}

      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
        <div className="space-y-2">
          {buckets.map((bucket, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-mono
                ${highlightBucket === idx ? 'bg-brand-600 text-white' : 'bg-dark-700 text-slate-400'}`}>
                {idx}
              </div>
              <div className="flex-1 flex gap-2 min-h-[32px] items-center">
                {bucket.length === 0 ? (
                  <span className="text-slate-600 text-xs">empty</span>
                ) : (
                  bucket.map((entry, i) => (
                    <div key={i} className="flex items-center">
                      <div className="px-3 py-1 bg-dark-900 rounded text-sm border border-dark-600">
                        <span className="text-purple-400">{entry.key}</span>
                        <span className="text-slate-500">:</span>
                        <span className="text-green-400">{entry.value}</span>
                      </div>
                      {i < bucket.length - 1 && <ArrowRight size={12} className="mx-1 text-dark-600" />}
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
          <h4 className="font-bold text-white mb-2">Collision Handling</h4>
          <ul className="space-y-1 text-slate-400">
            <li><strong className="text-brand-400">Chaining:</strong> Linked list per bucket</li>
            <li><strong className="text-brand-400">Open Addressing:</strong> Linear/Quadratic probing</li>
          </ul>
        </div>
        <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
          <h4 className="font-bold text-white mb-2">Time Complexity</h4>
          <ul className="space-y-1 text-slate-400">
            <li><code className="text-green-400">Average: O(1)</code> for get/put</li>
            <li><code className="text-red-400">Worst: O(n)</code> all collisions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// --- HEAP VISUALIZER ---
const HeapVisualizer: React.FC = () => {
  const [heap, setHeap] = useState<number[]>([50, 30, 40, 10, 20, 35, 25]);
  const [heapType, setHeapType] = useState<'max' | 'min'>('max');
  const [highlightIndices, setHighlightIndices] = useState<number[]>([]);
  const [operation, setOperation] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const getParent = (i: number) => Math.floor((i - 1) / 2);
  const getLeft = (i: number) => 2 * i + 1;
  const getRight = (i: number) => 2 * i + 2;

  const compare = (a: number, b: number) => heapType === 'max' ? a > b : a < b;

  const heapifyUp = async (arr: number[], idx: number) => {
    while (idx > 0) {
      const parent = getParent(idx);
      setHighlightIndices([idx, parent]);
      setOperation(`Compare ${arr[idx]} with parent ${arr[parent]}`);
      await new Promise(r => setTimeout(r, 500));

      if (compare(arr[idx], arr[parent])) {
        setOperation(`Swap ${arr[idx]} ↔ ${arr[parent]}`);
        [arr[idx], arr[parent]] = [arr[parent], arr[idx]];
        setHeap([...arr]);
        await new Promise(r => setTimeout(r, 400));
        idx = parent;
      } else {
        break;
      }
    }
    setHighlightIndices([]);
  };

  const heapifyDown = async (arr: number[], idx: number) => {
    const n = arr.length;
    while (true) {
      let target = idx;
      const left = getLeft(idx);
      const right = getRight(idx);

      setHighlightIndices([idx, left, right].filter(i => i < n));
      await new Promise(r => setTimeout(r, 400));

      if (left < n && compare(arr[left], arr[target])) target = left;
      if (right < n && compare(arr[right], arr[target])) target = right;

      if (target !== idx) {
        setOperation(`Swap ${arr[idx]} ↔ ${arr[target]}`);
        [arr[idx], arr[target]] = [arr[target], arr[idx]];
        setHeap([...arr]);
        await new Promise(r => setTimeout(r, 400));
        idx = target;
      } else {
        break;
      }
    }
    setHighlightIndices([]);
  };

  const insert = async () => {
    setIsAnimating(true);
    const newVal = Math.floor(Math.random() * 60) + 1;
    const arr = [...heap, newVal];
    setHeap(arr);
    setOperation(`Insert ${newVal}`);
    await new Promise(r => setTimeout(r, 300));
    await heapifyUp(arr, arr.length - 1);
    setOperation(`Inserted ${newVal} - O(log n)`);
    setIsAnimating(false);
  };

  const extractTop = async () => {
    if (heap.length === 0) return;
    setIsAnimating(true);
    const arr = [...heap];
    const top = arr[0];
    setOperation(`Extract ${heapType === 'max' ? 'max' : 'min'}: ${top}`);
    
    arr[0] = arr[arr.length - 1];
    arr.pop();
    setHeap([...arr]);
    await new Promise(r => setTimeout(r, 300));
    
    if (arr.length > 0) {
      await heapifyDown(arr, 0);
    }
    setOperation(`Extracted ${top} - O(log n)`);
    setIsAnimating(false);
  };

  const buildHeap = async () => {
    setIsAnimating(true);
    const arr = [35, 10, 50, 25, 40, 30, 20];
    setHeap(arr);
    setOperation('Building heap from array...');
    await new Promise(r => setTimeout(r, 500));

    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      await heapifyDown(arr, i);
    }
    setOperation('Heap built - O(n)');
    setIsAnimating(false);
  };

  // Tree visualization helper
  const renderHeapTree = () => {
    if (heap.length === 0) return null;
    
    const levels: number[][] = [];
    let idx = 0;
    let levelSize = 1;
    
    while (idx < heap.length) {
      levels.push(heap.slice(idx, Math.min(idx + levelSize, heap.length)));
      idx += levelSize;
      levelSize *= 2;
    }

    return (
      <div className="flex flex-col items-center gap-4">
        {levels.map((level, levelIdx) => (
          <div key={levelIdx} className="flex justify-center gap-2" style={{ gap: `${Math.pow(2, levels.length - levelIdx - 1) * 8}px` }}>
            {level.map((val, nodeIdx) => {
              const globalIdx = Math.pow(2, levelIdx) - 1 + nodeIdx;
              return (
                <div
                  key={nodeIdx}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 transition-all ${
                    highlightIndices.includes(globalIdx)
                      ? 'bg-yellow-600 border-yellow-400 scale-110'
                      : globalIdx === 0
                      ? 'bg-green-600 border-green-400'
                      : 'bg-brand-600 border-brand-400'
                  }`}
                >
                  {val}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Heap Type Toggle */}
      <div className="flex gap-2">
        {(['max', 'min'] as const).map(type => (
          <button
            key={type}
            onClick={() => { setHeapType(type); setHeap([50, 30, 40, 10, 20, 35, 25]); }}
            disabled={isAnimating}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              heapType === type ? 'bg-brand-600 text-white' : 'bg-dark-700 text-slate-400 hover:text-white'
            }`}
          >
            {type === 'max' ? 'Max Heap' : 'Min Heap'}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2">
        <button onClick={insert} disabled={isAnimating} className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium disabled:opacity-50 flex items-center gap-2">
          <Plus size={16} /> Insert Random
        </button>
        <button onClick={extractTop} disabled={isAnimating || heap.length === 0} className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium disabled:opacity-50 flex items-center gap-2">
          <Minus size={16} /> Extract {heapType === 'max' ? 'Max' : 'Min'}
        </button>
        <button onClick={buildHeap} disabled={isAnimating} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          Build Heap
        </button>
      </div>

      {operation && (
        <div className="bg-dark-900 border border-dark-700 rounded-lg px-4 py-2 text-sm font-mono text-brand-400">
          {operation}
        </div>
      )}

      {/* Tree View */}
      <div className="bg-dark-800 p-8 rounded-xl border border-dark-700 min-h-[200px] flex items-center justify-center overflow-x-auto">
        {renderHeapTree()}
      </div>

      {/* Array View */}
      <div className="bg-dark-900 p-4 rounded-lg border border-dark-700">
        <span className="text-xs text-slate-500">Array representation: </span>
        <span className="font-mono text-brand-400">[{heap.join(', ')}]</span>
      </div>

      {/* Info */}
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
          <h4 className="font-bold text-white mb-2">Heap Property</h4>
          <p className="text-slate-400">
            {heapType === 'max' ? 'Parent ≥ Children (Max at root)' : 'Parent ≤ Children (Min at root)'}
          </p>
          <p className="text-slate-400 mt-2">Complete binary tree stored in array</p>
        </div>
        <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
          <h4 className="font-bold text-white mb-2">Time Complexity</h4>
          <ul className="space-y-1 text-slate-400">
            <li><code className="text-green-400">Insert: O(log n)</code></li>
            <li><code className="text-green-400">Extract: O(log n)</code></li>
            <li><code className="text-green-400">Build: O(n)</code></li>
            <li><code className="text-green-400">Peek: O(1)</code></li>
          </ul>
        </div>
      </div>

      <div className="bg-dark-900 p-4 rounded-lg border border-dark-700">
        <h4 className="font-bold text-white mb-2">Common Uses</h4>
        <ul className="text-sm text-slate-400 grid md:grid-cols-2 gap-2">
          <li>• Priority Queues</li>
          <li>• Heap Sort</li>
          <li>• K-th largest/smallest element</li>
          <li>• Merge K sorted lists</li>
          <li>• Dijkstra's algorithm</li>
          <li>• Median in stream</li>
        </ul>
      </div>
    </div>
  );
};

// --- GRAPH VISUALIZER WITH BFS/DFS ---
const GraphVisualizer: React.FC = () => {
  // Simple graph as adjacency list
  const graphData: Record<string, string[]> = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E'],
  };

  const nodePositions: Record<string, { x: number; y: number }> = {
    'A': { x: 150, y: 50 },
    'B': { x: 80, y: 130 },
    'C': { x: 220, y: 130 },
    'D': { x: 30, y: 210 },
    'E': { x: 130, y: 210 },
    'F': { x: 220, y: 210 },
  };

  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [current, setCurrent] = useState<string | null>(null);
  const [queue, setQueue] = useState<string[]>([]);
  const [stack, setStack] = useState<string[]>([]);
  const [order, setOrder] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [algorithm, setAlgorithm] = useState<'bfs' | 'dfs'>('bfs');
  const [startNode, setStartNode] = useState('A');
  const stopRef = useRef(false);

  const reset = () => {
    setVisited(new Set());
    setCurrent(null);
    setQueue([]);
    setStack([]);
    setOrder([]);
    stopRef.current = false;
  };

  const bfs = async () => {
    reset();
    setIsRunning(true);
    const visitedSet = new Set<string>();
    const q: string[] = [startNode];
    setQueue([...q]);
    
    while (q.length > 0 && !stopRef.current) {
      const node = q.shift()!;
      setQueue([...q]);
      
      if (visitedSet.has(node)) continue;
      
      setCurrent(node);
      visitedSet.add(node);
      setVisited(new Set(visitedSet));
      setOrder(prev => [...prev, node]);
      await new Promise(r => setTimeout(r, 800));
      
      for (const neighbor of graphData[node]) {
        if (!visitedSet.has(neighbor) && !q.includes(neighbor)) {
          q.push(neighbor);
          setQueue([...q]);
          await new Promise(r => setTimeout(r, 300));
        }
      }
    }
    
    setCurrent(null);
    setIsRunning(false);
  };

  const dfs = async () => {
    reset();
    setIsRunning(true);
    const visitedSet = new Set<string>();
    const s: string[] = [startNode];
    setStack([...s]);
    
    while (s.length > 0 && !stopRef.current) {
      const node = s.pop()!;
      setStack([...s]);
      
      if (visitedSet.has(node)) continue;
      
      setCurrent(node);
      visitedSet.add(node);
      setVisited(new Set(visitedSet));
      setOrder(prev => [...prev, node]);
      await new Promise(r => setTimeout(r, 800));
      
      // Add neighbors in reverse order so we visit in correct order
      const neighbors = [...graphData[node]].reverse();
      for (const neighbor of neighbors) {
        if (!visitedSet.has(neighbor)) {
          s.push(neighbor);
          setStack([...s]);
          await new Promise(r => setTimeout(r, 200));
        }
      }
    }
    
    setCurrent(null);
    setIsRunning(false);
  };

  const run = () => {
    if (algorithm === 'bfs') bfs();
    else dfs();
  };

  const stop = () => {
    stopRef.current = true;
    setIsRunning(false);
  };

  return (
    <div className="space-y-6">
      {/* Algorithm Selection */}
      <div className="flex flex-wrap gap-2">
        {(['bfs', 'dfs'] as const).map(alg => (
          <button
            key={alg}
            onClick={() => { setAlgorithm(alg); reset(); }}
            disabled={isRunning}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              algorithm === alg ? 'bg-brand-600 text-white' : 'bg-dark-700 text-slate-400 hover:text-white'
            }`}
          >
            {alg.toUpperCase()}
            <span className="ml-2 text-xs opacity-70">
              ({alg === 'bfs' ? 'Queue' : 'Stack'})
            </span>
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">Start:</span>
          <select
            value={startNode}
            onChange={(e) => setStartNode(e.target.value)}
            disabled={isRunning}
            className="px-3 py-1.5 bg-dark-700 border border-dark-600 rounded text-white text-sm"
            title="Select start node"
          >
            {Object.keys(graphData).map(node => (
              <option key={node} value={node}>{node}</option>
            ))}
          </select>
        </div>
        
        {!isRunning ? (
          <button onClick={run} className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium flex items-center gap-2">
            <Play size={16} /> Run {algorithm.toUpperCase()}
          </button>
        ) : (
          <button onClick={stop} className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium flex items-center gap-2">
            <Pause size={16} /> Stop
          </button>
        )}
        <button onClick={reset} disabled={isRunning} className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          <RotateCcw size={16} className="inline mr-1" /> Reset
        </button>
      </div>

      {/* Traversal Order */}
      {order.length > 0 && (
        <div className="bg-dark-900 border border-dark-700 rounded-lg px-4 py-2">
          <span className="text-xs text-slate-500">Traversal order: </span>
          <span className="font-mono text-brand-400">{order.join(' → ')}</span>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Graph Visualization */}
        <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
          <svg viewBox="0 0 280 260" className="w-full h-64">
            {/* Edges */}
            {Object.entries(graphData).map(([node, neighbors]) =>
              neighbors.map(neighbor => {
                if (node < neighbor) { // Draw each edge once
                  const from = nodePositions[node];
                  const to = nodePositions[neighbor];
                  return (
                    <line
                      key={`${node}-${neighbor}`}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke={visited.has(node) && visited.has(neighbor) ? '#22c55e' : '#475569'}
                      strokeWidth="2"
                    />
                  );
                }
                return null;
              })
            )}
            
            {/* Nodes */}
            {Object.entries(nodePositions).map(([node, pos]) => (
              <g key={node}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="20"
                  fill={
                    current === node
                      ? '#eab308'
                      : visited.has(node)
                      ? '#22c55e'
                      : '#6366f1'
                  }
                  stroke={current === node ? '#fef08a' : 'transparent'}
                  strokeWidth="3"
                  className="transition-all duration-300"
                />
                <text
                  x={pos.x}
                  y={pos.y + 5}
                  textAnchor="middle"
                  fill="white"
                  fontWeight="bold"
                  fontSize="14"
                >
                  {node}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Data Structure State */}
        <div className="space-y-4">
          <div className="bg-dark-900 p-4 rounded-lg border border-dark-700">
            <h4 className="text-sm font-medium text-slate-400 mb-2">
              {algorithm === 'bfs' ? 'Queue (FIFO)' : 'Stack (LIFO)'}
            </h4>
            <div className="flex gap-2 min-h-[40px] items-center">
              {(algorithm === 'bfs' ? queue : stack).length === 0 ? (
                <span className="text-slate-600 text-sm">Empty</span>
              ) : (
                (algorithm === 'bfs' ? queue : stack).map((node, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-8 bg-brand-600 rounded flex items-center justify-center text-white font-bold text-sm"
                  >
                    {node}
                  </div>
                ))
              )}
              {algorithm === 'bfs' && queue.length > 0 && (
                <span className="text-xs text-slate-500 ml-2">← dequeue</span>
              )}
              {algorithm === 'dfs' && stack.length > 0 && (
                <span className="text-xs text-slate-500 ml-2">← pop</span>
              )}
            </div>
          </div>

          <div className="bg-dark-900 p-4 rounded-lg border border-dark-700">
            <h4 className="text-sm font-medium text-slate-400 mb-2">Visited Set</h4>
            <div className="flex gap-2 flex-wrap min-h-[40px] items-center">
              {visited.size === 0 ? (
                <span className="text-slate-600 text-sm">Empty</span>
              ) : (
                Array.from(visited).map(node => (
                  <div
                    key={node}
                    className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white font-bold text-sm"
                  >
                    {node}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-dark-900 p-4 rounded-lg border border-dark-700">
          <h4 className="font-bold text-white mb-2">BFS (Breadth-First)</h4>
          <ul className="text-sm text-slate-400 space-y-1">
            <li>• Uses <strong className="text-brand-400">Queue</strong></li>
            <li>• Explores level by level</li>
            <li>• Finds shortest path (unweighted)</li>
            <li>• Time: O(V + E)</li>
          </ul>
        </div>
        <div className="bg-dark-900 p-4 rounded-lg border border-dark-700">
          <h4 className="font-bold text-white mb-2">DFS (Depth-First)</h4>
          <ul className="text-sm text-slate-400 space-y-1">
            <li>• Uses <strong className="text-purple-400">Stack</strong> (or recursion)</li>
            <li>• Goes deep before backtracking</li>
            <li>• Good for cycle detection, topological sort</li>
            <li>• Time: O(V + E)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
interface DataStructuresDemoProps {
  isLearnMode?: boolean;
  initialTab?: string;
}

export const DataStructuresDemo: React.FC<DataStructuresDemoProps> = ({ 
  isLearnMode = false, 
  initialTab = 'arrays' 
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const renderVisualizer = () => {
    switch (activeTab) {
      case 'arrays':
        return <ArrayVisualizer />;
      case 'linked':
        return <LinkedListVisualizer />;
      case 'stacks':
        return <StackQueueVisualizer />;
      case 'heaps':
        return <HeapVisualizer />;
      case 'trees':
        return <BinaryTreeVisualizer />;
      case 'graphs':
        return <GraphVisualizer />;
      case 'hash':
        return <HashMapVisualizer />;
      default:
        return <ArrayVisualizer />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-dark-700 pb-6">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Binary className="text-brand-400" />
          Data Structures
        </h2>
        <p className="text-slate-400">Master the building blocks of efficient algorithms</p>
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

export default DataStructuresDemo;
