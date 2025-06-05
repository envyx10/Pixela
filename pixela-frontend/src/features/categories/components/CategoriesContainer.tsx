'use client';

import { useState, useEffect, useCallback } from 'react';
import { CategoriesList } from './CategoriesList';
import { CategoriesContent } from './CategoriesContent';
import { CategoriesHeader } from './CategoriesHeader';
import { Pagination } from './Pagination';
import { Category } from '@/api/categories/categories';
import { useCategoriesStore } from '../store/categoriesStore';
import { useContentLoader } from '../hooks/useContentLoader';

const STYLES = {
    container: 'min-h-screen bg-gradient-to-br from-pixela-dark via-[#1a1a1a] to-pixela-dark pt-24',
    contentWrapper: 'container mx-auto px-4 py-8 md:py-12',
    mainContent: 'flex flex-col lg:flex-row gap-6 md:gap-8 items-start',
    categoriesContainer: 'w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-28 max-w-md mx-auto lg:mx-0 lg:max-w-none hidden lg:block',
    contentArea: 'flex-1 w-full max-w-4xl mx-auto lg:mx-0 lg:max-w-none',
    paginationContainer: 'w-full max-w-4xl mx-auto mt-8 md:mt-12 lg:max-w-none',
    searchContainer: 'w-full max-w-4xl mx-auto mb-6 lg:max-w-none'
} as const;

/**
 * Componente principal que maneja la visualización y navegación de categorías de contenido.
 * Permite filtrar por tipo de medio (películas/series) y categorías específicas.
 * Implementa paginación para la navegación del contenido.
 * 
 * @component
 * @returns {JSX.Element} El componente CategoriesContainer renderizado
 */
export const CategoriesContainer = () => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const { selectedMediaType, setSelectedMediaType } = useCategoriesStore();
    
    const {
        movies,
        series,
        loading,
        error,
        currentPage,
        totalPages,
        loadContent,
        resetContent,
        searchContent,
        searchQuery
    } = useContentLoader(selectedMediaType);

    /**
     * Maneja la selección de una categoría y carga su contenido.
     * 
     * @param {Category} category - La categoría seleccionada
     */
    const handleCategorySelect = useCallback(async (category: Category) => {
        setSelectedCategory(category);
        resetContent();
        await loadContent(category, 1);
    }, [loadContent, resetContent]);

    /**
     * Maneja el cambio de página en la paginación.
     * 
     * @param {number} page - El número de página a cargar
     */
    const handlePageChange = useCallback(async (page: number) => {
        await loadContent(selectedCategory, page);
    }, [selectedCategory, loadContent]);

    /**
     * Maneja el cambio de tipo de medio.
     * 
     * @param {MediaType} type - El nuevo tipo de medio
     */
    const handleMediaTypeChange = useCallback(async (type: 'all' | 'movies' | 'series') => {
        console.log('[DEBUG] handleMediaTypeChange called with:', type);
        setSelectedMediaType(type);
        setSelectedCategory(null);
        resetContent();
        await loadContent(null, 1);
    }, [setSelectedMediaType, resetContent, loadContent]);

    /**
     * Maneja la búsqueda de contenido
     * @param {string} query - Término de búsqueda
     */
    const handleSearch = useCallback(async (query: string) => {
        if (query.trim()) {
            setSelectedCategory(null);
            resetContent();
            await searchContent(query, 1);
        } else {
            resetContent();
            await loadContent(null, 1);
        }
    }, [searchContent, loadContent, resetContent]);

    // Carga inicial del contenido
    useEffect(() => {
        const initializeContent = async () => {
            if (!isInitialized) {
                console.log('[DEBUG] Initializing content...');
                await handleMediaTypeChange('all');
                setIsInitialized(true);
            }
        };

        initializeContent();
    }, [isInitialized, handleMediaTypeChange]);

    // Manejar cambios en el tipo de medio después de la inicialización
    useEffect(() => {
        console.log('[DEBUG] MediaType effect - isInitialized:', isInitialized, 'selectedMediaType:', selectedMediaType);
        if (isInitialized) {
            console.log('[DEBUG] Loading content for mediaType:', selectedMediaType);
            resetContent();
            loadContent(null, 1);
        }
    }, [selectedMediaType, isInitialized, resetContent, loadContent]);

    return (
        <div className={STYLES.container}>
            <div className={STYLES.contentWrapper}>
                <CategoriesHeader 
                    selectedMediaType={selectedMediaType}
                    onMediaTypeChange={handleMediaTypeChange}
                />
                
                <div className={STYLES.mainContent}>
                    {isInitialized && selectedMediaType !== 'all' && (
                        <div className={STYLES.categoriesContainer}>
                            <CategoriesList 
                                onCategorySelect={handleCategorySelect}
                                selectedCategory={selectedCategory}
                                mediaType={selectedMediaType}
                            />
                        </div>
                    )}

                    <div className={STYLES.contentArea}>
                        {/* Botón de categorías para móvil y tablet */}
                        {isInitialized && selectedMediaType !== 'all' && (
                            <div className="mb-6 lg:hidden">
                                <CategoriesList 
                                    onCategorySelect={handleCategorySelect}
                                    selectedCategory={selectedCategory}
                                    mediaType={selectedMediaType}
                                />
                            </div>
                        )}
                        
                        <div className="transform-gpu">
                            <CategoriesContent
                                selectedCategory={selectedCategory}
                                movies={selectedMediaType === 'series' ? [] : movies}
                                series={selectedMediaType === 'movies' ? [] : series}
                                loading={loading}
                                error={error}
                                searchQuery={searchQuery}
                                onSearch={handleSearch}
                            />
                        </div>

                        {totalPages > 1 && (
                            <div className={STYLES.paginationContainer}>
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                    disabled={loading}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}; 