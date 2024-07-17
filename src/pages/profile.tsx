import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { toast } from 'react-hot-toast';
import {useAuth} from "../AuthContext";
import {db} from "../../firebaseConfig";

const Profile: React.FC = () => {
    const { user, loading } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            const fetchProfile = async () => {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setName(data.name);
                    setEmail(data.email);
                }
            };

            fetchProfile();
        }
    }, [user]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const docRef = doc(db, 'users', user.uid);
            await updateDoc(docRef, {
                name,
                email,
            });
            toast.success('Perfil atualizado com sucesso!');
        } catch (e) {
            console.error('Error updating document: ', e);
            setError('Erro ao atualizar perfil');
            toast.error('Erro ao atualizar perfil');
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
                    Meu Perfil
                </Typography>
                <TextField
                    label="Nome"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Atualizar
                </Button>
            </Box>
        </Container>
    );
};

export default Profile;
