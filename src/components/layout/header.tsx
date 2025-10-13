import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function Header() {
    return (
        <header className="bg-white w-full h-20 fixed z-20">
            <div className="container mx-auto h-full flex justify-between items-center px-3">
                <Image
                    src="/diablito_rojo.png"
                    width={50}
                    height={50}
                    alt="diablito logo"
                />
                <nav className="absolute left-1/2 -translate-x-1/2 hidden md:block">
                    <ul className="flex items-center gap-6 text-primary-500">
                        <li className="hover:text-primary-300 transition-all duration-300 hover:scale-105">
                            <Link href="/">Inicio</Link>
                        </li>
                        <li className="hover:text-primary-300 transition-all duration-300 hover:scale-105">
                            <Link href="/catalogo">Catálogo</Link>
                        </li>
                        <li className="hover:text-primary-300 transition-all duration-300 hover:scale-105">
                            <Link href="/sobre-nosotros">Sobre Nosotros</Link>
                        </li>
                    </ul>
                </nav>
                <Link
                    href="#"
                    className="font-bold bg-green-500 text-white px-4 py-2 rounded-lg text-center flex justify-center items-center gap-2 hover:bg-green-400 transition-colors duration-300"
                >
                    <FaWhatsapp className="size-7" />
                    Whatsapp
                </Link>
            </div>
        </header>
    );
}
