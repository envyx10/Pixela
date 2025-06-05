# API de Series

Este directorio contiene la implementación de la API para el manejo de series en Pixela. La estructura está diseñada para proporcionar una capa de abstracción entre la API externa y nuestra aplicación.

## Estructura de Archivos

```
series/
├── README.md
├── series.ts      # Funciones principales de la API
├── mapSerie.ts    # Mapeo de datos de la API a nuestro modelo
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
- `ApiSerie`: Estructura completa de una serie desde la API

## Funciones Principales

### series.ts

Contiene las funciones principales para interactuar con la API:

- `getSerieById`: Obtiene los datos de una serie por su ID
- `getSerieActores`: Obtiene el elenco de una serie
- `getSerieVideos`: Obtiene los trailers/videos de una serie
- `getSerieProveedores`: Obtiene los proveedores de streaming disponibles

### mapSerie.ts

Contiene las funciones de mapeo que transforman los datos de la API a nuestro modelo interno:

- `mapSerieFromApi`: Función principal que mapea todos los datos de una serie
- `mapActor`: Mapea los datos de un actor
- `mapTrailer`: Mapea los datos de un trailer
- `mapProvider`: Mapea los datos de un proveedor
- `mapCreator`: Mapea los datos de un creador

## Características

- **Tipado Seguro**: Todas las funciones y datos están correctamente tipados
- **Manejo de Errores**: Implementación robusta de manejo de errores y casos nulos
- **Valores por Defecto**: Todos los campos tienen valores por defecto apropiados
- **Inmutabilidad**: Uso de constantes y operaciones inmutables
- **Documentación**: Código documentado con JSDoc

## Ejemplo de Uso

```typescript
// Obtener una serie por ID
const serie = await getSerieById('123');

// La serie ya viene mapeada con todos sus datos
console.log(serie.titulo);
console.log(serie.actores);
console.log(serie.trailers);
```

## Mejores Prácticas

1. **Manejo de Datos**:
   - Siempre usar las interfaces definidas
   - Proporcionar valores por defecto para campos opcionales
   - Validar la existencia de datos antes de usarlos

2. **Rendimiento**:
   - Usar operaciones inmutables
   - Evitar reasignaciones innecesarias
   - Optimizar las llamadas a la API

3. **Mantenibilidad**:
   - Mantener los tipos actualizados
   - Documentar cambios en la API
   - Seguir el patrón de diseño establecido

## Notas Importantes

- Las URLs de imágenes se formatean automáticamente
- Los IDs se convierten a string para consistencia
- Los arrays vacíos se devuelven en lugar de null/undefined
- Se manejan múltiples formatos de datos de la API 