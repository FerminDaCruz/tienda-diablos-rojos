import type { Metadata } from "next";
import { Poppins, Urbanist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";

// Fuente principal
const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"], // ajustá según lo que uses
    display: "swap",
});

// Fuente secundaria
const urbanist = Urbanist({
    variable: "--font-urbanist",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Tienda Diablos Rojos | Indumentaria oficial y accesorios",
    description:
        "Ropa, accesorios y productos exclusivos para hinchas de independiente que viven el club con pasión.",
    keywords: [
        "Diablos Rojos",
        "tienda Diablos Rojos",
        "ropa de independiente",
        "indumentaria deportiva",
        "accesorios independiente",
        "nix indumentaria",
        "camisetas Diablos Rojos",
    ],
    authors: [{ name: "Tienda Diablos Rojos" }],
    creator: "Tienda Diablos Rojos",
    publisher: "Tienda Diablos Rojos",
    openGraph: {
        title: "Tienda Diablos Rojos | Indumentaria oficial y accesorios",
        description:
            "Ropa, accesorios y productos exclusivos para hinchas de independiente que viven el club con pasión.",
        url: "https://nixindumentaria.com",
        siteName: "Tienda Diablos Rojos",
        images: [
            {
                url: "/diablito_rojo.png", // Cambiá por tu imagen OG real
                width: 1200,
                height: 630,
                alt: "Tienda Diablos Rojos - Indumentaria oficial",
            },
        ],
        locale: "es_AR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Tienda Diablos Rojos",
        description:
            "Indumentaria oficial y productos exclusivos de los Diablos Rojos.",
        images: ["/diablito_rojo.png"],
        creator: "@diablosrojos", // si tienen cuenta de Twitter/X
    },
    icons: {
        icon: "/diablito_rojo.png",
        shortcut: "/diablito_rojo.pngo",
        apple: "/diablito_rojo.png",
    },
    metadataBase: new URL("https://nixindumentaria.com"),
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const whatsappNumber = "5491124083741"; // +54 9 11 2408-3741 en formato internacional sin + ni espacios
    const waMessage = encodeURIComponent(
        `Hola Nix Indumentaria, me gustaría hacer una consulta!`
    );
    return (
        <html lang="es">
            <body className={`${poppins.variable} ${urbanist.variable}`}>
                <Header />
                {children}
                <Link
                    href={`https://wa.me/${whatsappNumber}?text=${waMessage}`}
                    aria-label="WhatsApp"
                    target="_blank"
                    className="md:hidden fixed z-30 bottom-5 right-5 rounded-full p-3 bg-green-500 text-white shadow-lg flex justify-center items-center w-auto hover:bg-green-600 transition-colors
					animate-scale"
                >
                    <BsWhatsapp className="size-7" />
                </Link>
                <Footer />
            </body>
        </html>
    );
}
