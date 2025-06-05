# Hooks Personalizados

Este directorio contiene hooks personalizados que encapsulan lógica reutilizable en nuestra aplicación Pixela.

## useMediaQuery

El hook `useMediaQuery` es una utilidad que permite detectar y reaccionar a cambios en las media queries de CSS, facilitando la implementación de diseños responsivos.

### Estructura de Archivos

```
hooks/
├── README.md
└── useMediaQuery.ts  # Hook para detectar media queries
```

### Uso

```typescript
import { useMediaQuery } from '@/hooks/useMediaQuery';

// En tu componente
const isMobile = useMediaQuery('(max-width: 768px)');
const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
const isDesktop = useMediaQuery('(min-width: 1025px)');

// Ejemplo de uso en un componente
function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div>
      {isMobile ? (
        <MobileLayout />
      ) : (
        <DesktopLayout />
      )}
    </div>
  );
}
```

### Características

- **Tipado Seguro**: Implementado con TypeScript
- **SSR Compatible**: Manejo seguro en entorno de servidor
- **Actualización Automática**: Reacciona a cambios en el tamaño de la ventana
- **Limpieza Automática**: Elimina event listeners al desmontar
- **Rendimiento Optimizado**: Solo se actualiza cuando cambia la media query

### Parámetros

- `query` (string): La media query a evaluar (ej: '(max-width: 768px)')

### Retorno

- `boolean`: `true` si la media query coincide, `false` en caso contrario

### Ejemplos Comunes

```typescript
// Detectar dispositivos móviles
const isMobile = useMediaQuery('(max-width: 768px)');

// Detectar orientación
const isPortrait = useMediaQuery('(orientation: portrait)');

// Detectar modo oscuro
const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

// Detectar hover
const hasHover = useMediaQuery('(hover: hover)');

// Detectar múltiples breakpoints
const isSmallScreen = useMediaQuery('(max-width: 640px)');
const isMediumScreen = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');
const isLargeScreen = useMediaQuery('(min-width: 1025px)');
```

### Mejores Prácticas

1. **Definición de Breakpoints**:
   - Mantener consistencia en los breakpoints
   - Usar variables CSS para breakpoints
   - Documentar los breakpoints utilizados

2. **Rendimiento**:
   - Evitar demasiadas instancias del hook
   - Reutilizar resultados cuando sea posible
   - Considerar el uso de context para breakpoints globales

3. **Mantenibilidad**:
   - Centralizar las media queries comunes
   - Documentar el propósito de cada media query
   - Mantener la consistencia en el nombramiento

### Notas Importantes

- El hook es compatible con SSR (Server Side Rendering)
- Se limpia automáticamente al desmontar el componente
- Es seguro para usar en componentes de cliente ('use client')
- Proporciona actualizaciones en tiempo real
- No causa re-renders innecesarios
- Es compatible con todas las media queries de CSS
- Maneja correctamente los cambios de tamaño de ventana
- Es thread-safe y no bloquea el hilo principal 