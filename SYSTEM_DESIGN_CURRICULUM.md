# System Design Curriculum - Implementation Tracker

## Overview
Comprehensive system design curriculum for the interview prep platform. Each topic includes interactive visualizations and theory content.

---

## 📚 Modules

### 1. Foundations of System Design
- [x] **Understanding System Design** (9 mins) ✅ DONE
  - Definition and importance
  - Types: HLD vs LLD
  - Interview expectations
- [x] **The System Design Framework** (17 mins) ✅ DONE
  - RESHADED approach
  - Requirement gathering
  - Back-of-envelope calculations
- [x] **Qualities of Well-Designed Systems** (9 mins) ✅ DONE
  - NFRs: Scalability, Availability, Reliability
  - Trade-offs discussion
  - CAP theorem basics

---

### 2. Database Fundamentals
- [x] **SQL & Relational Databases** (20 mins) ✅ DONE
  - Normalization (1NF, 2NF, 3NF) - Already implemented
  - ACID properties
  - Indexing strategies
- [x] **Transaction Isolation Levels** (19 mins) ✅ DONE
  - Read Uncommitted, Read Committed
  - Repeatable Read, Serializable
  - Phantom reads, dirty reads visualization
- [ ] **Database Scaling Strategies** (18 mins)
  - Vertical vs Horizontal scaling
  - Read replicas
  - Master-slave architecture
- [ ] **Sharding & Partitioning Techniques** (16 mins)
  - Horizontal vs Vertical partitioning
  - Sharding strategies (hash, range, geo)
  - Resharding challenges
- [ ] **NoSQL Database Types** (15 mins)
  - Document stores (MongoDB)
  - Key-Value (Redis, DynamoDB)
  - Column-family (Cassandra)
  - Graph databases (Neo4j)
- [ ] **Choosing the Right Database** (13 mins)
  - Decision matrix
  - Use case mapping
  - Polyglot persistence

---

### 3. Caching Fundamentals
- [x] **How Caching Works** (12 mins) ✅ DONE
  - Cache-aside, Write-through, Write-back - Already implemented
  - Cache hit/miss
  - TTL and eviction policies (LRU, LFU)
- [ ] **Scaling & Populating Caches** (11 mins)
  - Cache warming strategies
  - Distributed caching
  - Cache clusters (Redis Cluster)
- [ ] **Multi-Layer Caching Architecture** (19 mins)
  - Browser cache
  - CDN caching
  - Application cache
  - Database query cache

---

### 4. Asynchronous Communication
- [x] **Message Queue Fundamentals** (16 mins) ✅ DONE
  - Work queues, Fan-out - Already implemented
  - Queue patterns
  - Dead letter queues
- [x] **Kafka vs RabbitMQ** (23 mins) ✅ DONE
  - Head-to-head comparison table
  - Architecture diagrams
  - When to choose which (decision guide)
  - Interview answer template
- [ ] **Real-time Communication Patterns** (6 mins)
  - WebSockets
  - Server-Sent Events
  - Long Polling
  - PubSub patterns

---

### 5. System Resiliency
- [x] **Load Balancer Deep Dive** (16 mins) ✅ DONE
  - Round-robin, Least-conn, Weighted - Already implemented
  - L4 vs L7 load balancing
  - Health checks
- [x] **Circuit Breaker Pattern** (13 mins) ✅ DONE
  - States: Closed, Open, Half-Open (interactive simulation)
  - Failure thresholds configuration
  - Fallback strategies (cache, default, backup service)
  - Related patterns: Bulkhead, Retry, Timeout
- [ ] **Data Backup & Recovery** (9 mins)
  - Replication strategies
  - Backup approaches
  - RPO and RTO
  - Disaster recovery
- [ ] **Consensus & Leader Election** (8 mins)
  - Raft consensus
  - Zookeeper/etcd
  - Split-brain problem

---

### 6. Distributed Systems Concepts
- [ ] **Bloom Filters Explained** (21 mins)
  - Probabilistic data structure
  - False positives explained
  - Use cases (spell check, cache)
  - Interactive visualization
- [x] **Consistent Hashing Deep Dive** (27 mins) ✅ DONE
  - Hash ring visualization - Already implemented
  - Virtual nodes
  - Adding/removing nodes
- [ ] **Network Protocols & APIs** (22 mins)
  - HTTP/1.1 vs HTTP/2 vs HTTP/3
  - gRPC and Protocol Buffers
  - WebSockets vs Long Polling
  - GraphQL vs REST
- [ ] **Object Storage & CDN** (16 mins)
  - Blob storage concepts
  - Presigned URLs
  - Multipart uploads
  - CDN edge caching
- [ ] **Big Data Processing** (17 mins)
  - MapReduce basics
  - Hadoop ecosystem
  - Spark overview
  - Data lakes vs warehouses

---

### 7. E-Commerce & Social Systems
- [ ] **Building Product Catalog Systems** (20 mins)
  - Catalog service architecture
  - Search and filtering
  - Inventory management
  - Price updates at scale
- [ ] **Location-Based Matching System** (32 mins)
  - Geo-based matching
  - Recommendation engine
  - Real-time matching
  - Geohashing
- [ ] **Notification System at Scale** (38 mins)
  - Push notification architecture
  - Email/SMS integration
  - Notification preferences
  - Rate limiting notifications
- [ ] **Trending Topics Detection** (30 mins)
  - Real-time trend detection
  - Count-min sketch
  - Sliding window aggregation
  - Geo-based trends

