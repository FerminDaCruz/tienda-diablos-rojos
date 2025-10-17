import { supabase } from "@/lib/supabase";
import { Producto, ProductoFormData, ProductoFilters } from "@/types/product";

export class ProductService {
    // Obtener todos los productos
    static async getAllProductos(): Promise<Producto[]> {
        try {
            const { data, error } = await supabase
                .from("productos")
                .select("*")
                .order("fecha_creacion", { ascending: false });

            if (error) throw error;

            return (
                data?.map((item) => ({
                    id: item.id,
                    titulo: item.titulo,
                    descripcion: item.descripcion,
                    informacion: item.informacion,
                    precio: item.precio,
                    imagen: item.imagen,
                    categoria: item.categoria,
                    destacado: item.destacado,
                    tallesDisponibles: item.talles_disponibles,
                    fechaCreacion: new Date(item.fecha_creacion),
                    fechaActualizacion: new Date(item.fecha_actualizacion),
                })) || []
            );
        } catch (error) {
            console.error("Error obteniendo productos:", error);
            throw error;
        }
    }

    // Obtener productos destacados
    static async getProductosDestacados(): Promise<Producto[]> {
        try {
            const { data, error } = await supabase
                .from("productos")
                .select("*")
                .eq("destacado", true)
                .order("fecha_creacion", { ascending: false })
                .limit(8);

            if (error) throw error;

            return (
                data?.map((item) => ({
                    id: item.id,
                    titulo: item.titulo,
                    descripcion: item.descripcion,
                    informacion: item.informacion,
                    precio: item.precio,
                    imagen: item.imagen,
                    categoria: item.categoria,
                    destacado: item.destacado,
                    tallesDisponibles: item.talles_disponibles,
                    fechaCreacion: new Date(item.fecha_creacion),
                    fechaActualizacion: new Date(item.fecha_actualizacion),
                })) || []
            );
        } catch (error) {
            console.error("Error obteniendo productos destacados:", error);
            throw error;
        }
    }

