import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    Timestamp,
    QueryDocumentSnapshot,
    DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Producto, ProductoFormData, ProductoFilters } from "@/types/product";

const PRODUCTOS_COLLECTION = "productos";

export class ProductService {
    // Obtener todos los productos
    static async getAllProductos(): Promise<Producto[]> {
        try {
            const productosRef = collection(db, PRODUCTOS_COLLECTION);
            const q = query(productosRef, orderBy("fechaCreacion", "desc"));
            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                fechaCreacion: doc.data().fechaCreacion?.toDate(),
                fechaActualizacion: doc.data().fechaActualizacion?.toDate(),
            })) as Producto[];
        } catch (error) {
            console.error("Error obteniendo productos:", error);
            throw error;
        }
    }

    // Obtener productos destacados
    static async getProductosDestacados(): Promise<Producto[]> {
        try {
            const productosRef = collection(db, PRODUCTOS_COLLECTION);
            const q = query(
                productosRef,
                where("destacado", "==", true),
                orderBy("fechaCreacion", "desc"),
                limit(8)
            );
            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                fechaCreacion: doc.data().fechaCreacion?.toDate(),
                fechaActualizacion: doc.data().fechaActualizacion?.toDate(),
            })) as Producto[];
        } catch (error) {
            console.error("Error obteniendo productos destacados:", error);
            throw error;
        }
    }

    // Obtener producto por ID
    static async getProductoById(id: string): Promise<Producto | null> {
        try {
            const productoRef = doc(db, PRODUCTOS_COLLECTION, id);
            const productoSnap = await getDoc(productoRef);

            if (productoSnap.exists()) {
                const data = productoSnap.data();
                return {
                    id: productoSnap.id,
                    ...data,
                    fechaCreacion: data.fechaCreacion?.toDate(),
                    fechaActualizacion: data.fechaActualizacion?.toDate(),
                } as Producto;
            }
            return null;
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
            let q = query(collection(db, PRODUCTOS_COLLECTION));

            // Aplicar filtros
            if (filters.categoria) {
                q = query(q, where("categoria", "==", filters.categoria));
            }

            if (filters.destacado !== undefined) {
                q = query(q, where("destacado", "==", filters.destacado));
            }

            q = query(q, orderBy("fechaCreacion", "desc"));

            const querySnapshot = await getDocs(q);
            let productos = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                fechaCreacion: doc.data().fechaCreacion?.toDate(),
                fechaActualizacion: doc.data().fechaActualizacion?.toDate(),
            })) as Producto[];

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
        lastDoc?: QueryDocumentSnapshot<DocumentData>
    ): Promise<{
        items: Producto[];
        lastDoc: QueryDocumentSnapshot<DocumentData> | null;
    }> {
        try {
            let qRef = query(collection(db, PRODUCTOS_COLLECTION));

            if (filters.categoria) {
                qRef = query(qRef, where("categoria", "==", filters.categoria));
            }

            if (filters.destacado !== undefined) {
                qRef = query(qRef, where("destacado", "==", filters.destacado));
            }

            // Ordenar por fecha de creación (desc)
            qRef = query(qRef, orderBy("fechaCreacion", "desc"));

            // Paginación
            if (lastDoc) {
                qRef = query(qRef, startAfter(lastDoc), limit(pageSize));
            } else {
                qRef = query(qRef, limit(pageSize));
            }

            const querySnapshot = await getDocs(qRef);
            let productos = querySnapshot.docs.map((docSnap) => ({
                id: docSnap.id,
                ...docSnap.data(),
                fechaCreacion: docSnap.data().fechaCreacion?.toDate(),
                fechaActualizacion: docSnap.data().fechaActualizacion?.toDate(),
            })) as Producto[];

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

            const newLastDoc =
                querySnapshot.docs.length > 0
                    ? querySnapshot.docs[querySnapshot.docs.length - 1]
                    : null;

            return { items: productos, lastDoc: newLastDoc };
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
            const productosRef = collection(db, PRODUCTOS_COLLECTION);
            const docRef = await addDoc(productosRef, {
                ...productoData,
                fechaCreacion: Timestamp.now(),
                fechaActualizacion: Timestamp.now(),
            });
            return docRef.id;
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
            const productoRef = doc(db, PRODUCTOS_COLLECTION, id);
            await updateDoc(productoRef, {
                ...productoData,
                fechaActualizacion: Timestamp.now(),
            });
        } catch (error) {
            console.error("Error actualizando producto:", error);
            throw error;
        }
    }

    // Eliminar producto
    static async deleteProducto(id: string): Promise<void> {
        try {
            const productoRef = doc(db, PRODUCTOS_COLLECTION, id);
            await deleteDoc(productoRef);
        } catch (error) {
            console.error("Error eliminando producto:", error);
            throw error;
        }
    }

    // Obtener categorías únicas
    static async getCategorias(): Promise<string[]> {
        try {
            const productos = await this.getAllProductos();
            const categorias = [...new Set(productos.map((p) => p.categoria))];
            return categorias.sort();
        } catch (error) {
            console.error("Error obteniendo categorías:", error);
            throw error;
        }
    }
}
