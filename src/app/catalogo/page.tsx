"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useProductSearchPaginated, useCategorias } from "@/hooks/useProducts";
import { ProductoFilters } from "@/types/product";
import Image from "next/image";

export default function CatalogoPage() {
    const [filters, setFilters] = useState<ProductoFilters>({});
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const { productos, loading, loadMore, hasMore, refresh } =
        useProductSearchPaginated(filters, 20);
    const { categorias } = useCategorias();

    // Preparar filtros de búsqueda (no dispara búsqueda hasta presionar botón)
    useEffect(() => {
        setFilters((prev) => ({
            ...prev,
            search: searchTerm || undefined,
        }));
    }, [searchTerm]);

    // Preparar filtros de precio (no dispara búsqueda hasta presionar botón)
    useEffect(() => {
        setFilters((prev) => ({
            ...prev,
            precioMin: priceRange.min ? Number(priceRange.min) : undefined,
            precioMax: priceRange.max ? Number(priceRange.max) : undefined,
        }));
    }, [priceRange]);

    const handleCategoryChange = (categoria: string) => {
        setFilters({
            ...filters,
            categoria: categoria || undefined,
        });
    };

    const handleFeaturedChange = (destacado: boolean) => {
        setFilters({
            ...filters,
            destacado: destacado || undefined,
        });
    };

    const handleSearch = () => {
        refresh();
    };

    const clearFilters = () => {
        setFilters({});
        setSearchTerm("");
        setPriceRange({ min: "", max: "" });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="min-h-screen bg-primary-500 pt-20">
            {/* Header */}
            <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center font-urbanist">
                    Catálogo
                </h1>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <div className="lg:w-1/4">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Filtros
                            </h2>

                            {/* Search */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Buscar
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        placeholder="Buscar productos..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                    <button
                                        onClick={handleSearch}
                                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        Buscar
                                    </button>
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Categoría
                                </label>
                                <select
                                    value={filters.categoria || ""}
                                    onChange={(e) =>
                                        handleCategoryChange(e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    <option value="">
                                        Todas las categorías
                                    </option>
                                    {categorias.map((categoria) => (
                                        <option
                                            key={categoria}
                                            value={categoria}
                                        >
                                            {categoria}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Rango de Precio
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="number"
                                        placeholder="Mínimo"
                                        value={priceRange.min}
                                        onChange={(e) =>
                                            setPriceRange({
                                                ...priceRange,
                                                min: e.target.value,
                                            })
                                        }
                                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Máximo"
                                        value={priceRange.max}
                                        onChange={(e) =>
                                            setPriceRange({
                                                ...priceRange,
                                                max: e.target.value,
                                            })
                                        }
                                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                            </div>

                            {/* Featured Filter */}
                            <div className="mb-6">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={filters.destacado || false}
                                        onChange={(e) =>
                                            handleFeaturedChange(
                                                e.target.checked
                                            )
                                        }
                                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">
                                        Solo destacados
                                    </span>
                                </label>
                            </div>

                            {/* Clear Filters */}
                            <button
                                onClick={clearFilters}
                                className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Limpiar Filtros
                            </button>
                            <button
                                onClick={handleSearch}
                                className="w-full mt-3 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Aplicar Filtros
                            </button>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="lg:w-3/4">
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
                                <p className="mt-4 text-gray-600">
                                    Cargando productos...
                                </p>
                            </div>
                        ) : (
                            <>
                                {productos.length === 0 ? (
                                    <div className="text-center py-12">
                                        <p className="text-gray-500 text-lg">
                                            No se encontraron productos
                                        </p>
                                        <p className="text-gray-400">
                                            Intenta ajustar los filtros de
                                            búsqueda
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {productos.map((producto) => (
                                            <Link
                                                href={`/producto/${producto.id}`}
                                                key={producto.id}
                                            >
                                                <div className="bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer">
                                                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                                                        <Image
                                                            src={
                                                                producto.imagen
                                                                    ? producto.imagen
                                                                    : "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"
                                                            }
                                                            alt={
                                                                producto.titulo
                                                            }
                                                            width={300}
                                                            height={300}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="p-4">
                                                        <span className="text-xs text-primary-500 font-medium uppercase tracking-wide">
                                                            {producto.categoria}
                                                        </span>
                                                        <h3 className="text-lg font-bold text-gray-800 mt-1 font-poppins line-clamp-2 ">
                                                            {producto.titulo}
                                                        </h3>
                                                        <p className="text-gray-600 text-sm mt-2 line-clamp-2 h-10 leading-5 overflow-hidden">
                                                            {
                                                                producto.descripcion
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                                {productos.length > 0 && hasMore && (
                                    <div className="mt-8 text-center">
                                        <button
                                            onClick={loadMore}
                                            disabled={loading}
                                            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-60"
                                        >
                                            {loading
                                                ? "Cargando..."
                                                : "Cargar más"}
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
