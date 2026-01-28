# 🛠️ Pixela - Guía Maestra para Desarrolladores

> **⚠️ DOCUMENTO PRIVADO:** Este archivo contiene el conocimiento técnico acumulado, la configuración de infraestructura y las directrices críticas de mantenimiento. No debe ser compartido ni subido a repositorios públicos.

---

## 1. 🚀 Configuración del Entorno de Desarrollo (Local)

Para que el proyecto corra perfectamente en tu máquina:

### Requisitos Previos
- **Node.js:** v18 o superior.
- **Docker & Docker Compose:** Necesario para la base de datos local.
- **Prisma CLI:** Instalado globalmente o usado vía `npx`.

### Paso a Paso para el Setup
1. **Instalación:** `npm install`
2. **Infraestructura Local:** Levantar el contenedor de PostgreSQL:
   ```powershell
   docker-compose -f docker-compose.db.yml up -d
   ```
3. **Sincronización de Base de Datos:**
   ```powershell
   npx prisma generate  # Genera el cliente basado en el schema
   npx prisma db push   # Sincroniza las tablas del schema.prisma con tu base de datos local
   ```
4. **Variables de Entorno:** Crea un archivo `.env` en la carpeta `pixela/` basado en `.env.local.example`.

---

## 2. 🔐 Gestión de Datos Sensibles (Producción)

Pixela utiliza **Supabase** (BD) y **Vercel** (Hosting). Aquí están las claves que nunca deben faltar en el panel de control de producción:

- **DATABASE_URL:** URL con protocolo `pgbouncer=true` si se despliega en Serverless.
- **AUTH_SECRET:** Clave de 32 caracteres para firmar las cookies de sesión (Auth.js).
- **NEXTAUTH_URL:** La URL base de la aplicación (ej: `https://pixela-app.com`).
- **TMDB_API_KEY:** Credencial otorgada por The Movie Database.

---

## 3. 🏗️ Arquitectura de la Base de Datos (Prisma)

Cualquier cambio en el modelo de datos debe hacerse en `prisma/schema.prisma`. 

**Reglas de Oro:**
- **Nombres de campos:** Siempre en **snake_case** en la base de datos (`@map("field_name")`) pero **camelCase** en el código TypeScript.
- **Relaciones:** Si borras un usuario, sus favoritos y reseñas deben borrarse automáticamente (`onDelete: Cascade`).
- **BigInt:** Los IDs de TMDB son `BigInt` para evitar problemas de desbordamiento en el futuro.

---

## 4. 🔄 Flujo de Trabajo y Despliegue Oficial

1. **Desarrollo:** Trabajar en ramas o directamente en `main` solo para hotfixes.
2. **Verificación:** Antes de cada build, ejecutar `npm run lint` para asegurar la calidad del código.
3. **Build:** El comando de construcción oficial es:
   ```bash
   npx prisma generate && next build
   ```
4. **Despliegue:** Al hacer merge a la rama `main`, Vercel detecta el cambio y despliega la nueva versión en menos de 2 minutos.

---

## 5. 💡 Notas Técnicas de Valor

- **TMDB Proxy:** Nunca hagas fetch a TMDB directamente desde componentes del cliente. Usa siempre los endpoints `/api/...` para mantener la API KEY segura en el servidor.
- **Imágenes:** Usamos el componente `<Image />` de Next.js. Si añades un nuevo dominio de imágenes, regístralo en `next.config.js`.
- **Sesiones:** La sesión del usuario está disponible tanto en Client Components (con `useSession`) como en Server Components/API Routes (con `auth()`).

---
*Pixela Core Team - Manteniendo viva la magia del cine.*
