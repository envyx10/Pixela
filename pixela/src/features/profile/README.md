# Profile Feature 👤

## 📋 Descripción

La feature **Profile** es el sistema de gestión de perfiles de usuario en Pixela. Proporciona una interfaz completa para que los usuarios visualicen y editen su información personal, gestionen sus reseñas, favoritos y (para administradores) administren otros usuarios. Es el hub personal de cada usuario en la plataforma.

## 🎯 Propósito

- **Gestión personal**: Visualización y edición del perfil de usuario
- **Avatar dinámico**: Subida y edición de foto de perfil con optimización
- **Reseñas centralizadas**: Listado y edición de todas las reseñas del usuario
- **Favoritos organizados**: Gestión de contenido marcado como favorito
- **Administración de usuarios**: Panel de control para usuarios administradores
- **Navegación por tabs**: Sistema de navegación intuitivo y responsive

## 🏗️ Estructura de Archivos

```
src/features/profile/
├── README.md                    # Este archivo
├── pages/
│   └── ProfilePage.tsx          # Página principal de perfil
├── types/
│   └── profileTypes.ts          # Tipos específicos de perfil
└── components/
    ├── index.ts                 # Exportaciones principales
    ├── layout/                  # Componentes de layout
    │   ├── ProfileInfo.tsx      # Información del usuario
    │   ├── ContentPanel.tsx     # Panel contenedor de contenido
    │   ├── ProfileLoader.tsx    # Loader del perfil
    │   ├── ProfileSkeleton.tsx  # Skeleton de carga
    │   ├── ProfileReviews.tsx   # Gestión de reseñas
    │   ├── ProfileFavorites.tsx # Gestión de favoritos
    │   └── ProfileUsers.tsx     # Gestión de usuarios (admin)
    ├── tabs/                    # Sistema de navegación
    │   ├── ProfileTabs.tsx      # Pestañas principales
    │   └── TabNavigationButton.tsx # Botón de navegación
    ├── form/                    # Formularios
    │   ├── UpdateProfileForm.tsx # Formulario de edición
    │   ├── UserCreateModal.tsx  # Modal de creación de usuario
    │   ├── InputField.tsx       # Campo de entrada
    │   ├── FormInput.tsx        # Input con validación
    │   └── ProfileError.tsx     # Manejo de errores
    ├── avatar/                  # Sistema de avatares
    │   └── UserAvatar.tsx       # Componente de avatar
    └── card/                    # Componentes de tarjeta
        └── UserProfileCard.tsx  # Tarjeta de perfil
```

## 🧩 Componentes Principales

### ProfilePage
**Ubicación**: `pages/ProfilePage.tsx`

Componente principal que orquesta toda la experiencia de perfil:

- **Sistema de tabs**: Navegación entre Profile, Reviews, Favorites, Users
- **Estados dinámicos**: Modo edición, loading, redirecting
- **Gestión de usuarios**: Funcionalidades administrativas
- **Scroll effects**: Efectos visuales en avatar al hacer scroll

#### Estados principales:
- `activeTab`: Tab actualmente activo ('profile' | 'reviews' | 'favorites' | 'users')
- `isEditing`: Modo de edición del perfil
- `scrolled`: Estado de scroll para efectos visuales
- `showCreateModal`: Visibilidad del modal de creación de usuario

### ProfileTabs
**Ubicación**: `components/tabs/ProfileTabs.tsx`

Sistema de navegación por pestañas:

- **Tabs principales**: Perfil, Reseñas, Favoritos
- **Tab condicional**: Usuarios solo para administradores
- **Iconografía**: Iconos específicos para cada sección
- **Responsive**: Adaptación a dispositivos móviles

#### Tabs incluidos:
- **Profile** (FiSettings): Información y edición del usuario
- **Reviews** (FaRegComments): Gestión de reseñas del usuario
- **Favorites** (FaRegBookmark): Lista de contenido favorito
- **Users** (FiUsers): Panel administrativo de usuarios

### UpdateProfileForm
**Ubicación**: `components/form/UpdateProfileForm.tsx`

Formulario avanzado de edición de perfil:

- **Upload de avatar**: Drag & drop, validación de tamaño y formato
- **Optimización de imagen**: Redimensionamiento automático a 300px
- **Validación completa**: Email, contraseña, formato de imagen
- **Estados visuales**: Loading, error, preview de imagen

