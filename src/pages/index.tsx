import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { Box, Typography, Button, Container, Link as MuiLink } from '@mui/material';
import { useRouter } from 'next/router';
import ServiceList from '../components/ServiceList';
import Link from 'next/link';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from "../AuthContext";
import {getServices} from "../services/serviceService";

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
            try {
                const data = await getServices();
                setServices(data);
            } catch (error) {
                console.error('Erro ao buscar serviços:', error);
            }
        };

        fetchServices();
    }, [loading]);

    const handleLogin = () => {
        router.push('/login');
    };

    return (
        <ProtectedRoute>
            <Box
                sx={{
                    backgroundImage: 'url(/background.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '50vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textAlign: 'center',
                }}
            >
                <Container>
                    <Typography variant="h3" component="h1" gutterBottom>
                        Bem-vindo ao Bicos
                    </Typography>
                    <Typography variant="h5" component="p" gutterBottom>
                        Encontre e contrate os melhores profissionais para os seus serviços
                    </Typography>
                    {!user && (
                        <Button variant="contained" color="primary" onClick={handleLogin} sx={{ backgroundColor: '#2980b9' }}>
                            Comece Agora
                        </Button>
                    )}
                </Container>
            </Box>
            <Container maxWidth="md" sx={{ mt: 4 }}>
                {loading ? (
                    <Typography variant="h6" align="center">Carregando...</Typography>
                ) : user ? (
                    <>
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Typography variant="h6">Olá, {user.email}</Typography>
                            <Link href="/services/create" passHref>
                                <MuiLink variant="button" sx={{ mt: 2, display: 'block', textDecoration: 'none' }}>
                                    <Button variant="contained" color="primary" sx={{ backgroundColor: '#27ae60' }}>
                                        Criar Novo Serviço
                                    </Button>
                                </MuiLink>
                            </Link>
                        </Box>
                        {services.length > 0 ? (
                            <ServiceList services={services} />
                        ) : (
                            <Typography variant="body1" align="center">
                                Nenhum serviço disponível no momento.
                            </Typography>
                        )}
                    </>
                ) : (
                    <Button variant="contained" color="primary" onClick={handleLogin}>
                        Login
                    </Button>
                )}
            </Container>
        </ProtectedRoute>
    );
};

export default Home;
