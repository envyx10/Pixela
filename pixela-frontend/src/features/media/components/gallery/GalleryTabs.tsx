"use client";

import clsx from 'clsx';

interface GalleryTabsProps {
  activeTab: 'backdrops' | 'posters';
  onTabChange: (tab: 'backdrops' | 'posters') => void;
  backdropsCount: number;
  postersCount: number;
}

export function GalleryTabs({ 
  activeTab, 
  onTabChange, 
  backdropsCount, 
  postersCount 
}: GalleryTabsProps) {
  return (
    <div className="flex border-b border-gray-700">
      <button
        className={clsx(
          "py-3 px-6 text-sm font-medium rounded-t-lg focus:outline-none transition-colors",
          {
            "bg-pixela-accent text-gray-900": activeTab === 'backdrops',
            "text-gray-400 hover:text-white": activeTab !== 'backdrops'
          }
        )}
        onClick={() => onTabChange('backdrops')}
      >
        Fondos ({backdropsCount})
      </button>
      
      <button
        className={clsx(
          "py-3 px-6 text-sm font-medium rounded-t-lg focus:outline-none transition-colors",
          {
            "bg-pixela-accent text-gray-900": activeTab === 'posters',
            "text-gray-400 hover:text-white": activeTab !== 'posters'
          }
        )}
        onClick={() => onTabChange('posters')}
      >
        Pósters ({postersCount})
      </button>
    </div>
  );
} 