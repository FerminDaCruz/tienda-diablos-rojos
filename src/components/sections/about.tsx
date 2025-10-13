import Image from "next/image";

export default function About() {
    return (
        <section id="sobre-nosotros" className="py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white">
                        Sobre Nosotros
                    </h2>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Nuestra Historia (ocupa las 2 filas en desktop) */}
                    <div className="space-y-6 h-full text-white">
                        <div
                            className="p-8 rounded-lg shadow-xl shadow--xl
						  h-full flex flex-col justify-center "
                        >
                            {/*<div className="p-8 rounded-lg h-full flex flex-col justify-center [box-shadow:5px_5px_10px_#000,-5px_-5px_10px_#fff]"></div>*/}

                            <h3 className="text-2xl font-semibold  mb-4">
                                Nuestra Historia
                            </h3>
                            <p className=" leading-relaxed mb-4">
                                Hace más de ocho años vendemos ropa, pero la
                                historia de esta tienda empezó mucho antes, en
                                las tribunas. Desde chicos, nuestro viejo nos
                                enseñó lo que significa ser de Independiente: el
                                amor por los colores, la pertenencia y esa forma
                                tan especial de vivir el fútbol.
                            </p>
                            <p className=" leading-relaxed mb-4">
                                Con el tiempo, quisimos llevar esa pasión a otro
                                terreno. Así nació esta tienda: como una forma
                                de vestir lo que sentimos. Empezó como un
                                proyecto entre hermanos, mezclando lo que más
                                nos gusta y terminó convirtiéndose en un espacio
                                donde compartimos nuestra forma de vivir el
                                club.
                            </p>
                            <p className=" leading-relaxed">
                                Hoy seguimos con la misma idea: crear prendas
                                que representen a los hinchas de verdad, los que
                                sienten el escudo en el pecho y el orgullo de
                                pertenecer.
                            </p>
                        </div>
                    </div>
                    <Image
                        src="/imagen-prueba.png"
                        width={1000}
                        height={1000}
                        alt="imagen nuestra historia"
                        className="rounded-lg shadow-lg object-cover"
                    ></Image>
                </div>
            </div>
        </section>
    );
}
