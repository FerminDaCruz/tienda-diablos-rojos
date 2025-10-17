export default function SobreNosotrosPage() {
    return (
        <div className="min-h-screen bg-primary-500 pt-20">
            <div className="">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 ">
                    <h1 className="text-3xl font-bold text-white">
                        Sobre nosotros
                    </h1>
                    <p className="text-white mt-2 mr-6">
                        Conocé más sobre nuestra marca y propósito.
                    </p>
                </div>
            </div>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            Nuestra historia
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Nix nació en 2018 con la idea de acercar productos
                            de diseño y calidad a la comunidad de los Diablos
                            Rojos. Empezamos como un pequeño proyecto local y
                            hoy somos una marca con alcance nacional,
                            manteniendo siempre la cercanía y el trato
                            personalizado que nos caracteriza.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Nuestro equipo está formado por diseñadores,
                            productores y apasionados por el club. Creemos en el
                            poder de los detalles: cada prenda y accesorio se
                            diseña pensando en durabilidad, confort y, sobre
                            todo, identidad.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Trabajamos con talleres locales y proveedores
                            certificados. Esto nos permite controlar la calidad,
                            garantizar buenas prácticas y generar impacto
                            positivo en nuestra comunidad.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
