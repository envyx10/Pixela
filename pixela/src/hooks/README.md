# Hooks Personalizados

Este directorio contiene hooks personalizados que encapsulan lógica reutilizable en nuestra aplicación Pixela.

## useMediaQuery

El hook `useMediaQuery` es una utilidad que permite detectar y reaccionar a cambios en las media queries de CSS, facilitando la implementación de diseños responsivos.

## useScrollAnimation

El hook `useScrollAnimation` es una utilidad genérica para crear animaciones de entrada con scroll utilizando GSAP y ScrollTrigger, proporcionando una API configurable y reutilizable.

### Estructura de Archivos

```
hooks/
├── README.md
├── index.ts                # Exportaciones principales
├── useMediaQuery.ts        # Hook para detectar media queries
└── useScrollAnimation.ts   # Hook para animaciones de scroll
```

---

## 📱 useMediaQuery

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

---

## 🎬 useScrollAnimation

### Uso Básico

```typescript
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useRef } from 'react';

function AnimatedSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useScrollAnimation({
    trigger: titleRef,
    elements: [
      { ref: titleRef, duration: 0.8 },
      { ref: subtitleRef, duration: 0.6, delay: "-=0.4" },
      { ref: cardsRef, duration: 0.6, delay: "-=0.2", stagger: 0.15 }
    ]
  });

  return (
    <section>
      <h1 ref={titleRef}>Título</h1>
      <p ref={subtitleRef}>Subtítulo</p>
      <div ref={cardsRef}>
        <div>Card 1</div>
        <div>Card 2</div>
        <div>Card 3</div>
      </div>
    </section>
  );
}
```

### Configuración Avanzada

```typescript
useScrollAnimation({
  trigger: containerRef,
  triggerStart: 'top 80%',         // Cuándo iniciar la animación
  toggleActions: 'play none none none',  // Acciones del ScrollTrigger
  initialY: 30,                    // Posición Y inicial
  elements: [
    { 
      ref: titleRef, 
      duration: 0.8, 
      ease: 'power2.out',
      y: 0                         // Posición Y final
    },
    { 
      ref: cardsRef, 
      duration: 0.6, 
      delay: "-=0.4",
      stagger: 0.15                // Escalonar hijos del elemento
    }
  ]
});
```

### Tipos e Interfaces

```typescript
interface AnimatedElement {
  ref: React.RefObject<HTMLElement | null>;
  duration?: number;     // Duración en segundos (default: 0.6)
  delay?: string;        // Delay relativo (ej: "-=0.4")
  ease?: string;         // Función de easing (default: 'power2.out')
  y?: number;           // Posición Y final (default: 0)
  stagger?: number;     // Delay entre elementos hijos
}

interface ScrollAnimationConfig {
  trigger: React.RefObject<HTMLElement | null>;  // Elemento que dispara la animación
  elements: AnimatedElement[];                    // Elementos a animar
  triggerStart?: string;                         // Punto de inicio (default: 'top 85%')
  toggleActions?: string;                        // Acciones del trigger
  initialY?: number;                            // Posición Y inicial (default: 20)
}
```

### Características

- **🎯 Flexible**: Configura múltiples elementos con diferentes timings
- **⚡ Performante**: Usa GSAP y ScrollTrigger para animaciones fluidas
- **🧹 Auto-limpieza**: Elimina listeners y timelines automáticamente
- **🎨 Stagger**: Soporte para animaciones escalonadas
- **📱 Responsivo**: Funciona en todos los dispositivos
- **🔧 Configurable**: Triggers, timings y easings personalizables

### Ejemplos de Uso

#### Sección Simple
```typescript
// Animar título y párrafo
useScrollAnimation({
  trigger: sectionRef,
  elements: [
    { ref: titleRef, duration: 0.8 },
    { ref: paragraphRef, duration: 0.6, delay: "-=0.4" }
  ]
});
```

#### Cards con Stagger
```typescript
// Animar tarjetas una por una
useScrollAnimation({
  trigger: gridRef,
  elements: [
    { ref: gridRef, stagger: 0.2, duration: 0.6 }
  ]
});
```

#### Múltiples Secciones
```typescript
// Primera sección
useScrollAnimation({
  trigger: section1Ref,
  elements: [
    { ref: title1Ref, duration: 0.6 },
    { ref: content1Ref, duration: 0.5, delay: "-=0.3" }
  ]
});

// Segunda sección
useScrollAnimation({
  trigger: section2Ref,
  triggerStart: 'top 90%',
  elements: [
    { ref: title2Ref, duration: 0.8 },
    { ref: cards2Ref, stagger: 0.15, delay: "-=0.4" }
  ]
});
```

### Mejores Prácticas

1. **Triggers Apropiados**:
   - Usa el primer elemento como trigger
   - Ajusta `triggerStart` según el diseño
   - Evita triggers en elementos que pueden cambiar

2. **Performance**:
   - Agrupa elementos relacionados en una sola llamada
   - Usa stagger para elementos similares
   - Evita demasiadas animaciones simultáneas

3. **UX**:
   - Mantén duraciones coherentes (0.6-0.8s)
   - Usa delays negativos para superposición suave
   - Considera la accesibilidad (prefers-reduced-motion)

### Notas Importantes

- **Dependencias**: Requiere GSAP y ScrollTrigger
- **SSR**: Compatible con Next.js
- **Cleanup**: Se limpia automáticamente al desmontar
- **Refs**: Todos los refs deben estar definidos antes del render
- **Trigger**: El elemento trigger debe existir cuando se ejecuta el hook 