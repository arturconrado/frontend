import { useRouter } from 'next/router';
import { useEffect, ReactNode } from 'react';
import {useAuth} from "../AuthContext";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        router.push('/login');
    }, [router]);

    if (loading) {
        return null; // Não renderiza nada enquanto está carregando
    }

    return null; // Não renderiza nada enquanto redireciona
};

export default ProtectedRoute;
