import React, { useState, useRef, useMemo, useEffect } from 'react';
import { AlertCircle, CheckCircle2, BookOpen, Layers, MousePointer2, ChevronRight, Layout, Database, Palette, ShieldCheck, Terminal, Accessibility, ArrowDown, Keyboard } from 'lucide-react';

// --- BLOG CONTENT COMPONENT ---
const SystemDesignGuide = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => {
  const tabs = [
    { id: 'arch', label: 'Architecture', icon: <Layout size={16} /> },
    { id: 'state', label: 'State Mgmt', icon: <Database size={16} /> },
    { id: 'css', label: 'Styling', icon: <Palette size={16} /> },
    { id: 'tools', label: 'Build & Test', icon: <Terminal size={16} /> },
    { id: 'a11y', label: 'A11y', icon: <Accessibility size={16} /> },
  ];

  return (
    <div className="space-y-8 max-w-5xl animate-fadeIn pb-24">
      <div className="border-b border-dark-700 pb-6">
        <h2 className="text-3xl font-bold text-white mb-4">Frontend System Design</h2>
        <div className="flex flex-wrap gap-3 text-sm text-slate-400">
          <span className="bg-brand-900/30 text-brand-300 px-2 py-1 rounded border border-brand-500/20">Scalability</span>
          <span className="bg-brand-900/30 text-brand-300 px-2 py-1 rounded border border-brand-500/20">Maintainability</span>
          <span className="bg-brand-900/30 text-brand-300 px-2 py-1 rounded border border-brand-500/20">Trade-offs</span>
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
             {/* Component Architecture */}
             <section>
              <h3 className="text-2xl font-bold text-white mb-4">Component Architecture</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-brand-500/30 transition-all hover:bg-dark-800/80">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <Layers className="text-brand-400" size={18} />
                    Composition Patterns
                  </h4>
                  <p className="text-sm mb-4">Building flexible components through children and props rather than inheritance.</p>
                  <div className="bg-dark-900 p-3 rounded text-xs text-brand-200 border border-brand-500/20 mb-3">
                    <strong>Interview Question:</strong> "Design a reusable Modal component."
                  </div>
                  <ul className="list-disc pl-4 text-sm text-slate-400 space-y-1">
                    <li><strong>Compound Components:</strong> <code>&lt;Menu&gt;&lt;Menu.Item /&gt;&lt;/Menu&gt;</code></li>
                    <li><strong>Render Props:</strong> For complex logic sharing.</li>
                    <li><strong>Controlled vs Uncontrolled:</strong> Who owns the state?</li>
                  </ul>
                </div>

                <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-brand-500/30 transition-all hover:bg-dark-800/80">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <CheckCircle2 className="text-green-400" size={18} />
                    Component Splitting
                  </h4>
                  <p className="text-sm mb-4">Breaking large components into focused pieces.</p>
                  <div className="bg-dark-900 p-3 rounded text-xs text-brand-200 border border-brand-500/20 mb-3">
                    <strong>Interview Question:</strong> "Refactor this 800-line UserProfile component."
                  </div>
                  <ul className="list-disc pl-4 text-sm text-slate-400 space-y-1">
                    <li><strong>Single Responsibility:</strong> One reason to change.</li>
                    <li><strong>Container vs Presentational:</strong> Logic vs UI.</li>
                    <li><strong>Custom Hooks:</strong> Extract logic (e.g., <code>useUserFetcher</code>).</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'state' && (
          <div className="space-y-8 animate-fadeIn">
            <section>
              <h3 className="text-2xl font-bold text-white mb-4">State Management Strategy</h3>
              <p className="text-lg leading-relaxed mb-6">
                The most common trade-off question: "Redux or Context?" The answer depends on frequency of updates and app complexity.
              </p>

              <div className="space-y-6">
                <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-brand-500/30 transition-all hover:bg-dark-800/80">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-white text-lg">Local State (useState)</h4>
                    <span className="text-xs bg-dark-700 px-2 py-1 rounded text-slate-300">Simple UI</span>
                  </div>
                  <p className="text-sm text-slate-400 mb-2">Best for forms, toggles, and isolated component interaction.</p>
                </div>

                <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-brand-500/30 transition-all hover:bg-dark-800/80">
                   <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-white text-lg">Context API</h4>
                    <span className="text-xs bg-dark-700 px-2 py-1 rounded text-slate-300">Low Frequency Global</span>
                  </div>
                  <p className="text-sm text-slate-400 mb-2">Perfect for Theme, Auth User, Language. <strong>Pitfall:</strong> Re-renders all consumers on any update.</p>
                </div>

                <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-brand-500/30 transition-all hover:bg-dark-800/80">
                   <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-white text-lg">Global Stores (Zustand / Redux)</h4>
                    <span className="text-xs bg-dark-700 px-2 py-1 rounded text-slate-300">Complex Interactions</span>
                  </div>
                  <p className="text-sm text-slate-400 mb-2">Use when action A affects components X, Y, and Z. Zustand is modern/minimal; Redux is battle-tested/verbose.</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'css' && (
          <div className="space-y-8 animate-fadeIn">
            <section>
              <h3 className="text-2xl font-bold text-white mb-6">Styling Architecture</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-brand-500/30 transition-all hover:bg-dark-800/80">
                  <h4 className="font-bold text-white mb-3">Utility-First (Tailwind)</h4>
                  <ul className="text-sm text-slate-400 space-y-2">
                    <li className="flex gap-2"><span className="text-green-400">✓</span> Small bundle size (purged)</li>
                    <li className="flex gap-2"><span className="text-green-400">✓</span> Rapid development</li>
                    <li className="flex gap-2"><span className="text-red-400">×</span> HTML verbosity</li>
                  </ul>
                </div>

                <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-brand-500/30 transition-all hover:bg-dark-800/80">
                  <h4 className="font-bold text-white mb-3">CSS-in-JS (Styled Components)</h4>
                  <ul className="text-sm text-slate-400 space-y-2">
                    <li className="flex gap-2"><span className="text-green-400">✓</span> Dynamic styling via props</li>
                    <li className="flex gap-2"><span className="text-green-400">✓</span> Critical CSS automatic extraction</li>
                    <li className="flex gap-2"><span className="text-red-400">×</span> Runtime performance cost</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'a11y' && (
          <div className="space-y-8 animate-fadeIn">
             <section>
              <h3 className="text-2xl font-bold text-white mb-6">Accessibility (a11y)</h3>
              <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 mb-6 hover:border-brand-500/30 transition-all hover:bg-dark-800/80">
                <h4 className="font-bold text-white mb-2">The Golden Rule</h4>
                <p className="text-lg text-slate-300 italic mb-4">"The best ARIA is no ARIA."</p>
                <p className="text-sm text-slate-400">
                  Always use semantic HTML (<code>&lt;button&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>) before reaching for <code>role="button"</code>.
                </p>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'tools' && (
           <div className="space-y-8 animate-fadeIn">
            <section>
              <h3 className="text-2xl font-bold text-white mb-6">Testing & Tools</h3>
              <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-dark-800 p-5 rounded-xl border border-dark-700 hover:border-brand-500/30 transition-all hover:bg-dark-800/80">
                    <h5 className="font-bold text-white mb-2">Unit Testing</h5>
                    <p className="text-xs text-slate-400 mb-2">Jest / Vitest</p>
                    <p className="text-xs text-slate-500">Test individual functions and hooks in isolation.</p>
                  </div>
                  <div className="bg-dark-800 p-5 rounded-xl border border-dark-700 hover:border-brand-500/30 transition-all hover:bg-dark-800/80">
                    <h5 className="font-bold text-white mb-2">Integration</h5>
                    <p className="text-xs text-slate-400 mb-2">React Testing Library</p>
                    <p className="text-xs text-slate-500">Test how components work together.</p>
                  </div>
                  <div className="bg-dark-800 p-5 rounded-xl border border-dark-700 hover:border-brand-500/30 transition-all hover:bg-dark-800/80">
                    <h5 className="font-bold text-white mb-2">E2E</h5>
                    <p className="text-xs text-slate-400 mb-2">Playwright / Cypress</p>
                    <p className="text-xs text-slate-500">Test full user flows in a real browser.</p>
                  </div>
                </div>
            </section>
           </div>
        )}
      </div>
    </div>
  );
};

// --- VISUALIZATION: VIRTUALIZATION ---
const VirtualizationViz = () => {
  const [dataCount] = useState(10000);
  const [isVirtualized, setIsVirtualized] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  
  // Data generation (memoized)
  const allData = useMemo(() => Array.from({ length: dataCount }, (_, i) => ({
    id: i,
    value: Math.floor(Math.random() * 1000) + 500,
    metrics: { cpu: Math.random() * 100 }
  })), [dataCount]);

  // Virtualization Logic
  const itemHeight = 40;
  const windowHeight = 400;
  const totalHeight = allData.length * itemHeight;
  
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(allData.length - 1, Math.floor((scrollTop + windowHeight) / itemHeight));

  const visibleItems = [];
  const buffer = 5;
  const startBuffer = Math.max(0, startIndex - buffer);
  const endBuffer = Math.min(allData.length - 1, endIndex + buffer);

  for (let i = startBuffer; i <= endBuffer; i++) {
    visibleItems.push({ ...allData[i], top: i * itemHeight });
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
          <div>
             <h2 className="text-2xl font-bold text-white mb-2">Large List Rendering</h2>
             <p className="text-slate-400">Rendering {dataCount.toLocaleString()} items.</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button onClick={() => setIsVirtualized(true)} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all ${isVirtualized ? 'bg-green-500/10 text-green-400 shadow-sm scale-105' : 'bg-dark-700 text-slate-400 hover:text-white'}`}>Virtualized</button>
            <button onClick={() => setIsVirtualized(false)} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all ${!isVirtualized ? 'bg-red-500/10 text-red-400 shadow-sm scale-105' : 'bg-dark-700 text-slate-400 hover:text-white'}`}>Naive</button>
          </div>
        </div>

        <div className="text-xs font-mono text-slate-500 mb-2">DOM Nodes: <span className={isVirtualized ? "text-green-400" : "text-red-400"}>{isVirtualized ? visibleItems.length * 5 : (dataCount > 2000 ? '2000 (Capped)' : dataCount * 5)}</span></div>

        <div className="border border-dark-600 rounded-lg bg-dark-900 relative overflow-hidden" style={{ height: windowHeight }}>
          <div ref={containerRef} onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)} className="h-full overflow-y-auto relative scroll-smooth">
            {isVirtualized ? (
              <div style={{ height: totalHeight, position: 'relative' }}>
                {visibleItems.map(item => (
                  <div key={item.id} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: itemHeight, transform: `translateY(${item.top}px)` }} className="flex items-center border-b border-dark-700 px-4">
                    <div className="w-16 font-mono text-xs text-slate-500">#{item.id}</div>
                    <div className="w-full h-2 bg-dark-700 rounded-full"><div className="h-full bg-brand-500" style={{ width: `${item.metrics.cpu}%` }}></div></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col">
                {allData.slice(0, 2000).map(item => (
                   <div key={item.id} style={{ height: itemHeight }} className="flex items-center border-b border-dark-700 px-4">
                     <div className="w-16 font-mono text-xs text-slate-500">#{item.id}</div>
                     <div className="w-full h-2 bg-dark-700 rounded-full"><div className="h-full bg-brand-500" style={{ width: `${item.metrics.cpu}%` }}></div></div>
                   </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- VISUALIZATION: STATE MANAGEMENT ---
const StateViz = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [mode, setMode] = useState<'props' | 'context'>('props');

  // Simple tree structure
  const nodes = [
    { id: 'root', label: 'App', x: 50, y: 10, parent: null },
    { id: 'mid1', label: 'Layout', x: 30, y: 40, parent: 'root' },
    { id: 'mid2', label: 'Sidebar', x: 70, y: 40, parent: 'root' },
    { id: 'leaf1', label: 'Header', x: 20, y: 80, parent: 'mid1' },
    { id: 'leaf2', label: 'Content', x: 40, y: 80, parent: 'mid1' }, // Target
    { id: 'leaf3', label: 'Menu', x: 70, y: 80, parent: 'mid2' },
  ];

  const triggerUpdate = () => {
    setActiveNode('root');
    setTimeout(() => {
      if (mode === 'props') {
        // Cascade down path to leaf2
        setActiveNode('mid1');
        setTimeout(() => {
          setActiveNode('leaf2');
          setTimeout(() => setActiveNode(null), 800);
        }, 800);
      } else {
        // Context: Direct jump (conceptually) or Consumer update
        setActiveNode('leaf2');
        setTimeout(() => setActiveNode(null), 800);
      }
    }, 800);
  };

  return (
    <div className="bg-dark-800 p-8 rounded-xl border border-dark-700">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">State Propagation</h2>
          <p className="text-sm text-slate-400">Visualizing how data flows to the "Content" component.</p>
        </div>
        <div className="flex bg-dark-900 rounded-lg p-1 border border-dark-600">
          <button onClick={() => setMode('props')} className={`px-4 py-2 rounded text-sm transition-all ${mode === 'props' ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}>Prop Drilling</button>
          <button onClick={() => setMode('context')} className={`px-4 py-2 rounded text-sm transition-all ${mode === 'context' ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}>Context API</button>
        </div>
      </div>

      <div className="relative h-64 border border-dark-700 bg-dark-950 rounded-lg overflow-hidden flex items-center justify-center">
        {/* Render lines first */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {nodes.filter(n => n.parent).map(n => {
            const parent = nodes.find(p => p.id === n.parent)!;
            const isActivePath = mode === 'props' && 
              ((activeNode === 'root' && (n.id === 'mid1' || n.id === 'mid2')) || 
               (activeNode === 'mid1' && n.id === 'leaf2'));
            
            return (
              <line 
                key={n.id} 
                x1={`${parent.x}%`} y1={`${parent.y + 10}%`} 
                x2={`${n.x}%`} y2={`${n.y - 5}%`} 
                stroke={isActivePath ? '#0ea5e9' : '#334155'} 
                strokeWidth="2" 
                className="transition-colors duration-300"
              />
            );
          })}
        </svg>

        {nodes.map(node => (
          <div
            key={node.id}
            className={`absolute px-4 py-2 rounded-lg border text-xs font-bold transition-all duration-500 transform -translate-x-1/2 -translate-y-1/2
              ${activeNode === node.id 
                ? 'bg-brand-500 border-brand-400 text-white scale-110 shadow-[0_0_15px_rgba(14,165,233,0.5)]' 
                : node.id === 'leaf2' 
                  ? 'bg-dark-800 border-brand-900 text-brand-200' 
                  : 'bg-dark-800 border-dark-600 text-slate-500'
              }`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            {node.label}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button onClick={triggerUpdate} className="flex items-center gap-2 bg-white text-dark-900 px-6 py-2 rounded-full font-bold hover:bg-slate-200 transition-all active:scale-95 shadow-lg">
          <MousePointer2 size={16} />
          Trigger Update
        </button>
      </div>
      <p className="text-center text-xs text-slate-500 mt-4">
        {mode === 'props' ? 'Updates pass through every intermediate parent.' : 'Updates bypass intermediate components (mostly).'}
      </p>
    </div>
  );
};

// --- VISUALIZATION: CSS LAYOUTS ---
const CssViz = () => {
  const [layout, setLayout] = useState<'block' | 'flex-row' | 'flex-col' | 'grid'>('flex-row');

  return (
    <div className="bg-dark-800 p-8 rounded-xl border border-dark-700">
      <h2 className="text-xl font-bold text-white mb-6">Layout Engine Playground</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {['block', 'flex-row', 'flex-col', 'grid'].map(l => (
          <button 
            key={l}
            onClick={() => setLayout(l as any)}
            className={`p-3 rounded-lg border text-sm font-mono transition-all ${layout === l ? 'bg-brand-600 border-brand-500 text-white shadow-lg scale-105' : 'bg-dark-900 border-dark-600 text-slate-400 hover:text-white'}`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className={`bg-dark-950 p-4 rounded-xl border border-dark-600 min-h-[300px] gap-4 transition-all duration-500
        ${layout === 'block' ? 'block' : ''}
        ${layout === 'flex-row' ? 'flex flex-row flex-wrap items-start' : ''}
        ${layout === 'flex-col' ? 'flex flex-col items-stretch' : ''}
        ${layout === 'grid' ? 'grid grid-cols-3' : ''}
      `}>
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className={`bg-brand-900/40 border border-brand-500/30 rounded-lg p-6 flex items-center justify-center text-2xl font-bold text-brand-400 shadow-sm
            ${layout === 'block' ? 'mb-4' : ''}
            ${layout === 'grid' && i === 1 ? 'col-span-2' : ''}
          `}>
            {i}
          </div>
        ))}
      </div>
      
      <div className="mt-4 bg-black rounded p-4 font-mono text-xs text-green-400 overflow-x-auto border border-dark-700">
        .{layout} {'{'}<br/>
        &nbsp;&nbsp;display: {layout.includes('flex') ? 'flex' : layout};<br/>
        {layout === 'flex-row' && <span>&nbsp;&nbsp;flex-direction: row;<br/>&nbsp;&nbsp;flex-wrap: wrap;<br/></span>}
        {layout === 'flex-col' && <span>&nbsp;&nbsp;flex-direction: column;<br/></span>}
        {layout === 'grid' && <span>&nbsp;&nbsp;grid-template-columns: repeat(3, 1fr);<br/></span>}
        &nbsp;&nbsp;gap: 1rem;<br/>
        {'}'}
      </div>
    </div>
  );
};

// --- VISUALIZATION: ACCESSIBILITY ---
const AccessibilityViz = () => {
  return (
    <div className="space-y-6">
      <div className="bg-dark-800 p-8 rounded-xl border border-dark-700">
        <h2 className="text-xl font-bold text-white mb-4">Semantic HTML vs Div Soup</h2>
        <p className="text-slate-400 mb-8">Try navigating the buttons below using only your <code className="bg-dark-950 px-1 py-0.5 rounded">Tab</code> key.</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-red-400 font-bold flex items-center gap-2"><AlertCircle size={18} /> The "Div" Button</h3>
            <div 
              className="bg-dark-700 p-4 rounded text-center text-slate-300 cursor-pointer hover:bg-dark-600 transition-colors"
              onClick={() => alert('Clicked Div!')}
            >
              I am a div
            </div>
            <div className="text-xs text-slate-500 font-mono bg-dark-950 p-3 rounded">
              &lt;div onclick="..."&gt;...&lt;/div&gt;<br/>
              <span className="text-red-500">❌ Not focusable</span><br/>
              <span className="text-red-500">❌ No screen reader role</span><br/>
              <span className="text-red-500">❌ No Enter/Space support</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-green-400 font-bold flex items-center gap-2"><CheckCircle2 size={18} /> The Real Button</h3>
            <button 
              className="w-full bg-brand-600 p-4 rounded text-center text-white font-medium hover:bg-brand-500 focus:ring-2 focus:ring-brand-400 focus:outline-none transition-all active:scale-95 shadow-lg"
              onClick={() => alert('Clicked Button!')}
            >
              I am a &lt;button&gt;
            </button>
            <div className="text-xs text-slate-500 font-mono bg-dark-950 p-3 rounded">
              &lt;button onClick="..."&gt;...&lt;/button&gt;<br/>
              <span className="text-green-500">✓ Focusable by default</span><br/>
              <span className="text-green-500">✓ Implicit Role="button"</span><br/>
              <span className="text-green-500">✓ Native keyboard support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- VISUALIZATION: TESTING ---
const TestingViz = () => {
  return (
    <div className="bg-dark-800 p-8 rounded-xl border border-dark-700 flex flex-col items-center text-center">
      <div className="w-20 h-20 bg-dark-700 rounded-full flex items-center justify-center mb-6 shadow-inner">
        <Terminal className="text-brand-400" size={32} />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">The Testing Trophy</h2>
      <p className="text-slate-400 max-w-md mb-8">
        "Write tests. Not too many. Mostly integration." — Kent C. Dodds
      </p>

      <div className="flex flex-col-reverse w-full max-w-sm gap-1">
        <div className="h-12 w-full bg-brand-900/30 border border-brand-500/20 rounded flex items-center justify-center text-xs text-brand-200">
          Static Analysis (ESLint, TS) - Cheapest
        </div>
        <div className="h-16 w-full bg-brand-800/40 border border-brand-500/30 rounded flex items-center justify-center text-sm text-brand-100 font-medium">
          Unit Tests (Jest)
        </div>
        <div className="h-32 w-full bg-brand-600 border border-brand-400/50 rounded flex items-center justify-center text-lg text-white font-bold shadow-[0_0_20px_rgba(14,165,233,0.3)] animate-pulseSlow">
          Integration Tests (RTL)
        </div>
        <div className="h-12 w-3/4 mx-auto bg-purple-600/80 border border-purple-400/50 rounded flex items-center justify-center text-xs text-white">
          E2E (Cypress/Playwright) - Costly
        </div>
      </div>
    </div>
  );
};

export const SystemDesignDemo: React.FC<{ isLearnMode?: boolean, initialTab?: string }> = ({ isLearnMode = false, initialTab = 'arch' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  if (isLearnMode) {
    return <SystemDesignGuide activeTab={activeTab} setActiveTab={setActiveTab} />;
  }

  // Practice Mode Routing
  return (
    <div className="space-y-6 animate-fadeIn">
       <div className="flex gap-2 overflow-x-auto pb-2 border-b border-dark-700 mb-6 scrollbar-hide">
        {[
          {id: 'arch', label: 'Virtualization'},
          {id: 'state', label: 'State Viz'},
          {id: 'css', label: 'CSS Lab'},
          {id: 'a11y', label: 'Accessibility'},
          {id: 'tools', label: 'Testing Strategy'},
        ].map(t => (
          <button 
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap active:scale-95 ${activeTab === t.id ? 'bg-white text-black scale-105 shadow' : 'bg-dark-800 text-slate-400 hover:text-white hover:scale-105'}`}
          >
            {t.label}
          </button>
        ))}
       </div>

       {activeTab === 'arch' && <VirtualizationViz />}
       {activeTab === 'state' && <StateViz />}
       {activeTab === 'css' && <CssViz />}
       {activeTab === 'a11y' && <AccessibilityViz />}
       {activeTab === 'tools' && <TestingViz />}
    </div>
  );
};