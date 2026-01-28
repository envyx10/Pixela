
    
/**	
 * Props para el componente QuoteSection
 * @interface QuoteSectionProps
 * @property {Object} quote - Objeto con la cita y el autor
 * @property {string} quote.quote - Cita
 * @property {string} quote.author - Autor
 */
export type QuoteSectionProps = {
    quote: {
      quote: string;
      author: string;
    }
  }