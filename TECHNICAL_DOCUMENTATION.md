# 📘 Documentación Técnica Integral: Pixela (v2.0 Full Stack)

**Fecha de Última Actualización:** Enero 2026
**Versión:** 2.0 (Migration Complete)
**Arquitectura:** Monorepo Full Stack Next.js (Serverless)

---

## 1. Visión General y Evolución del Proyecto

### 1.1 El Cambio de Paradigma
Originalmente, Pixela fue concebida como una aplicación híbrida con un Frontend en Next.js y un Backend REST API en Laravel (PHP). Si bien esta arquitectura es válida, introducía complejidad innecesaria en el despliegue y latencia en la comunicación de red.

**La versión actual (v2.0)** consolida todo el proyecto en una única aplicación **Next.js 15 Full Stack**.

**Beneficios obtenidos tras el refactor:**
*   **Eliminación de Laravel:** Se reduce la carga operativa al eliminar el servidor PHP/Apache.
*   **Type Safety End-to-End:** TypeScript en todo el stack (desde la base de datos hasta el componente UI).
*   **Serverless Ready:** La API ahora escala automáticamente en Vercel.
*   **Rendimiento:** Las peticiones a la base de datos ocurren en el mismo entorno de ejecución que el renderizado del servidor (SSR).

---

## 2. Stack Tecnológico Detallado

| Capa | Tecnología | Versión | Función |
| :--- | :--- | :--- | :--- |
| **Framework** | **Next.js** | 15.1 | App Router, Server Actions, API Routes. |
| **Lenguaje** | **TypeScript** | 5.x | Tipado estático estricto. |
| **Base de Datos** | **PostgreSQL** | 16 (Supabase) | Persistencia relacional. |
| **ORM** | **Prisma** | 6.x | Abstracción de base de datos y migraciones. |
| **Auth** | **Auth.js** | v5 (Beta) | Gestión de sesiones y seguridad. |
| **Estilos** | **Tailwind CSS** | 3.x | Styling utility-first y diseño responsivo. |
| **Estado** | **Zustand** | 5.x | Gestión de estado global ligero (cliente). |
| **Validación** | **Zod** | 3.x | Validación de esquemas en API y formularios. |
| **Fuente de Datos** | **TMDB API** | v3 | Proveedor de metadatos de películas/series. |

---

## 3. Arquitectura de Software

El proyecto sigue una arquitectura modular basada en **Features** (`src/features`) para el frontend y **Route Handlers** (`src/api`) para el backend.

### 3.1 Estructura de Directorios
```bash
src/
├── api/                  # BACKEND: API Routes (Sustituye a Laravel)
│   ├── auth/             # Endpoints de autenticación NextAuth
│   ├── movies/           # Endpoints de películas (Proxy a TMDB)
│   ├── series/           # Endpoints de series (Proxy a TMDB)
│   ├── users/            # Gestión de usuarios (CRUD DB)
│   └── shared/           # Lógica compartida (apiHelpers, apiEndpoints)
├── app/                  # RUTAS NEXT.JS (Pages)
│   ├── (auth)/           # Rutas públicas (Login, Register)
│   ├── (rutas)/          # Rutas protegidas o principales
│   └── layout.tsx        # Layout raíz global
├── features/             # FRONTEND: Lógica de negocio UI
│   ├── auth/             # Componentes de login/registro
│   ├── hero/             # Carrusel principal
│   ├── media/            # Fichas de películas/series
│   ├── profile/          # Perfil de usuario y favoritos
│   └── trending/         # Lógica de tendencias
├── shared/               # Componentes reusables (Navbar, Footer, UI Cards)
└── lib/                  # Configuraciones (prisma, utils)
```

---

## 4. Ingeniería de Datos (Backend & DB)

### 4.1 Esquema de Base de Datos (Prisma)
Hemos migrado de migraciones de Laravel a un `schema.prisma` declarativo.

*   **User:** Cuenta principal. Almacena `email`, `password` (hasheada), `image` (avatar), `name`.
*   **Account:** Tabla técnica requerida por NextAuth para vincular cuentas (Oauth o Credenciales).
*   **Session:** Almacenamiento de sesiones activas (si se usa estrategia de base de datos).
*   **Favorite:** Relación N:M entre Usuario y Contenido (Movie/Serie). Almacena `tmdbId`, `mediaType`, `posterPath`.
*   **Review:** Relación 1:N. Opiniones de texto de usuarios sobre contenido.

### 4.2 La Estrategia "Internal Proxy" (API)
Para no exponer la `TMDB_API_KEY` en el cliente, el frontend **NUNCA** llama a TMDB directamente.

