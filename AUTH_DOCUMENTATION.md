# Sistema de Autenticación - Documentación

## Resumen de Implementación

Se ha implementado un sistema completo de autenticación que utiliza la API `api/v1/auth/login` del backend y protege la ruta del dashboard.

## Archivos Creados/Modificados

### Nuevos Archivos:
1. **`contexts/AuthContext.tsx`** - Contexto de React para manejar el estado de autenticación
2. **`components/protected-route.tsx`** - Componente para proteger rutas privadas
3. **`lib/auth-api.ts`** - Utilidades para llamadas a la API de autenticación
4. **`middleware.ts`** - Middleware de Next.js para protección de rutas
5. **`.env.local`** - Variables de entorno (ya existía, contiene `NEXT_PUBLIC_API_BASE_URL`)

### Archivos Modificados:
1. **`app/layout.tsx`** - Agregado AuthProvider
2. **`app/dashboard/layout.tsx`** - Agregado protección con ProtectedRoute y botón de logout
3. **`app/corporate-login/page.tsx`** - Integrado con el sistema de autenticación

## Funcionalidades Implementadas

### ✅ Autenticación
- Login usando `api/v1/auth/login`
- Validación de token en el servidor
- Manejo de sesión con localStorage y cookies
- Logout con limpieza de datos

### ✅ Protección de Rutas
- Solo `/dashboard/*` requiere autenticación
- Todas las demás rutas son públicas
- Redirección automática al login si no autenticado
- Redirección al dashboard si ya autenticado e intenta acceder al login

### ✅ Estado de Autenticación
- Contexto React global para el estado de usuario
- Persistencia de sesión entre recargas
- Validación automática de token al iniciar

## Configuración del Backend

El sistema está configurado para usar la URL del backend desde `.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=https://salvation-owner-georgia-pn.trycloudflare.com
```

### Endpoints Esperados

1. **POST** `/api/v1/auth/login`
   ```json
   // Request
   {
     "email": "usuario@ejemplo.com",
     "password": "contraseña",
     "companyCode": "opcional"
   }
   
   // Response (exitoso)
   {
     "token": "jwt_token_aqui",
     "user": {
       "id": "user_id",
       "email": "usuario@ejemplo.com",
       "name": "Nombre Usuario",
       "company": "Empresa",
       "avatar": "url_avatar_opcional"
     }
   }
   ```

2. **GET** `/api/v1/auth/validate` (opcional)
   - Headers: `Authorization: Bearer {token}`
   - Response: 200 si válido, 401 si inválido

3. **POST** `/api/v1/auth/logout` (opcional)
   - Headers: `Authorization: Bearer {token}`

## Uso

### Para el Usuario Final:
1. Ir a `/corporate-login`
2. Ingresar email y contraseña
3. Opcionalmente ingresar código de empresa
4. Hacer click en "Sign In to Dashboard"
5. Será redirigido al dashboard si las credenciales son correctas

### Para Logout:
- Hacer click en el botón "Logout" en el header del dashboard
- Será redirigido automáticamente al login

## Rutas Protegidas y Públicas

### 🔒 Rutas Protegidas (requieren autenticación):
- `/dashboard` y todas sus subrutas
- `/dashboard/patients`
- `/dashboard/projects`
- `/dashboard/settings`
- etc.

### 🌍 Rutas Públicas (acceso libre):
- `/` (página principal)
- `/corporate-login`
- `/consultation`
- `/contact`
- `/partnership`
- `/portfolio`
- `/process`
- `/projects`
- `/services`
- `/support`
- `/clientele`
- `/public_dashboard`

## Personalización

### Cambiar URL del Backend:
Editar `.env.local`:
```bash
NEXT_PUBLIC_API_BASE_URL=http://tu-nuevo-backend.com
```

### Agregar Más Rutas Protegidas:
Editar `middleware.ts`:
```typescript
const protectedRoutes = ['/dashboard', '/admin', '/nueva-ruta-privada']
```

### Modificar Datos del Usuario:
El sistema usa los datos que retorna la API en `response.user`. Puedes agregar más campos según necesites.

## Consideraciones de Seguridad

1. **JWT Token**: Se almacena en localStorage y cookie
2. **Validación**: Se valida contra el servidor al iniciar
3. **Expiración**: Las cookies expiran en 7 días
4. **Limpieza**: Se limpia automáticamente en logout o token inválido
5. **HTTPS**: En producción asegúrate de usar HTTPS

## Troubleshooting

### Usuario no puede hacer login:
1. Verificar que la URL del backend en `.env.local` sea correcta
2. Verificar que el endpoint `/api/v1/auth/login` esté funcionando
3. Revisar la consola del navegador para errores de red

### Usuario es redirigido al login constantemente:
1. Verificar que el token se esté guardando correctamente
2. Verificar que el endpoint de validación funcione (si está implementado)
3. Revisar la consola para errores de autenticación

### Middleware no funciona:
1. Asegurarse de que `middleware.ts` esté en la raíz del proyecto
2. Verificar que las rutas en el `matcher` sean correctas
