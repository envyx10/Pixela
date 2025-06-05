# API de Reviews

Este directorio contiene la implementación de la API para el manejo de reseñas (reviews) en Pixela. La estructura está diseñada para proporcionar una capa de abstracción entre la API externa y nuestra aplicación.

## Estructura de Archivos

```
reviews/
├── README.md
├── reviews.ts     # Funciones principales de la API
├── mapReview.ts   # Mapeo de datos de la API a nuestro modelo
└── types.ts       # Definiciones de tipos e interfaces
```

## Tipos y Interfaces

En `types.ts` definimos todas las interfaces necesarias para el tipado seguro:

- `Review`: Estructura base para una reseña
- `ApiReview`: Estructura de una reseña desde la API
- `ReviewResponse`: Estructura de la respuesta de la API
- `ReviewRequest`: Estructura para crear/actualizar reseñas

## Funciones Principales

### reviews.ts

Contiene las funciones principales para interactuar con la API:

- `getReviews`: Obtiene las reseñas de un contenido específico
- `createReview`: Crea una nueva reseña
- `updateReview`: Actualiza una reseña existente
- `deleteReview`: Elimina una reseña
- `getUserReviews`: Obtiene las reseñas de un usuario específico

### mapReview.ts

Contiene las funciones de mapeo que transforman los datos de la API a nuestro modelo interno:

- `mapReviewFromApi`: Función principal que mapea los datos de una reseña
- `mapReviewToApi`: Función para mapear nuestros datos al formato de la API

## Características

- **Tipado Seguro**: Todas las funciones y datos están correctamente tipados
- **Manejo de Errores**: Implementación robusta de manejo de errores
- **Validación**: Validación de datos antes de enviarlos a la API
- **Autenticación**: Manejo seguro de tokens y autenticación
- **Documentación**: Código documentado con JSDoc

## Ejemplo de Uso

```typescript
// Obtener reseñas de un contenido
const reviews = await getReviews('movie', '123');

// Crear una nueva reseña
const newReview = await createReview({
  contentId: '123',
  contentType: 'movie',
  rating: 4.5,
  comment: 'Excelente película'
});

// Actualizar una reseña
const updatedReview = await updateReview('review123', {
  rating: 5,
  comment: 'Actualización de mi reseña'
});
```

## Mejores Prácticas

1. **Manejo de Datos**:
   - Validar todos los datos antes de enviarlos
   - Manejar correctamente los errores de la API
   - Proporcionar feedback claro al usuario

2. **Seguridad**:
   - Verificar la autenticación antes de cada operación
   - Sanitizar los datos de entrada
   - Proteger contra ataques XSS en los comentarios

3. **Rendimiento**:
   - Implementar caché cuando sea posible
   - Optimizar las llamadas a la API
   - Manejar la paginación eficientemente

## Notas Importantes

- Las reseñas requieren autenticación
- Los ratings deben estar entre 0 y 5
- Los comentarios tienen un límite de caracteres
- Se manejan diferentes tipos de contenido (películas, series)
- Las reseñas son inmutables después de 24 horas 