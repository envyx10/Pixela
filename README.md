# Pixela

**Autores:** Ruyi & Pablo | 2ºDAW </br>

**Copyright © 2025 Pablo Gil Díaz y Ruyi Xia Ye**

Pixela es una plataforma interactiva diseñada para que los usuarios puedan descubrir y explorar sus series y películas favoritas. Permite agregar reseñas, calificar contenidos y gestionar una experiencia completamente personalizada.
El proyecto será desarrollado utilizando NextJS y react por debajo para la interfaz de usuario (frontend) y Laravel para la lógica del servidor (backend), asegurando una experiencia moderna, dinámica y eficiente.

Ante proyecto: [www.notion.es](https://sphenoid-stone-975.notion.site/ANTEPROYECTO-PIXELA-1c2bccfbf6a4800c8945f8c8dfb77095) <br/>

Repositorio para proyecto fin de grado. </br>

# LinkedIn </br>

[Pablo](https://www.linkedin.com/in/envyx10/)  </br>
[Ruyi](https://www.linkedin.com/in/ruyi-xia-ye-b19853189/)



# Historial Pixela <br/>
Historial del repositorio de commits: [Historial github](https://github.com/envyx10/Pixela/commits/main/) <br/>
Historial de ramas de pixela [Ramas pixela](https://github.com/envyx10/Pixela/branches/active) <br/>

# Video Pixela <br/>
Dado el avance del proyecto, el vídeo necesitaba superar los 5 minutos para cubrir adecuadamente el contenido. Aun así, hemos hecho un gran esfuerzo por resumir al máximo los conceptos y todo lo que hemos desarrollado.
<br>
<br>
**Video dia 30/04/2025 - CheckIn:** [Video](https://vimeo.com/1080303986/9f50bbfb83?share=copy) <br/>
**Video dia 15/06/2025 - Entrega final:** [Video](https://vimeo.com/1093512042?share=copy](https://vimeo.com/1093512042))

# Diseño y átomos

Diseño de figma - [Figma](https://www.figma.com/design/CPQe3LpPHQXKW1AWTYJhOG/PROYECTO-PIXELA.IO?m=auto&t=XRjSeFZfbLBWJ1JM-6)

# Documentación Técnica del Proyecto: Pixela

Documentación Pixela | [Documento drive - pixela ](https://docs.google.com/document/d/1xqrrvgyTaQhrhDkg3hRDdx-euwUsP8KDyauRK608kks/edit?usp=sharing)

# Enlace a web

Próximamente

## 1. Resumen General del Proyecto

**Propósito**: `Pixela` es una aplicación web moderna diseñada para que los usuarios puedan descubrir, explorar, guardar como favoritos y escribir reseñas de películas y series. Actúa como una interfaz de usuario sofisticada que consume datos de una fuente externa (probablemente The Movie Database - TMDB) y gestiona los datos propios de los usuarios (perfiles, favoritos, etc.).

**Arquitectura General**: El proyecto utiliza una arquitectura **Full-Stack Next.js** con API Routes integradas.

> **Nota de Migración**: El backend ha sido migrado de Laravel/PHP a Next.js API Routes (TypeScript). Para más detalles, consulta [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md).

*   **Backend**: API Routes integradas en Next.js escritas en **TypeScript**. Responsable de la lógica de negocio, autenticación (NextAuth.js) y proxy seguro a la API de TMDB.
*   **Frontend**: Una SPA dinámica y reactiva construida con **Next.js 15 (React 19)** y escrita en **TypeScript**. Es responsable de toda la interfaz de usuario y la experiencia de navegación.
*   **Base de Datos**: PostgreSQL gestionada mediante **Prisma ORM**. Modelos para `users`, `favorites`, `reviews` y tablas de autenticación de NextAuth.js.
*   **Contenerización**: Todo el entorno de desarrollo está completamente contenerizado con **Docker**, lo que facilita enormemente la configuración y la consistencia entre desarrolladores.

**Tecnologías Principales**:

| Área | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Backend** | Next.js API Routes | API integrada en el mismo proyecto |
| | NextAuth.js (Auth.js) | Autenticación de API para la SPA |
| | Prisma ORM | Interacción con la base de datos (PostgreSQL) |
| | TypeScript | Tipado estático para robustez del código |
| **Frontend**| Next.js 15, React 19 | Framework principal de la SPA |
| | TypeScript | Tipado estático para robustez del código |
| | Zustand | Gestión de estado global |
| | Tailwind CSS | Estilizado de la interfaz (Utility-first) |
| | React Hook Form | Gestión de formularios |
| | GSAP | Animaciones |
| **DevOps** | Docker, Docker Compose | Contenerización y orquestación del entorno |
| | GitHub | Control de versiones |
| **Despliegue** | AWS | Amazon Web Services|
| | EC2 | Servicio de AWS para alojar la aplicación y la base de datos |
| | Nginx | Manejo de proxies |

## 2. Puntos para Onboarding de Nuevos Desarrolladores

Para empezar a trabajar en el proyecto, un nuevo desarrollador debería seguir estos pasos:

1.  Clonar el repositorio de GitHub.
2.  Asegurarse de tener Node.js (v18+), Docker y Docker Compose instalados.
3.  Navegar a la carpeta `pixela-frontend`.
4.  Crear el archivo `.env.local` ejecutando `cp .env.local.example .env.local`.
5.  Configurar las variables de entorno en `.env.local`:
    - `DATABASE_URL`: URL de conexión a PostgreSQL
    - `NEXTAUTH_SECRET`: Generar con `openssl rand -base64 32`
    - `TMDB_API_KEY`: Tu clave de API de TMDB
6.  Instalar las dependencias: ejecutar `npm install`.
7.  Generar el cliente de Prisma: `npx prisma generate`.
8.  Ejecutar las migraciones: `npx prisma migrate dev`.
9.  Ejecutar el servidor de desarrollo: `npm run dev`.

## 3. Estructura del Proyecto

El proyecto utiliza una arquitectura Full-Stack Next.js:

```
pixela/
├── pixela-backend/      # [LEGACY] Proyecto de la API en Laravel (se puede eliminar)
│
├── pixela-frontend/     # Proyecto Full-Stack en Next.js
│   ├── prisma/          # Schema de Prisma y migraciones
│   │   └── schema.prisma # Definición de modelos de la base de datos
│   ├── src/             # Código fuente
│   │   ├── app/         # Enrutado basado en carpetas (App Router)
│   │   │   ├── api/     # API Routes (backend integrado)
│   │   │   │   ├── auth/       # Autenticación (NextAuth.js)
│   │   │   │   ├── movies/     # Endpoints de películas
│   │   │   │   ├── series/     # Endpoints de series
│   │   │   │   ├── favorites/  # Endpoints de favoritos
│   │   │   │   ├── reviews/    # Endpoints de reseñas
│   │   │   │   ├── users/      # Endpoints de usuarios
│   │   │   │   └── tmdb/       # Endpoints de TMDB
│   │   │   └── (rutas)/        # Grupo de rutas de la aplicación
│   │   ├── lib/         # Utilidades y servicios
│   │   │   ├── services/       # Servicios de TMDB (TypeScript)
│   │   │   ├── db/             # Cliente de Prisma
│   │   │   ├── auth.ts         # Configuración de NextAuth.js
│   │   │   └── api-utils.ts    # Utilidades para API Routes
│   │   ├── features/    # Componentes y lógica por funcionalidad
│   │   ├── stores/      # Stores de Zustand para estado global
│   │   ├── shared/      # Componentes y utilidades reutilizables
│   │   └── types/       # Definiciones de tipos TypeScript
│   ├── package.json     # Dependencias de JavaScript
│   └── next.config.js   # Configuración de Next.js
│
├── MIGRATION_GUIDE.md   # Guía de migración de Laravel a Next.js
└── README.md            # Este archivo
```

## 4. Endpoints de la API

### TMDB, Películas y Series (Público)

Estas rutas actúan como un proxy a la API de TMDB. El backend de Pixela gestiona la caché para optimizar las peticiones.

*   `GET /api/tmdb/categories`: Obtiene todos los géneros.
*   `GET /api/tmdb/trending`: Obtiene las tendencias generales.

#### Películas
*   `GET /api/movies/trending`: Obtiene las películas en tendencia.
*   `GET /api/movies/discover`: Obtiene las películas por descubrir.
*   `GET /api/movies/now-playing`: Obtiene las películas que están en cines.
*   `GET /api/movies/top-rated`: Obtiene las películas mejor valoradas.
*   `GET /api/movies/search?query=...`: Busca películas.
*   `GET /api/movies/{id}`: Obtiene los detalles de una película.
*   `GET /api/movies/{id}/cast`: Obtiene el reparto de una película.
*   `GET /api/movies/{id}/videos`: Obtiene los vídeos (trailers, etc.) de una película.
*   `GET /api/movies/{id}/watch-providers`: Obtiene los proveedores de streaming de una película.
*   `GET /api/movies/{id}/creator`: Obtiene el director/creador de la película.
*   `GET /api/movies/{id}/images`: Obtiene las imágenes de una película.
*   `GET /api/movies/{id}/reviews`: Obtiene las reseñas de TMDB de una película.

#### Series
*   `GET /api/series/trending`: Obtiene las series en tendencia.
*   `GET /api/series/discover`: Obtiene series por descubrir.
*   `GET /api/series/on-the-air`: Obtiene las series en emisión.
*   `GET /api/series/top-rated`: Obtiene las series mejor valoradas.
*   `GET /api/series/search?query=...`: Busca series.
*   `GET /api/series/{id}`: Obtiene los detalles de una serie.
*   `GET /api/series/{id}/cast`: Obtiene el reparto de una serie.
*   `GET /api/series/{id}/videos`: Obtiene los vídeos (trailers, etc.) de una serie.
*   `GET /api/series/{id}/watch-providers`: Obtiene los proveedores de streaming de una serie.
*   `GET /api/series/{id}/images`: Obtiene las imágenes de una serie.
*   `GET /api/series/{id}/reviews`: Obtiene las reseñas de TMDB de una serie.

## 5. Convenciones de Código

*   **Frontend**: Se utiliza **ESLint** con la configuración de Next.js. Adicionalmente, se emplea la convención de agrupar las clases de Tailwind CSS en constantes inmutables (`const styles = { ... }`) para mejorar la legibilidad y el mantenimiento del código.
*   **Backend**: Se utiliza **Laravel Pint**, la herramienta oficial de formateo de Laravel, lo que garantiza un estilo de código PHP consistente y profesional.

## 6. Glosario de Términos

*   **Prisma**: ORM moderno para Node.js y TypeScript que facilita el acceso a bases de datos con tipado seguro.
*   **NextAuth.js (Auth.js)**: Sistema de autenticación para Next.js que soporta múltiples proveedores y estrategias.
*   **GSAP (GreenSock Animation Platform)**: Una potente librería de JavaScript para crear animaciones de alto rendimiento.
*   **Next.js App Router**: El nuevo sistema de enrutado de Next.js basado en la estructura de carpetas dentro de `/app`.
*   **Next.js API Routes**: Endpoints de API integrados en Next.js que se crean en la carpeta `/app/api`.
*   **React Hook Form**: Una librería para la gestión de formularios en React que optimiza el rendimiento y simplifica la validación.
*   **Tailwind CSS**: Un framework de CSS "utility-first" que permite construir diseños directamente en el HTML escribiendo clases predefinidas.
*   **TMDB**: The Movie Database, una popular API externa con información sobre películas y series.
*   **Zustand**: Una librería de gestión de estado para React, conocida por su simplicidad y bajo peso.
