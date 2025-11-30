import React, { useState } from 'react';
import { 
  Building2, Target, CheckCircle2, MessageSquare, 
  Car, Tv, Video, Users, Gauge, ShoppingCart 
} from 'lucide-react';

const CaseStudiesViz: React.FC = () => {
  const [activeCase, setActiveCase] = useState<string>('twitter');
  const [viewMode, setViewMode] = useState<'overview' | 'architecture' | 'deep-dive'>('overview');

  const cases: Record<string, {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    scale: string;
    color: string;
    components: Array<{ name: string; color: string; desc: string }>;
    keyDecisions: Array<{ q: string; a: string }>;
    architecture?: {
      layers: Array<{ name: string; items: string[]; color: string }>;
      dataFlow: string[];
    };
    interviewTips: string[];
  }> = {
    twitter: {
      icon: <MessageSquare size={20} />,
      title: 'Design Twitter',
      subtitle: 'Social Media Feed',
      scale: '500M+ users, 500M tweets/day',
      color: 'blue',
      components: [
        { name: 'Tweet Service', color: 'blue', desc: 'Write path: Store tweets' },
        { name: 'Timeline Service', color: 'green', desc: 'Read path: Build feed' },
        { name: 'Fan-out Service', color: 'purple', desc: 'Push tweets to followers' },
        { name: 'Redis Cache', color: 'yellow', desc: 'Hot tweets, user timelines' },
        { name: 'Graph DB', color: 'pink', desc: 'Follow relationships' },
        { name: 'Search (Elasticsearch)', color: 'orange', desc: 'Tweet search, trends' },
      ],
      keyDecisions: [
        { q: 'Pull vs Push?', a: 'Hybrid: Push for normal users, Pull for celebrities (fanout on read)' },
        { q: 'Timeline storage?', a: 'Pre-computed in Redis, limit to 800 tweets per user' },
        { q: 'Database choice?', a: 'MySQL sharded by user_id + Redis + Elasticsearch' },
      ],
      architecture: {
        layers: [
          { name: 'Clients', items: ['iOS App', 'Android App', 'Web App'], color: 'blue' },
          { name: 'Edge', items: ['CDN', 'Load Balancer', 'API Gateway'], color: 'green' },
          { name: 'Services', items: ['Tweet', 'Timeline', 'User', 'Search', 'Notification'], color: 'purple' },
          { name: 'Data', items: ['MySQL (sharded)', 'Redis Cluster', 'Elasticsearch', 'S3 (media)'], color: 'orange' },
        ],
        dataFlow: [
          'User posts tweet → Tweet Service → MySQL + Kafka',
          'Kafka → Fan-out Service → Push to Redis timelines (async)',
          'User opens feed → Timeline Service → Redis cache → Pre-built feed',
          'Celebrity tweet → Stored, fanout on read (when follower requests)',
        ],
      },
      interviewTips: [
        'Mention the celebrity problem (millions of followers)',
        'Discuss hybrid push/pull approach',
        'Talk about eventual consistency for feeds',
        'Mention trends detection using streaming',
      ],
    },
    uber: {
      icon: <Car size={20} />,
      title: 'Design Uber',
      subtitle: 'Ride-Sharing Platform',
      scale: '100M+ users, 5M rides/day',
      color: 'green',
      components: [
        { name: 'Rider Service', color: 'blue', desc: 'Rider app backend' },
        { name: 'Driver Service', color: 'green', desc: 'Driver locations, status' },
        { name: 'Matching Service', color: 'purple', desc: 'Match riders to drivers' },
        { name: 'Location Service', color: 'yellow', desc: 'Real-time GPS, geohashing' },
        { name: 'Pricing Service', color: 'pink', desc: 'Dynamic surge pricing' },
        { name: 'Maps/ETA Service', color: 'orange', desc: 'Route, time estimates' },
      ],
      keyDecisions: [
        { q: 'Location updates?', a: 'Drivers send GPS every 3-4 sec, stored in memory + Redis' },
        { q: 'Finding nearby drivers?', a: 'Geohashing: Convert lat/lng to grid cells, query nearby cells' },
        { q: 'Matching algorithm?', a: 'Dispatch optimization: ETA, driver rating, distance weighted' },
      ],
      architecture: {
        layers: [
          { name: 'Clients', items: ['Rider App', 'Driver App', 'Admin Dashboard'], color: 'blue' },
          { name: 'Real-time', items: ['WebSocket Gateway', 'Location Tracker', 'Push Notifications'], color: 'green' },
          { name: 'Services', items: ['Ride', 'Matching', 'Pricing', 'Payment', 'Maps'], color: 'purple' },
          { name: 'Data', items: ['PostgreSQL', 'Redis (locations)', 'Kafka', 'S3'], color: 'orange' },
        ],
        dataFlow: [
          'Driver location update → WebSocket → Location Service → Redis (geohash)',
          'Rider requests ride → Matching Service → Query nearby drivers from Redis',
          'Match found → Notify both via WebSocket → Track ride state',
          'Ride complete → Payment Service → Update driver/rider ratings',
        ],
      },
      interviewTips: [
        'Geohashing is key for location queries',
        'Discuss real-time requirements (WebSockets)',
        'Mention surge pricing algorithm',
        'Talk about driver-rider matching optimization',
      ],
    },
    netflix: {
      icon: <Tv size={20} />,
      title: 'Design Netflix',
      subtitle: 'Video Streaming',
      scale: '200M+ users, 1B hours streamed/day',
      color: 'red',
      components: [
        { name: 'Content Delivery (CDN)', color: 'blue', desc: 'Open Connect Appliances' },
        { name: 'Recommendation Engine', color: 'green', desc: 'ML-based personalization' },
        { name: 'Transcoding Pipeline', color: 'purple', desc: 'Multiple resolutions/codecs' },
        { name: 'Playback Service', color: 'yellow', desc: 'Adaptive bitrate streaming' },
        { name: 'User Profiles', color: 'pink', desc: 'Watch history, preferences' },
        { name: 'A/B Testing Platform', color: 'orange', desc: 'Continuous experimentation' },
      ],
      keyDecisions: [
        { q: 'Video delivery?', a: 'Pre-position content on ISP-local OCAs (Open Connect)' },
        { q: 'Adaptive streaming?', a: 'Chunk videos into segments, ABR picks quality per segment' },
        { q: 'Recommendations?', a: 'Collaborative filtering + content-based + deep learning' },
      ],
      architecture: {
        layers: [
          { name: 'Clients', items: ['Smart TVs', 'Mobile', 'Web', 'Gaming Consoles'], color: 'blue' },
          { name: 'Edge', items: ['Open Connect CDN', 'AWS CloudFront', 'Regional Caches'], color: 'red' },
          { name: 'Services', items: ['Playback', 'User', 'Recommendation', 'Search', 'Billing'], color: 'purple' },
          { name: 'Data', items: ['Cassandra', 'MySQL', 'Elasticsearch', 'S3 (videos)'], color: 'orange' },
        ],
        dataFlow: [
          'Video upload → Transcoding (100+ formats) → Store in S3 → Push to CDN',
          'User browses → Recommendation Service → Personalized rows',
          'User plays → Playback API → Manifest with CDN URLs',
          'Client streams → Nearest OCA → Adaptive bitrate switching',
        ],
      },
      interviewTips: [
        'Open Connect CDN is their secret sauce',
        'Mention video transcoding to multiple formats',
        'Discuss adaptive bitrate streaming (ABR)',
        'Talk about their microservices architecture',
      ],
    },
    whatsapp: {
      icon: <MessageSquare size={20} />,
      title: 'Design WhatsApp',
      subtitle: 'Messaging Platform',
      scale: '2B+ users, 100B messages/day',
      color: 'green',
      components: [
        { name: 'Gateway Service', color: 'blue', desc: 'Connection management, WebSocket' },
        { name: 'Message Service', color: 'green', desc: 'Store and forward messages' },
        { name: 'Presence Service', color: 'purple', desc: 'Online/offline, last seen' },
        { name: 'Group Service', color: 'yellow', desc: 'Group chat management' },
        { name: 'Media Service', color: 'pink', desc: 'Image/video/audio storage' },
        { name: 'E2E Encryption', color: 'orange', desc: 'Signal protocol implementation' },
      ],
      keyDecisions: [
        { q: 'Message delivery?', a: 'Store-and-forward: Messages queued if recipient offline' },
        { q: 'Connection protocol?', a: 'Custom XMPP-based protocol over TCP + TLS' },
        { q: 'Message storage?', a: 'Messages deleted from server after delivery (E2E encrypted)' },
      ],
      architecture: {
        layers: [
          { name: 'Clients', items: ['iOS', 'Android', 'Web', 'Desktop'], color: 'green' },
          { name: 'Connection', items: ['WebSocket Gateways', 'Load Balancers', 'Connection Registry'], color: 'blue' },
          { name: 'Services', items: ['Message Queue', 'Presence', 'Group', 'Media', 'Sync'], color: 'purple' },
          { name: 'Data', items: ['Mnesia/Cassandra', 'Redis', 'S3 (media)', 'SQLite (client)'], color: 'orange' },
        ],
        dataFlow: [
          'User sends message → Encrypt (E2E) → Gateway → Message Queue',
          'Recipient online → Push immediately via their WebSocket',
          'Recipient offline → Store in queue → Deliver when online',
          'Blue ticks → ACK from recipient device → Update sender UI',
        ],
      },
      interviewTips: [
        'Emphasize E2E encryption (Signal protocol)',
        'Discuss store-and-forward pattern',
        'Mention Erlang/BEAM for massive concurrency',
        'Talk about message receipts (single tick, double tick, blue)',
      ],
    },
    youtube: {
      icon: <Video size={20} />,
      title: 'Design YouTube',
      subtitle: 'Video Sharing',
      scale: '2B+ users, 500 hours uploaded/min',
      color: 'red',
      components: [
        { name: 'Upload Service', color: 'blue', desc: 'Handle video uploads, chunking' },
        { name: 'Transcoding', color: 'green', desc: 'Convert to multiple formats' },
        { name: 'CDN/Edge', color: 'purple', desc: 'Global video delivery' },
        { name: 'Recommendation', color: 'yellow', desc: 'ML-based suggestions' },
        { name: 'Search Service', color: 'pink', desc: 'Video discovery, metadata' },
        { name: 'Analytics', color: 'orange', desc: 'View counts, engagement' },
      ],
      keyDecisions: [
        { q: 'Upload handling?', a: 'Resumable uploads, chunked, stored in GCS' },
        { q: 'View counting?', a: 'Aggregate in real-time with Kafka + batch reconciliation' },
        { q: 'Thumbnails?', a: 'Auto-generated + ML selection for best frame' },
      ],
      architecture: {
        layers: [
          { name: 'Clients', items: ['Web', 'Mobile Apps', 'Smart TVs', 'Embedded Players'], color: 'red' },
          { name: 'Edge', items: ['Google Edge Nodes', 'CDN PoPs', 'Cache Servers'], color: 'blue' },
          { name: 'Services', items: ['Video', 'User', 'Recommendation', 'Comments', 'Ads'], color: 'purple' },
          { name: 'Data', items: ['Bigtable', 'Spanner', 'GCS (videos)', 'Pub/Sub'], color: 'orange' },
        ],
        dataFlow: [
          'Creator uploads → Chunked upload → Store raw in GCS',
          'Trigger transcoding pipeline → Multiple qualities → Store processed',
          'Metadata indexed → Available for search → Appear in recommendations',
          'Viewer watches → Stream from nearest edge → Track analytics',
        ],
      },
      interviewTips: [
        'Discuss video processing pipeline',
        'Mention resumable/chunked uploads',
        'Talk about CDN and edge caching',
        'View count consistency (eventual)',
      ],
    },
    instagram: {
      icon: <Users size={20} />,
      title: 'Design Instagram',
      subtitle: 'Photo Sharing',
      scale: '2B+ users, 100M photos/day',
      color: 'pink',
      components: [
        { name: 'Feed Service', color: 'blue', desc: 'Generate user feeds' },
        { name: 'Media Service', color: 'green', desc: 'Image/video processing' },
        { name: 'Stories Service', color: 'purple', desc: 'Ephemeral content (24h)' },
        { name: 'Search/Explore', color: 'yellow', desc: 'Content discovery' },
        { name: 'Direct Messages', color: 'pink', desc: 'Private messaging' },
        { name: 'Notifications', color: 'orange', desc: 'Likes, comments, follows' },
      ],
      keyDecisions: [
        { q: 'Image storage?', a: 'Original in S3, CDN-served processed versions' },
        { q: 'Feed generation?', a: 'ML-ranked feed (not chronological) + hybrid push/pull' },
        { q: 'Stories storage?', a: 'Stored in Cassandra, auto-deleted after 24h' },
      ],
      architecture: {
        layers: [
          { name: 'Clients', items: ['iOS', 'Android', 'Web'], color: 'pink' },
          { name: 'Edge', items: ['CDN (images)', 'API Gateway', 'GraphQL'], color: 'blue' },
          { name: 'Services', items: ['Feed', 'Media', 'Stories', 'User', 'DM', 'Explore'], color: 'purple' },
          { name: 'Data', items: ['PostgreSQL', 'Cassandra', 'Redis', 'S3 (media)'], color: 'orange' },
        ],
        dataFlow: [
          'User posts → Media processed (resize, filters) → Store in S3',
          'Metadata → PostgreSQL → Trigger feed updates',
          'User opens app → Feed Service → ML-ranked posts',
          'Media served from CDN (closest edge node)',
        ],
      },
      interviewTips: [
        'Similar to Twitter but media-focused',
        'Discuss image processing pipeline',
        'Mention ML-based feed ranking',
        'Stories: ephemeral storage design',
      ],
    },
    spotify: {
      icon: <Gauge size={20} />,
      title: 'Design Spotify',
      subtitle: 'Music Streaming',
      scale: '500M+ users, 100M tracks',
      color: 'green',
      components: [
        { name: 'Playback Service', color: 'blue', desc: 'Audio streaming, queue' },
        { name: 'Search Service', color: 'green', desc: 'Songs, artists, playlists' },
        { name: 'Recommendation', color: 'purple', desc: 'Discover Weekly, Radio' },
        { name: 'Playlist Service', color: 'yellow', desc: 'User playlists, collaborative' },
        { name: 'Audio Delivery', color: 'pink', desc: 'CDN + P2P hybrid' },
        { name: 'Offline Sync', color: 'orange', desc: 'Downloaded content' },
      ],
      keyDecisions: [
        { q: 'Audio delivery?', a: 'Hybrid CDN + P2P (peers share popular tracks)' },
        { q: 'Gapless playback?', a: 'Pre-buffer next track, crossfade support' },
        { q: 'Recommendations?', a: 'Collaborative filtering + audio analysis (tempo, mood)' },
      ],
      architecture: {
        layers: [
          { name: 'Clients', items: ['Desktop', 'Mobile', 'Web', 'Smart Speakers'], color: 'green' },
          { name: 'Edge', items: ['CDN', 'P2P Network', 'Edge Caches'], color: 'blue' },
          { name: 'Services', items: ['Playback', 'Search', 'Social', 'Recommendation', 'Playlist'], color: 'purple' },
          { name: 'Data', items: ['PostgreSQL', 'Cassandra', 'GCS (audio)', 'BigQuery'], color: 'orange' },
        ],
        dataFlow: [
          'User plays song → Playback Service → Get audio URL',
          'Stream from CDN/P2P → Buffer locally → Gapless playback',
          'Listen history → Real-time to Kafka → Update recommendations',
          'Offline mode → Download encrypted tracks → Local storage',
        ],
      },
      interviewTips: [
        'P2P delivery for popular content',
        'Discuss audio processing (normalization)',
        'Mention collaborative filtering for recommendations',
        'Offline sync + DRM for downloaded content',
      ],
    },
    payment: {
      icon: <ShoppingCart size={20} />,
      title: 'Design Payment System',
      subtitle: 'Like Stripe/PayPal',
      scale: '1M+ transactions/day',
      color: 'purple',
      components: [
        { name: 'API Gateway', color: 'blue', desc: 'Rate limiting, auth' },
        { name: 'Payment Processor', color: 'green', desc: 'Transaction handling' },
        { name: 'Fraud Detection', color: 'purple', desc: 'ML-based risk scoring' },
        { name: 'Ledger Service', color: 'yellow', desc: 'Double-entry bookkeeping' },
        { name: 'Bank Integration', color: 'pink', desc: 'Card networks, ACH' },
        { name: 'Reconciliation', color: 'orange', desc: 'Balance settlement' },
      ],
      keyDecisions: [
        { q: 'Idempotency?', a: 'Idempotency key required to prevent duplicate charges' },
        { q: 'Consistency?', a: 'Strong consistency for ledger (no eventual!)' },
        { q: 'Failure handling?', a: 'Saga pattern with compensating transactions' },
      ],
      architecture: {
        layers: [
          { name: 'Clients', items: ['Merchant APIs', 'Checkout SDK', 'Dashboard'], color: 'purple' },
          { name: 'Security', items: ['API Gateway', 'PCI DSS Vault', 'WAF'], color: 'blue' },
          { name: 'Services', items: ['Payment', 'Fraud', 'Ledger', 'Notification', 'Dispute'], color: 'green' },
          { name: 'Data', items: ['PostgreSQL (ACID)', 'Redis', 'Kafka', 'HSM (keys)'], color: 'orange' },
        ],
        dataFlow: [
          'Merchant calls API → Validate + Fraud check → Authorize with bank',
          'Bank approves → Create ledger entry → Return success',
          'Async: Kafka event → Notifications, analytics, reconciliation',
          'Refund: Compensating transaction → Update ledger → Notify bank',
        ],
      },
      interviewTips: [
        'Idempotency is critical (mention idempotency keys)',
        'Discuss double-entry ledger',
        'PCI DSS compliance (tokenization)',
        'Saga pattern for distributed transactions',
      ],
    },
  };

  const caseList = Object.keys(cases);
  const current = cases[activeCase];
  
  const colors: Record<string, string> = {
    blue: 'bg-blue-500/20 border-blue-500 text-blue-400',
    green: 'bg-green-500/20 border-green-500 text-green-400',
    purple: 'bg-purple-500/20 border-purple-500 text-purple-400',
    yellow: 'bg-yellow-500/20 border-yellow-500 text-yellow-400',
    pink: 'bg-pink-500/20 border-pink-500 text-pink-400',
    orange: 'bg-orange-500/20 border-orange-500 text-orange-400',
    red: 'bg-red-500/20 border-red-500 text-red-400',
  };

  const layerColors: Record<string, string> = {
    blue: 'border-blue-500/50 bg-blue-500/10',
    green: 'border-green-500/50 bg-green-500/10',
    purple: 'border-purple-500/50 bg-purple-500/10',
    orange: 'border-orange-500/50 bg-orange-500/10',
    red: 'border-red-500/50 bg-red-500/10',
    pink: 'border-pink-500/50 bg-pink-500/10',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-dark-800 rounded-xl p-4 border border-dark-700">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <Building2 className="text-brand-400" size={20} />
          Real-World System Architectures
        </h3>
        <p className="text-slate-400 text-sm">
          Detailed architecture breakdowns of 8 popular systems - essential for FAANG interviews.
        </p>
      </div>

      {/* Case Selection - Scrollable Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {caseList.map(c => (
          <button
            key={c}
            onClick={() => setActiveCase(c)}
            className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeCase === c 
                ? `bg-${cases[c].color}-500/20 text-${cases[c].color}-400 border border-${cases[c].color}-500/50` 
                : 'bg-dark-700 text-slate-400 hover:text-white border border-dark-600'
            }`}
          >
            {cases[c].icon}
            {cases[c].subtitle}
          </button>
        ))}
      </div>

      {/* View Mode Tabs */}
      <div className="flex gap-2">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'architecture', label: 'Architecture' },
          { id: 'deep-dive', label: 'Deep Dive' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setViewMode(tab.id as typeof viewMode)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === tab.id
                ? 'bg-brand-600 text-white'
                : 'bg-dark-800 text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
        {/* Title */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-lg ${colors[current.color]} flex items-center justify-center`}>
              {current.icon}
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">{current.title}</h4>
              <p className="text-sm text-slate-400">{current.scale}</p>
            </div>
          </div>
        </div>

        {/* Overview Mode */}
        {viewMode === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Components Grid */}
            <div>
              <h5 className="text-sm font-bold text-slate-300 mb-3">Core Components</h5>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {current.components.map((comp, i) => (
                  <div key={i} className={`p-3 rounded-lg border ${colors[comp.color]}`}>
                    <h6 className="font-bold text-white text-sm mb-1">{comp.name}</h6>
                    <p className="text-xs opacity-80">{comp.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Decisions */}
            <div>
              <h5 className="text-sm font-bold text-slate-300 mb-3">Key Design Decisions</h5>
              <div className="space-y-3">
                {current.keyDecisions.map((kd, i) => (
                  <div key={i} className="bg-dark-900 p-3 rounded-lg">
                    <div className="text-sm font-bold text-brand-400 mb-1">Q: {kd.q}</div>
                    <div className="text-sm text-slate-300">A: {kd.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Architecture Mode */}
        {viewMode === 'architecture' && current.architecture && (
          <div className="space-y-6 animate-fadeIn">
            {/* Layered Architecture */}
            <div>
              <h5 className="text-sm font-bold text-slate-300 mb-3">System Layers</h5>
              <div className="space-y-3">
                {current.architecture.layers.map((layer, i) => (
                  <div key={i} className={`p-4 rounded-lg border ${layerColors[layer.color]}`}>
                    <div className="text-xs font-bold text-slate-400 mb-2">{layer.name.toUpperCase()}</div>
                    <div className="flex gap-2 flex-wrap">
                      {layer.items.map((item, j) => (
                        <span key={j} className="px-2 py-1 bg-dark-800 rounded text-sm text-white">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Flow */}
            <div>
              <h5 className="text-sm font-bold text-slate-300 mb-3">Data Flow</h5>
              <div className="space-y-2">
                {current.architecture.dataFlow.map((flow, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-dark-900 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 text-xs font-bold shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-sm text-slate-300">{flow}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Deep Dive Mode */}
        {viewMode === 'deep-dive' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Interview Tips */}
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg p-4 border border-purple-500/20">
              <h5 className="text-purple-400 font-semibold mb-3 flex items-center gap-2">
                <Target size={16} />
                Interview Tips for {current.title}
              </h5>
              <ul className="space-y-2">
                {current.interviewTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="text-green-400 shrink-0 mt-0.5" size={14} />
                    <span className="text-slate-300">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Decisions Expanded */}
            <div>
              <h5 className="text-sm font-bold text-slate-300 mb-3">Design Trade-offs</h5>
              <div className="grid md:grid-cols-2 gap-3">
                {current.keyDecisions.map((kd, i) => (
                  <div key={i} className="bg-dark-900 p-4 rounded-lg border border-dark-700">
                    <div className="text-sm font-bold text-white mb-2">{kd.q}</div>
                    <div className="text-sm text-slate-400">{kd.a}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Components Deep Dive */}
            <div>
              <h5 className="text-sm font-bold text-slate-300 mb-3">Component Details</h5>
              <div className="grid md:grid-cols-2 gap-3">
                {current.components.map((comp, i) => (
                  <div key={i} className={`p-4 rounded-lg border-l-4 bg-dark-900 ${colors[comp.color].split(' ')[1]}`}>
                    <h6 className="font-bold text-white text-sm mb-1">{comp.name}</h6>
                    <p className="text-xs text-slate-400">{comp.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Navigation */}
      <div className="bg-dark-800 rounded-xl p-4 border border-dark-700">
        <h5 className="text-sm font-bold text-slate-300 mb-3">All Case Studies</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {caseList.map(c => (
            <button
              key={c}
              onClick={() => setActiveCase(c)}
              className={`p-2 rounded-lg text-xs text-left transition-all ${
                activeCase === c
                  ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
                  : 'bg-dark-900 text-slate-400 hover:text-white border border-dark-700'
              }`}
            >
              <div className="font-bold">{cases[c].title.replace('Design ', '')}</div>
              <div className="text-slate-500 text-[10px]">{cases[c].subtitle}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudiesViz;
