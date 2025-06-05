# Metadata

Este directorio contiene los metadatos utilizados en toda la aplicación. Los metadatos son información descriptiva sobre las páginas y componentes que se utilizan para SEO y compartir en redes sociales.

## Estructura

```
metadata/
├── pages/
│   ├── app.ts         # Metadata general de la aplicación
│   ├── series.ts      # Metadata para series y detalles de series
│   ├── movies.ts      # Metadata para películas y detalles de películas
│   ├── categories.ts  # Metadata para categorías y detalles de categorías
│   └── not-found.ts   # Metadata para la página 404
└── index.ts           # Exportaciones centralizadas
```

## Tipos de Metadata

### Metadata Estática
Metadata que no cambia y se aplica a páginas específicas:
```typescript
export const seriesMetadata: Metadata = {
  title: 'Series | Pixela',
  description: 'Descubre las mejores series...',
  openGraph: {
    title: 'Series | Pixela',
    description: 'Descubre las mejores series...',
    type: 'website',
  }
};
```

### Metadata Dinámica
Metadata que se genera basada en datos específicos:
```typescript
export const seriesDetailsMetadata = (title: string): Metadata => ({
  title: `${title} | Pixela`,
  description: `Explora ${title}...`,
  openGraph: {
    title: `${title} | Pixela`,
    description: `Explora ${title}...`,
    type: 'article',
  }
});
```

## Uso

### En páginas estáticas:
```typescript
import { seriesMetadata } from "@/metadata";

export const metadata = seriesMetadata;
```

### En páginas dinámicas:
```typescript
import { seriesDetailsMetadata } from "@/metadata";

export async function generateMetadata({ params }): Promise<Metadata> {
  const title = await getTitle(params.id);
  return seriesDetailsMetadata(title);
}
```

## Beneficios

- **SEO Optimizado**: Títulos y descripciones optimizados para motores de búsqueda
- **Compartir en Redes**: Metadata OpenGraph para compartir en redes sociales
- **Consistencia**: Formato uniforme en toda la aplicación
- **Mantenibilidad**: Centralización de metadata para fácil actualización
- **Tipado**: Uso de tipos TypeScript para prevenir errores

## Características

- **Títulos Dinámicos**: Inclusión del nombre de la plataforma en todos los títulos
- **Descripciones Detalladas**: Información relevante para cada sección
- **OpenGraph**: Soporte para compartir en redes sociales
- **Robots**: Control sobre indexación en motores de búsqueda
- **Tipos de Contenido**: Diferenciación entre páginas web y artículos

## Ejemplos de Uso

### Página Principal de Series
```typescript
// Muestra en el navegador: "Series | Pixela"
// En Google: "Descubre las mejores series de televisión..."
export const metadata = seriesMetadata;
```

### Página de Serie Específica
```typescript
// Muestra en el navegador: "Breaking Bad | Pixela"
// En Google: "Explora Breaking Bad. Temporadas, episodios..."
export const metadata = seriesDetailsMetadata("Breaking Bad");
``` 