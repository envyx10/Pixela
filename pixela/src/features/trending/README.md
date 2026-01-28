# Trending Feature 📈

## 📋 Descripción

La feature **Trending** es el sistema de contenido en tendencias de Pixela. Muestra las series y películas más populares en un carrusel interactivo con navegación por categorías. Los usuarios pueden alternar entre series y películas, ver detalles de cada medio, y realizar acciones como agregar a favoritos o escribir reseñas. Es una de las secciones principales de la página de inicio.

## 🎯 Propósito

- **Contenido popular**: Mostrar las series y películas más en tendencia
- **Navegación por categorías**: Alternar entre series y películas con botones
- **Carrusel interactivo**: Navegación fluida con scroll horizontal
- **Acciones rápidas**: Favoritos, reseñas y navegación a detalles
- **Optimización visual**: Carga prioritaria y lazy loading inteligente
- **Estados de carga**: Feedback visual durante la carga de datos

## 🏗️ Estructura de Archivos

```
src/features/trending/
├── README.md                       # Este archivo
├── types/                          # Tipos e interfaces
│   ├── api.ts                      # Tipos relacionados con la API
│   ├── base.ts                     # Interfaces base
│   ├── common.ts                   # Tipos comunes
│   ├── components.ts               # Props de componentes
│   ├── media.ts                    # Tipos de medios
│   ├── response.ts                 # Tipos de respuesta
│   └── index.ts                    # Re-exportaciones
├── services/                       # Servicios de API
│   └── trendingService.ts         # Servicio principal
├── store/                          # Gestión de estado con Zustand
│   ├── types.ts                    # Tipos del store
│   └── trendingStore.ts           # Implementación del store
└── components/
    ├── trending.css                # Estilos específicos
    ├── TrendingSection.tsx         # Componente principal de orquestación
    ├── TrendingHeader.tsx          # Header con título y navegación
    ├── TrendingMediaCarousel.tsx   # Carrusel de contenido
    ├── TrendingMediaCard.tsx       # Tarjeta individual de medio
    ├── TrendingButton.tsx          # Botón de navegación (Series/Películas)
    └── MediaInfoDetails.tsx        # Información detallada del medio
```

## 🧩 Componentes Principales

### TrendingSection
**Ubicación**: `components/TrendingSection.tsx`

Componente de orquestación que inicializa el store y gestiona los datos:

- **Inicialización del store**: Carga inicial de series y películas
- **Deduplicación**: Elimina elementos duplicados por ID
- **Composición**: Combina header y carrusel
- **Props interface**: Recibe series y películas como entrada

### Store de Estado
**Ubicación**: `store/trendingStore.ts`

Store centralizado con Zustand que maneja:

- **Series en tendencia**: Lista de series populares
- **Películas en tendencia**: Lista de películas populares
- **Getters y setters**: Funciones para actualizar y obtener contenido
- **Filtrado por tipo**: Obtención de contenido según categoría

#### Tipos del Store
**Ubicación**: `store/types.ts`

```typescript
interface TrendingStoreState {
  series: TrendingSerie[];
  movies: TrendingMovie[];
  setSeries: (series: TrendingSerie[]) => void;
  setMovies: (movies: TrendingMovie[]) => void;
  getContentByType: (type: MediaType) => TrendingSerie[] | TrendingMovie[];
}
```

#### Uso del Store
```typescript
// Acceso al estado
const series = useTrendingStore(state => state.series);
const movies = useTrendingStore(state => state.movies);

// Actualización de estado
const setSeries = useTrendingStore(state => state.setSeries);
const setMovies = useTrendingStore(state => state.setMovies);

// Obtención de contenido por tipo
const getContentByType = useTrendingStore(state => state.getContentByType);
const activeContent = getContentByType('series');
```

### TrendingHeader
**Ubicación**: `components/TrendingHeader.tsx`

Componente principal que gestiona la UI y navegación:

- **Título responsive**: "TENDENCIAS" con breakpoints específicos
- **Toggle de categorías**: Botones para alternar entre series y películas
- **Estados de carga**: LoadingState y ContentState
- **Layout adaptativo**: Móvil vertical, desktop horizontal

#### Subcomponentes:
- **TrendingTitle**: Título estilizado con tipografía responsive
- **TrendingToggle**: Sistema de botones de navegación
- **LoadingState**: Estado de carga con skeleton
- **ContentState**: Contenido principal con carrusel

### TrendingMediaCarousel
**Ubicación**: `components/TrendingMediaCarousel.tsx`

Carrusel de contenido que utiliza el componente compartido `MediaCarousel`:

- **Grid responsive**: 280px móvil, 375px desktop
- **Navegación fluida**: Scroll horizontal con momentum
- **Slides individuales**: Wrapper para cada tarjeta de medio
- **Flexbox layout**: Sin gaps, slides contiguos