#### Funcionalidades:
- Subida de imagen con validación (max 2MB)
- Compresión automática (quality 0.7)
- Preview en tiempo real
- Validación de email con regex
- Cambio de contraseña con redirect automático

### ProfileReviews
**Ubicación**: `components/layout/ProfileReviews.tsx`

Gestión completa de reseñas del usuario:

- **CRUD completo**: Ver, editar, eliminar reseñas
- **Sistema de estrellas**: Valoración con medias estrellas (1-10)
- **Edición inline**: Modificación directa sin modales
- **Navegación a media**: Enlaces directos al contenido reseñado

#### Características:
- StarEdit component para puntuación visual
- Textarea autoajustable para edición
- Estados de loading por acción
- Enlaces a páginas de media con poster

### ProfileFavorites
**Ubicación**: `components/layout/ProfileFavorites.tsx`

Lista y gestión de contenido favorito:

- **Vista en lista**: Poster, título, año y acciones
- **Eliminación directa**: Remove desde la lista
- **Navegación a detalles**: Enlaces a páginas de media
- **Estados visuales**: Loading, empty, error

### ProfileUsers (Admin)
**Ubicación**: `components/layout/ProfileUsers.tsx`

Panel administrativo para gestión de usuarios:

- **Lista completa**: Todos los usuarios del sistema
- **Edición inline**: Nombre, email, rol de administrador
- **Eliminación**: Remove de usuarios del sistema
- **Creación**: Modal para nuevos usuarios
- **Avatares**: Visualización de fotos de perfil

#### Funcionalidades administrativas:
- Toggle de permisos de administrador
- Edición de información básica
- Eliminación con confirmación
- Refresh automático tras cambios

### UserAvatar
**Ubicación**: `components/avatar/UserAvatar.tsx`

Componente de avatar con múltiples tamaños:

- **Tres tamaños**: sm (32px), md (64px), lg (120px)
- **Fallback inteligente**: Inicial del nombre si no hay imagen
- **Optimización**: Next.js Image con lazy loading
- **Responsive**: Adaptación automática

## 📊 Tipos y Interfaces

### ProfileFormData
**Ubicación**: `types/profileTypes.ts`

```typescript
interface ProfileFormData {
  name: string;
  email: string;
  password?: string;
  created_at: string;
  is_admin: boolean;
  photo_url?: string;
}
```

### UpdateProfileFormProps
```typescript
interface UpdateProfileFormProps {
  initialData: {
    name: string;
    email: string;
    password?: string;
    photo_url?: string;
  };
  onCancel: () => void;
  onSubmit: (data: ProfileFormData) => void;
}
```

### TabType
```typescript
type TabType = 'profile' | 'reviews' | 'favorites' | 'users';
```

### AvatarSize
```typescript
type AvatarSize = 'sm' | 'md' | 'lg';
```

## 🌐 APIs y Servicios

### Endpoints utilizados:
- `authAPI.getUserProfile()`: Obtener datos del usuario actual
- `usersAPI.update()`: Actualizar información del usuario
- `usersAPI.list()`: Listar todos los usuarios (admin)
- `usersAPI.delete()`: Eliminar usuario (admin)
- `reviewsAPI.list()`: Obtener reseñas del usuario
- `reviewsAPI.update()`: Actualizar reseña existente
- `reviewsAPI.delete()`: Eliminar reseña
- `favoritesAPI.listWithDetails()`: Obtener favoritos con metadatos
- `favoritesAPI.deleteFavorite()`: Eliminar favorito

## 🎨 Sistema de Diseño

### Layout y Spacing
- **Container**: profile-page con padding responsive
- **Grid system**: 2 columnas en desktop (avatar + info)
- **Tab navigation**: Barra horizontal con indicadores activos
- **Card spacing**: gap-4 entre elementos, padding interno consistente

### Responsive Breakpoints
- **Mobile**: Stack vertical, tabs simplificados
- **Tablet**: Layout intermedio con 2 columnas
- **Desktop**: Layout completo con sidebar de avatar

