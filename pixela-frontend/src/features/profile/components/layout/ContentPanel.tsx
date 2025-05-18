import type { FC, ReactNode } from 'react';
import { FiInfo } from 'react-icons/fi';
import clsx from 'clsx';

/**
 * Estilos constantes para el componente ContentPanel
 */
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
 * Props para el componente ContentPanel
 * @interface ContentPanelProps
 */
interface ContentPanelProps {
  /** Título del panel */
  title: string;
  /** Contenido del panel */
  children?: ReactNode;
  /** Indica si el panel está vacío */
  isEmpty?: boolean;
  /** Mensaje a mostrar cuando el panel está vacío */
  emptyMessage?: string;
  /** Acción opcional en el encabezado */
  headerAction?: ReactNode;
}

/**
 * Componente panel de contenido con soporte para estado vacío
 * @param {ContentPanelProps} props - Props del componente
 * @returns {JSX.Element} Componente ContentPanel
 */
export const ContentPanel: FC<ContentPanelProps> = ({ 
  title, 
  children, 
  isEmpty = false, 
  emptyMessage = "No hay elementos disponibles.",
  headerAction
}) => {
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