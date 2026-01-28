# 📡 API Layer - Sistema de Comunicación de Pixela

Este directorio contiene toda la lógica de comunicación con las APIs externas e internas del proyecto Pixela. La arquitectura está diseñada para separar claramente el contenido público del autenticado, optimizando tanto el rendimiento como la seguridad.

## 🏗️ Arquitectura General

### 🔄 Patrones de Comunicación

El sistema utiliza **dos patrones diferentes** según el tipo de contenido:

#### 🌐 **Contenido Público** (Películas, Series, Categorías)
- **Patrón**: `fetch` directo con `DEFAULT_FETCH_OPTIONS`
- **APIs**: TMDB (The Movie Database)
- **Características**:
  - Sin protección CSRF (no requerida)
  - Optimizado para rendimiento
  - Cache configurable
  - Endpoints: `API_BASE_URL`

#### 🔐 **Contenido Autenticado** (Auth, Favoritos, Reviews, Usuarios)
- **Patrón**: `fetchFromAPI` con protección CSRF
- **APIs**: Backend Laravel con Sanctum
- **Características**:
  - Protección CSRF automática
  - Manejo de cookies de sesión
  - Headers de autenticación
  - Endpoints: `API_URL`

---

## 📁 Estructura de Directorios

```
api/
├── 🎬 peliculas/          # Gestión de películas (TMDB)
├── 📺 series/             # Gestión de series (TMDB)
├── 🔐 auth/               # Autenticación y autorización
├── 👤 users/              # Gestión de usuarios
├── ❤️ favorites/          # Sistema de favoritos
├── ⭐ reviews/            # Sistema de reseñas
├── 🏷️ categories/         # Categorías de contenido
└── 🔧 shared/             # Utilidades compartidas
```

---

## 🎬 Películas (`/peliculas`)

**Funcionalidades principales:**
- ✅ Búsqueda y listado de películas
- ✅ Detalles completos de películas
- ✅ Cast y crew
- ✅ Videos y trailers
- ✅ Galería de imágenes
- ✅ Proveedores de streaming
- ✅ Trending y populares
- ✅ Descubrimiento por filtros

### 📂 Estructura
```
peliculas/
├── peliculas.ts           # Funciones principales de la API
├── mapper/
│   └── mapPelicula.ts     # Transformadores de datos
└── types/
    └── index.ts           # Tipos TypeScript
```

### 🔧 Funciones Principales
- `getPeliculaById(id)` - Obtener película por ID
- `getTrendingPeliculas()` - Películas trending
- `getPopularPeliculas()` - Películas populares
- `getUpcomingPeliculas()` - Próximos estrenos
- `discoverPeliculas(filters)` - Descubrimiento con filtros
- `getPeliculaCast(id)` - Reparto de la película
- `getPeliculaVideos(id)` - Videos y trailers
- `getPeliculaImages(id)` - Galería de imágenes
- `getPeliculaProviders(id)` - Proveedores de streaming

---

## 📺 Series (`/series`)

**Funcionalidades principales:**
- ✅ Búsqueda y listado de series
- ✅ Detalles completos de series
- ✅ Cast y crew
- ✅ Videos y trailers
- ✅ Galería de imágenes
- ✅ Proveedores de streaming
- ✅ Trending y populares
- ✅ Top rated y airing today

### 📂 Estructura
```
series/
├── series.ts              # Funciones principales de la API
├── mapper/
│   └── mapSerie.ts        # Transformadores de datos
└── types/
    └── index.ts           # Tipos TypeScript
```

### 🔧 Funciones Principales
- `getSerieById(id)` - Obtener serie por ID
- `getTrendingSeries()` - Series trending
- `getPopularSeries()` - Series populares
- `getTopRatedSeries()` - Series mejor valoradas
- `getAiringTodaySeries()` - Series al aire hoy
- `discoverSeries(filters)` - Descubrimiento con filtros
- `getSerieCast(id)` - Reparto de la serie
- `getSerieVideos(id)` - Videos y trailers
- `getSerieImages(id)` - Galería de imágenes
- `getSerieProviders(id)` - Proveedores de streaming