1.  **Cliente:** Llama a `/api/movies/trending`.
2.  **Next.js Server:** Recibe la petición en `src/api/movies/trending/route.ts`.
3.  **Lógica:** El servidor inyecta la API Key de forma segura y llama a TMDB.
4.  **Respuesta:** El servidor devuelve el JSON limpio al cliente.

**Ventaja:** Seguridad total de claves y control de caché en un solo punto.

---

## 5. Implementación del Frontend (UI/UX)

### 5.1 Sistema de Diseño (Glassmorphism)
Se ha implementado un diseño oscuro "Premium" utilizando variables CSS y Tailwind.
*   **Colores:** Paleta personalizada `pixela-dark`, `pixela-accent`.
*   **Efectos:** Uso intensivo de `backdrop-blur` (cristal) en Navbar y Cards.
*   **Tipografía:** Integración de fuentes Google Fonts optimizadas.

### 5.2 Manejo de Imágenes (El Desafío TMDB)
TMDB devuelve rutas relativas (`/abc.jpg`).
*   **Problema:** Next.js `<Image>` requiere rutas absolutas o configuración de dominios remotos.
*   **Solución:**
    1.  Se configuró `next.config.js` para permitir `image.tmdb.org`.
    2.  Se crearon componentes inteligentes (`ImageCarousel`, `PosterImage`) que detectan si la ruta es relativa y le anteponen automáticamente `https://image.tmdb.org/t/p/original`.

### 5.3 Navegación y Autenticación
El `Navbar` detecta el estado de la sesión (`useAuthStore` + `SessionProvider`).
*   Si el usuario es **Guest**: Muestra botones de Login/Register.
*   Si el usuario es **Auth**: Muestra Avatar y Menú de Perfil.
*   **Fix Crítico:** Se reemplazó la redirección antigua (`window.location`) por `router.push('/login')` para evitar errores 404 en producción.

---

## 6. Registro de Correcciones Críticas (Troubleshooting)

Durante el proceso de despliegue en Vercel, se resolvieron los siguientes problemas de alta complejidad:

### 🔴 Error: "Double API Prefix" (fetchFromAPI)
*   **Síntoma:** Peticiones fallidas a `http://dominio/api/api/user`.
*   **Causa:** La función `fetchFromAPI` concatenaba `/api` incluso si la URL ya lo tenía.
*   **Solución:** Se implementó una lógica "blindada" en `apiHelpers.ts` que analiza la URL entrante. Si ya contiene `/api` o `http`, la respeta tal cual.

### 🔴 Error: "Blocked by Client / Mixed Content"
*   **Síntoma:** Error de red al intentar conectar desde HTTPS (Vercel) a HTTP (Localhost).
*   **Causa:** La variable de entorno `NEXT_PUBLIC_API_URL` apuntaba a `localhost:3000` en producción.
*   **Solución:**
    1.  Se actualizó la variable en Vercel a la URL real (`https://pixela...`).
    2.  Se modificó `apiEndpoints.ts` para detectar si el código corre en el navegador (`window defined`). Si no es localhost, fuerza el uso de rutas relativas (`/api`), ignorando variables mal configuradas.

### 🔴 Error: Imágenes Rotas (404)
*   **Síntoma:** El carrusel principal mostraba cuadros negros.
*   **Causa:** El componente `ImageCarousel` recibía rutas crudas de TMDB (`/path.jpg`) e intentaba cargarlas desde el dominio propio.
*   **Solución:** Se añadió una validación en tiempo de renderizado: si la ruta comienza por `/`, se le antepone el dominio CDN de TMDB.

---

## 7. Variables de Entorno Requeridas (.env)

Para que el sistema funcione, se requieren las siguientes claves:

```env
# Conexión a Base de Datos (Supabase Transaction Mode)
DATABASE_URL="postgres://..."

# Conexión Directa (Supabase Session Mode - Para migraciones)
DIRECT_URL="postgres://..."

# Seguridad Auth.js (Generar con `npx auth secret`)
AUTH_SECRET="secret..."

# API Key de TMDB (v3 Auth)
TMDB_API_KEY="clave_de_tmdb..."

# URL Pública (Local: localhost:3000 | Prod: https://dominio.vercel.app)
NEXT_PUBLIC_API_URL="https://..."
```

---

## 8. Conclusión del Refactor

Pixela ha completado su transición. El código legado de Laravel ha sido erradicado. La aplicación es ahora una unidad cohesiva desplegada en Vercel, con una base de código moderna, mantenible y escalable.

**Autores Técnicos:**
*   Pablo Gil Díaz - Full Stack Engineer
*   Ruyi Xia Ye - Full Stack Engineer