    // Obtener producto por ID
    static async getProductoById(id: string): Promise<Producto | null> {
        try {
            const { data, error } = await supabase
                .from("productos")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                if (error.code === "PGRST116") return null; // No encontrado
                throw error;
            }

            return {
                id: data.id,
                titulo: data.titulo,
                descripcion: data.descripcion,
                informacion: data.informacion,
                precio: data.precio,
                imagen: data.imagen,
                categoria: data.categoria,
                destacado: data.destacado,
                tallesDisponibles: data.talles_disponibles,
                fechaCreacion: new Date(data.fecha_creacion),
                fechaActualizacion: new Date(data.fecha_actualizacion),
            };
        } catch (error) {
            console.error("Error obteniendo producto:", error);
            throw error;
        }
    }

    // Buscar productos con filtros
    static async searchProductos(
        filters: ProductoFilters
    ): Promise<Producto[]> {
        try {
            let query = supabase.from("productos").select("*");

            // Aplicar filtros
            if (filters.categoria) {
                query = query.eq("categoria", filters.categoria);
            }

            if (filters.destacado !== undefined) {
                query = query.eq("destacado", filters.destacado);
            }

            // Ordenar por fecha de creación (desc)
            query = query.order("fecha_creacion", { ascending: false });

            const { data, error } = await query;

            if (error) throw error;

            let productos =
                data?.map((item) => ({
                    id: item.id,
                    titulo: item.titulo,
                    descripcion: item.descripcion,
                    informacion: item.informacion,
                    precio: item.precio,
                    imagen: item.imagen,
                    categoria: item.categoria,
                    destacado: item.destacado,
                    tallesDisponibles: item.talles_disponibles,
                    fechaCreacion: new Date(item.fecha_creacion),
                    fechaActualizacion: new Date(item.fecha_actualizacion),
                })) || [];

            // Filtros que requieren procesamiento en memoria
            if (filters.search) {
                const searchTerm = filters.search.toLowerCase();
                productos = productos.filter(
                    (producto) =>
                        producto.titulo.toLowerCase().includes(searchTerm) ||
                        producto.descripcion.toLowerCase().includes(searchTerm)
                );
            }

            if (filters.precioMin !== undefined) {
                productos = productos.filter(
                    (producto) => producto.precio >= filters.precioMin!
                );
            }

            if (filters.precioMax !== undefined) {
                productos = productos.filter(
                    (producto) => producto.precio <= filters.precioMax!
                );
            }

            return productos;
        } catch (error) {
            console.error("Error buscando productos:", error);
            throw error;
        }
    }

    // Buscar productos con filtros y paginación
    static async searchProductosPaginated(
        filters: ProductoFilters,
        pageSize: number = 20,
        offset: number = 0
    ): Promise<{
        items: Producto[];
        hasMore: boolean;
        total: number;
    }> {
        try {
            let query = supabase
                .from("productos")
                .select("*", { count: "exact" });

            // Aplicar filtros
            if (filters.categoria) {
                query = query.eq("categoria", filters.categoria);
            }

            if (filters.destacado !== undefined) {
                query = query.eq("destacado", filters.destacado);
            }

            // Ordenar por fecha de creación (desc)
            query = query.order("fecha_creacion", { ascending: false });

            // Paginación
            query = query.range(offset, offset + pageSize - 1);

            const { data, error, count } = await query;

            if (error) throw error;

            let productos =
                data?.map((item) => ({
                    id: item.id,
                    titulo: item.titulo,
                    descripcion: item.descripcion,
                    informacion: item.informacion,
                    precio: item.precio,
                    imagen: item.imagen,
                    categoria: item.categoria,
                    destacado: item.destacado,
                    tallesDisponibles: item.talles_disponibles,
                    fechaCreacion: new Date(item.fecha_creacion),
                    fechaActualizacion: new Date(item.fecha_actualizacion),
                })) || [];

            // Filtros en memoria
            if (filters.search) {
                const searchTerm = filters.search.toLowerCase();
                productos = productos.filter(
                    (producto) =>
                        producto.titulo.toLowerCase().includes(searchTerm) ||
                        producto.descripcion.toLowerCase().includes(searchTerm)
                );
            }

            if (filters.precioMin !== undefined) {
                productos = productos.filter(
                    (producto) => producto.precio >= filters.precioMin!
                );
            }

            if (filters.precioMax !== undefined) {
                productos = productos.filter(
                    (producto) => producto.precio <= filters.precioMax!
                );
            }

            const hasMore = offset + pageSize < (count || 0);

            return {
                items: productos,
                hasMore,
                total: count || 0,
            };
        } catch (error) {
            console.error("Error buscando productos paginados:", error);
            throw error;
        }
    }

    // Crear producto
    static async createProducto(
        productoData: ProductoFormData
    ): Promise<string> {
        try {
            const now = new Date().toISOString();

            const { data, error } = await supabase
                .from("productos")
                .insert({
                    titulo: productoData.titulo,
                    descripcion: productoData.descripcion,
                    informacion: productoData.informacion,
                    precio: productoData.precio,
                    imagen: productoData.imagen,
                    categoria: productoData.categoria,
                    destacado: productoData.destacado || false,
                    talles_disponibles: productoData.tallesDisponibles,
                    fecha_creacion: now,
                    fecha_actualizacion: now,
                })
                .select("id")
                .single();

            if (error) throw error;
            return data.id;
        } catch (error) {
            console.error("Error creando producto:", error);
            throw error;
        }
    }

    // Actualizar producto
    static async updateProducto(
        id: string,
        productoData: Partial<ProductoFormData>
    ): Promise<void> {
        try {
            const now = new Date().toISOString();

            const { tallesDisponibles, ...rest } = productoData;

            const { error } = await supabase
                .from("productos")
                .update({
                    ...rest,
                    talles_disponibles: tallesDisponibles,
                    fecha_actualizacion: now,
                })
                .eq("id", id);

            if (error) throw error;
        } catch (error) {
            console.error("Error actualizando producto:", error);
            throw error;
        }
    }

    // Eliminar producto
    static async deleteProducto(id: string): Promise<void> {
        try {
            const { error } = await supabase
                .from("productos")
                .delete()
                .eq("id", id);

            if (error) throw error;
        } catch (error) {
            console.error("Error eliminando producto:", error);
            throw error;
        }
    }

    // Obtener categorías únicas
    static async getCategorias(): Promise<string[]> {
        try {
            const { data, error } = await supabase
                .from("productos")
                .select("categoria")
                .not("categoria", "is", null);

            if (error) throw error;

            const categorias = [
                ...new Set(data?.map((item) => item.categoria) || []),
            ];
            return categorias.sort();
        } catch (error) {
            console.error("Error obteniendo categorías:", error);
            throw error;
        }
    }
}