---

## 🔐 Autenticación (`/auth`)

**Funcionalidades principales:**
- ✅ Login/Logout
- ✅ Registro de usuarios
- ✅ Protección CSRF
- ✅ Manejo de sesiones
- ✅ Validación de tokens

### 📂 Estructura
```
auth/
├── auth.ts                # Funciones de autenticación
└── types/
    └── index.ts           # Tipos de autenticación
```

### 🔧 Funciones Principales
- `login(credentials)` - Iniciar sesión
- `logout()` - Cerrar sesión
- `register(userData)` - Registrar usuario
- `getCurrentUser()` - Obtener usuario actual

---

## 👤 Usuarios (`/users`)

**Funcionalidades principales:**
- ✅ Gestión de perfiles
- ✅ CRUD de usuarios
- ✅ Actualización de datos

### 📂 Estructura
```
users/
├── users.ts               # Funciones de gestión de usuarios
└── types/
    └── index.ts           # Tipos de usuarios
```

### 🔧 Funciones Principales
- `getUsers()` - Listar usuarios
- `createUser(userData)` - Crear usuario
- `updateUser(id, userData)` - Actualizar usuario
- `deleteUser(id)` - Eliminar usuario

---

## ❤️ Favoritos (`/favorites`)

**Funcionalidades principales:**
- ✅ Agregar/quitar favoritos
- ✅ Listar favoritos del usuario
- ✅ Detalles de favoritos

### 📂 Estructura
```
favorites/
├── favorites.ts           # Funciones de favoritos
└── types/
    └── index.ts           # Tipos de favoritos
```

### 🔧 Funciones Principales
- `addFavorite(mediaData)` - Agregar a favoritos
- `getFavorites()` - Obtener favoritos del usuario
- `removeFavorite(id)` - Quitar de favoritos
- `getFavoriteDetails()` - Detalles de favoritos

---

## ⭐ Reseñas (`/reviews`)

**Funcionalidades principales:**
- ✅ Crear reseñas
- ✅ Listar reseñas
- ✅ Actualizar/eliminar reseñas

### 📂 Estructura
```
reviews/
├── reviews.ts             # Funciones de reseñas
└── types/
    └── index.ts           # Tipos de reseñas
```

### 🔧 Funciones Principales
- `getReviews()` - Obtener reseñas
- `createReview(reviewData)` - Crear reseña
- `updateReview(id, reviewData)` - Actualizar reseña
- `deleteReview(id)` - Eliminar reseña

---

## 🏷️ Categorías (`/categories`)

**Funcionalidades principales:**
- ✅ Listado de categorías/géneros
- ✅ Filtrado por tipo de medio
- ✅ Categorías específicas de películas/series

### 📂 Estructura
```
categories/
├── categories.ts          # Funciones de categorías
└── types/
    └── index.ts           # Tipos de categorías
```

### 🔧 Funciones Principales
- `getAllCategories()` - Obtener todas las categorías
- `getCategoriesForMediaType(type)` - Categorías filtradas por tipo

---

## 🔧 Utilidades Compartidas (`/shared`)

### 📂 Estructura
```
shared/
├── apiEndpoints.ts        # Configuración de endpoints
└── apiHelpers.ts          # Funciones auxiliares
```

### 🌐 apiEndpoints.ts
**Configuración centralizada de URLs:**
- `API_BASE_URL` - URL para contenido público (TMDB)
- `API_URL` - URL para contenido autenticado (Laravel)
- `BACKEND_URL` - URL del backend para CSRF
- `API_ENDPOINTS` - Objeto con todos los endpoints organizados

