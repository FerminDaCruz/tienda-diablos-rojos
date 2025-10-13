"use client";

import { useEffect } from "react";

export default function ElfsightReviews() {
    useEffect(() => {
        // Si el script no está agregado aún, lo agregamos
        const existingScript = document.querySelector(
            'script[src="https://elfsightcdn.com/platform.js"]'
        );
        if (!existingScript) {
            const script = document.createElement("script");
            script.src = "https://elfsightcdn.com/platform.js";
            script.async = true;
            document.body.appendChild(script);
        } else {
            // Si ya está, forzamos a Elfsight a re-renderizar (por si se desmontó)
            if (window.ElfsightApp) {
                window.ElfsightApp.init();
            }
        }
    }, []);

    return (
        <div className="w-full flex justify-center items-center py-10">
            <div
                className="elfsight-app-b10faa05-9b7a-46bb-ae3b-58a9f29e55d3 [&>*>*>*>*>*>*>*>*>*>*>*>*>*>*>*>*>*]:bg-white [&>*>*>*>*>*>*>*>*>*>*>*>*>*>*>*>*>*]:rounded-3xl"
                data-elfsight-app-lazy
            ></div>
        </div>
    );
}
