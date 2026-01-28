import { FooterLink } from '@/features/footer/types/links';



/**
 * Interfaz para las secciones del footer
 * @type
 * @returns {FooterSection}
 * @description Define las secciones del footer
 */
export interface FooterSection {
  title: string;
  links: FooterLink[];
}

/**
 * Interfaz para las propiedades del componente FooterContent
 * @type
 * @returns {FooterContentProps}
 * @description Define las propiedades del componente FooterContent
 */
export interface FooterContentProps {
  className?: string;
} 