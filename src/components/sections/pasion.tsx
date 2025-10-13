import Link from "next/link";
import { IconType } from "react-icons";
import { FaTshirt, FaMedal, FaHeart } from "react-icons/fa";

interface CardProps {
    icon: IconType;
    title: string;
    desc: string;
}

function Card({ icon: Icon, title, desc }: CardProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 max-w-sm mx-auto">
            <div className="flex justify-center mb-4">
                <div className="bg-primary-100 p-4 rounded-full">
                    <Icon className="text-primary-500 text-2xl" />
                </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 font-poppins">
                {title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{desc}</p>
        </div>
    );
}

export default function Pasion() {
    const cards = [
        {
            icon: FaTshirt,
            title: "Calidad Premium",
            desc: "Utilizamos los mejores materiales y técnicas de confección para garantizar durabilidad y comodidad en cada prenda.",
        },
        {
            icon: FaMedal,
            title: "Tradición y Pasión",
            desc: "Cada diseño honra la rica historia del club, creado con el mismo amor que sentimos por nuestros colores.",
        },
        {
            icon: FaHeart,
            title: "Hecho por Hinchas",
            desc: "Somos hinchas creando para hinchas. Conocemos lo que significa vestir los colores del Rey de Copas.",
        },
    ];

    return (
        <section className="w-full  text-center text-black flex flex-col justify-center items-center py-16">
            <div className=" mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <Card
                            key={index}
                            icon={card.icon}
                            title={card.title}
                            desc={card.desc}
                        />
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <Link
                    href="/catalogo"
                    className="border border-white bg-primary-500 px-6 py-3 text-white hover:bg-white hover:text-primary-500 transition-colors duration-200 font-medium"
                >
                    Ver catálogo
                </Link>
            </div>
        </section>
    );
}
