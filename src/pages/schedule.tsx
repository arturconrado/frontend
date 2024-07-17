import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { toast } from 'react-hot-toast';
import {useAuth} from "../AuthContext";
import {db} from "../../firebaseConfig";

const ScheduleService: React.FC = () => {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');

    const handleSchedule = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await addDoc(collection(db, 'schedules'), {
                title,
                description,
                date,
                userId: user.uid,
            });
            toast.success('Serviço agendado com sucesso!');
        } catch (e) {
            console.error('Error scheduling service: ', e);
            setError('Erro ao agendar serviço');
            toast.error('Erro ao agendar serviço');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                component="form"
                onSubmit={handleSchedule}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 4
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Agendar Serviço
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
                    label="Data"
                    type="date"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Agendar
                </Button>
            </Box>
        </Container>
    );
};

export default ScheduleService;
