export enum ViewState {
  HOME = 'HOME',
  
  // Foundations
  CSS_STYLING = 'CSS_STYLING',
  BROWSER_APIS = 'BROWSER_APIS',

  // React Core & Performance
  STATE_MANAGEMENT = 'STATE_MANAGEMENT',
  PERFORMANCE_LAB = 'PERFORMANCE_LAB',
  DEBUGGING = 'DEBUGGING',

  // Architecture
  ARCHITECTURE = 'ARCHITECTURE',

  // Reliability & Security
  API_RESILIENCE = 'API_RESILIENCE',
  SECURITY = 'SECURITY',

  // Quality
  ACCESSIBILITY = 'ACCESSIBILITY',
  TESTING = 'TESTING',

  // Backend Engineering
  BACKEND_SYSTEM = 'BACKEND_SYSTEM',
  BACKEND_DB = 'BACKEND_DB',
  BACKEND_API = 'BACKEND_API',
  BACKEND_SECURITY = 'BACKEND_SECURITY',

  // Backend System Design (Advanced)
  BACKEND_SYSDESIGN = 'BACKEND_SYSDESIGN',

  // DSA
  DSA_STRUCTURES = 'DSA_STRUCTURES',
  DSA_ALGORITHMS = 'DSA_ALGORITHMS',

  // Frontend-Specific DSA
  FRONTEND_DSA = 'FRONTEND_DSA',

  // Practice
  AI_COACH = 'AI_COACH',
}

export interface NavItem {
  id: ViewState;
  label: string;
  icon: React.ReactNode;
  description?: string;
  group?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface LogEntry {
  id: string;
  timestamp: number;
  type: 'info' | 'success' | 'error' | 'warning';
  message: string;
}