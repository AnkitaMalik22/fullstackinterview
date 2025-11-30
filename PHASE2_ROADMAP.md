# FullStack Interview Prep - Phase 2 Roadmap

## 🎯 Vision
Transform FSPrep into a personalized, goal-driven learning platform with user authentication, progress tracking, and adaptive learning paths.

---

## 📊 Phase 1 Completed ✅

### Core Features Delivered
- [x] Interactive DSA visualizers (Sorting with 5 algorithms)
- [x] Syntax-highlighted code blocks with copy functionality
- [x] Error boundary for crash protection
- [x] Reusable UI components (TabNavigation, ProgressBar)
- [x] localStorage-based progress hooks
- [x] Reorganized sidebar for optimal learning flow
- [x] PostCSS production build setup

---

## 🚀 Phase 2: Authentication & Personalized Learning

### 2.1 User Authentication System

#### Goals
- Enable users to save progress across devices
- Personalized learning recommendations
- Track long-term growth and interview readiness

#### Features
| Feature | Priority | Description |
|---------|----------|-------------|
| Email/Password Auth | P0 | Basic signup/login with JWT |
| OAuth (Google/GitHub) | P1 | One-click social login |
| Password Reset | P1 | Email-based recovery flow |
| Session Management | P0 | Secure token refresh, logout |
| Profile Page | P1 | Avatar, bio, learning preferences |

#### Tech Stack Options
```
Option A: Firebase Auth (Fastest)
├── Pros: Easy setup, built-in OAuth, free tier
└── Cons: Vendor lock-in

Option B: Supabase Auth (Recommended)
├── Pros: Open source, PostgreSQL, Row Level Security
└── Cons: Slightly more setup

Option C: Custom (JWT + Node.js)
├── Pros: Full control
└── Cons: More development time
```

#### Database Schema
```sql
-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  display_name VARCHAR(100),
  avatar_url TEXT,
  auth_provider VARCHAR(20) DEFAULT 'email',
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

-- User Progress Table
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  topic_id VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'not_started',
  completed_at TIMESTAMP,
  time_spent_seconds INTEGER DEFAULT 0,
  quiz_score INTEGER,
  notes TEXT,
  UNIQUE(user_id, topic_id)
);

-- Learning Goals Table
CREATE TABLE learning_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  goal_type VARCHAR(50), -- 'interview_date', 'company_target', 'skill_mastery'
  target_date DATE,
  target_company VARCHAR(100),
  target_role VARCHAR(100),
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Study Sessions Table
CREATE TABLE study_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  started_at TIMESTAMP DEFAULT NOW(),
  ended_at TIMESTAMP,
  topics_covered TEXT[], -- Array of topic IDs
  focus_score INTEGER -- 1-100 based on activity
);
```

---

### 2.2 Goal-Driven Learning System

#### User Onboarding Flow
```
Step 1: Create Account
    ↓
Step 2: Set Interview Goal
    - "I have an interview in X weeks"
    - "I'm targeting [Company Name]"
    - "I want to become a [Role]"
    ↓
Step 3: Skill Assessment (Optional)
    - Quick quiz to gauge current level
    - Auto-generate personalized curriculum
    ↓
Step 4: Dashboard with Personalized Plan
```

#### Goal Types

| Goal Type | Input | Output |
|-----------|-------|--------|
| **Interview Countdown** | Target date | Daily study plan with deadlines |
| **Company Target** | Company name | Curated problems that company asks |
| **Role Upgrade** | Current → Target role | Skill gap analysis + learning path |
| **Skill Mastery** | Specific topic | Deep-dive curriculum |

#### Personalized Study Plan Generator
```typescript
interface StudyPlan {
  userId: string;
  goal: Goal;
  totalWeeks: number;
  weeklySchedule: WeekPlan[];
  dailyTimeCommitment: number; // minutes
}

interface WeekPlan {
  weekNumber: number;
  theme: string; // "DSA Foundations", "System Design", etc.
  topics: Topic[];
  practiceProblems: Problem[];
  milestone: string; // "Complete all Easy array problems"
}

// Algorithm to generate plan
function generateStudyPlan(goal: Goal, assessment: AssessmentResult): StudyPlan {
  const weeksUntilGoal = calculateWeeks(goal.targetDate);
  const skillGaps = identifySkillGaps(assessment);
  
  // Prioritize weak areas + company-specific topics
  const prioritizedTopics = prioritize(skillGaps, goal.targetCompany);
  
  // Distribute across available time
  return distributeAcrossWeeks(prioritizedTopics, weeksUntilGoal);
}
```

---

### 2.3 Progress Dashboard Enhancements

#### New Dashboard Sections

