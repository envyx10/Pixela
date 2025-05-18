import { ElementType } from 'react';

/**
 * Interfaz para los enlaces del footer
 */
export interface FooterLink {
  name: string;
  href: string;
}

/**
 * Interfaz para los enlaces de redes sociales
 */
export interface SocialLink {
  Icon: ElementType;
  label: string;
  title: string;
  href: string;
}

/**
 * Interfaz para la información de contacto
 */
export interface FooterContact {
  email: string;
  location: string;
}

/**
 * Interfaz para la configuración completa del contenido del footer
 */
export interface FooterContent {
  links: {
    explorer: FooterLink[];
    company: FooterLink[];
    social: SocialLink[];
  };
  contact: FooterContact;
  description: string;
} 