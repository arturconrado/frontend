import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface User {
    id: string;
    email: string;
    role: string;
    access_token: string;
}

interface AuthContextProps {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    loading: true,
    login: async () => {},
    logout: () => {},
    register: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(`${process.env.NEXT_PUBLIC_VERIFY_URL}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    setUser(response.data);
                })
                .catch(() => {
                    localStorage.removeItem('token');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email: string, password: string) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_LOGIN_URL}`, { email, password });
        localStorage.setItem('token', response.data.access_token);
        setUser(response.data);
        await router.push('/');
    };

    const logout = async () => {
        localStorage.removeItem('token');
        setUser(null);
        await router.push('/login');
    };

    const register = async (email: string, password: string) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_REGISTER_URL}`, { email, password });
        localStorage.setItem('token', response.data.access_token);
        setUser(response.data);
        await router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);