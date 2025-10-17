# 🔥 Tienda Diablos Rojos

Tienda online oficial del Club Atlético Independiente construida con Next.js y Supabase.

## 🚀 Características

-   **Panel de Administración**: Gestión completa de productos
-   **Catálogo Dinámico**: Búsqueda y filtros avanzados
-   **Almacenamiento de Imágenes**: Integrado con Supabase Storage
-   **Responsive Design**: Optimizado para móviles y desktop
-   **Base de Datos en Tiempo Real**: Powered by Supabase

## 🛠️ Tecnologías

-   **Frontend**: Next.js 15, React 19, TypeScript
-   **Backend**: Supabase (PostgreSQL + Storage)
-   **Styling**: Tailwind CSS
-   **Forms**: React Hook Form + Zod
-   **Icons**: React Icons

## 📦 Instalación

1. **Clona el repositorio**

    ```bash
    git clone <tu-repo>
    cd tienda-diablos-rojos
    ```

2. **Instala dependencias**

    ```bash
    npm install
    ```

3. **Configura Supabase**

    ```bash
    npm run setup-supabase
    ```

    Sigue las instrucciones para configurar tu proyecto Supabase.

4. **Pobla la base de datos (opcional)**

    ```bash
    npm run populate-db
    ```

5. **Ejecuta en desarrollo**
    ```bash
    npm run dev
    ```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` con:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
NEXT_PUBLIC_ADMIN_USERNAME=admin
NEXT_PUBLIC_ADMIN_PASSWORD=tu-password-seguro
```

### Base de Datos

Ejecuta el SQL proporcionado en `SUPABASE_SETUP.md` para crear la tabla de productos.

### Storage

Configura un bucket llamado `productos` en Supabase Storage como público.

## 📱 Uso

### Panel de Administración

-   URL: `http://localhost:3000/admin`
-   Usuario: `admin` (por defecto)
-   Contraseña: `diablos2024` (por defecto)

### Páginas Principales

-   **Inicio**: `http://localhost:3000`
-   **Catálogo**: `http://localhost:3000/catalogo`
-   **Producto**: `http://localhost:3000/producto/[id]`
-   **Sobre Nosotros**: `http://localhost:3000/sobre-nosotros`

## 🗂️ Estructura del Proyecto

```
src/
├── app/                    # Páginas de Next.js
│   ├── admin/             # Panel de administración
│   ├── catalogo/          # Catálogo de productos
│   ├── producto/[id]/     # Detalles de producto
│   └── sobre-nosotros/     # Página informativa
├── components/             # Componentes React
│   ├── admin/             # Componentes del admin
│   ├── layout/            # Header y Footer
│   └── sections/          # Secciones de la página
├── hooks/                 # Custom hooks
├── lib/                   # Configuración de Supabase
├── services/              # Servicios de datos
└── types/                 # Tipos de TypeScript
```

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

### Otras Plataformas

Configura las variables de entorno en tu plataforma de hosting.

## 📊 Scripts Disponibles

```bash
npm run dev              # Desarrollo
npm run build           # Construir para producción
npm run start           # Ejecutar en producción
npm run lint            # Verificar código
npm run setup-supabase  # Configurar Supabase
npm run populate-db      # Poblar base de datos
```

## 🔒 Seguridad

-   **RLS (Row Level Security)** habilitado en Supabase
-   **Políticas de seguridad** configuradas
-   **Validación de formularios** con Zod
-   **Sanitización de datos** en todos los inputs

## 📈 Próximas Funcionalidades

-   [ ] Autenticación de usuarios
-   [ ] Carrito de compras
-   [ ] Sistema de pagos
-   [ ] Notificaciones push
-   [ ] Analytics avanzado
-   [ ] Sistema de reviews

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas:

1. Revisa `SUPABASE_SETUP.md` para configuración
2. Verifica las variables de entorno
3. Asegúrate de que Supabase esté configurado correctamente
4. Abre un issue en GitHub

---

**¡Vamos Diablos! 🔥⚽**
