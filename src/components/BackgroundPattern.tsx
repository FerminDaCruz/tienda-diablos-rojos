import React from "react";
import Image, { StaticImageData } from "next/image";

type ImgProp = string | StaticImageData;

interface Props {
    img1: ImgProp;
    img2: ImgProp;
    img3: ImgProp;
    size?: number; // tamaño de cada celda
    rows?: number;
    cols?: number;
    opacity?: number;
    gap?: number; // espacio entre imágenes (px)
    className?: string;
}

export default function BackgroundPatternGrid({
    img1,
    img2,
    img3,
    size = 140,
    rows = 8,
    cols = 10,
    opacity = 0.12,
    gap = 24,
    className = "",
}: Props) {
    const imgs = [img1, img2, img3];

    return (
        <div
            className={`absolute inset-0 overflow-hidden ${className}`}
            style={{ zIndex: -1 }}
        >
            <div
                className="grid place-items-center"
                style={{
                    gridTemplateColumns: `repeat(${cols}, ${size}px)`,
                    gridTemplateRows: `repeat(${rows}, ${size}px)`,
                    gap: `${gap}px`,
                    justifyContent: "center",
                    alignContent: "center",
                }}
            >
                {Array.from({ length: rows }).map((_, row) =>
                    Array.from({ length: cols }).map((_, col) => {
                        const img = imgs[(row + col) % 3];
                        return (
                            <div
                                key={`${row}-${col}`}
                                className="relative flex items-center justify-center"
                                style={{
                                    width: size,
                                    height: size,
                                    opacity,
                                }}
                            >
                                <Image
                                    src={img}
                                    alt=""
                                    fill
                                    style={{
                                        objectFit: "contain",
                                        padding: `${gap / 4}px`, // un poco de aire extra dentro de la celda
                                    }}
                                    sizes={`${size}px`}
                                    priority
                                />
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
