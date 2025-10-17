import { supabase } from "@/lib/supabase";

export class StorageService {
    // Subir imagen a Supabase Storage
    static async uploadImage(
        file: File,
        folder: string = "productos"
    ): Promise<string> {
        try {
            // Generar nombre único para el archivo
            const fileExt = file.name.split(".").pop();
            const fileName = `${Date.now()}_${Math.random()
                .toString(36)
                .substring(2)}.${fileExt}`;
            const filePath = `${folder}/${fileName}`;

            // Subir archivo a Supabase Storage
            const { error } = await supabase.storage
                .from("productos") // Nombre del bucket en Supabase
                .upload(filePath, file);

            if (error) throw error;

            // Obtener URL pública del archivo
            const { data: urlData } = supabase.storage
                .from("productos")
                .getPublicUrl(filePath);

            return urlData.publicUrl;
        } catch (error) {
            console.error("Error subiendo imagen:", error);
            throw error;
        }
    }

    // Eliminar imagen de Supabase Storage
    static async deleteImage(imageUrl: string): Promise<void> {
        try {
            // Extraer el path del archivo desde la URL
            const url = new URL(imageUrl);
            const pathParts = url.pathname.split("/");
            const fileName = pathParts[pathParts.length - 1];
            const folder = pathParts[pathParts.length - 2];
            const filePath = `${folder}/${fileName}`;

            const { error } = await supabase.storage
                .from("productos")
                .remove([filePath]);

            if (error) throw error;
        } catch (error) {
            console.error("Error eliminando imagen:", error);
            throw error;
        }
    }

    // Verificar si una URL es de Supabase Storage
    static isSupabaseUrl(url: string): boolean {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname.includes("supabase");
        } catch {
            return false;
        }
    }
}
