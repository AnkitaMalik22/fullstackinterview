import React, { useState, Suspense, lazy } from 'react';
import { 
  BookOpen, Database, Lock, Zap, MessageSquare, Shield, 
  Activity, Hash, Clock, Link, Search, Building2 
} from 'lucide-react';

// Lazy load all visualizer components for code splitting
const IntroductionViz = lazy(() => import('./visualizers/IntroductionViz'));
const DatabaseDesignViz = lazy(() => import('./visualizers/DatabaseDesignViz'));
const IsolationLevelsViz = lazy(() => import('./visualizers/IsolationLevelsViz'));
const CachingViz = lazy(() => import('./visualizers/CachingViz'));
const MessageQueueViz = lazy(() => import('./visualizers/MessageQueueViz'));
const LoadBalancerViz = lazy(() => import('./visualizers/LoadBalancerViz'));
const CircuitBreakerViz = lazy(() => import('./visualizers/CircuitBreakerViz'));
const ConsistentHashingViz = lazy(() => import('./visualizers/ConsistentHashingViz'));
const RateLimitingViz = lazy(() => import('./visualizers/RateLimitingViz'));
const URLShortenerViz = lazy(() => import('./visualizers/URLShortenerViz'));
const WebCrawlerViz = lazy(() => import('./visualizers/WebCrawlerViz'));
const CaseStudiesViz = lazy(() => import('./visualizers/CaseStudiesViz'));

// Loading fallback component
const LoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-brand-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-slate-400 text-sm">Loading visualizer...</p>
    </div>
  </div>
);

export const BackendSystemDesign: React.FC = () => {
  const [activeViz, setActiveViz] = useState('intro');

  const visualizers = [
    { id: 'intro', label: 'Introduction', icon: <BookOpen size={16} /> },
    { id: 'database', label: 'Databases', icon: <Database size={16} /> },
    { id: 'isolation', label: 'Isolation Levels', icon: <Lock size={16} /> },
    { id: 'caching', label: 'Caching', icon: <Zap size={16} /> },
    { id: 'queues', label: 'Async & Queues', icon: <MessageSquare size={16} /> },
    { id: 'resiliency', label: 'Load Balancing', icon: <Shield size={16} /> },
    { id: 'circuitbreaker', label: 'Circuit Breaker', icon: <Activity size={16} /> },
    { id: 'hashing', label: 'Consistent Hashing', icon: <Hash size={16} /> },
    { id: 'ratelimit', label: 'Rate Limiting', icon: <Clock size={16} /> },
    { id: 'urlshortener', label: 'URL Shortener', icon: <Link size={16} /> },
    { id: 'webcrawler', label: 'Web Crawler', icon: <Search size={16} /> },
    { id: 'casestudies', label: 'Case Studies', icon: <Building2 size={16} /> },
  ];

  const renderVisualizer = () => {
    switch (activeViz) {
      case 'intro':
        return <IntroductionViz />;
      case 'database':
        return <DatabaseDesignViz />;
      case 'isolation':
        return <IsolationLevelsViz />;
      case 'caching':
        return <CachingViz />;
      case 'queues':
        return <MessageQueueViz />;
      case 'resiliency':
        return <LoadBalancerViz />;
      case 'circuitbreaker':
        return <CircuitBreakerViz />;
      case 'hashing':
        return <ConsistentHashingViz />;
      case 'ratelimit':
        return <RateLimitingViz />;
      case 'urlshortener':
        return <URLShortenerViz />;
      case 'webcrawler':
        return <WebCrawlerViz />;
      case 'casestudies':
        return <CaseStudiesViz />;
      default:
        return <IntroductionViz />;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fadeIn">
      {/* Mobile-optimized horizontal scroll tabs */}
      <div className="flex gap-2 overflow-x-auto pb-3 border-b border-dark-700 mb-4 md:mb-6 scrollbar-hide -mx-3 px-3 md:mx-0 md:px-0">
        {visualizers.map(v => (
          <button
            key={v.id}
            onClick={() => setActiveViz(v.id)}
            title={v.label}
            className={`flex-shrink-0 px-3 md:px-4 py-2.5 md:py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 md:gap-2 touch-manipulation ${
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

      <Suspense fallback={<LoadingFallback />}>
        {renderVisualizer()}
      </Suspense>
    </div>
  );
};

export default BackendSystemDesign;
