import type { NextPage } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import {useAuth} from "../AuthContext";
import React from "react";

const Home: NextPage = () => {
    const { user, loading } = useAuth();
    const router = useRouter();

    if (loading) return <p>Loading...</p>;

    const handleLogin = () => {
        router.push('/login');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                p: 3,
            }}
        >
            <Typography variant="h3" component="h1" gutterBottom>
                Bem-vindo ao Bicos
            </Typography>
            {user ? (
                <Typography variant="h6">Olá, {user.email}</Typography>
            ) : (
                <Button variant="contained" color="primary" onClick={handleLogin}>
                    Login
                </Button>
            )}
        </Box>
    );
};

export default Home;
