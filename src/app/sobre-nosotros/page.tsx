export default function SobreNosotrosPage() {
    return (
        <div className="min-h-screen bg-primary-500 pt-20">
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Sobre nosotros
                    </h1>
                    <p className="text-gray-600 mt-2">
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

                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            Datos rápidos
                        </h3>
                        <ul className="text-gray-700 space-y-2 text-sm">
                            <li>Fundación: 2018</li>
                            <li>Equipo: 12 personas</li>
                            <li>Envíos: a todo el país</li>
                            <li>Calidad: control 3 etapas</li>
                            <li>Atención: 100% personalizada</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            Misión
                        </h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                            Crear productos que celebren la identidad del
                            hincha, con diseño responsable y una experiencia de
                            compra simple y humana.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            Visión
                        </h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                            Ser la marca referente en estilo de vida del hincha
                            rojo, expandiendo nuestra comunidad y colaboraciones
                            locales.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            Valores
                        </h4>
                        <ul className="text-gray-700 text-sm list-disc pl-5 space-y-1">
                            <li>Pasión</li>
                            <li>Calidad</li>
                            <li>Transparencia</li>
                            <li>Compromiso local</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
