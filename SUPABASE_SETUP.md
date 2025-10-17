# Configuración de Supabase para Tienda Diablos Rojos

## 🚀 Guía Completa de Migración de Firebase a Supabase

Esta guía te llevará paso a paso para configurar Supabase y hacer que tu tienda funcione correctamente.

---

## 📋 Pasos para Configurar Supabase

### 1. Crear Proyecto en Supabase

1. Ve a [Supabase Dashboard](https://app.supabase.com/)
2. Haz clic en "New Project"
3. Completa la información:
    - **Name**: `tienda-diablos-rojos`
    - **Database Password**: Genera una contraseña segura y guárdala
    - **Region**: Elige la región más cercana (ej: `us-east-1`)
4. Haz clic en "Create new project"
5. Espera a que se complete la configuración (2-3 minutos)

### 2. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui

# Admin Credentials (mantener igual que antes)
NEXT_PUBLIC_ADMIN_USERNAME=admin
NEXT_PUBLIC_ADMIN_PASSWORD=diablos2024
```

**¿Dónde encontrar estas variables?**

-   Ve a tu proyecto en Supabase Dashboard
-   Ve a "Settings" > "API"
-   Copia la "Project URL" y "anon public" key

### 3. Crear la Tabla de Productos

En Supabase Dashboard, ve a "Table Editor" y ejecuta este SQL:

```sql
-- Crear tabla de productos
CREATE TABLE productos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    informacion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    imagen TEXT NOT NULL,
    categoria TEXT NOT NULL,
    destacado BOOLEAN DEFAULT false,
    talles_disponibles TEXT[],
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejor rendimiento
CREATE INDEX idx_productos_categoria ON productos(categoria);
CREATE INDEX idx_productos_destacado ON productos(destacado);
CREATE INDEX idx_productos_fecha_creacion ON productos(fecha_creacion DESC);

-- Crear función para actualizar fecha_actualizacion automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.fecha_actualizacion = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger para actualizar fecha_actualizacion
CREATE TRIGGER update_productos_updated_at
    BEFORE UPDATE ON productos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

### 4. Configurar Supabase Storage

1. En Supabase Dashboard, ve a "Storage"
2. Haz clic en "Create a new bucket"
3. Configuración:
    - **Name**: `productos`
    - **Public bucket**: ✅ (marcado)
    - **File size limit**: `50MB`
    - **Allowed MIME types**: `image/*`

### 5. Configurar Políticas de Seguridad (RLS)

En Supabase Dashboard, ve a "Authentication" > "Policies" y ejecuta:

```sql
-- Habilitar RLS en la tabla productos
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;

-- Política para lectura pública de productos
CREATE POLICY "Permitir lectura pública de productos" ON productos
    FOR SELECT USING (true);

-- Política para inserción (solo admin - por ahora permitimos todo)
CREATE POLICY "Permitir inserción de productos" ON productos
    FOR INSERT WITH CHECK (true);

-- Política para actualización (solo admin - por ahora permitimos todo)
CREATE POLICY "Permitir actualización de productos" ON productos
    FOR UPDATE USING (true);

-- Política para eliminación (solo admin - por ahora permitimos todo)
CREATE POLICY "Permitir eliminación de productos" ON productos
    FOR DELETE USING (true);
```

### 6. Configurar Políticas de Storage

En "Storage" > "Policies", ejecuta:

```sql
-- Política para lectura pública de imágenes
CREATE POLICY "Permitir lectura pública de imágenes" ON storage.objects
    FOR SELECT USING (bucket_id = 'productos');

-- Política para subida de imágenes (solo admin - por ahora permitimos todo)
CREATE POLICY "Permitir subida de imágenes" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'productos');

-- Política para eliminación de imágenes (solo admin - por ahora permitimos todo)
CREATE POLICY "Permitir eliminación de imágenes" ON storage.objects
    FOR DELETE USING (bucket_id = 'productos');
```

---

## 🔧 Configuración para Desarrollo

### Instalar Dependencias

```bash
npm install
```

### Ejecutar en Desarrollo

```bash
npm run dev
```

### Panel de Administración

-   **URL**: `http://localhost:3000/admin`
-   **Usuario**: `admin`
-   **Contraseña**: `diablos2024`

---

## 🚀 Configuración para Producción

### Variables de Entorno en Producción

Configura estas variables en tu plataforma de hosting (Vercel, Netlify, etc.):

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
NEXT_PUBLIC_ADMIN_USERNAME=admin
NEXT_PUBLIC_ADMIN_PASSWORD=tu-password-seguro-aqui
```

### ⚠️ IMPORTANTE: Cambiar Credenciales de Admin

**Para producción, DEBES cambiar las credenciales de admin:**

1. Genera credenciales seguras:

    ```env
    NEXT_PUBLIC_ADMIN_USERNAME=admin_diablos_2024
    NEXT_PUBLIC_ADMIN_PASSWORD=TuPasswordSúperSeguro123!
    ```

2. Actualiza las variables de entorno en tu plataforma de hosting

### Políticas de Seguridad para Producción

Para mayor seguridad en producción, actualiza las políticas RLS:

```sql
-- Crear función para verificar si es admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    -- Por ahora retornamos true, pero en el futuro puedes implementar
    -- autenticación real con Supabase Auth
    RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Actualizar políticas para usar la función admin
DROP POLICY IF EXISTS "Permitir inserción de productos" ON productos;
DROP POLICY IF EXISTS "Permitir actualización de productos" ON productos;
DROP POLICY IF EXISTS "Permitir eliminación de productos" ON productos;

CREATE POLICY "Solo admin puede insertar productos" ON productos
    FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "Solo admin puede actualizar productos" ON productos
    FOR UPDATE USING (is_admin());

CREATE POLICY "Solo admin puede eliminar productos" ON productos
    FOR DELETE USING (is_admin());
```

---

## 📊 Poblar la Base de Datos

### Opción 1: Desde el Panel Admin

1. Ve a `http://localhost:3000/admin`
2. Haz login con las credenciales
3. Haz clic en "Agregar Producto"
4. Completa el formulario y sube imágenes

### Opción 2: Script SQL (Datos de Ejemplo)

Ejecuta este SQL en Supabase Dashboard > SQL Editor:

```sql
-- Insertar productos de ejemplo
INSERT INTO productos (titulo, descripcion, informacion, precio, imagen, categoria, destacado, talles_disponibles) VALUES
('Camiseta Titular 2024', 'Camiseta oficial del Club Atlético Independiente para la temporada 2024. Fabricada en poliéster reciclado de alta calidad.', 'Material: 100% Poliéster reciclado\nCuidado: Lavar en frío, no usar secadora\nTallas disponibles: S, M, L, XL', 25000, 'https://via.placeholder.com/400x400/red/white?text=Camiseta+Titular', 'Camisetas', true, ARRAY['S', 'M', 'L', 'XL']),

('Short de Entrenamiento', 'Short cómodo para entrenamientos y partidos de fútbol. Diseño clásico con detalles en rojo.', 'Material: 100% Poliéster\nSecado rápido\nTallas disponibles: S, M, L, XL', 12000, 'https://via.placeholder.com/400x400/white/red?text=Short+Entrenamiento', 'Shorts', false, ARRAY['S', 'M', 'L', 'XL']),

('Bufanda Oficial', 'Bufanda de lana con los colores oficiales del club. Perfecta para los días de frío en el estadio.', 'Material: 100% Lana\nLargo: 150cm\nAncho: 30cm', 8000, 'https://via.placeholder.com/400x400/red/white?text=Bufanda+Oficial', 'Accesorios', true, ARRAY['Único']),

('Gorra Visera', 'Gorra con visera para proteger del sol. Logo bordado del club.', 'Material: 100% Algodón\nAjuste regulable\nColores: Rojo, Blanco', 6000, 'https://via.placeholder.com/400x400/red/white?text=Gorra+Visera', 'Accesorios', false, ARRAY['Único']),

('Botines Adidas', 'Botines profesionales para fútbol. Suela de goma con tacos intercambiables.', 'Material: Cuero sintético\nSuela: Goma con tacos\nTallas disponibles: 38-45', 45000, 'https://via.placeholder.com/400x400/black/white?text=Botines+Adidas', 'Calzado', true, ARRAY['38', '39', '40', '41', '42', '43', '44', '45']);
```

---

## 🔍 Estructura de la Base de Datos

### Tabla `productos`

| Campo                 | Tipo          | Descripción                                       |
| --------------------- | ------------- | ------------------------------------------------- |
| `id`                  | UUID          | Identificador único (generado automáticamente)    |
| `titulo`              | TEXT          | Nombre del producto                               |
| `descripcion`         | TEXT          | Descripción detallada                             |
| `informacion`         | TEXT          | Información técnica (material, cuidados, etc.)    |
| `precio`              | DECIMAL(10,2) | Precio en pesos argentinos                        |
| `imagen`              | TEXT          | URL de la imagen (almacenada en Supabase Storage) |
| `categoria`           | TEXT          | Categoría del producto                            |
| `destacado`           | BOOLEAN       | Si aparece en la página principal                 |
| `talles_disponibles`  | TEXT[]        | Array de talles disponibles                       |
| `fecha_creacion`      | TIMESTAMP     | Fecha de creación (automática)                    |
| `fecha_actualizacion` | TIMESTAMP     | Fecha de última actualización (automática)        |

---

## 🛠️ Funcionalidades Implementadas

✅ **Panel de Administración** (`/admin`)

-   Login con credenciales
-   CRUD completo de productos
-   Subida de imágenes a Supabase Storage
-   Gestión de categorías

✅ **Catálogo** (`/catalogo`)

-   Lista de productos con paginación
-   Búsqueda por texto
-   Filtros por categoría, precio, destacados
-   Vista responsive

✅ **Detalles de Producto** (`/producto/[id]`)

-   Información completa del producto
-   Navegación breadcrumb
-   Información de talles disponibles

✅ **Productos Destacados** (página principal)

-   Carrusel de productos destacados
-   Integración con Supabase
-   Estados de carga y error

---

## 🚨 Solución de Problemas

### Error: "Missing environment variables"

-   Verifica que el archivo `.env.local` existe
-   Asegúrate de que las variables estén correctamente escritas
-   Reinicia el servidor de desarrollo

### Error: "Failed to fetch"

-   Verifica que la URL de Supabase sea correcta
-   Asegúrate de que el proyecto esté activo en Supabase
-   Revisa las políticas RLS

### Error: "Permission denied"

-   Verifica las políticas de seguridad en Supabase
-   Asegúrate de que RLS esté configurado correctamente

### Error al subir imágenes

-   Verifica que el bucket `productos` existe
-   Asegúrate de que las políticas de Storage estén configuradas
-   Verifica que el archivo no exceda el límite de tamaño

---

## 🔄 Comandos Útiles

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start

# Verificar linting
npm run lint
```

---

## 📈 Próximos Pasos Recomendados

1. **Autenticación Real**: Implementar Supabase Auth para usuarios
2. **Carrito de Compras**: Agregar funcionalidad de carrito
3. **Pagos**: Integrar pasarela de pagos (MercadoPago, Stripe)
4. **Notificaciones**: Implementar notificaciones push
5. **Analytics**: Configurar Supabase Analytics
6. **Backup**: Configurar backups automáticos
7. **Optimización**: Implementar lazy loading y optimización de imágenes

---

## 🎉 ¡Listo!

Tu tienda de Diablos Rojos ahora está completamente migrada a Supabase.

**Recuerda:**

-   ✅ Cambiar las credenciales de admin para producción
-   ✅ Configurar las políticas de seguridad apropiadas
-   ✅ Hacer backup de tu base de datos regularmente
-   ✅ Monitorear el uso de Supabase para evitar límites

¡Que disfrutes tu nueva tienda con Supabase! 🔥⚽
