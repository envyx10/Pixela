# API de Favoritos

Este directorio contiene la implementación de la API para el manejo de favoritos en Pixela. La estructura está diseñada para proporcionar una capa de abstracción entre la API externa y nuestra aplicación, permitiendo a los usuarios gestionar sus contenidos favoritos.

## Estructura de Archivos

```
favorites/
├── README.md
├── favorites.ts    # Funciones principales de la API
├── mapFavorite.ts  # Mapeo de datos de la API a nuestro modelo
└── types.ts        # Definiciones de tipos e interfaces
```

## Tipos y Interfaces

En `types.ts` definimos todas las interfaces necesarias para el tipado seguro:

- `ApiFavorite`: Estructura base para un favorito desde la API
- `Favorite`: Estructura de un favorito mapeado para uso interno
- `FavoriteResponse`: Estructura de la respuesta de la API para favoritos
- `FavoriteRequest`: Estructura para las peticiones de creación/actualización

## Funciones Principales

### favorites.ts

Contiene las funciones principales para interactuar con la API:

- `getFavorites`: Obtiene todos los favoritos del usuario
- `getFavoriteById`: Obtiene un favorito específico por su ID
- `addFavorite`: Agrega un nuevo contenido a favoritos
- `removeFavorite`: Elimina un contenido de favoritos
- `isFavorite`: Verifica si un contenido está en favoritos

### mapFavorite.ts

Contiene las funciones de mapeo que transforman los datos de la API a nuestro modelo interno:

- `mapFavoriteFromApi`: Función principal que mapea los datos de un favorito
- `mapFavoriteToApi`: Función para mapear los datos al formato de la API

## Características

- **Tipado Seguro**: Todas las funciones y datos están correctamente tipados
- **Manejo de Errores**: Implementación robusta de manejo de errores y casos nulos
- **Autenticación**: Validación de usuario para operaciones sensibles
- **Validación**: Validación de datos tanto en entrada como en salida
- **Documentación**: Código documentado con JSDoc
- **Caché**: Implementación de caché para optimizar el rendimiento

## Ejemplo de Uso

```typescript
// Obtener todos los favoritos del usuario
const favorites = await getFavorites();

// Verificar si un contenido está en favoritos
const isFav = await isFavorite('123');

// Agregar un contenido a favoritos
const newFavorite = await addFavorite({
  contentId: '123',
  contentType: 'pelicula',
  userId: 'user123'
});

// Eliminar un contenido de favoritos
await removeFavorite('123');

// Obtener un favorito específico
const favorite = await getFavoriteById('123');
```

## Mejores Prácticas

1. **Manejo de Datos**:
   - Siempre usar las interfaces definidas en `types.ts`
   - Validar la existencia de datos antes de usarlos
   - Usar operadores opcionales para acceder a propiedades que pueden ser nulas
   - Verificar la autenticación del usuario antes de operaciones sensibles

2. **Rendimiento**:
   - Implementar caché para reducir llamadas a la API
   - Usar operaciones inmutables
   - Optimizar las consultas de favoritos
   - Implementar paginación para listas grandes

3. **Mantenibilidad**:
   - Mantener los tipos actualizados en `types.ts`
   - Documentar cambios en la API
   - Seguir el patrón de diseño establecido
   - Mantener la consistencia en el nombramiento

## Notas Importantes

- Se requiere autenticación para todas las operaciones
- Los IDs se convierten a string para consistencia
- Se validan los datos antes de enviarlos a la API
- Se implementa un sistema de caché para optimizar el rendimiento
- Las respuestas de error incluyen mensajes descriptivos
- Se manejan múltiples tipos de contenido (películas, series, etc.)
- Se implementa paginación para listas grandes de favoritos
- Se mantiene un registro de la fecha de agregado de cada favorito 