```
┌─────────────────────────────────────────────────────────────┐
│  🎯 YOUR GOAL: Frontend Engineer @ Google                   │
│  📅 Interview in 45 days | 🔥 12 day streak                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ DSA        │  │ Frontend   │  │ System     │         │
│  │ ████░░ 60% │  │ ███░░░ 45% │  │ █░░░░░ 20% │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  📚 TODAY'S PLAN                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ ○ Complete "Two Sum" problem (15 min)               │   │
│  │ ○ Read System Design: Load Balancing (20 min)       │   │
│  │ ○ Practice Mock Interview with AI Coach (30 min)    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  📈 THIS WEEK'S PROGRESS                                    │
│  Mon ██████░░ | Tue ████████ | Wed ████░░░░ | Thu ░░░░░░░░ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Gamification Elements
- **Streaks**: Daily login + study rewards
- **XP System**: Earn points for completing topics
- **Badges**: "DSA Master", "System Design Pro", etc.
- **Leaderboard**: Optional community ranking

---

### 2.4 Enhanced Learning Features

#### Spaced Repetition System
```typescript
// Track when to review topics based on memory decay
interface ReviewSchedule {
  topicId: string;
  lastReviewed: Date;
  nextReview: Date;
  interval: number; // days
  easeFactor: number; // SM-2 algorithm
}

function calculateNextReview(quality: number, current: ReviewSchedule): ReviewSchedule {
  // SM-2 Spaced Repetition Algorithm
  const newEaseFactor = Math.max(1.3, current.easeFactor + (0.1 - (5 - quality) * 0.08));
  const newInterval = quality < 3 ? 1 : current.interval * newEaseFactor;
  
  return {
    ...current,
    lastReviewed: new Date(),
    nextReview: addDays(new Date(), newInterval),
    interval: newInterval,
    easeFactor: newEaseFactor,
  };
}
```

#### Smart Recommendations
- "You're weak in Graph algorithms. Try these problems."
- "Google often asks about System Design. Focus here."
- "It's been 7 days since you practiced DP. Time to review!"

---

### 2.5 Implementation Roadmap

#### Sprint 1: Auth Foundation (Week 1-2)
- [ ] Set up Supabase project
- [ ] Implement email/password authentication
- [ ] Create login/signup pages
- [ ] Protected routes setup
- [ ] User context provider

#### Sprint 2: Profile & Goals (Week 3-4)
- [ ] Profile page with settings
- [ ] Goal setting wizard
- [ ] Onboarding flow
- [ ] Basic dashboard with goal display

#### Sprint 3: Progress Sync (Week 5-6)
- [ ] Migrate localStorage progress to database
- [ ] Real-time progress sync
- [ ] Study session tracking
- [ ] Weekly/daily reports

#### Sprint 4: Smart Features (Week 7-8)
- [ ] Spaced repetition reminders
- [ ] Personalized recommendations
- [ ] Company-specific problem sets
- [ ] Interview countdown timer

#### Sprint 5: Gamification (Week 9-10)
- [ ] XP and levels system
- [ ] Achievement badges
- [ ] Streak tracking
- [ ] Optional leaderboard

---

## 📁 New File Structure (Phase 2)

```
/src
├── /auth
│   ├── AuthContext.tsx
│   ├── AuthProvider.tsx
│   ├── ProtectedRoute.tsx
│   └── useAuth.ts
├── /pages
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── ForgotPassword.tsx
│   ├── Profile.tsx
│   └── Onboarding.tsx
├── /features
│   ├── /goals
│   │   ├── GoalWizard.tsx
│   │   ├── GoalCard.tsx
│   │   └── useGoals.ts
│   ├── /progress
│   │   ├── ProgressSync.tsx
│   │   ├── StudySession.tsx
│   │   └── useProgress.ts
│   └── /recommendations
│       ├── SmartSuggestions.tsx
│       └── useRecommendations.ts
├── /services
│   ├── supabase.ts
│   ├── auth.service.ts
│   └── progress.service.ts
└── /types
    ├── auth.types.ts
    ├── goals.types.ts
    └── progress.types.ts
```

---

## 🔐 Security Considerations

- [ ] Rate limiting on auth endpoints
- [ ] CSRF protection
- [ ] Secure password requirements
- [ ] JWT token rotation
- [ ] Row Level Security in Supabase
- [ ] Input sanitization
- [ ] XSS prevention

---

## 📊 Success Metrics

| Metric | Target |
|--------|--------|
| User signups | 1000 in first month |
| Daily active users | 30% of signups |
| Avg. session time | 25 minutes |
| Goal completion rate | 40% |
| User retention (30 day) | 50% |

---

## 🎯 Phase 2 Definition of Done

- [ ] User can sign up, login, logout
- [ ] User can set interview goals
- [ ] Progress syncs across devices
- [ ] Personalized daily study plan generated
- [ ] Spaced repetition reminders work
- [ ] Dashboard shows goal progress
- [ ] Streak tracking functional

---

*Created: November 30, 2025*
*Target Completion: February 2026*
