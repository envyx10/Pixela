/**
 * Props del componente Pagination
 * @interface
 * @param {number} currentPage - Página actual
 * @param {number} totalPages - Número total de páginas
 * @param {function} onPageChange - Función para cambiar de página
 * @param {boolean} [disabled=false] - Indica si la paginación está deshabilitada
 */
export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    disabled?: boolean;
} 