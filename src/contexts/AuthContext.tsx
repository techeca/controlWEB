import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext<Authsignature | null>(null);

type AuthProps = {
    children: React.ReactNode
}

type Authsignature = {
    user: User | null,
    isAuthenticated: boolean,
    login: (userData: { rut: string; password: string }) => void;
    logout: () => void
}

interface User {
    rut: string;
    name?: string;
}

export function AuthProvider({ children }: AuthProps) {
    const [user, setUser] = useState<User | null>(null);

    const login = ({ rut, password }: { rut: string; password: string }) => {
        // Aquí es donde validas las credenciales, esto es solo un ejemplo
        if (rut === "12345678" && password === "password123") {
          setUser({ rut, name: "Usuario" }); // Asigna el usuario si las credenciales son correctas
        } else {
          throw new Error("Credenciales incorrectas");
        }
      };
    const logout = () => setUser(null); // Simula cierre de sesión

    //const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
