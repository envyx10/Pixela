# Plan de Migración a Full Stack Next.js

Este documento detalla la estrategia y los pasos técnicos para migrar Pixela de una arquitectura híbrida (Laravel + Next.js) a una arquitectura unificada "Full Stack Next.js".

## 🎯 Objetivo
Eliminar la dependencia de Laravel (PHP) y consolidar toda la lógica (Backend, Frontend, Base de Datos, Autenticación) en un único proyecto Next.js escrito en TypeScript. Esto facilitará el despliegue en plataformas serverless como Vercel y reducirá la deuda técnica.

## 🛠️ Stack Tecnológico de Destino
-   **Framework**: Next.js 15 (App Router).
-   **Lenguaje**: TypeScript.
-   **Base de Datos**: PostgreSQL (Recomendado: Neon Tech o Supabase) o MySQL (PlanetScale).
-   **ORM**: Prisma (para interactuar con la BBDD).
-   **Autenticación**: Auth.js v5 (anteriormente NextAuth.js).
-   **Cliente HTTP**: Fetch API nativa (reemplazando Axios/Guzzle).
-   **Validación**: Zod.

---

## 📅 Fases de la Migración

### Fase 1: Preparación del Entorno
1.  **Crear nueva rama**: `git checkout -b feature/full-stack-migration`
2.  **Configurar Base de Datos**:
    -   Instalar PostgreSQL localmente o crear instancia en la nube (Neon/Supabase).
    -   Obtener la `DATABASE_URL`.
3.  **Configurar Prisma**:
    -   Ejecutar `npm install prisma --save-dev` y `npm install @prisma/client` en `pixela-frontend`.
    -   Inicializar prisma: `npx prisma init`.

### Fase 2: Definición del Esquema de Datos (Schema.prisma)
Traducir las migraciones de Laravel (`users`, `favorites`, `reviews`) al formato de Prisma.

**Ejemplo de `schema.prisma` propuesto:**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            Int       @id @default(autoincrement()) @map("user_id")
  name          String
  email         String    @unique
  password      String?   // Opcional para logins sociales
  photoUrl      String?   @map("photo_url")
  emailVerified DateTime? @map("email_verified_at")
  isAdmin       Boolean   @default(false) @map("is_admin")
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")

  favorites     Favorite[]
  reviews       Review[]

  @@map("users")
}

model Favorite {
  id        Int      @id @default(autoincrement()) @map("favorite_id")
  userId    Int      @map("user_id")
  itemType  ItemType @map("item_type") // Enum: MOVIE, SERIES
  tmdbId    BigInt   @map("tmdb_id")
  createdAt DateTime @default(now()) @map("created_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, itemType, tmdbId])
  @@map("favorites")
}

model Review {
  id        Int      @id @default(autoincrement()) @map("review_id")
  userId    Int      @map("user_id")
  itemType  ItemType @map("item_type")
  tmdbId    BigInt   @map("tmdb_id")
  rating    Decimal  @db.Decimal(3, 1)
  review    String?  @db.Text
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, itemType, tmdbId])
  @@map("reviews")
}

enum ItemType {
  movie
  series
}
```

### Fase 3: Migración de Autenticación (Auth.js)
El mayor cambio. Dejaremos de usar Laravel Sanctum para usar Auth.js.

1.  **Instalar Auth.js**: `npm install next-auth@beta`
2.  **Configurar Proveedores**:
    -   `CredentialsProvider`: Para email/password (requiere bcryptjs para comparar contraseñas).
    -   (Opcional) `GoogleProvider`, `GitHubProvider`.
3.  **Crear manejador de rutas**: `src/app/api/auth/[...nextauth]/route.ts`.
4.  **Actualizar Frontend**:
    -   Reemplazar llamadas a `login()` custom por `signIn()`.
    -   Reemplazar `useAuthStore` por `useSession()` de `next-auth/react`.
    -   Crear páginas de Login y Register nativas en Next.js (`src/app/login/page.tsx`, `src/app/register/page.tsx`).

### Fase 4: Migración de API y Lógica de Negocio
Mover la lógica de los controladores de Laravel a "Route Handlers" de Next.js (`src/app/api/...`) o "Server Actions".

1.  **Proxy TMDB**:
    -   Migrar `TmdbController` a endpoints en Next.js.
    -   Ejemplo: `src/app/api/movies/trending/route.ts` que hace fetch a TMDB usando la `TMDB_API_KEY` (server-side para protegerla).
2.  **Gestión de Favoritos/Reviews**:
    -   Crear endpoints GET, POST, DELETE en `src/app/api/favorites/route.ts`.
    -   Usar Prisma para consultar/insertar en la BBDD.
    -   Verificar sesión del usuario con `auth()` antes de permitir cambios.

### Fase 5: Limpieza y Refactorización Frontend
1.  **Eliminar Axios Interceptors**: Ya no necesitamos gestionar tokens CSRF manualmente ni cookies de Laravel.
2.  **Actualizar llamadas fetch**: Apuntar a `/api/movies/...` en lugar de `process.env.NEXT_PUBLIC_API_URL`.
3.  **Eliminar carpeta Backend**: Una vez todo funcione, borrar `pixela-backend`, `docker-compose.yml`, etc.

## 🚀 Despliegue Final
Con esta arquitectura, el despliegue es trivial:
1.  Hacer push a GitHub.
2.  Conectar repositorio a Vercel.
3.  Configurar variables de entorno (`DATABASE_URL`, `AUTH_SECRET`, `TMDB_API_KEY`).
4.  ¡Listo!

## ✅ Checklist de Éxito
- [ ] La base de datos está creada y accesible.
- [ ] Se puede registrar un usuario y hacer login (sesión persiste).
- [ ] Se cargan películas desde TMDB (API interna funciona).
- [ ] Se pueden añadir favoritos y reviews (BBDD funciona).
- [ ] No existen dependencias de PHP/Laravel.
