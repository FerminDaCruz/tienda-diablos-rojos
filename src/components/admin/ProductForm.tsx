"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Producto, ProductoFormData } from "@/types/product";
import { ProductService } from "@/services/productService";

const productSchema = z.object({
    titulo: z.string().min(1, "El título es requerido"),
    descripcion: z.string().min(1, "La descripción es requerida"),
    precio: z.number().min(0, "El precio debe ser mayor a 0"),
    imagen: z.string().url("Debe ser una URL válida").or(z.literal("")),
    categoria: z.string().min(1, "La categoría es requerida"),
    destacado: z.boolean().optional(),
    stock: z.number().min(0).optional(),
});

interface ProductFormProps {
    producto?: Producto;
    onSave: () => void;
    onCancel: () => void;
}

export default function ProductForm({
    producto,
    onSave,
    onCancel,
}: ProductFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProductoFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            titulo: producto?.titulo || "",
            descripcion: producto?.descripcion || "",
            precio: producto?.precio || 0,
            imagen: producto?.imagen || "",
            categoria: producto?.categoria || "",
            destacado: producto?.destacado || false,
            stock: producto?.stock || 0,
        },
    });

    useEffect(() => {
        if (producto) {
            reset({
                titulo: producto.titulo,
                descripcion: producto.descripcion,
                precio: producto.precio,
                imagen: producto.imagen,
                categoria: producto.categoria,
                destacado: producto.destacado,
                stock: producto.stock,
            });
        }
    }, [producto, reset]);

    const onSubmit = async (data: ProductoFormData) => {
        setIsLoading(true);
        setError("");

        try {
            if (producto) {
                await ProductService.updateProducto(producto.id, data);
            } else {
                await ProductService.createProducto(data);
            }
            onSave();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Error al guardar el producto"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
                {producto ? "Editar Producto" : "Nuevo Producto"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Título *
                    </label>
                    <input
                        {...register("titulo")}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    {errors.titulo && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.titulo.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descripción *
                    </label>
                    <textarea
                        {...register("descripcion")}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    {errors.descripcion && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.descripcion.message}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Precio *
                        </label>
                        <input
                            {...register("precio", { valueAsNumber: true })}
                            type="number"
                            min="0"
                            step="0.01"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        {errors.precio && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.precio.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Stock
                        </label>
                        <input
                            {...register("stock", { valueAsNumber: true })}
                            type="number"
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        {errors.stock && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.stock.message}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Categoría *
                    </label>
                    <select
                        {...register("categoria")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <option value="">Seleccionar categoría</option>
                        <option value="Camisetas">Camisetas</option>
                        <option value="Shorts">Shorts</option>
                        <option value="Accesorios">Accesorios</option>
                        <option value="Chaquetas">Chaquetas</option>
                        <option value="Medias">Medias</option>
                        <option value="Pantalones">Pantalones</option>
                    </select>
                    {errors.categoria && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.categoria.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        URL de Imagen
                    </label>
                    <input
                        {...register("imagen")}
                        type="url"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    {errors.imagen && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.imagen.message}
                        </p>
                    )}
                </div>

                <div className="flex items-center">
                    <input
                        {...register("destacado")}
                        type="checkbox"
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                        Producto destacado
                    </label>
                </div>

                {error && <div className="text-red-600 text-sm">{error}</div>}

                <div className="flex space-x-4 pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                    >
                        {isLoading ? "Guardando..." : "Guardar"}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}
