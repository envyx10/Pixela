# Discover Feature 🔍

## 📋 Descripción

La feature **Discover** es una sección de descubrimiento de contenido que presenta una selección curada de películas y series en un formato visual atractivo. Permite a los usuarios explorar contenido nuevo mediante un diseño tipo grid con tarjetas interactivas y un selector para alternar entre tipos de media.

## 🎯 Propósito

- **Descubrimiento de contenido**: Mostrar una selección curada de películas y series
- **Exploración visual**: Grid atractivo con tarjetas interactivas
- **Alternancia de tipos**: Cambiar entre películas y series fácilmente
- **Navegación hacia categorías**: Enlace directo a exploración completa
- **Experiencia inmersiva**: Diseño con gradientes y animaciones

## 🏗️ Estructura de Archivos

```
src/features/discover/
├── README.md                    # Este archivo
├── type.ts                      # Interfaces y tipos
├── service.ts                   # Servicios de API
├── store.ts                     # Store global (Zustand)
└── components/
    ├── DiscoverSection.tsx      # Componente principal
    ├── DiscoverContent.tsx      # Contenido principal con layout
    ├── DiscoverGrid.tsx         # Grid de tarjetas
    ├── DiscoverCard.tsx         # Tarjeta individual
    └── DiscoverSelector.tsx     # Selector de tipo de media
```

## 🧩 Componentes

### DiscoverSection
**Ubicación**: `components/DiscoverSection.tsx`

Componente raíz que inicializa el store global:

- **Inicialización**: Recibe datos de series y películas como props
- **Store management**: Actualiza el store global con los datos
- **Delegación**: Renderiza DiscoverContent

#### Props:
```typescript
interface DiscoverSectionProps {
  series: TrendingSerie[];
  movies: TrendingMovie[];
}
```

### DiscoverContent
**Ubicación**: `components/DiscoverContent.tsx`

Componente principal que contiene todo el layout y contenido:

- **Layout principal**: División en sección izquierda (texto) y derecha (grid)
- **Gradientes de fondo**: Efectos visuales inmersivos
- **Texto promocional**: Título y descripción motivacional
- **Controles**: Botón de explorar y selector de tipo
- **Responsividad**: Adaptación completa móvil/desktop

#### Características:
- Título responsive con quiebre de línea en móvil
- Descripción detallada con múltiples párrafos
- Gradientes animados de fondo
- Botón con efectos hover
- Integración con store de categorías

### DiscoverGrid
**Ubicación**: `components/DiscoverGrid.tsx`

Grid responsivo que organiza las tarjetas de contenido:

- **Layout desktop**: Diseño 2-3-2 (7 tarjetas total)
- **Layout móvil**: Grid de 2 columnas (6 tarjetas si total es impar)
- **Animaciones**: Efectos flotantes escalonados
- **Estados de carga**: Skeletons mientras cargan datos
- **Límite de contenido**: Máximo 7 elementos

#### Layouts:
- **Desktop**: 2 tarjetas + 3 tarjetas + 2 tarjetas
- **Móvil**: 2 columnas adaptativas

### DiscoverCard
**Ubicación**: `components/DiscoverCard.tsx`

Tarjeta individual de contenido con interactividad:

- **Imagen principal**: Poster o backdrop según tipo
- **Overlay hover**: Información y controles al hacer hover
- **Información**: Título, rating, año, tipo
- **Acciones**: Botones de favoritos, reseñas e información
- **Badge**: Indicador "TOP PIXELA" para contenido mejor valorado
- **Navegación**: Enlaces a páginas de detalle

#### Características:
- **Type guard**: Diferencia entre series y películas
- **Rating visual**: Estrellas con ThemeDB score
- **Animaciones**: Transiciones suaves
- **Lazy loading**: Optimización de imágenes
- **Responsive**: Adaptación móvil/desktop

### DiscoverSelector
**Ubicación**: `components/DiscoverSelector.tsx`

Selector tipo toggle para cambiar entre series y películas:

- **Botones tipo tab**: Series y Películas
- **Estado activo**: Indicador visual claro
- **Transiciones**: Animaciones suaves
- **Responsive**: Adaptación de ancho

## 🔧 Gestión de Estado

### Store (Zustand)
**Ubicación**: `store.ts`

```typescript
interface DiscoverStoreState {
  series: TrendingSerie[];
  movies: TrendingMovie[];
  activeType: MediaType;
  setSeries: (series: TrendingSerie[]) => void;
  setMovies: (movies: TrendingMovie[]) => void;
  setActiveType: (type: MediaType) => void;
}
```

#### Características:
- **Estado global**: Series, películas y tipo activo
- **Tipo por defecto**: 'series'
- **Mutadores**: Funciones para actualizar cada estado
- **Persistencia**: Estado se mantiene durante la navegación

## 🌐 Servicios y API

### Service Functions
**Ubicación**: `service.ts`

```typescript
const getDiscoveredSeries = (): Promise<TrendingSerie[]>
const getDiscoveredMovies = (): Promise<TrendingMovie[]>
```

#### Funcionalidades:
- **Límite fijo**: Máximo 7 elementos por tipo
- **Error handling**: Manejo de errores con fallback a array vacío
- **API integration**: Conexión con endpoints de discovery
- **Tipado fuerte**: TypeScript con interfaces específicas

