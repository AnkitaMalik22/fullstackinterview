import React from 'react';
import { X, BarChart2, PieChart, Activity, Download } from 'lucide-react';

// This component simulates a heavy dependency (like a charting library or rich text editor)
// In a real app, this file would be excluded from the main bundle and loaded on demand.

const HeavyModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-dark-800 border border-dark-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-slideUp">
        
        {/* Header */}
        <div className="p-6 border-b border-dark-700 flex justify-between items-center bg-dark-900/50">
          <div className="flex items-center gap-3">
            <div className="bg-purple-500/10 p-2 rounded-lg text-purple-400">
              <Activity size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Heavy Analytics Dashboard</h3>
              <p className="text-xs text-slate-400">Loaded lazily via React.Suspense</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Body - Simulating complex rendering */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-dark-950 rounded-xl p-4 border border-dark-700 relative h-48 flex items-end justify-between gap-2">
            {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
              <div key={i} className="w-full bg-brand-600/20 rounded-t-sm relative group">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-brand-500 rounded-t-sm transition-all duration-1000" 
                  style={{ height: `${h}%` }}
                ></div>
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded">
                  {h}%
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="bg-dark-950 rounded-xl p-4 border border-dark-700 flex items-center gap-4">
              <div className="bg-green-500/10 p-3 rounded-full text-green-400">
                <BarChart2 size={20} />
              </div>
              <div>
                <div className="text-2xl font-mono text-white">2.4MB</div>
                <div className="text-xs text-slate-500">Bundle Size Saved</div>
              </div>
            </div>
            
            <div className="bg-dark-950 rounded-xl p-4 border border-dark-700 flex items-center gap-4">
              <div className="bg-blue-500/10 p-3 rounded-full text-blue-400">
                <PieChart size={20} />
              </div>
              <div>
                <div className="text-2xl font-mono text-white">120ms</div>
                <div className="text-xs text-slate-500">TTI Improvement</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-dark-900/50 rounded-lg p-4 border border-dashed border-dark-600 text-xs font-mono text-slate-400">
            <p className="mb-2 text-purple-400 font-bold">// Code Split Implementation</p>
            <p>const HeavyModal = React.lazy(() =&gt; import('./HeavyModal'));</p>
            <p className="mt-2 text-slate-500">
              This component was not included in the initial JavaScript download. 
              The browser fetched `components-HeavyModal.js` only when you clicked the button.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-dark-950 border-t border-dark-700 flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-sm font-medium transition-colors">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeavyModal;
