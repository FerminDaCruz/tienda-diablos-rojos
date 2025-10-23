"use client";

import { useState } from "react";
import { Producto } from "@/types/product";
import { ProductService } from "@/services/productService";

interface ProductTableProps {
    productos: Producto[];
    onEdit: (producto: Producto) => void;
    onDelete: (id: string) => void;
    onRefresh: () => void;
}

export default function ProductTable({
    productos,
    onEdit,
    onDelete,
    onRefresh,
}: ProductTableProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        if (!confirm("¿Estás seguro de que quieres eliminar este producto?")) {
            return;
        }

        setDeletingId(id);
        try {
            await ProductService.deleteProducto(id);
            onRefresh();
        } catch (error) {
            console.error("Error eliminando producto:", error);
            alert("Error al eliminar el producto");
        } finally {
            setDeletingId(null);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                    Productos
                </h2>
                <p className="text-sm text-gray-600">
                    Gestiona todos los productos de la tienda
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Producto
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Categoría
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Precio
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Destacado
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {productos.map((producto) => (
                            <tr key={producto.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            {producto.imagen ? (
                                                <img
                                                    className="h-10 w-10 rounded-full object-cover"
                                                    src={producto.imagen}
                                                    alt={producto.titulo}
                                                />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <span className="text-gray-500 text-xs">
                                                        Sin imagen
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {producto.titulo}
                                            </div>
                                            <div className="text-sm text-gray-500 truncate max-w-xs">
                                                {producto.descripcion}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {producto.categoria}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {formatPrice(producto.precio)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {producto.destacado ? (
                                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                            Sí
                                        </span>
                                    ) : (
                                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                                            No
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => onEdit(producto)}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(producto.id)
                                            }
                                            disabled={
                                                deletingId === producto.id
                                            }
                                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                        >
                                            {deletingId === producto.id
                                                ? "Eliminando..."
                                                : "Eliminar"}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {productos.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500">
                        No hay productos registrados
                    </p>
                </div>
            )}
        </div>
    );
}
