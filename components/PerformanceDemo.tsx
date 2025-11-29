import React, { useState, useRef, useEffect, memo, useCallback, useMemo, Suspense } from 'react';
import { RefreshCw, Zap, Flame, Code, Search, Timer, Box, Eye, Layers, Download, Loader2 } from 'lucide-react';

// Lazy load the heavy component
// Note: We use a .then() adapter because the file exports 'default', but some environments might need named handling.
// Standard syntax: const HeavyModal = React.lazy(() => import('./HeavyModal'));
const HeavyModal = React.lazy(() => import('./HeavyModal'));

// --- BLOG CONTENT COMPONENT ---
const PerformanceGuide = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => {
  const tabs = [
    { id: 'rendering', label: 'The Render Cycle', icon: <RefreshCw size={16} /> },
    { id: 'splitting', label: 'Code Splitting', icon: <Layers size={16} /> },
    { id: 'debugging', label: 'Debugging', icon: <Search size={16} /> },
    { id: 'browser', label: 'Browser APIs', icon: <Box size={16} /> },
  ];

  return (
    <div className="space-y-8 max-w-5xl animate-fadeIn pb-24">
      <div className="border-b border-dark-700 pb-6">
        <h2 className="text-3xl font-bold text-white mb-4">Performance & Optimization</h2>
        <div className="flex flex-wrap gap-3 text-sm text-slate-400">
          <span className="bg-brand-900/30 text-brand-300 px-2 py-1 rounded border border-brand-500/20">Render Tuning</span>
          <span className="bg-brand-900/30 text-brand-300 px-2 py-1 rounded border border-brand-500/20">Bundle Size</span>
          <span className="bg-brand-900/30 text-brand-300 px-2 py-1 rounded border border-brand-500/20">Web Vitals</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pb-4 border-b border-dark-800">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id 
                ? 'bg-brand-600 text-white' 
                : 'bg-dark-800 text-slate-400 hover:bg-dark-700 hover:text-white'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="prose prose-invert max-w-none text-slate-300">
        {activeTab === 'rendering' && (
          <div className="space-y-8 animate-fadeIn">
            <section>
              <h3 className="text-2xl font-bold text-white mb-4">How React Renders</h3>
              <p className="text-lg leading-relaxed mb-6">
                Optimization is about doing less work. React works in two phases: <strong>Render</strong> (Pure JS calculation) and <strong>Commit</strong> (DOM updates).
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                 <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
                   <h4 className="font-bold text-white mb-2">Referential Equality</h4>
                   <p className="text-sm text-slate-400 mb-2">
                     React compares props using <code>Object.is()</code>.
                     <br/>In JS, <code>{`{}`} !== {`{}`}</code> and <code>{`[] !== []`}</code>.
                   </p>
                   <p className="text-sm text-slate-400">
                     If you pass a new object/function to a child every render, the child <em>will</em> re-render, even if the data is the same.
                   </p>
                 </div>
                 <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
                   <h4 className="font-bold text-white mb-2">When to Memoize?</h4>
                   <p className="text-sm text-slate-400 mb-2">
                     Use <code>useMemo</code> and <code>useCallback</code> only when:
                   </p>
                   <ul className="list-disc pl-4 text-sm text-slate-400">
                     <li>Passing props to a memoized child.</li>
                     <li>The calculation is computationally expensive (n &gt; 1000).</li>
                     <li>It's a dependency for <code>useEffect</code>.</li>
                   </ul>
                 </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'splitting' && (
          <div className="space-y-8 animate-fadeIn">
            <section>
              <h3 className="text-2xl font-bold text-white mb-6">Code Splitting & Suspense</h3>
               <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
                  <h4 className="font-bold text-white mb-2">Route-based Splitting</h4>
                  <p className="text-sm text-slate-400 mb-3">
                    Splitting the bundle at the page level. If a user never visits "/settings", they never download the settings code.
                  </p>
                  <code className="block bg-dark-950 p-2 rounded text-xs text-brand-300 mb-2 font-mono">
                    const Settings = React.lazy(() ={'>'} import('./Settings'));
                  </code>
                </div>

                <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
                  <h4 className="font-bold text-white mb-2">Component-based Splitting</h4>
                  <p className="text-sm text-slate-400 mb-3">
                    Lazy loading heavy interactive elements (Modals, Maps, Charts) only when triggered.
                  </p>
                  <code className="block bg-dark-950 p-2 rounded text-xs text-brand-300 mb-2 font-mono">
                    {'<Suspense fallback={<Spinner />}>'}
                    <br/>&nbsp;&nbsp;{'{isOpen && <HeavyModal /> }'}
                    <br/>{'</Suspense>'}
                  </code>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'debugging' && (
          <div className="space-y-8 animate-fadeIn">
            <section>
              <h3 className="text-2xl font-bold text-white mb-6">Real Debugging Scenarios</h3>
               <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <Timer size={18} className="text-brand-400" />
                    Chrome Performance Tab
                  </h4>
                  <p className="text-sm text-slate-400 mb-4">
                    The single most important tool. Look for "Long Tasks" (red triangles) that block the main thread.
                  </p>
                </div>
            </section>
          </div>
        )}

        {activeTab === 'browser' && (
          <div className="space-y-8 animate-fadeIn">
            <section>
              <h3 className="text-2xl font-bold text-white mb-6">Browser APIs</h3>
              <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
                  <h4 className="font-bold text-white mb-2">Intersection Observer</h4>
                  <p className="text-sm text-slate-400 mb-2">
                    Efficiently detect when an element enters the viewport. Use for Lazy loading images, Infinite scroll.
                  </p>
                </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

// --- RENDER VISUALIZATION COMPONENTS ---
const ExpensiveComponent = memo(({ data, onItemClick }: { data: number[], onItemClick: (n: number) => void }) => {
  // Artificial slowdown
  const start = performance.now();
  while (performance.now() - start < 2) {}

  return (
    <div className="grid grid-cols-5 gap-1">
      {data.map((n, i) => (
        <div 
          key={i} 
          onClick={() => onItemClick(n)}
          className="h-8 bg-dark-700 hover:bg-brand-600 rounded flex items-center justify-center text-xs text-slate-400 cursor-pointer transition-colors hover:scale-105 active:scale-95"
        >
          {n}
        </div>
      ))}
    </div>
  );
});

const RenderViz = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [isOptimized, setIsOptimized] = useState(false);
  
  const renderCounter = useRef(0);
  const lastRenderTime = useRef(performance.now());
  const metricsRef = useRef<HTMLDivElement>(null); 

  renderCounter.current++;
  
  useEffect(() => {
    const now = performance.now();
    const diff = now - lastRenderTime.current;
    lastRenderTime.current = now;
    if (metricsRef.current) {
      metricsRef.current.innerText = `${diff.toFixed(2)}ms`;
      metricsRef.current.style.color = diff > 16 ? '#f87171' : '#4ade80';
    }
  });

  const heavyData = useMemo(() => Array.from({ length: 50 }, (_, i) => i), []);

  const optimizedClick = useCallback((n: number) => console.log(n), []);
  const unoptimizedClick = (n: number) => console.log(n);

  const handleItemClick = isOptimized ? optimizedClick : unoptimizedClick;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Profiler Lab</h2>
          <p className="text-slate-400 max-w-xl">
            Detecting unnecessary re-renders. The grid below is an "Expensive Component". 
          </p>
        </div>
        
        <div className="flex gap-4">
           <div className="bg-dark-900 p-3 rounded-lg border border-dark-700 text-center w-24 shadow-inner">
             <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Renders</div>
             <div className="text-xl font-mono text-brand-400">{renderCounter.current}</div>
           </div>
           <div className="bg-dark-900 p-3 rounded-lg border border-dark-700 text-center w-24 shadow-inner">
             <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Last Frame</div>
             <div ref={metricsRef} className="text-xl font-mono text-green-400">0.00ms</div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 space-y-6">
          <div className="flex items-center justify-between bg-dark-900 p-4 rounded-lg border border-dark-600">
            <span className="text-slate-300 font-medium">Optimization Mode</span>
            <button
              onClick={() => setIsOptimized(!isOptimized)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                isOptimized ? 'bg-brand-600' : 'bg-slate-600'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow ${isOptimized ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Trigger Main Thread Updates</label>
            <input 
              type="text" 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              placeholder="Type here to force renders..."
              className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
            />
          </div>

           <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Update Unrelated State</label>
            <button 
              onClick={() => setCount(c => c + 1)}
              className="w-full bg-dark-700 hover:bg-dark-600 text-white rounded-lg px-4 py-2 flex items-center justify-center gap-2 transition-all active:scale-95 shadow"
            >
              <RefreshCw size={16} />
              Increment Counter: {count}
            </button>
          </div>
        </div>

        <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2">
            <div key={renderCounter.current} className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
          </div>
          <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">Heavy Child Component</h3>
          <div className={`transition-opacity duration-200 ${!isOptimized ? 'opacity-100' : 'opacity-90'}`}>
            <ExpensiveComponent data={heavyData} onItemClick={handleItemClick} />
          </div>
          <div className="mt-8 pt-6 border-t border-dark-600">
             <div className="font-mono text-xs text-slate-500 space-y-1">
               <p><span className="text-purple-400">const</span> handleItemClick = {isOptimized ? <span className="text-yellow-400">useCallback(...)</span> : <span className="text-red-400">(n) ={'>'} ...</span>}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LazyViz = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-dark-800 p-8 rounded-xl border border-dark-700 flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-white mb-4">Lazy Load Demo</h2>
        <p className="text-slate-400 mb-8">
          The "Heavy Dashboard" component is <strong>not</strong> imported in the main bundle. 
          It will only be fetched from the network when you click the button below.
        </p>
        
        <button 
          onClick={() => setShowModal(true)}
          className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-800 transition-transform active:scale-95 shadow-lg"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-dark-900 rounded-md group-hover:bg-opacity-0 flex items-center gap-2">
            <Download size={18} />
            Load Heavy Component
          </span>
        </button>

        <p className="text-xs text-slate-500 mt-4 font-mono">
          Network request will fire only once. Subsequent clicks use cached module.
        </p>
      </div>

      <div className="bg-dark-950 p-6 rounded-xl border border-dark-600 font-mono text-xs text-slate-400 overflow-x-auto shadow-inner">
        <div className="mb-2 text-slate-500">// PerformanceDemo.tsx</div>
        <div>
          <span className="text-purple-400">const</span> HeavyModal = <span className="text-yellow-400">React.lazy</span>(() ={'>'} <span className="text-yellow-400">import</span>(<span className="text-green-400">'./HeavyModal'</span>));
        </div>
        <br/>
        <div>
          <span className="text-purple-400">return</span> (
        </div>
        <div className="pl-4">
          {'<'}<span className="text-yellow-400">Suspense</span> fallback={'{'}<span className="text-blue-400">{'<Spinner />'}</span>{'}'}{'>'}
        </div>
        <div className="pl-8">
          {'{'} showModal && {'<'}<span className="text-yellow-400">HeavyModal</span> onClose={'{...}'} {'/>'} {'}'}
        </div>
        <div className="pl-4">
          {'</'}<span className="text-yellow-400">Suspense</span>{'>'}
        </div>
        <div>);</div>
      </div>

      {/* The Suspense Boundary */}
      <Suspense fallback={
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-dark-800 border border-dark-700 p-6 rounded-xl flex items-center gap-4 shadow-2xl animate-slideUp">
            <Loader2 className="animate-spin text-brand-400" size={32} />
            <div>
              <div className="text-white font-bold">Fetching Bundle...</div>
              <div className="text-xs text-slate-400">components-HeavyModal.chunk.js</div>
            </div>
          </div>
        </div>
      }>
        {showModal && <HeavyModal onClose={() => setShowModal(false)} />}
      </Suspense>
    </div>
  );
};

const BrowserViz = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = Number(entry.target.getAttribute('data-id'));
        if (entry.isIntersecting) {
          setVisibleItems(prev => new Set(prev).add(id));
        } else {
          setVisibleItems(prev => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
        }
      });
    }, { threshold: 0.5, root: document.getElementById('scroll-container') });

    document.querySelectorAll('.observer-item').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Intersection Observer API</h2>
        <div className="flex gap-2 text-sm">
          <span className="bg-dark-800 px-3 py-1 rounded text-slate-300">Visible: <span className="text-brand-400 font-mono">{visibleItems.size}</span></span>
        </div>
      </div>
      
      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 grid md:grid-cols-2 gap-8">
        <div>
          <p className="text-slate-400 mb-4 text-sm">
            Scroll the list. Elements turn green when &gt;50% visible. This is how infinite scroll and lazy loading work under the hood without scroll listeners.
          </p>
          <div 
            id="scroll-container" 
            className="h-80 overflow-y-auto border border-dark-600 rounded-lg bg-dark-900 p-4 space-y-4 shadow-inner"
          >
            {Array.from({length: 20}).map((_, i) => (
              <div 
                key={i}
                data-id={i}
                className={`observer-item h-24 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  visibleItems.has(i) 
                    ? 'bg-brand-900/50 border-brand-500 text-brand-300 scale-105' 
                    : 'bg-dark-800 border-dark-700 text-dark-600'
                } border-2`}
              >
                <span className="font-mono text-lg font-bold">Item {i + 1}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-4">
           <div className="bg-dark-950 p-4 rounded-lg border border-dark-600 font-mono text-xs text-slate-400 shadow-inner">
             <div className="text-purple-400">new</div> IntersectionObserver((entries) ={'>'} {'{'}<br/>
             &nbsp;&nbsp;entries.forEach(entry ={'>'} {'{'}<br/>
             &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-brand-300">if</span> (entry.isIntersecting) {'{'}<br/>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500">// Load Image / Fetch Data</span><br/>
             &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br/>
             &nbsp;&nbsp;{'}'});<br/>
             {'}'}, {'{'} <span className="text-brand-300">threshold</span>: 0.5 {'}'});
           </div>
           <div className="bg-brand-900/20 border border-brand-500/20 p-4 rounded-lg">
             <div className="flex items-center gap-2 text-brand-400 font-bold text-sm mb-1"><Eye size={16}/> Why use this?</div>
             <p className="text-xs text-brand-200/70">
               Unlike <code>onScroll</code>, this runs off the main thread. It doesn't cause jank even with complex logic.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export const PerformanceDemo: React.FC<{ isLearnMode?: boolean, initialTab?: string }> = ({ isLearnMode = false, initialTab = 'rendering' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  if (isLearnMode) {
    return <PerformanceGuide activeTab={activeTab} setActiveTab={setActiveTab} />;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-dark-700 mb-6">
        {[
          {id: 'rendering', label: 'Render Profiler'},
          {id: 'splitting', label: 'Code Splitting', icon: <Layers size={14} />},
          {id: 'debugging', label: 'Performance Debugging'},
          {id: 'browser', label: 'Intersection Observer'},
        ].map(t => (
          <button 
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap active:scale-95 ${activeTab === t.id ? 'bg-white text-black scale-105 shadow' : 'bg-dark-800 text-slate-400 hover:text-white hover:scale-105'}`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>
      
      {activeTab === 'rendering' && <RenderViz />}
      {activeTab === 'splitting' && <LazyViz />}
      {activeTab === 'debugging' && <RenderViz />} 
      {activeTab === 'browser' && <BrowserViz />}
    </div>
  );
};