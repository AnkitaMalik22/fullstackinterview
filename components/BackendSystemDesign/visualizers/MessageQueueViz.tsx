import React, { useState, useRef, useCallback } from 'react';
import { 
  MessageSquare, Server, ArrowRight, Target, CheckCircle2
} from 'lucide-react';

const MessageQueueViz: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'patterns' | 'comparison' | 'decision'>('patterns');
  const [pattern, setPattern] = useState<'pubsub' | 'queue' | 'fanout'>('queue');
  const [messages, setMessages] = useState<Array<{ id: number; text: string; consumer?: number }>>([]);
  const [consumers] = useState([1, 2, 3]);
  const msgId = useRef(0);

  const tabs = [
    { id: 'patterns', label: 'Queue Patterns' },
    { id: 'comparison', label: 'Kafka vs RabbitMQ' },
    { id: 'decision', label: 'When to Choose' },
  ];

  const addMessage = useCallback(() => {
    const newMsg = { id: msgId.current++, text: `Msg-${msgId.current}` };
    setMessages(prev => [...prev, newMsg]);

    // Simulate consumption after delay
    setTimeout(() => {
      setMessages(prev => {
        const msg = prev.find(m => m.id === newMsg.id);
        if (!msg) return prev;
        
        if (pattern === 'queue') {
          // Round-robin to one consumer
          const consumer = (newMsg.id % 3) + 1;
          return prev.map(m => m.id === newMsg.id ? { ...m, consumer } : m);
        } else {
          // Fanout - all consumers get it (simulate by showing all)
          return prev.map(m => m.id === newMsg.id ? { ...m, consumer: -1 } : m);
        }
      });
    }, 1500);

    // Remove after 3s
    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.id !== newMsg.id));
    }, 3000);
  }, [pattern]);

  return (
    <div className="space-y-6">
      <div className="bg-dark-800 rounded-xl p-4 border border-dark-700">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <MessageSquare className="text-purple-400" size={20} />
          Asynchronous Communication & Message Queues
        </h3>
        <p className="text-slate-400 text-sm">
          Understanding message patterns and when to choose Kafka vs RabbitMQ - a key interview topic.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-purple-500 text-white'
                : 'bg-dark-800 text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'patterns' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h4 className="text-lg font-bold text-white">Message Queue Patterns</h4>
            <div className="flex gap-2">
              {(['queue', 'pubsub', 'fanout'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => { setPattern(p); setMessages([]); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    pattern === p ? 'bg-brand-600 text-white' : 'bg-dark-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {p === 'queue' ? 'Work Queue' : p === 'pubsub' ? 'Pub/Sub' : 'Fan-out'}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-lg font-bold text-white">
                  {pattern === 'queue' ? 'Work Queue (Competing Consumers)' : 
                   pattern === 'pubsub' ? 'Publish/Subscribe' : 'Fan-out Exchange'}
                </h4>
                <p className="text-sm text-slate-400">
                  {pattern === 'queue' ? 'Each message goes to ONE consumer (load balancing)' :
                   pattern === 'pubsub' ? 'Messages broadcast to all subscribers' :
                   'Exchange routes to all bound queues'}
                </p>
              </div>
              <button onClick={addMessage} className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-bold">
                + Send Message
              </button>
            </div>

            <div className="flex items-start justify-between gap-8">
              {/* Producer */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-xl bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center">
                  <Server size={32} className="text-blue-400" />
                </div>
                <span className="text-xs text-slate-400 mt-2">Producer</span>
              </div>

              {/* Queue/Exchange */}
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full h-20 rounded-xl bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center gap-2 overflow-hidden px-4">
                  {messages.filter(m => !m.consumer).map(m => (
                    <div key={m.id} className="px-2 py-1 bg-purple-500 text-white text-xs rounded animate-pulse">
                      {m.text}
                    </div>
                  ))}
                  {messages.filter(m => !m.consumer).length === 0 && (
                    <span className="text-purple-400 text-sm">Queue Empty</span>
                  )}
                </div>
                <span className="text-xs text-slate-400 mt-2">
                  {pattern === 'fanout' ? 'Exchange' : 'Queue'} ({pattern === 'queue' ? 'RabbitMQ' : 'Kafka'})
                </span>
              </div>

              {/* Consumers */}
              <div className="flex flex-col gap-2">
                {consumers.map(c => (
                  <div key={c} className="flex items-center gap-2">
                    <div className={`w-16 h-12 rounded-lg border-2 flex items-center justify-center transition-all ${
                      messages.some(m => m.consumer === c || m.consumer === -1)
                        ? 'bg-green-500/20 border-green-500 scale-105'
                        : 'bg-dark-700 border-dark-600'
                    }`}>
                      <Server size={20} className={
                        messages.some(m => m.consumer === c || m.consumer === -1) ? 'text-green-400' : 'text-slate-500'
                      } />
                    </div>
                    <span className="text-xs text-slate-400">Consumer {c}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-dark-900 p-4 rounded-lg">
              <h5 className="text-sm font-bold text-white mb-2">Use Cases</h5>
              <div className="text-xs text-slate-400 space-y-1">
                {pattern === 'queue' && (
                  <>
                    <div>• Task distribution (image processing, emails)</div>
                    <div>• Load balancing across workers</div>
                    <div>• Background job processing</div>
                  </>
                )}
                {pattern === 'pubsub' && (
                  <>
                    <div>• Real-time notifications</div>
                    <div>• Event streaming (Kafka topics)</div>
                    <div>• Microservice communication</div>
                  </>
                )}
                {pattern === 'fanout' && (
                  <>
                    <div>• Broadcast updates to all services</div>
                    <div>• Cache invalidation</div>
                    <div>• Multi-region replication</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'comparison' && (
        <div className="space-y-6">
          {/* Head to Head Comparison */}
          <div className="bg-dark-800 rounded-xl border border-dark-700 overflow-hidden">
            <div className="grid grid-cols-3 bg-dark-900">
              <div className="p-4 text-center border-r border-dark-700">
                <span className="text-slate-400 text-sm font-medium">Feature</span>
              </div>
              <div className="p-4 text-center border-r border-dark-700">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-8 rounded bg-orange-500/20 flex items-center justify-center">
                    <span className="text-orange-400 font-bold text-sm">🐰</span>
                  </div>
                  <span className="text-orange-400 font-bold">RabbitMQ</span>
                </div>
              </div>
              <div className="p-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center">
                    <span className="text-blue-400 font-bold text-sm">K</span>
                  </div>
                  <span className="text-blue-400 font-bold">Apache Kafka</span>
                </div>
              </div>
            </div>

            {[
              { feature: 'Architecture', rabbit: 'Message Broker (Push)', kafka: 'Distributed Log (Pull)' },
              { feature: 'Message Model', rabbit: 'Queue-based, ACK per message', kafka: 'Topic partitions, Offset-based' },
              { feature: 'Throughput', rabbit: '~10K-50K msg/sec', kafka: '~1M+ msg/sec' },
              { feature: 'Message Retention', rabbit: 'Deleted after ACK', kafka: 'Retained (configurable TTL)' },
              { feature: 'Ordering', rabbit: 'Per queue (FIFO)', kafka: 'Per partition only' },
              { feature: 'Replay Messages', rabbit: '❌ No (message deleted)', kafka: '✅ Yes (seek by offset)' },
              { feature: 'Routing', rabbit: '✅ Complex (exchanges)', kafka: '❌ Simple (topic-based)' },
              { feature: 'Consumer Groups', rabbit: 'Competing consumers', kafka: 'Built-in consumer groups' },
              { feature: 'Latency', rabbit: 'Low (~1ms)', kafka: 'Medium (~5-10ms)' },
              { feature: 'Complexity', rabbit: 'Simpler to set up', kafka: 'More complex (ZooKeeper/KRaft)' },
            ].map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-dark-800' : 'bg-dark-850'}`}>
                <div className="p-3 border-r border-dark-700 text-white font-medium text-sm">
                  {row.feature}
                </div>
                <div className="p-3 border-r border-dark-700 text-slate-300 text-sm">
                  {row.rabbit}
                </div>
                <div className="p-3 text-slate-300 text-sm">
                  {row.kafka}
                </div>
              </div>
            ))}
          </div>

          {/* Architecture Diagrams */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* RabbitMQ Architecture */}
            <div className="bg-dark-800 rounded-xl p-4 border border-orange-500/30">
              <h4 className="text-orange-400 font-semibold mb-4 text-center">RabbitMQ Architecture</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <div className="px-3 py-2 bg-blue-500/20 rounded text-blue-400 text-xs">Producer</div>
                  <ArrowRight className="text-slate-600" size={16} />
                  <div className="px-3 py-2 bg-yellow-500/20 rounded text-yellow-400 text-xs">Exchange</div>
                  <ArrowRight className="text-slate-600" size={16} />
                  <div className="px-3 py-2 bg-purple-500/20 rounded text-purple-400 text-xs">Queue</div>
                  <ArrowRight className="text-slate-600" size={16} />
                  <div className="px-3 py-2 bg-green-500/20 rounded text-green-400 text-xs">Consumer</div>
                </div>
                <div className="text-xs text-slate-400 text-center mt-3">
                  <div className="font-medium text-orange-400 mb-1">Exchange Types:</div>
                  <div>Direct | Fanout | Topic | Headers</div>
                </div>
                <div className="bg-dark-900 rounded p-3 mt-3">
                  <div className="text-xs text-slate-400">
                    <span className="text-orange-400">Push Model:</span> Broker pushes messages to consumers.
                    Messages deleted after acknowledgment.
                  </div>
                </div>
              </div>
            </div>

            {/* Kafka Architecture */}
            <div className="bg-dark-800 rounded-xl p-4 border border-blue-500/30">
              <h4 className="text-blue-400 font-semibold mb-4 text-center">Kafka Architecture</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <div className="px-3 py-2 bg-blue-500/20 rounded text-blue-400 text-xs">Producer</div>
                  <ArrowRight className="text-slate-600" size={16} />
                  <div className="flex flex-col gap-1">
                    <div className="px-3 py-1 bg-purple-500/20 rounded text-purple-400 text-xs">Partition 0</div>
                    <div className="px-3 py-1 bg-purple-500/20 rounded text-purple-400 text-xs">Partition 1</div>
                    <div className="px-3 py-1 bg-purple-500/20 rounded text-purple-400 text-xs">Partition 2</div>
                  </div>
                  <ArrowRight className="text-slate-600" size={16} />
                  <div className="px-3 py-2 bg-green-500/20 rounded text-green-400 text-xs">Consumer<br/>Group</div>
                </div>
                <div className="text-xs text-slate-400 text-center mt-3">
                  <div className="font-medium text-blue-400 mb-1">Topic: orders</div>
                  <div>Each partition = ordered, immutable log</div>
                </div>
                <div className="bg-dark-900 rounded p-3 mt-3">
                  <div className="text-xs text-slate-400">
                    <span className="text-blue-400">Pull Model:</span> Consumers pull messages at their pace.
                    Messages retained based on TTL/size.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Concepts */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-dark-800 rounded-xl p-4 border border-dark-700">
              <h5 className="text-white font-semibold mb-3">Kafka Key Concepts</h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <div><span className="text-blue-400">Topic:</span> <span className="text-slate-400">Category/feed name for messages</span></div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <div><span className="text-blue-400">Partition:</span> <span className="text-slate-400">Ordered, immutable sequence of records</span></div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <div><span className="text-blue-400">Offset:</span> <span className="text-slate-400">Unique ID for each record in partition</span></div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <div><span className="text-blue-400">Consumer Group:</span> <span className="text-slate-400">Multiple consumers sharing workload</span></div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <div><span className="text-blue-400">Broker:</span> <span className="text-slate-400">Kafka server that stores data</span></div>
                </div>
              </div>
            </div>

            <div className="bg-dark-800 rounded-xl p-4 border border-dark-700">
              <h5 className="text-white font-semibold mb-3">RabbitMQ Key Concepts</h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                  <div><span className="text-orange-400">Exchange:</span> <span className="text-slate-400">Routes messages to queues</span></div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                  <div><span className="text-orange-400">Queue:</span> <span className="text-slate-400">Buffer that stores messages</span></div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                  <div><span className="text-orange-400">Binding:</span> <span className="text-slate-400">Link between exchange and queue</span></div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                  <div><span className="text-orange-400">Routing Key:</span> <span className="text-slate-400">Address for message routing</span></div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                  <div><span className="text-orange-400">ACK:</span> <span className="text-slate-400">Consumer acknowledges receipt</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'decision' && (
        <div className="space-y-6">
          {/* Decision Matrix */}
          <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
            <h4 className="text-white font-semibold mb-4 text-center text-lg">🤔 When to Choose What?</h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Choose RabbitMQ */}
              <div className="bg-orange-500/5 rounded-xl p-5 border border-orange-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <span className="text-xl">🐰</span>
                  </div>
                  <div>
                    <div className="text-orange-400 font-bold">Choose RabbitMQ</div>
                    <div className="text-slate-400 text-xs">Traditional Message Broker</div>
                  </div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-400 shrink-0 mt-0.5" size={16} />
                    <span className="text-slate-300">Need <span className="text-orange-400">complex routing</span> (topic, headers, fanout)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-400 shrink-0 mt-0.5" size={16} />
                    <span className="text-slate-300">Message <span className="text-orange-400">acknowledgment</span> is critical</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-400 shrink-0 mt-0.5" size={16} />
                    <span className="text-slate-300">Need <span className="text-orange-400">priority queues</span></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-400 shrink-0 mt-0.5" size={16} />
                    <span className="text-slate-300"><span className="text-orange-400">Low latency</span> required (&lt;1ms)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-400 shrink-0 mt-0.5" size={16} />
                    <span className="text-slate-300"><span className="text-orange-400">Simpler setup</span>, smaller team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-orange-400 shrink-0 mt-0.5" size={16} />
                    <span className="text-slate-300">Message <span className="text-orange-400">TTL and dead-letter</span> queues</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-dark-900 rounded-lg">
                  <div className="text-xs text-slate-400">
                    <span className="text-orange-400 font-medium">Best for:</span> Task queues, RPC, 
                    email/SMS sending, background jobs, microservice communication
                  </div>
                </div>
              </div>

              {/* Choose Kafka */}
              <div className="bg-blue-500/5 rounded-xl p-5 border border-blue-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-blue-400">K</span>
                  </div>
                  <div>
                    <div className="text-blue-400 font-bold">Choose Kafka</div>
                    <div className="text-slate-400 text-xs">Distributed Event Streaming</div>
                  </div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-400 shrink-0 mt-0.5" size={16} />
                    <span className="text-slate-300">Need <span className="text-blue-400">high throughput</span> (millions msg/sec)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-400 shrink-0 mt-0.5" size={16} />
                    <span className="text-slate-300">Need to <span className="text-blue-400">replay messages</span> (event sourcing)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-400 shrink-0 mt-0.5" size={16} />
                    <span className="text-slate-300"><span className="text-blue-400">Stream processing</span> (Kafka Streams, Flink)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-400 shrink-0 mt-0.5" size={16} />
                    <span className="text-slate-300">Need <span className="text-blue-400">event log</span> / audit trail</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-400 shrink-0 mt-0.5" size={16} />
                    <span className="text-slate-300">Multiple consumers <span className="text-blue-400">read same data</span></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-blue-400 shrink-0 mt-0.5" size={16} />
                    <span className="text-slate-300"><span className="text-blue-400">Long retention</span> (days/weeks)</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-dark-900 rounded-lg">
                  <div className="text-xs text-slate-400">
                    <span className="text-blue-400 font-medium">Best for:</span> Real-time analytics, 
                    log aggregation, event sourcing, CDC, data pipelines, activity tracking
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-World Examples */}
          <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
            <h4 className="text-white font-semibold mb-4">Real-World Use Cases</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="text-orange-400 font-medium flex items-center gap-2">
                  <span>🐰</span> RabbitMQ Examples
                </div>
                <div className="space-y-2">
                  {[
                    { company: 'Instagram', use: 'Background task processing' },
                    { company: 'Reddit', use: 'Async notifications' },
                    { company: 'Mozilla', use: 'Push notifications' },
                    { company: 'Bloomberg', use: 'Financial data routing' },
                  ].map(ex => (
                    <div key={ex.company} className="flex items-center gap-2 text-sm">
                      <span className="text-slate-500">•</span>
                      <span className="text-white">{ex.company}:</span>
                      <span className="text-slate-400">{ex.use}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-blue-400 font-medium flex items-center gap-2">
                  <span className="font-bold">K</span> Kafka Examples
                </div>
                <div className="space-y-2">
                  {[
                    { company: 'LinkedIn', use: 'Activity stream, metrics' },
                    { company: 'Netflix', use: 'Real-time monitoring' },
                    { company: 'Uber', use: 'Event-driven architecture' },
                    { company: 'Spotify', use: 'Log aggregation' },
                  ].map(ex => (
                    <div key={ex.company} className="flex items-center gap-2 text-sm">
                      <span className="text-slate-500">•</span>
                      <span className="text-white">{ex.company}:</span>
                      <span className="text-slate-400">{ex.use}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Decision Flowchart */}
          <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
            <h4 className="text-white font-semibold mb-4 text-center">Quick Decision Guide</h4>
            <div className="flex flex-col items-center gap-3">
              <div className="px-4 py-2 bg-purple-500/20 rounded-lg text-purple-400 font-medium">
                Do you need to replay messages?
              </div>
              <div className="flex gap-8 items-start">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-green-400 text-sm">Yes →</span>
                  <div className="px-3 py-2 bg-blue-500/20 rounded text-blue-400 text-sm font-medium">Kafka</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-red-400 text-sm">No ↓</span>
                  <div className="px-4 py-2 bg-purple-500/20 rounded-lg text-purple-400 text-sm">
                    Need complex routing?
                  </div>
                  <div className="flex gap-6">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-green-400 text-xs">Yes →</span>
                      <div className="px-3 py-2 bg-orange-500/20 rounded text-orange-400 text-sm font-medium">RabbitMQ</div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-red-400 text-xs">No ↓</span>
                      <div className="px-4 py-2 bg-purple-500/20 rounded-lg text-purple-400 text-xs">
                        High throughput?
                      </div>
                      <div className="flex gap-4">
                        <div className="text-center">
                          <div className="text-green-400 text-xs">Yes</div>
                          <div className="px-2 py-1 bg-blue-500/20 rounded text-blue-400 text-xs">Kafka</div>
                        </div>
                        <div className="text-center">
                          <div className="text-red-400 text-xs">No</div>
                          <div className="px-2 py-1 bg-orange-500/20 rounded text-orange-400 text-xs">RabbitMQ</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interview Answer Template */}
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-purple-500/20">
            <h4 className="text-purple-400 font-semibold mb-3 flex items-center gap-2">
              <Target size={18} />
              Interview Answer Template
            </h4>
            <div className="bg-dark-900 rounded-lg p-4 text-sm">
              <p className="text-slate-300 leading-relaxed">
                "I'd choose <span className="text-orange-400 font-medium">RabbitMQ</span> when I need 
                <span className="text-white"> complex routing, priority queues, or guaranteed delivery with acknowledgments</span> - 
                like for task queues or microservice communication.
              </p>
              <p className="text-slate-300 leading-relaxed mt-3">
                I'd choose <span className="text-blue-400 font-medium">Kafka</span> when I need 
                <span className="text-white"> high throughput, message replay, or event streaming</span> - 
                like for real-time analytics, log aggregation, or event sourcing.
              </p>
              <p className="text-slate-300 leading-relaxed mt-3">
                The key difference is that RabbitMQ is a <span className="text-orange-400">traditional message broker</span> that 
                deletes messages after consumption, while Kafka is a <span className="text-blue-400">distributed log</span> that 
                retains messages for replay."
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageQueueViz;
