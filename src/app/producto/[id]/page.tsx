"use client";

import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { useParams } from "next/navigation";
import { useProduct } from "@/hooks/useProducts";
import RelatedProducts from "@/components/sections/relatedProducts";
import { ProductService } from "@/services/productService";

export async function generateMetadata({
    params,
}: {
    params: { id: string };
}): Promise<Metadata> {
    try {
        const producto = await ProductService.getProductoById(params.id);

        if (!producto) {
            return {
                title: "Producto no encontrado | Tienda Diablos Rojos",
                description:
                    "El producto que buscas no existe o ha sido eliminado.",
            };
        }

        const title = `${producto.titulo} | Tienda Diablos Rojos`;
        const description =
            producto.descripcion?.slice(0, 150) ||
            "Descubrí este producto exclusivo de Tienda Diablos Rojos.";
        const imageUrl = producto.imagen || "/diablito_rojo.png";
        const url = `https://tiendadiablosrojos.com/producto/${params.id}`;

        return {
            title,
            description,
            openGraph: {
                title,
                description,
                url,
                siteName: "Tienda Diablos Rojos",
                images: [
                    {
                        url: imageUrl,
                        width: 1200,
                        height: 630,
                        alt: producto.titulo,
                    },
                ],
                locale: "es_AR",
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: [imageUrl],
            },
        };
    } catch (error) {
        console.error("Error generando metadata:", error);
        return {
            title: "Error | Tienda Diablos Rojos",
            description: "Hubo un problema al cargar los datos del producto.",
        };
    }
}

export default function ProductoPage() {
    const params = useParams();
    const productId = params.id as string;
    const { producto, loading, error } = useProduct(productId);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
        }).format(price);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando producto...</p>
                </div>
            </div>
        );
    }

    if (error || !producto) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Producto no encontrado
                    </h1>
                    <p className="text-gray-600 mb-6">
                        El producto que buscas no existe o ha sido eliminado.
                    </p>
                    <Link
                        href="/catalogo"
                        className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Ver Catálogo
                    </Link>
                </div>
            </div>
        );
    }

    const whatsappNumber = "5491124083741"; // +54 9 11 2408-3741 en formato internacional sin + ni espacios
    const waMessage = encodeURIComponent(
        `Hola, quiero saber más información sobre ${producto.titulo}`
    );

    return (
        <div className="min-h-screen bg-primary-500 pt-20">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex items-center space-x-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-gray-700">
                            Inicio
                        </Link>
                        <span>/</span>
                        <Link href="/catalogo" className="hover:text-gray-700">
                            Catálogo
                        </Link>
                        <span>/</span>
                        <span className="text-gray-900">{producto.titulo}</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Product Image */}
                    <div className="bg-black rounded-lg shadow-md overflow-hidden flex items-center">
                        {producto.imagen ? (
                            <Image
                                width={500}
                                height={500}
                                src={producto.imagen}
                                alt={producto.titulo}
                                className="w-full h-96 max-h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500 text-lg">
                                    Sin imagen disponible
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                {producto.categoria}
                            </span>
                            {producto.destacado && (
                                <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-800">
                                    Producto Destacado
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            {producto.titulo}
                        </h1>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {producto.descripcion}
                        </p>

                        {producto.tallesDisponibles &&
                            producto.tallesDisponibles.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                                        Talles disponibles
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {producto.tallesDisponibles.map((t) => (
                                            <span
                                                key={t}
                                                className="inline-flex px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                        {producto.informacion && (
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                                    Información sobre el producto
                                </h3>
                                <p className="text-gray-600 whitespace-pre-line">
                                    {producto.informacion}
                                </p>
                            </div>
                        )}

                        <div className="border-t border-gray-200 pt-6">
                            <Link
                                href={`https://wa.me/${whatsappNumber}?text=${waMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 font-semibold text-lg"
                            >
                                Consultar por WhatsApp
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                <div className="mt-12">
                    <div className="flex items-center justify-between flex-col sm:flex-row gap-5">
                        <h2 className="text-3xl font-bold text-white text-center">
                            Productos Relacionados
                        </h2>
                        <Link
                            href="/catalogo"
                            className="text-white hover:text-gray-50 font-medium"
                        >
                            Ver todos los productos →
                        </Link>
                    </div>

                    <RelatedProducts categoria={producto.categoria} />
                </div>
            </div>
        </div>
    );
}
