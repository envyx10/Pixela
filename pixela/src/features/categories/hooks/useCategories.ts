import { useState, useEffect } from 'react';
import { getAllCategories } from '@/api/categories/categories';
import { Category } from '@/api/categories/categories';

/**
 * Hook para cargar las categorías de la API
 * @returns Lista de categorías y estado de carga
 */
export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, isLoading };
}; 