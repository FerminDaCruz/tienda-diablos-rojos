"use client";

import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";
import { SiGooglemaps } from "react-icons/si";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header className="bg-white w-full h-20 fixed z-30">
                <div className="container mx-auto h-full flex justify-between items-center px-3">
                    <Image
                        src="/diablito_rojo.png"
                        width={50}
                        height={50}
                        alt="diablito logo"
                    />

                    {/* Desktop Navigation */}
                    <nav className="absolute left-1/2 -translate-x-1/2 hidden md:block">
                        <ul className="flex items-center gap-6 text-primary-500">
                            <li className="hover:text-primary-300 transition-all duration-300 hover:scale-105">
                                <Link href="/">Inicio</Link>
                            </li>
                            <li className="hover:text-primary-300 transition-all duration-300 hover:scale-105">
                                <Link href="/catalogo">Catálogo</Link>
                            </li>
                            <li className="hover:text-primary-300 transition-all duration-300 hover:scale-105">
                                <Link href="/sobre-nosotros">
                                    Sobre Nosotros
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Desktop WhatsApp Button */}
                    <Link
                        href="#"
                        className="font-bold bg-green-500 text-white px-4 py-2 rounded-lg text-center flex justify-center items-center gap-2 hover:bg-green-400 transition-colors duration-300 hidden md:flex"
                    >
                        <FaWhatsapp className="size-7" />
                        Whatsapp
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-primary-500 text-2xl hover:text-primary-300 transition-colors duration-300"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <HiX /> : <HiMenuAlt3 />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={toggleMenu}
                ></div>
            )}

            {/* Mobile Menu */}
            <div
                className={`fixed top-20 right-0 w-80 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="p-6">
                    {/* Navigation Links */}
                    <nav className="mb-8">
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="/"
                                    className="block text-lg text-primary-500 hover:text-primary-300 transition-colors duration-300 py-2"
                                    onClick={toggleMenu}
                                >
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/catalogo"
                                    className="block text-lg text-primary-500 hover:text-primary-300 transition-colors duration-300 py-2"
                                    onClick={toggleMenu}
                                >
                                    Catálogo
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/sobre-nosotros"
                                    className="block text-lg text-primary-500 hover:text-primary-300 transition-colors duration-300 py-2"
                                    onClick={toggleMenu}
                                >
                                    Sobre Nosotros
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Social Media Links */}
                    <div className="border-t border-gray-200 pt-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">
                            Síguenos
                        </h4>
                        <div className="flex items-center gap-4">
                            <Link
                                href="#"
                                aria-label="WhatsApp"
                                className="text-green-500 hover:text-green-400 transition-colors duration-300 text-2xl"
                            >
                                <BsWhatsapp />
                            </Link>
                            <Link
                                href="#"
                                aria-label="Instagram"
                                className="text-pink-500 hover:text-pink-400 transition-colors duration-300 text-2xl"
                            >
                                <BsInstagram />
                            </Link>
                            <Link
                                href="#"
                                aria-label="Facebook"
                                className="text-blue-600 hover:text-blue-500 transition-colors duration-300 text-2xl"
                            >
                                <BsFacebook />
                            </Link>
                            <Link
                                href="#"
                                aria-label="Google Maps"
                                className="text-red-500 hover:text-red-400 transition-colors duration-300 text-2xl"
                            >
                                <SiGooglemaps />
                            </Link>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="border-t border-gray-200 pt-6 mt-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">
                            Contacto
                        </h4>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p>Email: contacto@nesso.studio</p>
                            <p>Tel: +54 9 11 2408-3741</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
