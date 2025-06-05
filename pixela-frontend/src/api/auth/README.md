# API de Autenticación

Este directorio contiene la implementación de la API para el manejo de autenticación en Pixela. La estructura está diseñada para proporcionar una capa de abstracción entre la API externa y nuestra aplicación, manejando el registro, inicio de sesión y gestión de usuarios.

## Estructura de Archivos

```
auth/
├── README.md
├── auth.ts         # Funciones principales de la API
├── mapAuth.ts      # Mapeo de datos de la API a nuestro modelo
└── types.ts        # Definiciones de tipos e interfaces
```

## Tipos y Interfaces

En `types.ts` definimos todas las interfaces necesarias para el tipado seguro:

- `ApiUser`: Estructura base para un usuario desde la API
- `User`: Estructura de un usuario mapeado para uso interno
- `AuthResponse`: Estructura de la respuesta de autenticación
- `LoginRequest`: Estructura para peticiones de inicio de sesión
- `RegisterRequest`: Estructura para peticiones de registro
- `TokenResponse`: Estructura para respuestas de tokens

## Funciones Principales

### auth.ts

Contiene las funciones principales para interactuar con la API:

- `login`: Inicia sesión de un usuario
- `register`: Registra un nuevo usuario
- `logout`: Cierra la sesión del usuario
- `refreshToken`: Renueva el token de acceso
- `getCurrentUser`: Obtiene la información del usuario actual
- `updateUser`: Actualiza la información del usuario
- `changePassword`: Cambia la contraseña del usuario
- `resetPassword`: Solicita restablecimiento de contraseña

### mapAuth.ts

Contiene las funciones de mapeo que transforman los datos de la API a nuestro modelo interno:

- `mapUserFromApi`: Función principal que mapea los datos de un usuario
- `mapUserToApi`: Función para mapear los datos al formato de la API
- `mapAuthResponse`: Función para mapear la respuesta de autenticación

## Características

- **Tipado Seguro**: Todas las funciones y datos están correctamente tipados
- **Manejo de Errores**: Implementación robusta de manejo de errores y casos nulos
- **Seguridad**: Implementación de tokens JWT y refresh tokens
- **Validación**: Validación de datos tanto en entrada como en salida
- **Documentación**: Código documentado con JSDoc
- **Persistencia**: Manejo seguro de tokens en localStorage

## Ejemplo de Uso

```typescript
// Iniciar sesión
const authResponse = await login({
  email: 'usuario@ejemplo.com',
  password: 'contraseña123'
});

// Registrar nuevo usuario
const newUser = await register({
  nombre: 'Usuario',
  email: 'usuario@ejemplo.com',
  password: 'contraseña123'
});

// Obtener usuario actual
const currentUser = await getCurrentUser();

// Actualizar información del usuario
const updatedUser = await updateUser({
  nombre: 'Nuevo Nombre',
  avatar: 'url-del-avatar'
});

// Cambiar contraseña
await changePassword({
  currentPassword: 'contraseña123',
  newPassword: 'nuevaContraseña123'
});

// Cerrar sesión
await logout();
```

## Mejores Prácticas

1. **Seguridad**:
   - Nunca almacenar contraseñas en texto plano
   - Implementar rate limiting para intentos de inicio de sesión
   - Usar HTTPS para todas las comunicaciones
   - Implementar expiración de tokens
   - Validar tokens en cada petición

2. **Manejo de Datos**:
   - Siempre usar las interfaces definidas en `types.ts`
   - Validar la existencia de datos antes de usarlos
   - Sanitizar datos de entrada
   - Manejar errores de forma segura

3. **Mantenibilidad**:
   - Mantener los tipos actualizados en `types.ts`
   - Documentar cambios en la API
   - Seguir el patrón de diseño establecido
   - Mantener la consistencia en el nombramiento

## Notas Importantes

- Los tokens JWT se almacenan de forma segura
- Se implementa refresh token para mantener sesiones activas
- Las contraseñas se validan con requisitos mínimos de seguridad
- Se manejan múltiples tipos de errores de autenticación
- Las sesiones expiran después de un tiempo de inactividad
- Se implementa protección contra ataques de fuerza bruta
- Se mantiene un registro de intentos de inicio de sesión
- Se implementa recuperación segura de contraseñas 