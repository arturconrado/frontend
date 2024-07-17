import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import {db} from "../../../firebaseConfig";

const CreateService: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, 'services'), {
                title,
                description,
            });
            console.log('Document written with ID: ', docRef.id);
            router.push('/');
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

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
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Criar
                </Button>
            </Box>
        </Container>
    );
};

export default CreateService;
