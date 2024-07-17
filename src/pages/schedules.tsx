import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Box, Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import {useAuth} from "../AuthContext";
import {db} from "../../firebaseConfig";

interface Schedule {
    id: string;
    title: string;
    description: string;
    date: string;
}

const Schedules: React.FC = () => {
    const { user, loading } = useAuth();
    const [schedules, setSchedules] = useState<Schedule[]>([]);

    useEffect(() => {
        if (loading) return;

        const fetchSchedules = async () => {
            const q = query(collection(db, 'schedules'), where('userId', '==', user.uid));
            const querySnapshot = await getDocs(q);
            const scheduleList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Schedule[];
            setSchedules(scheduleList);
        };

        fetchSchedules();
    }, [loading, user]);

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Meus Agendamentos
                </Typography>
                {loading ? (
                    <Typography variant="h6">Carregando...</Typography>
                ) : schedules.length > 0 ? (
                    <List>
                        {schedules.map(schedule => (
                            <ListItem key={schedule.id} sx={{ borderBottom: '1px solid #ddd' }}>
                                <ListItemText
                                    primary={schedule.title}
                                    secondary={`${schedule.description} - ${schedule.date}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body1">Nenhum agendamento disponível no momento.</Typography>
                )}
            </Box>
        </Container>
    );
};

export default Schedules;
