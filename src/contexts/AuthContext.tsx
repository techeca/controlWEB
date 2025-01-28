import { authRepository } from "@/repositories/authRepository";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import apiClient from "@/services/apiClient";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<Authsignature | null>(null);

type AuthProps = {
    children: React.ReactNode
}

type Authsignature = {
    user: User | null,
    routes: Route,
    isAuthenticated: boolean,
    login: (userData: { rut: string; password: string }) => void;
    logout: () => void,
    loading: boolean
}

interface User {
    rut: string;
    name?: string;
    lastName?: string;
    surName?: string;
    email?: string;
    avatar?: string;
    type: string;
    controles: []
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
    const [loading, setLoading] = useState(true);

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
        setUser(null);
        localStorage.removeItem("token");
        authRepository.logout(); //testear
    };

    useEffect(() => {
        const validateSession = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setUser(null); // No hay token, desautenticar
                setLoading(false);
                //navigate("/signIn");
              return;
            }

            try {
                console.log('intentando revalidar porque hay token');
                const { user, routes } = await authRepository.validateToken()
                setUser(user);
                setRoutes(routes);
            } catch (error: any) {
                console.log('error en la validación de token');
                console.log(error.status);
                if (error.status === 403 || error.status === 401) {
                    try {
                      const refreshResponse = await authRepository.refreshToken();
                      localStorage.setItem("token", refreshResponse.token);
                      await validateSession(); // Reintentar validación
                    } catch {
                        setUser(null); // Sin sesión
                        setRoutes({items: []})
                        localStorage.removeItem('token')
                    }
                  } else {
                    //setUser(null);
                    //setRoutes({items: []})
                    //localStorage.removeItem('token')
                  }
            } finally {
                setLoading(false)
            }
          };
        
          validateSession();
    }, []);

    //const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, routes, loading }}>
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
