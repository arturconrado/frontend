import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { toast } from 'react-hot-toast';
import {useAuth} from "../AuthContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            toast.error('Você precisa estar logado para acessar esta página');
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh'
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return <>{user && children}</>;
};

export default ProtectedRoute;
