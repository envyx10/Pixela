/**
 * Actor
 * @interface Actor
 * @property {string} id - ID del actor
 * @property {string} nombre - Nombre del actor
 * @property {string} foto - URL de la imagen del actor
 * @property {string} personaje - Personaje del actor
 */
export interface Actor {
  id: string;
  nombre: string;
  foto: string;
  personaje: string;
}

/**
 * Creador
 * @interface Creator
 * @property {string} id - ID del creador
 * @property {string} nombre - Nombre del creador
 * @property {string} foto - URL de la imagen del creador
 */
export interface Creator {
  id: string;
  nombre: string;
  foto: string;
} 