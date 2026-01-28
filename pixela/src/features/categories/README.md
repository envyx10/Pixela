# Categories Feature 🎬

## 📋 Descripción

La feature **Categories** es un sistema completo de navegación y filtrado de contenido que permite a los usuarios explorar películas y series organizadas por géneros. Implementa paginación, carga dinámica, filtros por tipo de media y una interfaz responsiva optimizada para diferentes dispositivos.

## 🎯 Propósito

- **Navegación por géneros**: Explorar contenido organizado por categorías
- **Filtrado de media**: Distinguir entre películas, series o mostrar todo
- **Paginación eficiente**: Navegar grandes volúmenes de contenido
- **Experiencia optimizada**: Precarga de imágenes y estados de carga
- **Responsividad**: Funcionamiento óptimo en todos los dispositivos

## 🏗️ Estructura de Archivos

```
src/features/categories/
├── README.md                    # Este archivo
├── components/
│   ├── core/
│   │   └── CategoriesContent.tsx    # Contenido filtrado
│   ├── navigation/
│   │   ├── CategoriesList.tsx       # Lista de categorías
│   │   ├── CategoriesHeader.tsx     # Encabezado con controles
│   │   └── MediaTypeSelector.tsx    # Selector de tipo de media
│   └── ui/
│       ├── CategoriesModal.tsx      # Modal para móvil
│       ├── Pagination.tsx           # Componente de paginación
│       └── ContentSkeleton.tsx      # Loading skeletons
├── hooks/
│   ├── useCategories.ts         # Hook para cargar categorías
│   └── useContentLoader.ts      # Hook principal de contenido
├── utils/
│   └── imageUtils.ts            # Utilidades de imágenes
├── types/
│   ├── categories.ts            # Interfaces de categorías
│   ├── components.ts            # Interfaces de componentes
│   ├── content.ts              # Interfaces de contenido
│   ├── media.ts                # Tipos de media
│   └── pagination.ts           # Interfaces de paginación
└── store/
    └── categoriesStore.ts      # Store global (Zustand)
```

## 🧩 Componentes

### CategoriesContent
**Ubicación**: `components/core/CategoriesContent.tsx`

Renderiza el contenido filtrado:

- **Grid responsivo**: Adapta cantidad de columnas
- **Contenido mixto**: Películas y series en una sola vista
- **Estados de carga**: Skeletons y mensajes de error
- **Optimización**: Lazy loading de imágenes

### CategoriesList
**Ubicación**: `components/navigation/CategoriesList.tsx`

Lista de categorías con funcionalidad completa:

- **Vista desktop**: Sidebar fijo con lista vertical
- **Vista móvil**: Botón que abre modal
- **Estados**: Loading, error y selección activa
- **Interactividad**: Selección y feedback visual

### CategoriesHeader
**Ubicación**: `components/navigation/CategoriesHeader.tsx`

Encabezado con controles principales:

- **Título**: Identificación de la sección
- **Selector de media**: Filtros de películas/series/todo
- **Layout responsivo**: Adaptación móvil/desktop

### Componentes auxiliares:

#### MediaTypeSelector
- Selector de tipo de contenido (películas/series/todo/random)
- Estados activos y transiciones suaves

#### Pagination
- Navegación por páginas con límites de TMDB
- Controles de anterior/siguiente
- Indicadores de página actual

#### CategoriesModal
- Modal para selección de categorías en móvil
- Animaciones de entrada/salida
- Búsqueda y filtrado

#### ContentSkeleton
- Skeletons de carga para mejor UX
- Animaciones de placeholder
- Responsive design

## 🔧 Hooks Personalizados

### useContentLoader
**Ubicación**: `hooks/useContentLoader.ts`

Hook principal para manejo de contenido:

```typescript
const {
  movies,
  series,
  loading,
  error,
  currentPage,
  totalPages,
  loadContent,
  resetContent
} = useContentLoader(selectedMediaType);
```

#### Funcionalidades:
- **Carga dinámica**: Por categoría o descubrimiento
- **Paginación**: Con límites de TMDB (500 páginas máx)
- **Precarga de imágenes**: Mejor experiencia visual
- **Manejo de errores**: Mensajes específicos por tipo
- **Prevención de cargas múltiples**: Control de concurrencia

### useCategories
**Ubicación**: `hooks/useCategories.ts`

Hook para cargar categorías desde la API:

```typescript
const { categories, isLoading } = useCategories();
```

## 📊 Gestión de Estado

### Store Principal (Zustand)
**Ubicación**: `store/categoriesStore.ts`

```typescript
interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  selectedMediaType: MediaType;
  selectedCategory: string | null;
  fetchCategories: (mediaType?: MediaType) => Promise<void>;
  setSelectedMediaType: (type: MediaType) => void;
  setSelectedCategory: (category: string | null) => void;
}
```

#### Características:
- **Estado global**: Categorías y tipo de media seleccionado
- **Carga asíncrona**: Fetch automático con manejo de errores
- **Persistencia**: Estado se mantiene durante la navegación
- **Manejo de categoría seleccionada**: Estado local y global

