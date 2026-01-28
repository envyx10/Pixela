import { FiInfo } from 'react-icons/fi';
import clsx from 'clsx';
import { ContentPanelProps } from '@/features/profile/types/layout';

const STYLES = {
  container: 'content-panel',
  header: clsx(
    'content-panel__header',
    'flex items-center justify-between px-6 pb-4',
    'border-b border-white/10'
  ),
  title: 'content-panel__title text-lg font-semibold text-white',
  headerAction: 'text-pixela-primary',
  empty: 'content-panel__empty',
  emptyIcon: 'content-panel__empty-icon',
  emptyMessage: 'content-panel__empty-message',
  content: 'content-panel__content'
} as const;



/**
 * Componente panel de contenido con soporte para estado vacío
 * @param {ContentPanelProps} props - Props del componente
 * @returns {JSX.Element} Componente ContentPanel
 */
export const ContentPanel = ({ 
  title, 
  children, 
  isEmpty = false, 
  emptyMessage = "No hay elementos disponibles.",
  headerAction
}: ContentPanelProps) => {
  return (
    <div className={STYLES.container}>
      <div className={STYLES.header}>
        <h2 className={STYLES.title}>
          {title}
        </h2>
        {headerAction && (
          <span className={STYLES.headerAction}>
            {headerAction}
          </span>
        )}
      </div>
      
      {isEmpty ? (
        <div className={STYLES.empty}>
          <FiInfo className={STYLES.emptyIcon} />
          <p className={STYLES.emptyMessage}>
            {emptyMessage}
          </p>
        </div>
      ) : (
        <div className={STYLES.content}>
          {children}
        </div>
      )}
    </div>
  );
}; 