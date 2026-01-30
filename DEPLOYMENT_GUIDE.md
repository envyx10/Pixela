# 🚀 Guía de Despliegue en Vercel - Pixela

Esta guía detalla los pasos exactos y configuraciones necesarias para desplegar la aplicación **Pixela** en Vercel correctamente, evitando errores comunes de configuración, rutas y variables de entorno.

## 📋 1. Requisitos Previos

Antes de intentar desplegar, asegúrate de:
1.  Que tu código **compila localmente**: Ejecuta `npm run build` en tu terminal (dentro de la carpeta `pixela`) y verifica que termine con éxito (Exit code: 0).
2.  Que todos tus cambios están subidos a la rama `main` en GitHub.

## ⚙️ 2. Configuración del Proyecto en Vercel

Si es la primera vez que configuras el proyecto o lo estás creando desde cero:

1.  **Importar Repositorio:** Selecciona tu repositorio `Pixela-studio/Pixela`.
2.  **Root Directory (¡CRÍTICO!):**
    *   Como el proyecto está dentro de una subcarpeta, debes editar esta opción.
    *   Cambia `./` por **`pixela`**.
    *   Si no haces esto, Vercel no encontrará el `package.json` y el build fallará.
3.  **Framework Preset:** Déjalo en `Next.js`.

## 🔐 3. Variables de Entorno (Environment Variables)

Esta es la parte más importante para que la API funcione en producción.

**NO COPIES** tu archivo `.env.local` tal cual si tiene referencias a `localhost`. Debes adaptar las URLs.

Ve a **Settings > Environment Variables** y configura lo siguiente:

| Variable | Valor en Producción | Descripción |
|----------|---------------------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://TU-DOMINIO.vercel.app/api` | **Vital.** Debe ser la URL completa con HTTPS. Si pones solo `/api` o `localhost`, el servidor fallará al obtener datos (SSR). |
| `NEXT_PUBLIC_FRONTEND_URL`| `https://TU-DOMINIO.vercel.app` | Tu dominio de producción. |
| `NEXT_PUBLIC_BACKEND_URL` | `https://TU-DOMINIO.vercel.app` | Tu dominio de producción. |
| `DATABASE_URL` | *(Tu conexión de Supabase/MongoDB)* | Igual que en local. |
| `DIRECT_URL` | *(Tu conexión directa)* | Igual que en local. |
| `TMDB_API_KEY` | *(Tu API Key)* | Igual que en local. |
| `TMDB_BASE_URL` | `https://api.themoviedb.org/3` | Igual que en local. |
| `AUTH_SECRET` | *(Tu secreto generado)* | Igual que en local. |

> **Nota:** Si es tu primer despliegue y aún no sabes tu dominio `vercel.app`, puedes desplegar primero con las URLs vacías, copiar el dominio que te asigne Vercel, actualizar las variables y **Redeployar**.

## 🔄 4. Flujo de Trabajo Habitual (CI/CD)

Una vez configurado, el despliegue es automático:

1.  Haces cambios en tu código local.
2.  Haces `git push origin main`.
3.  Vercel detecta el cambio y empieza a construir automáticamente.
4.  En unos minutos, tu web se actualiza sola.

## 🆘 5. Solución de Problemas Comunes

### "He actualizado las variables pero la web sigue rota"
⚠️ **Causa:** Las variables de entorno **NO** se actualizan en tiempo real en la web ya desplegada.
✅ **Solución:** Tienes que ir a la pestaña **Deployments**, hacer clic en los 3 puntos (`...`) del último deploy y seleccionar **Redeploy**. Esto reconstruye la app "inyectando" los nuevos valores.

### "No veo las imágenes o datos de la API (Error de carga)"
⚠️ **Causa:** Probablemente `NEXT_PUBLIC_API_URL` está apuntando a `localhost` o está mal escrita.
✅ **Solución:** Revisa que la variable tenga la URL completa (`https://.../api`) y haz **Redeploy**.

### "El despliegue no se inicia automáticamente al hacer push"
⚠️ **Causa:** Vercel ha perdido la conexión con GitHub (común si cambias el nombre del repo u organización).
✅ **Solución:** Ve a **Settings > Git** en Vercel, desconecta el repositorio y vuélvelo a conectar. O usa `git commit --allow-empty -m "trigger deploy"` para forzar un evento.

---
**Resumen Rápido:**
1. Root Directory = `pixela`
2. Variables URL = Dominio real (NO localhost)
3. Cambias variable = **REDEPLOY OBLIGATORIO**