## 🌐 Tipos y Interfaces

### Tipos de Media
**Ubicación**: `types/media.ts`

```typescript
type MediaType = 'all' | 'movies' | 'series' | 'random';
```

### Interfaces de Categorías
**Ubicación**: `types/categories.ts`

```typescript
interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  selectedMediaType: MediaType;
  fetchCategories: (mediaType?: MediaType) => Promise<void>;
  setSelectedMediaType: (type: MediaType) => void;
}

interface CategoriesProps {
  onCategorySelect?: (category: Category) => void;
  selectedCategory?: Category | null;
  mediaType?: 'all' | 'movies' | 'series';
}
```

### Interfaces de Componentes
**Ubicación**: `types/components.ts`

```typescript
interface MediaTypeSelectorProps {
  selectedType: MediaType | 'random';
  onTypeChange: (type: MediaType | 'random') => void;
}

interface CategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  selectedCategory: Category | null;
  onCategorySelect: (category: Category) => void;
}

interface CategoriesHeaderProps {
  selectedMediaType: MediaType | 'random';
  onMediaTypeChange: (type: MediaType | 'random') => void;
}
```

### Interfaces de Contenido
**Ubicación**: `types/content.ts`

```typescript
interface CategoriesContentProps {
  selectedCategory: Category | null;
  movies: Pelicula[];
  series: Serie[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  onSearch: (query: string) => void;
  mediaType: 'all' | 'movies' | 'series' | 'random';
}

interface ContentSkeletonProps {
  count?: number;
}
```

### Interfaces de Paginación
**Ubicación**: `types/pagination.ts`

```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}
```

## 🎨 Sistema de Diseño

### Paleta de Colores
- **Fondo principal**: `bg-pixela-dark`
- **Acentos**: `text-pixela-accent`, `border-pixela-accent`
- **Estados**: Hover, active, disabled

### Responsividad
- **Mobile**: Layout vertical, modales, navegación simplificada
- **Tablet**: Ajustes intermedios, grids adaptados
- **Desktop**: Sidebar, hover effects, layout completo

### Animaciones
- **Transiciones**: 200-300ms para interacciones
- **Float animations**: Efectos sutiles en cards
- **Loading states**: Skeletons y spinners

## 🔗 Dependencias

### Externas
- `zustand`: Gestión de estado global
- `react-icons/fi`: Iconos Feather
- `next/image`: Optimización de imágenes

### Internas
- `@/api/categories/categories`: API de categorías
- `@/features/media/types/content`: Tipos de contenido
- `@/api/shared/apiHelpers`: Helpers de API

## 📋 Configuración

### Paginación
```typescript
const PAGINATION_CONFIG = {
  ITEMS_PER_PAGE: 20,
  MAX_TMDB_PAGES: 500,
  MIN_PAGE: 1,
} as const;
```

## 📱 Uso

```tsx
import { CategoriesContainer } from '@/features/categories';

// En una página
<CategoriesContainer />
```

## 🛠️ Mantenimiento

### Para añadir nuevas categorías:
1. Las categorías se cargan automáticamente desde la API
2. No requiere cambios manuales en el código

### Para modificar la paginación:
1. Ajustar `PAGINATION_CONFIG` en `useContentLoader.ts`
2. Considerar límites de TMDB API

### Para cambiar tipos de media:
1. Actualizar `MediaType` en `types/media.ts`
2. Ajustar lógica en componentes relacionados

## 🎯 Características Principales

- ✅ **Navegación por géneros**: Lista completa de categorías
- ✅ **Filtrado por tipo**: Películas, series o todo
- ✅ **Paginación avanzada**: Con límites y validación
- ✅ **Precarga de imágenes**: Experiencia fluida
- ✅ **Responsive design**: Móvil, tablet y desktop
- ✅ **Estados de carga**: Skeletons y feedback visual
- ✅ **Manejo de errores**: Mensajes específicos
- ✅ **Store global**: Estado persistente

## 🚀 Optimizaciones

### Rendimiento
- **Precarga de imágenes**: Evita flashes de carga
- **Lazy loading**: Carga bajo demanda
- **Memorización**: Evita re-renders innecesarios

### UX/UI
- **Feedback inmediato**: Estados de loading
- **Transiciones suaves**: Animaciones optimizadas
- **Navegación intuitiva**: Controles claros

## 📝 Notas Importantes

- **Límites de TMDB**: Máximo 500 páginas por restricción de API
- **Tipos de media**: Soporta movies/series/all/random
- **Carga inicial**: Se inicializa automáticamente con 'all'
- **Error handling**: Mensajes específicos por tipo de error
- **Concurrencia**: Prevención de cargas múltiples simultáneas

## 🔧 Extensibilidad

### Para añadir nuevos tipos de media:
1. Actualizar `MediaType` en `types/media.ts`
2. Extender lógica en `useContentLoader`
3. Actualizar componentes de filtrado

### Para personalizar paginación:
1. Modificar `PAGINATION_CONFIG`
2. Ajustar componente `Pagination`
3. Validar límites en `useContentLoader` 