### Colores y Estados
- **Primary**: pixela-accent (#ec1b69) para acciones importantes
- **Background**: pixela-dark-opacity para cards
- **Text**: text-white principal, text-gray-400 secundario
- **Status colors**: green para success, red para error, yellow para warning

### Efectos Visuales
- **Scroll effects**: Avatar con clase 'scrolled' al hacer scroll
- **Hover states**: Scale en posters, color en botones
- **Loading states**: Spinners con animación
- **Transitions**: duration-300 para interacciones

## 🔗 Dependencias

### Externas
- `react-hook-form`: Gestión de formularios
- `next/image`: Optimización de imágenes
- `react-icons`: Iconografía (Fi, Fa families)
- `clsx`: Clases CSS condicionales

### Internas
- `@/api/auth/auth`: API de autenticación
- `@/api/users/users`: API de usuarios
- `@/api/reviews/reviews`: API de reseñas
- `@/api/favorites/favorites`: API de favoritos
- `@/styles/profile/main.scss`: Estilos específicos

## 📱 Uso

```tsx
import { ProfilePage } from '@/features/profile';

// En una ruta protegida
export default function ProfileRoute() {
  return <ProfilePage />;
}
```

### Configuración de permisos:
```tsx
// Solo usuarios autenticados
const user = await getUserProfile();
if (!user) redirect('/login');

// Tab de usuarios solo para admin
{isAdmin && <TabNavigationButton label="Usuarios" />}
```

## 🛠️ Configuración

### Validaciones de imagen:
```typescript
const IMAGE_CONFIG = {
  maxSize: 2 * 1024 * 1024,  // 2MB
  maxDimension: 300,         // 300px
  quality: 0.7,              // 70% calidad
  format: 'image/jpeg'       // JPEG output
};
```

### Breakpoints para avatar:
```typescript
const AVATAR_SIZES = {
  sm: '32px',   // Lista de usuarios
  md: '64px',   // Perfil normal
  lg: '120px'   // Perfil principal
};
```

### Timeouts y redirects:
```typescript
const REDIRECT_DELAY = 1200; // 1.2s tras cambio de contraseña
```

## 🎯 Características Principales

- ✅ **Perfil completo**: Visualización y edición de información personal
- ✅ **Avatar dinámico**: Upload, crop y optimización automática
- ✅ **Sistema de tabs**: Navegación intuitiva entre secciones
- ✅ **Gestión de reseñas**: CRUD completo con edición inline
- ✅ **Favoritos organizados**: Lista con navegación directa
- ✅ **Panel de administración**: Gestión completa de usuarios
- ✅ **Modal de creación**: Registro de nuevos usuarios (admin)
- ✅ **Scroll effects**: Efectos visuales dinámicos
- ✅ **Estados de carga**: Loading, error y empty states
- ✅ **Responsive design**: Adaptación completa a dispositivos

## 🚀 Optimizaciones

### Rendimiento
- **Lazy loading**: Imágenes de avatar y posters bajo demanda
- **Component memoization**: Evitar re-renders innecesarios
- **API batching**: Requests optimizados por sección
- **Image compression**: Reducción automática de tamaño

### UX/UI
- **Feedback inmediato**: Estados de loading por acción
- **Edición inline**: Sin modales para acciones rápidas
- **Navigation preservation**: Mantener tab activo entre sesiones
- **Error boundaries**: Manejo graceful de errores

### Seguridad
- **Validación client/server**: Doble validación de datos
- **Permission checks**: Verificación de permisos administrativos
- **Image validation**: Verificación de formato y tamaño
- **XSS protection**: Sanitización de inputs

## 📝 Notas Importantes

- **Autenticación requerida**: Toda la feature requiere usuario logueado
- **Permisos granulares**: Tab de usuarios solo para administradores
- **Redirect automático**: Cambio de contraseña requiere re-login
- **Optimización de imágenes**: Compresión automática a 300px/70% quality
- **Estados persistentes**: Tab activo se mantiene en navegación
- **Error handling**: Fallbacks para todos los estados de error

## 🔧 Extensibilidad

### Para añadir nuevos tabs:
1. Extender `TabType` en tipos
2. Añadir `TabNavigationButton` en `ProfileTabs`
3. Crear componente de contenido
4. Integrar en `ProfilePage` con conditional rendering

### Para modificar validaciones:
1. Actualizar regex en `UpdateProfileForm`
2. Añadir mensajes de error apropiados
3. Actualizar tipos si es necesario

### Para añadir campos de perfil:
1. Extender `ProfileFormData` interface
2. Añadir campos en `UpdateProfileForm`
3. Actualizar `ProfileInfo` display
4. Modificar API endpoints según necesidad

### Para personalizar avatares:
1. Añadir nuevos tamaños en `AvatarSize` type
2. Crear estilos CSS correspondientes
3. Actualizar `STYLES.sizes` mapping
4. Añadir casos de uso en componentes 