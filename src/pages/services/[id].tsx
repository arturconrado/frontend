import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { toast } from 'react-hot-toast';
import {db} from "../../../firebaseConfig";

const EditService: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchService = async () => {
            if (id) {
                const docRef = doc(db, 'services', id as string);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setTitle(data.title);
                    setDescription(data.description);
                } else {
                    toast.error('Serviço não encontrado');
                    router.push('/');
                }
                setLoading(false);
            }
        };

        fetchService();
    }, [id, router]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const docRef = doc(db, 'services', id as string);
            await updateDoc(docRef, {
                title,
                description,
            });
            toast.success('Serviço atualizado com sucesso!');
            router.push('/');
        } catch (e) {
            console.error('Error updating document: ', e);
            setError('Erro ao atualizar serviço');
            toast.error('Erro ao atualizar serviço');
        }
    };

    if (loading) {
        return <Typography variant="h6">Carregando...</Typography>;
    }

    return (
        <Container maxWidth="sm">
            <Box
                component="form"
                onSubmit={handleUpdate}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 4
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Editar Serviço
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
                {error && <Typography color="error">{error}</Typography>}
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Atualizar
                </Button>
            </Box>
        </Container>
    );
};

export default EditService;
