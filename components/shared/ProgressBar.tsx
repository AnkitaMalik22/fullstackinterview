import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  label,
  showPercentage = true,
  size = 'md',
}) => {
  const percentage = Math.round((current / total) * 100);
  
  const sizeStyles = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className="space-y-2">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-sm">
          {label && <span className="text-slate-400">{label}</span>}
          {showPercentage && (
            <span className="text-brand-400 font-mono text-xs">
              {percentage}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-dark-700 rounded-full overflow-hidden ${sizeStyles[size]}`}>
        <div
          className="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {total > 0 && (
        <p className="text-xs text-slate-500">
          {current} of {total} completed
        </p>
      )}
    </div>
  );
};

// Checklist item for section completion
interface ChecklistItemProps {
  label: string;
  completed: boolean;
  onClick?: () => void;
}

export const ChecklistItem: React.FC<ChecklistItemProps> = ({
  label,
  completed,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all text-left
      ${completed 
        ? 'bg-green-500/10 border border-green-500/20' 
        : 'bg-dark-800 border border-dark-700 hover:border-dark-600'
      }`}
  >
    {completed ? (
      <CheckCircle2 className="text-green-400 shrink-0" size={18} />
    ) : (
      <Circle className="text-slate-600 shrink-0" size={18} />
    )}
    <span className={`text-sm ${completed ? 'text-green-300 line-through' : 'text-slate-300'}`}>
      {label}
    </span>
  </button>
);
