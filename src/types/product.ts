export interface Producto {
    id: string;
    titulo: string;
    descripcion: string;
    informacion?: string; // datos técnicos, materiales, medidas, etc.
    precio: number;
    imagen: string;
    categoria: string;
    destacado?: boolean;
    tallesDisponibles?: string[]; // ej: ["S","M","34","Talle único"]
    fechaCreacion?: Date;
    fechaActualizacion?: Date;
}

export interface ProductoFormData {
    titulo: string;
    descripcion: string;
    informacion?: string;
    precio: number;
    imagen: string;
    categoria: string;
    destacado?: boolean;
    tallesDisponibles?: string[];
}

export interface ProductoFilters {
    categoria?: string;
    precioMin?: number;
    precioMax?: number;
    destacado?: boolean;
    search?: string;
}
