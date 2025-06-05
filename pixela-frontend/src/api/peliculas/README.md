# API de Películas

Este directorio contiene la implementación de la API para el manejo de películas en Pixela. La estructura está diseñada para proporcionar una capa de abstracción entre la API externa y nuestra aplicación.

## Estructura de Archivos

```
peliculas/
├── README.md
├── peliculas.ts   # Funciones principales de la API
├── mapPelicula.ts # Mapeo de datos de la API a nuestro modelo
└── types.ts       # Definiciones de tipos e interfaces
```

## Tipos y Interfaces

En `types.ts` definimos todas las interfaces necesarias para el tipado seguro:

- `Video`: Estructura para videos/trailers
- `Provider`: Estructura para proveedores de streaming
- `ApiActor`: Estructura para actores de la API
- `ApiTrailer`: Estructura para trailers de la API
- `ApiProvider`: Estructura para proveedores de la API
- `ApiCreator`: Estructura para creadores de la API
- `ApiImage`: Estructura para imágenes (backdrops y posters)
- `ApiPelicula`: Estructura completa de una película desde la API

## Funciones Principales

### peliculas.ts

Contiene las funciones principales para interactuar con la API:

- `getPeliculaById`: Obtiene los datos de una película por su ID
- `getPeliculaActores`: Obtiene el elenco de una película
- `getPeliculaVideos`: Obtiene los trailers/videos de una película
- `getPeliculaProveedores`: Obtiene los proveedores de streaming disponibles
- `getPeliculaImagenes`: Obtiene las imágenes (backdrops y posters) de una película

### mapPelicula.ts

Contiene las funciones de mapeo que transforman los datos de la API a nuestro modelo interno:

- `mapPeliculaFromApi`: Función principal que mapea todos los datos de una película usando `ApiPelicula`
- `mapActor`: Mapea los datos de un actor usando `ApiActor`
- `mapTrailer`: Mapea los datos de un trailer usando `ApiTrailer`
- `formatImageUrl`: Función auxiliar para formatear URLs de imágenes

## Características

- **Tipado Seguro**: Todas las funciones y datos están correctamente tipados usando las interfaces de `types.ts`
- **Manejo de Errores**: Implementación robusta de manejo de errores y casos nulos
- **Valores por Defecto**: Todos los campos tienen valores por defecto apropiados
- **Inmutabilidad**: Uso de constantes y operaciones inmutables
- **Documentación**: Código documentado con JSDoc
- **Manejo de Nulos**: Uso de operadores opcionales y valores por defecto para propiedades que pueden ser nulas

## Ejemplo de Uso

```typescript
// Obtener una película por ID
const pelicula = await getPeliculaById('123');

// La película ya viene mapeada con todos sus datos
console.log(pelicula.titulo);
console.log(pelicula.actores);
console.log(pelicula.trailers);
console.log(pelicula.imagenes);
```

## Mejores Prácticas

1. **Manejo de Datos**:
   - Siempre usar las interfaces definidas en `types.ts`
   - Proporcionar valores por defecto para campos opcionales
   - Validar la existencia de datos antes de usarlos
   - Usar operadores opcionales para acceder a propiedades que pueden ser nulas

2. **Rendimiento**:
   - Usar operaciones inmutables
   - Evitar reasignaciones innecesarias
   - Optimizar las llamadas a la API

3. **Mantenibilidad**:
   - Mantener los tipos actualizados en `types.ts`
   - Documentar cambios en la API
   - Seguir el patrón de diseño establecido

## Notas Importantes

- Las URLs de imágenes se formatean automáticamente usando `formatImageUrl`
- Los IDs se convierten a string para consistencia
- Los arrays vacíos se devuelven en lugar de null/undefined
- Se manejan múltiples formatos de datos de la API
- Las imágenes incluyen tanto backdrops como posters
- Los proveedores de streaming se filtran para eliminar duplicados
- Se utiliza tipado estricto con las interfaces de `types.ts` 