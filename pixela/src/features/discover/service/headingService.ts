import { headings } from '../content/headings';

/**
 * Función para obtener un heading aleatorio
 * @returns {string[]} Un array con el heading aleatorio
 * @description El heading es un array de strings que se muestra en la sección de descubrimiento
 * 
 */
export const getRandomHeading = (): string[] => {
    const randomIndex = Math.floor(Math.random() * headings.length);
    return headings[randomIndex];
}; 