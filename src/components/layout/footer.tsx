import Link from "next/link";
import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";
import { SiGooglemaps } from "react-icons/si";

export default function Footer() {
    const whatsappNumber = "5491124083741"; // +54 9 11 2408-3741 en formato internacional sin + ni espacios
    const waMessage = encodeURIComponent(
        `Hola, quiero hacerte una consulta...`
    );
    return (
        <footer className="w-full bg-red-800 text-white relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-2xl font-bold mb-3">
                        Nix Indumentaria
                    </h3>
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
                        <li>Tel: +54 9 11 2408-3741</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-3">Seguinos</h4>
                    <div className="flex items-center gap-4">
                        <Link
                            href={`https://wa.me/${whatsappNumber}?text=${waMessage}`}
                            aria-label="WhatsApp"
                            className="hover:opacity-90 transition-opacity"
                            target="_blank"
                        >
                            <BsWhatsapp />
                        </Link>
                        <Link
                            href="https://www.instagram.com/tienda_diablosrojos/"
                            aria-label="Instagram"
                            className="hover:opacity-90 transition-opacity"
                            target="_blank"
                        >
                            <BsInstagram />
                        </Link>
                        <Link
                            href="#"
                            aria-label="Facebook"
                            className="hover:opacity-90 transition-opacity"
                            target="_blank"
                        >
                            <BsFacebook />
                        </Link>
                        <Link
                            href="https://www.google.com/maps/place/NIX+INDUMENTARIA/@-34.6708953,-58.391208,14z/data=!3m1!4b1!4m6!3m5!1s0x95bccda496cbd66d:0xa699828b0c2f5345!8m2!3d-34.6708952!4d-58.391208!16s%2Fg%2F11h7frqkdp?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"
                            aria-label="Google Maps"
                            className="hover:opacity-90 transition-opacity"
                            target="_blank"
                        >
                            <SiGooglemaps />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="bg-red-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-xs">
                    © 2025{" "}
                    <Link
                        href="https://www.nessostudio.com.ar"
                        target="_blank"
                        className="font-bold"
                    >
                        Nesso Studio{" "}
                    </Link>{" "}
                    — Todos los derechos reservados
                </div>
            </div>
        </footer>
    );
}
