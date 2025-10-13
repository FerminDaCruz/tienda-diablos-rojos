import Link from "next/link";
import BackgroundPattern from "../BackgroundPattern";

export default function Hero() {
    const images = [
        "/imagenes-patron/diablo-removebg-preview.png",
        "/imagenes-patron/rey.png",
        "/imagenes-patron/image.png",
    ];
    return (
        <section className="h-screen bg-primary-500 w-full text-white font-poppins sticky top-0 z-0 overflow-hidden pt-8">
            <BackgroundPattern
                img1={images[0]}
                img2={images[1]}
                img3={images[2]}
                size={100}
                opacity={0.12}
                rows={10}
                cols={18}
                className="pointer-events-none"
            />
            <div className="h-full flex justify-center items-center flex-col px-6">
                <h1 className="font-bold text-6xl text-center">
                    Tienda Diablos Rojos
                </h1>
                <p className="text-lg text-center">
                    La mejor indumentaria del rey de copas
                </p>
                <Link
                    href="/catalogo"
                    className="border border-white bg-primary-500 px-6 py-3 text-white hover:bg-white hover:text-primary-500 transition-colors duration-200 font-medium mt-8"
                >
                    Ver catálogo
                </Link>
            </div>
        </section>
    );
}
