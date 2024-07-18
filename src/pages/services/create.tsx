import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import {useAuth} from "../../AuthContext";
import {createService} from "../../services/serviceService";

const CreateService: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');
    const { user, loading } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            console.error('User not authenticated');
            return;
        }

        try {
            await createService({
                title,
                description,
                price: parseFloat(price),
                userId: user.uid,
                date: new Date(date).toISOString(), // Converte a data para string ISO
            });
            router.push('/');
        } catch (e) {
            console.error('Error creating service: ', e);
        }
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (!user) {
        router.push('/login');
        return null;
    }

    return (
        <Container maxWidth="sm">
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 4
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Criar Novo Serviço
                </Typography>
                <TextField
                    label="Título"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Descrição"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    label="Preço"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                    label="Data do Agendamento"
                    type="datetime-local"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Criar
                </Button>
            </Box>
        </Container>
    );
};

export default CreateService;