### 🛠️ apiHelpers.ts
**Funciones auxiliares:**
- `fetchFromAPI<T>()` - Helper con protección CSRF
- `DEFAULT_FETCH_OPTIONS` - Opciones por defecto para fetch
- `initCsrf()` - Inicialización de tokens CSRF

---

## 📄 Inventario de Archivos - Responsabilidades Específicas

### 🎬 **Películas (`/peliculas`)**
| Archivo | Responsabilidad |
|---------|----------------|
| `peliculas.ts` | **Gestiona TODAS las llamadas a la API de películas** - Trending, populares, detalles, cast, videos, imágenes, providers |
| `mapper/mapPelicula.ts` | **Transforma datos de TMDB a formato interno** - URLs de imágenes, normalización de campos, validación |
| `types/index.ts` | **Define interfaces TypeScript para películas** - Pelicula, Cast, Videos, Images, Providers, respuestas API |

### 📺 **Series (`/series`)**
| Archivo | Responsabilidad |
|---------|----------------|
| `series.ts` | **Gestiona TODAS las llamadas a la API de series** - Trending, populares, top rated, airing today, detalles, cast |
| `mapper/mapSerie.ts` | **Transforma datos de TMDB a formato interno** - URLs de imágenes, normalización de campos, validación |
| `types/index.ts` | **Define interfaces TypeScript para series** - Serie, Cast, Videos, Images, Providers, respuestas API |

### 🔐 **Autenticación (`/auth`)**
| Archivo | Responsabilidad |
|---------|----------------|
| `auth.ts` | **Maneja autenticación con Laravel Sanctum** - Login, logout, registro, obtener usuario actual |
| `types/index.ts` | **Define interfaces de autenticación** - LoginRequest, RegisterRequest, AuthResponse, User |

### 👤 **Usuarios (`/users`)**
| Archivo | Responsabilidad |
|---------|----------------|
| `users.ts` | **CRUD completo de usuarios** - Crear, leer, actualizar, eliminar perfiles de usuario |
| `types/index.ts` | **Define interfaces de usuario** - User, CreateUserRequest, UpdateUserRequest |

### ❤️ **Favoritos (`/favorites`)**
| Archivo | Responsabilidad |
|---------|----------------|
| `favorites.ts` | **Gestión de favoritos del usuario** - Agregar, quitar, listar favoritos de películas/series |
| `types/index.ts` | **Define interfaces de favoritos** - FavoriteItem, AddFavoriteRequest, FavoriteResponse |

### ⭐ **Reseñas (`/reviews`)**
| Archivo | Responsabilidad |
|---------|----------------|
| `reviews.ts` | **CRUD de reseñas de usuario** - Crear, leer, actualizar, eliminar reseñas de contenido |
| `types/index.ts` | **Define interfaces de reseñas** - Review, CreateReviewRequest, UpdateReviewRequest |

### 🏷️ **Categorías (`/categories`)**
| Archivo | Responsabilidad |
|---------|----------------|
| `categories.ts` | **Gestión de géneros/categorías** - Obtener todas las categorías, filtrar por tipo de medio |
| `types/index.ts` | **Define interfaces de categorías** - Category, CategoriesApiResponse |

### 🔧 **Compartido (`/shared`)**
| Archivo | Responsabilidad |
|---------|----------------|
| `apiEndpoints.ts` | **Configuración centralizada de URLs** - Define TODAS las URLs de endpoints para cada módulo |
| `apiHelpers.ts` | **Funciones auxiliares de comunicación** - fetchFromAPI con CSRF, opciones por defecto, manejo de errores |

---

## 🎯 Mappers y Transformadores

### 🔄 Propósito de los Mappers
Los mappers (`mapPelicula.ts`, `mapSerie.ts`) son **transformadores de datos** que:

1. **🔧 Normalizan respuestas inconsistentes** de diferentes APIs
2. **🏷️ Convierten nombres de campos** a formato consistente
3. **🖼️ Transforman URLs de imágenes** con configuraciones apropiadas
4. **📊 Proporcionan estructura de datos consistente** para la aplicación
5. **🛡️ Validan y sanitizan datos** antes de su uso en componentes

