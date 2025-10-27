import Image from "next/image";

export default function SobreNosotrosPage() {
    return (
        <div className=" bg-primary-500 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center font-urbanist">
                    Sobre nosotros
                </h1>
            </div>

            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8  py-5 sm:py-10 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div>
                    <p className="text-white leading-relaxed mb-4">
                        <strong>Nix Indumentaria</strong> nació en 2018 con la
                        idea de acercar productos de diseño y calidad a la
                        comunidad de los Diablos Rojos. Con el tiempo, el
                        proyecto creció y dio lugar a{" "}
                        <strong>Tienda Diablos Rojos</strong>, nuestro espacio
                        oficial para hinchas, y a <strong>Rojo Lealtad</strong>,
                        una línea especial dedicada a quienes viven la pasión
                        con orgullo y compromiso. Hoy, bajo estos tres nombres
                        seguimos expandiendo nuestra identidad sin perder la
                        cercanía y el trato personalizado que siempre nos
                        caracterizó.
                    </p>
                    <p className="text-white leading-relaxed mb-4">
                        Detrás de cada prenda estamos nosotros, apasionados por
                        el club y por lo que hacemos. Cuidamos cada detalle del
                        proceso, desde el diseño hasta el envío, porque creemos
                        que la pasión se transmite en las pequeñas cosas.
                    </p>
                    <p className="text-white leading-relaxed">
                        Trabajamos con talleres locales y proveedores
                        certificados. Esto nos permite controlar la calidad,
                        garantizar buenas prácticas y generar un impacto
                        positivo en nuestra comunidad.
                    </p>
                </div>
                <Image
                    src="/imagen-prueba.png"
                    width={500}
                    height={500}
                    alt="imagen sobre nosotros"
                    className="rounded-lg object-cover"
                />
            </section>
        </div>
    );
}
