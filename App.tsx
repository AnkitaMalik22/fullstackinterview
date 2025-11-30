import React, { useState, Suspense } from 'react';
import { ViewState } from './types';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { InterviewCoach } from './components/InterviewCoach';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { BookOpen, Code2, Menu, Loader2 } from 'lucide-react';

// --- ROUTE-BASED CODE SPLITTING ---
// We lazily load these heavy components so the initial page load (Dashboard) is faster.
// The user only downloads 'SystemDesignDemo' code when they actually navigate to it.

// Helper to handle named exports with React.lazy
const lazyImport = <T extends React.ComponentType<any>>(
  factory: () => Promise<{ [key: string]: T }>, 
  name: string
): React.LazyExoticComponent<T> => {
  return React.lazy(() => factory().then(module => ({ default: module[name as keyof typeof module] })));
};

const SystemDesignDemo = lazyImport(() => import('./components/SystemDesignDemo'), 'SystemDesignDemo');
const PerformanceDemo = lazyImport(() => import('./components/PerformanceDemo'), 'PerformanceDemo');
const ApiResilienceDemo = lazyImport(() => import('./components/ApiResilienceDemo'), 'ApiResilienceDemo');
const BackendDemo = lazyImport(() => import('./components/BackendDemo'), 'BackendDemo');
const DataStructuresDemo = lazyImport(() => import('./components/DataStructuresDemo'), 'DataStructuresDemo');
const AlgorithmsDemo = lazyImport(() => import('./components/AlgorithmsDemo'), 'AlgorithmsDemo');
const BackendSystemDesign = lazyImport(() => import('./components/BackendSystemDesign'), 'BackendSystemDesign');
const FrontendDSADemo = lazyImport(() => import('./components/FrontendDSADemo'), 'FrontendDSADemo');

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [isLearnMode, setIsLearnMode] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <Dashboard onNavigate={setCurrentView} />;
      
      // Architecture Mappings
      case ViewState.ARCHITECTURE:
        return <SystemDesignDemo isLearnMode={isLearnMode} initialTab="arch" />;
      case ViewState.STATE_MANAGEMENT:
        return <SystemDesignDemo isLearnMode={isLearnMode} initialTab="state" />;
      case ViewState.CSS_STYLING:
        return <SystemDesignDemo isLearnMode={isLearnMode} initialTab="css" />;
      case ViewState.ACCESSIBILITY:
        return <SystemDesignDemo isLearnMode={isLearnMode} initialTab="a11y" />;
      case ViewState.TESTING:
        return <SystemDesignDemo isLearnMode={isLearnMode} initialTab="tools" />;

      // Performance Mappings
      case ViewState.PERFORMANCE_LAB:
        return <PerformanceDemo isLearnMode={isLearnMode} initialTab="rendering" />;
      case ViewState.DEBUGGING:
        return <PerformanceDemo isLearnMode={isLearnMode} initialTab="debugging" />;
      case ViewState.BROWSER_APIS:
        return <PerformanceDemo isLearnMode={isLearnMode} initialTab="browser" />;

      // Resilience Mappings
      case ViewState.API_RESILIENCE:
        return <ApiResilienceDemo isLearnMode={isLearnMode} initialTab="fetching" />;
      case ViewState.SECURITY:
        return <ApiResilienceDemo isLearnMode={isLearnMode} initialTab="xss" />;

      // Backend & DSA Mappings
      case ViewState.BACKEND_SYSTEM:
        return <BackendDemo isLearnMode={isLearnMode} initialTab="arch" />;
      case ViewState.BACKEND_DB:
        return <BackendDemo isLearnMode={isLearnMode} initialTab="db" />;
      case ViewState.BACKEND_API:
        return <BackendDemo isLearnMode={isLearnMode} initialTab="api" />;
      case ViewState.BACKEND_SECURITY:
        return <BackendDemo isLearnMode={isLearnMode} initialTab="sql" />;
      case ViewState.DSA_STRUCTURES:
        return <DataStructuresDemo isLearnMode={isLearnMode} />;
      case ViewState.DSA_ALGORITHMS:
        return <AlgorithmsDemo isLearnMode={isLearnMode} />;

      // Backend System Design (Caching, Queues, Load Balancing, etc.)
      case ViewState.BACKEND_SYSDESIGN:
        return <BackendSystemDesign />;

      // Frontend-Specific DSA (Virtual DOM, Event Loop, etc.)
      case ViewState.FRONTEND_DSA:
        return <FrontendDSADemo />;

      case ViewState.AI_COACH:
        return <InterviewCoach />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  const PageLoader = () => (
    <div className="flex flex-col items-center justify-center h-64 animate-fadeIn">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-dark-700 border-t-brand-500 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-brand-400 rounded-full"></div>
        </div>
      </div>
      <p className="mt-4 text-slate-500 font-mono text-xs">Loading Module...</p>
    </div>
  );

  return (
    <div className="flex h-screen bg-dark-900 text-slate-200 overflow-hidden font-sans">
      <Navigation 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header Area */}
        <header className="h-16 border-b border-dark-700 flex items-center justify-between px-4 md:px-8 bg-dark-900/80 backdrop-blur-md shrink-0 z-20">
          <div className="flex items-center gap-3">
             <button 
               className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-dark-800 transition-colors"
               onClick={() => setIsMobileMenuOpen(true)}
             >
               <Menu size={24} />
             </button>

            <div className="flex items-center gap-2 text-sm text-slate-400 truncate">
              <span className="hover:text-white cursor-pointer hidden md:inline" onClick={() => setCurrentView(ViewState.HOME)}>Home</span>
              <span className="hidden md:inline">/</span>
              <span className="text-white font-medium capitalize truncate max-w-[150px] md:max-w-none">
                {currentView.replace(/_/g, ' ').toLowerCase()}
              </span>
            </div>
          </div>

          {/* Mode Toggle */}
          {currentView !== ViewState.HOME && currentView !== ViewState.AI_COACH && (
            <div className="flex items-center bg-dark-800 rounded-lg p-1 border border-dark-700 shrink-0">
              <button
                onClick={() => setIsLearnMode(false)}
                className={`px-2 md:px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
                  !isLearnMode 
                    ? 'bg-dark-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 size={14} />
                <span className="hidden md:inline">Interactive</span>
              </button>
              <button
                onClick={() => setIsLearnMode(true)}
                className={`px-2 md:px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
                  isLearnMode 
                    ? 'bg-brand-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen size={14} />
                <span className="hidden md:inline">Theory</span>
              </button>
            </div>
          )}
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth w-full">
          <div className="max-w-6xl mx-auto h-full pb-24">
            <ErrorBoundary>
              <Suspense fallback={<PageLoader />}>
                {renderContent()}
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;