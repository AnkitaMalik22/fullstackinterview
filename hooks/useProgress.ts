import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'fullstack-prep-progress';

interface ProgressState {
  completedTopics: string[];
  lastVisited: string | null;
  lastUpdated: number;
}

const defaultState: ProgressState = {
  completedTopics: [],
  lastVisited: null,
  lastUpdated: Date.now(),
};

export const useProgress = () => {
  const [progress, setProgress] = useState<ProgressState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultState;
    } catch {
      return defaultState;
    }
  });

  // Persist to localStorage whenever progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }, [progress]);

  const markComplete = useCallback((topicId: string) => {
    setProgress(prev => ({
      ...prev,
      completedTopics: prev.completedTopics.includes(topicId)
        ? prev.completedTopics
        : [...prev.completedTopics, topicId],
      lastUpdated: Date.now(),
    }));
  }, []);

  const markIncomplete = useCallback((topicId: string) => {
    setProgress(prev => ({
      ...prev,
      completedTopics: prev.completedTopics.filter(id => id !== topicId),
      lastUpdated: Date.now(),
    }));
  }, []);

  const toggleComplete = useCallback((topicId: string) => {
    setProgress(prev => ({
      ...prev,
      completedTopics: prev.completedTopics.includes(topicId)
        ? prev.completedTopics.filter(id => id !== topicId)
        : [...prev.completedTopics, topicId],
      lastUpdated: Date.now(),
    }));
  }, []);

  const setLastVisited = useCallback((viewId: string) => {
    setProgress(prev => ({
      ...prev,
      lastVisited: viewId,
      lastUpdated: Date.now(),
    }));
  }, []);

  const isComplete = useCallback((topicId: string) => {
    return progress.completedTopics.includes(topicId);
  }, [progress.completedTopics]);

  const resetProgress = useCallback(() => {
    setProgress(defaultState);
  }, []);

  const getCompletionPercentage = useCallback((totalTopics: number) => {
    if (totalTopics === 0) return 0;
    return Math.round((progress.completedTopics.length / totalTopics) * 100);
  }, [progress.completedTopics.length]);

  return {
    progress,
    completedCount: progress.completedTopics.length,
    lastVisited: progress.lastVisited,
    markComplete,
    markIncomplete,
    toggleComplete,
    setLastVisited,
    isComplete,
    resetProgress,
    getCompletionPercentage,
  };
};
