'use client';

import type { FC } from 'react';
import clsx from 'clsx';

/**
 * Estilos constantes para el componente ProfileSkeleton
 */
const STYLES = {
  main: 'pt-28 px-6 min-h-screen bg-gradient-to-b from-pixela-dark to-black',
  container: 'max-w-6xl mx-auto',
  title: 'h-10 w-48 bg-pixela-dark-opacity rounded-lg animate-pulse mb-8',
  tabsContainer: 'flex flex-wrap gap-2 mb-8',
  tab: 'h-10 w-32 bg-pixela-dark-opacity rounded-full animate-pulse',
  contentContainer: clsx(
    'bg-pixela-dark-opacity backdrop-blur-lg',
    'rounded-3xl p-8 shadow-lg'
  ),
  header: 'flex justify-between items-center mb-6',
  headerTitle: 'h-8 w-48 bg-pixela-dark rounded-lg animate-pulse',
  headerButton: 'h-10 w-24 bg-pixela-dark rounded-full animate-pulse',
  profileContainer: 'flex flex-col md:flex-row items-start gap-8',
  avatar: 'w-32 h-32 rounded-full bg-pixela-dark animate-pulse',
  infoContainer: 'flex-1 space-y-6 py-2',
  infoTitle: 'h-10 w-1/3 bg-pixela-dark rounded-lg animate-pulse',
  infoList: 'space-y-4',
  infoItem: 'flex items-center gap-3',
  infoIcon: 'w-10 h-10 rounded-full bg-pixela-dark animate-pulse',
  infoContent: 'space-y-2',
  infoLabel: 'h-4 w-24 bg-pixela-dark rounded animate-pulse',
  infoValue: 'h-6 w-48 bg-pixela-dark rounded animate-pulse'
} as const;

/**
 * Componente que muestra un esqueleto de carga para el perfil
 * @returns {JSX.Element} Componente ProfileSkeleton
 */
export const ProfileSkeleton: FC = () => {
  return (
    <main className={STYLES.main}>
      <div className={STYLES.container}>
        <div className={STYLES.title} />
        
        <div className={STYLES.tabsContainer}>
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className={STYLES.tab} />
          ))}
        </div>
        
        <div className={STYLES.contentContainer}>
          <div className={STYLES.header}>
            <div className={STYLES.headerTitle} />
            <div className={STYLES.headerButton} />
          </div>
          
          <div className={STYLES.profileContainer}>
            <div className={STYLES.avatar} />
            
            <div className={STYLES.infoContainer}>
              <div className={STYLES.infoTitle} />
              
              <div className={STYLES.infoList}>
                {[1, 2, 3].map((item) => (
                  <div key={item} className={STYLES.infoItem}>
                    <div className={STYLES.infoIcon} />
                    <div className={STYLES.infoContent}>
                      <div className={STYLES.infoLabel} />
                      <div className={STYLES.infoValue} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}; 