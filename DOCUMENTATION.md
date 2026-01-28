# 🎬 Pixela - Documentación Técnica del Proyecto

Bienvenidos a la documentación central de **Pixela**, una plataforma moderna para cinéfilos y amantes de las series. Este documento detalla la arquitectura, decisiones de diseño y el proceso de migración hacia un sistema **Full Stack Next.js**.

---

## 1. 🚀 Visión General
Pixela ha evolucionado de una arquitectura dividida (Laravel para backend + Next.js para frontend) a un sistema **unificado en Next.js 15**. El objetivo principal es la simplicidad, el rendimiento y la facilidad de despliegue en entornos modernos.

### Stack Tecnológico
- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS + CSS Puro
- **Base de Datos:** PostgreSQL a través de Prisma ORM
- **Autenticación:** Auth.js (NextAuth v5)
- **Proveedor de Datos:** [TMDB API](https://www.themoviedb.org/)

---

## 2. 🏗️ Arquitectura del Sistema

### Estructura de Carpetas
El proyecto sigue una estructura modular basada en **features** para facilitar la escalabilidad:

- `/src/app`: Rutas del navegador y Endpoints de la API.
- `/src/features`: Lógica de negocio dividida por funcionalidades (profile, categories, discover, etc.).
- `/src/lib`: Configuraciones centrales (Prisma, TMDB utility).
- `/src/shared`: Componentes UI reutilizables.
- `/prisma`: Esquema de la base de datos y migraciones.

---

## 3. 🛠️ API Interna (Next.js Route Handlers)
Ya no dependemos de un servidor externo. Next.js gestiona directamente las peticiones al servidor y a la base de datos.

### 🎥 Contenido (Media & TMDB Proxy)
Estas rutas actúan como un puente seguro entre tu web y TMDB, protegiendo la API_KEY en el servidor.
- `GET /api/[type]/discover`: Obtiene películas o series recomendadas.
- `GET /api/[type]/genre/[id]`: Filtra contenido por categoría específica.
- `GET /api/[type]/search?query=...`: Busca películas o series.
- `GET /api/movies/trending`: Películas más populares de la semana.
- `GET /api/series/trending`: Series más populares de la semana.

### 👤 Usuarios y Social
- `POST /api/auth/register`: Registro de nuevos usuarios.
- `GET /api/reviews`: Obtiene las reseñas del usuario actual (enriquecidas con datos de TMDB).
- `POST /api/reviews`: Crea o actualiza una reseña técnica.
- `GET /api/favorites/details`: Obtiene la lista de favoritos con sus pósters y títulos reales.

---

## 4. 🗄️ Base de Datos (Prisma)
Utilizamos **Prisma** para hablar con la base de datos sin escribir SQL puro.

### Modelos Principales
1. **User:** Almacena credenciales, nombre y foto de perfil.
2. **Review:** Guarda la calificación (1-10), comentario y el ID de TMDB.
3. **Favorite:** Guarda qué películas o series ha marcado el usuario.

---

## 5. 🔄 Proceso de Migración (De Laravel a Next.js)
Este ha sido el cambio más grande del proyecto. Se eliminó la carpeta `pixela-backend` para integrar todo el poder en el frontend.

**Cambios Clave:**
- **Auth:** Migramos de "Laravel Sanctum" a "Auth.js". Ahora las sesiones son más rápidas y seguras.
- **Routing:** Las llamadas que antes iban a `localhost:8000` ahora van a `/api/...` dentro del mismo proyecto.
- **Enriquecimiento de datos:** El servidor ahora detecta si una reseña no tiene título/póster y lo busca automáticamente en TMDB antes de enviarlo al móvil/navegador.

---

## 6. 🎨 Diseño y UX
Pixela utiliza un diseño **"Premium Dark Mode"**:
- **Estética:** Glassmorphism (efecto de cristal), gradientes vibrantes y tipografía moderna (Outfit/Inter).
- **Interactividad:** Micro-animaciones en tarjetas, efectos de hover con luz dinámica y esqueletos de carga (Skeletons) para evitar saltos de pantalla.

---

---

## 7. 🛡️ Guía para el Equipo de Desarrollo
Las instrucciones detalladas sobre despliegue en producción y configuración de entornos locales protegidos se encuentran en el archivo **`DEVELOPER_GUIDE.md`**. 

*Nota: Dicho archivo está excluido del repositorio público por seguridad.*

---
*Documentación general de Pixela.*
