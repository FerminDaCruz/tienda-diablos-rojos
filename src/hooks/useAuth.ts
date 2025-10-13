import { useState, useEffect } from "react";

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
}

export const useAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        isLoading: true,
    });

    useEffect(() => {
        // Verificar si hay sesión guardada
        const savedAuth = localStorage.getItem("admin-auth");
        if (savedAuth) {
            setAuthState({
                isAuthenticated: true,
                isLoading: false,
            });
        } else {
            setAuthState({
                isAuthenticated: false,
                isLoading: false,
            });
        }
    }, []);

    const login = (username: string, password: string): boolean => {
        const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin";
        const adminPassword =
            process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "diablos2024";

        if (username === adminUsername && password === adminPassword) {
            localStorage.setItem("admin-auth", "true");
            setAuthState({
                isAuthenticated: true,
                isLoading: false,
            });
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem("admin-auth");
        setAuthState({
            isAuthenticated: false,
            isLoading: false,
        });
    };

    return {
        ...authState,
        login,
        logout,
    };
};
