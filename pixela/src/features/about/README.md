# About Feature 📖

## 📋 Descripción

La feature **About** es una sección informativa que presenta la identidad, misión y equipo de Pixela. Es una página estática que comunica los valores de la plataforma y presenta a los desarrolladores detrás del proyecto.

## 🎯 Propósito

- **Presentar la marca**: Mostrar quiénes somos y qué hacemos
- **Comunicar la misión**: Explicar el propósito de Pixela como plataforma
- **Presentar el equipo**: Mostrar los desarrolladores con información personal
- **Generar confianza**: Humanizar la plataforma con información del equipo

## 🏗️ Estructura de Archivos

```
src/features/about/
├── README.md                    # Este archivo
├── index.ts                     # Exportaciones principales
├── types/                       # Tipos y interfaces
│   ├── components.ts           # Interfaces de componentes
│   └── index.ts               # Exportaciones centralizadas
├── components/
│   └── AboutSection.tsx         # Componente principal
└── data/
    └── aboutData.tsx            # Datos estáticos
```

## 🧩 Componentes

### AboutSection
**Ubicación**: `components/AboutSection.tsx`

Componente principal que renderiza toda la sección "Acerca de". Incluye:

- **Título y descripción general**: Presentación de la plataforma
- **Tarjetas de características**: Pasión, Comunidad (próximamente), Misión
- **Sección del equipo**: Información detallada de los desarrolladores

#### Subcomponentes:

##### FeatureCard
- Renderiza una tarjeta individual de característica
- Muestra ícono, título, descripción
- Soporte para etiqueta "Próximamente"

##### TeamMemberCard
- Renderiza información de un miembro del equipo
- Incluye foto, nombre, rol, enlaces a LinkedIn
- Información personal (series/películas favoritas, cita)

## 📊 Datos y Configuración

### Interfaces TypeScript
**Ubicación**: `types/components.ts`

```typescript
interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
  favoriteSeries: string;
  favoriteMovie: string;
  quote: string;
}

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  isComingSoon?: boolean;
}
```

### Datos Estáticos
**Ubicación**: `data/aboutData.tsx`

#### TEAM_MEMBERS
- Array con información de los desarrolladores
- Incluye datos personales y profesionales
- Enlaces a perfiles de LinkedIn

#### FEATURE_CARDS
- Array con las características principales de Pixela
- Iconos usando React Icons (FaFilm, FaUsers, FaHeart)
- Una característica marcada como "próximamente"

## 🎨 Estilos y Diseño

### Sistema de Diseño
- **Colores**: Tema oscuro con acentos en `pixela-accent`
- **Tipografía**: Font Outfit para títulos
- **Efectos**: Animaciones flotantes, hover effects, transiciones suaves
- **Responsive**: Diseño adaptativo para móviles, tablets y desktop

### Clases CSS Principales
- `bg-pixela-dark`: Fondo principal oscuro
- `text-pixela-accent`: Color de acento para textos importantes
- `animate-float-smooth`: Animación flotante personalizada

## 📱 Responsividad

- **Mobile**: Layout vertical, tipografía reducida, cards apiladas
- **Tablet (iPad)**: Ajustes intermedios, grids adaptados
- **Desktop**: Layout completo, efectos hover avanzados

## 🔗 Dependencias

### Externas
- `next/image`: Optimización de imágenes
- `react-icons/fa`: Iconos Font Awesome

### Internas
- `@/features/about/types`: Interfaces y tipos
- `@/features/about/data`: Datos estáticos

## 📋 Uso

```tsx
import { AboutSection } from '@/features/about';

// En una página o layout
<AboutSection />
```

## 🛠️ Mantenimiento

### Para actualizar información del equipo:
1. Editar `data/aboutData.tsx`
2. Actualizar el array `TEAM_MEMBERS`
3. Añadir/actualizar imágenes en `/public/about/img/`

### Para modificar características:
1. Editar el array `FEATURE_CARDS` en `data/aboutData.tsx`
2. Añadir/quitar tarjetas según necesidad

### Para modificar tipos:
1. Editar las interfaces en `types/components.ts`
2. Actualizar las importaciones en los archivos que las usan

## 🎯 Características Principales

- ✅ **Información del equipo**: Perfiles completos de desarrolladores
- ✅ **Misión y valores**: Comunicación clara de propósito
- ✅ **Diseño atractivo**: UI moderna con animaciones
- ✅ **Completamente responsive**: Funciona en todos los dispositivos
- ⏳ **Comunidad**: Funcionalidad próximamente

## 📝 Notas Importantes

- Las imágenes del equipo deben estar en `/public/about/img/`
- Los enlaces de LinkedIn deben actualizarse con perfiles reales
- La característica "Comunidad" está marcada como próximamente
- Todos los textos están en español para la audiencia objetivo