#### Configuración de slides:
- Ancho fijo por dispositivo
- Min/max width para consistencia
- Flex-none para evitar shrinking
- Gap-0 para diseño compacto

### TrendingMediaCard
**Ubicación**: `components/TrendingMediaCard.tsx`

Tarjeta individual de medio con interacciones avanzadas:

- **Hover effects**: Overlay con información al pasar el mouse
- **Optimización de imágenes**: Priority loading para elementos visibles
- **Badge dinámico**: "TOP PIXELA" para contenido bien valorado (≥7.5)
- **Action buttons**: Favoritos, reseñas, navegación a detalles

#### Características visuales:
- Noise effect para textura
- Gradiente de overlay
- Transiciones suaves (300ms)
- Estados de loading prioritario

### TrendingButton
**Ubicación**: `components/TrendingButton.tsx`

Botón especializado para navegación entre categorías:

- **Estados activo/inactivo**: Styling diferenciado
- **Accesibilidad**: `aria-pressed` para tecnologías asistivas
- **Responsive design**: Min-width y flex-1 para consistencia
- **Transiciones**: 300ms duration para cambios de estado

### MediaInfoDetails
**Ubicación**: `components/MediaInfoDetails.tsx`

Información detallada mostrada en overlay de hover:

- **Rating display**: Estrella amarilla con puntuación
- **Año de lanzamiento**: Extraído de fecha de estreno/emisión
- **Badge de tipo**: "Serie" o "Película"
- **Título destacado**: Tipografía outfit con énfasis

## 📊 Tipos y Interfaces

### BaseTrendingMedia
**Ubicación**: `types/base.ts`

```typescript
interface BaseTrendingMedia {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  created_at: string;
  updated_at: string;
}
```

### TrendingSerie
```typescript
interface TrendingSerie extends BaseTrendingMedia {
  first_air_date: string;
}
```

### TrendingMovie
```typescript
interface TrendingMovie extends BaseTrendingMedia {
  release_date: string;
}
```

### TrendingResponse
```typescript
interface TrendingResponse<T> {
  success: boolean;
  data: T[];
}

type SeriesResponse = TrendingResponse<TrendingSerie>;
type MoviesResponse = TrendingResponse<TrendingMovie>;
```

### MediaType
```typescript
type MediaType = 'series' | 'movies';
```

## 🌐 Servicios y API

### fetchTrendingMedia
**Ubicación**: `services/trendingService.ts`

Función genérica para obtener contenido en tendencia:

```typescript
async function fetchTrendingMedia<T>(
  mediaType: MediaType,
  options: FetchOptions = {}
): Promise<T[]>
```

#### Configuración:
- **DEFAULT_LIMIT**: 20 elementos por defecto
- **DEFAULT_OFFSET**: 0 como punto de inicio
- **Error handling**: Retorna array vacío en caso de error
- **Logging**: Console log para debugging

### Funciones específicas:
- `getTrendingSeries(limit, offset)`: Obtener series en tendencia
- `getTrendingMovies(limit, offset)`: Obtener películas en tendencia

#### Endpoints:
- `GET /api/series/trending`: Series en tendencia
- `GET /api/movies/trending`: Películas en tendencia

## 🎨 Sistema de Diseño

### Layout y Spacing
- **Container**: w-[90%] móvil, w-[85%] tablet, w-[80%] desktop
- **Min height**: screen completa con flex layout
- **Padding**: pt-8 móvil, pt-20 desktop
- **Gaps**: 8 móvil, 0 desktop entre título y toggle

### Tipografía
- **Título principal**: 64px móvil, 96px/128px desktop
- **Font family**: Outfit para títulos, sistema para texto
- **Font weights**: Black para títulos, semibold para ratings
- **Text colors**: pixela-accent para títulos, white para contenido

### Responsive Breakpoints
- **Mobile**: < 768px - Layout vertical, título apilado
- **Tablet**: 768px-1024px - Layout intermedio
- **Desktop**: ≥ 1024px - Layout horizontal completo

### Colores y Efectos
- **Primary**: #ec1b69 (pixela-accent) para elementos destacados
- **Background**: pixela-dark con overlays para cards
- **Gradients**: from-pixela-dark via-pixela-dark/70 to-transparent
- **Shadows**: black/20 para profundidad

### Estados Visuales
- **Hover effects**: Opacity transitions, scale transforms
- **Loading states**: Skeleton cards con texto centrado
- **Active states**: Background accent, text contrast
- **Transitions**: 300ms duration para todas las animaciones

## 🔗 Dependencias

### Externas
- `zustand`: Estado global reactivo
- `next/image`: Optimización de imágenes
- `next/navigation`: Routing y prefetch
- `react-icons/fa`: Iconos (estrella para rating)
- `clsx`: Clases CSS condicionales

