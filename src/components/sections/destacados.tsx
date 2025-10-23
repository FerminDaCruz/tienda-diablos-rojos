"use client";

import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useProductosDestacados } from "@/hooks/useProducts";
import { Producto } from "@/types/product";

// Componente de producto individual
function ProductoCard({ producto }: { producto: Producto }) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <Link href={`/producto/${producto.id}`}>
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer">
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <Image
                        src={
                            producto.imagen
                                ? producto.imagen
                                : "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"
                        }
                        alt={producto.titulo}
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
                        {producto.descripcion}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                        <span className="text-xl font-bold text-primary-500">
                            {formatPrice(producto.precio)}
                        </span>
                        <span className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors text-sm font-medium">
                            Ver más
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

// Hook personalizado para la lógica del carrusel
function useCarrusel(totalItems: number, itemsPerView: number) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Calcular el número máximo de posiciones posibles (producto por producto)
    const maxIndex = Math.max(0, totalItems - itemsPerView);

    const next = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    };

    const prev = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const canGoNext = currentIndex < maxIndex;
    const canGoPrev = currentIndex > 0;

    return {
        currentIndex,
        setCurrentIndex,
        next,
        prev,
        canGoNext,
        canGoPrev,
        maxIndex,
    };
}

export default function Destacados() {
    const { productos, loading, error } = useProductosDestacados();

    // Configuración responsive del carrusel
    const getItemsPerView = () => {
        if (typeof window === "undefined") return 4; // SSR fallback

        if (window.innerWidth < 640) return 1; // Mobile
        if (window.innerWidth < 1024) return 2; // Tablet
        if (window.innerWidth < 1280) return 3; // Desktop pequeño
        return 4; // Desktop grande
    };

    const [itemsPerView, setItemsPerView] = useState(4);

    // Actualizar itemsPerView en resize
    useEffect(() => {
        const handleResize = () => {
            setItemsPerView(getItemsPerView());
        };

        if (typeof window !== "undefined") {
            setItemsPerView(getItemsPerView());
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    const carrusel = useCarrusel(productos.length, itemsPerView);

    if (loading) {
        return (
            <section className="w-full py-8 text-white">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
                            Productos Destacados
                        </h2>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto">
                            Descubre nuestra selección de productos más
                            populares del Rey de Copas
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="w-full py-8 text-white">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
                            Productos Destacados
                        </h2>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto">
                            Descubre nuestra selección de productos más
                            populares del Rey de Copas
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-red-200">
                            Error al cargar los productos destacados
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    if (productos.length === 0) {
        return (
            <section className="w-full py-8 text-white">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
                            Productos Destacados
                        </h2>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto">
                            Descubre nuestra selección de productos más
                            populares del Rey de Copas
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-300">
                            No hay productos destacados disponibles
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full py-8 text-white">
            <div className="max-w-7xl mx-auto px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
                        Productos Destacados
                    </h2>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto">
                        Descubre nuestra selección de productos más populares
                        del Rey de Copas
                    </p>
                </div>

                {/* Carrusel */}
                <div className="relative">
                    {/* Contenedor de productos */}
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-300 ease-in-out"
                            style={{
                                transform: `translateX(-${
                                    carrusel.currentIndex *
                                    (100 / productos.length)
                                }%)`,
                                width: `${
                                    productos.length * (100 / itemsPerView)
                                }%`,
                            }}
                        >
                            {productos.map((producto) => (
                                <div
                                    key={producto.id}
                                    className="flex-shrink-0 px-2"
                                    style={{
                                        width: `${100 / productos.length}%`,
                                    }}
                                >
                                    <ProductoCard producto={producto} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Botones de navegación */}
                    <button
                        onClick={carrusel.prev}
                        disabled={!carrusel.canGoPrev}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg border border-gray-200 transition-all duration-200 ${
                            carrusel.canGoPrev
                                ? "hover:bg-primary-50 hover:border-primary-300 text-primary-500"
                                : "text-gray-300 cursor-not-allowed"
                        }`}
                    >
                        <FaChevronLeft className="text-lg" />
                    </button>

                    <button
                        onClick={carrusel.next}
                        disabled={!carrusel.canGoNext}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg border border-gray-200 transition-all duration-200 ${
                            carrusel.canGoNext
                                ? "hover:bg-primary-50 hover:border-primary-300 text-primary-500"
                                : "text-gray-300 cursor-not-allowed"
                        }`}
                    >
                        <FaChevronRight className="text-lg" />
                    </button>
                </div>

                {/* Indicadores */}
                <div className="flex justify-center mt-8 space-x-2">
                    {Array.from({ length: carrusel.maxIndex + 1 }).map(
                        (_, index) => (
                            <button
                                key={index}
                                onClick={() => carrusel.setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                                    index === carrusel.currentIndex
                                        ? "bg-white"
                                        : "bg-white/50 hover:bg-white/70"
                                }`}
                            />
                        )
                    )}
                </div>
            </div>
        </section>
    );
}
