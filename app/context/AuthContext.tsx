'use client';

import React, { createContext, useContext, useEffect, useState } from "react";
import {User} from "@/app/interfaces/userInterface";


interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null); // Permite null o un objeto User

    useEffect(() => {
        const userCookie = document.cookie.split('; ').find(c => c.startsWith('user='));
        if (userCookie) {
            const userData = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
            setUser(userData);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};
