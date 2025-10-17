import About from "@/components/sections/about";
import Destacados from "@/components/sections/destacados";
import Hero from "@/components/sections/hero";
import Pasion from "@/components/sections/pasion";
import FAQ from "@/components/sections/faq";
import ElfsightReviews from "@/components/sections/reviews";

export default function Home() {
    return (
        <>
            <Hero />
            <div className="relative z-10 bg-gradient-to-b from-primary-500 to-primary-600">
                <Destacados />
                <ElfsightReviews />
                <Pasion />
                <About />
                <FAQ />
            </div>
        </>
    );
}
