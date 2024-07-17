import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { Box, Typography, Button, Container, Link as MuiLink } from '@mui/material';
import { useRouter } from 'next/router';
import ServiceList from '../components/ServiceList';
import { collection, getDocs } from 'firebase/firestore';
import LogoutButton from '../components/LogoutButton';
import Link from 'next/link';
import ProtectedRoute from '../components/ProtectedRoute';
import {useAuth} from "../AuthContext";
import {db} from "../../firebaseConfig";

interface Service {
    id: string;
    title: string;
    description: string;
}

const Home: NextPage = () => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        if (loading) return;

        const fetchServices = async () => {
            const serviceCollection = collection(db, 'services');
            const serviceSnapshot = await getDocs(serviceCollection);
            const serviceList = serviceSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Service[];
            setServices(serviceList);
        };

        fetchServices();
    }, [loading]);

    const handleLogin = () => {
        router.push('/login');
    };

    return (
        <ProtectedRoute>
            <Container maxWidth="md">
                <Box
                    sx={{
                        minHeight: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'background.default',
                        p: 3,
                        mt: 4
                    }}
                >
                    <Typography variant="h3" component="h1" gutterBottom>
                        Bem-vindo ao Bicos
                    </Typography>
                    {loading ? (
                        <Typography variant="h6">Carregando...</Typography>
                    ) : user ? (
                        <>
                            <Typography variant="h6">Olá, {user.email}</Typography>
                            <LogoutButton />
                            <Link href="/services/create" passHref>
                                <MuiLink variant="button" sx={{ mt: 2, display: 'block' }}>
                                    Criar Novo Serviço
                                </MuiLink>
                            </Link>
                            {services.length > 0 ? (
                                <ServiceList services={services} />
                            ) : (
                                <Typography variant="body1" sx={{ mt: 2 }}>
                                    Nenhum serviço disponível no momento.
                                </Typography>
                            )}
                        </>
                    ) : (
                        <Button variant="contained" color="primary" onClick={handleLogin}>
                            Login
                        </Button>
                    )}
                </Box>
            </Container>
        </ProtectedRoute>
    );
};

export default Home;
