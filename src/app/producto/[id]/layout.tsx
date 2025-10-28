import { ProductService } from "@/services/productService";
import { Metadata } from "next";

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

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
