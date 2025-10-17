import { useState, useEffect, useCallback } from "react";
import { Producto, ProductoFilters } from "@/types/product";
import { ProductService } from "@/services/productService";

export const useProducts = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProductos = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await ProductService.getAllProductos();
            setProductos(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    return {
        productos,
        loading,
        error,
        refetch: fetchProductos,
    };
};

export const useProductosDestacados = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProductosDestacados = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await ProductService.getProductosDestacados();
            setProductos(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductosDestacados();
    }, []);

    return {
        productos,
        loading,
        error,
        refetch: fetchProductosDestacados,
    };
};

export const useProductSearch = (
    filters: ProductoFilters,
    triggerKey?: number
) => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchProductos = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await ProductService.searchProductos(filters);
            setProductos(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Ejecuta búsqueda inicial y cuando cambie el triggerKey explícitamente
        searchProductos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [triggerKey]);

    return {
        productos,
        loading,
        error,
        search: searchProductos,
    };
};

export const useProduct = (id: string) => {
    const [producto, setProducto] = useState<Producto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducto = useCallback(async () => {
        if (!id) return;

        try {
            setLoading(true);
            setError(null);
            const data = await ProductService.getProductoById(id);
            setProducto(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProducto();
    }, [id, fetchProducto]);

    return {
        producto,
        loading,
        error,
        refetch: fetchProducto,
    };
};

export const useCategorias = () => {
    const [categorias, setCategorias] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategorias = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await ProductService.getCategorias();
            setCategorias(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategorias();
    }, []);

    return {
        categorias,
        loading,
        error,
        refetch: fetchCategorias,
    };
};

export const useProductSearchPaginated = (
    filters: ProductoFilters,
    pageSize: number = 20
) => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [offset, setOffset] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [total, setTotal] = useState<number>(0);

    const resetAndLoad = async () => {
        try {
            setLoading(true);
            setError(null);
            setOffset(0);
            const {
                items,
                hasMore: more,
                total: totalCount,
            } = await ProductService.searchProductosPaginated(
                filters,
                pageSize,
                0
            );
            setProductos(items);
            setHasMore(more);
            setTotal(totalCount);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        } finally {
            setLoading(false);
        }
    };

    const loadMore = async () => {
        if (!hasMore || loading) return;
        try {
            setLoading(true);
            const newOffset = offset + pageSize;
            const { items, hasMore: more } =
                await ProductService.searchProductosPaginated(
                    filters,
                    pageSize,
                    newOffset
                );
            setProductos((prev) => [...prev, ...items]);
            setOffset(newOffset);
            setHasMore(more);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        resetAndLoad();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        filters.categoria,
        filters.destacado,
        filters.search,
        filters.precioMin,
        filters.precioMax,
    ]);

    return {
        productos,
        loading,
        error,
        loadMore,
        hasMore,
        refresh: resetAndLoad,
        total,
    };
};