### Internas
- `@/shared/components/MediaCarousel`: Carrusel base compartido
- `@/shared/components/Badge`: Badge "TOP PIXELA"
- `@/shared/components/ActionButtons`: Botones de acción
- `@/api/shared/apiEndpoints`: Configuración de endpoints

## 📱 Uso

### Implementación básica:
```tsx
import { TrendingSection } from '@/features/trending/components/TrendingSection';

// En página de inicio o layout principal
export default function HomePage() {
  const series = await getTrendingSeries();
  const movies = await getTrendingMovies();
  
  return (
    <TrendingSection 
      series={series} 
      movies={movies} 
    />
  );
}
```

### Uso del store:
```tsx
import { useTrendingStore } from '@/features/trending/store';

function TrendingComponent() {
  const series = useTrendingStore(state => state.series);
  const movies = useTrendingStore(state => state.movies);
  const getContentByType = useTrendingStore(state => state.getContentByType);
  
  const activeContent = getContentByType('series');
  // ...
}
```

## 🛠️ Configuración

### Límites de carga:
```typescript
const DEFAULT_LIMIT = 20;      // Elementos por request
const DEFAULT_OFFSET = 0;      // Punto de inicio
```

### Optimización de imágenes:
```typescript
const INITIALLY_VISIBLE_ITEMS = 3;    // Priority loading
const HIGH_RATING_THRESHOLD = 7.5;    // Badge "TOP PIXELA"
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
```

### Dimensiones responsive:
```typescript
const CARD_DIMENSIONS = {
  mobile: { width: '280px', height: '395px' },
  desktop: { width: '375px', height: '528px' }
};
```

### Estilos de animación:
```css
:root {
  --pixela-accent-color: rgba(236, 27, 105, 0.5);
  --pixela-accent-color-transparent: rgba(236, 27, 105, 0);
}
```

## 🎯 Características Principales

- ✅ **Carrusel de tendencias**: Navegación fluida horizontal
- ✅ **Toggle de categorías**: Alternancia entre series y películas
- ✅ **Optimización de imágenes**: Priority loading para elementos visibles
- ✅ **Badge dinámico**: "TOP PIXELA" para contenido bien valorado
- ✅ **Hover interactions**: Overlay con información y acciones
- ✅ **Estado global**: Zustand store para datos persistentes
- ✅ **Responsive design**: Layout adaptativo móvil/desktop
- ✅ **Loading states**: Estados de carga con skeleton
- ✅ **Error handling**: Fallbacks para requests fallidos
- ✅ **Accesibilidad**: ARIA labels y keyboard navigation

## 🚀 Optimizaciones

### Rendimiento
- **Priority loading**: 3 primeros elementos cargados prioritariamente
- **Lazy loading**: Imágenes restantes bajo demanda
- **Prefetch**: Navigation prefetch en hover
- **Memoization**: Todos los subcomponentes memoizados

### UX/UI
- **Smooth transitions**: 300ms para todas las animaciones
- **Responsive typography**: Breakpoints específicos para títulos
- **Touch-friendly**: Carrusel optimizado para móviles
- **Visual feedback**: Estados hover y active claros

### Data Management
- **Duplicate removal**: Filtrado por ID único
- **Error boundaries**: Fallback a arrays vacíos
- **State persistence**: Store global para navegación
- **Optimistic updates**: UI responsiva durante carga

## 📝 Notas Importantes

- **Datos externos**: Dependiente de APIs de series y películas
- **Store inicialización**: Debe recibir datos desde componente padre
- **Image optimization**: URLs de TMDB con w500 para balance calidad/peso
- **Threshold configurable**: 7.5 para badge "TOP PIXELA" ajustable
- **CSS variables**: Colores de accent definidos en trending.css
- **Component memoization**: Todos los subcomponentes optimizados

## 🔧 Extensibilidad

### Para añadir nuevos tipos de media:
1. Extender `MediaType` en types
2. Añadir endpoint en service
3. Crear interfaz específica extendiendo `BaseTrendingMedia`
4. Actualizar store con nuevos campos
5. Añadir botón en `TrendingToggle`

### Para modificar layout del carrusel:
1. Ajustar `CARD_DIMENSIONS` en configuración
2. Actualizar clases CSS en `TrendingMediaCarousel`
3. Revisar responsive breakpoints
4. Modificar `INITIALLY_VISIBLE_ITEMS` si es necesario

### Para personalizar badges:
1. Ajustar `HIGH_RATING_THRESHOLD` en configuración
2. Modificar lógica de `isHighRated` en `TrendingMediaCard`
3. Crear nuevos badges en componente Badge compartido

### Para añadir filtros adicionales:
1. Extender store con nuevos campos de filtro
2. Crear componentes de filtro en UI
3. Modificar service para soportar query parameters
4. Actualizar tipos con nuevos parámetros de filtro 