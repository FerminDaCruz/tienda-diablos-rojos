import Link from "next/link";
import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";
import { SiGooglemaps } from "react-icons/si";

export default function Footer() {
    return (
        <footer className="w-full bg-red-800 text-white relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-2xl font-bold mb-3">Nix</h3>
                    <nav className="text-sm opacity-90">
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="hover:underline">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/catalogo"
                                    className="hover:underline"
                                >
                                    Catálogo
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/sobre-nosotros"
                                    className="hover:underline"
                                >
                                    Sobre nosotros
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-3">Contacto</h4>
                    <ul className="text-sm space-y-1 opacity-90">
                        <li>Email: contacto@nesso.studio</li>
                        <li>Tel: +54 9 11 2408-3741</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-3">Seguinos</h4>
                    <div className="flex items-center gap-4">
                        <Link
                            href="#"
                            aria-label="WhatsApp"
                            className="hover:opacity-90 transition-opacity"
                        >
                            <BsWhatsapp />
                        </Link>
                        <Link
                            href="#"
                            aria-label="Instagram"
                            className="hover:opacity-90 transition-opacity"
                        >
                            <BsInstagram />
                        </Link>
                        <Link
                            href="#"
                            aria-label="Facebook"
                            className="hover:opacity-90 transition-opacity"
                        >
                            <BsFacebook />
                        </Link>
                        <Link
                            href="#"
                            aria-label="Google Maps"
                            className="hover:opacity-90 transition-opacity"
                        >
                            <SiGooglemaps />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="bg-red-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-xs">
                    © 2025 Nesso Studio — Todos los derechos reservados
                </div>
            </div>
        </footer>
    );
}
