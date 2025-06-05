# API de Categorías

Este directorio contiene la implementación de la API para el manejo de categorías en Pixela. La estructura está diseñada para proporcionar una capa de abstracción entre la API externa y nuestra aplicación.

## Estructura de Archivos

```
categories/
├── README.md
├── categories.ts   # Funciones principales de la API
├── mapCategory.ts  # Mapeo de datos de la API a nuestro modelo
└── types.ts        # Definiciones de tipos e interfaces
```

## Tipos y Interfaces

En `types.ts` definimos todas las interfaces necesarias para el tipado seguro:

- `ApiCategory`: Estructura base para una categoría desde la API
- `Category`: Estructura de una categoría mapeada para uso interno
- `CategoryResponse`: Estructura de la respuesta de la API para categorías

## Funciones Principales

### categories.ts

Contiene las funciones principales para interactuar con la API:

- `getCategories`: Obtiene todas las categorías disponibles
- `getCategoryById`: Obtiene una categoría específica por su ID
- `createCategory`: Crea una nueva categoría
- `updateCategory`: Actualiza una categoría existente
- `deleteCategory`: Elimina una categoría

### mapCategory.ts

Contiene las funciones de mapeo que transforman los datos de la API a nuestro modelo interno:

- `mapCategoryFromApi`: Función principal que mapea los datos de una categoría
- `mapCategoryToApi`: Función para mapear los datos al formato de la API

## Características

- **Tipado Seguro**: Todas las funciones y datos están correctamente tipados
- **Manejo de Errores**: Implementación robusta de manejo de errores y casos nulos
- **Valores por Defecto**: Todos los campos tienen valores por defecto apropiados
- **Inmutabilidad**: Uso de constantes y operaciones inmutables
- **Documentación**: Código documentado con JSDoc
- **Validación**: Validación de datos tanto en entrada como en salida

## Ejemplo de Uso

```typescript
// Obtener todas las categorías
const categories = await getCategories();

// Obtener una categoría específica
const category = await getCategoryById('123');

// Crear una nueva categoría
const newCategory = await createCategory({
  nombre: 'Acción',
  descripcion: 'Películas de acción'
});

// Actualizar una categoría
const updatedCategory = await updateCategory('123', {
  nombre: 'Acción y Aventura'
});

// Eliminar una categoría
await deleteCategory('123');
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
   - Implementar caché cuando sea posible

3. **Mantenibilidad**:
   - Mantener los tipos actualizados en `types.ts`
   - Documentar cambios en la API
   - Seguir el patrón de diseño establecido
   - Mantener la consistencia en el nombramiento

## Notas Importantes

- Las categorías son inmutables una vez creadas
- Los IDs se convierten a string para consistencia
- Se validan los datos antes de enviarlos a la API
- Se manejan múltiples formatos de datos de la API
- Las respuestas de error incluyen mensajes descriptivos
- Se implementa un sistema de caché para optimizar el rendimiento 