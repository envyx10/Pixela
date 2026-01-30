# 🛡️ Reporte de Incidente de Seguridad: Inyección SQL (Mitigado)

**Fecha:** 30/01/2026
**Severidad:** Crítica (Mitigada)
**Componentes Afectados:** `/api/auth/register`, `/api/users/[id]`

---

## 🚨 Situación Detectada
Un usuario externo reportó la posibilidad de registrarse con nombres de usuario que contenían cargas útiles de inyección SQL (SQL Injection Payloads).

**Ejemplo de ataque exitoso (antes del fix):**
*   **Payload:** `test4 union select email,null,null from users limit 1--`
*   **Resultado:** El sistema permitía el registro, guardando la cadena maliciosa en la base de datos.
*   **Riesgo:** Aunque Prisma usa consultas parametrizadas (lo que mitiga la ejecución directa), permitir este tipo de cadenas representa un riesgo de *Stored XSS*, problemas de integridad de datos y vulnerabilidades en sistemas futuros que consuman estos datos sin la debida sanitización. Además, el endpoint de actualización de usuario (`PUT`) carecía de validación estricta, siendo un vector de ataque secundario.

---

## 🛠️ Solución Implementada: "Zero Trust & White-Listing"

Se ha implementado una política de **Lista Blanca Estricta (Strict Allow-List)** utilizando Regex y Zod. En lugar de intentar bloquear caracteres "malos" (Blacklisting), ahora solo permitimos explícitamente caracteres "seguros".

### 🔒 Nueva Política de Seguridad
*   Solo se permiten caracteres **Alfanuméricos** (a-z, A-Z, 0-9).
*   Se permiten separadores `. _ -` pero **nunca** al principio/final ni consecutivos.
*   **BLOQUEO TOTAL** de espacios (` `), comillas (`' "`), punto y coma (`;`) y guiones dobles (`--`).

---

## 💻 Código: Antes vs Despues

### ❌ ANTES (Vulnerable / Laxo)
El código permitía casi cualquier string, incluyendo espacios y caracteres especiales típicos de SQL.

```typescript
// src/app/api/auth/register/route.ts
const registerSchema = z.object({
  // ⚠️ PELIGRO: Permite espacios y caracteres que facilitan payloads
  name: z.string().min(2), 
  email: z.string().email(),
  // ...
});

// src/app/api/users/[id]/route.ts
// ⚠️ PELIGRO: Validación manual y débil
if (body.name !== undefined) {
    updateData.name = body.name; 
}
```

### ✅ DESPUÉS (Blindado)
Se ha unificado la validación usando un Regex estricto que hace físicamente imposible escribir una sentencia SQL.

```typescript
// Regex de Seguridad:
// ^[a-zA-Z0-9]+       -> Debe empezar con letra/número
// ([._-][a-zA-Z0-9]+)* -> Puede tener separadores seguidos de más letras/números
// $                   -> Fin de cadena (sin espacios ni basura al final)

const SECURE_NAME_REGEX = /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*$/;

// src/app/api/auth/register/route.ts
const registerSchema = z.object({
  name: z.string()
    .min(2)
    .max(50)
    .regex(SECURE_NAME_REGEX, "El nombre solo puede contener letras, números y ._- (sin espacios)"),
  // ...
});

// src/app/api/users/[id]/route.ts
// Ahora usa Zod para validar también las actualizaciones
const userUpdateSchema = z.object({
  name: z.string()
    .regex(SECURE_NAME_REGEX, "El nombre solo puede contener letras, números y ._- (sin espacios)")
    .optional(),
  // ...
});
```

---

## 🧪 Pruebas de Penetración (Pentesting)

Se realizaron ataques simulados contra la API protegida:

| Payload de Ataque | Intención | Resultado Esperado | Resultado Real | Estado |
|-------------------|-----------|--------------------|----------------|--------|
| `Admin' OR 1=1--` | SQLi Clásico | **400 Bad Request** | **400 Bad Request** | 🛡️ BLOCKED |
| `User UNION SELECT` | Union Based | **400 Bad Request** | **400 Bad Request** | 🛡️ BLOCKED |
| `admin; DROP TABLE` | Stacking | **400 Bad Request** | **400 Bad Request** | 🛡️ BLOCKED |
| `<script>alert(1)` | XSS | **400 Bad Request** | **400 Bad Request** | 🛡️ BLOCKED |
| `valid.user_123` | Uso legítimo | **200 OK / 201 Created** | **201 Created** | ✅ ALLOWED |

---

## 📝 Conclusión
La vulnerabilidad ha sido **completamente mitigada** cerrando la puerta de entrada. No se depende de la capa de base de datos para la seguridad, sino que se rechaza la petición maliciosa en la capa de validación (Zod).

**Recomendación:** Mantener este Regex estricto en cualquier nuevo endpoint que acepte nombres de usuario.
