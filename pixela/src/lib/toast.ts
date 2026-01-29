/**
 * Toast Notification System
 * Sistema de notificaciones tipo toast para feedback visual al usuario
 */

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions {
  id?: string;
  type?: ToastType;
  title?: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface Toast extends Required<Omit<ToastOptions, 'action'>> {
  action?: ToastOptions['action'];
}

type ToastListener = (toasts: Toast[]) => void;

class ToastManager {
  private toasts: Toast[] = [];
  private listeners: Set<ToastListener> = new Set();
  private nextId = 0;

  private readonly DEFAULT_DURATION = 5000;
  private readonly AUTO_DISMISS_TYPES: ToastType[] = ['success', 'info'];

  /**
   * Subscribe a listener para cambios en toasts
   */
  subscribe(listener: ToastListener): () => void {
    this.listeners.add(listener);
    
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notifica a todos los listeners
   */
  private notify(): void {
    this.listeners.forEach((listener) => listener([...this.toasts]));
  }

  /**
   * Genera ID único para toast
   */
  private generateId(): string {
    return `toast-${Date.now()}-${this.nextId++}`;
  }

  /**
   * Muestra un toast
   */
  show(options: ToastOptions): string {
    const id = options.id || this.generateId();
    const type = options.type || 'info';
    
    const toast: Toast = {
      id,
      type,
      title: options.title || this.getDefaultTitle(type),
      message: options.message,
      duration: options.duration ?? this.DEFAULT_DURATION,
      action: options.action,
    };

    // Evitar duplicados con mismo ID
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.toasts.push(toast);
    this.notify();

    // Auto-dismiss si aplica
    if (this.AUTO_DISMISS_TYPES.includes(type) && toast.duration > 0) {
      setTimeout(() => this.dismiss(id), toast.duration);
    }

    return id;
  }

  /**
   * Cierra un toast específico
   */
  dismiss(id: string): void {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  }

  /**
   * Cierra todos los toasts
   */
  dismissAll(): void {
    this.toasts = [];
    this.notify();
  }

  /**
   * Obtiene título por defecto según tipo
   */
  private getDefaultTitle(type: ToastType): string {
    const titles: Record<ToastType, string> = {
      success: '✓ Éxito',
      error: '✕ Error',
      warning: '⚠ Advertencia',
      info: 'ℹ Información',
    };
    
    return titles[type];
  }

  /**
   * Helpers de acceso rápido
   */
  success(message: string, options?: Omit<ToastOptions, 'message' | 'type'>): string {
    return this.show({ ...options, message, type: 'success' });
  }

  error(message: string, options?: Omit<ToastOptions, 'message' | 'type'>): string {
    return this.show({ ...options, message, type: 'error' });
  }

  warning(message: string, options?: Omit<ToastOptions, 'message' | 'type'>): string {
    return this.show({ ...options, message, type: 'warning' });
  }

  info(message: string, options?: Omit<ToastOptions, 'message' | 'type'>): string {
    return this.show({ ...options, message, type: 'info' });
  }
}

// Singleton instance
export const toast = new ToastManager();
