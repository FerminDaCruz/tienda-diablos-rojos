# Configuración de Firebase para Tienda Diablos Rojos

## Pasos para configurar Firebase

### 1. Crear proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear un proyecto"
3. Nombra tu proyecto (ej: "tienda-diablos-rojos")
4. Habilita Google Analytics (opcional)
5. Completa la configuración

### 2. Configurar Firestore Database

1. En el panel de Firebase, ve a "Firestore Database"
2. Haz clic en "Crear base de datos"
3. Selecciona "Iniciar en modo de prueba" (para desarrollo)
4. Elige una ubicación cercana (ej: us-central1)

### 3. Obtener credenciales de configuración

1. Ve a "Configuración del proyecto" (ícono de engranaje)
2. Desplázate hasta "Tus aplicaciones"
3. Haz clic en el ícono web `</>`
4. Registra tu app con un nombre (ej: "tienda-web")
5. Copia las credenciales de configuración

### 4. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id

# Admin Credentials
NEXT_PUBLIC_ADMIN_USERNAME=admin
NEXT_PUBLIC_ADMIN_PASSWORD=diablos2024
```

### 5. Configurar reglas de seguridad de Firestore

En Firebase Console, ve a "Firestore Database" > "Reglas" y reemplaza las reglas con:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura pública de productos
    match /productos/{document} {
      allow read: if true;
      allow write: if false; // Solo desde el panel admin
    }
  }
}
```

### 6. Poblar la base de datos con datos de ejemplo

1. Instala las dependencias de Firebase en el proyecto:

```bash
npm install firebase
```

2. Actualiza el archivo `scripts/populate-firebase.js` con tus credenciales de Firebase

3. Ejecuta el script para poblar la base de datos:

```bash
node scripts/populate-firebase.js
```

### 7. Estructura de la colección de productos

La colección `productos` debe tener documentos con la siguiente estructura:

```javascript
{
  titulo: "string",
  descripcion: "string",
  precio: number,
  imagen: "string (URL)",
  categoria: "string",
  destacado: boolean,
  stock: number,
  fechaCreacion: Timestamp,
  fechaActualizacion: Timestamp
}
```

### 8. Configurar Storage (opcional)

Si quieres subir imágenes:

1. Ve a "Storage" en Firebase Console
2. Haz clic en "Comenzar"
3. Acepta las reglas por defecto
4. Elige una ubicación

### 9. Panel de administración

-   URL: `http://localhost:3000/admin`
-   Usuario: `admin`
-   Contraseña: `diablos2024`

### 10. Funcionalidades implementadas

✅ **Panel de administración** (`/admin`)

-   Login con credenciales
-   CRUD completo de productos
-   Lista de productos con filtros
-   Formulario de creación/edición

✅ **Catálogo** (`/catalogo`)

-   Lista de todos los productos
-   Búsqueda por texto
-   Filtros por categoría, precio, destacados
-   Vista responsive

✅ **Detalles de producto** (`/producto/[id]`)

-   Información completa del producto
-   Navegación breadcrumb
-   Información de stock

✅ **Productos destacados** (página principal)

-   Carrusel de productos destacados
-   Integración con Firebase
-   Estados de carga y error

### 11. Comandos útiles

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start
```

### 12. Solución de problemas

**Error de conexión a Firebase:**

-   Verifica que las credenciales en `.env.local` sean correctas
-   Asegúrate de que el proyecto Firebase esté activo

**Error de permisos:**

-   Revisa las reglas de seguridad de Firestore
-   Verifica que la colección `productos` exista

**Error de CORS:**

-   Firebase maneja CORS automáticamente, no debería ser necesario configurarlo

### 13. Próximos pasos recomendados

1. **Autenticación de usuarios**: Implementar Firebase Auth
2. **Carrito de compras**: Agregar funcionalidad de carrito
3. **Pagos**: Integrar pasarela de pagos
4. **Notificaciones**: Implementar Firebase Cloud Messaging
5. **Analytics**: Configurar Firebase Analytics
6. **Backup**: Configurar backups automáticos
7. **Optimización**: Implementar paginación y lazy loading

¡Tu tienda de Diablos Rojos está lista para funcionar con Firebase! 🔥⚽
