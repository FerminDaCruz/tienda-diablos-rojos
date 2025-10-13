export interface Producto {
    id: string;
    titulo: string;
    descripcion: string;
    precio: number;
    imagen: string;
    categoria: string;
    destacado?: boolean;
    stock?: number;
    fechaCreacion?: Date;
    fechaActualizacion?: Date;
}

export interface ProductoFormData {
    titulo: string;
    descripcion: string;
    precio: number;
    imagen: string;
    categoria: string;
    destacado?: boolean;
    stock?: number;
}

export interface ProductoFilters {
    categoria?: string;
    precioMin?: number;
    precioMax?: number;
    destacado?: boolean;
    search?: string;
}
