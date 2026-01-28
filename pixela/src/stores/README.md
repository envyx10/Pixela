# Stores de Estado Global

Este directorio contiene los stores de estado global de la aplicación Pixela, implementados utilizando Zustand para una gestión de estado eficiente y sencilla.

## useAuthStore

El store `useAuthStore` maneja el estado de autenticación de la aplicación, proporcionando una forma centralizada de gestionar el estado del usuario, la autenticación y los errores relacionados.

### Estructura de Archivos

```
stores/
├── README.md
└── useAuthStore.ts  # Store de autenticación
```

### Estado

```typescript
interface AuthState {
  user: UserResponse | null;      // Usuario actual
  isAuthenticated: boolean;       // Estado de autenticación
  isLoading: boolean;            // Estado de carga
  error: string | null;          // Mensaje de error
}
```

### Uso

```typescript
import { useAuthStore } from '@/stores/useAuthStore';

// En tu componente
function AuthComponent() {
  const { user, isAuthenticated, isLoading, error, checkAuth, logout } = useAuthStore();

  // Verificar autenticación al montar el componente
  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!isAuthenticated) return <LoginForm />;

  return (
    <div>
      <h1>Bienvenido, {user?.nombre}</h1>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
}
```

### Funciones Principales

#### checkAuth
```typescript
checkAuth: async () => Promise<void>
```
- Verifica el estado de autenticación del usuario
- Actualiza el estado con la información del usuario
- Maneja errores de autenticación
- Limpia el flag de forceLogout

#### logout
```typescript
logout: async () => Promise<void>
```
- Cierra la sesión del usuario
- Limpia el estado de autenticación
- Maneja errores durante el cierre de sesión

### Características

- **Gestión de Estado Centralizada**: Estado de autenticación accesible globalmente
- **Tipado Seguro**: Implementado con TypeScript
- **Manejo de Errores**: Gestión robusta de errores
- **Estado de Carga**: Indicador de operaciones en progreso
- **Persistencia**: Integración con localStorage
- **Actualización Automática**: Estado reactivo con Zustand

### Mejores Prácticas

1. **Uso del Store**:
   - Acceder al store solo cuando sea necesario
   - Desestructurar solo los valores necesarios
   - Usar selectores para optimizar re-renders

2. **Manejo de Errores**:
   - Implementar manejo de errores en componentes
   - Mostrar mensajes de error apropiados
   - Limpiar errores después de mostrarlos

3. **Rendimiento**:
   - Evitar suscripciones innecesarias al store
   - Usar selectores para optimizar actualizaciones
   - Implementar memoización cuando sea necesario

### Ejemplos de Uso Común

```typescript
// Verificar autenticación
const { checkAuth } = useAuthStore();
await checkAuth();

// Acceder a datos del usuario
const { user } = useAuthStore();
const userName = user?.nombre;

// Verificar estado de autenticación
const { isAuthenticated } = useAuthStore();
if (!isAuthenticated) {
  redirect('/login');
}

// Cerrar sesión
const { logout } = useAuthStore();
const handleLogout = async () => {
  try {
    await logout();
    redirect('/login');
  } catch (error) {
    showError('Error al cerrar sesión');
  }
};
```

### Notas Importantes

- El store es compatible con SSR
- Se limpia automáticamente al cerrar sesión
- Mantiene la consistencia del estado de autenticación
- Proporciona actualizaciones en tiempo real
- Maneja correctamente los errores de red
- Es thread-safe y no bloquea el hilo principal
- Integra con el sistema de rutas protegidas
- Mantiene la seguridad de las sesiones 