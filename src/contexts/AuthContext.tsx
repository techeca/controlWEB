import { authRepository } from "@/repositories/authRepository";
import { LucideIcon } from "lucide-react";
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext<Authsignature | null>(null);

type AuthProps = {
    children: React.ReactNode
}

type Authsignature = {
    user: User | null,
    routes: Route,
    isAuthenticated: boolean,
    login: (userData: { rut: string; password: string }) => void;
    logout: () => void
}

interface User {
    rut: string;
    name?: string;
    lastName?: string;
    email?: string;
    avatar?: string;
    type: string;
}

interface Route {
    items: {
      title: string
      url: string
      icon?: string
      isActive?: boolean
      items?: {
        title: string
        url: string
      }[]
    }[]
  }

export function AuthProvider({ children }: AuthProps) {
    const [user, setUser] = useState<User | null>(null);
    const [routes, setRoutes] = useState<Route>({items: []});

    const login = async ({ rut, password }: { rut: string; password: string }) => {
        try {
            const userData = await authRepository.login(rut, password);
            setUser(userData.user);
            setRoutes(userData.routes);
        } catch (error) {
            console.log(error);
            throw new Error("Error al intentar iniciar sessión.")
        }
      };
    const logout = () => {
        setUser(null)
        authRepository.logout(); //testear
    };

    //const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, routes }}>
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
