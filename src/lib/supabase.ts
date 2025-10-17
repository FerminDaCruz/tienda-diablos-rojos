import { createClient } from "@supabase/supabase-js";

// Configuración de Supabase
// IMPORTANTE: Para desarrollo, usa las variables de entorno locales
// Para producción, configura estas variables en tu plataforma de hosting
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Validar que las variables de entorno estén configuradas
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        "Faltan las variables de entorno de Supabase. " +
            "Asegúrate de tener NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en tu archivo .env.local"
    );
}

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para TypeScript (se generan automáticamente con Supabase CLI)
export type Database = {
    public: {
        Tables: {
            productos: {
                Row: {
                    id: string;
                    titulo: string;
                    descripcion: string;
                    informacion: string | null;
                    precio: number;
                    imagen: string;
                    categoria: string;
                    destacado: boolean;
                    talles_disponibles: string[] | null;
                    fecha_creacion: string;
                    fecha_actualizacion: string;
                };
                Insert: {
                    id?: string;
                    titulo: string;
                    descripcion: string;
                    informacion?: string | null;
                    precio: number;
                    imagen: string;
                    categoria: string;
                    destacado?: boolean;
                    talles_disponibles?: string[] | null;
                    fecha_creacion?: string;
                    fecha_actualizacion?: string;
                };
                Update: {
                    id?: string;
                    titulo?: string;
                    descripcion?: string;
                    informacion?: string | null;
                    precio?: number;
                    imagen?: string;
                    categoria?: string;
                    destacado?: boolean;
                    talles_disponibles?: string[] | null;
                    fecha_creacion?: string;
                    fecha_actualizacion?: string;
                };
            };
        };
    };
};