#### Configuración:
```typescript
const DISCOVER_LIMIT = 7;
```

## 📊 Tipos y Interfaces

### Tipos Principales
**Ubicación**: `type.ts`

```typescript
type MediaType = 'series' | 'movies';

interface DiscoverResponse {
  success: boolean;
  data: (TrendingSerie | TrendingMovie)[];
}

type MediaContent = TrendingSerie | TrendingMovie;
```

#### Herencia:
- Reutiliza tipos de la feature `trending`
- Compatibilidad con tipos existentes
- Type guards para diferenciación

## 🎨 Sistema de Diseño

### Gradientes de Fondo
- **Gradiente principal**: `from-pixela-accent/50 via-pixela-accent/20`
- **Gradiente secundario**: `from-pixela-accent/60 via-pixela-accent/30`
- **Blur effects**: 250px-300px para efecto difuso
- **Opacidad**: 60%-70% para no interferir con el texto

### Tipografía
- **Título principal**: Font Outfit, 48px-128px según dispositivo
- **Descripción**: 16px-20px con line-height relaxed
- **Fuente**: Sistema tipográfico de Pixela

### Responsive Breakpoints
- **Móvil**: Grid 2 columnas, título con line break
- **Tablet**: Ajustes intermedios
- **Desktop**: Layout 50/50, grid 2-3-2

### Animaciones
- **Float effects**: Animaciones escalonadas en tarjetas
- **Hover transitions**: 300ms duration
- **Button effects**: Transformaciones en hover

## 🔗 Dependencias

### Externas
- `zustand`: Gestión de estado global
- `next/image`: Optimización de imágenes
- `next/link`: Navegación entre páginas
- `react-icons/io`: Iconos para botones
- `clsx`: Utility para clases CSS condicionales

### Internas
- `@/features/trending/type`: Tipos de contenido
- `@/features/categories/store`: Store de categorías
- `@/shared/components/Badge`: Componente de badge
- `@/shared/components/ActionButtons`: Botones de acción
- `@/hooks/useMediaQuery`: Hook para responsive

## 📱 Uso

```tsx
import { DiscoverSection } from '@/features/discover';

// En una página con datos pre-cargados
<DiscoverSection 
  series={discoveredSeries}
  movies={discoveredMovies}
/>
```

### Carga de datos:
```tsx
// En la página que consume el componente
const discoveredSeries = await getDiscoveredSeries();
const discoveredMovies = await getDiscoveredMovies();
```

## 🛠️ Configuración

### Límite de contenido:
```typescript
// En service.ts
const DISCOVER_LIMIT = 7;
```

### Threshold de rating alto:
```typescript
// En DiscoverCard.tsx
const HIGH_RATING_THRESHOLD = 7.5;
```

### Responsive breakpoint:
```typescript
// En DiscoverGrid.tsx
const isMobile = useMediaQuery('(max-width: 768px)');
```

## 🎯 Características Principales

- ✅ **Selección curada**: Máximo 7 elementos por tipo
- ✅ **Selector de tipo**: Toggle entre series y películas
- ✅ **Grid responsivo**: Layout 2-3-2 (desktop) y 2 columnas (móvil)
- ✅ **Tarjetas interactivas**: Hover con información y acciones
- ✅ **Gradientes inmersivos**: Efectos visuales de fondo
- ✅ **Badge de calidad**: Indicador para contenido mejor valorado
- ✅ **Navegación integrada**: Enlaces a categorías y detalles
- ✅ **Estado global**: Persistencia entre cambios
- ✅ **Optimización de imágenes**: Lazy loading y prioridades

## 🚀 Optimizaciones

### Rendimiento
- **Lazy loading**: Imágenes bajo demanda
- **Priority loading**: Primeras 4 tarjetas con prioridad
- **Image optimization**: Next.js con calidad 90%
- **Prefetch**: Pre-carga de rutas en hover

### UX/UI
- **Skeleton loading**: Estados de carga fluidos
- **Hover feedback**: Información al interactuar
- **Responsive design**: Adaptación completa
- **Animaciones suaves**: Transiciones de 300ms

## 📝 Notas Importantes

- **Límite fijo**: Solo 7 elementos por tipo de media
- **Dependencia de trending**: Reutiliza tipos de la feature trending
- **Mobile adjustment**: Grid móvil usa 6 elementos si total es impar
- **Image fallback**: Usa backdrop si no hay poster (y viceversa)
- **Rating threshold**: Badge "TOP PIXELA" para rating >= 7.5
- **Error resilience**: Service retorna array vacío en caso de error

## 🔧 Extensibilidad

### Para cambiar el límite de contenido:
1. Actualizar `DISCOVER_LIMIT` en `service.ts`
2. Ajustar layout en `DiscoverGrid.tsx` si es necesario
3. Revisar responsive behavior para números pares/impares

### Para añadir nuevos tipos de media:
1. Extender `MediaType` en `type.ts`
2. Actualizar selector en `DiscoverSelector.tsx`
3. Añadir lógica en store y servicios

### Para personalizar el diseño:
1. Ajustar gradientes en `DiscoverContent.tsx`
2. Modificar layout grid en `DiscoverGrid.tsx`
3. Customizar estilos de tarjetas en `DiscoverCard.tsx` 