### 🔧 Funciones Principales de Mappers
- `formatImageUrl(path)` - Formatear URLs de imágenes
- `mapToInternalFormat(data)` - Convertir a formato interno
- `validateAndSanitize(data)` - Validar y sanitizar datos

---

## 🚀 Optimizaciones de Rendimiento

### ⚡ Llamadas Paralelas
- Uso de `Promise.allSettled()` para operaciones simultáneas
- Reducción de tiempo de carga mediante paralelización

### 🗂️ Manejo de Errores Unificado
- Helper `fetchWithErrorHandling` para consistencia
- Logging estructurado para debugging
- Fallbacks graceful ante errores

### 💾 Gestión de Cache
- `cache: 'no-store'` para contenido dinámico
- Configuración flexible para diferentes tipos de contenido

---

## 🔒 Seguridad

### 🛡️ Protección CSRF
- Inicialización automática de tokens CSRF
- Headers de seguridad apropiados
- Validación de tokens en cada petición autenticada

### 🍪 Gestión de Cookies
- Cookies HTTPOnly para sesiones
- Configuración segura de SameSite
- Manejo automático de credenciales

### 🔐 Principio de Menor Privilegio
- Separación clara entre contenido público y privado
- Autenticación solo donde es necesaria
- Endpoints específicos para cada tipo de operación

---

## 🛠️ Tipos TypeScript

### 📝 Organización de Tipos
Cada módulo tiene su carpeta `types/` con interfaces bien definidas:
- **Consistencia**: Tipos coherentes en toda la aplicación
- **Reutilización**: Interfaces compartibles entre componentes
- **Validación**: Type checking en tiempo de compilación
- **Documentación**: Interfaces auto-documentadas

### 🏷️ Ejemplos de Tipos Principales
- `Pelicula`, `Serie` - Entidades principales
- `ApiResponse<T>` - Respuestas de API tipadas
- `Category` - Categorías/géneros
- `User`, `Review`, `Favorite` - Entidades de usuario

---

## 📚 Uso y Ejemplos

### 🎬 Ejemplo: Obtener Película
```typescript
import { getPeliculaById } from '@/api/peliculas/peliculas';

const pelicula = await getPeliculaById('12345');
```

### 🔐 Ejemplo: Autenticación
```typescript
import { login } from '@/api/auth/auth';

const user = await login({ email, password });
```

### ❤️ Ejemplo: Gestión de Favoritos
```typescript
import { addFavorite } from '@/api/favorites/favorites';

await addFavorite({ mediaId: '123', mediaType: 'movie' });
```

---

## ⚠️ Consideraciones Importantes

### 🔧 Variables de Entorno
- `NEXT_PUBLIC_API_INTERNAL_URL` - URL interna de la API
- `NEXT_PUBLIC_API_URL` - URL pública de la API
- `NEXT_PUBLIC_BACKEND_URL` - URL del backend

### 🚨 Manejo de Errores
- Todos los errores se propagan correctamente
- Logging detallado para debugging
- Respuestas de error estructuradas

### 📈 Escalabilidad
- Arquitectura modular y extensible
- Separación clara de responsabilidades
- Fácil adición de nuevos endpoints y funcionalidades

---

## 🤝 Contribución

Al agregar nuevas funcionalidades:
1. **📁 Crear módulo apropiado** en la carpeta correspondiente
2. **🏷️ Definir tipos TypeScript** en carpeta `types/`
3. **🔄 Usar patrón apropiado** (público vs autenticado)
4. **📝 Documentar funciones** con JSDoc
5. **🧪 Manejar errores** consistentemente
6. **✅ Actualizar este README** si es necesario

---

**🎯 Objetivo**: Proporcionar una capa de abstracción robusta, segura y eficiente para todas las comunicaciones de la aplicación Pixela. 