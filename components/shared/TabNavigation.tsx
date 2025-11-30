import React from 'react';

interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  variant = 'default',
}) => {
  const baseStyles = 'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap active:scale-95';
  
  const variantStyles = {
    default: {
      container: 'flex flex-wrap gap-2 pb-4 border-b border-dark-800 overflow-x-auto scrollbar-hide',
      active: 'bg-brand-600 text-white shadow-lg shadow-brand-900/20 scale-105 rounded-lg',
      inactive: 'bg-dark-800 text-slate-400 hover:bg-dark-700 hover:text-white hover:scale-105 rounded-lg',
    },
    pills: {
      container: 'flex gap-1 p-1 bg-dark-800 rounded-lg w-fit',
      active: 'bg-brand-600 text-white rounded-md shadow-md',
      inactive: 'text-slate-400 hover:text-white rounded-md',
    },
    underline: {
      container: 'flex gap-6 border-b border-dark-700',
      active: 'text-brand-400 border-b-2 border-brand-400 -mb-px pb-3',
      inactive: 'text-slate-400 hover:text-white pb-3',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className={styles.container}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`${baseStyles} ${
            activeTab === tab.id ? styles.active : styles.inactive
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};
