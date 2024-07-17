import React from 'react';
import { Container, Grid, Paper, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/router';
import {useAuth} from "../AuthContext";

const Dashboard: React.FC = () => {
    const router = useRouter();
    const { user } = useAuth();

    const navigateTo = (path: string) => {
        router.push(path);
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Dashboard
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6" component="h2">
                                Meu Perfil
                            </Typography>
                            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigateTo('/profile')}>
                                Visualizar
                            </Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6" component="h2">
                                Meus Serviços
                            </Typography>
                            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigateTo('/')}>
                                Visualizar
                            </Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6" component="h2">
                                Agendar Serviço
                            </Typography>
                            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigateTo('/schedule')}>
                                Agendar
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Dashboard;
