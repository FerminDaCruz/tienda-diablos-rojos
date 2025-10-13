import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    addDoc,
    Timestamp,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDPPaGEv9jvnzxXcr5qXPfo0CyvcHVJYCg",
    authDomain: "tienda-diablos-rojos.firebaseapp.com",
    projectId: "tienda-diablos-rojos",
    storageBucket: "tienda-diablos-rojos.firebasestorage.app",
    messagingSenderId: "389584211013",
    appId: "1:389584211013:web:bd7ad8e8381542ebf5672c",
    measurementId: "G-W4NSFRTBHW",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const productosEjemplo = [
    {
        titulo: "Camiseta Titular 2024",
        descripcion:
            "Camiseta oficial del Rey de Copas con tecnología de última generación",
        precio: 89990,
        imagen: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        categoria: "Camisetas",
        destacado: true,
        stock: 50,
        fechaCreacion: Timestamp.now(),
        fechaActualizacion: Timestamp.now(),
    },
    {
        titulo: "Short de Entrenamiento",
        descripcion: "Short cómodo para entrenamientos y partidos casuales",
        precio: 45990,
        imagen: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500",
        categoria: "Shorts",
        destacado: true,
        stock: 30,
        fechaCreacion: Timestamp.now(),
        fechaActualizacion: Timestamp.now(),
    },
    {
        titulo: "Bufanda Oficial",
        descripcion:
            "Bufanda de lana premium para mostrar tu pasión en las gradas",
        precio: 29990,
        imagen: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
        categoria: "Accesorios",
        destacado: true,
        stock: 25,
        fechaCreacion: Timestamp.now(),
        fechaActualizacion: Timestamp.now(),
    },
    {
        titulo: "Gorra Bordada",
        descripcion:
            "Gorra con logo bordado a mano, perfecta para el día a día",
        precio: 35990,
        imagen: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500",
        categoria: "Accesorios",
        destacado: false,
        stock: 40,
        fechaCreacion: Timestamp.now(),
        fechaActualizacion: Timestamp.now(),
    },
    {
        titulo: "Chaqueta Térmica",
        descripcion: "Chaqueta impermeable para días fríos en el estadio",
        precio: 129990,
        imagen: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
        categoria: "Chaquetas",
        destacado: true,
        stock: 20,
        fechaCreacion: Timestamp.now(),
        fechaActualizacion: Timestamp.now(),
    },
    {
        titulo: "Medias Oficiales",
        descripcion: "Medias de fútbol con tecnología de compresión",
        precio: 19990,
        imagen: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
        categoria: "Medias",
        destacado: false,
        stock: 60,
        fechaCreacion: Timestamp.now(),
        fechaActualizacion: Timestamp.now(),
    },
    {
        titulo: "Mochila Deportiva",
        descripcion:
            "Mochila resistente para llevar tus pertenencias al estadio",
        precio: 79990,
        imagen: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        categoria: "Accesorios",
        destacado: false,
        stock: 15,
        fechaCreacion: Timestamp.now(),
        fechaActualizacion: Timestamp.now(),
    },
    {
        titulo: "Camiseta Alternativa",
        descripcion: "Camiseta alternativa con diseño exclusivo de temporada",
        precio: 94990,
        imagen: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        categoria: "Camisetas",
        destacado: true,
        stock: 35,
        fechaCreacion: Timestamp.now(),
        fechaActualizacion: Timestamp.now(),
    },
    {
        titulo: "Pantalón Deportivo",
        descripcion: "Pantalón cómodo para entrenamientos y uso casual",
        precio: 65990,
        imagen: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500",
        categoria: "Pantalones",
        destacado: false,
        stock: 28,
        fechaCreacion: Timestamp.now(),
        fechaActualizacion: Timestamp.now(),
    },
    {
        titulo: "Guantes de Portero",
        descripcion: "Guantes profesionales con tecnología de agarre mejorada",
        precio: 89990,
        imagen: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
        categoria: "Accesorios",
        destacado: false,
        stock: 12,
        fechaCreacion: Timestamp.now(),
        fechaActualizacion: Timestamp.now(),
    },
];

async function poblarFirebase() {
    try {
        console.log("Iniciando población de Firebase...");

        for (const producto of productosEjemplo) {
            const docRef = await addDoc(collection(db, "productos"), producto);
            console.log(`Producto agregado con ID: ${docRef.id}`);
        }

        console.log("¡Población completada exitosamente!");
        process.exit(0);
    } catch (error) {
        console.error("Error al poblar Firebase:", error);
        process.exit(1);
    }
}

poblarFirebase();
