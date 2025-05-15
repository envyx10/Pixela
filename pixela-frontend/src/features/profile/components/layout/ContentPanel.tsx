import { FiInfo } from 'react-icons/fi';

interface ContentPanelProps {
  title: string;
  children?: React.ReactNode;
  isEmpty?: boolean;
  emptyMessage?: string;
  headerAction?: React.ReactNode;
}

export const ContentPanel = ({ 
  title, 
  children, 
  isEmpty = false, 
  emptyMessage = "No hay elementos disponibles.",
  headerAction
}: ContentPanelProps) => {
  return (
    <div className="content-panel">
      <div className="content-panel__header flex items-center justify-between px-6 pb-4 border-b border-white/10">
        <h2 className="content-panel__title text-lg font-semibold text-white">
          {title}
        </h2>
        {headerAction && (
          <span className="text-pixela-primary">{headerAction}</span>
        )}
      </div>
      
      {isEmpty ? (
        <div className="content-panel__empty">
          <FiInfo className="content-panel__empty-icon" />
          <p className="content-panel__empty-message">
            {emptyMessage}
          </p>
        </div>
      ) : (
        <div className="content-panel__content">
          {children}
        </div>
      )}
    </div>
  );
}; 