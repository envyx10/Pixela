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

**Arquitectura General**: El proyecto sigue una arquitectura de **API Headless + SPA (Single Page Application)** desacoplada.

*   **Backend**: Una API RESTful robusta construida con **Laravel 12 (PHP)**. Es responsable de la lógica de negocio, la autenticación de usuarios y de actuar como un proxy seguro para la API externa de películas/series.
*   **Frontend**: Una SPA dinámica y reactiva construida con **Next.js 15 (React 19)** y escrita en **TypeScript**. Es responsable de toda la interfaz de usuario y la experiencia de navegación.
*   **Base de Datos**: El backend utiliza un sistema de base de datos relacional gestionado a través del ORM de Laravel, **Eloquent**. Los modelos indican una base de datos con tablas para `users`, `favorites` y `reviews`.
*   **Contenerización**: Todo el entorno de desarrollo está completamente contenerizado con **Docker**, lo que facilita enormemente la configuración y la consistencia entre desarrolladores.

**Tecnologías Principales**:

| Área | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Backend** | Laravel 12, PHP 8.2 | Framework principal de la API |
| | Laravel Sanctum | Autenticación de API para la SPA |
| | Eloquent ORM | Interacción con la base de datos |
| | Guzzle | Peticiones HTTP |
| | l5-swagger | Documentación de API (OpenAPI) |
| **Frontend**| Next.js 15, React 19 | Framework principal de la SPA |
| | TypeScript | Tipado estático para robustez del código |
| | Zustand | Gestión de estado global |
| | Tailwind CSS | Estilizado de la interfaz (Utility-first) |
| | React Hook Form | Gestión de formularios |
| | GSAP | Animaciones |
| **DevOps** | Docker, Docker Compose | Contenerización y orquestación del entorno |
| | Laravel Sail | Abstracción sobre Docker para Laravel |
| | GitHub | Control de versiones |
| **Despliegue** | AWS | Amazon Web Services|
| | EC2 | Servicio de AWS para alojar la aplicación y la base de datos |
| | Nginx | Manejo de proxies |

## 2. Puntos para Onboarding de Nuevos Desarrolladores

Para empezar a trabajar en el proyecto, un nuevo desarrollador debería seguir estos pasos:

1.  Clonar el repositorio de GitHub.
2.  Asegurarse de tener Docker y Docker Compose instalados.
3.  Navegar a la carpeta `pixela-backend` y crear el archivo `.env` ejecutando `cp .env.example .env`.
4.  Instalar las dependencias del backend: ejecutar `composer install` y `npm install`.
5.  Ejecutar `docker-compose up -d` (o el script personalizado si existe, como `make up`, `sail up` o `./vendor/bin/sail up`). Esto levantará todos los servicios (PHP, Next.js, base de datos).
6.  Una vez levantado, ejecutar las migraciones de la base de datos con `docker-compose exec app php artisan migrate` o si se usa Sail `sail artisan migrate` o `./vendor/bin/sail artisan migrate`.
7.  Instalar las dependencias del frontend: navegar a `pixela-frontend` y ejecutar `npm install`.
8.  Ejecutar el servidor de desarrollo en el backend con `npm run dev` y `sudo systemctl stop apache2`.
9.  El servidor de desarrollo del front ya se ejecuta automáticamente al levantar los contenedores de Docker

## 3. Estructura del Proyecto

El proyecto es un monorepo con una separación clara entre el cliente y el servidor:

```
pixela/
├── pixela-backend/      # Proyecto de la API en Laravel
│   ├── app/             # Núcleo de la aplicación: Modelos, Controladores, etc.
│   │   ├── Http/
│   │   │   └── Controllers/ # Lógica para manejar las peticiones HTTP
│   │   └── Models/        # Modelos de Eloquent (User, Favorite, Review)
│   ├── config/          # Archivos de configuración de Laravel
│   ├── database/        # Migraciones y seeders de la base de datos
│   ├── routes/          # Definición de las rutas (api.php, auth.php)
│   ├── composer.json    # Dependencias de PHP
│   └── Dockerfile.dev   # Definición del contenedor de desarrollo
│
└── pixela-frontend/     # Proyecto de la SPA en Next.js
    ├── src/             # Código fuente del frontend
    │   ├── app/         # Enrutado basado en carpetas (App Router)
    │   │   └── (rutas)/ # Grupo de rutas principal de la aplicación
    │   ├── api/         # Lógica para comunicarse con el backend
    │   ├── features/    # Componentes y lógica agrupados por funcionalidad
    │   ├── stores/      # Stores de Zustand para el estado global
    │   └── shared/      # Componentes y utilidades reutilizables
    ├── package.json     # Dependencias de JavaScript
    └── next.config.js   # Configuración de Next.js
```

## 4. Endpoints de la API

### TMDB, Películas y Series (Público)

Estas rutas actúan como un proxy a la API de TMDB. La caché interna del backend de Pixela se gestiona a través de estas rutas para no sobresaturar de peticiones a la API de TMDB.

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

*   **Eloquent**: El ORM (Object-Relational Mapper) de Laravel. Permite interactuar con la base de datos usando objetos y clases de PHP en lugar de SQL crudo.
*   **GSAP (GreenSock Animation Platform)**: Una potente librería de JavaScript para crear animaciones de alto rendimiento.
*   **Guzzle**: Cliente PHP HTTP que facilita el envío de peticiones HTTP y hace trivial la integración con servicios web.
*   **Headless API**: Una API que solo se encarga de los datos y la lógica, sin generar ninguna interfaz de usuario. El "head" (frontend) está desacoplado.
*   **Laravel Sail**: Una interfaz de línea de comandos ligera para interactuar con el entorno de desarrollo Docker por defecto de Laravel.
*   **Next.js App Router**: El nuevo sistema de enrutado de Next.js basado en la estructura de carpetas dentro de `/app`.
*   **React Hook Form**: Una librería para la gestión de formularios en React que optimiza el rendimiento y simplifica la validación.
*   **Sanctum**: El sistema de autenticación de Laravel para SPAs y APIs.
*   **Tailwind CSS**: Un framework de CSS "utility-first" que permite construir diseños directamente en el HTML escribiendo clases predefinidas.
*   **TMDB**: The Movie Database, una popular API externa con información sobre películas y series.
*   **Zustand**: Una librería de gestión de estado para React, conocida por su simplicidad y bajo peso.
