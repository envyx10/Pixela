import { FiInfo } from 'react-icons/fi';

interface ContentPanelProps {
  title: string;
  children?: React.ReactNode;
  isEmpty?: boolean;
  emptyMessage?: string;
}

export const ContentPanel = ({ 
  title, 
  children, 
  isEmpty = false, 
  emptyMessage = "No hay elementos disponibles." 
}: ContentPanelProps) => {
  return (
    <div className="content-panel">
      <div className="content-panel__header">
        <h2 className="content-panel__title">
          {title}
        </h2>
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