---

### 8. Common System Design Problems
- [x] **URL Shortening Service** (48 mins) ✅ DONE
  - Base62 encoding
  - Collision handling
  - Analytics tracking
  - Custom aliases
- [x] **API Rate Limiter Design** (26 mins) ✅ DONE
  - Token bucket, Sliding window - Already implemented
  - Distributed rate limiting
  - Rate limit headers
- [ ] **Content Moderation System** (22 mins)
  - Real-time text filtering
  - ML-based detection
  - Bloom filters for banned words
  - Appeals system
- [x] **Web Crawler Architecture** (54 mins) ✅ DONE
  - URL frontier (priority queue simulation)
  - Politeness policies (robots.txt, rate limiting)
  - Duplicate detection (Bloom filters, URL normalization)
  - Distributed crawling architecture

---

### 9. FAANG System Designs
- [x] **Twitter / Social Feed** ✅ DONE
  - Fan-out on write vs read (hybrid approach)
  - Timeline service, celebrity problem
  - Architecture layers and data flow
- [x] **Uber / Ride-Sharing** ✅ DONE
  - Location tracking with geohashing
  - Real-time matching algorithm
  - Surge pricing, WebSocket communication
- [x] **Netflix / Video Streaming** ✅ DONE
  - Open Connect CDN architecture
  - Adaptive bitrate streaming
  - Transcoding pipeline, recommendations
- [x] **WhatsApp / Messaging** ✅ DONE
  - End-to-end encryption (Signal protocol)
  - Store-and-forward pattern
  - Message receipts, presence system
- [x] **YouTube / Video Sharing** ✅ DONE
  - Video upload and transcoding pipeline
  - View counting at scale
  - CDN edge caching
- [x] **Instagram / Photo Sharing** ✅ DONE
  - Image processing pipeline
  - ML-ranked feed generation
  - Stories ephemeral storage
- [x] **Spotify / Music Streaming** ✅ DONE
  - Hybrid CDN + P2P delivery
  - Audio analysis for recommendations
  - Offline sync with DRM
- [x] **Payment System (Stripe/PayPal)** ✅ DONE
  - Idempotency keys for transactions
  - Double-entry ledger
  - Saga pattern, PCI compliance
- [ ] **Search Engine Fundamentals**
  - Inverted index
  - PageRank basics
  - Query processing
  - Autocomplete
- [ ] **Distributed Cache System**
  - Memcached architecture
  - Redis cluster
  - Cache coherence
  - Eviction strategies
- [ ] **Payment Processing System**
  - Transaction handling
  - Idempotency
  - Fraud detection
  - PCI compliance

---

### 10. Advanced Topics
- [ ] **Microservices Architecture**
  - Service discovery
  - API Gateway
  - Service mesh
  - Saga pattern
- [ ] **Event-Driven Architecture**
  - Event sourcing
  - CQRS pattern
  - Event store
  - Eventual consistency
- [ ] **Observability & Monitoring**
  - Metrics, Logs, Traces
  - Distributed tracing
  - Alerting strategies
  - SLOs and SLIs
- [ ] **Security in Distributed Systems**
  - OAuth 2.0 / OIDC
  - JWT tokens
  - API security
  - Zero trust architecture

---

## 🎯 Implementation Priority

### Phase 1 - Core Foundations (Current Sprint)
1. [x] Foundations module (3 topics) ✅ DONE
2. [x] Transaction Isolation Levels ✅ DONE
3. [ ] Circuit Breaker Pattern
4. [ ] Bloom Filters Explained

### Phase 2 - Async & Streaming
5. [ ] Event Streaming with Kafka
6. [ ] Real-time Communication Patterns
7. [ ] Network Protocols & APIs

### Phase 3 - Scale Topics
8. [ ] Database Scaling Strategies
9. [ ] Sharding & Partitioning Techniques
10. [ ] Multi-Layer Caching Architecture

### Phase 4 - Design Problems
11. [x] URL Shortening Service ✅ DONE
12. [ ] Web Crawler Architecture
13. [ ] Notification System at Scale
14. [ ] Trending Topics Detection

### Phase 5 - Advanced Systems
15. [ ] Messaging Platform
16. [ ] Video Sharing Platform
17. [ ] Payment Processing System
18. [ ] Search Engine Fundamentals

### Phase 6 - Architecture Patterns
19. [ ] Microservices Architecture
20. [ ] Event-Driven Architecture
21. [ ] Observability & Monitoring
22. [ ] Security in Distributed Systems

---

## ✅ Already Implemented (8 modules)
- Foundations of System Design (3 sub-topics)
- SQL & Relational Databases (Normalization 1NF, 2NF, 3NF)
- Caching Strategies (Cache-aside, Write-through, Write-back, Read-through)
- Message Queues (Work Queue, Pub/Sub, Fan-out)
- Load Balancing (Round-robin, Least-conn, Weighted, IP-hash)
- Consistent Hashing (Ring visualization)
- Rate Limiting (Token bucket, Sliding window, Fixed window, Leaky bucket)
- Case Studies (Social Feed, Ride-Sharing, Video Streaming)

---

## 📝 Notes
- Each topic should have both **Theory Mode** and **Interactive Mode**
- Include real interview questions for each topic
- Add "Time Complexity" and "Space Complexity" where applicable
- Include code snippets for implementation reference
- All titles are original to this platform
