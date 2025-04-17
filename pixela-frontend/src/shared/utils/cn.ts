import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina clases de CSS usando clsx y tailwind-merge
 * Esta utilidad permite combinar clases condicionales y resolver conflictos
 * de clases de Tailwind
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 