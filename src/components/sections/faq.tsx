"use client";

import { useState } from "react";

export default function FAQ() {
    const faqs = [
        {
            q: "¿Cómo realizo un pedido?",
            a: "Escribinos por WhatsApp y coordinamos todo el proceso.",
        },
        {
            q: "¿Hacen envíos?",
            a: "Sí, realizamos envíos a todo el país. Consultá costos y tiempos.",
        },
        {
            q: "¿Los productos son originales?",
            a: "Trabajamos con productos oficiales y de alta calidad.",
        },
        {
            q: "¿Qué métodos de pago aceptan?",
            a: "Efectivo, transferencia y plataformas digitales. Consultá por promociones vigentes.",
        },
        {
            q: "¿Cuánto demora mi pedido?",
            a: "Entre 48 y 72 horas hábiles según destino y disponibilidad.",
        },
        {
            q: "¿Puedo cambiar o devolver un producto?",
            a: "Sí, dentro de los 10 días con ticket y en perfecto estado.",
        },
        {
            q: "¿Ofrecen talles especiales?",
            a: "Contamos con talles extendidos en varias líneas; consultá stock.",
        },
        {
            q: "¿Cómo cuido mis prendas?",
            a: "Lavar del revés con agua fría y evitar secadora para mayor durabilidad.",
        },
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (idx: number) => {
        setOpenIndex((prev) => (prev === idx ? null : idx));
    };

    return (
        <section className=" text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold mb-8">
                    Preguntas Frecuentes
                </h2>
                <div className="max-w-3xl mx-auto space-y-3">
                    {faqs.map((item, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div
                                key={item.q}
                                className="bg-white/10 backdrop-blur rounded-lg"
                            >
                                <button
                                    onClick={() => toggle(idx)}
                                    className="w-full flex items-center justify-between p-5 text-left"
                                    aria-expanded={isOpen}
                                >
                                    <span className="text-lg font-semibold">
                                        {item.q}
                                    </span>
                                    <span className="ml-4 text-xl">
                                        {isOpen ? "−" : "+"}
                                    </span>
                                </button>
                                <div
                                    className={`px-5 pb-5 text-sm transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${
                                        isOpen
                                            ? "max-h-40 opacity-100"
                                            : "max-h-0 opacity-0"
                                    }`}
                                >
                                    {item.a}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
